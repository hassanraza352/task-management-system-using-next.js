'use client'


import React from 'react'
import Link from 'next/link'
import {useState} from "react"
import AddNewTask from '@/component/AddNewTask'



function Task() {
  const [showAddTask, setShowAddTask] = useState(false); 
  
  return (
    <main  className="main-content">
    <div  className="topbar">
      <div  className="search-box">🔍 <input type="text" placeholder="Search tasks..."/> <kbd>⌘ K</kbd></div>
      <div  className="topbar-actions">
        <div  className="icon-btn">🔔<span  className="dot">2</span></div>
        <div  className="icon-btn">☀️</div>
        <Link href="profile.html"  className="profile-chip"> <img src="https://i.pravatar.cc/64?img=13" alt="Ali Raza"/> ▾</Link>
      </div>
    </div>

    <div  className="page-header">
      <h1>My Tasks</h1>
       <button className="new-task-btn" onClick={() => setShowAddTask(true)}
        >＋ New Task</button>
        {showAddTask && (
  <AddNewTask
    onClose={() => setShowAddTask(false)}
  />
)}

      <p>All your tasks in one place — 12 total.</p>

    </div>

    <div  className="panel">
      <div  className="tabs">
        <button  className="tab-btn active">All (12)</button>
        <button  className="tab-btn">To Do (5)</button>
        <button  className="tab-btn">In Progress (4)</button>
        <button  className="tab-btn">Done (3)</button>
      </div>

      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Design landing page</h4><div  className="task-meta"><span  className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 20, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Implement authentication</h4><div  className="task-meta"><span  className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 18, 2024</div></div>
        <span  className="status-badge progress">In Progress</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Write API documentation</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 25, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check done">✓</div>
        <div  className="task-info"><h4>Team meeting</h4><div  className="task-meta"><span  className="priority low">Low Priority</span> &nbsp;•&nbsp; Due: May 17, 2024</div></div>
        <span  className="status-badge done">Done</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Fix responsive issues</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 19, 2024</div></div>
        <span  className="status-badge progress">In Progress</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Design database schema</h4><div  className="task-meta"><span  className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 21, 2024</div></div>
        <span  className="status-badge progress">In Progress</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Setup CI/CD pipeline</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 23, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check done">✓</div>
        <div  className="task-info"><h4>Client feedback review</h4><div  className="task-meta"><span  className="priority low">Low Priority</span> &nbsp;•&nbsp; Due: May 15, 2024</div></div>
        <span  className="status-badge done">Done</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check done">✓</div>
        <div  className="task-info"><h4>Update user roles</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 14, 2024</div></div>
        <span  className="status-badge done">Done</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Write unit tests</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 26, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Optimize images</h4><div  className="task-meta"><span  className="priority low">Low Priority</span> &nbsp;•&nbsp; Due: May 27, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div   className="task-check"></div>
        <div  className="task-info"><h4>Prepare sprint demo</h4><div  className="task-meta"><span  className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 24, 2024</div></div>
        <span  className="status-badge progress">In Progress</span><span  className="more-dots">⋮</span>
      </div>
    </div>
  </main>
  )
}

export default Task
