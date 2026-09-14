import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly issueChart: Locator;
  readonly navBar: Locator;
  readonly latestIssueTable: Locator;
  readonly issueLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.issueChart = page.locator("#issue-chart");
    this.navBar = page.locator("#nav-bar");
    this.latestIssueTable = page.locator("#latest-issue-table");
    this.issueLink = page.getByRole("link", { name: "issues", exact: true });
  }

  async goto() {
    await this.page.goto("/");
  }
}
