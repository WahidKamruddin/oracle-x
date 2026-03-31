import { test, expect } from "../fixtures";
import { test as baseTest } from "@playwright/test";
import { addFavorite, resetDb } from "../helpers/db";
import { MOCK_COINS } from "../fixtures/mock-data";
import { FavoritesPage } from "../page-objects/FavoritesPage";

test.describe("Favorites page (authenticated)", () => {
  test("shows empty state when user has no favorites", async ({
    authedPage: { page },
  }) => {
    const favoritesPage = new FavoritesPage(page);
    await favoritesPage.goto();
    await expect(favoritesPage.getEmptyState()).toBeVisible();
  });

  test("shows favorited coins", async ({ authedPage: { page, userId } }) => {
    await addFavorite(userId, MOCK_COINS[0].id); // bitcoin
    await addFavorite(userId, MOCK_COINS[1].id); // ethereum

    const favoritesPage = new FavoritesPage(page);
    await favoritesPage.goto();

    await expect(page.getByText("Bitcoin").first()).toBeVisible();
    await expect(page.getByText("Ethereum").first()).toBeVisible();
    await expect(page.getByText("No favorites yet.")).not.toBeVisible();
  });
});

baseTest.describe("Favorites page (unauthenticated)", () => {
  baseTest.beforeEach(async () => {
    await resetDb();
  });

  baseTest("redirects to /login", async ({ page }) => {
    await page.goto("/dashboard/favorites");
    await expect(page).toHaveURL("/login");
  });
});
