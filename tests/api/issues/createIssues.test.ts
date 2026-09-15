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

  test("Should return correct response data types", () => {
    expect(typeof response.data.id).toBe("number");
    expect(typeof response.data.title).toBe("string");
    expect(typeof response.data.description).toBe("string");
    expect(typeof response.data.status).toBe("string");
  });
  test("Should include all expected properties", () => {
    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("title");
    expect(response.data).toHaveProperty("description");
    expect(response.data).toHaveProperty("status");
  });
});

describe("Invalid requests", () => {
  test("Should return 400 when title is missing", async () => {
    const invalidBody = {
      description: "Test description",
    };
    try {
      await createIssue(invalidBody as CreateIssue);
      fail("Request should have returned 400");
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
      fail("Request should have returned 400");
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
      fail("Request should have returned 400");
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
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should return 400 when body is empty", async () => {
    const invalidBody = {};

    try {
      await createIssue(invalidBody as CreateIssue);
      fail("Request should have returned 400");
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
      fail("Request should have returned 400");
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
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
  test("Should return 400 when description is a number", async () => {
    const invalidBody = {
      title: "Test issue",
      description: 123,
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
  test("Should return 400 when title is null", async () => {
    const invalidBody = {
      title: null,
      description: "Test description",
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
  test("Should return 400 when description is null", async () => {
    const invalidBody = {
      title: "Test issue",
      description: null,
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
  test("Should return 400 when title is boolean", async () => {
    const invalidBody = {
      title: true,
      description: "Test description",
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should return 400 when description is boolean", async () => {
    const invalidBody = {
      title: "Test issue",
      description: false,
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
  test("Should return 400 when title is an array", async () => {
    const invalidBody = {
      title: ["Test issue"],
      description: "Test description",
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should return 400 when description is an object", async () => {
    const invalidBody = {
      title: "Test issue",
      description: {
        text: "Test description",
      },
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe("Positive inputs", () => {
  test("Should create issue when title is exactly 255 chars", async () => {
    const body: CreateIssue = {
      title: "a".repeat(255),
      description: "Boundary test",
    };

    const response = await createIssue(body);

    expect(response.status).toBe(201);
    expect(response.data.title).toBe(body.title);
    expect(response.data.title.length).toBe(255);
  });
  test("Should create issue with Hebrew characters", async () => {
    const body: CreateIssue = {
      title: "בעיה בהתחברות",
      description: "המשתמש לא מצליח להתחבר למערכת",
    };

    const response = await createIssue(body);

    expect(response.status).toBe(201);
    expect(response.data.title).toBe(body.title);
    expect(response.data.description).toBe(body.description);
  });

  test("Should create issue with special characters", async () => {
    const body: CreateIssue = {
      title: "Login issue !@#$%^&*()",
      description: "Special characters test",
    };

    const response = await createIssue(body);

    expect(response.status).toBe(201);
    expect(response.data.title).toBe(body.title);
  });
});

describe("Verefication of input wrong types in paylod", () => {
  test("Should return 400 when title is an object", async () => {
    const invalidBody = {
      title: { value: "Test" },
      description: "Test description",
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should return 400 when description is an array", async () => {
    const invalidBody = {
      title: "Test issue",
      description: ["description"],
    };

    try {
      await createIssue(invalidBody as unknown as CreateIssue);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
});

describe("Verification of white spaces", () => {
  test("Should return 400 when title contains only spaces", async () => {
    const invalidBody = {
      title: "   ",
      description: "Test description",
    };

    try {
      await createIssue(invalidBody);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Should return 400 when description contains only spaces", async () => {
    const invalidBody = {
      title: "Test issue",
      description: "   ",
    };

    try {
      await createIssue(invalidBody);
      fail("Request should have returned 400");
    } catch (error: any) {
      expect(error.response.status).toBe(400);
    }
  });
});
