import * as React from "react";
import { render} from "@testing-library/react";

import LatestThreads from "../LatestThreads";

describe("LatestThreads", () => {
    test("displays table name", async () => {
        const { findByText } = render(<LatestThreads latestthreads={[
            {title:"Test",threadId:"1",author:"Tester",creationTime:"0",lastReply:"0",replyTime:"0"}]} />);
            
        const result = await findByText("Latest threads");
        const name = await findByText("Test");
       

        expect(result).toBeTruthy();
        expect(name).toBeTruthy();




    });
  
});
