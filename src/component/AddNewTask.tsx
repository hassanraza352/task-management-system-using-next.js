"use client";
import {useState} from "react";
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

interface AddNewTaskProps {
  onClose: () => void;
  onTaskAdded: (task: Task) => void;
}

export default function AddNewTask({ onClose, onTaskAdded }: AddNewTaskProps){
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("Low");
const [status, setStatus] = useState("Todo");
const [dueDate, setDueDate] = useState("");
const [category, setCategory] = useState("");
const [tags, setTags] = useState("");


const handleSubmit = async () => {
  try {
    const response = await fetch("/api/task", {
      method: "POST",
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


    if (!response.ok) {
      console.log("Request failed:", data.message);
      return;
    }


    onTaskAdded(data.task);
    onClose();

  } catch (error) {
    console.error("Add task error:", error);
  }
};
  return (
    <div className="add-task-box">

      <div className="add-task-header">
        <h2>New Task</h2>

        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="add-task-form">

        {/* Task Title */}
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
             value={title}
  onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Priority + Status */}
        <div className="form-row">

          <div className="form-group">
            <label>Priority</label>

            <select  value={priority}
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

            <select  value={status}
            onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

        </div>

        {/* Due Date + Category */}
        <div className="form-row">

          <div className="form-group">
            <label>Due Date</label>

            <input type="date" value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  />
          </div>

         <div className="form-group">
            <label>Category</label>

             <input title="ensure to make category name same "
               type="text"
               placeholder="e.g. University, Freelancing, Personal...." 
               value={category}
  onChange={(e) => setCategory(e.target.value)}
             />
          </div>

        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>

          <input
            type="text"
            placeholder="e.g. frontend, urgent"
            value={tags}
  onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Buttons */}
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
             onClick={handleSubmit}
          >
            Add Task
          </button>

        </div>

      </div>
    </div>
  );
}

