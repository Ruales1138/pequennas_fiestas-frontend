import { expect, test } from "@playwright/test";

function createTestJwt(payload) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }),
  ).toString("base64url");
  return `${header}.${body}.test_signature`;
}

test.beforeEach(async ({ page }) => {
  await page.route("**/api/artists*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          {
            id: "artist-profile-1",
            userId: "artist-user-1",
            city: "Medellín",
            category: "Animación y Entretenimiento",
            baseRate: 250000,
            isActive: true,
            user: {
              id: "artist-user-1",
              name: "Artista Demo GigaShow",
              email: "artista@gigashow.com",
              role: "artista",
            },
          },
        ],
        pagination: { total: 1, currentPage: 1, limit: 10, totalPages: 1 },
      }),
    });
  });
});

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

test("register flow prevents admin role selection, calls POST /api/auth/register, and stores JWT", async ({
  page,
}) => {
  const registeredUser = {
    id: "user-new-1",
    name: "Laura Cliente",
    email: "laura@gigashow.com",
    role: "cliente",
  };
  const token = createTestJwt(registeredUser);

  let capturedBody = null;
  await page.route("**/api/auth/register", async (route) => {
    capturedBody = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Usuario registrado exitosamente",
        user: registeredUser,
        token,
        expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      }),
    });
  });

  await page.goto("/register");

  // Verify role selector only allows 'artista' and 'cliente', never 'admin'
  const roleOptions = await page.locator('select[name="role"] option').allTextContents();
  expect(roleOptions.map((t) => t.toLowerCase())).not.toContain("admin");
  expect(roleOptions.map((t) => t.toLowerCase())).not.toContain("administrador");

  await page.getByPlaceholder("Juan Pérez").fill("Laura Cliente");
  await page.getByPlaceholder("tu@email.com").fill("laura@gigashow.com");
  await page.getByPlaceholder("Min. 8 caracteres, 1 mayúscula, 1 número").fill("Cliente123!");
  await page.locator('select[name="role"]').selectOption("cliente");
  await page.getByRole("button", { name: "Registrarse" }).click();

  await expect(page).toHaveURL(/\/$/);
  expect(capturedBody).toMatchObject({
    name: "Laura Cliente",
    email: "laura@gigashow.com",
    role: "cliente",
  });

  const storedToken = await page.evaluate(() =>
    window.localStorage.getItem("gigashow_access_token"),
  );
  expect(storedToken).toBe(token);
  await expect(page.getByText("Laura Cliente")).toBeVisible();
});

test("login flow authenticates via POST /api/auth/login, persists session across reload, and logs out", async ({
  page,
}) => {
  const standardUser = {
    id: "user-seed-1",
    name: "Usuario Estándar GigaShow",
    email: "user@gigashow.com",
    role: "user",
  };
  const token = createTestJwt(standardUser);

  await page.route("**/api/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Inicio de sesión exitoso",
        user: standardUser,
        token,
        expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      }),
    });
  });

  await page.route("**/api/auth/sign-out", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/login");
  await page.getByPlaceholder("tu@email.com").fill("user@gigashow.com");
  await page.getByPlaceholder("Tu contraseña").fill("User123!");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByText("Usuario Estándar GigaShow")).toBeVisible();
  await expect(page.getByRole("link", { name: "Administración" })).toHaveCount(0);

  // Reload page and verify JWT session persistence
  await page.reload();
  await expect(page.getByText("Usuario Estándar GigaShow")).toBeVisible();

  // Logout and verify session is cleared
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page.getByRole("link", { name: "Iniciar sesión" })).toBeVisible();

  const storedTokenAfterLogout = await page.evaluate(() =>
    window.localStorage.getItem("gigashow_access_token"),
  );
  expect(storedTokenAfterLogout).toBeNull();
});

test("non-admin user accessing /admin receives 403 Forbidden and unauthenticated user is redirected to /login", async ({
  page,
}) => {
  // 1. Unauthenticated access -> redirect to /login
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login\?from=%2Fadmin$/);

  // 2. Authenticated non-admin access -> 403 Forbidden
  const nonAdminUser = {
    id: "client-seed-1",
    name: "Cliente Demo GigaShow",
    email: "cliente@gigashow.com",
    role: "cliente",
  };
  const token = createTestJwt(nonAdminUser);

  await page.evaluate(
    ({ tokenValue, userValue }) => {
      window.localStorage.setItem("gigashow_access_token", tokenValue);
      window.localStorage.setItem("gigashow_auth_user", JSON.stringify(userValue));
    },
    { tokenValue: token, userValue: nonAdminUser },
  );

  await page.goto("/admin");
  await expect(page.getByText("403")).toBeVisible();
  await expect(page.getByText("Acceso prohibido")).toBeVisible();
});

test("admin user accesses /admin panel, views resources with Bearer token, and toggles status (logical delete)", async ({
  page,
}) => {
  const adminUser = {
    id: "admin-seed-1",
    name: "Administrador GigaShow",
    email: "admin@gigashow.com",
    role: "admin",
  };
  const adminToken = createTestJwt(adminUser);

  let authHeaderReceived = "";
  let patchCalled = false;

  await page.route("**/api/auth/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Inicio de sesión exitoso",
        user: adminUser,
        token: adminToken,
        expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      }),
    });
  });

  await page.route("**/api/admin/users", async (route) => {
    authHeaderReceived = route.request().headers()["authorization"] || "";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        data: [
          {
            id: "user-seed-1",
            name: "Usuario Estándar GigaShow",
            email: "user@gigashow.com",
            role: "user",
            isActive: true,
          },
        ],
      }),
    });
  });

  await page.route("**/api/admin/artists", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        data: [
          {
            id: "artist-profile-1",
            name: "Artista Demo GigaShow",
            email: "artista@gigashow.com",
            role: "artista",
            city: "Medellín",
            category: "Magia",
            isActive: true,
          },
        ],
      }),
    });
  });

  await page.route("**/api/admin/bookings", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        data: [
          {
            id: "booking-1",
            name: "Cliente Demo → Artista Demo",
            role: "confirmada",
            isActive: true,
          },
        ],
      }),
    });
  });

  await page.route("**/api/admin/ratings", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        data: [
          {
            id: "rating-1",
            name: "Excelente espectáculo",
            role: "5 ★",
            isActive: true,
          },
        ],
      }),
    });
  });

  await page.route("**/api/admin/users/user-seed-1/status", async (route) => {
    patchCalled = true;
    const body = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        data: {
          id: "user-seed-1",
          name: "Usuario Estándar GigaShow",
          email: "user@gigashow.com",
          role: "user",
          isActive: body.isActive,
        },
      }),
    });
  });

  await page.goto("/login");
  await page.getByPlaceholder("tu@email.com").fill("admin@gigashow.com");
  await page.getByPlaceholder("Tu contraseña").fill("Admin123!");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  await expect(page).toHaveURL(/\/$/);
  const adminLink = page.getByRole("link", { name: "Administración" });
  await expect(adminLink).toBeVisible();

  await adminLink.click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Panel de administración" })).toBeVisible();
  await expect(page.getByText("Usuario Estándar GigaShow")).toBeVisible();
  await expect(page.getByText("Artista Demo GigaShow")).toBeVisible();
  expect(authHeaderReceived).toBe(`Bearer ${adminToken}`);

  // Deactivate user from the admin panel and verify status badge changes to Inactivo
  const userSection = page.locator("section", { hasText: "Usuarios" });
  await userSection.getByRole("button", { name: "Desactivar" }).click();
  expect(patchCalled).toBe(true);
  await expect(userSection.getByText("Inactivo")).toBeVisible();
  await expect(userSection.getByRole("button", { name: "Activar" })).toBeVisible();
});
