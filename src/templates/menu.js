/** Menu page — generated entirely from src/data/menu.js. */

import { restaurant, addressOneLine } from '../data/restaurant.js';
import { menu, formatPrice } from '../data/menu.js';
import { layout, esc } from './components.js';

function badges(item) {
  const out = [];
  if (item.isNew) out.push('<span class="badge badge--new">New</span>');
  if (item.signature)
    out.push('<span class="badge badge--signature">Most ordered</span>');
  return out.join('');
}

function itemRow(item) {
  const price = formatPrice(item.price);

  // `data-search` is what the client-side filter matches against.
  const haystack = [item.name, item.note].filter(Boolean).join(' ').toLowerCase();

  return `<li class="menu-item" data-item data-search="${esc(haystack)}">
  <span class="menu-item__name">${esc(item.name)}${badges(item)}</span>
  <span class="menu-item__leader" aria-hidden="true"></span>
  ${
    price
      ? `<span class="menu-item__price">${esc(price)}</span>`
      : `<span class="menu-item__price menu-item__price--tbc">Price at counter</span>`
  }
  ${item.note ? `<span class="menu-item__note">${esc(item.note)}</span>` : ''}
</li>`;
}

function categorySection(category) {
  const extras = category.addOns?.length
    ? `<div class="menu-extras">
    <span class="menu-extras__label">Add on</span>
    ${category.addOns
      .map(
        (addOn) =>
          `<span>${esc(addOn.name)} <b>${esc(formatPrice(addOn.price))}</b></span>`
      )
      .join('\n    ')}
  </div>`
    : '';

  return `<section class="menu-cat" id="${esc(category.id)}" data-category aria-labelledby="${esc(category.id)}-title">
  <header class="menu-cat__head">
    <h2 class="menu-cat__name" id="${esc(category.id)}-title">${esc(category.name)}</h2>
    ${
      category.boardTitle && category.boardTitle !== category.name
        ? `<p class="menu-cat__board">on the board: “${esc(category.boardTitle)}”</p>`
        : ''
    }
  </header>

  ${category.blurb ? `<p class="menu-cat__blurb">${esc(category.blurb)}</p>` : ''}

  <ul class="menu-list">
    ${category.items.map(itemRow).join('\n    ')}
  </ul>

  ${extras}
  ${category.footnote ? `<p class="menu-footnote">${esc(category.footnote)}</p>` : ''}
</section>`;
}

function categoryTabs() {
  const all = `<a class="cat-tab" href="#all" data-tab data-target="all" aria-current="true">
    All
    <span class="cat-tab__count">${menu.reduce((n, c) => n + c.items.length, 0)}</span>
  </a>`;

  const rest = menu
    .map(
      (category) => `<a class="cat-tab" href="#${esc(category.id)}" data-tab data-target="${esc(category.id)}">
    ${esc(category.name)}
    <span class="cat-tab__count">${category.items.length}</span>
  </a>`
    )
    .join('\n  ');

  return `${all}\n  ${rest}`;
}

export function menuPage() {
  const itemCount = menu.reduce((n, c) => n + c.items.length, 0);

  const body = `
<section class="menu-hero is-board">
  <div class="wrap menu-hero__grid">
    <div>
      <p class="eyebrow menu-hero__eyebrow">${itemCount} things · ${menu.length} sections</p>
      <h1 class="menu-hero__title">The <span>whole</span> board</h1>
    </div>
    <p class="menu-hero__lede">
      Transcribed from the chalkboard inside 139 Hester Street.
      <strong>${esc(restaurant.payment)}.</strong>
      Prices change on a chalkboard faster than they do on a website —
      call <a href="tel:${esc(restaurant.phone)}">${esc(restaurant.phoneDisplay)}</a> if something matters.
    </p>
  </div>
</section>

<div class="menu-bar is-board">
  <div class="wrap menu-bar__inner">
    <div class="menu-search" data-search-wrap>
      <svg class="menu-search__icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="2"/>
        <path d="M12.8 12.8L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <input class="menu-search__input" type="search" id="menu-search"
             placeholder="Search the menu" autocomplete="off"
             aria-label="Search the menu by dish name">
      <button class="menu-search__clear" type="button" data-search-clear aria-label="Clear search">&times;</button>
    </div>

    <nav class="cat-tabs" aria-label="Menu sections">
      ${categoryTabs()}
    </nav>
  </div>
</div>

<div class="menu-body" id="all" data-menu-body>
  <div class="wrap">
    <p class="visually-hidden" role="status" aria-live="polite" data-search-status></p>

    ${menu.map(categorySection).join('\n\n    ')}

    <div class="menu-empty">
      <h2 class="menu-empty__title">Nothing by that name</h2>
      <p class="menu-empty__body">
        The menu is short — try “kimbap”, “tofu” or “rice cake”.
      </p>
      <button class="btn btn--ink" type="button" data-search-clear>Clear the search</button>
    </div>

    <aside class="menu-note">
      <p class="menu-note__text">
        <b>Banchan prices are not on the board.</b>
        Kimchi, cucumber, macaroni and fishcake are made in house and listed
        without prices, so none are shown here. Ask at the counter, or call
        <a href="tel:${esc(restaurant.phone)}">${esc(restaurant.phoneDisplay)}</a>.
      </p>
      <a class="btn btn--ink" href="index.html#visit">How to get there</a>
    </aside>
  </div>
</div>
`;

  return layout({
    title: `Menu — ${restaurant.name}, ${addressOneLine}`,
    description: `The full ${restaurant.name} menu: rice bowls, kimbap, tteokbokki, fishcake and homemade banchan at ${addressOneLine}. Prices as chalked on the board. Cash only.`,
    page: 'menu',
    pagePath: 'menu.html',
    styles: 'menu.css',
    body,
    scripts: '<script src="scripts/menu-page.js" defer></script>',
  });
}
