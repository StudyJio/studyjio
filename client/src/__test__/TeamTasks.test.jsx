import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import TeamTasks from "../Components/TeamTasks.jsx";

describe("TeamTasks.jsx", () => {
    it('renders without crashing', () => {
        render(<TeamTasks />);
    });
});