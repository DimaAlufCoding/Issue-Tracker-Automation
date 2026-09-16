import { AxiosResponse } from "axios";
import { createIssue, deleteIssue, getIssue } from "../../../api/issue.api";
import { CreateIssue } from "../../../types/issue";

describe("DELETE api/issues/:id", () => {
  describe("Valid request", () => {
    let response: AxiosResponse;
    let deleteIssueResponse: AxiosResponse;

    const body = {
      title: "Delete issue test",
      description: "Issue created for DELETE API test",
    };

    beforeAll(async () => {
      response = await createIssue(body);
      deleteIssueResponse = await deleteIssue(response.data.id);
    });

    test("Should successfully delete issue", () => {
      expect(deleteIssueResponse.status).toBe(200);
    });

    test("Deleted issue should no longer exist", async () => {
      try {
        await getIssue(response.data.id);
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    });
  });
});

describe("Invalid requests", () => {
  test("Should return 500 when issue does not exist", async () => {
    try {
      await deleteIssue(999999);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });

  test("Should return 500 when ID is zero", async () => {
    try {
      await deleteIssue(0);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });

  test("Should return 500 when ID is negative", async () => {
    try {
      await deleteIssue(-1);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });

  test("Should return 500 when ID is not a number", async () => {
    try {
      await deleteIssue("abc" as unknown as number);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });

  test("Should return 500 when deleting the same issue twice", async () => {
    const issue = await createIssue({
      title: "Delete twice test",
      description: "Testing duplicate DELETE",
    });

    const id = issue.data.id;

    const firstDelete = await deleteIssue(id);

    expect([200, 204]).toContain(firstDelete.status);

    try {
      await deleteIssue(id);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });
});
