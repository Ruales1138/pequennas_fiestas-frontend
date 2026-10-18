import { expect, test } from "@playwright/test";

test("home page loads successfully", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("GigaShow");
  await expect(page.locator("#root")).toBeVisible();
});

test("catalog route is available after a direct navigation", async ({ page }) => {
  await page.goto("/catalog");

  await expect(page).toHaveURL(/\/catalog$/);
  await expect(page.locator("#root")).toBeVisible();
});
