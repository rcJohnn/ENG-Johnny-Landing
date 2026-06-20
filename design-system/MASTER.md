# MASTER.md — Johnny Rodríguez · Portfolio Design System

> Contrato de diseño. **Todo componente toma sus tokens de acá.** Nunca hardcodear
> colores, fuentes ni spacing en los componentes — siempre vía CSS variables.
>
> Fuente: `_source/design.html` (export de Claude Design, bundle descifrado).
> Estética: **editorial-industrial monocromática + una sola señal azure.**
> Monocromático el 95% del tiempo. El azure SOLO para: estados activos, cursor,
> hover de links, el punto "● disponible", el subrayado del índice de sección y
> 1–2 métricas. Nunca como relleno de fondo.

---

## Colors

```css
/* --- Ink / paper base ramp --- */
--ink:      #0B0B0D;   /* texto primario sobre claro, neutro más profundo */
--void:     #060607;   /* canvas casi-negro (hero, secciones oscuras) */
--paper:    #F3F2EE;   /* superficie off-white cálida */
--graphite: #56565C;   /* texto secundario */
--mist:     #9A9AA0;   /* texto terciario / disabled */

/* --- Hairlines (reglas técnicas 1px) --- */
--line-light: #DEDCD5; /* divisor sobre paper */
--line-dark:  #1C1C20; /* divisor sobre void/ink */

/* --- La señal (azure) — uso quirúrgico --- */
--signal:      #2F6BFF;                 /* el azul eléctrico, acento */
--signal-dim:  #1E47B8;                 /* pressed / azure más oscuro */
--signal-soft: rgba(47,107,255,0.08);   /* wash tenue, focus rings, hovers */

/* --- Aliases semánticos (contexto claro / paper) --- */
--bg-page:        var(--paper);
--bg-inverse:     var(--void);
--text-primary:   var(--ink);
--text-secondary: var(--graphite);
--text-tertiary:  var(--mist);
--border-hairline:var(--line-light);
--accent:         var(--signal);
--accent-pressed: var(--signal-dim);
--accent-wash:    var(--signal-soft);
--focus-ring:     var(--signal);

/* --- Aliases semánticos (contexto oscuro / void) --- */
--text-on-dark:           var(--paper);
--text-on-dark-secondary: var(--mist);
--border-on-dark:         var(--line-dark);

/* --- Veil sobre el video hero (contraste de texto) --- */
--hero-veil: linear-gradient(180deg, rgba(6,6,7,0.55) 0%, rgba(6,6,7,0.25) 38%, rgba(6,6,7,0.72) 100%);
```

---

## Typography

Display = **Space Grotesk** · Body/UI = **Inter** · Mono = **JetBrains Mono**
Display 3–6rem (lh 0.95–1) · micro-labels mono 10–11px uppercase tracking 0.2em · body 14–15px.

```css
/* --- Familias --- */
--font-display: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
--font-body:    "Inter", system-ui, -apple-system, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

/* --- Escala display (clamp, mobile-first) --- */
--fs-display-xl: clamp(3rem,   9vw,   6rem);
--fs-display-lg: clamp(2.5rem, 6.5vw, 4.5rem);
--fs-display-md: clamp(2rem,   4.5vw, 3.5rem);
--fs-display-sm: clamp(1.5rem, 3vw,   2.25rem);

/* --- Escala body: 17px lead · 15px default · 14px dense --- */
--fs-body-lg: 1.0625rem;
--fs-body:    0.9375rem;
--fs-body-sm: 0.875rem;

/* --- Mono / micro-labels --- */
--fs-mono-label: 0.6875rem;  /* 11px label */
--fs-mono-xs:    0.625rem;   /* 10px */
--fs-mono:       0.8125rem;  /* 13px inline */

/* --- Pesos --- */
--fw-regular: 400;
--fw-medium:  500;
--fw-semibold:600;
--fw-bold:    700;

/* --- Line heights --- */
--lh-display: 0.97;
--lh-tight:   1.1;
--lh-body:    1.6;

/* --- Tracking --- */
--tracking-label:   0.2em;
--tracking-wide:    0.08em;
--tracking-display: -0.02em;
```

---

## Spacing

Base **8px grid**. Mucho aire.

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4  */
--space-2: 0.5rem;   /* 8  — unidad base */
--space-3: 0.75rem;  /* 12 */
--space-4: 1rem;     /* 16 */
--space-5: 1.5rem;   /* 24 */
--space-6: 2rem;     /* 32 */
--space-8: 3rem;     /* 48 */
--space-10:4rem;     /* 64 */
--space-12:6rem;     /* 96 */
--space-16:8rem;     /* 128 */
--space-20:10rem;    /* 160 — ritmo de sección desktop */

/* --- Layout --- */
--gutter:    clamp(1.25rem, 5vw, 5rem);
--section-y: clamp(5rem, 12vw, 11rem);
--maxw:      1320px;   /* contenedor de contenido */
--maxw-prose:62ch;     /* medida de lectura */

/* --- Hairline + radios (técnicos, casi cuadrados) --- */
--hairline:   1px;
--radius-0:   0;
--radius-sm:  2px;
--radius-md:  4px;
--radius-pill:999px;
```

---

## Motion

Premium, meditativo, nunca abrupto. Easing global `cubic-bezier(0.16, 1, 0.3, 1)`.
Sin bounce de dibujito. Respetar `prefers-reduced-motion` (degradar a fades).

```css
/* --- Easing --- */
--ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out:     cubic-bezier(0.22, 1, 0.36, 1);
--ease-inout:   cubic-bezier(0.65, 0, 0.35, 1);

/* --- Durations --- */
--dur-fast:   0.18s;
--dur-base:   0.4s;
--dur-reveal: 0.9s;
--dur-slow:   1.2s;

/* --- Reveal --- */
--reveal-y:      40px;
--reveal-y-hero: 120px;
--stagger:       0.06s;

/* --- Marquee --- */
--marquee-dur: 38s;
```

---

## Componentes del sistema

| Componente     | Rol | Variantes / props clave |
|----------------|-----|--------------------------|
| `Button`       | Acción primaria. Pull **magnético** al cursor + panel **slide-fill** desde -101% en hover. | `variant`: primary / secondary / ghost / signal · `size`: sm/md/lg · `icon`: arrow / arrow-up-right / download · `magnetic` |
| `Badge`        | Chip de estado mono. Punto azure pulsante. | `dot` · `tone`: available (azure) / neutral (mist) · `onDark` |
| `Tag`          | Micro-chip mono cuadrado para stack tecnológico. | `onDark` |
| `SectionLabel` | Marcador editorial `[02] Nombre` con subrayado azure en el índice. | `index` · `onDark` |
| `NavBar`       | Header sticky con blur, links mono, badge + CTA, burger responsive. | `links` · `cta` · `onDark` |

### Primitivas CSS (clases `.ds-*`)

- `.ds-label` — micro-label mono uppercase tracked (eyebrows, índices, captions de métricas, scroll cue).
- `.ds-hairline` / `.pf-rule` — divisor técnico de 1px.
- `.ds-dot` — punto azure pulsante (keyframe `ds-pulse`).
- Focus visible: ring azure 2px (`:focus-visible`).
- `::selection`: fondo azure, texto paper.

---

## Sections identified (one-page, en orden)

| # | id            | Sección      | Contenido |
|---|---------------|--------------|-----------|
| — | `top`         | **Hero**     | Video ping-pong real (footage propio) + veil + grid + headline word-reveal "Arquitecturas que escalan. / Agentes que ejecutan." + 2 CTAs + scroll cue |
| 01| `manifiesto`  | **Manifiesto**| Frase display: "El sistema no es el código. Es la decisión de que escale…" |
| 02| `sobre`       | **Sobre**    | Retrato grayscale + bio + grid de 4 métricas con counters animados |
| 03| `capacidades` | **Capacidades**| Grid 2×2: IA & Agentes · Azure Cloud · Fullstack · Redes & Seguridad (+ tags) |
| 04| `proyectos`   | **Proyectos**| Cards con media 16:9, hover arrow azure, NutrisSys + Nutricionista Pamela Alvarado |
| 05| `arsenal`     | **Arsenal**  | Marquee infinito doble del stack tecnológico |
| 06| `trayectoria` | **Trayectoria**| Timeline (NutrisSys, PBS) + educación/certificaciones |
| 07| `referencias` | **Referencias**| Grid 3 columnas de quotes |
| 08| `contacto`    | **Contacto** | "Construyamos algo que escale." + email display + redes + badge disponible |
| — | —             | **Footer**   | Logo `</>`, copyright, callsign, volver-arriba |

> Ubicación del ingeniero: **Cartago, Costa Rica** (no San José).

---

## Hero — HeroScene · "Living System Graph" (canvas interactivo)

El fondo del hero **no es un video ni una imagen** — es una simulación en **Canvas 2D**
(`src/components/HeroScene.tsx`), sin asset externo, sin costo de descarga. Concepto:
**"Living System Graph"**, developer-leaning: un grafo de nodos (módulos/servicios) con física
propia donde el **cursor actúa como un agente** que recorre el sistema.

Comportamiento (frame a frame, un solo `requestAnimationFrame`):
- **Nodos**: ~28–72 según área, con resorte a su posición home + drift autónomo (el sistema
  "respira" sin cursor). Sesgo de densidad a la derecha (la izquierda lleva el texto).
- **Atracción al cursor**: los nodos dentro del radio de influencia (~230px) son atraídos hacia
  el puntero con fuerza ∝ cercanía²; vuelven a casa al alejarse. Cursor suavizado con inercia.
- **Tracers + paquetes**: se trazan líneas azure del cursor a los ~7 nodos más cercanos, y
  paquetes de datos viajan del cursor a cada nodo (loop temporal) — "tráfico" del sistema.
- **Constelación dinámica**: aristas nodo-nodo por proximidad (<150px), alpha por distancia;
  se tiñen de azure cuando algún extremo está activo.
- **Nodos**: en reposo = aro hueco monocromo (`--mist`); activos = relleno `--signal` + halo,
  laten con la cercanía. Azure SOLO cerca del cursor (regla del design system).

**Performance**: Canvas DPR-aware (cap 2×), un único rAF, se **pausa fuera de viewport**
(`IntersectionObserver`). Colores leídos de las CSS vars del DS (no hardcode).
**Degradación**: `pointer:coarse` (touch) → animación autónoma sin cursor; `prefers-reduced-motion`
→ un frame estático (nodos + constelación, sin azure, sin loop). Verificado con Playwright.

**Scroll-parallax** (preexistente, en `Hero.tsx`): el `<HeroScene/>` vive dentro de `.pf-hero__bg`,
que sigue con su `useScroll`/`useTransform` de Motion (translateY 0→12%, scale 1→1.08). El
mouse-tracking del canvas usa `getBoundingClientRect`, así que compone sin conflicto con ese transform.

> Reemplaza al video ping-pong anterior (decisión explícita del usuario: "reemplazar el video
> por imagen + animación CSS/JS"). El brief original (`F.R.A.M.E.`) describía una escena de
> infraestructura abstracta generada con IA (ChatGPT Images/Nano Banana Pro + Seedance/Higgsfield)
> con estética de redes — se usó solo como contexto de tono visual (monocromo + señal azure
> única), no como spec a replicar; el ángulo final es **developer**, no networking.

## Otros assets

| Asset | Origen | Salida web |
|-------|--------|------------|
| Retrato | Foto real (619×989) | `public/images/portrait.{webp 22KB, avif 5KB}` |
| Captura NutrisSys | `nutrissys.com.png` (1902×909) → escalado a 1200px ancho | `public/images/proj-nutrissys.{webp 41KB, avif 36KB}` |
| Captura Pamela Alvarado | `nutricionistapamelaalvarado.png` (1902×909) → escalado a 1200px ancho | `public/images/proj-pamela-alvarado.{webp 36KB, avif 32KB}` |
| `og:image` | Card OG dedicada 1200×630: void bg + logo-mark-light centrado | `public/images/og-card.webp` (3KB) |
| Logo `<JR>` | Master en `_source/logo-mark-master.png` (1024×1024 RGBA) — variante clara (negate RGB, alpha intacto) para navbar/footer sobre fondo oscuro, variante oscura por si se necesita contexto claro | `public/images/logo-mark-{light,dark}.webp` (256×256, ~3.5KB c/u) |
| Favicon | Derivado del mismo master | `public/favicon-{32,192}.png` + `public/apple-touch-icon.png` (180×180) |

> El video ping-pong (`hero-pingpong*`), su poster, y los frames `hero-a`/`hero-b` del bundle
> original de Claude Design fueron eliminados — sin uso tras este cambio.

---

## Auditoría landing-motion (2026-06-20)

Auditoría completa contra el checklist de la skill. Hallazgos reales y su fix:

| Hallazgo | Severidad | Fix |
|---|---|---|
| Contraste: `--graphite` (#56565C) usado como texto sobre `--void` = **2.78:1**, bajo el mínimo WCAG AA (4.5:1) — y bajo el piso de texto grande (3:1) | 🔴 Alto | Todo uso de `--graphite` como color de texto sobre fondo oscuro → `--mist` (7.24:1). 13 sitios: Capacidades, Contacto, Footer, Proyectos, Referencias, Sobre, Trayectoria, `.ds-label` (Sobre data labels sin override), `.pf-scrollcue`, headline `.dim`, manifiesto `.dim`, marquee `.item`. `--graphite` es el token de texto secundario para contexto **claro** — este sitio es 100% oscuro, nunca debió usarse directo. |
| Breakpoints con `max-width` (desktop-first) — la skill exige `min-width` siempre | 🔴 Alto | Invertidos los 3 bloques (nav 860px, cap-grid/quotes 860px, sobre/data/tray 760px): la base de cada componente pasó a ser el layout **mobile** (1 columna / nav con burger), y `@media (min-width: …)` agrega la complejidad de desktop. Cero cambio visual (verificado con Playwright en 375px y 1440px). |
| Falta `max-width: 100vw` en `html` (guard anti scroll-horizontal) | 🟡 Medio | Agregado en `html` y `body` junto al `overflow-x: hidden` ya existente. |
| Touch targets < 44×44px en elementos mobile-reales: burger, logo navbar, links del menú mobile, "volver arriba", LinkedIn/GitHub de Contacto | 🟡 Medio | Burger → 44×44 explícito. Logo navbar → padding 8px + margin -8px (visual 28px intacto, hit area 44×44). Links mobile-menu → `min-height:44px`. `.pf-totop` y `.pf-contact-link` → `min-height:44px`. `Button size="sm"` quedó exento: solo vive en `.ds-nav__right`, oculto en mobile. |
| `og:image` reusaba `portrait.webp` (619×989, vertical) — la skill pide una card dedicada 1200×630 | 🟡 Medio | Generada `og-card.webp`: void bg + logo centrado, 3KB. |
| Sin favicon | 🟡 Medio | Generado set completo desde el logo `<JR>` real. |
| `<div className="ph">Screenshot</div>` en Proyectos — placeholder muerto (la imagen, ahora siempre opaca, lo cubre 100%; su CSS coloreaba texto con `--graphite`, doblemente irrelevante) | 🟢 Bajo | Eliminado markup + CSS. |
| Hero sin imagen/video (es Canvas) → preload/picture/fetchpriority no aplican | ✅ N/A | El checklist de imagen/video de la skill no aplica al hero actual; ya no hay LCP-asset pesado, el LCP es texto. |
| Motion (`motion`, no `framer-motion`), `Reveal`/`RevealStagger`, `clamp()` en tipografía, `:focus-visible`, alt descriptivo, scrim sobre el hero | ✅ Cumple | Sin cambios necesarios. |

**No verificado** (requiere herramienta fuera de este entorno): Lighthouse/Core Web Vitals real contra un build de producción — recomendado correr `npm run build && npx serve dist` + Lighthouse en Chrome DevTools antes del deploy final.
