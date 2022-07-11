import SignedOutPage from "../Components/SignedOutPage.jsx"
import React from "react"
import { expect } from "@jest/globals"
import { render, screen } from "@testing-library/react"

it("has a ...URL environment variable that is not undefined", () => {
    expect(process.env.REACT_APP_SUPABASE_URL).not.toBeUndefined();
});

it("has a ...KEY environment variable that is not undefined", () => {
    expect(process.env.REACT_APP_SUPABASE_KEY).not.toBeUndefined();
});

it("renders without crashing", () => {
    render(<SignedOutPage />);
})