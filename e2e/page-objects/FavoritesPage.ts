import type { Page, Locator } from "@playwright/test";

export class FavoritesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/dashboard/favorites");
  }

  getEmptyState(): Locator {
    return this.page.getByText("No favorites yet.");
  }

  getCoinRows(): Locator {
    return this.page.locator("tbody tr");
  }
}
