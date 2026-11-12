# GigaShow (Pequeñas Fiestas) — Frontend

Aplicación web de la plataforma **GigaShow** migrada a **Next.js 16 (App Router)** con **React 19**, **TypeScript** y **Tailwind CSS 4**.

---

## 1. Tecnologías Principales

- **Framework:** Next.js 16 (App Router) + React 19
- **Lenguaje:** TypeScript (`strict: true`)
- **Estilos y UI:** Tailwind CSS 4 + Radix UI + Lucide Icons
- **Formularios y Validación:** React Hook Form + Zod
- **Pruebas E2E:** Playwright (`@playwright/test`)

---

## 2. Variables de Entorno

Crea un archivo `.env` o `.env.local` basándote en `.env.example` (nunca versiones `.env` en Git):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000
```

En producción (**Vercel**), define `NEXT_PUBLIC_API_URL` apuntando a la URL pública del backend desplegado en **Render** (por ejemplo: `https://pequennas-fiestas-backend.onrender.com`).

---

## 3. Instalación y Ejecución Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Verificar tipos y linter
npm run typecheck
npm run lint

# Construir para producción e iniciar
npm run build
npm start
```

---

## 4. Autenticación, Roles y Panel Administrativo

- **Inicio de Sesión y Registro (`/login`, `/register`):** Conectados a `POST /api/auth/login` y `POST /api/auth/register`. El token JWT recibido se almacena en `localStorage` (`gigashow_access_token`) y se adjunta automáticamente en el encabezado `Authorization: Bearer <token>` mediante `src/lib/apiClient.ts`.
- **Restricción de Rol en Registro:** El formulario de registro solo permite seleccionar los roles `cliente` o `artista` (nunca `admin`).
- **Protección de Rutas (`ProtectedRoute`):**
  - Si un usuario sin sesión intenta acceder a `/admin` o `/dashboard`, es redirigido a `/login`.
  - Si un usuario autenticado sin rol `admin` intenta acceder a `/admin`, visualiza la pantalla `403 Acceso prohibido` (`/403`).
- **Panel de Administración (`/admin`):** Exclusivo para usuarios con rol `admin`. Permite auditar **Usuarios**, **Artistas**, **Reservas** y **Calificaciones**, así como activar o desactivar registros (borrado lógico) en tiempo real.

### Roles y Usuarios de Prueba (Seed)

Los usuarios de prueba para cada rol se generan ejecutando `npm run seed` en el backend (ver `backend/src/infrastructure/prisma/seed.ts`), sin exponer contraseñas ni credenciales sensibles en el repositorio:

| Rol | Acceso en la Plataforma |
| --- | --- |
| **Administrador (`admin`)** | Panel `/admin` y gestión completa de recursos |
| **Usuario estándar (`user`)** | Catálogo, reservas y calificaciones (`403` en `/admin`) |
| **Cliente (`cliente`)** | Catálogo, reservas y calificaciones (`403` en `/admin`) |
| **Artista (`artista`)** | Panel `/dashboard` de artista |

---

## 5. Pruebas End-to-End (Playwright)

```bash
npm run build
npm run test:e2e
```

La suite en `tests/critical-flows.spec.js` valida:
1. Carga de la página principal (`/`) y catálogo (`/catalog`).
2. Manejo de rutas inexistentes (`404`) y acceso prohibido (`403`).
3. Registro de nuevo usuario verificando ausencia del rol `admin` y almacenamiento del JWT.
4. Inicio de sesión, persistencia de sesión tras recargar la página y cierre de sesión (`logout`).
5. Bloqueo de acceso a `/admin` para usuarios no autenticados (`/login`) y usuarios no administradores (`403`).
6. Acceso al panel `/admin` con cuenta `admin`, envío de token Bearer y desactivación/activación (borrado lógico) de registros desde la interfaz.

---

## 6. Despliegue en Producción (Vercel)

- **URL de Producción (Frontend):** [https://pequennasfiestas-frontend.vercel.app/](https://pequennasfiestas-frontend.vercel.app/)
- **Backend Conectado (Render):** [https://pequennas-fiestas-backend.onrender.com](https://pequennas-fiestas-backend.onrender.com)

### Pasos de Configuración en Vercel
1. Importar el repositorio `Ruales1138/pequennas_fiestas-frontend` en [Vercel](https://vercel.com).
2. Preset de Framework: **Next.js** (`npm run build`).
3. Añadir la variable de entorno `NEXT_PUBLIC_API_URL` con la URL del backend en Render (`https://pequennas-fiestas-backend.onrender.com`).
4. Desplegar y verificar navegación directa a `/`, `/catalog`, `/login`, `/register` y `/admin`.
