import SignedInPage from "../Components/SignedInPage";
import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

function resizeWindow(x, y) {
    window.innerWidth = x;
    window.innerHeight = y;
    window.resizeTo(x, y);
    window.dispatchEvent(new Event('resize'));
}

describe("SignedInPage", () => {
    it("renders without crashing", async () => {
        render(<SignedInPage />);
    });
});