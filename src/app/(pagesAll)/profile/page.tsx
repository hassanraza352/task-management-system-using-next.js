"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
          <img
            src={
              user?.profilePic ||
              "/default-profile.png"
            }
            alt={user?.name || "Profile"}
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

          <img
            src={
              preview ||
              user?.profilePic ||
              "/default-profile.png"
            }
            alt={user?.name || "Profile"}
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

            <div className="switch"></div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Profile;