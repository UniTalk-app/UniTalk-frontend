import * as React from "react";
import { 
    screen, 
    cleanup,
    fireEvent
} from "@testing-library/react";
import NewCategory from "../NewCategory";
import { renderWithProviders } from "utils";

afterEach(cleanup);

describe("<NewCategory />", () => {
    it("Renders <NewCategory /> component", async () => {
        const {findByTestId} = renderWithProviders(<NewCategory />);
        
        const iconButton = await findByTestId("new-category-btn");

        fireEvent.click(iconButton);

        expect(screen.getByText(/new category/i)).toBeInTheDocument();
        expect(screen.getByText(/confirm/i)).toBeInTheDocument();
        
        const nameList = screen.getAllByText(/name/i);
        nameList.forEach(nm => {
            expect(nm).toBeInTheDocument();
        });
    });
});