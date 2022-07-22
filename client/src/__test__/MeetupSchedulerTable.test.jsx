import React from "react"
import { expect } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import MeetupSchedulerTable from "../Components/MeetupSchedulerTable.jsx"

const teamMembers = [
    { id: 1, display_name: "John Doe", team_id: 1 },
    { id: 2, display_name: "Jane Doe", team_id: 1 },
    { id: 3, display_name: "Joe Doe", team_id: 1 },
    { id: 4, display_name: "Jack Doe", team_id: 1 },
    { id: 5, display_name: "Jill Doe", team_id: 1 }
];

const emptyUserAvailability = {
    0: Array(24).fill(false),
    1: Array(24).fill(false),
    2: Array(24).fill(false),
    3: Array(24).fill(false),
    4: Array(24).fill(false),
    5: Array(24).fill(false),
    6: Array(24).fill(false),
}

const userAvailability = {
    0: Array(24).fill(false),
    1: Array(24).fill(false),
    2: Array(24).fill(false),
    3: Array(24).fill(false),
    4: Array(24).fill(false),
    5: Array(24).fill(false),
    6: Array(24).fill(true),
}

const teamAvailability = {
    0: Array(24).fill(0),
    1: Array(24).fill(1),
    2: Array(24).fill(2),
    3: Array(24).fill(3),
    4: Array(24).fill(4),
    5: Array(24).fill(4),
    6: Array(24).fill(4),
}

const datesForWeek = [
    "dateStringOne", "dateStringTwo", "dateStringThree", "dateStringFour", "dateStringFive", "dateStringSix", "dateStringSeven"
]

// Mock setUserAvailability function
const setUserAvailability = jest.fn();

describe("MeetupSchedulerTable.jsx", () => {

    it('renders without crashing', async () => {
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
    });

    it('has one checkbox per hour per day', async () => { 
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
        const arrayOfCheckboxes = await screen.findAllByRole("checkbox");
        expect(arrayOfCheckboxes.length).toStrictEqual(24 * 7);
    })

    it('has a "time of day" column', async () => {
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
        const timeOfDayElement = screen.getByText( /time of day/i );
        expect(timeOfDayElement).toBeVisible();
    });

    it('renders the time slots correctly', async () => {
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
        const arrayOfAMTexts = await screen.findAllByText( /A.M./);
        expect(arrayOfAMTexts.length).toStrictEqual(13);
        const arrayOfPMTexts = await screen.findAllByText( /P.M./);
        expect(arrayOfPMTexts.length).toStrictEqual(13);
    });

    it('renders the days of the week correctly', async () => {
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
        const arrayOfDays = await screen.findAllByText( /dateString/i );
        expect(arrayOfDays.length).toStrictEqual(7);
    });

    it('renders the fraction of team members available', async () => {
        render(<MeetupSchedulerTable
            teamMembers={teamMembers}
            userAvailability={userAvailability}
            setUserAvailability={setUserAvailability}
            teamAvailability={teamAvailability}
            datesForWeek={datesForWeek}
        />);
    
        // "0/5" should be rendered 24 times.
        const arrayOfFractions = await screen.findAllByText( /0\/5/i );
        expect(arrayOfFractions.length).toStrictEqual(24);
        // "1/5" should be rendered 24 times.
        const arrayOfFractions2 = await screen.findAllByText( /1\/5/i );
        expect(arrayOfFractions2.length).toStrictEqual(24);
        // "2/5" should be rendered 24 times.
        const arrayOfFractions3 = await screen.findAllByText( /2\/5/i );
        expect(arrayOfFractions3.length).toStrictEqual(24);
        // "3/5" should be rendered 24 times.
        const arrayOfFractions4 = await screen.findAllByText( /3\/5/i );
        expect(arrayOfFractions4.length).toStrictEqual(24);
        // "4/5" should be rendered 48 times.
        const arrayOfFractions5 = await screen.findAllByText( /4\/5/i );
        expect(arrayOfFractions5.length).toStrictEqual(48);
        // "5/5" should be rendered 24 times.
        const arrayOfFractions6 = await screen.findAllByText( /5\/5/i );
        expect(arrayOfFractions6.length).toStrictEqual(24);
    });
});