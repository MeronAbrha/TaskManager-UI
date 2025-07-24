import axios from "axios";
import { TaskManager } from "./types";

const API_BASE_URL = "http://localhost:8080/tasks";

export const getTasks = async (): Promise<TaskManager[]> => {
  const res = await axios.get<TaskManager[]>(API_BASE_URL);
  return res.data;
};

export const createTask = async (task: {
  title: string;
  discription?: string;
  status: "TODO";
}): Promise<TaskManager> => {
  const res = await axios.post<TaskManager>(API_BASE_URL, task);
  return res.data;
};

export const markTaskDone = async (id: string): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, {
    status: "DONE",
  });
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
