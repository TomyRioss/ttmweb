# SPEC — TTM Agencia Landing Page

## §G Goal

Landing page for TTM Agencia (Web Dev + Automation agency). Single scrollable page, 5 sections, mobile-first, orange brand identity.

## §C Constraints

- Stack: Next.js 16, React 19, TailwindCSS 4, TypeScript
- No CSS puro — solo Tailwind
- No SVG inline salvo requerimiento explícito
- shadcn/ui para componentes prefabricados
- Max 500 líneas por archivo → modularizar si supera
- No tocar globals.css salvo variables CSS globales imprescindibles
- Paleta fija (ver §I.colors)
- Responsive: mobile-first + desktop
- Existing page.tsx tiene hero con hamburger menu — reemplazar/extender

## §I Interfaces

### I.colors — brand palette
```
primary:       #FF6B00
primary-light: #FF8C38
primary-dark:  #CC5500
bg:            #FFFFFF
surface:       #FAF9F7
text-primary:  #1A1A1A
text-secondary:#6B6B6B
accent:        #FFF0E6
```

### I.sections — page sections (in order)
1. Hero (existing, adapt)
2. VISIÓN Y MISIÓN
3. SERVICIOS
4. PROYECTOS
5. RESULTADOS
6. CONTACTO

### I.nav — navigation
- Top navbar links → scroll to section anchor
- Mobile: hamburger overlay (existing pattern)

### I.files — output files
```
app/page.tsx                     — root, composes sections
app/components/Navbar.tsx        — top nav + hamburger
app/components/VisionMision.tsx  — §2
app/components/Servicios.tsx     — §3
app/components/Proyectos.tsx     — §4
app/components/Resultados.tsx    — §5
app/components/Contacto.tsx      — §6
```

## §V Invariants

V1 — Every section has `id` anchor matching nav link href.
V2 — No inline SVG unless user explicitly requests.
V3 — All styles via Tailwind classes; zero `style={{}}` except dynamic values (transitions, clamp).
V4 — Each component file ≤ 500 lines.
V5 — Contact form: console.error on submit error AND visual error state in UI.
V6 — All images use next/image with explicit width+height or fill+sizes.
V7 — shadcn/ui Button used for all CTA buttons.

## §T Tasks

| id | status | task | cites |
|----|--------|------|-------|
| T1 | x | install shadcn/ui + configure with brand colors | I.colors |
| T2 | x | create Navbar with scroll-to-section + mobile hamburger | V1,I.nav |
| T3 | x | build VisionMision section | V1,V2,V3,V4 |
| T4 | x | build Servicios section (cards: web dev, automatizaciones, etc.) | V1,V2,V3,V4,V7 |
| T5 | x | build Proyectos section (project cards/grid) | V1,V2,V3,V4,V6 |
| T6 | x | build Resultados section (metrics/stats) | V1,V2,V3,V4 |
| T7 | x | build Contacto section (form with validation + error handling) | V1,V3,V4,V5,V7 |
| T8 | x | wire page.tsx — compose all sections, update nav links | V1,I.files |

## §B Bugs

| id | date | cause | fix |
|----|------|-------|-----|
