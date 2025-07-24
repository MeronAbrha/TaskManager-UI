import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as api from "./api";
import type { TaskManager } from "./types";

const mockTasks: TaskManager[] = [
  {
    id: "1",
    title: "Test Task 1",
    description: "task one",
    status: "IN_PROGRESS",
  },
  { id: "2", title: "Test Task 2", description: "task two", status: "DONE" },
];

// Mock the getTasks API
jest.spyOn(api, "getTasks").mockResolvedValue(mockTasks);

describe("App component", () => {
  it("renders Task Manager heading", async () => {
    render(<App />);
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("fetches and displays tasks from API", async () => {
    render(<App />);

    // Wait for task titles to appear
    await waitFor(() => {
      expect(screen.getByText("Test Task 1")).toBeInTheDocument();
      // expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    });

    // Check status labels
    expect(screen.getByText("IN_PROGRESS")).toBeInTheDocument();
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });

  it("renders AddTask and TaskManagerList components", async () => {
    render(<App />);

    // Check input
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();

    // Check Add button
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });
});
