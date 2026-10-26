/**
 * Lululala — restaurant facts.
 *
 * EVERY value here is verified. Sources are noted inline.
 * If you cannot verify a change, leave the field `null` — the templates
 * skip null fields rather than printing a guess.
 *
 * Verified 2026-10-25 against:
 *   - Google Maps business listing (address, phone, hours, rating)
 *   - The restaurant's own in-store chalkboard menu (name, phone, opening date)
 *   - Storefront signage photo (wordmark, tagline, Chinese name)
 */

export const restaurant = {
  name: 'Lululala',
  nameKo: '룰루랄라',
  nameZh: '小饭盒', // red chop on the storefront sign
  // Printed under the wordmark on the awning at 139 Hester St.
  tagline: 'Finding happiness in little bowls',
  cuisine: 'Korean',
  neighborhood: 'Chinatown',
  city: 'New York',

  address: {
    street: '139 Hester St',
    locality: 'New York',
    region: 'NY',
    postalCode: '10002',
    country: 'US',
    lat: 40.7171215,
    lng: -73.9946815,
  },

  phone: '+13476183003',
  phoneDisplay: '(347) 618-3003',

  // Google Maps lists the same hours every day of the week.
  hours: {
    note: 'Open daily',
    display: '11:00 am – 7:00 pm',
    // schema.org openingHours format
    schema: ['Mo-Su 11:00-19:00'],
  },

  // Written on the chalkboard: "OPEN NOV. 3 2024".
  openedOn: '2024-11-03',

  // Called out repeatedly in reviews and on the counter signage.
  payment: 'Cash only',

  // Google Maps, 2026-10-25.
  rating: { value: 4.7, count: 287, source: 'Google Maps' },

  // The business has no website, no verified social profile and no verified
  // online-ordering destination. Do not invent any. If one is confirmed later,
  // add it here and it will appear in the nav and footer automatically.
  website: null,
  orderOnline: null,
  social: {
    instagram: null,
    tiktok: null,
  },

  // Set this once the site has a real domain; used for canonical + Open Graph.
  siteUrl: null,
};

export const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Lululala, 139 Hester St, New York, NY 10002');

export const addressOneLine = '139 Hester St, New York, NY 10002';
