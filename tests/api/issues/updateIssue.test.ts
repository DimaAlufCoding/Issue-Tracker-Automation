import type { AxiosResponse } from "axios";
import {
  createIssue,
  updateIssue,
  getIssue,
  deleteIssue,
} from "../../../api/issue.api";
import type { CreateIssue } from "../../../types/issue";

describe("PUT /api/issues/:id", () => {
  let createResponse: AxiosResponse;
  let updateResponse: AxiosResponse;

  const createBody: CreateIssue = {
    title: "Original Issue",
    description: "Original description",
  };

  const updateBody: CreateIssue = {
    title: "Updated Issue",
    description: "Updated description",
  };

  beforeAll(async () => {
    createResponse = await createIssue(createBody);

    updateResponse = await updateIssue(createResponse.data.id, updateBody);
  });

  afterAll(async () => {
    await deleteIssue(createResponse.data.id);
  });

  describe("Valid request", () => {
    test("Should return status 200", () => {
      expect(updateResponse.status).toBe(200);
    });

    test("Should return response data", () => {
      expect(updateResponse.data).toBeDefined();
    });

    test("Should return the same issue ID", () => {
      expect(updateResponse.data.id).toBe(createResponse.data.id);
    });

    test("Should return updated title", () => {
      expect(updateResponse.data.title).toBe(updateBody.title);
    });

    test("Should return updated description", () => {
      expect(updateResponse.data.description).toBe(updateBody.description);
    });

    test("Should return expected properties with correct data types", () => {
      expect(updateResponse.data).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          description: expect.any(String),
          status: expect.any(String),
        }),
      );
    });

    test("Should persist updated data", async () => {
      const getResponse = await getIssue(createResponse.data.id);

      expect(getResponse.data.title).toBe(updateBody.title);
      expect(getResponse.data.description).toBe(updateBody.description);
    });
  });

  describe("Invalid requests", () => {
    test("Should return 404 when issue does not exist", async () => {
      try {
        await updateIssue(999999, updateBody);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    test("Should return 404 when ID is zero", async () => {
      try {
        await updateIssue(0, updateBody);

        fail("Request should have returned 404");
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });

    test("Should return 400 when ID is not a number", async () => {
      try {
        await updateIssue("abc" as unknown as number, updateBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title is empty", async () => {
      const invalidBody: CreateIssue = {
        title: "",
        description: "Updated description",
      };

      try {
        await updateIssue(createResponse.data.id, invalidBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when description is empty", async () => {
      const invalidBody: CreateIssue = {
        title: "Updated Issue",
        description: "",
      };

      try {
        await updateIssue(createResponse.data.id, invalidBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title is longer than 255 characters", async () => {
      const invalidBody: CreateIssue = {
        title: "a".repeat(256),
        description: "Updated description",
      };

      try {
        await updateIssue(createResponse.data.id, invalidBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title is a number", async () => {
      const invalidBody = {
        title: 123,
        description: "Updated description",
      };

      try {
        await updateIssue(
          createResponse.data.id,
          invalidBody as unknown as CreateIssue,
        );

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when description is a number", async () => {
      const invalidBody = {
        title: "Updated Issue",
        description: 123,
      };

      try {
        await updateIssue(
          createResponse.data.id,
          invalidBody as unknown as CreateIssue,
        );

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title contains only spaces", async () => {
      const invalidBody: CreateIssue = {
        title: "   ",
        description: "Updated description",
      };

      try {
        await updateIssue(createResponse.data.id, invalidBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when description contains only spaces", async () => {
      const invalidBody: CreateIssue = {
        title: "Updated Issue",
        description: "   ",
      };

      try {
        await updateIssue(createResponse.data.id, invalidBody);

        fail("Request should have returned 400");
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });
  });
});
