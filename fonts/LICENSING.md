# Font licensing — ACTION REQUIRED (register R-01)

The site self-hosts the source site's own webfonts for design fidelity. They are
**licensed German federal corporate-design faces** (Corporate Design der Bundesregierung),
not open-source fonts. The site owner must confirm that the existing licence covers
web embedding on the new delivery domains (`*.aem.page`, `*.aem.live`, production host).

| File | Family | Weight / style | Origin | Status |
|---|---|---|---|---|
| `BundesSansWeb-Regular.woff` | BundesSansWeb | 400 normal | bundessortenamt.de | owner to confirm |
| `BundesSansWeb-Italic.woff` | BundesSansWeb | 400 italic | bundessortenamt.de | owner to confirm |
| `BundesSansWeb-Bold.woff` | BundesSansWeb | 700 normal | bundessortenamt.de | owner to confirm |
| `BundesSansWeb-BoldItalic.woff` | BundesSansWeb | 700 italic | bundessortenamt.de | owner to confirm |
| `BundesSerifWeb-Regular.woff` | BundesSerifWeb | 400 normal | bundessortenamt.de | owner to confirm |

Declared in `styles/fonts.css`; stacks in `styles/styles.css`
(`--bsa-sans: BundesSansWeb, Helvetica, Arial, sans-serif`,
`--bsa-serif: BundesSerifWeb, Georgia, "Times New Roman", serif`).

## Remove path

If the licence cannot be confirmed: delete the five `.woff` files and the `@font-face`
rules in `styles/fonts.css`. The stacks then fall back to Helvetica/Arial and
Georgia/Times New Roman with no further code change.
