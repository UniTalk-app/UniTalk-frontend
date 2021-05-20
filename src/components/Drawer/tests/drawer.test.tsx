
import { fireEvent } from "@testing-library/dom";

import { renderWithProviders, mockMainData } from "utils";

import Drawer from "../Drawer";

const mockGroups: Group[] = [
    {
        groupId:1,
        groupName:"Test"
    }
];

describe("Drawer", () => {
    test("displays element of list", async () => {
        mockMainData({
            groups: () => mockGroups
        });

        const { findByText, findByTestId } = renderWithProviders(<Drawer />);
            
        const btn = await findByTestId("drawerToogleOn");

        fireEvent.click(btn);

        const name = await findByText("Test");

        expect(name).toBeTruthy();

    });
});
