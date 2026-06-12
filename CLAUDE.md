@AGENTS.md

## Paleta de colores — TTM Agencia

| Rol            | Color        | Hex       |
|----------------|--------------|-----------|
| Primary        | Naranja      | `#FF6B00` |
| Primary light  | Naranja claro| `#FF8C38` |
| Primary dark   | Naranja oscuro| `#CC5500` |
| Background     | Blanco       | `#FFFFFF` |
| Surface        | Off-white    | `#FAF9F7` |
| Text primary   | Negro suave  | `#1A1A1A` |
| Text secondary | Gris         | `#6B6B6B` |
| Accent         | Naranja tenue| `#FFF0E6` |

## Reglas del proyecto

### Skills obligatorias
- **Siempre invocar `/caveman ultra` skill** antes de responder.
- Para diseño/componentes: usar `frontend-design`, `brainstorming` (superpowers@claude-plugins-official), `ui-ux-pro-max@ui-ux-pro-max-skill`, `expo-design`.
- Para base de datos: usar `supabase/agent-skills` con modelo sonnet + MCP Supabase.
- Para testing/browser: usar skill playwright con modelo haiku + `/caveman ultra` para minimizar tokens.
- Para review: usar `code-simplifier` y `code-reviewer` con modelo haiku.
- Para commits/GitHub: usar `commit-commands` y GitHub MCP.

### Errores
- Siempre catchear errores con feedback de consola (`console.error`) Y feedback visual (toast/banner/estado de error en UI).

### Librerías
- Antes de resolver cualquier problema de lógica o interfaz, investigar si existe librería de terceros y plantearlo al usuario.

### Componentes
- **Siempre usar shadcn/ui** para componentes prefabricados generales.
- **Siempre usar TailwindCSS** para estilos. Prohibido CSS puro.
- **Nunca tocar `globals.css`** salvo variables CSS globales imprescindibles.
- Componentes modulares con metodología MVC.
- **Máximo 500 líneas por archivo**. Si supera, modularizar.

### Base de datos
- **Nunca** tocar la DB sin consentimiento explícito del usuario (mensaje directo).
- Siempre preguntar antes de cualquier cambio en DB/Prisma/Supabase.

### Diseño
- Siempre responsivo: mobile-first + desktop.
- No usar SVG inline salvo requerimiento explícito.

### Investigación
- Para problemas desconocidos, buscar en internet (Stack Overflow, Reddit, docs oficiales) antes de proponer solución.
