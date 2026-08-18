"use client";

interface AddNewTaskProps {
  onClose: () => void;
}

export default function AddNewTask({ onClose }: AddNewTaskProps) {
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
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description"
            rows={4}
          />
        </div>

        {/* Priority + Status */}
        <div className="form-row">

          <div className="form-group">
            <label>Priority</label>

            <select>
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>

            <select>
              <option value="">Select Status</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

        </div>

        {/* Due Date + Category */}
        <div className="form-row">

          <div className="form-group">
            <label>Due Date</label>

            <input type="date" />
          </div>

         <div className="form-group">
            <label>Category</label>

             <input title="ensure to make category name same "
               type="text"
               placeholder="e.g. University, Freelancing, Personal...." 
             />
          </div>

        </div>

        {/* Tags */}
        <div className="form-group">
          <label>Tags</label>

          <input
            type="text"
            placeholder="e.g. frontend, urgent"
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
          >
            Add Task
          </button>

        </div>

      </div>
    </div>
  );
}