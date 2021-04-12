import * as React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button from "../Button";

describe("<Button />", () => {
    test("displays correct label", () => {
        const label = "This is a label";
        const { getByText } = render(<Button label={label} />);

        expect(getByText(label)).toBeTruthy();
    });

    test("triggers onClick event when clicked", () => {
        const clickEvent = jest.fn();
        const label = "ButtonLabel";
        const { getByText } = render(<Button label={label} onClick={clickEvent} />);

        fireEvent.click(getByText(label));

        expect(clickEvent).toHaveBeenCalled();
    });
});