import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { protect } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Authenticated user",
      user,
    });
  } catch (error) {
    console.error("Auth error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}