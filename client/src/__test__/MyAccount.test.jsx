import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MyAccount from "../Components/MyAccount.jsx";
import userEvent from '@testing-library/user-event'

describe("MyAccount.jsx", () => {
    it('renders without crashing', async () => {
        render(<MyAccount />);
    });

    it('has a card with a profile picture and a display name', async () => {
        render(<MyAccount />);
        
        // TODO: Check that the profile picture is displayed.

        // Check for the text field for the display name.
        const displayNameTextField = screen.getByRole("textbox", { name: /display name/i });
        expect(displayNameTextField).toBeVisible();

        
    });

    it('has a card to change the user password', async () => {
        render(<MyAccount />);

        // Check for the heading "Change Password".
        const changePasswordHeading = screen.getByRole("heading", { name: /change password/i });
        expect(changePasswordHeading).toBeVisible();

        // Check for the three fields for changing the password.
        const textFieldNames = ["Current Password", "New Password", "Confirm New Password"];
        for (const textFieldName of textFieldNames) {
            const textFieldElement = screen.getByLabelText(textFieldName);
            expect(textFieldElement).toBeVisible();
        }
        
    });
});