# Westbound

Promotional website for Westbound, a Toronto band. Static HTML/CSS/JS — no build step. Deployed on Netlify.

## Local preview

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Structure

- `index.html` — home, about, live videos, social links
- `shows.html` — upcoming shows (edit the `SHOWS` array in `js/shows.js`)
- `merch.html` — merch shop (Snipcart)
- `css/`, `js/`, `assets/` — styles, scripts, media

## Editing

- **Shows:** edit `SHOWS` in `js/shows.js`. Past dates hide automatically.
- **Media:** replace placeholder `.svg`/video files in `assets/` with real ones.
- **Merch:** products live in `merch.html` as Snipcart `data-item-*` attributes.

## Deploy

Connected to Netlify — pushes to `main` deploy automatically. Domain: [westbound-band.ca](https://westbound-band.ca).
