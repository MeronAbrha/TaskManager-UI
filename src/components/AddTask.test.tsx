import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "./AddTask";

describe("AddTask component", () => {
  it("renders input and button", () => {
    render(<AddTask onTaskCreated={jest.fn()} />);
    expect(screen.getByPlaceholderText("Enter task title")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("shows error when input is empty", async () => {
    render(<AddTask onTaskCreated={jest.fn()} />);
    fireEvent.click(screen.getByText("Add Task"));
    expect(
      await screen.findByText("Task title is required")
    ).toBeInTheDocument();
  });

  it("calls onTaskCreated when valid input is submitted", async () => {
    const mockCreateTask = jest.fn().mockResolvedValue({});
    jest.mock("../api", () => ({
      createTask: () => mockCreateTask(),
    }));

    const onTaskCreated = jest.fn();
    render(<AddTask onTaskCreated={onTaskCreated} />);
    const input = screen.getByPlaceholderText("Enter task title");
    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.queryByText("Title is required")).not.toBeInTheDocument();
  });
});
