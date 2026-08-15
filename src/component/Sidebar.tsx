'use client'

import React from 'react'
import { usePathname } from "next/navigation";

import Link from 'next/link'
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
      <Link   href="/" className={currentPath==="/dashboard" ? "active":" "}><span className="icon">🏠</span> Dashboard</Link>
      <Link   href="/tasks" className={currentPath==="/tasks" ? "active":" "}><span className="icon">✅</span> My Tasks</Link>
      <Link   href="/categories" className={currentPath==="/categories" ? "active":" "}><span className="icon">🗂️</span> Categories</Link>
      <Link   href="/calendar" className={currentPath==="/calender" ? "active":" "}><span className="icon">📅</span> Calendar</Link>
      <Link   href="/settings" className={currentPath==="/settingPage" ? "active":" "}><span className="icon">⚙️</span> Settings</Link>
    </nav>
    <button className="new-task-btn">＋ New Task</button>
    <div className="sidebar-wave"></div>
  </aside>

    </>
  )
}

export default Sidebar
