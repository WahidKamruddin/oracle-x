import { test, expect } from "@playwright/test";
import { resetDb, createTestUser } from "../helpers/db";
import { injectAuthCookie } from "../helpers/session";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";

test.describe("Authentication", () => {
  test.beforeEach(async () => {
    await resetDb();
  });

  test.describe("Registration", () => {
    test("registers a new user and redirects to /", async ({ page }) => {
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.fillAndSubmit("Alice", "alice@example.com", "Password123");
      await expect(page).toHaveURL("/");
    });

    test("shows error for duplicate email", async ({ page }) => {
      await createTestUser({ email: "existing@example.com" });
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.fillAndSubmit("Bob", "existing@example.com", "Password123");
      await expect(page.getByText("Email already exists.")).toBeVisible();
    });

    test("blocks registration with short password (stays on /register)", async ({ page }) => {
      // The signup form does not render the password error message in the UI,
      // so we assert that the user stays on /register and is NOT redirected to /.
      const registerPage = new RegisterPage(page);
      await registerPage.goto();
      await registerPage.fillAndSubmit("Alice", "alice@example.com", "short");
      await expect(page).toHaveURL("/register");
    });
  });

  test.describe("Login", () => {
    test("logs in with valid credentials and redirects to /", async ({ page }) => {
      await createTestUser({ email: "user@example.com", password: "Password123" });
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillAndSubmit("user@example.com", "Password123");
      await expect(page).toHaveURL("/");
    });

    test("shows error for wrong password", async ({ page }) => {
      await createTestUser({ email: "user@example.com", password: "Password123" });
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillAndSubmit("user@example.com", "WrongPassword");
      await expect(page.getByText("Invalid email or password")).toBeVisible();
    });

    test("shows error for non-existent email", async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.fillAndSubmit("nobody@example.com", "Password123");
      await expect(page.getByText("Invalid email or password")).toBeVisible();
    });
  });

  test.describe("Route protection", () => {
    // /dashboard has a page-level check: if (!user) redirect("/")
    test("unauthenticated user visiting /dashboard is redirected to /login", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page).toHaveURL("/login");
    });

    // /dashboard/favorites has a page-level check: if (!user) redirect("/login")
    test("unauthenticated user visiting /dashboard/favorites is redirected to /login", async ({
      page,
    }) => {
      await page.goto("/dashboard/favorites");
      await expect(page).toHaveURL("/login");
    });
  });

  test.describe("Logout", () => {
    test("logs out and navigates away from dashboard", async ({ browser }) => {
      const user = await createTestUser();
      const context = await browser.newContext();
      await injectAuthCookie(context, user.id);
      const page = await context.newPage();

      await page.goto("/dashboard");
      await expect(page).toHaveURL("/dashboard");

      // Open sidebar NavUser dropdown and click Log out
      await page.locator("button").filter({ hasText: "Test User" }).click();
      await page.getByRole("menuitem", { name: "Log out" }).click();

      // After logout the dashboard page re-renders and redirects (no user → redirect "/")
      await expect(page).not.toHaveURL("/dashboard");

      await page.close();
      await context.close();
    });
  });
});
