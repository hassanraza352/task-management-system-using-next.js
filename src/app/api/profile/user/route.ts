import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { protect } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    // Logged-in user
    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Data from frontend
    const { name, phone, bio } = await request.json();

    // Name required
    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    // Update only logged-in user's profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name.trim(),
        phone: phone?.trim() || "",
        bio: bio?.trim() || "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}