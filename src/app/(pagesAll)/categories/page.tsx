"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image"

interface Task {
  _id: string;
  title: string;
  category?: string;
  status: string;
}

function Categories() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search] = useState("");
  const [loading, setLoading] = useState(true);
  const {user} =useAuth()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/task", {
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks || data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Same category wale tasks ko group karna
  const groupedCategories = tasks.reduce(
    (acc: Record<string, Task[]>, task) => {
      if (!task.category) return acc;

      if (!acc[task.category]) {
        acc[task.category] = [];
      }

      acc[task.category].push(task);

      return acc;
    },
    {}
  );

  // Search
  const filteredCategories = Object.entries(groupedCategories).filter(
    ([categoryName]) =>
      categoryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
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

        <h1>Categories</h1>

        <p>
          Organize your tasks by category.
        </p>

      </div>


      <div className="category-grid">

        {loading ? (

          <p>Loading categories...</p>

        ) : filteredCategories.length === 0 ? (

          <p>No categories found.</p>

        ) : (

          filteredCategories.map(
            ([categoryName, categoryTasks]) => {

              const total = categoryTasks.length;

              const completed = categoryTasks.filter(
                (task) => task.status === "Done"
              ).length;

              const percentage =
                total === 0
                  ? 0
                  : Math.round(
                      (completed / total) * 100
                    );

              return (

                <Link href={`/categories/${encodeURIComponent(categoryName)}`}
                  className="category-card"
                  key={categoryName}
                >

                  <div
                    className="cat-icon"
                    style={{
                      background: "#581519",
                    }}
                  >
                    📁
                  </div>

                  <h3>
                    {categoryName}
                  </h3>

                  <p>
                    {total} task
                    {total !== 1 ? "s" : ""} in this category
                  </p>

                  <div className="cat-bar">

                    <div
                      className="cat-bar-fill"
                      style={{
                        width: `${percentage}%`,
                        background: "#bd0e1a",
                      }}
                    />

                  </div>

                  <div className="cat-footer">

                    <span>
                      {completed} of {total} done
                    </span>

                    <span>
                      {percentage}%
                    </span>

                  </div>

                </Link>

              );
            }
          )

        )}

      </div>

    </main>
  );
}

export default Categories;