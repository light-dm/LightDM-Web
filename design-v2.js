(function () {
  'use strict';

  function init() {
    document.body.classList.add('ldm-v2');
    transformBadges();
    transformWerte();
    replaceTechStack();
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
    } else {
      if (!document.querySelector('.ldm-werte-grid')) transformWerte();
      if (!document.getElementById('tech-stack')?.dataset?.ldmReplaced) replaceTechStack();
    }
  });
  navObserver.observe(document.body, { childList: true, subtree: false });

  function replaceTechStack() {
    var section = document.getElementById('tech-stack');
    if (!section || section.dataset.ldmReplaced) return;
    section.dataset.ldmReplaced = '1';

    var cats = [
      {
        label: 'Web & Entwicklung',
        pills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'WordPress']
      },
      {
        label: 'Design & Branding',
        pills: ['Figma', 'Illustrator', 'InDesign', 'Photoshop', 'After Effects']
      },
      {
        label: 'IT & Infrastruktur',
        pills: ['Windows Server', 'Azure', 'Microsoft 365', 'VMware', 'Active Directory', 'Cisco', 'pfSense', 'Hyper-V']
      },
      {
        label: 'Automatisierung',
        pills: ['n8n', 'Zammad', 'Entra ID', 'Python', 'REST APIs', 'Webhooks']
      }
    ];

    section.innerHTML = '';

    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:1200px;margin:0 auto;padding:0 1.5rem';

    var badge = document.createElement('div');
    badge.style.cssText = 'display:flex;justify-content:center;margin-bottom:1.5rem';
    badge.innerHTML = '<span style="font-family:\'JetBrains Mono\',monospace;font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:#F5C518;background:rgba(245,197,24,0.08);border:1px solid rgba(245,197,24,0.25);border-radius:999px;padding:0.3rem 0.9rem">TECH STACK</span>';
    inner.appendChild(badge);

    var h2 = document.createElement('h2');
    h2.style.cssText = 'text-align:center;font-size:clamp(1.8rem,4vw,3rem);font-weight:700;color:#fff;letter-spacing:-0.022em;margin-bottom:0.5rem';
    h2.innerHTML = 'Unser <span style="color:#F5C518">Tech Stack</span>';
    inner.appendChild(h2);

    var sub = document.createElement('p');
    sub.style.cssText = 'text-align:center;color:rgba(255,255,255,0.5);font-size:1rem;margin-bottom:0';
    sub.textContent = 'Die Werkzeuge hinter jedem Projekt — sorgfältig ausgewählt.';
    inner.appendChild(sub);

    var grid = document.createElement('div');
    grid.className = 'ldm-techstack-grid';

    cats.forEach(function(cat) {
      var card = document.createElement('div');
      card.className = 'ldm-tech-cat';

      var lbl = document.createElement('span');
      lbl.className = 'ldm-tech-cat-label';
      lbl.textContent = cat.label;

      var pills = document.createElement('div');
      pills.className = 'ldm-tech-pills';

      cat.pills.forEach(function(p) {
        var pill = document.createElement('span');
        pill.className = 'ldm-tech-pill';
        pill.textContent = p;
        pills.appendChild(pill);
      });

      card.appendChild(lbl);
      card.appendChild(pills);
      grid.appendChild(card);
    });

    inner.appendChild(grid);
    section.appendChild(inner);
    section.style.padding = '5rem 0';
  }

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
