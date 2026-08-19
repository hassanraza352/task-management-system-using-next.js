"use client";

import { useState } from "react";

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

interface UpdateTaskProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  onClose: () => void;
}

export default function UpdateTask({
  task,
  onTaskUpdated,
  onClose,
}: UpdateTaskProps) { {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : ""
  );
  const [category, setCategory] = useState(task.category);
  const [tags, setTags] = useState(task.tags.join(", "));

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/task/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          status,
          dueDate,
          category,
          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      console.log("UPDATE RESPONSE:", data);

      if (!response.ok) {
        console.error(data.message);
        return;
      }

      console.log("Task updated successfully");
      onTaskUpdated(data.task);
onClose();
    } catch (error) {
      console.error("Update task error:", error);
    }
  };

  return (
    <div className="add-task-box">

      <div className="add-task-header">
        <h2>Update Task</h2>

        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="add-task-form">

        <div className="form-group">
          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            placeholder="Enter task description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

        </div>

        <div className="form-row">

          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              type="text"
              placeholder="e.g. University, Freelancing, Personal...."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Tags</label>

          <input
            type="text"
            placeholder="e.g. frontend, urgent"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="add-btn"
            onClick={handleUpdate}
          >
            Update Task
          </button>

        </div>

      </div>
    </div>
  );
}}