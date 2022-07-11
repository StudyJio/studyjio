import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MyModules from "../Components/TeamPreferencesComponents/MyModules"

describe("MyModules.jsx", () => {
    it('renders without crashing', async () => {
        render(<MyModules />);
    });

    it('has a textbox', async () => {
       render(<MyModules />);
       const textboxElement = screen.getByRole("textbox");
       expect(textboxElement).toBeVisible();
    });

});