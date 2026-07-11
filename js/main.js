// ---------------------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------------------
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu after a link is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------------------------
// Mark the current page's nav link with aria-current, so styling
// (the underline) stays correct without hand-editing every page.
// ---------------------------------------------------------------------------
const currentFile = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach((link) => {
  const linkFile = link.getAttribute('href').split('#')[0] || 'index.html';
  if (linkFile === currentFile) {
    link.setAttribute('aria-current', 'page');
  }
});
