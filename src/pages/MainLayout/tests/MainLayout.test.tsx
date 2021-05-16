import * as React from "react";
import { render } from "@testing-library/react";

import MainLayout from "../MainLayout";

// describe("MainLayout", () => {
//     test("renders Navbar", async () => {
//         const { findByText } = render(<MainLayout />);

//         const result = await findByText("UniTalk");

//         expect(result).toBeTruthy();
//     });

//     test("renders children", async () => {
//         const txt = "Example text data";
//         const { findByText } = render(<MainLayout><div>{txt}</div></MainLayout>);

//         const result = await findByText(txt);

//         expect(result).toBeTruthy();
//     });
// });