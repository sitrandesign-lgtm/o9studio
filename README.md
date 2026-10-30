# o9studio

Responsive oNine Design Studio Home, implemented from the supplied Figma design. Plain HTML, CSS and JavaScript, with no runtime dependencies.

## Run locally

Requires Node.js 18 or newer. No dependency installation is needed.

```sh
npm start
```

Open http://127.0.0.1:4188/. Set `PORT` to use another local port.

Python alternative:

```sh
python3 -m http.server 4188 --bind 127.0.0.1
```

## Check and build

```sh
npm run check
npm run build
```

The build copies the static site into `dist/`, suitable for static hosting. Nothing is deployed automatically.

## Included behavior

- Full viewport hero with five supplied photographs, 900 ms crossfade, five-second slide timing, animated progress bullets, manual selection and pause/play.
- Autoplay pauses outside the hero, while the menu is open or the browser tab is hidden. Reduced-motion disables autoplay.
- Gallery images dissolve once when scrolled into view; gallery and Stay/Live hover overlays use 30% black and 200 ms easing.
- Underlined controls sweep their line once on hover, then restore the complete underline.
- White navigation appears beyond the hero when scrolling upward and hides when scrolling downward.
- Menu opener/close controls, EN/VI Home copy and Back to top work. Gallery, Read More, contact, menu destinations and other footer controls are visual-only as requested; they open no external links or popups.
- See All Projects scrolls to the gallery. The Bare Han gallery card opens the Work Detail page at `project.html` (Figma node `12:120`).

## Bare Han project detail

Open http://127.0.0.1:4188/project.html. Includes the project overview, full article, sticky project information on desktop, related projects, contact section and shared footer. The layout reflows for mobile. Menu, EN/VI copy, More Info and Back to top work; related projects return to the Home gallery because their individual detail pages are not included.

The three supplied Bare Han photographs support gallery buttons, arrow keys and touch swipes. The counter reflects the three available photos rather than the ten-image placeholder in Figma. Two new Figma photographs are stored as optimized local JPEGs; all assets work without temporary Figma URLs.

## Assets

All 13 raster images are optimized progressive JPG files; there are no PNG files. Main photography is capped at 2400 px, with JPEG quality 85. Award graphics are capped at 1200 px and composited onto their design background. Raster assets total approximately 8.1 MB, down from 61.3 MB. Per-file sizes are recorded in `image-optimization.json`.

SVG assets retain the supplied logos and icons. Local Acumin font files are included for the requested project; confirm the applicable web-font license before public hosting. Artwork, photography and brand assets remain subject to their owners’ rights. No open-source license is granted for supplied brand assets.

## Validation

JavaScript syntax and asset-reference checks pass. Local browser checks covered desktop and 390 px mobile layout, slideshow/progress controls, menu behavior, hover-only controls, no horizontal overflow and Back to top. This is a static prototype without form submission or backend services. The detail page also includes working email and telephone links.

Figma: https://www.figma.com/design/PDkiHZtJdrnSX4hLAbZVBm/O9-Studio?node-id=38-136
