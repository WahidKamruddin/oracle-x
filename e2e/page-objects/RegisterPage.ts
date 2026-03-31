import type { Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/register");
  }

  async fillAndSubmit(name: string, email: string, password: string) {
    await this.page.getByLabel("Full Name").fill(name);
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Password", { exact: true }).fill(password);
    // Confirm Password field has no `name` attr so isn't submitted, but fill it for UX completeness
    await this.page.getByLabel("Confirm Password").fill(password);
    await this.page.getByRole("button", { name: "Create An Account" }).click();
  }
}
