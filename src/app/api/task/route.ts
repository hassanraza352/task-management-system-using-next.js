import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { protect } from "@/lib/auth";
import Task from "@/models/Task";

export async function POST(request: Request) {
  try {
    await connectDB();

    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get task data
    const {
      title,
      description,
      priority,
      status,
      dueDate,
      category,
      tags,
    } = await request.json();

    // Required field
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      category,
      tags,
      userId: user._id,
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create task error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();

    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const tasks = await Task.find({
      userId: user._id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
