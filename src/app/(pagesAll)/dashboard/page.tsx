import React from 'react'

function Dashboard() {
  return (
   <>
   <main className="main-content">

    <div className="topbar">
      <div className="search-box">🔍 <input type="text" placeholder="Search tasks..."/> <kbd>⌘ K</kbd></div>
      <div className="topbar-actions">
        <div className="icon-btn">🔔<span className="dot">2</span></div>
        <div className="icon-btn">☀️</div>
        <a href="profile.html" className="profile-chip">
          <img src="https://i.pravatar.cc/64?img=13" alt="Ali Raza"/>
          ▾
        </a>
      </div>
    </div>

    <div className="page-header">
      <h1>Dashboard</h1>
      <p>Welcome back, Ali! Here&apos;s what&apos;s happening with your tasks.</p>
    </div>

    <div className="stats-row">
      <div className="stat-card pink">
        <div className="stat-icon">🔄</div>
        <div className="stat-value">12</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card orange">
        <div className="stat-icon">📋</div>
        <div className="stat-value">5</div>
        <div className="stat-label">To Do</div>
      </div>
      <div className="stat-card red">
        <div className="stat-icon">🔄</div>
        <div className="stat-value">4</div>
        <div className="stat-label">In Progress</div>
      </div>
      <div className="stat-card dark">
        <div className="stat-icon">✔️</div>
        <div className="stat-value">3</div>
        <div className="stat-label">Completed</div>
      </div>
    </div>

    <div className="content-grid">
      {/* <!-- Left column --> */}
      <div>
        <div className="panel">
          <div className="panel-title">Tasks Overview</div>
          <div className="tabs">
            <button className="tab-btn active">All</button>
            <button className="tab-btn">To Do</button>
            <button className="tab-btn">In Progress</button>
            <button className="tab-btn">Done</button>
          </div>

          <div className="task-item">
            <div className="task-check"></div>
            <div className="task-info">
              <h4>Design landing page</h4>
              <div className="task-meta"><span className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 20, 2024</div>
            </div>
            <span className="status-badge todo">To Do</span>
            <span className="more-dots">⋮</span>
          </div>

          <div className="task-item">
            <div className="task-check"></div>
            <div className="task-info">
              <h4>Implement authentication</h4>
              <div className="task-meta"><span className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 18, 2024</div>
            </div>
            <span className="status-badge progress">In Progress</span>
            <span className="more-dots">⋮</span>
          </div>

          <div className="task-item">
            <div className="task-check"></div>
            <div className="task-info">
              <h4>Write API documentation</h4>
              <div className="task-meta"><span className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 25, 2024</div>
            </div>
            <span className="status-badge todo">To Do</span>
            <span className="more-dots">⋮</span>
          </div>

          <div className="task-item">
            <div className="task-check done">✓</div>
            <div className="task-info">
              <h4>Team meeting</h4>
              <div className="task-meta"><span className="priority low">Low Priority</span> &nbsp;•&nbsp; Due: May 17, 2024</div>
            </div>
            <span className="status-badge done">Done</span>
            <span className="more-dots">⋮</span>
          </div>

          <div className="task-item">
            <div className="task-check"></div>
            <div className="task-info">
              <h4>Fix responsive issues</h4>
              <div className="task-meta"><span className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 19, 2024</div>
            </div>
            <span className="status-badge progress">In Progress</span>
            <span className="more-dots">⋮</span>
          </div>

          <a href="tasks.html" className="view-all">View all tasks →</a>
        </div>
      </div>

      {/* <!-- Right column --> */}
      <div>
        <div className="panel">
          <div className="panel-title">Task by Status</div>
          <div className="donut-wrap">
            <div className="donut"></div>
            <div className="legend">
              <div className="legend-item"><span className="legend-dot red"></span> To Do <strong>5 (42%)</strong></div>
              <div className="legend-item"><span className="legend-dot orange"></span> In Progress <strong>4 (33%)</strong></div>
              <div className="legend-item"><span className="legend-dot green"></span> Done <strong>3 (25%)</strong></div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Upcoming Tasks</div>

          <div className="upcoming-item">
            <span className="date-chip">May 17</span>
            <span className="u-title">Team meeting</span>
            <span className="pill low">Low</span>
          </div>
          <div className="upcoming-item">
            <span className="date-chip">May 18</span>
            <span className="u-title">Implement authentication</span>
            <span className="pill high">High</span>
          </div>
          <div className="upcoming-item">
            <span className="date-chip">May 19</span>
            <span className="u-title">Fix responsive issues</span>
            <span className="pill medium">Medium</span>
          </div>

          <a href="calendar.html" className="view-all">View calendar →</a>
        </div>
      </div>
    </div>

  </main>
   
   </>
  )
}

export default Dashboard
