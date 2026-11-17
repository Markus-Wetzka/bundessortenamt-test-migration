<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-17T14:33:00.835Z · input stardust/current/_dynamics.json (1 pages, 5 findings) · target probe https://main--4f3d7fd3--aemcoder.aem.page -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | cr-client-rendered-slot-bsa-stage-js-bsa-stage-bsa-stage-ini | CR | client-rendered slot bsa-stage js-bsa-stage bsa-stage--initialised | 1/1 | static-snapshot | content | self | pending | settled-dom-snapshot | inspect the consumer |  |
| 2 | i18n-locale-variants-de-de-en-us-x-default | I18N | locale variants de-DE,en-US,x-default | 1/1 | rebuild-native | runtime | needs-business-decision | pending | locale-tree | scope of the locale trees |  |
| 3 | l-listing-candidate-news-4-cards | L | listing candidate news (4 cards) | 1/1 | index-backed | block | needs-business-decision | pending | listing-index-backed | index-driven or editorially curated? |  |
| 4 | s-site-search-form-bsa-suche | S | site search form → /bsa/suche | 1/1 | index-backed | widget | self | pending | search-index-backed | none (corpus = the migrated pages; second corpora stay out) |  |
| 5 | x-sign-in-account-links | X | sign-in / account links | 1/1 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 2 row(s) — settled-dom-snapshot, search-index-backed.
- **One owner decision batch:** 2 row(s) — scope of the locale trees · index-driven or editorially curated?.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 0 of 0 probed API paths — the off-origin data work.
- **Martech:** no CMP · 0/0 route(s) enabled by the owner — `stardust/martech-handoff.md`.

## Phases

- **capture** — 1
- **locale wave** — 1
- **listings** — 1
- **search** — 1
- **register** — 1
