# Westbound — Website

Static band website deployed on Netlify. No build step required — the folder deploys directly.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Use a local server (not `file://`) so Snipcart and relative paths behave like production.

---

## TODO: Swap placeholder content

### Social links
Search all HTML files for `TODO: real link` and replace the `href="#"` with:
- Spotify artist URL: `https://open.spotify.com/artist/...`
- Instagram URL: `https://www.instagram.com/westboundband`

### Snipcart API key + currency
1. Create a free account at [snipcart.com](https://snipcart.com) and connect Stripe
2. **Set default currency to CAD:** Snipcart dashboard → Settings → Regional → Default currency → `CAD`
   (prices in the HTML are just numbers — the currency symbol/code comes from this setting)
3. The **Public Live API Key** is already set in the `#snipcart` div of all three HTML files.
   (Swap to a Public Test key if you want to test without real charges.)

### SEO / domain
The site is configured for the domain **`https://westbound-band.ca`** across the SEO tags,
`robots.txt`, and `sitemap.xml`. If the domain ever changes, find-and-replace it everywhere:
```bash
grep -rl "westbound-band.ca" . | xargs sed -i '' 's#westbound-band.ca#NEW-DOMAIN#g'
```
After launch, submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
The social share image is `assets/og-image.svg` — for best results across platforms, replace it
with a 1200×630 **JPG/PNG** (some scrapers don't render SVG) and update the `og:image` / `twitter:image` URLs.

### Band info (index.html)
- Hero subtitle: year the band was formed
- About blurb: 2–4 sentence bio
- Member cards: real names and one-line bios

### Shows (js/shows.js)
Edit the `SHOWS` array at the top of the file — each entry:
```js
{
  date: '2025-09-12',        // ISO date string (YYYY-MM-DD)
  venue: 'The Horseshoe Tavern',
  city: 'Toronto, ON',
  ticketUrl: 'https://...',  // real ticket URL, or null
  soldOut: false,
}
```
Past shows are automatically hidden from the page. No HTML editing needed.

### Images
Replace placeholder SVGs with real photos:
| Placeholder file       | Replace with              | Size      |
|------------------------|---------------------------|-----------|
| `assets/band-photo.svg`| `assets/band-photo.jpg`   | 1920×1080 |
| `assets/merch-tee.svg` | `assets/merch-tee.jpg`    | 1:1 square|
| `assets/og-image.svg`  | `assets/og-image.jpg`     | 1200×630  |

After replacing, update the `src` attributes in the HTML files to use the `.jpg` extension.

### Videos
Add real live footage:
| File path              | Used for               | Target size    |
|------------------------|------------------------|----------------|
| `assets/hero.mp4`      | Full-page hero loop    | < 8 MB, 5–15s  |
| `assets/hero.webm`     | Hero (smaller, optional)| < 5 MB        |
| `assets/clip-1.mp4`    | Gallery clip 1         | < 4 MB, 5–15s  |
| `assets/clip-2.mp4`    | Gallery clip 2         | < 4 MB, 5–15s  |
| `assets/clip-3.mp4`    | Gallery clip 3         | < 4 MB, 5–15s  |

**Compress tip:** Use HandBrake or FFmpeg to strip audio and encode H.264:
```bash
ffmpeg -i input.mov -an -vcodec libx264 -crf 26 -preset slow assets/hero.mp4
```

If traffic grows and Netlify bandwidth becomes an issue (free tier: ~100 GB/mo),
host videos externally on Cloudflare Stream, Mux, or as unlisted YouTube embeds.

---

## Deploy to Netlify

### Option 1 — Drag and drop (easiest)
1. Zip the `westbound_website` folder
2. Go to [netlify.com](https://app.netlify.com) → Sites → drag the zip in

### Option 2 — Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy          # draft preview URL
netlify deploy --prod   # go live
```

### Option 3 — Git (auto-deploy on push)
1. Push this folder to a GitHub repo
2. In Netlify dashboard → New site → Import from GitHub → select repo
3. Leave build command blank; publish directory: `.`
4. Every `git push` to main deploys automatically

---

## Snipcart: Test → Live checklist
- [ ] All `data-item-url` values updated to production URL
- [ ] API key swapped from Test to Live key in all 3 HTML files
- [ ] Stripe connected in Snipcart dashboard
- [ ] Shipping rates configured
- [ ] Test a real purchase end-to-end before announcing
