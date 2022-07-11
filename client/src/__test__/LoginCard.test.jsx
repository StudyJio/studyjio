import LoginCard from "../Components/LoginCard.jsx"
import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"

describe("check environment variables", () => {
    it("has a ...URL environment variable that is not undefined", () => {
        expect(process.env.REACT_APP_SUPABASE_URL).not.toBeUndefined();
    });

    it("has a ...KEY environment variable that is not undefined", () => {
        expect(process.env.REACT_APP_SUPABASE_KEY).not.toBeUndefined();
    });
});

describe("LoginCard.jsx", () => {
    it("renders without crashing", () => {
        render(<LoginCard />);
    });

    it("has an email field", async () => {
        render(<LoginCard />);
        const emailFieldElement = screen.getByRole("textbox", { name: /email/i });
        expect(emailFieldElement).toBeVisible();
    });

    it("email field is initially empty", async () => {
        render(<LoginCard />);
        const emailFieldElement = screen.getByRole("textbox", { name: /email/i });
        expect(emailFieldElement).toHaveProperty('value', '');
    });

    it("email field can be edited", async () => {
        render(<LoginCard />);
        const emailFieldElement = screen.getByRole("textbox", { name: /email/i });
        fireEvent.change(emailFieldElement, { target: { value: "email@bingbong.com" } });
        expect(emailFieldElement.value).toStrictEqual("email@bingbong.com");
    });

    it("has a password field", async () => {
        render(<LoginCard />);
        const passwordFieldElement = screen.getByLabelText(/password/i);
        expect(passwordFieldElement).toBeVisible();
    });

    it("password field is initially empty", async () => {
        render(<LoginCard />);
        const passwordFieldElement = screen.getByLabelText(/password/i);
        expect(passwordFieldElement).toHaveProperty('value', '');
    });

    it("password field can be edited", async () => {
        render(<LoginCard />);
        const passwordFieldElement = screen.getByLabelText(/password/i);
        fireEvent.change(passwordFieldElement, { target: { value: "hunter2!" } });
        expect(passwordFieldElement.value).toStrictEqual("hunter2!");
    });

    it("has a login button", async () => {
        render(<LoginCard />);
        const loginButton = screen.getByRole("button");
        expect(loginButton).toBeVisible();
    })

});