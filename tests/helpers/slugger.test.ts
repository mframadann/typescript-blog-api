import { describe, expect, test } from "@jest/globals";
import { Slugger } from "../../src/helpers";

describe("Slugger helpers function test", () => {
  test("How?// to?#$ create?@ rest? api with typescript\\ and expressjs^*|??", () => {
    expect(
      Slugger({
        text: "How?// to?#$ create?@ rest? api with typescript\\ and expressjs^*|??",
      })
    ).toBe("how-to-create-rest-api-with-typescript-and-expressjs");
  });
});
