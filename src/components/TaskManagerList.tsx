import React from "react";
import { TaskManager } from "../types";
import { markTaskDone } from "../api";

interface Props {
  tasks: TaskManager[];
  onUpdate: () => void;
}

const TaskList: React.FC<Props> = ({ tasks, onUpdate }) => {
  const handleDone = async (id: string) => {
    await markTaskDone(id);
    onUpdate();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> – {task.status}
          {task.status !== "DONE" && (
            <button
              onClick={() => handleDone(task.id)}
              style={{ marginLeft: "1rem" }}
            >
              Mark Done
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
