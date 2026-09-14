import { test, expect } from "@playwright/test";
import { DashboardPage } from "../../pages/DashboardPage";

let dashboardPage: DashboardPage;

test.beforeEach(async ({ page }) => {
  dashboardPage = new DashboardPage(page);

  await dashboardPage.goto();
});

test("All dashboard components are displayed", async () => {
  await expect(dashboardPage.navBar).toBeVisible();
  await expect(dashboardPage.issueChart).toBeVisible();
  await expect(dashboardPage.latestIssueTable).toBeVisible();
});

test("All dashboard page componenets with titles are displayed", async () => {
  await expect(dashboardPage.page.getByText("Open Issue")).toBeVisible();
  await expect(
    dashboardPage.page.getByText("In-Progress Issues"),
  ).toBeVisible();
  await expect(dashboardPage.page.getByText("Closed Issues")).toBeVisible();
  await expect(dashboardPage.page.getByText("Latest Issues")).toBeVisible();
});

test("Navigate to issue page", async () => {
  await dashboardPage.issueLink.click();
  await expect(dashboardPage.page).toHaveURL("/issues/list");
});
