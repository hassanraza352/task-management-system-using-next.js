import React from 'react'
import Link from 'next/link'

function Setting() {
  return (
     <main className="main-content">
    <div className="topbar">
      <div className="search-box">🔍 <input type="text" placeholder="Search settings..."/> <kbd>⌘ K</kbd></div>
      <div className="topbar-actions">
        <div className="icon-btn">🔔<span className="dot">2</span></div>
        <div className="icon-btn">☀️</div>
        <Link   href="/profile" className="profile-chip"><img src="https://i.pravatar.cc/64?img=13" alt="Ali Raza"/> ▾</Link> 
      </div>
    </div>

    <div className="page-header">
      <h1>Settings</h1>
      <p>Manage your account and app preferences.</p>
    </div>

    <div className="settings-grid">
      <div className="settings-tabs">
        <Link   href="#" className="active">👤 Account</Link> 
        <Link   href="#">🔔 Notifications</Link> 
        <Link   href="#">🔒 Security</Link> 
        <Link   href="#">🎨 Appearance</Link> 
        <Link   href="#">🌐 Language</Link> 
      </div>

      <div>
        <div className="panel">
          <div className="panel-title">Account Information</div>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value="Ali Raza"/>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value="ali.raza@example.com"/>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" value="+92 300 1234567"/>
            </div>
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>User</option>
                <option>Admin</option>
                <option>Manager</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea rows={3}>Productivity enthusiast. Always building and learning.</textarea>
          </div>
          <button className="btn btn-primary">Save Changes</button>
        </div>

        <div className="panel">
          <div className="panel-title">Notification Preferences</div>
          <div className="toggle-row">
            <div><h4>Email Notifications</h4><p>Receive task updates via email</p></div>
            <div className="switch on"></div>
          </div>
          <div className="toggle-row">
            <div><h4>Push Notifications</h4><p>Get notified on your device</p></div>
            <div className="switch on"></div>
          </div>
          <div className="toggle-row">
            <div><h4>Weekly Summary</h4><p>Get a weekly progress report</p></div>
            <div className="switch"></div>
          </div>
          <div className="toggle-row">
            <div><h4>Task Reminders</h4><p>Remind me before deadlines</p></div>
            <div className="switch on"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Setting
