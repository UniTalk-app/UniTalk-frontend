import authHeader from "../auth-header";

describe("authHeader", () => {
    it("returns auth token from local storage", () => {
        const token = "abcd_123";
        jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(token);
        const res = authHeader();
        expect(res.Authorization).toBeDefined();
        expect(res.Authorization).toEqual(`Bearer ${token}`);
    });

    it("returns empty object if no token in local storage", () => {
        jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(null);

        expect(authHeader()).toEqual({});

    });
});