import { test, expect } from "@playwright/test";

test.beforeEach("should load page", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle(/tomeTracker/);
});

test.describe("Add Book", () => {
  test("should login", async ({ page }) => {
    const loginButton = page.getByRole("button", { name: "Login" });
    await loginButton.click();

    const emailInput = page.getByLabel("email");
    const passwordInput = page.getByLabel("password");

    await emailInput.fill("jkrzysiak13@gmail.com");
    await passwordInput.fill("testing123");

    await passwordInput.press("Enter");

    await expect(page).toHaveURL(/\.*home/);
  });
});
// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible();
// });
