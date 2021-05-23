import * as React from "react";
import { render, screen } from "@testing-library/react";

import Forms from "../Forms";

describe("<Forms />", () => {
    it("Renders <Forms /> component correctly", () => {
        render(<Forms updateNavbar={jest.fn()} />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });

});
