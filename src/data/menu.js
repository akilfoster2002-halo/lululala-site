/**
 * Lululala — the menu.
 *
 * SOURCE OF TRUTH: the hand-lettered chalkboard inside 139 Hester St.
 * Transcribed 2026-10-25. Every item and every price below is on that board.
 * Nothing here is inferred, rounded, or filled in from a review.
 *
 * ── How to edit ───────────────────────────────────────────────────────────
 * Change this file, then run `npm run build`. Both pages regenerate.
 *
 * An item's price is one of:
 *   { flat: 9 }                 → shown as "$9"
 *   { small: 7, large: 10 }     → shown as "Small $7 / Large $10"
 *   null                        → NO price is rendered anywhere on the site.
 *
 * `null` is the correct value for anything you have not personally confirmed.
 * Never type a plausible number to fill the gap.
 *
 * `note` is a short factual clarification, not marketing copy. Leave it out
 * unless the board or the counter actually says it.
 */

export const menu = [
  {
    id: 'rice-bowls',
    name: 'Rice Bowls',
    // Lettered on the board as "Rice Bowl with LOVE".
    boardTitle: 'Rice Bowl with LOVE',
    blurb: 'The house specialty. Choose a size — small or large.',
    items: [
      {
        id: 'beef-rice-bowl',
        name: 'Beef',
        price: { small: 8, large: 12 },
      },
      {
        id: 'pork-rice-bowl',
        name: 'Pork',
        price: { small: 7, large: 10 },
      },
      {
        id: 'chicken-rice-bowl',
        name: 'Chicken',
        price: { small: 7, large: 10 },
      },
      {
        id: 'fried-chicken-rice-bowl',
        name: 'Fried Chicken',
        price: { small: 7, large: 10 },
        // The single most-mentioned dish across Google and Yelp reviews.
        signature: true,
      },
      {
        id: 'fried-tofu-rice-bowl',
        name: 'Fried Tofu',
        price: { small: 7, large: 10 },
      },
    ],
    // Rendered under the category, verbatim from the board.
    addOns: [
      { id: 'extra-protein', name: 'Extra', price: { flat: 3 } },
      { id: 'extra-rice', name: 'Rice', price: { flat: 2 } },
    ],
  },

  {
    id: 'kimbap',
    name: 'Kimbap',
    boardTitle: 'Kimbap',
    blurb: 'Six fillings, one price.',
    // The board prints "Kimbap $9" once, above the list of fillings.
    sharedPrice: { flat: 9 },
    items: [
      { id: 'veggie-kimbap', name: 'Veggie', price: { flat: 9 } },
      { id: 'beef-kimbap', name: 'Beef', price: { flat: 9 } },
      { id: 'pork-kimbap', name: 'Pork', price: { flat: 9 } },
      { id: 'chicken-kimbap', name: 'Chicken', price: { flat: 9 } },
      { id: 'cheese-kimbap', name: 'Cheese', price: { flat: 9 } },
      {
        id: 'squid-kimbap',
        name: 'Squid',
        price: { flat: 9 },
        // Marked "NEW" on the board.
        isNew: true,
      },
    ],
  },

  {
    id: 'hot-plates',
    name: 'Hot Plates',
    boardTitle: 'Fishcake & Tteokbokki',
    blurb: 'Both come small or large.',
    items: [
      {
        id: 'fishcake',
        name: 'Fishcake',
        price: { small: 5, large: 10 },
      },
      {
        id: 'tteokbokki',
        name: 'Tteokbokki',
        // The board spells it "Treokbbokki" and glosses it "(Rice Cake)".
        note: 'Rice cake',
        price: { small: 5, large: 10 },
      },
    ],
  },

  {
    id: 'sandwiches',
    name: 'Sandwiches',
    boardTitle: 'New',
    blurb: null,
    items: [
      {
        id: 'fried-chicken-burger',
        name: 'Fried Chicken Burger',
        price: { flat: 8 },
        isNew: true,
      },
    ],
  },

  {
    id: 'banchan',
    name: 'Banchan',
    boardTitle: 'Homemade Banchan',
    blurb: 'Made in house. The board lists four and adds “and more”.',
    // ── UNVERIFIED ──────────────────────────────────────────────────────
    // The chalkboard names these four but prints no prices beside them.
    // Prices stay null until someone confirms them in person or by phone.
    // See VERIFICATION.md.
    items: [
      { id: 'kimchi', name: 'Kimchi', price: null },
      { id: 'cucumber-banchan', name: 'Cucumber', price: null },
      { id: 'macaroni-banchan', name: 'Macaroni', price: null },
      { id: 'fishcake-banchan', name: 'Fishcake', price: null },
    ],
    // Printed on the board as "and more".
    footnote: 'And more — ask at the counter for the day’s selection.',
  },
];

/** Flat list of every item, each tagged with its category. */
export const allItems = menu.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryName: category.name,
  }))
);

/** "$9" · "Small $7 / Large $10" · null when the price is unconfirmed. */
export function formatPrice(price) {
  if (!price) return null;
  if (typeof price.flat === 'number') return `$${price.flat}`;
  const parts = [];
  if (typeof price.small === 'number') parts.push(`Small $${price.small}`);
  if (typeof price.large === 'number') parts.push(`Large $${price.large}`);
  return parts.length ? parts.join(' / ') : null;
}

/** Compact form for tight layouts: "$9" · "$7 / $10". */
export function formatPriceShort(price) {
  if (!price) return null;
  if (typeof price.flat === 'number') return `$${price.flat}`;
  const parts = [];
  if (typeof price.small === 'number') parts.push(`$${price.small}`);
  if (typeof price.large === 'number') parts.push(`$${price.large}`);
  return parts.length ? parts.join(' / ') : null;
}
