import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MyLocation from "../Components/TeamPreferencesComponents/MyLocation"

describe("MyLocation.jsx", () => {
    it('renders without crashing', async () => {
        render(<MyLocation />);
    });

    it('has two radio buttons', async () => {
        render(<MyLocation />);
        const radioButtons = await screen.findAllByRole("radio");
        expect(radioButtons.length).toStrictEqual(2);
    });

    it('has a selection button', async () => {
        render(<MyLocation />);
        const selectionButton = screen.getByRole("button");
        expect(selectionButton).toBeVisible();
    });

    // TODO: The options available in the Select should correspond to the radio button selected.
    
});