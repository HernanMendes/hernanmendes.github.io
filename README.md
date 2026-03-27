# hernanmendes.github.io

Sitio estático generado con Eleventy (11ty).

## Requisitos
- Node.js + npm

## Instalación
```bash
npm install
```

## Comandos
```bash
# Compila el sitio (salida en _site/)
npm run build

# Compila y levanta servidor local con recarga
npm run dev
```

## Estructura del proyecto
`src/` contiene el código fuente. `_site/` es la salida generada por Eleventy.

```
src/
  _data/         Datos globales para plantillas (JSON, JS, etc.)
  _includes/
    layout.njk   Layout principal
    partials/    Secciones reutilizables (nav, hero, about, etc.)
  assets/        CSS, JS, imágenes, fuentes, etc.
  sections/      Contenido fuente en Markdown
  index.njk      Página principal que incluye los partials

_site/           HTML generado (no editar a mano)
node_modules/    Dependencias instaladas (no versionar)
```

## Sobre `sections/`
Hay dos carpetas llamadas `sections`, pero cumplen roles distintos:

- `src/sections/`: contenido fuente en Markdown (`.md`).
- `_site/sections/`: HTML generado por Eleventy luego de `build`/`dev`.

**Regla:** editar siempre en `src/sections/` (o en los templates), nunca en `_site/`.

## Flujo de renderizado (resumen)
- `src/index.njk` compone la home e incluye partials desde `src/_includes/partials/`.
- El contenido en `src/sections/*.md` se transforma a HTML y se publica en `_site/sections/`.
- Los assets van en `src/assets/` y se copian/usan en el build final.

## Mapa de partials (home)
`src/index.njk` incluye los partials en este orden:

- `src/_includes/partials/nav.njk`
- `src/_includes/partials/hero.njk`
- `src/_includes/partials/about.njk`
- `src/_includes/partials/skills.njk`
- `src/_includes/partials/projects.njk`
- `src/_includes/partials/experience.njk`
- `src/_includes/partials/contact.njk`
- `src/_includes/partials/footer.njk`

Si agregás o quitás una sección visible en la home, hacelo desde `src/index.njk`.

## Convenciones de contenido
- Mantener el contenido editable en `src/sections/` (Markdown).
- Evitar editar HTML generado en `_site/`.
- Si necesitás cambiar el layout o el orden visual, hacelo en los partials o en `src/index.njk`.
- Los assets nuevos (imágenes, CSS, JS, fuentes) deben ir en `src/assets/`.

## Notas
- Si ves cambios en `_site/`, provienen del proceso de build.
- Para desarrollo local, usar `npm run dev` y trabajar siempre en `src/`.
