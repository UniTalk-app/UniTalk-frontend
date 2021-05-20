
import { fireEvent } from "@testing-library/dom";

import { renderWithProviders, } from "utils";

import Drawer from "../Drawer";

describe("Drawer", () => {
    test("displays element of list", async () => {

        const { /*findByText,*/ findByTestId } = renderWithProviders(<Drawer />);
            
        const btn = await findByTestId("drawerToogleOn");

        fireEvent.click(btn);

        //const name = await findByText("Test");

        //expect(name).toBeTruthy();

    });
});
