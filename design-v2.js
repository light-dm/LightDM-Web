(function () {
  'use strict';

  function init() {
    document.body.classList.add('ldm-v2');
    transformBadges();
    transformWerte();
  }

  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run after React client-side navigation (body content replaced)
  var navObserver = new MutationObserver(function () {
    if (!document.body.classList.contains('ldm-v2')) {
      init();
    } else if (!document.querySelector('.ldm-werte-grid')) {
      // Werte section was replaced by React navigation — re-apply
      transformWerte();
    }
  });
  navObserver.observe(document.body, { childList: true, subtree: false });

  function transformBadges() {
    document.querySelectorAll('[class*="tracking-[0.2em]"]').forEach(function (el) {
      el.classList.add('ldm-badge');
    });
  }

  function transformWerte() {
    // Find heading "Was uns antreibt"
    var heading = null;
    document.querySelectorAll('h2').forEach(function (h) {
      if (h.textContent.trim().indexOf('antreibt') !== -1) heading = h;
    });
    if (!heading) return;

    // Walk up to find the container that holds the 4-column grid
    var grid = null;
    var el = heading;
    for (var i = 0; i < 8; i++) {
      el = el.parentElement;
      if (!el) return;
      var found = el.querySelector('[class*="grid-cols"]');
      if (found) { grid = found; break; }
    }
    if (!grid) return;

    grid.classList.add('ldm-werte-grid');

    Array.from(grid.children).forEach(function (item, idx) {
      item.classList.add('ldm-werte-item');

      // Ghost number span like "(1)", "(2)"
      var ghostNum = null;
      Array.from(item.querySelectorAll('span')).forEach(function (s) {
        if (/^\(\d\)$/.test(s.textContent.trim())) ghostNum = s;
      });
      if (ghostNum) ghostNum.classList.add('ldm-werte-ghost');

      // Yellow icon box (rounded-xl + bg-gradient or w-12)
      var iconBox = item.querySelector('[class*="rounded-xl"][class*="bg-gradient"]') ||
                    item.querySelector('[class*="w-12"][class*="h-12"]') ||
                    item.querySelector('[class*="rounded-xl"]');
      if (iconBox) iconBox.classList.add('ldm-werte-icon');

      // Inner padding wrapper (pt-16 / pt-24 / pt-32)
      var inner = item.querySelector('[class*="pt-16"], [class*="pt-24"], [class*="pt-32"]');
      if (inner) inner.classList.add('ldm-werte-inner');

      // Title and description
      var h3 = item.querySelector('h3');
      var p = item.querySelector('p');
      if (h3) h3.classList.add('ldm-werte-title');
      if (p)  p.classList.add('ldm-werte-desc');

      // Prepend editorial number (only once)
      if (!item.querySelector('.ldm-werte-num')) {
        var numEl = document.createElement('span');
        numEl.className = 'ldm-werte-num';
        numEl.textContent = String(idx + 1).padStart(2, '0');
        item.insertBefore(numEl, item.firstChild);
      }
    });
  }
})();
