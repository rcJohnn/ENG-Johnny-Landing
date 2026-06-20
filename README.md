# Johnny Rodríguez — Portfolio

Landing one-page de Johnny Rodríguez, Systems Engineer especializado en IA aplicada, Azure Cloud y desarrollo fullstack. Estética **editorial-industrial monocromática** con una sola señal de acento (azure) — inspirada en panel de instrumentos técnico, no en plantilla genérica de portfolio.

> 🌐 Demo en vivo: pendiente de dominio final.

---

## Stack

| Capa | Tecnología |
|---|---|
| Build | [Vite](https://vitejs.dev/) 6 |
| UI | [React](https://react.dev/) 19 + TypeScript 5.7 |
| Motion | [`motion`](https://motion.dev/) (sucesor de Framer Motion) |
| Estilos | CSS plano con custom properties — sin framework de utilidades |
| Render del hero | Canvas 2D nativo (sin librerías de animación/partículas) |

Sin backend, sin CMS — todo el contenido vive en componentes TSX. Despliegue como sitio estático.

---

## La pieza central: `HeroScene`

El fondo del hero no es un video ni una imagen — es una simulación interactiva en **Canvas 2D** (`src/components/HeroScene.tsx`), un grafo de nodos con física propia donde **el cursor actúa como un agente** que recorre el sistema:

- Los nodos cercanos al cursor se atraen con resorte y vuelven a su posición al alejarse.
- El cursor traza conexiones en vivo a los nodos más próximos, con paquetes de datos viajando por ellas.
- Constelación dinámica entre nodos por proximidad; se tiñen de azure solo cerca del cursor.
- El sistema deriva de forma autónoma (sin cursor) — nunca está del todo quieto.
- Se pausa fuera de viewport (`IntersectionObserver`), respeta `prefers-reduced-motion` (degrada a un frame estático) y `pointer: coarse` (corre autónomo sin cursor en touch).

Convive con un segundo sistema de parallax por **scroll** (`useScroll`/`useTransform` de `motion`) en el contenedor del hero — ambos componen sin conflicto porque son transforms en elementos anidados distintos.

---

## Estructura del proyecto

```
.
├── _source/                 # Material de diseño original (no se deploya)
│   ├── design.html          # Export bundler de Claude Design (fuente original)
│   └── logo-mark-master.png # Logo master (1024×1024, con alfa)
├── design-system/
│   └── MASTER.md             # Contrato de diseño: tokens, componentes, decisiones, auditorías
├── public/
│   ├── favicon-*.png, apple-touch-icon.png
│   └── images/                # WebP + AVIF optimizados (retrato, capturas de proyectos, logo, OG card)
├── src/
│   ├── components/             # Badge, Button, Tag, SectionLabel, NavBar, Reveal, RevealStagger,
│   │                           # HeroScene, Counter, Cursor, icons
│   ├── sections/                # Hero, Manifiesto, Sobre, Capacidades, Proyectos, Arsenal,
│   │                           # Trayectoria, Referencias, Contacto, Footer
│   ├── styles/globals.css     # Único archivo CSS: tokens + reset + componentes + layout
│   ├── motion.presets.ts      # Easing y variants compartidos (fadeUp, staggerParent)
│   └── App.tsx / main.tsx
└── index.html                  # Meta tags, Open Graph, favicons, fuentes
```

---

## Empezar

```bash
npm install
npm run dev       # http://localhost:5173
```

```bash
npm run build     # type-check (tsc -b) + build de producción → dist/
npm run preview   # sirve el build de dist/ localmente
```

No requiere variables de entorno ni servicios externos.

---

## Design system

Todo el contrato visual — colores, tipografía, spacing, motion, componentes, y el historial de auditorías hechas sobre el proyecto — vive documentado en **[`design-system/MASTER.md`](./design-system/MASTER.md)**. Antes de tocar un componente, los tokens se leen de ahí, nunca se hardcodean valores nuevos.

Resumen rápido:

- **Color**: monocromo (`--void` / `--ink` / `--paper` / `--graphite` / `--mist`) + una sola señal `--signal` (azure `#2F6BFF`) reservada para estados activos, hover, y 1–2 métricas. Nunca como relleno.
- **Tipografía**: Space Grotesk (display) · Inter (body) · JetBrains Mono (labels/datos).
- **Spacing**: grid base de 8px.
- **Motion**: easing premium `cubic-bezier(0.16, 1, 0.3, 1)`, reveals con `Reveal`/`RevealStagger`.
- **Responsive**: mobile-first real — toda regla base es el layout mobile; los `@media (min-width: …)` solo agregan complejidad, nunca usan `max-width`.
- **Accesibilidad**: contraste de texto ≥ 4.5:1 verificado (WCAG AA), touch targets ≥ 44×44px en elementos mobile-interactivos, `:focus-visible` con outline, `prefers-reduced-motion` respetado en toda animación.

---

## Secciones

| # | Sección | Contenido |
|---|---|---|
| — | **Hero** | `HeroScene` interactivo + headline con reveal por palabras + 2 CTAs |
| 01 | **Manifiesto** | Frase editorial de posicionamiento |
| 02 | **Sobre** | Retrato + bio + métricas con contador animado |
| 03 | **Capacidades** | Grid 2×2: IA & Agentes · Azure Cloud · Fullstack · Redes & Seguridad |
| 04 | **Proyectos** | NutrisSys y Nutricionista Pamela Alvarado, con capturas reales |
| 05 | **Arsenal** | Marquee infinito del stack tecnológico |
| 06 | **Trayectoria** | Timeline laboral + educación/certificaciones |
| 07 | **Referencias** | Testimonios (placeholders — pendientes de reemplazo) |
| 08 | **Contacto** | Email, LinkedIn, GitHub, ubicación, disponibilidad |

---

## Pendientes conocidos

- [ ] `og:url` en `index.html` — falta el dominio final de deploy.
- [ ] Auditoría de Core Web Vitals con Lighthouse contra el build de producción real (recomendado antes del deploy: `npm run build && npx serve dist`).
- [ ] Botón "Descargar CV" del hero — sin archivo todavía (`href="#"`).
- [ ] Sección Referencias — testimonios placeholder, pendientes de reemplazo por reales.

---

## Licencia

Proyecto personal de Johnny Rodríguez. Sin licencia abierta — todos los derechos reservados.
