import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import TeamTasksTable from "../Components/TeamTasksTable.jsx";

// An array of imaginary team members.
const teamMembers = [
    { id: 1, display_name: "John Doe", team_id: 1 },
    { id: 2, display_name: "Jane Doe", team_id: 1 },
    { id: 3, display_name: "Joe Doe", team_id: 1 },
    { id: 4, display_name: "Jack Doe", team_id: 1 },
    { id: 5, display_name: "Jill Doe", team_id: 1 }
];

// An array of imaginary tasks.
const tasks = [
    {
        id: -1,
        created_at: "2020-01-01",
        name: "The task that nobody wants to do",
        week: "Week 1",
        completion: { "1": false, "2": false, "3": false, "4": false, "5": false },
        team_id: 1
    },
    {
        id: -2,
        created_at: "2020-01-02",
        name: "The second task that nobody wants to do",
        week: "Week 1",
        completion: { "1": false, "2": false, "3": false, "4": false, "5": false },
        team_id: 1
    },
    {
        id: -3,
        created_at: "2020-01-03",
        name: "Mentally calculate 1 + 1",
        week: "Week 1",
        completion: { "1": true, "2": true, "3": true, "4": true, "5": true },
        team_id: 1
    },
]

const getTasks = jest.fn();

describe("TeamTasksTable.jsx", () => {
    it('renders without crashing', () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
    });

    it('has a table with a "Task" column and a "Week" column', async () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const taskText = screen.getByText("Task Name");
        expect(taskText).toBeVisible();
        const weekText = screen.getByText("Week");
        expect(weekText).toBeVisible();
    });

    it('has one button to create tasks', async () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const createTaskButton = screen.getByRole("button");
        expect(createTaskButton).toBeVisible();
    });

    it('shows the correct number of tasks', async () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const taskText = screen.getByText("Mentally calculate 1 + 1");
        expect(taskText).toBeVisible();
        const taskText2 = screen.getByText("The second task that nobody wants to do");
        expect(taskText2).toBeVisible();
        const taskText3 = screen.getByText("The task that nobody wants to do");
        expect(taskText3).toBeVisible();
    });

    it('shows one delete button per task', async () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const deleteTaskButtons = screen.getAllByTestId("delete-task-button");
        expect(deleteTaskButtons.length).toBe(3);
    });

    it('shows one edit button per task', async () => {
        render(<TeamTasksTable 
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const editTaskButtons = screen.getAllByTestId("edit-task-button");
        expect(editTaskButtons.length).toBe(3);
    });

    it('displays the correct number of checkboxes', async () => {
        render(<TeamTasksTable
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes.length).toBe(15);

    });

    it('checks the correct checkboxes', async () => {
        render(<TeamTasksTable
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes.length).toBe(15);

        for (let i = 0; i < 10; i++) {
            expect(checkboxes[i].checked).toBe(false);
        }
        
        for (let i = 10; i < 15; i++) {
            expect(checkboxes[i].checked).toBe(true);
        }
    });

    it("renders the team members' display names correctly", async () => {
        render(<TeamTasksTable
            teamMembers={teamMembers}
            tasks={tasks}
            getTasks={getTasks}
        />);

        // "John Doe" should be rendered.
        const johnDoeText = await screen.findByText( /John Doe/i );
        expect(johnDoeText).toBeVisible();
        // "Jane Doe" should be rendered.
        const janeDoeText = await screen.findByText( /Jane Doe/i );
        expect(janeDoeText).toBeVisible();
        // "Joe Doe" should be rendered.
        const joeDoeText = await screen.findByText( /Joe Doe/i );
        expect(joeDoeText).toBeVisible();
        // "Jack Doe" should be rendered.
        const jackDoeText = await screen.findByText( /Jack Doe/i );
        expect(jackDoeText).toBeVisible();
        // "Jill Doe" should be rendered.
        const jillDoeText = await screen.findByText( /Jill Doe/i );
        expect(jillDoeText).toBeVisible();
        
    });
});