<!-- stardust provenance: skill=stardust:replica (dynamics Phases 1–3, hands-off curation) · 2026-11-17 · from stardust/dynamics/dynamic-features.generated-plan.md -->
# Dynamic features — Bundessortenamt (2 pages, one landing template)

| # | id | class | feature | pages | disposition | target | reproducibility | status | notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | hero-stage | CR | home hero slider (`.bsa-stage`, JS-initialised) + three teaser panels | index, bsa | rebuild-native | block (hero stage) | self | planned | behaviour from motion-observe only (implement what fires) |
| 2 | locale-en | I18N | English variant `/bsa/en/` | index, bsa | decided-out (scope) | link to source | self | decided | run scope is fixed to 2 pages; the "English" meta link points to the source origin |
| 3 | news-teasers | L | news listing (4 teasers) | index, bsa | static-snapshot (editorially curated) | block (news teaser) | self | planned | articles are out of scope; teaser content captured verbatim, links to the source articles |
| 4 | site-search | S | search form → `/bsa/suche` | index, bsa | link-to-source (GET to the source search) | widget-free form in header | self | planned | a 2-page query index would be an empty corpus; the source search keeps working |
| 5 | sign-in | X | sign-in / account links | — | decided-out | — | needs-backend | decided | detector noise: no sign-in on the captured pages |
| 6 | chrome-menu | M | header main navigation (hover/click dropdowns, mobile drawer) | index, bsa | rebuild-native | header block | self | planned | the header contract (`stardust/chrome/header-contract.json`) is the spec |
| 7 | chrome-search | S | header search field | index, bsa | link-to-source | header | self | planned | same as row 4 |
| 8 | martech | T | analytics / tags / consent | — | carried (none on source) | scripts/martech.js | self | planned | source loads no CMP or tag manager; contract empty, every part disabled |

_Re-verified 2026-11-17 (rollout B2) against fresh evidence: `dynamics-detect.mjs --urls https://www.bundessortenamt.de/bsa/ --target-origin https://main--4f3d7fd3--aemcoder.aem.page --migrated stardust/migrated` → 5 findings (stage slot, locale variants, news listing, site search, sign-in noise), 0 third-party hosts, 0 first-party API paths — every one already a row above; no new row, no disposition change. The root URL is a meta-refresh stub to /bsa/ and is probed through it._
