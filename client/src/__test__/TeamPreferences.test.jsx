import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import TeamPreferences from "../Components/TeamPreferences.jsx";
import userEvent from '@testing-library/user-event'

describe("TeamPreferences.jsx", () => {
    it('renders without crashing', async () => {
        render(<TeamPreferences />);
    });

    it('displays the "My Modules" page at first', async () => {
        render(<TeamPreferences />);
        const myModulesText = screen.getByRole("heading", { name: /my modules/i });
        expect(myModulesText).toBeVisible();
    })

    it('allows users to navigate from page 1 to page 3 and back', async () => {
        render(<TeamPreferences />);
        const nextButtonToPageTwo = screen.getByRole("button", { name: /next/i });
        expect(nextButtonToPageTwo).toBeVisible();
        userEvent.click(nextButtonToPageTwo);
        // We are now at page two.
        const learningStyleHeading = screen.getByRole("heading", { name: /learning style/i });
        expect(learningStyleHeading).toBeVisible();
        const nextButtonToPageThree = screen.getByRole("button", { name: /next/i });
        expect(nextButtonToPageThree).toBeVisible();
        userEvent.click(nextButtonToPageThree);
        // We are now at page three.
        const locationHeading = screen.getByRole("heading", { name: /location/i });
        expect(locationHeading).toBeVisible();
        const backButtonToPageTwo = screen.getByRole("button", { name: /back/i });
        expect(backButtonToPageTwo).toBeVisible();
        userEvent.click(backButtonToPageTwo);
        // We are now at page two.
        const learningStyleHeading2 = screen.getByRole("heading", { name: /learning style/i });
        expect(learningStyleHeading2).toBeVisible();
        const backButtonToPageOne = screen.getByRole("button", { name: /back/i });
        expect(backButtonToPageOne).toBeVisible();
        userEvent.click(backButtonToPageOne);
        // We are now at page one.
        const modulesHeading = screen.getByRole("heading", { name: /modules/i });
        expect(modulesHeading).toBeVisible();
    });

    it('has a save button at page three', async () => {
        render(<TeamPreferences />);
        userEvent.click(
            screen.getByRole("button", { name: /next/i })
        );
        // We are now at page two.
        userEvent.click(
            screen.getByRole("button", { name: /next/i })
        );
        // We are now at page three.
        const saveButton = screen.getByRole("button", { name: /save/i });
        expect(saveButton).toBeVisible();
    });
}); 