# Verification log

What on this site is confirmed, where it came from, and what still needs a human
to check. Updated **25 October 2026**.

---

## Confirmed

### The menu

Transcribed from a high-resolution photograph of **the restaurant's own
chalkboard** at 139 Hester St. Every item and every price on the site is on that
board. Nothing was inferred, rounded, or taken from a review.

| Section | Items | Prices |
|---|---|---|
| Rice Bowls ("Rice Bowl with LOVE") | Beef · Pork · Chicken · Fried Chicken · Fried Tofu | Beef S $8 / L $12 · rest S $7 / L $10 |
| Add-ons | Extra, Rice | $3, $2 |
| Kimbap | Veggie · Beef · Pork · Chicken · Cheese · Squid *(NEW)* | $9 each |
| Hot plates | Fishcake · Tteokbokki | S $5 / L $10 each |
| Sandwiches | Fried Chicken Burger *(NEW)* | $8 |
| Banchan | Kimchi · Cucumber · Macaroni · Fishcake, "and more" | **not priced on the board** |

**18 items in total.** The board's own spelling is "Treokbbokki"; the site uses
the standard romanisation **Tteokbokki** and keeps the board's gloss,
"(Rice Cake)", as the item note.

### Business facts

| Fact | Value | Source |
|---|---|---|
| Address | 139 Hester St, New York, NY 10002 | Google Maps listing |
| Coordinates | 40.7171215, −73.9946815 | Google Maps listing |
| Phone | (347) 618-3003 | Google Maps **and** the chalkboard |
| Hours | 11:00 am – 7:00 pm, every day | Google Maps opening hours |
| Payment | Cash only | Reviews and in-store signage |
| Opened | 3 November 2024 | "OPEN NOV. 3 2024" on the chalkboard |
| Rating | 4.7 from 287 reviews | Google Maps |
| Tagline | "Finding happiness in little bowls" | Printed on the storefront awning |
| Korean name | 룰루랄라 | Chalkboard |
| Chinese name | 小饭盒 | Red chop on the storefront sign |

---

## Needs confirming

Each of these is currently handled by **omitting** the information rather than
guessing it. Nothing misleading is displayed.

### 1. Banchan prices — *the one real gap*

The board names four banchan but prints no prices. The site shows the four names
with **"Price at counter"** in place of a number, plus a note explaining why.

A Yelp listing shows "Cucumber Kimchi: $3 (Small)", but that is third-party and
undated, so it was **not** used.

**To fix:** call the shop, then in `src/data/menu.js` change
`price: null` to `price: { flat: 3 }` (or `{ small: 3, large: 6 }`) on each item
and run `npm run build`.

### 2. No verified website, social accounts, or online ordering

Google Maps shows no website for the business and offers "Add website". No
Instagram or TikTok account could be confirmed as belonging to the restaurant.
There is a `lululala.menufyy.com` address, but it serves a blank page and could
not be confirmed as theirs.

Accordingly the site links to **no** social profiles and **no** ordering
platform. The fields exist in `src/data/restaurant.js` (`website`,
`orderOnline`, `social.instagram`, `social.tiktok`) and are set to `null`.

### 3. Production domain not set

`restaurant.siteUrl` is `null`, so the canonical link and the Open Graph
`og:url` / `og:image` tags are **left out** rather than pointed at an invented
host. Set `siteUrl` once the domain is live and both appear automatically.

### 4. Dish photography — the biggest visual opportunity

There are **no photographs of the food** on this site. That is deliberate:

- No licensed photographs of Lululala's actual dishes were available.
- Using stock food photography would imply it shows their food, which the
  brief rules out and which would be dishonest.

Instead the food is presented through the chalkboard's own visual language —
hand-drawn bowls, chalk pastels, big prices. The site is designed to stand up on
typography and colour alone, and it does.

**If you can get real dish photos**, they will make a big site a great one.
See the README for exactly where to drop them.

### 5. Photograph provenance

The three photographs on the site — storefront, interior, counter — were
supplied by the client. Confirm you hold the rights to publish them before the
site goes live.

### 6. A chalkboard changes faster than a website

The board was photographed recently but prices on a chalkboard move. The menu
page says so and gives the phone number. Re-check before launch, and after any
visit where the board looks different.
