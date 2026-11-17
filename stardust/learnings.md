# Learnings

- 2026-11-17 · replica/rollout · A delivery authored straight from the gated prototype (DA content PUT before migrate/inventory ran) leaves gate-all, verify and done-check with no roster: back-fill with `migrate.mjs render` (archetype + `--archetype/--source` sibling) and `inventory.mjs` WITHOUT `--state` when every page is in the migrated tree (`--state` is archetypes-only mode and adds a duplicate content-pending row when the state URL's trailing slash differs).
- 2026-11-17 · replica/gate · chrome-parity's default roots take the first `<header>`/`<footer>`; on sources with `<footer>` inside article teasers that pairs a teaser date line with the site footer (13 false deltas). Pass `--no-defaults --region header=<source banner>|<build sel> --region footer=#<source footer id>|footer`.
- 2026-11-17 · replica/header · chrome-compare never pairs two controls whose accessible name is empty (`menu` is not a pairing family): a nameless source toggle reproduced faithfully stays a `control-missing` error that only an owner decision clears.
- 2026-11-17 · dynamics · dynamics-detect on a meta-refresh root fails with "Execution context was destroyed"; probe the page it lands on.
