import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import TeamMembers from "../Components/TeamMembers.jsx";

describe("TeamMembers.jsx", () => {
    it('renders without crashing', () => {
        render(<TeamMembers />);
    });
});