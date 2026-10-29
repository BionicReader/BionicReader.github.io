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
  if (location.protocol === 'file:') {
    // Godot web builds can't run from a double-clicked file, so say so instead of showing an error.
    document.querySelectorAll('iframe[data-needs-server]').forEach(function (f) {
      var n = document.createElement('div');
      n.className = 'embed-placeholder';
      n.innerHTML = 'This game needs a web server to run.<br>Preview the site with start-preview.command, or view it once it is live.';
      f.replaceWith(n);
    });
  }
  var here = location.pathname.split('/').pop() || 'index.html';
  var parent = { 'games.html': 'projects.html', 'design.html': 'projects.html', 'animation.html': 'projects.html' };
  here = parent[here] || here;
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });
})();
