import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MyLearningStyle from "../Components/TeamPreferencesComponents/MyLearningStyle"

describe("MyLearningStyle.jsx", () => {
    it('renders without crashing', async () => {
        render(<MyLearningStyle />);
    });

    it('displays the eight dimensional labels', async () => {
        render(<MyLearningStyle />);
        const dimensionalLabels = ["Active", "Reflective", "Sensing", "Intuitive", "Visual", "Verbal", "Sequential", "Global"];
        for (const label of dimensionalLabels) {
            const labelElement = screen.getByText(label);
            expect(labelElement).toBeVisible();
        }
    });

    it('has four sliders', async () => {
        render(<MyLearningStyle />);
        const arrayOfSliders = await screen.findAllByRole("slider");
        expect(arrayOfSliders.length).toStrictEqual(4);
    });

});