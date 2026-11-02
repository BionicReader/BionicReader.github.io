(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Projects dropdown: hover on desktop, tap/click anywhere else
  var dd = document.querySelector('.has-dropdown');
  if (dd) {
    var btn = dd.querySelector('.dropdown-toggle');
    var hoverable = function () { return window.matchMedia('(hover: hover) and (min-width: 721px)').matches; };
    var setOpen = function (o) {
      dd.classList.toggle('open', o);
      btn.setAttribute('aria-expanded', o ? 'true' : 'false');
    };
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(hoverable() ? true : !dd.classList.contains('open'));
    });
    dd.addEventListener('mouseenter', function () { if (hoverable()) setOpen(true); });
    dd.addEventListener('mouseleave', function () { if (hoverable()) setOpen(false); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  // Highlight the current page in the nav
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === here) {
      a.setAttribute('aria-current', 'page');
      if (dd && dd.contains(a)) dd.querySelector('.dropdown-toggle').setAttribute('aria-current', 'page');
    }
  });

  // Click-to-play games: nothing loads (or makes sound) until the visitor clicks
  document.querySelectorAll('.play-gate').forEach(function (gate) {
    gate.addEventListener('click', function () {
      if (location.protocol === 'file:') {
        // Godot web builds can't run from a double-clicked file
        gate.innerHTML = '<div class="embed-placeholder">This game needs a web server to run.<br>Preview the site with start-preview.command, or view it once it is live.</div>';
        return;
      }
      var f = document.createElement('iframe');
      f.src = gate.getAttribute('data-src');
      f.title = gate.getAttribute('data-title') || 'Game';
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('allow', 'autoplay; fullscreen; gamepad');
      gate.parentNode.replaceChild(f, gate);
      f.focus();
    });
  });
})();

(function () {
  // Image viewer: click any project image to open it large, then browse every image on the page
  var imgs = Array.prototype.filter.call(document.querySelectorAll('.project-block img'), function (i) {
    return !i.closest('.play-gate');
  });
  if (!imgs.length) return;

  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML =
    '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">✕</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">←</button>' +
    '<figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next image">→</button>' +
    '<div class="lb-count" aria-live="polite"></div>';
  document.body.appendChild(lb);

  var big = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-cap');
  var count = lb.querySelector('.lb-count');
  var btnClose = lb.querySelector('.lb-close');
  var btnPrev = lb.querySelector('.lb-prev');
  var btnNext = lb.querySelector('.lb-next');
  var current = 0;
  var lastFocus = null;

  if (imgs.length < 2) lb.classList.add('single');

  function caption(img) {
    var fig = img.closest('figure');
    var fc = fig && fig.querySelector('figcaption');
    return (fc && fc.textContent.trim()) || img.alt || '';
  }
  function show(i) {
    current = (i + imgs.length) % imgs.length;
    var img = imgs[current];
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    cap.textContent = caption(img);
    count.textContent = (current + 1) + ' / ' + imgs.length;
    [current + 1, current - 1].forEach(function (n) {
      var p = imgs[(n + imgs.length) % imgs.length];
      if (p) new Image().src = p.currentSrc || p.src;
    });
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add('open');
    document.body.classList.add('lb-open');
    btnClose.focus();
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('lb-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  imgs.forEach(function (img, i) {
    img.setAttribute('data-lb', '');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'image'));
    img.addEventListener('click', function () { open(i); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.classList.contains('lb-fig')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.filter.call(lb.querySelectorAll('button'), function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var sx = null;
  lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    sx = null;
  });
})();
