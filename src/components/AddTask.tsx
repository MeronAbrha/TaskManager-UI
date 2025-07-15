import React, { useState } from "react";
import { createTask } from "../api";

interface Props {
  onTaskCreated: () => void;
}

const AddTask: React.FC<Props> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await createTask(title);
    setTitle("");
    onTaskCreated();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTask;
