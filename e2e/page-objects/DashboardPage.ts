import type { Page } from "@playwright/test";

export class DashboardPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/dashboard");
  }

  /** Click the star button for a coin. Determines add vs remove by current aria-label. */
  async toggleFavorite(coinName: string) {
    const addBtn = this.page.getByRole("button", {
      name: `Add ${coinName} to favorites`,
    });
    const removeBtn = this.page.getByRole("button", {
      name: `Remove ${coinName} from favorites`,
    });

    if (await addBtn.isVisible()) {
      await addBtn.click();
    } else {
      await removeBtn.click();
    }
  }

  /** Click a ToggleGroup time-range button by its label text. */
  async setChartTimeRange(label: "Last 7 days" | "Last 30 days" | "Last 3 months") {
    await this.page.getByRole("radio", { name: label }).click();
  }

  /** Open the NavUser dropdown and click Log out. */
  async logout() {
    await this.page.locator("button").filter({ hasText: "Test User" }).click();
    await this.page.getByRole("menuitem", { name: "Log out" }).click();
  }
}
