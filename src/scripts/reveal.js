/**
 * Reveal elements as they enter the viewport.
 * Progressive enhancement: without JS, .reveal is made visible by the
 * no-js fallback below so nothing is ever stuck invisible.
 */
(function () {
  var nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  var reduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(function (node) {
      node.classList.add('is-in');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  nodes.forEach(function (node, i) {
    // A short stagger within a row, capped so nothing lags noticeably.
    node.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
    observer.observe(node);
  });
})();
