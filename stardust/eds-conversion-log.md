# EDS conversion log — Bundessortenamt

## Decisions (2026-11-17)

- **Publish: yes (decided by the run owner).** Every delivered page (`/` and `/bsa/`), the redirects sheet and the chrome documents (nav, footer and any locale variants) go live on the aem.live origin — `deploy-batch.mjs` without `--no-publish`, or `POST https://admin.hlx.page/live/…`.
- Scope fixed to 2 pages (`stardust/.labs/site-plan.json`): `index` (`/`, source meta-refresh stub → `/bsa/`, same content) and `bsa` (`/bsa/`, archetype of the single `landing` template).
- Links to pages outside the 2-page scope point to the source origin (`https://www.bundessortenamt.de/bsa/…`); search posts to the source search.
- Martech: source has no CMP or tags; `scripts/martech.js` ships with an empty, fully disabled contract.
- Fonts: source BundesSans/BundesSerif self-hosted with a licensing alert (register R-01, deferred to the owner).

## C0 foundation (2026-11-17)

- styles/styles.css + styles/fonts.css from canon.css (mobile-first; page frame on body/body::before; shell cap on `main > .section > div`, 1000px/20px). Fonts self-hosted under /fonts (licensing alert: fonts/LICENSING.md, R-01). Classes are kebab-case for Stylelint (`bsa-icon--hand` → `bsa-icon-hand`, `__`/`--` → `-`).
- header / footer: template-slotted chrome from DA `/nav` (meta list, logo, search link, nested main list, mobile extra list — classified by content) and `/footer` (© line, link list, LinkedIn image). Both previewed + published (200).
- Local check (aem up, preview nav/footer): header 208/175/131px at 1440/768/360 = prototype; header crop 99.99% / 100%; footer 66/159px = prototype; 0 JS errors.

## C-archetype — landing (bsa, index) (2026-11-17)

- Blocks: `stage` (template-slotted tabs: label / image / link per row, classified by content; desktop >= 720px tabs right, mobile h3 labels stacked above their panels — source behaviour), `news-teaser` (reconstructive: one card per heading, date `dd.mm.yyyy` / pre-heading category / image / only-link paragraph = card link, EW6 unwrap; card `title` = headline as on the source), `shortcuts` (logo + visually hidden heading labelling the `<nav>` + link list inside an `<aside>`; davids-model D1 🟡 kept: it is a landmark component with a logo slot, not prose).
- Sections: 1 stage (h1 "Bundessortenamt" + h2 "Top Meldungen" as visually hidden default content — the header carries no h1), 2 style `bsa-content` (teasers + archive link; = source `main#bsa-content.bsa-content`), 3 style `bsa-marginal` (sidebar; = source `aside.bsa-marginal`). The two columns float 66.1017% / 32.2034% of the 960px shell (CSS in the news-teaser / shortcuts block files). Gate scope: `--main .bsa-content` matches the news column on both sides.
- Content: DA `bsa/index` (→ /bsa/) and `index` (→ /), identical; out-of-scope links absolute to https://www.bundessortenamt.de/bsa/…; 8 images in DA `media/bsa/`. PUT → preview → live via deploy-batch (ledger stardust/deploy/ledger-landing.json).
- Local check (aem up on preview content, local code): every landmark rect equal to the prototype at 1440 and 360 (docH 1898 / 3009). block-roundtrip --ew: 31/31 editable, 0 🔴; lint clean.
- Header (pre-freeze foundation edit): the header block now adopts a visually hidden page `h1` into `.bsa-logo` (source parity — the source's h1 lives in the logo). Content-diff [header] nothing-lost 🟡 1 → 0 (MISSING SR-ONLY "Bundessortenamt"); provisional live-vs-local content-diff `--main .bsa-content`: 0 🔴 / 0 nothing-lost 🟡 at 1440 and 360.

## Open owner decision (2026-11-17)

- **Header contract, `control-missing@390 menu`.** The source's mobile menu toggle has no accessible name; the rebuilt header reproduces it exactly (same position 285,60 85×42, same 14 open states and panel links). The header comparer pairs controls by name and cannot pair two empty names, so the finding stays open until the site owner records a decision in `stardust/chrome/header-decisions.json` (`{ "decisions": [{ "finding": "control-missing@390 menu", "decision": "accept", "reason": "…", "by": "<owner>", "at": "<iso>" }] }`) — or chooses to give the button a name (e.g. "Menü") on both sites. Agent-signed entries are ignored by design.
- Delivery records: coverage row `bsa` carries its served path `/bsa/` (the folder-index document `/bsa/index`; `/bsa` without the slash is not a page on EDS).
