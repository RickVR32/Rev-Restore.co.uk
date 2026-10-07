/* Rev-Restore seasonal themes
   Runs in the visitor's browser and checks today's date:
     October  -> Halloween   (bats, pumpkin)
     November -> Bonfire Night & Black Friday (fireworks, gold)
     December -> Christmas   (snow, Christmas tree)
     any other month -> normal site
   Nothing to switch on or off. To preview any time, add ?theme=halloween, ?theme=november or ?theme=xmas
   to the URL (or ?theme=off to see the normal site). */
(function () {
  var params = new URLSearchParams(location.search);
  var forced = params.get('theme');
  var month = new Date().getMonth(); // 0 = Jan ... 9 = Oct, 10 = Nov, 11 = Dec
  var theme = forced || ({ 9: 'halloween', 10: 'november', 11: 'xmas' })[month] || null;
  if (!theme || theme === 'off') return;

  var ICONS = {
    pumpkin:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M16 7c0-2 1-4 3-5l1 1.5C18.6 4.3 18 5.6 18 7z" fill="#3c7a2a"/>' +
      '<ellipse cx="9.5" cy="18" rx="7" ry="10" fill="#e8650e"/>' +
      '<ellipse cx="22.5" cy="18" rx="7" ry="10" fill="#e8650e"/>' +
      '<ellipse cx="16" cy="18" rx="7.5" ry="11" fill="#ff8a2a"/>' +
      '<path d="M10 15l3 -3 3 3zM16 15l3-3 3 3z" fill="#1a0d00"/>' +
      '<path d="M9.5 21c2 3 4 4 6.5 4s4.5-1 6.5-4l-2 1-1.5-1.5L17.5 22 16 20.5 14.5 22 13 20.5 11.5 22z" fill="#1a0d00"/>' +
      '</svg>',
    tree:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M16 2l1.2 2.5 2.7.3-2 1.9.5 2.7L16 8.1l-2.4 1.3.5-2.7-2-1.9 2.7-.3z" fill="#ffd34d"/>' +
      '<path d="M16 7l-6 8h3l-5 7h4l-5 6h18l-5-6h4l-5-7h3z" fill="#1f8a4c"/>' +
      '<rect x="14" y="28" width="4" height="3" fill="#7a4a24"/>' +
      '<circle cx="13" cy="17" r="1.3" fill="#e63946"/><circle cx="19" cy="21" r="1.3" fill="#ffd34d"/>' +
      '<circle cx="12" cy="25" r="1.3" fill="#ffd34d"/><circle cx="20" cy="26" r="1.3" fill="#e63946"/>' +
      '</svg>',
    firework:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><g stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M16 3v6M16 23v6M3 16h6M23 16h6" stroke="#ffd34d"/>' +
      '<path d="M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" stroke="#c77dff"/></g>' +
      '<circle cx="16" cy="16" r="3" fill="#fff3c4"/></svg>'
  };

  var THEMES = {
    halloween: {
      cls: 'theme-halloween',
      ribbon: 'Spooky season at the workshop. Get your bike sorted before the dark nights set in.',
      icon: 'pumpkin', particle: 'bat', count: 7
    },
    november: {
      cls: 'theme-november',
      ribbon: 'Bonfire Night & Black Friday. Ask about this month’s workshop deals when you get a quote.',
      icon: 'firework', particle: 'firework', count: 0
    },
    xmas: {
      cls: 'theme-xmas',
      ribbon: 'Merry Christmas from Rev-Restore. Book now for a fresh start in the New Year.',
      icon: 'tree', particle: 'snow', count: 45
    }
  };
  var t = THEMES[theme];
  if (!t) return;

  document.documentElement.classList.add(t.cls);

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Announcement ribbon above the header
    var ribbon = document.createElement('a');
    ribbon.className = 'season-ribbon';
    ribbon.href = 'quote.html';
    ribbon.textContent = t.ribbon;
    document.body.insertBefore(ribbon, document.body.firstChild);

    // Seasonal icon inside the header "Get a Quote" button (desktop)
    var cta = document.querySelector('.main-nav .nav-cta');
    if (cta) {
      var ic = document.createElement('span');
      ic.className = 'season-icon';
      ic.innerHTML = ICONS[t.icon];
      cta.insertBefore(ic, cta.firstChild);
    }

    // Seasonal icon on the left of the header (mobile)
    var row = document.querySelector('.site-header .header-row');
    if (row) {
      var mark = document.createElement('span');
      mark.className = 'season-mark';
      mark.innerHTML = ICONS[t.icon];
      row.insertBefore(mark, row.firstChild);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var layer = document.createElement('div');
    layer.className = 'season-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);

    // Fireworks: a few bursts at random spots, on a loop
    if (t.particle === 'firework') {
      var COLOURS = ['#ffd34d', '#c77dff', '#ff5d8f', '#5ce1e6', '#ffffff'];
      var burst = function () {
        if (document.hidden) return;
        var b = document.createElement('span');
        b.className = 'season-burst';
        b.style.left = (8 + Math.random() * 84) + 'vw';
        b.style.top = (8 + Math.random() * 45) + 'vh';
        var col = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        var size = 60 + Math.random() * 70;
        for (var k = 0; k < 14; k++) {
          var s = document.createElement('i');
          s.style.setProperty('--a', (k * 360 / 14) + 'deg');
          s.style.setProperty('--d', size + 'px');
          s.style.background = col;
          s.style.boxShadow = '0 0 6px ' + col;
          b.appendChild(s);
        }
        layer.appendChild(b);
        setTimeout(function () { b.remove(); }, 1600);
      };
      burst();
      setInterval(burst, 1300);
      return;
    }

    // Bats or snow
    var BAT = '<svg viewBox="0 0 64 32"><path d="M32 10c2-4 4-6 4-6l1 5c3-1 6 0 8 2 3-5 10-7 19-5-6 2-9 6-10 11-3-2-7-2-10 1-2-3-5-4-8-2-1 3-2 5-4 6-2-1-3-3-4-6-3-2-6-1-8 2-3-3-7-3-10-1-1-5-4-9-10-11 9-2 16 0 19 5 2-2 5-3 8-2l1-5s2 2 4 6z" fill="currentColor"/></svg>';
    for (var i = 0; i < t.count; i++) {
      var el = document.createElement('span');
      el.className = 'season-' + t.particle;
      var dur = t.particle === 'bat' ? 14 + Math.random() * 12 : 8 + Math.random() * 10;
      el.style.left = (Math.random() * 100) + 'vw';
      el.style.top = t.particle === 'bat' ? (5 + Math.random() * 55) + 'vh' : '-10px';
      el.style.animationDuration = dur + 's';
      el.style.animationDelay = (-Math.random() * dur) + 's';
      if (t.particle === 'bat') {
        el.innerHTML = BAT;
        el.style.width = (22 + Math.random() * 26) + 'px';
      } else {
        var sz = 2 + Math.random() * 4;
        el.style.width = el.style.height = sz + 'px';
        el.style.opacity = 0.35 + Math.random() * 0.5;
      }
      layer.appendChild(el);
    }
  });
})();
