import * as React from "react";
import { render} from "@testing-library/react";

import Categories from "../Categories";

describe("Categories", () => {
    test("displays table name", async () => {
        const { findByText } = render(<Categories />);
        const result = await findByText("Categories");
        expect(result).toBeTruthy();
    });
  
});