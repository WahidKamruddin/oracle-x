import { test, expect } from "../fixtures";

test.describe("Profile page", () => {
  test("is accessible when authenticated", async ({ authedPage: { page } }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL("/profile");
    // Profile page renders Tabs with General, Preferences, Users
    await expect(page.getByRole("tab", { name: "General" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Preferences" })).toBeVisible();
  });
});
