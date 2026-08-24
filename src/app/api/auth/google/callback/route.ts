import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { message: "Google authorization code missing" },
        { status: 400 }
      );
    }

    // Exchange Google authorization code for access token
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri:
  "https://task-management-system-using-next-j.vercel.app/api/auth/google/callback",
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Google token error:", tokenData);

      return NextResponse.json(
        { message: "Failed to get Google token" },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;

    // Get Google user information
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const googleUser = await userResponse.json();

    if (!userResponse.ok) {
      return NextResponse.json(
        { message: "Failed to get Google user" },
        { status: 400 }
      );
    }

    console.log("Google User:", googleUser);

    await connectDB();

    // Find existing user
    let user = await User.findOne({
      email: googleUser.email,
    });

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        profilePic: googleUser.picture || "",
        isVerified: googleUser.verified_email || false,
        authProvider: "google",
        googleId: googleUser.id,
        password: null,
      });
    }

    // Create our JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    // Create response
    const response = NextResponse.redirect(
      new URL("/dashboard", request.url)
    );

    // Store JWT in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } 
  catch (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.json(
      { message: "Google authentication failed" },
      { status: 500 }
    );
  }
}