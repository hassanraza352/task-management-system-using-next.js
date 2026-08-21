  'use client'
import Link from 'next/link'
import {useEffect,useState} from "react"
import AddNewTask from '@/component/AddNewTask'
import UpdateTask from '@/component/UpdateTask'
import { useAuth } from '@/context/AuthContext'
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



function Task() {
  const [showAddTask, setShowAddTask] = useState(false); 
const [showMenu, setShowMenu] = useState<string | null>(null);
const[showUpdateTask ,setshowUpdateTask]=useState(false);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
const {user} =useAuth();



const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task");
     


      const data = await response.json();
      console.log("response",data);

      if (response.ok) {
        setTasks(data.tasks);
      }

    } catch (error) {
      console.error("Fetch tasks error:", error);
    }
  };

  fetchTasks();
}, []);
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

    console.log("COMPLETE RESPONSE:", data);

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
const DeleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`/api/task/${taskId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("DELETE RESPONSE:", data);
    if (!response.ok) {
      console.error(data.message);
      return;
    }
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  } catch (error) {
    console.error("Delete task error:", error);
  }


}
  return (
    <main  className="main-content">
    <div  className="topbar">
     <Link href="/profile"  className="profile-chip"> <Image
    src={user?.profilePic || "/default.png"}
    alt={user?.name || "User"}
    width={40}
    height={40}
    loading="eager"
  /> ▾</Link>
    </div>

    <div  className="page-header">
      <h1>My Tasks</h1>
       <button className="new-task-btn" onClick={() => setShowAddTask(true)}
        >＋ New Task</button>
        {showAddTask && (
 <AddNewTask
  onClose={() => setShowAddTask(false)}
  onTaskAdded={(newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  }}
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

   {tasks.map((task) => (
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
        <span className={`priority ${task.priority?.toLowerCase()}`}>
          {task.priority} Priority
        </span>

        &nbsp;•&nbsp; Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </div>
    </div>

    <span className={`status-badge ${task.status?.toLowerCase().replace(" ", "-")}`}>
      {task.status}
    </span>

    <div className="task-menu">

      <button
        className="more-dots"
        onClick={() => setShowMenu(showMenu === task._id ? null : task._id)}
      >
        ⋮
      </button>

      {showMenu === task._id && (
        <div className="dropdown-menu">

         <button
  onClick={() => {
     console.log("UPDATE CLICKED:", task);
    setSelectedTask(task);
    setshowUpdateTask(true);
    setShowMenu(null);
  }}
>
  Update
</button>
          
          <button onClick={()=>{
            console.log("DELETE CLICKED:", task);
            DeleteTask(task._id);
             setShowMenu(null);


          }}>
            Delete
          </button>

        </div>
      )}

    </div>
    
  </div>
  
))}
{showUpdateTask && selectedTask && (
  <UpdateTask
    task={selectedTask}
    onTaskUpdated={(updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    }}
    onClose={() => {
      setshowUpdateTask(false);
      setSelectedTask(null);
    }}
  />
)}
  {/* <div  className="task-item">
        <div  className="task-check done">✓</div>
        <div  className="task-info"><h4>Update user roles</h4><div  className="task-meta"><span  className="priority medium">Medium Priority</span> &nbsp;•&nbsp; Due: May 14, 2024</div></div>
        <span  className="status-badge done">Done</span><span  className="more-dots">⋮</span>
      </div> */}

      {/* 
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
        <div  className="task-check"></div>
        <div  className="task-info"><h4>Optimize images</h4><div  className="task-meta"><span  className="priority low">Low Priority</span> &nbsp;•&nbsp; Due: May 27, 2024</div></div>
        <span  className="status-badge todo">To Do</span><span  className="more-dots">⋮</span>
      </div>
      <div  className="task-item">
        <div   className="task-check"></div>
        <div  className="task-info"><h4>Prepare sprint demo</h4><div  className="task-meta"><span  className="priority high">High Priority</span> &nbsp;•&nbsp; Due: May 24, 2024</div></div>
        <span  className="status-badge progress">In Progress</span><span  className="more-dots">⋮</span>
      </div> */}
    </div>
  </main>
  )
}

export default Task
