import type { AxiosResponse } from "axios";
import { getIssues, createIssue } from "../../../api/issue.api";
import { Issue } from "../../../types/issue";

describe("Issues API", () => {
  let response: AxiosResponse;
  let issues: Issue[];

  beforeAll(async () => {
    response = await getIssues();
    issues = response.data;
  });

  test("Create issue", async () => {
    const response = await createIssue({
      title: "Test new",
      description: "Newww testtt",
    });

    expect(response.status).toBe(201);
  });

  test("testing the api status - 200", () => {
    expect(response.status).toBe(200);
  });

  test("Verify all property of issue", () => {
    issues.forEach((issue) => {
      expect(issue).toHaveProperty("id");
      expect(issue).toHaveProperty("title");
      expect(issue).toHaveProperty("description");
      expect(issue).toHaveProperty("status");
    });
  });

  test("Verify all values type are according to the spec", () => {
    issues.forEach((issue) => {
      expect(typeof issue.id).toBe("number");
      expect(typeof issue.status).toBe("string");
      expect(typeof issue.description).toBe("string");
      expect(typeof issue.title).toBe("string");
    });
  });

  test("Verify new issue is created", async () => {
    const body = {
      title: "New Issue that i created2",
      description: "My new issue",
    };

    const responseOfNewIssue = await createIssue(body);
    const newIssueId = responseOfNewIssue.data.id;

    const getResponse = await getIssues();

    const lastIssue = getResponse.data[getResponse.data.length - 1];

    expect(lastIssue.id).toBe(newIssueId);
  });

  test("Verify multiple requests", async () => {
    const requests = [];

    for (let i = 0; i < 10; i++) {
      requests.push(getIssues());
    }

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      expect(response.status).toBe(200);
    });
  });
});
