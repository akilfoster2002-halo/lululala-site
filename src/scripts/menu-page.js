/**
 * Menu page behaviour: live search + category tabs.
 *
 * Both are progressive enhancement. With JS off, the page is still the whole
 * menu, the tabs are plain anchors to each section, and the search field is
 * hidden (see the `no-js` rule in menu.css).
 */
(function () {
  var body = document.querySelector('[data-menu-body]');
  if (!body) return;

  var input = document.getElementById('menu-search');
  var searchWrap = document.querySelector('[data-search-wrap]');
  var status = document.querySelector('[data-search-status]');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var categories = Array.prototype.slice.call(
    document.querySelectorAll('[data-category]')
  );

  /* ---- Search ---------------------------------------------------------- */

  function applySearch(raw) {
    var query = raw.trim().toLowerCase();
    var matches = 0;

    categories.forEach(function (category) {
      var items = category.querySelectorAll('[data-item]');
      var visibleInCategory = 0;

      Array.prototype.forEach.call(items, function (item) {
        var hit = !query || item.dataset.search.indexOf(query) !== -1;
        item.hidden = !hit;
        if (hit) visibleInCategory++;
      });

      category.hidden = visibleInCategory === 0;
      matches += visibleInCategory;
    });

    body.classList.toggle('is-empty', query !== '' && matches === 0);
    if (searchWrap) searchWrap.classList.toggle('has-value', query !== '');

    if (status) {
      status.textContent = query
        ? matches + (matches === 1 ? ' dish matches ' : ' dishes match ') + '“' + raw.trim() + '”'
        : '';
    }

    // A filtered list makes "which section am I in" meaningless.
    if (query) setActiveTab(null);
  }

  if (input) {
    input.addEventListener('input', function () {
      applySearch(input.value);
    });

    // Escape clears, like any other search field.
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && input.value) {
        event.preventDefault();
        clearSearch();
      }
    });
  }

  function clearSearch() {
    if (!input) return;
    input.value = '';
    applySearch('');
    input.focus();
    syncTabToScroll();
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-search-clear]'),
    function (button) {
      button.addEventListener('click', clearSearch);
    }
  );

  /* ---- Category tabs --------------------------------------------------- */

  function setActiveTab(targetId) {
    tabs.forEach(function (tab) {
      var on = targetId !== null && tab.dataset.target === targetId;
      if (on) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      var target = tab.dataset.target;

      // A tab click is also a way out of an active search.
      if (input && input.value) {
        input.value = '';
        applySearch('');
      }

      if (target === 'all') {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
        setActiveTab('all');
        return;
      }

      // Let the browser handle the anchor jump; CSS scroll-padding keeps the
      // heading clear of the sticky header.
      setActiveTab(target);
    });
  });

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  /* ---- Keep the active tab in step with the scroll position ------------ */

  function syncTabToScroll() {
    if (input && input.value) return;

    // The section whose heading is nearest the top of the readable area wins.
    // Matches the sticky header + toolbar stack (see scroll-padding-top).
    var line = 150;
    var current = 'all';

    categories.forEach(function (category) {
      if (category.hidden) return;
      var top = category.getBoundingClientRect().top;
      if (top - line <= 0) current = category.id;
    });

    if (window.scrollY < 40) current = 'all';
    setActiveTab(current);

    // Keep the chip visible in the scrollable tab strip.
    var active = document.querySelector('[data-tab][aria-current="true"]');
    var strip = document.querySelector('.cat-tabs');
    if (active && strip && strip.scrollWidth > strip.clientWidth) {
      var stripBox = strip.getBoundingClientRect();
      var chipBox = active.getBoundingClientRect();
      if (chipBox.left < stripBox.left || chipBox.right > stripBox.right) {
        strip.scrollTo({
          left: active.offsetLeft - 16,
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
      }
    }
  }

  var ticking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        syncTabToScroll();
        ticking = false;
      });
    },
    { passive: true }
  );

  // A hash jump — arriving from the home page, or using the browser's back
  // button — happens outside the scroll handler, so re-sync after it lands.
  window.addEventListener('hashchange', function () {
    window.requestAnimationFrame(syncTabToScroll);
  });

  // Web fonts reflow the page after the initial anchor jump, which can leave
  // the heading under the sticky bar. Re-run the jump once fonts have landed.
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        target.scrollIntoView();
        syncTabToScroll();
      });
    }
  }

  syncTabToScroll();
})();
