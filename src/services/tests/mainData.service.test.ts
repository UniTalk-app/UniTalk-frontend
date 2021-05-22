import { setupServer } from "msw/node";
import { rest } from "msw";

import BackendAPI from "services/backendAPI";
import storeSubject from "store/store";

const server = setupServer(
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
        expect(appData.categories).toHaveLength(0);
        expect(appData.threads).toHaveLength(0);
    });
});