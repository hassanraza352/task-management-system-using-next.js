import React from 'react'

function Categories() {
  return (
    <main className="main-content">
    <div className="topbar">
      <div className="search-box">🔍 <input type="text" placeholder="Search categories..."/> <kbd>⌘ K</kbd></div>
      <div className="topbar-actions">
        <div className="icon-btn">🔔<span className="dot">2</span></div>
        <div className="icon-btn">☀️</div>
        <a href="profile.html" className="profile-chip"><img src="https://i.pravatar.cc/64?img=13" alt="Ali Raza"/> ▾</a>
      </div>
    </div>

    <div className="page-header">
      <h1>Categories</h1>
      <p>Organize your tasks by category.</p>
    </div>

    <div className="category-grid">

      <div className="category-card">
        <div className="cat-icon" style={{background:"#e0342e"}}>🎨</div>
        <h3>Design</h3>
        <p>UI/UX and visual design tasks</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{width:"60%",background:"#e0342e"}}></div></div>
        <div className="cat-footer"><span>3 of 5 done</span><span>60%</span></div>
      </div>

      <div className="category-card">
        <div className="cat-icon" style={{background:"#f59e0b"}}>💻</div>
        <h3>Development</h3>
        <p>Coding and implementation tasks</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{width:"40%",background:"#f59e0b"}}></div></div>
        <div className="cat-footer"><span>2 of 5 done</span><span>40%</span></div>
      </div>

      <div className="category-card">
        <div className="cat-icon" style={{background:"#22c55e"}}>📢</div>
        <h3>Marketing</h3>
        <p>Campaigns and content tasks</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{width:"80%",background:"#22c55e"}}></div></div>
        <div className="cat-footer"><span>4 of 5 done</span><span>80%</span></div>
      </div>

      <div className="category-card">
        <div className="cat-icon" style={{background:"#6e0f13"}}>📞</div>
        <h3>Meetings</h3>
        <p>Calls, standups and reviews</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{ width: "100%", background: "#6e0f13",}}></div></div>
        <div className="cat-footer"><span>3 of 3 done</span><span>100%</span></div>
      </div>

      <div className="category-card">
        <div className="cat-icon" style={{background:"#0ea5e9"}}>📄</div>
        <h3>Documentation</h3>
        <p>Docs, guides and reports</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{ width: "20%", background: "#0ea5e9",}}></div></div>
        <div className="cat-footer"><span>1 of 5 done</span><span>20%</span></div>
      </div>

      <div className="category-card">
        <div className="cat-icon" style={{background:"#9333ea"}}>🧪</div>
        <h3>Testing</h3>
        <p>QA and bug fixing tasks</p>
        <div className="cat-bar"><div className="cat-bar-fill" style={{width:"50%",background:"#9333ea"}}></div></div>
        <div className="cat-footer"><span>2 of 4 done</span><span>50%</span></div>
      </div>

    </div>
  </main>
  )
}

export default Categories
