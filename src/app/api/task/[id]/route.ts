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



export async function PUT(
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

    // Get task ID
    const { id } = await params;

    // Get updated data
    const {
      title,
      description,
      priority,
      status,
      dueDate,
      category,
      tags,
    } = await request.json();

    // Check title
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    // Find and update only user's task
    const task = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: user._id,
      },
      {
        title,
        description,
        priority,
        status,
        dueDate,
        category,
        tags,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}