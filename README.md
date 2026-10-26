# Lululala

Website for **Lululala**, a Korean counter at 139 Hester St in Chinatown,
Manhattan. Two pages: a home page and the full menu.

- **Verified facts and open questions:** [VERIFICATION.md](VERIFICATION.md)
- **The menu lives in one file:** [`src/data/menu.js`](src/data/menu.js)

---

## Running it

Needs **Node 18 or newer**. No dependencies, no install step.

```bash
node build.js
```

That writes `dist/`. Open `dist/index.html` in a browser, or serve it:

```bash
node build.js && python3 -m http.server 5173 --directory dist
```

Then visit **http://localhost:5173/**. The menu is at `/menu.html`.

While editing, rebuild on every save:

```bash
node build.js --watch
```

`npm run build`, `npm run serve` and `npm run dev` wrap the same commands.

---

## Editing the menu

Everything is in [`src/data/menu.js`](src/data/menu.js). Edit it, run
`npm run build`, and both pages regenerate — the showcase on the home page, the
category tabs, the search index and the item counts all follow automatically.

A price is one of three shapes:

```js
price: { flat: 9 }              // "$9"
price: { small: 7, large: 10 }  // "Small $7 / Large $10"
price: null                     // no price is shown anywhere
```

**Use `null` for anything you have not personally confirmed.** The menu page
prints "Price at counter" instead of a number. Never type a plausible price to
fill a gap — that is the one rule this project is built around.

Restaurant facts — address, phone, hours, payment — are in
[`src/data/restaurant.js`](src/data/restaurant.js). They feed the home page,
the footer, the `tel:` links, the directions link and the schema.org data.

---

## Adding dish photography

The site currently has **no food photos** (see VERIFICATION.md §4). Adding them
is the single biggest improvement available. To do it:

1. Drop the files in `src/assets/images/`.
2. Add an `image` field to the item in `src/data/menu.js`:
   ```js
   { id: 'fried-chicken-rice-bowl', name: 'Fried Chicken',
     price: { small: 7, large: 10 }, signature: true,
     image: 'assets/images/fried-chicken-bowl.webp' }
   ```
3. In `src/templates/home.js`, the `dishCard` function renders
   `bowlArt()` — swap in an `<img>` when `item.image` is present.

Keep the lighting and crop consistent across shots; the design assumes one
visual treatment, not a mix. Use `loading="lazy"` on anything below the fold and
always set `width`/`height` so nothing shifts as images load.

---

## How it is put together

```
build.js              generates dist/ from src/ — Node built-ins only
src/
  data/
    menu.js           THE MENU. single source of truth
    restaurant.js     address, hours, phone, payment, rating
  templates/
    components.js     document shell, header, footer, schema.org, bowl SVG
    home.js           home page
    menu.js           menu page
  styles/
    tokens.css        colour, type scale, spacing, motion
    base.css          reset, buttons, header, footer
    home.css          home page only
    menu.css          menu page only
  scripts/
    reveal.js         scroll-reveal (progressive enhancement)
    menu-page.js      search + category tabs (progressive enhancement)
  assets/
    favicon.svg
    images/
dist/                 build output — do not edit, it is overwritten
```

Routes are `/` (`index.html`) and `/menu.html`. Both are plain static files and
can be opened directly.

### Design direction

Taken from the restaurant itself rather than a generic template: the black
awning and chalkboard, the hot-pink neon in the window, the chalk pastels the
menu is lettered in, the green subway tile at the counter, and the red 小饭盒
chop on the sign.

- **Pacifico** — the wordmark only, echoing the storefront script.
  This is a typographic wordmark, **not** the restaurant's actual logo. If you
  obtain the real mark, replace `.wordmark` in `base.css`.
- **Shantell Sans** — headings and chalk annotations; it carries the
  hand-lettered voice of the board.
- **DM Sans** — body text, navigation, prices.

### Behaviour

Both pages are fully rendered HTML and work with JavaScript disabled. JS only
adds the menu search, active-tab syncing and scroll reveals; without it the menu
is still complete and the category tabs are ordinary anchor links.

`prefers-reduced-motion` is respected throughout.

---

## Checked

- No horizontal overflow at 320, 375, 390, 430, 768, 1024 and 1440 px.
- Every text/background pair meets **WCAG AA** contrast on both pages
  (measured in-browser against computed styles, not estimated).
- One `<h1>` per page, ordered headings, alt text on every image.
- Visible keyboard focus; search clears on Escape.
- Search is case-insensitive and matches names and notes
  (`rice cake` finds Tteokbokki); it has an empty state and a clear button.
- All internal links, anchors and assets resolve. No console errors.

---

## Deploying

`dist/` is a static folder — any host will do.

**Netlify / Vercel / Cloudflare Pages:** build command `node build.js`, publish
directory `dist`.

**GitHub Pages or any web host:** run `node build.js` and upload the contents of
`dist/`.

Before going live, set `siteUrl` in `src/data/restaurant.js` to the real domain.
That turns on the canonical URL and the Open Graph tags, which are deliberately
omitted until a domain exists.
