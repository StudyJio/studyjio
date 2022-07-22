import React from "react"
import { expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"
import MeetupScheduler from "../Components/MeetupScheduler.jsx";

describe("MeetupScheduler.jsx", () => {
    it('renders without crashing', async () => {
        render(<MeetupScheduler />);
    });

    // it('has a button to select the week', async () => {
    //     render(<MeetupScheduler />);
    //     const weekSelectorElement = screen.getByRole('button', { name: /Week/ });
    //     expect(weekSelectorElement).toBeVisible();
    // })

    // it('has a save button', async () => {
    //     render(<MeetupScheduler />);
    //     const saveButton = screen.getByTestId("save-button")
    //     expect(saveButton).toBeVisible();
    // })
});