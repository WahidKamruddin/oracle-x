import { test as base, expect, type Page } from "@playwright/test";
import { resetDb, createTestUser } from "../helpers/db";
import { injectAuthCookie } from "../helpers/session";

type AuthedPage = {
  page: Page;
  userId: string;
  email: string;
  password: string;
};

export const test = base.extend<{ authedPage: AuthedPage }>({
  authedPage: async ({ browser }, use) => {
    await resetDb();
    const user = await createTestUser();
    const context = await browser.newContext();
    await injectAuthCookie(context, user.id);
    const page = await context.newPage();

    await use({ page, userId: user.id, email: user.email, password: user.plainPassword });

    await page.close();
    await context.close();
  },
});

export { expect };
