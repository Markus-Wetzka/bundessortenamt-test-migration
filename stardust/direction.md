---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-17T13:26:23Z
  againstInput: https://www.bundessortenamt.de/bsa/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://www.bundessortenamt.de/bsa/
(entered as https://bundessortenamt.de/, a meta-refresh stub), promoted verbatim (no direct invocation, no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-11-17T13:26:23Z). Provenance: verbatim --prep promotion.

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(1 entry — R-01 font licensing, deferred; otherwise pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Fonts: BundesSansWeb / BundesSerifWeb are the licensed German federal corporate-design faces. Per the
replica fonts policy (deploy § 4 principle 2) the source's own woff files are self-hosted as-is, brand
family first in every stack, Liberation Sans/Arimo as the Linux-available fallback; deploy raises the
licensing alert (fonts/LICENSING.md) and register entry R-01 records it for the owner.

## Link-audit decision (rollout E2, 2026-11-17)

Scope is fixed to the 2 plan pages (`/`, `/bsa/`). Every other internal target linked from the pages, /nav and /footer (55 distinct source paths — navigation sections, press, contact, imprint, privacy, accessibility, sitemap, search, the English variant /bsa/en/, articles behind the 4 news teasers) is SCOPE EXTENSION and stays an absolute link to https://www.bundessortenamt.de/… (repointed to the source, never a 404). Full list with statuses: stardust/rollout/link-audit.txt (65 × 200; 1 × 403 = linkedin.com refusing non-browser clients, external). `localize-links --check` exit 0: no in-scope link left absolute.
