'use client'

import React from 'react'
import { usePathname } from "next/navigation";


function Sidebar() {
const currentPath = usePathname();
console.log(currentPath);
  return (
    <>
     <aside className="sidebar">
    <div className="sidebar-header">
      <div className="sidebar-logo">
        <span className="logo-icon">🌶️</span>
        Chili Spice
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle-input"/>
      <label htmlFor="menu-toggle" className="menu-toggle-btn">☰</label>
    </div>
    <nav className="sidebar-nav">
      <a href="index.html" className={currentPath==="/dashboard" ? "active":" "}><span className="icon">🏠</span> Dashboard</a>
      <a href="tasks.html" className={currentPath==="/tasks" ? "active":" "}><span className="icon">✅</span> My Tasks</a>
      <a href="categories.html" className={currentPath==="/categories" ? "active":" "}><span className="icon">🗂️</span> Categories</a>
      <a href="calendar.html" className={currentPath==="/calender" ? "active":" "}><span className="icon">📅</span> Calendar</a>
      <a href="settings.html" className={currentPath==="/settingPage" ? "active":" "}><span className="icon">⚙️</span> Settings</a>
    </nav>
    <button className="new-task-btn">＋ New Task</button>
    <div className="sidebar-wave"></div>
  </aside>

    </>
  )
}

export default Sidebar
