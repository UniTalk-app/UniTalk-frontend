import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import NewCategory from "../NewCategory";

afterEach(cleanup)

describe("<NewCategory />", () => {
    it("Renders <NewCategory /> component", () => {
        render(<NewCategory />);
        
        expect(screen.getByText(/new category/i)).toBeInTheDocument();
        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    });
});