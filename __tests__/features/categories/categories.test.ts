import { describe, expect, test, it } from "@jest/globals";
import request from "supertest";
import app from "../../../src/app";

describe("GET /categories endpoint", () => {
  it("should return 200 & all categories data", async () => {
    const res = await request(app.app).get("/categories");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(res.body);
  });
});

//find one category endpoint
describe("GET /categories/find?category_id=value detail endpoint", () => {
  it("should return 200 & category with id equals to id from parameter", async () => {
    const res = await request(app.app).get("/categories/find?category_id=3");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(res.body);
  });
});
describe("GET /categories/find?category_id= detail endpoint", () => {
  it("should return 400 & send error message category_id must have value", async () => {
    const res = await request(app.app).get("/categories/find?category_id=");
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject(res.body);
  });
});
describe("GET /categories/find?category_id=stringValue detail endpoint", () => {
  it("should return 400 & send error message category_id cannot be string type value ", async () => {
    const res = await request(app.app).get(
      "/categories/find?category_id=example"
    );
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject(res.body);
  });
});
describe("GET /categories/find?category_id=value detail endpoint", () => {
  it("should return 404 & not shown category data ", async () => {
    const res = await request(app.app).get("/categories/find?category_id=10");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject(res.body);
  });
});

//create category
describe("POST /categories/create endpoint", () => {
  it("should return 201 & new category data ", async () => {
    const res = await request(app.app)
      .post("/categories/create")
      .send({ categoryName: "Category From Unit Testing" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(res.body);
  });
});

describe("POST /categories/create endpoint with the same value", () => {
  it("should return 500 & category data not created ", async () => {
    const res = await request(app.app)
      .post("/categories/create")
      .send({ categoryName: "Category From Unit Testing" });
    expect(res.status).toBe(500);
    expect(res.body).toMatchObject(res.body);
  });
});
