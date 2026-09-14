# Abishiyam Baskaran — Portfolio

A responsive, static portfolio built with semantic HTML, CSS, and vanilla JavaScript. No application framework, package installation, external fonts, analytics, or runtime API requests are required.

## Preview locally

From this folder, run `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173`. An HTTP server ensures browsers can load the local SVG icon masks.

## Editing

- `index.html`: profile, section content, project descriptions, and social links.
- `styles.css`: design tokens, components, responsive breakpoints, and accessibility preferences, organized in numbered sections.
- `app.js`: mobile menu, active navigation, and the copyright year.
- `img/BilledeAfmig1.JPG`: the existing portrait, displayed with CSS cropping and grayscale. The original photo is unchanged.
- `public/og.png`: the social sharing image. Update the absolute Open Graph and Twitter image URLs in `index.html` when moving to another domain. Private previews require sign-in and may not generate public social unfurls.

Content and navigation remain available with JavaScript disabled. With JavaScript enabled, the mobile menu supports Escape, outside clicks, keyboard focus, and viewport changes. Scrolling respects reduced-motion preferences.

## Project sources

The project descriptions use the original portfolio and public repositories:

- [BeerHub](https://github.com/Abishiyambas/semester-3-beerhub-platform)
- [MongoDB REST API](https://github.com/Abishiyambas/node-express-mongo-rest-api)
- [Laravel Auth Foundations](https://github.com/Abishiyambas/laravel-auth-foundations)

Education is shown as current, without invented dates, employment, or proficiency scores.

## Optional Sites build

Run `node scripts/build.mjs` to package the allowlisted static resources as a dependency-free Cloudflare Worker in `dist/server/index.js`. This is only for hosting; ordinary static hosting can serve the original HTML, CSS, JavaScript, icons, and images directly.

## Asset credits

The unchanged GitHub, LinkedIn, and YouTube icons are from [Font Awesome Free](https://github.com/FortAwesome/Font-Awesome), under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). License attribution is preserved in each SVG.

`public/og.png` was created with the built-in ImageGen tool using this brief: a finished landscape social card for Abishiyam Baskaran’s software engineering portfolio, with near-black charcoal (#101210), warm white text, pale lime (#c4ee94), restrained geometric lines, and prominent sans-serif typography. Exact copy: “AB.”, “Abishiyam”, “Baskaran.”, “Software Engineering Student”, “SDU · Odense, Denmark”, and “github.com/Abishiyambas”. No photography, extra claims, or technology logos.
