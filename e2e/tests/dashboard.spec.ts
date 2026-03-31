import { test, expect } from "../fixtures";
import { addFavorite } from "../helpers/db";
import { DashboardPage } from "../page-objects/DashboardPage";
import { MOCK_COINS } from "../fixtures/mock-data";

test.describe("Dashboard", () => {
  test("renders coins table with mock data", async ({ authedPage: { page } }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    for (const coin of MOCK_COINS) {
      await expect(page.getByText(coin.name).first()).toBeVisible();
    }
  });

  test("renders section cards with global market data", async ({
    authedPage: { page },
  }) => {
    await page.goto("/dashboard");
    // SectionCards shows "Market Cap" card
    await expect(page.getByText("Market Cap").first()).toBeVisible();
  });

  test("renders chart with time range controls", async ({
    authedPage: { page },
  }) => {
    await page.goto("/dashboard");
    // ToggleGroup items render as role="radio" buttons
    await expect(page.getByRole("radio", { name: "Last 3 months" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Last 30 days" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "Last 7 days" })).toBeVisible();
  });

  test("adds a coin to favorites (optimistic UI)", async ({
    authedPage: { page },
  }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    const coinName = MOCK_COINS[0].name; // Bitcoin
    const addButton = page.getByRole("button", {
      name: `Add ${coinName} to favorites`,
    });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // Optimistic update: button flips to "Remove" immediately
    await expect(
      page.getByRole("button", { name: `Remove ${coinName} from favorites` })
    ).toBeVisible();
  });

  test("removes a coin from favorites (optimistic UI)", async ({
    authedPage: { page, userId },
  }) => {
    await addFavorite(userId, MOCK_COINS[0].id);

    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    const coinName = MOCK_COINS[0].name; // Bitcoin
    const removeButton = page.getByRole("button", {
      name: `Remove ${coinName} from favorites`,
    });
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    await expect(
      page.getByRole("button", { name: `Add ${coinName} to favorites` })
    ).toBeVisible();
  });
});
