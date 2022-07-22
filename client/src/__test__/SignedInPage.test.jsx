import SignedInPage from "../Components/SignedInPage";
import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("SignedInPage", () => {
    it("renders without crashing", async () => {
        render(<SignedInPage />);
    });
});