import type { AxiosResponse } from "axios";
import { getIssue, createIssue, deleteIssue } from "../../../api/issue.api";
import type { CreateIssue } from "../../../types/issue";

describe("GET /api/issues/:id", () => {
  let createResponse: AxiosResponse;
  let response: AxiosResponse;

  const body: CreateIssue = {
    title: "GET Issue Test",
    description: "Issue created for GET API test",
  };

  beforeAll(async () => {
    // Create an issue for the GET tests
    createResponse = await createIssue(body);

    // Get the created issue
    response = await getIssue(createResponse.data.id);
  });

  afterAll(async () => {
    // Cleanup
    await deleteIssue(createResponse.data.id);
  });

  describe("Valid request", () => {
    test("Should return status 200", () => {
      expect(response.status).toBe(200);
    });

    test("Should return response data", () => {
      expect(response.data).toBeDefined();
    });

    test("Should return an object", () => {
      expect(typeof response.data).toBe("object");
      expect(Array.isArray(response.data)).toBe(false);
    });

    test("Should return the requested issue ID", () => {
      expect(response.data.id).toBe(createResponse.data.id);
    });

    test("Should return the correct title", () => {
      expect(response.data.title).toBe(body.title);
    });

    test("Should return the correct description", () => {
      expect(response.data.description).toBe(body.description);
    });

    test("Should return expected properties with correct data types", () => {
      expect(response.data).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          status: expect.any(String),
        }),
      );
    });

    test("Should return OPEN status", () => {
      expect(response.data.status).toBe("OPEN");
    });

    test("Should return JSON content type", () => {
      expect(response.headers["content-type"]).toContain("application/json");
    });

    test("Should return exactly the requested issue", () => {
      expect(response.data.id).toBe(createResponse.data.id);
      expect(response.data.title).toBe(body.title);
      expect(response.data.description).toBe(body.description);
      expect(response.data.status).toBe("OPEN");
    });
  });

  describe("Invalid requests", () => {
    test("Should return 404 when ID is zero", async () => {
      try {
        await getIssue(0);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toContain("Invalid issue.");
      }
    });

    test("Should return 400 when ID is not a number", async () => {
      try {
        await getIssue("abc" as unknown as number);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 404 when ID is decimal", async () => {
      try {
        await getIssue(1.5);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    test("Should return 404 when issue does not exist", async () => {
      try {
        await getIssue(999999);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    test("Should return 404 when ID is negative", async () => {
      try {
        await getIssue(-1);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});
