/**
 * Shared markup: document shell, header, footer, and the hand-drawn bowl.
 * Everything is a plain template function returning an HTML string.
 */

import { restaurant, addressOneLine, directionsUrl } from '../data/restaurant.js';

/** Escape anything interpolated from data into markup. */
export const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * schema.org Restaurant. Only fields we have verified are emitted — an absent
 * website or menu URL is simply left out rather than invented.
 */
function structuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.name,
    servesCuisine: restaurant.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: restaurant.address.lat,
      longitude: restaurant.address.lng,
    },
    telephone: restaurant.phone,
    openingHours: restaurant.hours.schema,
    paymentAccepted: 'Cash',
    priceRange: '$',
  };

  if (restaurant.siteUrl) data.url = restaurant.siteUrl;

  return JSON.stringify(data);
}

/**
 * @param {object} o
 * @param {string} o.title      full <title>
 * @param {string} o.description meta description
 * @param {string} o.page       'home' | 'menu' — drives nav current state
 * @param {string} o.pagePath   'index.html' | 'menu.html' for canonical/OG
 * @param {string} o.styles     extra stylesheet filename
 * @param {string} o.body       page markup
 * @param {string} [o.scripts]  extra <script> tags
 */
export function layout({
  title,
  description,
  page,
  pagePath,
  styles,
  body,
  scripts = '',
}) {
  // Canonical and og:url need a real domain. Until one is set in
  // restaurant.js they are omitted rather than pointed at a made-up host.
  const canonical = restaurant.siteUrl
    ? `${restaurant.siteUrl.replace(/\/$/, '')}/${pagePath === 'index.html' ? '' : pagePath}`
    : null;

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<script>document.documentElement.classList.remove('no-js');</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : '<!-- canonical: set `siteUrl` in src/data/restaurant.js once the domain is live -->'}

<meta property="og:type" content="restaurant">
<meta property="og:site_name" content="${esc(restaurant.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${canonical ? `<meta property="og:url" content="${esc(canonical)}">\n<meta property="og:image" content="${esc(restaurant.siteUrl.replace(/\/$/, ''))}/assets/images/storefront.webp">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#121010">

<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/favicon.svg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Pacifico&family=Shantell+Sans:ital,wght@0,400;0,600;0,700;1,600&display=swap">

<link rel="stylesheet" href="styles/tokens.css">
<link rel="stylesheet" href="styles/base.css">
<link rel="stylesheet" href="styles/${esc(styles)}">

<script type="application/ld+json">${structuredData()}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${header(page)}
<main id="main">
${body}
</main>
${footer()}
<script src="scripts/reveal.js" defer></script>
${scripts}
</body>
</html>
`;
}

function header(page) {
  return `<header class="site-header">
  <div class="wrap site-header__inner">
    <a class="wordmark" href="index.html" aria-label="${esc(restaurant.name)} — home">${esc(restaurant.name)}</a>
    <nav class="nav" aria-label="Main">
      <a class="nav__link nav__link--home" href="index.html"${page === 'home' ? ' aria-current="page"' : ''}>Home</a>
      <a class="nav__link" href="menu.html"${page === 'menu' ? ' aria-current="page"' : ''}>Menu</a>
      <a class="btn btn--neon nav__cta" href="${page === 'home' ? '#visit' : 'index.html#visit'}">Find&nbsp;us</a>
    </nav>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();

  return `<footer class="site-footer">
  <div class="wrap">
    <div class="site-footer__grid">
      <div>
        <a class="wordmark" href="index.html">${esc(restaurant.name)}</a>
        <p class="site-footer__tag">${esc(restaurant.tagline)}</p>
      </div>

      <nav class="footer-col" aria-label="Footer">
        <h2>Pages</h2>
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="index.html#visit">Find us</a>
      </nav>

      <div class="footer-col">
        <h2>Visit</h2>
        <a href="${esc(directionsUrl)}" target="_blank" rel="noopener noreferrer">${esc(addressOneLine)}</a>
        <a href="tel:${esc(restaurant.phone)}">${esc(restaurant.phoneDisplay)}</a>
        <span>${esc(restaurant.hours.note)} · ${esc(restaurant.hours.display)}</span>
        <span>${esc(restaurant.payment)}</span>
      </div>
    </div>

    <div class="site-footer__base">
      <span>© ${year} ${esc(restaurant.name)} · ${esc(addressOneLine)}</span>
      <span>${esc(restaurant.nameKo)} · ${esc(restaurant.nameZh)}</span>
    </div>
  </div>
</footer>`;
}

/**
 * The bowl drawn on the restaurant's own chalkboard — a bowl heaped with
 * hearts. Redrawn as inline SVG so it scales and recolours with the page.
 * `currentColor` for the vessel, pastel tokens for the hearts.
 */
export function bowlArt({ hearts = 7, title = '' } = {}) {
  const palette = [
    'var(--chalk-pink)',
    'var(--chalk-mint)',
    'var(--chalk-butter)',
    'var(--chalk-lilac)',
    'var(--chalk-peach)',
  ];

  // Scattered but deterministic, so the build output never churns.
  const seeds = [
    [52, 46, 1, -12],
    [78, 34, 0.86, 9],
    [104, 48, 1.05, -5],
    [40, 68, 0.78, 14],
    [66, 62, 0.92, -8],
    [92, 66, 0.8, 11],
    [118, 70, 0.74, -14],
    [30, 52, 0.7, 6],
    [128, 50, 0.68, -3],
  ];

  const heartPath =
    'M0,3.2 C0,-1.4 -6.4,-3.4 -6.4,1.1 C-6.4,4.6 -2.4,7.4 0,9.6 ' +
    'C2.4,7.4 6.4,4.6 6.4,1.1 C6.4,-3.4 0,-1.4 0,3.2 Z';

  const heartMarkup = seeds
    .slice(0, hearts)
    .map(
      ([x, y, s, r], i) =>
        `<path d="${heartPath}" fill="${palette[i % palette.length]}" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" opacity="0.95"/>`
    )
    .join('');

  return `<svg class="dish__art" viewBox="0 0 160 130" fill="none" ${
    title ? `role="img" aria-label="${esc(title)}"` : 'aria-hidden="true" focusable="false"'
  }>
  ${heartMarkup}
  <path d="M18 74 C18 74 30 112 80 112 C130 112 142 74 142 74 Z"
        fill="none" stroke="currentColor" stroke-width="4.5"
        stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M12 74 H148" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M34 90 C50 97 74 99 96 95" stroke="currentColor" stroke-width="2.6"
        stroke-linecap="round" opacity="0.55"/>
</svg>`;
}
