/* Rev-Restore seasonal themes
   Runs in the visitor's browser and checks today's date:
     January   -> New Year          (confetti)
     February  -> Valentine's        (floating hearts)
     March     -> Spring             (falling petals)
     April     -> Easter             (pastel petals, egg)
     May       -> Ride-out season    (helmet, chequered trim)
     June      -> Father's Day       (gift)
     July      -> Summer             (sun glow)
     August    -> Race season        (chequered flag)
     September -> Autumn prep        (falling leaves)
     October   -> Halloween          (bats, pumpkin)
     November  -> Bonfire Night & Black Friday (fireworks, gold)
     December  -> Christmas          (snow, Christmas tree)
   Nothing to switch on or off. To preview any month, add ?theme= with one of:
   newyear, valentine, spring, easter, rideout, fathers, summer, race, autumn, halloween, november, xmas
   (or ?theme=off to see the normal site). */
(function () {
  var params = new URLSearchParams(location.search);
  var forced = params.get('theme');
  var month = new Date().getMonth(); // 0 = Jan ... 9 = Oct, 10 = Nov, 11 = Dec
  var theme = forced || ['newyear', 'valentine', 'spring', 'easter', 'rideout', 'fathers', 'summer', 'race', 'autumn', 'halloween', 'november', 'xmas'][month];
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
      '<circle cx="16" cy="16" r="3" fill="#fff3c4"/></svg>',
    sparkle:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M16 3l2.6 8.4L27 14l-8.4 2.6L16 25l-2.6-8.4L5 14l8.4-2.6z" fill="#ffd34d"/>' +
      '<path d="M25 21l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#dfe6ee"/>' +
      '<path d="M7 22l.8 2.2 2.2.8-2.2.8L7 28l-.8-2.2L4 25l2.2-.8z" fill="#dfe6ee"/></svg>',
    heart:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M16 28S4 20.5 4 12.2C4 8.2 7 5.5 10.5 5.5c2.4 0 4.3 1.3 5.5 3.2 1.2-1.9 3.1-3.2 5.5-3.2C25 5.5 28 8.2 28 12.2 28 20.5 16 28 16 28z" fill="#ff3b6b"/>' +
      '<path d="M9 10.5c.6-1.5 1.9-2.4 3.4-2.4" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none" opacity=".7"/></svg>',
    flower:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><g fill="#ffd6e4">' +
      '<circle cx="16" cy="8.5" r="5"/><circle cx="23.5" cy="14" r="5"/><circle cx="20.6" cy="22.6" r="5"/>' +
      '<circle cx="11.4" cy="22.6" r="5"/><circle cx="8.5" cy="14" r="5"/></g>' +
      '<circle cx="16" cy="16" r="4" fill="#ffc93c"/></svg>',
    egg:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M16 3c5.5 0 10 9 10 15.5S21.5 29 16 29 6 25 6 18.5 10.5 3 16 3z" fill="#b8a2f0"/>' +
      '<path d="M6.6 15.5l3-2 3 2 3-2 3 2 3-2 3 2 2.8-1.8" stroke="#fff6c2" stroke-width="2" fill="none" stroke-linejoin="round"/>' +
      '<circle cx="12" cy="21.5" r="1.6" fill="#7fe0c8"/><circle cx="17" cy="23.5" r="1.6" fill="#ffb3c7"/><circle cx="21" cy="20.5" r="1.6" fill="#7fe0c8"/></svg>',
    helmet:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M5 19C5 10.5 10.5 5 17.5 5S29 10 29 17v6c0 1.7-1.3 3-3 3H8c-1.7 0-3-1.3-3-3z" fill="#d21a2c"/>' +
      '<path d="M13 13h14.5c.9 0 1.5.7 1.5 1.5V19H15c-1.1 0-2-.9-2-2z" fill="#1d2a36"/>' +
      '<path d="M15 14.5h11" stroke="#7fb3ff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M7 22h21" stroke="#fff" stroke-width="1.5" opacity=".5"/></svg>',
    gift:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<rect x="5" y="13" width="22" height="15" rx="2" fill="#2f6fd6"/>' +
      '<rect x="3.5" y="9" width="25" height="6" rx="1.5" fill="#3d82ef"/>' +
      '<rect x="14" y="9" width="4" height="19" fill="#ffd34d"/>' +
      '<path d="M16 9c-2-4-7-5-7-2 0 2 4 2 7 2zM16 9c2-4 7-5 7-2 0 2-4 2-7 2z" fill="#ffd34d"/></svg>',
    sun:
      '<svg viewBox="0 0 32 32" aria-hidden="true"><g stroke="#ffb703" stroke-width="2.4" stroke-linecap="round">' +
      '<path d="M16 2.5v4M16 25.5v4M2.5 16h4M25.5 16h4M6.5 6.5l2.8 2.8M22.7 22.7l2.8 2.8M25.5 6.5l-2.8 2.8M9.3 22.7l-2.8 2.8"/></g>' +
      '<circle cx="16" cy="16" r="6.5" fill="#ffd34d"/></svg>',
    flag:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<rect x="5" y="3" width="2.2" height="27" rx="1" fill="#cfd4da"/>' +
      '<path d="M7.2 4h20v14h-20z" fill="#fff"/>' +
      '<path d="M7.2 4h5v3.5h-5zM17.2 4h5v3.5h-5zM12.2 7.5h5V11h-5zM22.2 7.5h5V11h-5zM7.2 11h5v3.5h-5zM17.2 11h5v3.5h-5zM12.2 14.5h5V18h-5zM22.2 14.5h5V18h-5z" fill="#111"/></svg>',
    leaf:
      '<svg viewBox="0 0 32 32" aria-hidden="true">' +
      '<path d="M27 5C14 5 5 11 5 20c0 3 1 5 2 7 2-6 7-11 13-14-5 4-9 8-11 15 2 1 4 1 6 1 9 0 12-11 12-24z" fill="#d9731a"/>' +
      '<path d="M7 27c3-8 8-12 13-14" stroke="#7a3b0c" stroke-width="1.3" fill="none"/></svg>'
  };

  var THEMES = {
    newyear: {
      cls: 'theme-newyear',
      ribbon: 'Happy New Year from Rev-Restore. Start the year with a fresh finish: book your parts in now.',
      icon: 'sparkle', particle: 'confetti', count: 26
    },
    valentine: {
      cls: 'theme-valentine',
      ribbon: 'Show your bike some love this Valentine\u2019s. Treat it to a fresh coat.',
      icon: 'heart', particle: 'heart', count: 12
    },
    spring: {
      cls: 'theme-spring',
      ribbon: 'Spring\u2019s here. Get your parts refreshed before riding season starts.',
      icon: 'flower', particle: 'petal', count: 18
    },
    easter: {
      cls: 'theme-easter',
      ribbon: 'Easter bank holiday: get your bike looking sharp for the first big rides of the year.',
      icon: 'egg', particle: 'pastel', count: 16
    },
    rideout: {
      cls: 'theme-rideout',
      ribbon: 'Riding season is on. Book your wheels and parts in now, before the summer rush.',
      icon: 'helmet', particle: null, count: 0
    },
    fathers: {
      cls: 'theme-fathers',
      ribbon: 'Father\u2019s Day: treat Dad\u2019s bike to a fresh finish. Ask us about gifting a job.',
      icon: 'gift', particle: null, count: 0
    },
    summer: {
      cls: 'theme-summer',
      ribbon: 'Summer riding at its best. Fresh wheels, fresh look: book your drop-off day online.',
      icon: 'sun', particle: null, count: 0
    },
    race: {
      cls: 'theme-race',
      ribbon: 'Race season. Give your bike the paddock look with a proper powder coat.',
      icon: 'flag', particle: null, count: 0
    },
    autumn: {
      cls: 'theme-autumn',
      ribbon: 'Off-season is coating season. Get your winter jobs booked in before the cold sets in.',
      icon: 'leaf', particle: 'leaf', count: 16
    },
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

    // Falling or rising pieces: confetti, petals, leaves, hearts
    var FALLERS = {
      confetti: { colours: ['#ffd34d', '#dfe6ee', '#d21a2c', '#5ce1e6'], shape: 'confetti', dir: 'fall' },
      petal:    { colours: ['#ffd6e4', '#ffffff', '#ffc2d6'], shape: 'petal', dir: 'fall' },
      pastel:   { colours: ['#c9b6ff', '#a8f0dc', '#fff3a8', '#ffc9de'], shape: 'petal', dir: 'fall' },
      leaf:     { colours: ['#d9731a', '#b4530f', '#e8a33d', '#8a3b12'], shape: 'leaf', dir: 'fall' },
      heart:    { colours: ['#ff3b6b', '#ff7aa2', '#ffffff'], shape: 'heart', dir: 'rise' }
    };
    var f = FALLERS[t.particle];
    if (f) {
      for (var j = 0; j < t.count; j++) {
        var p = document.createElement('span');
        var d = 9 + Math.random() * 10;
        p.className = 'season-piece season-' + f.shape + ' season-' + f.dir;
        p.style.left = (Math.random() * 100) + 'vw';
        p.style.animationDuration = d + 's';
        p.style.animationDelay = (-Math.random() * d) + 's';
        p.style.setProperty('--c', f.colours[j % f.colours.length]);
        p.style.setProperty('--s', (f.shape === 'confetti' ? 6 + Math.random() * 5 : 9 + Math.random() * 9) + 'px');
        p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
        p.style.opacity = f.shape === 'heart' ? 0.35 + Math.random() * 0.35 : 0.55 + Math.random() * 0.4;
        layer.appendChild(p);
      }
      return;
    }
    if (!t.particle) return;

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
