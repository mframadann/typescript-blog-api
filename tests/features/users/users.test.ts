import { describe, expect, test, it } from "@jest/globals";
import request from "supertest";
import app from "../../../src/app";

describe("GET /users endpoint", () => {
  it("should return 200 & all users data", async () => {
    const res = await request(app.app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(res.body);
  });
});

//find one user endpoint
describe("GET /users detail endpoint", () => {
  it("should return 200 & specific user data", async () => {
    const res = await request(app.app).get("/users/find?user_id=1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(res.body);
  });
});

describe("GET /users detail endpoint", () => {
  it("should return 200 & specific user data", async () => {
    const res = await request(app.app).get("/users/find?user_id=200");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject(res.body);
  });
});
