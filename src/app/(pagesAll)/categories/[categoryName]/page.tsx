"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {useAuth} from "@/context/AuthContext"

interface Task {
  _id: string;
  title: string;
  description?: string;
  priority?: string;
  status: string;
  dueDate?: string;
  category?: string;
}

function CategoryTasks() {
  const params = useParams();

  const categoryName = decodeURIComponent(
    params.categoryName as string
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} =useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/task", {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          const fetchedTasks = data.tasks || data;

          const categoryTasks = fetchedTasks.filter(
            (task: Task) =>
              task.category?.trim().toLowerCase() ===
              categoryName.trim().toLowerCase()
          );

          setTasks(categoryTasks);
        }
      } catch (error) {
        console.error("Error fetching category tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchTasks();
    }
  }, [categoryName]);

  return (
    <main className="main-content">

      {/* Topbar */}
       <div  className="topbar">
     <Link href="/profile"  className="profile-chip"> <img src={user?.profilePic}/> ▾</Link>
    </div>
      {/* Header */}
      <div className="page-header">

        <div>

          <Link
            href="/categories"
            className="back-link"
          >
            ← Back to Categories
          </Link>

          <h1>
            {categoryName}
          </h1>

          <p>
            {tasks.length} task
            {tasks.length !== 1 ? "s" : ""} in this category.
          </p>

        </div>

      </div>

      {/* Tasks */}
      <div className="tasks-container">

        {loading ? (

          <p>Loading tasks...</p>

        ) : tasks.length === 0 ? (

          <div className="empty-category">

            <span>📁</span>

            <h3>
              No tasks found
            </h3>

            <p>
              There are no tasks in this category.
            </p>

          </div>

        ) : (

          tasks.map((task) => (

            <div
              className="task-card"
              key={task._id}
            >

              <div className="task-card-content">

                <h3>
                  {task.title}
                </h3>

                {task.description && (
                  <p>
                    {task.description}
                  </p>
                )}

                <div className="task-meta">

                  {task.priority && (
                    <span
                      className={`priority-badge ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  )}

                  <span
                    className={`status-badge ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  {task.dueDate && (
                    <span>
                      📅{" "}
                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </main>
  );
}

export default CategoryTasks;
