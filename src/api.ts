import axios from "axios";
import { TaskManager } from "./types";

const API_BASE_URL = "http://localhost:8080/tasks";

export const getTasks = async (): Promise<TaskManager[]> => {
  const res = await axios.get<TaskManager[]>(API_BASE_URL);
  return res.data;
};

export const createTask = async (title: string): Promise<TaskManager> => {
  const res = await axios.post<TaskManager>(API_BASE_URL, {
    title,
    status: "TODO",
  });
  return res.data;
};

export const markTaskDone = async (id: string): Promise<void> => {
  await axios.put(`${API_BASE_URL}/${id}`, {
    status: "DONE",
  });
};
