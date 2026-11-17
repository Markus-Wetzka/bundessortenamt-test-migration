# Inconsistency register — Bundessortenamt

No design deltas: the recreation is a pure replica. One handover entry (no visual change).

## R-01 — Proprietary federal typefaces self-hosted on the new origin

- **Evidence:** `stardust/current/assets/css/critical.css` @font-face BundesSansWeb Regular/Bold/Italic/BoldItalic, BundesSerifWeb Regular; files captured to `stardust/current/assets/fonts/*.woff`.
- **Finding:** BundesSans/BundesSerif are licensed German federal corporate-design faces; the licence covers federal bodies' web presences. Rehosting on the EDS origin needs the owner's confirmation that the licence covers it.
- **Minimal change:** none to the design — faces shipped as-is from `/fonts/`; stacks keep the brand family first with Liberation Sans/Arimo fallback; if the owner withdraws, delete the @font-face rules (fallback takes over).
- **Status:** deferred
- **Where:** all page types, all text.
