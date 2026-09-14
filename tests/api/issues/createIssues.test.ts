import { AxiosResponse } from "axios";
import { createIssue, deleteIssue } from "../../../api/issue.api";
import { CreateIssue } from "../../../types/issue";

describe("Valid request", () => {
  let response: AxiosResponse;

  const body: CreateIssue = {
    title: "First Test Issue",
    description: "My new issue",
  };

  beforeAll(async () => {
    response = await createIssue(body);
  });
  afterAll(async () => {
    await deleteIssue(response.data.id);
  });

  test("Should return status 201", () => {
    expect(response.status).toBe(201);
  });

  test("Should return created issue", () => {
    console.log("####response data###" + response.data);
    expect(response.data).toBeDefined(); //value is not undifined
  });

  test("Should return created issue with ID", () => {
    expect(response.data).toHaveProperty("id");
    expect(typeof response.data.id).toBe("number");
  });

  test("Should return the same title", () => {
    expect(response.data.title).toBe(body.title);
  });

  test("Should return the same description", () => {
    expect(response.data.description).toBe(body.description);
  });

  test("New issue shoud have OPEN status", () => {
    expect(response.data.status).toBe("OPEN");
  });
  test("Should include all expected properties", () => {
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("title");
    expect(response.data).toHaveProperty("description");
    expect(response.data).toHaveProperty("status");
  });

  describe("Invalid requests", () => {
    test("Should return 400 when title is missing", async () => {
      const invalidBody = {
        description: "Test description",
      };
      try {
        await createIssue(invalidBody as CreateIssue);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when description is missing", async () => {
      const inavlidBody = {
        title: "New issue",
      };

      try {
        await createIssue(inavlidBody as CreateIssue);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title is empty", async () => {
      const invalidBody = {
        title: "",
        description: "new issue",
      };

      try {
        await createIssue(invalidBody);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when description is empty", async () => {
      const inavlidBody = {
        title: "New issue",
        description: "",
      };

      try {
        await createIssue(inavlidBody as CreateIssue);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when body is empty", async () => {
      const invalidBody = {};

      try {
        await createIssue(invalidBody as CreateIssue);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });

    test("Should return 400 when title is longer then 255 chars", async () => {
      const invalidBody = {
        title: "a".repeat(256),
        description: "Hello world",
      };

      try {
        await createIssue(invalidBody);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });
    test("Should return 400 when title is a number", async () => {
      const invalidBody = {
        title: 123,
        description: "Test description",
      };

      try {
        await createIssue(invalidBody as unknown as CreateIssue);
      } catch (error: any) {
        expect(error.response.status).toBe(400);
      }
    });
  });
});
