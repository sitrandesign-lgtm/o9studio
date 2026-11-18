# o9 Studio

Desktop portfolio with Home, Studio, Work, Services and Contact, plus individual project views. The design uses a desktop layout with a minimum width of 1024 px.

## Run locally

Requires Node.js 18 or later. No dependencies need to be installed.

```sh
npm run dev
```

Open [http://127.0.0.1:4188/](http://127.0.0.1:4188/). Set `PORT` to use a different port. Run `npm run check` to validate the scripts and image references or `npm run build` to build the static site in `dist/`.

The Contact forms save submissions and attachments in IndexedDB in the current browser. The local site has no email or server-side submission service.
