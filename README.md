# Portfolio Site — Base Scaffold

Plain HTML/CSS/JS, no build step. Ready to push straight to your `username.github.io` repo's `main` branch.

## Structure

```
index.html       Home page
projects.html    Projects hub (links to the three pages below)
games.html       Games projects + playable embeds
design.html      Design projects
animation.html   Animation projects
cv.html          CV / resume
timeline.html    Chronological timeline
contact.html     Contact links
css/style.css    All styling (design tokens at the top of the file)
js/main.js       Mobile nav toggle + active-page nav highlighting
assets/img/      Portrait, project screenshots, posters
assets/docs/     PDFs for written/design work (embedded on the projects page)
assets/games/    Self-hosted WebGL/HTML5 builds (if not embedding via itch.io)
assets/cv/       Your CV PDF (linked from cv.html)
```

## Getting it live

1. Copy everything in this folder into the root of your `username.github.io` repo (replace the untouched README there, or keep both — GitHub Pages only cares about `index.html`).
2. Commit and push to `main`.
3. Site is live at `https://username.github.io/` within a minute or two.

## What to edit first

- **Fonts are loaded from Google Fonts via CDN** (Space Grotesk / Inter / Space Mono) — no local font files needed.
- **Every page's `<nav>`** repeats the same markup (plain HTML, no templating). If you rename a page or add one, update the nav block in **all eight** HTML files.
- **`index.html`** — swap the bio text, role tags, and portrait placeholder (`assets/img/portrait.jpg`).
- **`projects.html`** — a hub page; the projects themselves live in `games.html`, `design.html` and `animation.html`, each with its own project blocks. See `ASSETS.md` for the exact image filenames, and search the HTML files for `EMBED:` (paste-in embed snippets) and `TODO:` (text to confirm):
  - Duplicate a `<section class="project-block">` for each game/piece.
  - Add a matching link in the pill list at the top of that page (`href="#your-section-id"`).
  - For **playable** games: replace the `.embed-placeholder` div with an `<iframe>`. Two options:
    - **itch.io embed** (easiest): upload your WebGL/HTML5 build to itch.io, turn on "embed in page," and use the embed `<iframe>` snippet itch.io gives you.
    - **Self-hosted**: drop your build's exported files into `assets/games/your-project/` and point the iframe `src` at `assets/games/your-project/index.html`.
  - For **non-playable** art/animation pieces, use a `<video>` or `<img>` inside the `.frame` instead of an iframe.
- **`cv.html`** — fill in experience/skills/education, and drop your real CV PDF at `assets/cv/your-name-cv.pdf` (the download button already points there).
- **`timeline.html`** — one `<li class="timeline-item">` per entry, newest first.
- **`contact.html`** — update email and social links; add/remove cards for whatever platforms you actually use.

## Design system

Colors, fonts, and spacing are all CSS variables at the top of `css/style.css` — change them there and it updates everywhere. The recurring corner-bracket `.frame` element (used around the portrait, project embeds, etc.) is the site's one signature visual motif — a nod to a camera gate / viewport / selection reticle, tying together the design, code, and animation sides of the work. Feel free to lean on it more (or less) as you fill in real content.

## Notes

- No contact form / backend — the contact page is just direct links (mailto + socials). If you want an actual form later, something like Formspree or a simple Cloudflare Worker keeps it static-friendly.
- Reduced motion and keyboard focus are respected; test on mobile widths as you add content, especially the `.jump-links` bar and `.hero-grid`.
