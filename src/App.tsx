import React, { useEffect, useState } from "react";
import { TaskManager } from "./types";
import { getTasks } from "./api";
import AddTask from "./components/AddTask";
import TaskManagerList from "./components/TaskManagerList";

function App() {
  const [tasks, setTasks] = useState<TaskManager[]>([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Task Manager</h1>
      <AddTask onTaskCreated={fetchTasks} />
      <TaskManagerList tasks={tasks} onUpdate={fetchTasks} />
    </div>
  );
}

export default App;
