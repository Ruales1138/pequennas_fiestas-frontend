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
  await expect(page.getByRole("heading", { name: "Catálogo de Artistas" })).toBeVisible();
});

test("not found page is available after an unknown route", async ({ page }) => {
  await page.goto("/ruta-inexistente");

  await expect(page).toHaveURL(/\/ruta-inexistente$/);
  await expect(page.getByText("404")).toBeVisible();
});

test("forbidden page is available for unauthorized access", async ({ page }) => {
  await page.goto("/403");

  await expect(page).toHaveURL(/\/403$/);
  await expect(page.getByText("403")).toBeVisible();
  await expect(page.getByRole("link", { name: "Ir al inicio" })).toBeVisible();
});
