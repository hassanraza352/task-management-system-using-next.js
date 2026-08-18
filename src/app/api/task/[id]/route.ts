import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { protect } from "@/lib/auth";
import Task from "@/models/Task";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Check logged-in user
    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get task ID from URL
    const { id } = await params;

    // Find task belonging to this user
    const task = await Task.findOne({
      _id: id,
      userId: user._id,
    });

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    // Delete task
    await Task.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}