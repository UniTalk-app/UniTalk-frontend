import * as React from "react";
import { render } from "@testing-library/react";

import ThreadsList from "../ThreadsList";

describe("ThreadsList", () => {
    test("renders ThreadsList", async() => {
        const {findByText} = render(<ThreadsList threads={[
            {title: "testTitle", author: "testAuthor", lastReply: "testLastReply", replyTime: "testReplyTime", creationTime: "testCreationTime"}
        ]} />);

        const title = await findByText("testTitle");
        const author = await findByText("testAuthor");
        const lastReply = await findByText("testLastReply");
        const replyTime = await findByText("testReplyTime");
        const creationTime = await findByText("testCreationTime");

        expect(title).toBeTruthy();
        expect(author).toBeTruthy();
        expect(lastReply).toBeTruthy();
        expect(replyTime).toBeTruthy();
        expect(creationTime).toBeTruthy();
    });
});