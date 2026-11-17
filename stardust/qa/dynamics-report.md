# Dynamics parity check — https://main--4f3d7fd3--aemcoder.aem.live — 2026-11-17T14:40:25.727Z

Replayed 7 checks over 8 features · pass 7 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| home stage tabs (3 panels) | CR | done | dom-count | PASS | 3 × .stage [role=tab] (min 3) |  |
| home stage tabs (3 panels) | CR | done | dom-count | PASS | 3 × .stage [role=tabpanel] (min 3) |  |
| header main navigation (dropdowns, mobile drawer) | M | done | dom-count | PASS | 12 × header .bsa-main-navigation-item (min 6) |  |
| header search form → source /bsa/suche | S | done | dom-count | PASS | 1 × form[action*='bundessortenamt.de/bsa/suche'] input.bsa-searchbox-input (min 1) |  |
| news listing (4 teasers) | L | done | dom-count | PASS | 4 × .news-teaser a (min 4) |  |
| no uncaught exceptions | X | done | no-page-errors | PASS | none on 2 page(s) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (0 gated · 0 cross-site host(s) blocked) |  |

## Features without checks

- English variant /bsa/en/ (I18N) — decided-out
- sign-in links (detector noise) (X) — decided-out
