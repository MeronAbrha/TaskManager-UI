import React from "react";
import { TaskManager } from "../types";
import { markTaskDone, deleteTask } from "../api";
import "./TaskManagerList.css";

interface Props {
  tasks: TaskManager[];
  onUpdate: () => void;
  onDelete: () => void;
}

const TaskList: React.FC<Props> = ({ tasks, onUpdate, onDelete }) => {
  const handleDone = async (id: string) => {
    await markTaskDone(id);
    onUpdate();
  };

  const handleTaskDelete = async (id: string) => {
    await deleteTask(id);
    onDelete();
  };

  return (
    <ul className="task-list">
      {tasks
        .slice()
        .reverse()
        .map((task) => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              <strong>{task.title}</strong>
              <span className="task-status">{task.status}</span>
            </div>
            {task.status !== "DONE" && (
              <button
                className="done-button"
                onClick={() => handleDone(task.id)}
              >
                Mark Done
              </button>
            )}

            <button
              className="delete-button"
              onClick={() => handleTaskDelete(task.id)}
            >
              Delete Task
            </button>
          </li>
        ))}
    </ul>
  );
};

export default TaskList;
