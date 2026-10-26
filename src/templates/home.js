/** Home page. */

import {
  restaurant,
  addressOneLine,
  directionsUrl,
} from '../data/restaurant.js';
import { menu, formatPriceShort } from '../data/menu.js';
import { layout, esc, bowlArt } from './components.js';

/**
 * The showcase pulls real items out of the menu data — it never hardcodes a
 * dish. Change menu.js and this section follows.
 */
function pickShowcase() {
  const find = (categoryId, itemId) => {
    const category = menu.find((c) => c.id === categoryId);
    const item = category.items.find((i) => i.id === itemId);
    return { category, item };
  };

  return [
    { ...find('rice-bowls', 'fried-chicken-rice-bowl'), variant: 'lead', tag: 'Most ordered' },
    { ...find('rice-bowls', 'beef-rice-bowl'), variant: 'light' },
    { ...find('kimbap', 'squid-kimbap'), variant: 'dark', tag: 'New' },
    { ...find('hot-plates', 'tteokbokki'), variant: 'dark' },
    { ...find('sandwiches', 'fried-chicken-burger'), variant: 'neon', tag: 'New' },
  ];
}

function dishCard({ category, item, variant, tag }) {
  const price = formatPriceShort(item.price);
  const classes = [
    'dish',
    variant === 'lead' && 'dish--lead',
    variant === 'light' && 'dish--light',
    variant === 'neon' && 'dish--neon',
  ]
    .filter(Boolean)
    .join(' ');

  return `<a class="${classes} reveal" href="menu.html#${esc(category.id)}">
  <span class="dish__top">
    ${tag ? `<span class="dish__tag">${esc(tag)}</span>` : ''}
    ${bowlArt({ hearts: variant === 'lead' ? 9 : 5 })}
  </span>
  <span class="dish__meta">
    <span>
      <span class="dish__cat">${esc(category.name)}</span>
      <span class="dish__name">${esc(item.name)}</span>
    </span>
    ${price ? `<span class="dish__price">${esc(price)}</span>` : ''}
  </span>
</a>`;
}

export function homePage() {
  const riceBowls = menu.find((c) => c.id === 'rice-bowls');
  const smallBowl = riceBowls.items.find((i) => i.id === 'pork-rice-bowl');
  const kimbap = menu.find((c) => c.id === 'kimbap');

  const body = `
<section class="hero is-board">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="eyebrow hero__eyebrow">Korean · Chinatown · since Nov&nbsp;2024</p>

      <h1 class="hero__title">Finding <em>happiness</em> in little bowls</h1>

      <p class="lede hero__lede">
        A tiny counter on Hester Street. Rice bowls from
        $${smallBowl.price.small}, kimbap at $${kimbap.sharedPrice.flat},
        and banchan made in house.
      </p>

      <div class="hero__actions">
        <a class="btn btn--neon" href="menu.html">See the menu</a>
        <a class="btn btn--ghost-light" href="#visit">Find us</a>
      </div>

      <ul class="chalk-facts">
        <li>${esc(restaurant.hours.note)} ${esc(restaurant.hours.display)}</li>
        <li>${esc(restaurant.payment)}</li>
        <li>${restaurant.rating.value} ★ · ${restaurant.rating.count} ${esc(restaurant.rating.source)} reviews</li>
      </ul>
    </div>

    <div class="hero__media">
      <img class="hero__photo" src="assets/images/storefront.webp"
           width="658" height="994" fetchpriority="high" decoding="async"
           alt="Lululala's storefront at 139 Hester Street: a black awning with the Lululala script wordmark and the line “Finding happiness in little bowls”, above a warmly lit room with a pink neon sign in the window.">
      <span class="chop" aria-hidden="true">${esc(restaurant.nameZh)}</span>
    </div>
  </div>
</section>

<section class="section showcase" aria-labelledby="showcase-title">
  <div class="wrap">
    <div class="section-head">
      <div>
        <p class="eyebrow section-head__eyebrow">Straight off the board</p>
        <h2 class="section-head__title" id="showcase-title">What people come back for</h2>
      </div>
      <p class="section-head__aside">
        Every price here is the price chalked on the board inside the shop.
      </p>
    </div>

    <div class="dish-grid">
      ${pickShowcase().map(dishCard).join('\n')}
    </div>

    <div class="showcase__foot">
      <a class="btn btn--ink" href="menu.html">See the whole menu</a>
      <p class="showcase__note">
        Rice bowls come small or large. Add an extra protein for
        $${riceBowls.addOns[0].price.flat}, extra rice for
        $${riceBowls.addOns[1].price.flat}.
      </p>
    </div>
  </div>
</section>

<section class="section statement" aria-labelledby="statement-title">
  <div class="wrap statement__grid">
    <div>
      <h2 class="statement__title" id="statement-title">One small room, one short menu, nothing fussy.</h2>
      <p class="statement__body">
        Lululala opened on Hester Street in November&nbsp;2024. The whole menu
        fits on one chalkboard behind the counter: rice bowls, kimbap,
        tteokbokki, fishcake, and whatever banchan was made that morning.
        There are a few seats, but most people take it to go.
      </p>

      <ul class="statement__facts">
        <li><b>Opened</b><span>3 November 2024</span></li>
        <li><b>Payment</b><span>${esc(restaurant.payment)}</span></li>
        <li><b>Rated</b><span>${restaurant.rating.value} out of 5 across ${restaurant.rating.count} ${esc(restaurant.rating.source)} reviews</span></li>
      </ul>
    </div>

    <figure>
      <img class="statement__photo" src="assets/images/interior.webp"
           width="800" height="600" loading="lazy" decoding="async"
           alt="Inside Lululala: a narrow room with green subway tile along the counter, the hand-lettered chalkboard menu on the far wall, and a small table by the window.">
      <figcaption class="statement__caption">
        The room on Hester Street — green tile, one chalkboard, a couple of stools.
      </figcaption>
    </figure>
  </div>
</section>

<section class="section is-board visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap visit__grid">
    <div>
      <p class="eyebrow visit__eyebrow">Find us</p>
      <h2 class="visit__title" id="visit-title">139 Hester Street</h2>

      <dl class="visit__details">
        <div class="visit__row">
          <dt>Address</dt>
          <dd>
            <a href="${esc(directionsUrl)}" target="_blank" rel="noopener noreferrer">${esc(addressOneLine)}</a>
            <small>${esc(restaurant.neighborhood)}, Manhattan</small>
          </dd>
        </div>
        <div class="visit__row">
          <dt>Hours</dt>
          <dd>
            ${esc(restaurant.hours.display)}
            <small>${esc(restaurant.hours.note)}</small>
          </dd>
        </div>
        <div class="visit__row">
          <dt>Phone</dt>
          <dd><a href="tel:${esc(restaurant.phone)}">${esc(restaurant.phoneDisplay)}</a></dd>
        </div>
        <div class="visit__row">
          <dt>Payment</dt>
          <dd>
            ${esc(restaurant.payment)}
            <small>Bring cash — cards are not accepted.</small>
          </dd>
        </div>
      </dl>

      <div class="visit__actions">
        <a class="btn btn--neon" href="${esc(directionsUrl)}" target="_blank" rel="noopener noreferrer">Get directions</a>
        <a class="btn btn--ghost-light" href="tel:${esc(restaurant.phone)}">Call ${esc(restaurant.phoneDisplay)}</a>
      </div>
    </div>

    <div class="visit__media reveal">
      <img class="visit__photo" src="assets/images/counter.png"
           width="348" height="348" loading="lazy" decoding="async"
           alt="The counter at Lululala, with staff plating orders in front of a wall of white tile and a drinks fridge.">
      <span class="visit__cash">${esc(restaurant.payment)}</span>
    </div>
  </div>
</section>
`;

  return layout({
    title: `${restaurant.name} — Korean rice bowls & kimbap in Chinatown, NYC`,
    description: `${restaurant.name} is a small Korean counter at ${addressOneLine}. Rice bowls from $${smallBowl.price.small}, kimbap $${kimbap.sharedPrice.flat}, tteokbokki and homemade banchan. Open ${restaurant.hours.note.toLowerCase()} ${restaurant.hours.display}. Cash only.`,
    page: 'home',
    pagePath: 'index.html',
    styles: 'home.css',
    body,
  });
}
