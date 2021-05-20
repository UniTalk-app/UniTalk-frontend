import { setupServer } from "msw/node";
import { rest } from "msw";

import BackendAPI from "services/backendAPI";
import storeSubject from "store/store";

const server = setupServer(
    rest.get(
        BackendAPI.GROUP_ALL,
        (req, res, ctx) => {
            return res(
                ctx.json({
                    groupList: [
                        {
                            // eslint-disable-next-line camelcase
                            group_id: 1,
                            name: "group1"
                        }
                    ]
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
        const appData = storeSubject.getAppData();
        expect(appData.groups).toHaveLength(0);
        expect(appData.categories).toHaveLength(0);
        expect(appData.threads).toHaveLength(0);
    });

    it("calls endpoint to receive data", async () => {
        await storeSubject.updateStore();

        const appData = storeSubject.getAppData();
        expect(appData.groups).toHaveLength(1);
        expect(appData.categories).toHaveLength(1);
        expect(appData.threads).toHaveLength(1);
    });

    it("calls subscription function after calling the endpoint", async () => {
        const mockFn = jest.fn();
        storeSubject.subscribe(mockFn);

        await storeSubject.updateStore();

        expect(mockFn).toHaveBeenCalled();
    });
});