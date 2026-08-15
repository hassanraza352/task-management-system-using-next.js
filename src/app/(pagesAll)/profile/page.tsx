import React from 'react'
import Link from 'next/link'

function Profile() {
  return (
    <main className="main-content">
    <div className="topbar">
      <div className="search-box">🔍 <input type="text" placeholder="Search tasks..."/> <kbd>⌘ K</kbd></div>
      <div className="topbar-actions">
        <div className="icon-btn">🔔<span className="dot">2</span></div>
        <div className="icon-btn">☀️</div>
        <Link   href="/profile" className="profile-chip"><img src="https://i.pravatar.cc/64?img=13" alt="Ali Raza"/> ▾</Link>  
      </div>
    </div>

    <div className="page-header">
      <h1>My Profile</h1>
      <p>View and manage your personal information.</p>
    </div>

    <div className="profile-card">
      <div className="profile-avatar-wrap">
        <img src="https://i.pravatar.cc/200?img=13" alt="Ali Raza"/>
        <div className="cam-btn">📷</div>
      </div>
      <h2>Ali Raza</h2>
      <span className="premium-tag">Premium User</span>

      <div className="profile-detail-list">
        <div className="profile-detail-item">
          <div className="pd-icon">👤</div>
          <div><div className="pd-label">Full Name</div><div className="pd-value">Ali Raza</div></div>
        </div>
        <div className="profile-detail-item">
          <div className="pd-icon">✉️</div>
          <div><div className="pd-label">Email</div><div className="pd-value">ali.raza@example.com</div></div>
        </div>
        <div className="profile-detail-item">
          <div className="pd-icon">📞</div>
          <div><div className="pd-label">Phone</div><div className="pd-value">+92 300 1234567</div></div>
        </div>
        <div className="profile-detail-item">
          <div className="pd-icon">🛡️</div>
          <div><div className="pd-label">Role</div><div className="pd-value">User</div></div>
        </div>
        <div className="profile-detail-item">
          <div className="pd-icon">🕒</div>
          <div><div className="pd-label">Member Since</div><div className="pd-value">May 12, 2024</div></div>
        </div>
        <div className="profile-detail-item">
          <div className="pd-icon">📝</div>
          <div><div className="pd-label">Bio</div><div className="pd-value">Productivity enthusiast 🚀 Always building and learning.</div></div>
        </div>
      </div>

      <button className="btn btn-primary" style={{width:"100%"}}>Edit Profile</button>
    </div>
  </main>
  )
}

export default Profile
