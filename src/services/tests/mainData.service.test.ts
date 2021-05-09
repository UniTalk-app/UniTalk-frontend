import { setupServer } from "msw/node";
import { rest } from "msw";

import MainData from "../mainData.service";
import BackendAPI from "services/backendAPI";

const server = setupServer(
    rest.get(
        BackendAPI.GROUP_ALL,
        (req, res, ctx) => {
            return res(
                ctx.json({
                    ["_embedded"]: {
                        groupList: [
                            {
                                group_id: 1,
                                name: "group1"
                            }
                        ]
                    }
                }),
            );
        }
    ),
    rest.get(
        BackendAPI.getCategories(1),
        (req, res, ctx) => {
            return res(
                ctx.json({
                    ["_embedded"]: {
                        categoryList: [
                            {
                                id: 1,
                                name: "category1"
                            }
                        ]
                    }
                }),
            );
        }
    ),
    rest.get(
        BackendAPI.getThreads(1),
        (req, res, ctx) => {
            return res(
                ctx.json({
                    ["_embedded"]: {
                        threadList: [
                            {
                                id: 1,
                                name: "thread1"
                            }
                        ]
                    }
                }),
            );
        }
    )
);


describe("MainData service", () => {
    beforeAll(() => {
        // Establish requests interception layer before all tests.
        server.listen();
    });
    afterAll(() => {
        // Clean up after all tests are done, preventing this
        // interception layer from affecting irrelevant tests.
        server.close();
    });
    it("is initialized with empty arrays", () => {
        expect(MainData.groups).toHaveLength(0);
        expect(MainData.categories).toHaveLength(0);
        expect(MainData.threads).toHaveLength(0);
    });

    it("calls endpoint to receive data", async () => {
        await MainData.getData();

        expect(MainData.groups).toHaveLength(1);
        expect(MainData.categories).toHaveLength(1);
        expect(MainData.threads).toHaveLength(1);
     });

    it("calls subscription function after calling the endpoint", async () => {
        const mockFn = jest.fn();
        MainData.subscribeToServiceChange(mockFn);

        await MainData.getData();

        expect(mockFn).toHaveBeenCalled();
    });
});