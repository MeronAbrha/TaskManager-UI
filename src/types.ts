export type TaskManagerStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskManager {
  id: string;
  title: string;
  description: string;
  status: TaskManagerStatus;
}
