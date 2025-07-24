import React, { useState } from "react";
import { createTask } from "../api";
import "./AddTask.css";

interface Props {
  onTaskCreated: () => void;
}

const AddTask: React.FC<Props> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [discription, setDiscption] = useState("");

  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    setError("");
    await createTask({ title, discription, status: "TODO" });
    onTaskCreated();
  };

  const updateDiscription = (e: any) => {
    setDiscption(e.target.value);
  };

  return (
    <div className="add-task-container">
      <div className="input-group">
        <input
          className="add-task-input"
          type="text"
          value={title}
          onChange={(e) => {
            if (e.target.value.trim()) {
              setError("");
            }
            setTitle(e.target.value);
          }}
          placeholder="Enter task title"
        />
        {error && (
          <div className="add-task-error">
            {error || <span style={{ visibility: "hidden" }}>placeholder</span>}
          </div>
        )}

        <textarea
          placeholder="Enter discription"
          onChange={(e) => updateDiscription(e)}
        >
          {discription}
        </textarea>
      </div>

      <button className="add-task-button" onClick={handleAdd}>
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
