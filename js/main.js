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
