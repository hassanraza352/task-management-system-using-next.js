import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Check fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
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

  const response = NextResponse.json({
  message: "Login successful",
  user: {
  id: user._id,
  name: user.name,
  email: user.email,
  profilePic: user.profilePic,
  isVerified: user.isVerified,
  bio: user.bio,
  role: user.role,
  phone: user.phone,
},
});

response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return response;

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}