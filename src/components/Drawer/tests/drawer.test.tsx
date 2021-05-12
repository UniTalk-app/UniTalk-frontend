
import * as React from "react";
import { render} from "@testing-library/react";

import Drawer from "../Drawer";

describe("Drawer", () => {
    test("displays element of list", async () => {
        const { findByText } = render(<Drawer groups={[
            {groupId:1,groupName:"Test"}]} />);
            
        const name = findByText("Test");

        expect(name).toBeTruthy();

    });
  
});
