import * as React from "react";
import { render} from "@testing-library/react";

import LatestThreads from "../LatestThreads";

describe("LatestThreads", () => {
    test("displays table name", async () => {
        const { findByText } = render(<LatestThreads latestthreads={[
            {name:"Test",comments:"0",}]} />);
            
        const result = await findByText("Latest threads");
        const name = await findByText("Test");
        const comments = await findByText("0 comments");

        expect(result).toBeTruthy();
        expect(name).toBeTruthy();
        expect(comments).toBeTruthy();


    });
  
});
