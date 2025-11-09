# IDHL Technical Test

Responsive landing page for a fake pet brand featuring mobile-first layout, reusable BEM components, and an animated slide-out basket.

## Quick Start

### Prerequisites
- Node.js v14+ (includes npm)
- Git (optional, for cloning)

### Setup
```bash
git clone https://github.com/erikpataki/IDHL-Technical-Test.git
cd IDHL-Technical-Test
npm install
```

### Development (live reload)
```bash
npm run dev
```
- Opens BrowserSync with live reload (default `http://localhost:3000`, falls back to the next free port if already in use)
- Watches SCSS/JS for changes and rebuilds automatically
- Press `Ctrl+C` to stop the server

### Production Build
```bash
npm run build
```
- Compiles SCSS, minifies CSS/JS, and outputs to `dist/`
- Open `dist/index.html` in any browser or serve it with your preferred static server

## Features
- Mobile-first responsive layout matching Figma designs
- Slide-out basket with 1-second loading animation
- Reusable SCSS component partials using BEM naming convention
- Uses Gulp as task runner
- No frameworks or third-party plugins

## Project Structure
```
src/
├── index.html
├── assets/
├── js/
│   ├── main.js
│   └── components/
│       └── basket.js
└── scss/
	├── style.scss
	├── _variables.scss
	└── _component-*.scss

dist/ (generated after build)
```

## Tooling
- Gulp task runner (`npm run dev`, `npm run build`)
- Sass for precompiled styles
- BrowserSync for live development

## Notes
- Basket content is intentionally pre-populated as per brief
- Additional products added to both page and basket to demonstrate scrolling capability. Please just comment out the extra ones if needed.
