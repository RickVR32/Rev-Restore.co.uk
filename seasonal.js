/* Rev-Restore seasonal themes
   Runs in the visitor's browser and checks today's date:
     October  -> Halloween theme
     December -> Christmas theme
     any other month -> normal site
   Nothing to switch on or off. To preview any time, add ?theme=halloween or ?theme=xmas to the URL
   (or ?theme=off to see the normal site). */
(function () {
  var params = new URLSearchParams(location.search);
  var forced = params.get('theme');
  var month = new Date().getMonth(); // 0 = Jan ... 9 = Oct, 11 = Dec
  var theme = forced || (month === 9 ? 'halloween' : month === 11 ? 'xmas' : null);
  if (!theme || theme === 'off') return;

  var THEMES = {
    halloween: {
      cls: 'theme-halloween',
      ribbon: 'Spooky season at the workshop. Get your bike sorted before the dark nights set in.',
      particle: 'bat',
      count: 7
    },
    xmas: {
      cls: 'theme-xmas',
      ribbon: 'Merry Christmas from Rev-Restore. Book now for a fresh start in the New Year.',
      particle: 'snow',
      count: 45
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
    // Thin announcement ribbon above the header
    var ribbon = document.createElement('a');
    ribbon.className = 'season-ribbon';
    ribbon.href = 'quote.html';
    ribbon.textContent = t.ribbon;
    document.body.insertBefore(ribbon, document.body.firstChild);

    // Decorations: bats or snow, drawn over the page but never blocking clicks
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var layer = document.createElement('div');
    layer.className = 'season-layer';
    layer.setAttribute('aria-hidden', 'true');

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
        var s = 2 + Math.random() * 4;
        el.style.width = el.style.height = s + 'px';
        el.style.opacity = 0.35 + Math.random() * 0.5;
      }
      layer.appendChild(el);
    }
    document.body.appendChild(layer);
  });
})();
