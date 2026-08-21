'use client'

import React from 'react'
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


import Link from 'next/link'
function Sidebar() {
const currentPath = usePathname();
 const { logout } = useAuth();

  return (
    
    <>
     <aside className="sidebar">
    <div className="sidebar-header">
      <div className="sidebar-logo">
        <span className="logo-icon">🌶️</span>
        Chili Spice
      </div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle-input" />
  <label htmlFor="menu-toggle" className="menu-toggle-btn">☰</label>
      <nav className="sidebar-nav1">
  <Link   href="/dashboard" className={currentPath==="/dashboard" ? "active":" "}><span className="icon">🏠</span> Dashboard</Link>
      <Link   href="/task" className={currentPath==="/task" ? "active":" "}><span className="icon">✅</span> My Tasks</Link>
      <Link   href="/categories" className={currentPath==="/categories" ? "active":" "}><span className="icon">🗂️</span> Categories</Link>
      <Link   href="/calender" className={currentPath==="/calender" ? "active":" "}><span className="icon">📅</span> Calendar</Link>
      <Link   href="/profile" className={currentPath==="/profile" ? "active":" "}><span className="icon">⚙️</span> Settings</Link>
  </nav>
    </div>
    
    <nav className="sidebar-nav">
      <Link   href="/dashboard" className={currentPath==="/dashboard" ? "active":" "}><span className="icon">🏠</span> Dashboard</Link>
      <Link   href="/task" className={currentPath==="/task" ? "active":" "}><span className="icon">✅</span> My Tasks</Link>
      <Link   href="/categories" className={currentPath==="/categories" ? "active":" "}><span className="icon">🗂️</span> Categories</Link>
      <Link   href="/calender" className={currentPath==="/calender" ? "active":" "}><span className="icon">📅</span> Calendar</Link>
      <Link   href="/profile" className={currentPath==="/profile" ? "active":" "}><span className="icon">⚙️</span> Settings</Link>
    </nav>
   <button className="new-task-btn" onClick={logout}>Logout</button> 
    <div className="sidebar-wave"></div>
  </aside>

    </>
  )
}

export default Sidebar
