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
- **Hero video:** the homepage plays `assets/hero-720.mp4` — a compressed, audio-free
  720p loop. Don't ship raw phone footage (it can be 50+ MB). Compress a new clip with:

  ```bash
  # 720p H.264, no audio, faststart so it streams progressively
  ffmpeg -i source.mov -vf "scale=1280:-2" -an \
    -c:v libx264 -crf 24 -preset veryslow -pix_fmt yuv420p \
    -movflags +faststart assets/hero-720.mp4

  # first-frame poster (shows instantly while the video loads)
  ffmpeg -ss 1 -i source.mov -frames:v 1 -vf "scale=1920:-2" assets/hero-poster.jpg
  ```
- **Merch:** products live in `merch.html` as Snipcart `data-item-*` attributes.

## Deploy

Connected to Netlify — pushes to `main` deploy automatically. Domain: [westbound-band.ca](https://westbound-band.ca).
