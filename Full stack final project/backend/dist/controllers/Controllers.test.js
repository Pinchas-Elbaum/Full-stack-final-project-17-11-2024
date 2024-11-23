"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
beforeAll(async () => {
    await mongoose_1.default.connection.dropDatabase();
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
    app_1.server.close();
});
afterEach(async () => {
    // await mongoose.connection.dropDatabase();
});
describe("User API /register", () => {
    test("POST /register, creating new user in database, should pass", async () => {
        const user = {
            name: "Ariel",
            organization: "IDF - North",
            password: "123456",
            area: "North"
        };
        const res = await register(user);
        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            message: "User created successfully",
            success: true,
            data: {
                name: user.name
            },
        });
    });
    test("POST /register, creating new user in database, should fail because missing required fields", async () => {
        const user = {
            organization: "IDF - North",
            password: "123456",
        };
        const res = await register(user);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
        expect(res.body.success).toBe(false);
    });
    test("POST /register, creating new user in database, should fail because user already exists", async () => {
        const user = {
            name: "b",
            organization: "IDF - North",
            password: "123456",
            area: "North"
        };
        await register(user);
        const res = await register(user);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("User name already exists");
        expect(res.body.data.name).toBe(user.name);
    });
    test("POST /register, creating new user in database, should fail because organization does not exist", async () => {
        const user = {
            name: "a",
            organization: "aaaa",
            password: "123456",
            area: "North"
        };
        const res = await register(user);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Organization not found");
        expect(res.body.success).toBe(false);
    });
});
describe("User API/ login", () => {
    test("POST /login, should fail because missing required fields", async () => {
        const user = {};
        const res = await login(user);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
        expect(res.body.success).toBe(false);
    });
    test("POST /login, should fail because user does not exist", async () => {
        const user = {
            name: "a",
            password: "123456"
        };
        const res = await (0, supertest_1.default)(app_1.app)
            .post("/auth/login")
            .send(user);
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid name");
        expect(res.body.success).toBe(false);
    });
    test("POST /login, should fail because password is incorrect", async () => {
        const user = {
            name: "Ariel",
            organization: "IDF - North",
            password: "123456",
            area: "North"
        };
        await register(user);
        const res = await login({ name: user.name, password: `${user.password}1` });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid name or password");
        expect(res.body.success).toBe(false);
    });
    test("POST /login, should pass", async () => {
        const user = {
            name: "Ariel",
            organization: "IDF - North",
            password: "123456",
            area: "North"
        };
        await register(user);
        const res = await login({ name: user.name, password: user.password });
        expect(res.status).toBe(200);
    });
});
describe("User API/ logout", () => {
    test("POST /logout, should pass", async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post("/auth/logout")
            .send();
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Logout successful");
    });
});
describe;
const register = async (user) => {
    const res = await (0, supertest_1.default)(app_1.app)
        .post("/auth/register")
        .send(user);
    return res;
};
const login = async (user) => {
    const res = await (0, supertest_1.default)(app_1.app)
        .post("/auth/login")
        .send(user);
    return res;
};
//# sourceMappingURL=Controllers.test.js.map