import { NextResponse } from "next/server";
import cloudinary from "@/config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { protect } from "@/lib/auth";
export async function POST(request: Request) {
  try {
    // =========================
    // 1. Connect MongoDB
    // =========================

    await connectDB();

    // =========================
    // 2. Authenticate User
    // =========================

    const user = await protect();

    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // =========================
    // 3. Get Image
    // =========================

    const formData = await request.formData();

    const file = formData.get("profilePic") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "Profile picture is required" },
        { status: 400 }
      );
    }

    // =========================
    // 4. Check Image Type
    // =========================

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // =========================
    // 5. Convert Image to Buffer
    // =========================

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // =========================
    // 6. Upload to Cloudinary
    // =========================

    const result = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "profile-pictures",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }

              if (!result) {
                reject(new Error("Cloudinary upload failed"));
                return;
              }

              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    // =========================
    // 7. Update User
    // =========================

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        profilePic: result.secure_url,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // =========================
    // 8. Return Response
    // =========================

    return NextResponse.json(
      {
        message: "Profile picture uploaded successfully",
        imageUrl: result.secure_url,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile picture upload error:", error);

    return NextResponse.json(
      {
        message: "Profile picture upload failed",
      },
      { status: 500 }
    );
  }
}