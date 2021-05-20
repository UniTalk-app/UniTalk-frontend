import { renderWithProviders } from "utils";

import Categories from "../Categories";

describe("Categories", () => {
    test("displays table name", async () => {
        const { findByText } = renderWithProviders(<Categories categories={[
            {name:"Test",creationTime:"Test"}]} />);
            
        const result = await findByText("Categories");
        const name = await findByText("Test");

        expect(result).toBeTruthy();
        expect(name).toBeTruthy();

    });
  
});
