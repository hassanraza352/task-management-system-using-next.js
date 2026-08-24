'use client'
import Link from 'next/link'
import { useEffect, useState } from "react";
import {useAuth} from '@/context/AuthContext'
import Image from "next/image"
interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  category: string;
  tags: string[];
}

function Calender() {
  const [tasks, setTasks] = useState<Task[]>([]);

const [currentDate, setCurrentDate] = useState(new Date());
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
  const { user } = useAuth();
const monthName = currentDate.toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task");

      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Calendar tasks error:", error);
    }
  };

  fetchTasks();
}, []);

const previousMonth = () => {
  setCurrentDate(
    new Date(year, month - 1, 1)
  );
};

const nextMonth = () => {
  setCurrentDate(
    new Date(year, month + 1, 1)
  );
};
const firstDay = new Date(year, month, 1).getDay();

const daysInMonth = new Date(
  year,
  month + 1,
  0
).getDate();
const calendarDays = [];

for (let i = 0; i < firstDay; i++) {
  calendarDays.push(null);
}

for (let day = 1; day <= daysInMonth; day++) {
  calendarDays.push(day);
}

  return (
   <main className="main-content">
     <div  className="topbar">
     <Link href="/profile"  className="profile-chip"> <Image
  src={user?.profilePic || "/default.png"}
  alt={user?.name || "User"}
  width={40}
  height={40}
/>▾</Link>
    </div>

    <div className="page-header">
      <h1>Calendar</h1>
      <p>Track your tasks and deadlines by date.</p>
    </div>

    <div className="panel">
      <div className="calendar-head">
        <h2>{monthName}</h2>
        <div className="calendar-nav">
         <button onClick={previousMonth}>‹</button>

  <button onClick={nextMonth}>›</button>
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
{calendarDays.map((day, index) => {
  if (day === null) {
    return (
      <div
        key={`empty-${index}`}
        className="calendar-cell empty"
      ></div>
    );
  }

  const dayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);

    return (
      taskDate.getFullYear() === year &&
      taskDate.getMonth() === month &&
      taskDate.getDate() === day
    );
  });

  const today = new Date();

  const isToday =
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <div
      key={day}
      className={`calendar-cell ${isToday ? "today" : ""}`}
       >
      <span className="date-num">
        {day}
      </span>

      {dayTasks.slice(0,3).map((task) => (
        <span
          key={task._id}
          className={`cal-event ${
            task.priority.toLowerCase() === "low"
              ? "green"
              : task.priority.toLowerCase() === "medium"
              ? "orange"
              : ""
          }`}
        >
          {task.title}
        </span>
      ))}
    </div>
  );
})}
       </div>
    </div>
  </main>
  )
}

export default Calender
