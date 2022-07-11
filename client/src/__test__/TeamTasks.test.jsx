import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import TeamTasks from "../Components/TeamTasks.jsx";

describe("TeamTasks.jsx", () => {
    it('renders without crashing', () => {
        render(<TeamTasks />);
    });

    it('has a table with a "Task" column and a "Week" column', async () => {
        render(<TeamTasks />);
        const taskText = screen.getByText("Task");
        expect(taskText).toBeVisible();
        const weekText = screen.getByText("Week");
        expect(weekText).toBeVisible();
    });

    it('has one button to create tasks', async () => {
        render(<TeamTasks />);
        const createTaskButton = screen.getByRole("button");
        expect(createTaskButton).toBeVisible();
    })
});