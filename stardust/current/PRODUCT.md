<!-- stardust:provenance writtenBy=stardust:extract writtenAt=2026-11-17T13:35:00Z source=https://www.bundessortenamt.de/bsa/ pages=2 -->
# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
_provenance: inferred — from navigation and news copy._ Plant breeders, seed trade, agriculture and horticulture professionals, applicants for plant variety protection and variety listing, press, and the general public in Germany (German primary, English secondary).

## Product Purpose
Official website of the Bundessortenamt (Federal Plant Variety Office), a federal authority under the Federal Ministry of Agriculture, Food and Regional Identity (BMLEH). It publishes news and press releases, descriptive variety lists, application forms, variety databases and organisational information.

## Positioning
Authoritative public-sector information portal; German federal corporate design (Bundesadler logo, BundesSans/BundesSerif typography).

## Capabilities and Constraints
- TYPO3 CMS front end; static server-rendered pages, no third-party analytics or consent manager observed.
- Site search form (GET to the site's own search).
- Accessibility services linked from the header: Gebärdensprache (sign language), Leichte Sprache (easy language).

## Brand Commitments
- Register: `brand` (institutional; content-led landing with news). Note: borderline `product` — information service of a public authority.
- Personality: sober, factual, trustworthy, federal.
- Anti-references: commercial marketing gloss, decorative motion.

## Evidence on Hand
- `stardust/current/pages/bsa.json`, `pages/index.json` (+ `.html` rendered DOM)
- `stardust/current/assets/screenshots/bsa.png`, `index.png`
- `stardust/current/_computed-styles.json` (1440 + 360)
- `stardust/current/assets/css/critical.css`, `full.css`, `assets/fonts/*.woff` (licensed — evidence only), `assets/logo.svg`, `assets/favicon.png`

## Product Principles
_provenance: inferred._ Clarity over decoration; current information first (news teasers on home); quick paths to services (sidebar links: Studienangebote, Antragsformulare, Sorteninformationen, Genbank).

## Accessibility & Inclusion
Skip links, visually-hidden labels, sign-language and easy-language entries in the meta navigation.
