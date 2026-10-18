# GigaShow - Frontend

Aplicación web del proyecto GigaShow construida con React y Vite.

## Tecnologías

- Node.js 22
- React 19
- Vite 7
- Nginx 1.27 para servir la aplicación en producción

## Ejecución local

```bash
npm ci
npm run dev
```

La aplicación se inicia normalmente en `http://localhost:5173`.

Para generar y revisar el build de producción:

```bash
npm run build
npm run preview
```

La URL del backend se configura con `VITE_API_URL`. Si no se define, se utiliza
`http://localhost:3000`.

## Ejecución con Docker

Desde este directorio:

```bash
docker build --build-arg VITE_API_URL=http://localhost:3000 -t gigashow-frontend .
docker run --rm -p 8080:80 gigashow-frontend
```

La aplicación estará disponible en `http://localhost:8080`.

El servidor Nginx incluye fallback hacia `index.html` para que funcionen las
rutas administradas por React Router al recargar la página.
