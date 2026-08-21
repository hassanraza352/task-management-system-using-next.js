"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import jsPDF from "jspdf";
import Image from "next/image"
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  category: string;
  tags: string[];
  createdAt:string;
}

function Profile() {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
  });

  // =========================
  // Profile Picture States
  // =========================

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // =========================
  // Input Change
  // =========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Edit Profile
  // =========================

  const handleEdit = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
    });

    setIsEditing(true);
  };

  // =========================
  // Update Profile
  // =========================

  const updateProfile = async () => {
    try {
      const response = await fetch("/api/profile/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      console.log("Profile updated:", data.user);

      updateUser(data.user);

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  // =========================
  // Select Profile Picture
  // =========================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Only images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image");
      return;
    }

    // Optional size check - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setSelectedFile(file);

    // Preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // =========================
  // Upload Profile Picture
  // =========================

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("profilePic", selectedFile);

     const response = await fetch(
  "/api/profile/user/profile-picture",
  {
    method: "POST",
    credentials: "include",
    body: formData,
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Profile picture upload failed"
        );
      }

      console.log("Profile picture uploaded:", data);

      // Update AuthContext user
      updateUser(data.user);

      // Clear selected image
      setSelectedFile(null);
      setPreview(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Profile picture updated successfully!");

    } catch (error) {
      console.error(
        "Profile picture upload error:",
        error
      );

      alert("Profile picture upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadReport = async () => {
  try {
    const response = await fetch("/api/task", {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to fetch tasks");
      return;
    }

    const allTasks = data.tasks || [];

    // Last 30 days
    const today = new Date();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Sirf last 30 days mein created tasks
    const tasks = allTasks.filter((task: Task) => {
      const createdDate = new Date(task.createdAt);

      return (
        createdDate >= thirtyDaysAgo &&
        createdDate <= today
      );
    });

    // =========================
    // Statistics
    // =========================

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task: Task) => task.status === "Done"
    ).length;

    const inProgressTasks = tasks.filter(
      (task: Task) => task.status === "In Progress"
    ).length;

    const todoTasks = tasks.filter(
      (task: Task) => task.status === "Todo"
    ).length;

    const highPriority = tasks.filter(
      (task: Task) => task.priority === "High"
    ).length;

    const mediumPriority = tasks.filter(
      (task: Task) => task.priority === "Medium"
    ).length;

    const lowPriority = tasks.filter(
      (task: Task) => task.priority === "Low"
    ).length;

    // Overdue
    const overdueTasks = tasks.filter((task: Task) => {
      if (!task.dueDate || task.status === "Done") {
        return false;
      }

      return new Date(task.dueDate) < today;
    }).length;

    // =========================
    // Category summary
    // =========================

    const categoryCount: Record<string, number> = {};

    tasks.forEach((task: Task) => {
      const category = task.category?.trim() || "Uncategorized";

      categoryCount[category] =
        (categoryCount[category] || 0) + 1;
    });

    // =========================
    // Create PDF
    // =========================

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Task Management Report", 20, 20);

    // Report period
    doc.setFontSize(11);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString();
    };

    doc.text(
      `Report Period: ${formatDate(thirtyDaysAgo)} - ${formatDate(today)}`,
      20,
      30
    );

    doc.text(
      `Generated: ${formatDate(today)}`,
      20,
      37
    );

    // =========================
    // Summary
    // =========================

    doc.setFontSize(15);
    doc.text("Summary", 20, 52);

    doc.setFontSize(11);

    let y = 62;

    doc.text(`Total Tasks: ${totalTasks}`, 25, y);
    y += 8;

    doc.text(`Completed: ${completedTasks}`, 25, y);
    y += 8;

    doc.text(`In Progress: ${inProgressTasks}`, 25, y);
    y += 8;

    doc.text(`Todo: ${todoTasks}`, 25, y);
    y += 8;

    doc.text(`Overdue: ${overdueTasks}`, 25, y);

    // =========================
    // Priority
    // =========================

    y += 18;

    doc.setFontSize(15);
    doc.text("Priority Summary", 20, y);

    y += 10;

    doc.setFontSize(11);

    doc.text(`High: ${highPriority}`, 25, y);
    y += 8;

    doc.text(`Medium: ${mediumPriority}`, 25, y);
    y += 8;

    doc.text(`Low: ${lowPriority}`, 25, y);

    // =========================
    // Categories
    // =========================

    y += 18;

    doc.setFontSize(15);
    doc.text("Category Summary", 20, y);

    y += 10;

    doc.setFontSize(11);

    Object.entries(categoryCount).forEach(
      ([category, count]) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        doc.text(`${category}: ${count} task(s)`, 25, y);

        y += 8;
      }
    );

    // =========================
    // Task Details
    // =========================

    doc.addPage();

    doc.setFontSize(15);
    doc.text("Task Details", 20, 20);

    y = 32;

    doc.setFontSize(10);

    if (tasks.length === 0) {
      doc.text(
        "No tasks were created during the last 30 days.",
        20,
        y
      );
    }

    tasks.forEach((task: Task, index: number) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);

      doc.text(
        `${index + 1}. ${task.title}`,
        20,
        y
      );

      y += 7;

      doc.setFontSize(9);

      doc.text(
        `Status: ${task.status}`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Priority: ${task.priority}`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Category: ${task.category || "Uncategorized"}`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Created: ${
          task.createdAt
            ? formatDate(new Date(task.createdAt))
            : "N/A"
        }`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Due: ${
          task.dueDate
            ? formatDate(new Date(task.dueDate))
            : "N/A"
        }`,
        25,
        y
      );

      y += 12;
    });

    // =========================
    // Download
    // =========================

    doc.save(
      `Task-Report-${today
        .toISOString()
        .split("T")[0]}.pdf`
    );
  } catch (error) {
    console.error("Report generation error:", error);
    alert("Failed to generate report");
  }
};

  return (
    <main className="main-content">

      {/* =========================
          TOPBAR
      ========================= */}

      <div className="topbar">

        <Link
          href="/profile"
          className="profile-chip"
        >
          <Image
    src={user?.profilePic || "/default.jpg"}
    alt={user?.name || "User"}
    width={40}
    height={40}
  />

          ▾
        </Link>

      </div>


      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">

        <h1>My Profile</h1>

        <p>
          View and manage your personal information.
        </p>

      </div>


      {/* =========================
          PROFILE CARD
      ========================= */}

      <div className="profile-card">

        {/* PROFILE IMAGE */}

        <div className="profile-avatar-wrap">

          <Image
            src={
              preview ||
              user?.profilePic ||
              "/default-profile.jpg"
            }
            alt={user?.name || "Profile"}
            width={40}
            height={40}
            loading="eager"
          />


          {/* Hidden File Input */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />


          {/* Camera Button */}

          <button
            type="button"
            className="cam-btn"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            📷
          </button>

        </div>


        {/* Upload Button */}

        {selectedFile && (

          <button
            type="button"
            className="upload-profile-btn"
            onClick={handleUpload}
            disabled={uploading}
          >

            {uploading
              ? "Uploading..."
              : "Upload Picture"}

          </button>

        )}


        {/* NAME */}

        <h2>
          {user?.name}
        </h2>


        {/* =========================
            PROFILE DETAILS
        ========================= */}

        <div className="profile-detail-list">


          {/* NAME */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              👤
            </div>

            <div>

              <div className="pd-label">
                Full Name
              </div>

              {isEditing ? (

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

              ) : (

                <div className="pd-value">
                  {user?.name}
                </div>

              )}

            </div>

          </div>


          {/* EMAIL */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              ✉️
            </div>

            <div>

              <div className="pd-label">
                Email
              </div>

              <div className="pd-value">
                {user?.email}
              </div>

            </div>

          </div>


          {/* PHONE */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              📞
            </div>

            <div>

              <div className="pd-label">
                Phone
              </div>

              {isEditing ? (

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />

              ) : (

                <div className="pd-value">
                  {user?.phone}
                </div>

              )}

            </div>

          </div>


          {/* ROLE */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              🛡️
            </div>

            <div>

              <div className="pd-label">
                Role
              </div>

              <div className="pd-value">
                {user?.role}
              </div>

            </div>

          </div>


          {/* MEMBER SINCE */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              🕒
            </div>

            <div>

              <div className="pd-label">
                Member Since
              </div>

              <div className="pd-value">

                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : ""}

              </div>

            </div>

          </div>


          {/* BIO */}

          <div className="profile-detail-item">

            <div className="pd-icon">
              📝
            </div>

            <div>

              <div className="pd-label">
                Bio
              </div>

              {isEditing ? (

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />

              ) : (

                <div className="pd-value">
                  {user?.bio}
                </div>

              )}

            </div>

          </div>

        </div>


        {/* =========================
            EDIT PROFILE BUTTON
        ========================= */}

        {!isEditing ? (

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={handleEdit}
          >
            Edit Profile
          </button>

        ) : (

          <div>

            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={updateProfile}
            >
              Save Changes
            </button>


            <button
              className="btn"
              style={{
                width: "100%",
                marginTop: "10px",
              }}
              onClick={() =>
                setIsEditing(false)
              }
            >
              Cancel
            </button>

          </div>

        )}


        {/* =========================
            WEEKLY SUMMARY
        ========================= */}

        <div className="panel">

          <div className="toggle-row"></div>

          <div className="toggle-row">

            <div>

              <h4>
                Weekly Summary
              </h4>

              <p>
                Get a weekly progress report
              </p>

            </div>

            <button className="switch" onClick={handleDownloadReport}></button>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;