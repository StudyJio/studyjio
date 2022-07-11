import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MeetupScheduler from "../Components/MeetupScheduler.jsx";

describe("MeetupScheduler.jsx", () => {
    it('renders without crashing', async () => {
        render(<MeetupScheduler />);
    });

    it('has a button to select the week', async () => {
        render(<MeetupScheduler />);
        const weekSelectorElement = screen.getByRole('button', { name: /Week/ });
        expect(weekSelectorElement).toBeVisible();
    })

    it('has one checkbox per hour per day', async () => { 
        render(<MeetupScheduler />);
        const arrayOfCheckboxes = await screen.findAllByRole("checkbox");
        expect(arrayOfCheckboxes.length).toStrictEqual(24 * 7);
    })

    it('has a "time of day" column', async () => {
        render(<MeetupScheduler />);
        const timeOfDayElement = screen.getByText( /time of day/i );
        expect(timeOfDayElement).toBeVisible();
    })

    it('renders the time slots correctly', async () => {
        render(<MeetupScheduler />);
        const arrayOfAMTexts = await screen.findAllByText( /A.M./);
        expect(arrayOfAMTexts.length).toStrictEqual(13);
        const arrayOfPMTexts = await screen.findAllByText( /P.M./);
        expect(arrayOfPMTexts.length).toStrictEqual(13);
    })

    it('has a "save and refresh" button', async () => {
        render(<MeetupScheduler />);
        const saveAndRefreshButton = screen.getByRole("button", { name: /save and refresh/i });
        expect(saveAndRefreshButton).toBeVisible();
    })
});