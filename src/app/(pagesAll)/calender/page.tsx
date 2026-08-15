import React from 'react'
import Link from 'next/link'

function Calender() {
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
      <h1>Calendar</h1>
      <p>Track your tasks and deadlines by date.</p>
    </div>

    <div className="panel">
      <div className="calendar-head">
        <h2>May 2024</h2>
        <div className="calendar-nav">
          <button>‹</button>
          <button>›</button>
        </div>
      </div>

      <div className="calendar-grid">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>

        <div className="calendar-cell empty"></div>
        <div className="calendar-cell empty"></div>
        <div className="calendar-cell empty"></div>
        <div className="calendar-cell"><span className="date-num">1</span></div>
        <div className="calendar-cell"><span className="date-num">2</span></div>
        <div className="calendar-cell"><span className="date-num">3</span></div>
        <div className="calendar-cell"><span className="date-num">4</span></div>

        <div className="calendar-cell"><span className="date-num">5</span></div>
        <div className="calendar-cell"><span className="date-num">6</span></div>
        <div className="calendar-cell"><span className="date-num">7</span></div>
        <div className="calendar-cell"><span className="date-num">8</span></div>
        <div className="calendar-cell"><span className="date-num">9</span></div>
        <div className="calendar-cell"><span className="date-num">10</span></div>
        <div className="calendar-cell"><span className="date-num">11</span></div>

        <div className="calendar-cell"><span className="date-num">12</span></div>
        <div className="calendar-cell"><span className="date-num">13</span></div>
        <div className="calendar-cell"><span className="date-num">14</span><span className="cal-event green">Update roles</span></div>
        <div className="calendar-cell"><span className="date-num">15</span><span className="cal-event green">Client review</span></div>
        <div className="calendar-cell"><span className="date-num">16</span></div>
        <div className="calendar-cell today"><span className="date-num">17</span><span className="cal-event">Team meeting</span></div>
        <div className="calendar-cell"><span className="date-num">18</span><span className="cal-event orange">Auth task due</span></div>

        <div className="calendar-cell"><span className="date-num">19</span><span className="cal-event orange">Fix issues</span></div>
        <div className="calendar-cell"><span className="date-num">20</span><span className="cal-event">Landing page</span></div>
        <div className="calendar-cell"><span className="date-num">21</span><span className="cal-event orange">DB schema</span></div>
        <div className="calendar-cell"><span className="date-num">22</span></div>
        <div className="calendar-cell"><span className="date-num">23</span><span className="cal-event">CI/CD setup</span></div>
        <div className="calendar-cell"><span className="date-num">24</span><span className="cal-event orange">Sprint demo</span></div>
        <div className="calendar-cell"><span className="date-num">25</span><span className="cal-event">API docs</span></div>

        <div className="calendar-cell"><span className="date-num">26</span><span className="cal-event">Unit tests</span></div>
        <div className="calendar-cell"><span className="date-num">27</span><span className="cal-event">Optimize images</span></div>
        <div className="calendar-cell"><span className="date-num">28</span></div>
        <div className="calendar-cell"><span className="date-num">29</span></div>
        <div className="calendar-cell"><span className="date-num">30</span></div>
        <div className="calendar-cell"><span className="date-num">31</span></div>
        <div className="calendar-cell empty"></div>
      </div>
    </div>
  </main>
  )
}

export default Calender
