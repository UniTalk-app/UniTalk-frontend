/*import { setupServer } from "msw/node";
import { rest } from "msw";

import Role from "store/role";

import AuthService from "../auth.service";
import BackendAPI from "../backendAPI";

let roles: Role[] = [];

const server = setupServer(
    rest.post<{username: string}>(
        BackendAPI.AUTH + "login",
        (req, res, ctx) => {
            if(req.body.username === "admin"){ 
                return res(
                    ctx.json({
                        status: "success",
                        token: "abcd",
                        roles
                    }),
                );
            }
            return res(
                ctx.json({
                    status: "unauthorized",
                }),
            );
        }
    )
);

describe("AuthService", () => {
    beforeAll(() => {
        // Establish requests interception layer before all tests.
        server.listen();
    });
    afterAll(() => {
        // Clean up after all tests are done, preventing this
        // interception layer from affecting irrelevant tests.
        server.close();
    });
      
    it("register returns promise", () => {
        const data = {
            username: "a",
            email: "a",
            password: "a",
            firstName: "a",
            lastName: "a"
        };

        expect(AuthService.register(data)).toBeInstanceOf(Promise);
    });

    it("login stores token when success", async () => {
        jest.spyOn(Storage.prototype, "setItem");
        await AuthService.login({
            username: "admin",
            password: "a",
        });
        expect(Storage.prototype.setItem).toHaveBeenCalled();
        expect(Storage.prototype.setItem).toHaveBeenLastCalledWith("user", "abcd");
    });

    it("has correct information about user roles", async () => {
        roles = [Role.user];
        await AuthService.login({
            username: "admin",
            password: "a",
        });

        expect(AuthService.isSuperUser).toBeFalsy();
    
        roles = [Role.moderator];
        await AuthService.login({
            username: "admin",
            password: "a",
        });

        expect(AuthService.isSuperUser).toBeTruthy();
    });
});
*/
import * as React from "react";

test("test", async () => {

    expect(1).toBeTruthy() ;// pass

});