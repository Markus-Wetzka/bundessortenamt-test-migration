# Journal — Bundessortenamt replica

## Extract — two plan pages captured, one distinct template (2026-11-17)

- `extract --prep --dynamics --pages https://bundessortenamt.de/,https://bundessortenamt.de/bsa/` via `crawl.mjs` (real Chrome headless, no bot wall).
- `https://bundessortenamt.de/` is a 0-second meta-refresh stub to `https://www.bundessortenamt.de/bsa/`; the crawler adopted the www origin.
  Slug `index` (= `/`) captured with finalUrl `/bsa/` and flagged `duplicateOf: bsa`. The literal non-www `/bsa/` answers 404 (crawl failure `bsa-bfb7`, expected — www is canonical).
- Provenance 2/2 live. Page types: landing 2 (one template; archetype = `bsa`).
- Vision check: bsa ok (header, hero slider with three brown teaser panels, four news teasers, sidebar, footer).
- Brand surface: BSA green #436213, text #222, panels #614f3c, top rule #b94800; BundesSansWeb/BundesSerifWeb (licensed federal fonts — evidence only).
- Cap model: shell 1000px (.bsa-container), content 635px (#bsa-content).
- Dynamics: no third-party scripts, no analytics/consent manager; one search form.
- Capture gap: 64 first-level targets under /bsa uncaptured — out of the fixed 2-page scope (scope debt).
- Header contract recorded: 1440 — 13 controls (6 hover/click menus, search, 6 links), 24 states; 390 — 1 menu (drawer), 14 states, depth 2.

## Preserve direction — verbatim promotion, empty register, dynamics triaged (2026-11-17)

- current/PRODUCT.md, DESIGN.md, DESIGN.json promoted verbatim to the project root; `stardust/direction.md` records preserve mode.
- Inconsistency register empty — pure replica. Licensed BundesSans/BundesSerif not rehosted: brand family first + size-adjusted local fallback (handover item).
- Dynamics: 8 rows curated in `stardust/dynamic-features.md` — hero stage + header menu rebuilt natively; news teasers static; search and English variant link to the source.
- Martech: spec-martech found no CMP or tag manager; `martech-contract.json` empty (all disabled), `scripts/martech.js` scaffolded.

## Recreate — home archetype re-authored from captured content + lifted CSS (2026-11-17)

- `stardust/prototypes/bsa-proposed.html` + `canon.css` (base, header, footer) + `bsa.css` (stage, teasers, sidebar) + `bsa.js` (stage tabs, nav).
- Values lifted from the source `full.css`; behaviour from the source `app.js` (stage: click/arrow-key tabs ≥720px, stacked accordion below; nav: mobile "Menü" toggle hides the nav element and defocuses the page).
- Fonts: the source's own BundesSans/BundesSerif woff files self-hosted (fonts policy; register R-01 deferred for the owner's licence confirmation).
- Search posts to the source search (`https://www.bundessortenamt.de/bsa/suche`), as triaged.

## Source-fidelity gate — bsa passes at 1440 and 360 in 3 rounds (2026-11-17)

- iter1: 6.35% / 8.19%, height +269 / +245 — a stray `.frame p` margin rule and the bracketed footer-nav classes of the source (`[bsa-footer__col …]`, never matched there).
- iter2: 0.15% / 0.47%, Δh 0 after lifting the global `p,ul{margin:.3em 0 .5em}`; chrome: skip-link colour, inline-block whitespace before the teaser category.
- iter3 (confirmation, --full): **0.06% / 0.26%, Δh 0**, content-diff 0 🔴 / 0 nothing-lost 🟡, visual-diff 0 flags, chrome-parity quiet, clipped 0, overflow ok; cap-probe PASS at 2560; motion-compare 3 parity / 0 missing / 0 extra.
- Prototype table rows written (`gates/prototypes-1440`, `-360`): 1 PASS each. Approved hands-off.

## Handoff — C0 foundation authored (2026-11-17, in progress)

- styles/fonts, header/footer blocks rebuilt from canon.css; /nav and /footer in DA, previewed + published (200/200). Local check: header 208/175/131 px at 1440/768/360 as the prototype, header crop 99.99%/100%, footer 66/159 px.
- Pending: push, published-origin shell gate (chrome-compare exit 0), foundation-freeze, then the archetype unit. Notes for page units: page content carries the h1; stage section must escape the 1000px section cap; class names kebab-case (bsa-icon-arrow-right).
- Shell gate on the preview 404 shell: chrome-compare exit 2 (15). abbr wrap for EU/OECD/PIAF fixed (8b99742). 12 crop deltas come from the transparent band above each dropdown showing the hero on the source — re-gate on the published /bsa/ page. 1 finding (nameless mobile menu button) is a comparer pairing limit; owner decision only. Freeze deferred until the re-gate.
- Archetype: blocks stage, news-teaser, shortcuts (block-roundtrip --ew 31/31); DA bsa/index and index previewed + published. Header now hoists the hidden h1 into the logo (content-diff header 🟡 cleared). Provisional local-code check: heights 1898/3009, content-diff 0/0. Published gate waits for the push.

## Rollout A-inventory — migrated tree and coverage for the 2 plan pages (2026-11-17)

- The earlier delivery authored DA content straight from the gated prototype; this session back-filled the record: `migrate.mjs render bsa` (branch A, archetype) and `render index --archetype index=bsa --source index=<bsa prototype>` (A′ sibling — the source root is a meta-refresh stub to /bsa/, identical content), modules stage/news-teaser/shortcuts, state advanced to migrated.
- `inventory.mjs` (full mode, not `--state`: both pages are in the migrated tree): 2 pages, 1 template (`bsa`: bsa, index). rollout.json site = aemcoder/4f3d7fd3@main, liveHost main--4f3d7fd3--aemcoder.aem.live.

## Rollout B-block — 3 distinct blocks, representative-first plan (2026-11-17)

- blocks.mjs: stage, news-teaser, shortcuts (6 instances → 3 conversions); plan.mjs: bsa converts, index reuses. All three blocks were already authored, round-tripped (`block-roundtrip --ew` 31/31) and pushed; recorded `deployed`.

## Rollout B2-dynamic — dynamic surface re-verified, no new rows (2026-11-17)

- dynamics-detect on /bsa/ (the root is a meta-refresh stub; probing it directly loses the execution context on navigation) + dynamics-plan --martech: 5 findings, all already curated in stardust/dynamic-features.md; 0 third-party hosts, 0 API paths. Martech contract stays empty, every part disabled.

## Rollout C-deliver — foundation frozen, both pages live and gated on aem.live (2026-11-17)

- Foundation (C0): published-origin gate on /bsa/ — pixel 0.20%/0.42% Δh0; chrome-parity quiet with explicit roots (`header.bsa-banner`, `#bsa-footer` — the default first-`<footer>` picks a news-teaser footer on the source) and one accepted backdrop delta (body #fff vs default canvas, same pixels); crop-compare header 99.99%/99.91%, footer 100%/100%. `foundation-freeze` 19 files.
- Header contract: chrome-compare 15 → 1. The remaining `control-missing@390 menu` is a nameless toggle on BOTH sides (same rect, same panel links); the comparer pairs by name and never pairs two empty names, and `menu` is not a pairing family. Clearing it needs a site-owner decision in stardust/chrome/header-decisions.json.
- archetype:landing — /bsa/ gate-all PASS (0.20%/0.42%, Δh0, clip 0, content 0/0), 0 fix rounds. cluster:landing — / PASS, same numbers. gate-all roster 2/2 PASS at both widths; coverage --gate written. gate-all reads `stardust/rollout/gate-roster.json` (deployed rows with their aem.live URLs) so state.json keeps its lifecycle untouched.

## Rollout D-site — sitemap served 2 = assembled 2, chrome noindex, / 200 (2026-11-17)

- /nav and /footer lacked `Robots | noindex`: the row was added inside each document's last section (no empty section reaches the decoders), re-PUT + previewed + published via deploy-batch (ledger stardust/deploy/ledger-chrome.json). The pipeline strips the table from .plain.html; header/footer chrome-parity re-checked on aem.live: quiet at 1440/360.
- Redirects: none. The source root answers 200 (a meta-refresh stub to /bsa/), so `/` is delivered as the root `index` document and no `/` row is written; no other redirect was captured in the 2-page scope, so no redirects sheet is needed.
- assemble.mjs: sitemap 2 urls; `--verify-origin` aem.live → served 2 = assembled 2 (nav/footer dropped out of the platform index after the noindex publish). `curl -sIL` preview root → 200.

## Rollout D2-dynamic — 7/7 parity checks pass on aem.live (2026-11-17)

- stardust/dynamics/parity.json from the curated rows: stage tabs (3 tabs/3 panels on / and /bsa/), header navigation (12 items), search form → source /bsa/suche, 4 news teasers, no page errors, plus the martech contract row (every part off; no tag host requested). Locale-en and sign-in are decided-out rows without checks. Report: stardust/qa/dynamics-report.md. No query index needed (search is link-to-source).

## Rollout E-full-site — 2/2 verified on aem.live (2026-11-17)

- verify.mjs --all on main--4f3d7fd3--aemcoder.aem.live: 2 checked, 2 verified, 0 failed; both rows carry the gate-all PASS from C-deliver. No `restoreAtDelivery` entries (no autoplay media or auto-advancing slides on the source); the headless render check is the gate-all stitch + clip/content probes.

## Rollout E2-link-audit — 66 hrefs audited, out-of-scope targets repointed to source (2026-11-17)

- localize-links: 0 rewrites needed (both in-scope targets already root-relative), `--check` exit 0. 66 distinct hrefs GET: 65 × 200, LinkedIn 403 (bot refusal, external). Decision recorded in stardust/direction.md § Link-audit decision.

## Rollout F-optimize — health 100, 0 open findings (2026-11-17)

- optimize.mjs on aem.live: 2 pages + site checks, P1/P2/P3 open 0. Source parity (informational, mirrored on purpose): no JSON-LD on either source page; / and /bsa/ share title and description on the source (the root is a stub of /bsa/).

## Rollout G-aem — no autofix candidates (2026-11-17)

- autofix-aem.mjs --dry-run: 0 candidates (no open findings), nothing applied; no re-deploy needed.

## Rollout H-report — summary and learnings written (2026-11-17)

- stardust/rollout/report.md (pages 2/2 live + verified, 1 template, 3 blocks, gate 2/2 PASS, health 100) and stardust/learnings.md (4 entries: back-filling the roster, chrome-parity roots, nameless-control pairing, meta-refresh probing).

## Rollout I-dashboard — dashboard built (2026-11-17)

- dashboard.mjs → stardust/rollout/dashboard/index.html + data.json: 2 pages identified, prototyped and deployed ("optimised" counts pages that needed optimize fixes: none did). stardust/ is in .hlxignore, so the dashboard is not served.

## Handoff — 2 pages delivered, published and gated; run complete (2026-11-17)

- Rollout A → I recorded this session on top of the earlier C0/archetype delivery: inventory 2 pages / 1 template, 3 blocks, B2 re-verified, C-deliver units foundation → archetype:landing → cluster:landing → gate-all → final all done (gate-all 2/2 PASS: 1440 0.20 %, 360 0.42 %, Δh 0), D-site sitemap 2 = 2 with chrome noindex, D2 7/7, E 2/2 verified, E2 66 hrefs audited, F health 100 / 0 open, G 0 candidates, H report + learnings, I dashboard.
- Runner done-check: complete, 0 gaps (after the bsa coverage row took its served path /bsa/). Header contract re-compared on aem.live: 1 open item awaiting an owner decision (stardust/eds-conversion-log.md § Open owner decision); not a delivery gap.
