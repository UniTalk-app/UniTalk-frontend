import { renderWithProviders } from "utils";

import MainLayout from "../MainLayout";

describe("MainLayout", () => {
    test("renders Navbar", async () => {
        const { findByText } = renderWithProviders(<MainLayout />);

        const result = await findByText("UniTalk");

        expect(result).toBeTruthy();
    });

    test("renders children", async () => {
        const txt = "Example text data";
        const { findByText } = renderWithProviders(<MainLayout><div>{txt}</div></MainLayout>);

        const result = await findByText(txt);

        expect(result).toBeTruthy();
    });
});