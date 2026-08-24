"use client";
import Link from 'next/link'
import {useAuth} from '@/context/AuthContext'
import {useState,useEffect} from "react";
import Loading from "@/app/(pagesAll)/dashboard/loading";
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

function Dashboard() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);



  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task");

      const data = await response.json();


      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Dashboard tasks error:", error);
    } finally {
      setTasksLoading(false);
    }
  };

  fetchTasks();
}, []);

 const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const todoPercentage =
  totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0;

const progressPercentage =
  totalTasks > 0 ? Math.round((progressTasks / totalTasks) * 100) : 0;

const completedPercentage =
  totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;



 if (loading || tasksLoading) {
  return <Loading />;
}

const handleTaskComplete = async (task: Task) => {
  try {
    const response = await fetch(`/api/task/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "Done",
        dueDate: task.dueDate,
        category: task.category,
        tags: task.tags,
      }),
    });

    const data = await response.json();


    if (!response.ok) {
      console.error(data.message);
      return;
    }

    setTasks((prev) =>
      prev.map((item) =>
        item._id === task._id ? data.task : item
      )
    );
  } catch (error) { 
    console.error("Complete task error:", error);
  }
};

const upcomingTasks = [...tasks]
  .filter((task) => task.dueDate && task.status !== "Done")
  .sort(
    (a, b) =>
      new Date(a.dueDate).getTime() -
      new Date(b.dueDate).getTime()
  )
  .slice(0, 3);



  return (

   <>
   <main className="main-content">

     <div  className="topbar">
     <Link href="/profile"  className="profile-chip">  <Image
    src={user?.profilePic || "/default.jpg"}
    alt={user?.name || "User"}
    width={40}
    height={40}
  /> ▾</Link>
    </div>

    <div className="page-header">
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.name || "User"}! Here&apos;s what&apos;s happening with your tasks.</p>
    </div>

    <div className="stats-row">
      <div className="stat-card pink">
        <div className="stat-icon">🔄</div>
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-label">Total Tasks</div>
      </div>
      <div className="stat-card orange">
        <div className="stat-icon">📋</div>
        <div className="stat-value">{todoTasks}</div>
        <div className="stat-label">To Do</div>
      </div>
      <div className="stat-card red">
        <div className="stat-icon">🔄</div>
        <div className="stat-value">{progressTasks}</div>
        <div className="stat-label">In Progress</div>
      </div>
      <div className="stat-card dark">
        <div className="stat-icon">✔️</div>
        <div className="stat-value">{completedTasks}</div>
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

         {tasks.slice(0, 5).map((task) => (
  <div className="task-item" key={task._id}>

    <button
  className={`task-check ${
    task.status === "Done" ? "done" : ""
  }`}
  onClick={() => handleTaskComplete(task)}
>
  {task.status === "Done" && "✓"}
</button>

    <div className="task-info" title={task.description}>
      <h4>{task.title}</h4>

      <div className="task-meta">
        <span
          className={`priority ${task.priority.toLowerCase()}`}
        >
          {task.priority} Priority
        </span>

        &nbsp;•&nbsp; Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </div>
    </div>

    <span
      className={`status-badge ${
        task.status === "Todo"
          ? "todo"
          : task.status === "In Progress"
          ? "in-progress"
          : "done"
      }`}
    >
      {task.status}
    </span>

  </div>
))}

          <Link   href="/task" className="view-all">View all tasks →</Link>  
        </div>
      </div>

      {/* <!-- Right column --> */}
      <div>
        <div className="panel">
          <div className="panel-title">Task by Status</div>
          <div className="donut-wrap">
            <div className="donut" style={{
    "--todo": `${todoPercentage}%`,
    "--progress": `${progressPercentage}%`,
    "--done": `${completedPercentage}%`,
  } as React.CSSProperties}
  ></div>
            <div className="legend">
              <div className="legend-item"><span className="legend-dot red"></span> To Do <strong>{todoTasks} ({todoPercentage}%)</strong></div>
              <div className="legend-item"><span className="legend-dot orange"></span> In Progress <strong>{progressTasks} ({progressPercentage}%)</strong></div>
              <div className="legend-item"><span className="legend-dot green"></span> Done <strong>{completedTasks} ({completedPercentage}%)</strong></div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Upcoming Tasks</div>

        {upcomingTasks.map((task) => (
  <div className="upcoming-item" key={task._id}>

    <span className="date-chip">
      {new Date(task.dueDate).toLocaleDateString([], {
        month: "short",
        day: "numeric",
      })}
    </span>

    <span className="u-title" title={task.description}>
      {task.title}
    </span>

    <span className={`pill ${task.priority.toLowerCase()}`}>
      {task.priority}
    </span>

  </div>
))}

          <Link   href="/calender" className="view-all">View calendar →</Link>  
        </div>
      </div>
    </div>


  </main>
   
   </>
  )
}

export default Dashboard
