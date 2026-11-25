# ELARQUE

AI creative studio for skincare and beauty brands. Ads, Reels, social content and landing pages, created with AI under strict art direction. No studio, no camera.

## 1. Running locally

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

To verify TypeScript types and create a production build:

```bash
npm run lint
npm run build
```

## 2. Updating contact and site URL placeholders

All contact placeholders are centralized in `src/config.ts`:

- `WHATSAPP_NUMBER`: International phone digits only (no `+` or spaces, e.g. `'212652700293'`).
- `CONTACT_EMAIL`: Studio contact email (e.g. `'hello@elarque.studio'`).
- `SITE_URL`: Live canonical domain (e.g. `'https://elarque.studio'`). Also update `<link rel="canonical">`, `og:url` in `index.html`, `public/sitemap.xml`, and `public/robots.txt` to match.
- `INSTAGRAM_URL`: Studio Instagram profile URL.

The lead form has **no backend** — see [Contact via WhatsApp](#contact-via-whatsapp).

## Contact via WhatsApp

The final CTA form (“Request my free 3-concept sample”) does not post to a server or spreadsheet. On submit it opens WhatsApp with a pre-filled lead message to the studio number.

- The number lives in `src/config.ts` → `SITE_CONFIG.WHATSAPP_NUMBER` (international digits only, no `+`).
- If the visitor has no product page link, the pre-filled message says an image will follow on WhatsApp.
- The number is compiled into the bundle: changing it requires a rebuild/redeploy.

## 3. Replacing placeholder portfolio images

All portfolio studies and hero frames are controlled from `src/data/portfolio.ts`:

1. Drop your final project images (WebP/AVIF or JPEG recommended) into `public/portfolio/`.
2. Update each item's `image` path in `src/data/portfolio.ts` (for example `'/portfolio/velora-serum.webp'`), adjust `width` and `height`, and set `isPlaceholder` to `false`.
3. Update `note` (`concept`, `hook`, `whyItWorks`) and `brandName` to reflect the real engagement.

## 4. Deploying (Vercel or Netlify)

### Vercel

1. Push the repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Keep the detected Vite defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy.

### Netlify

1. Connect the repository in Netlify.
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy.
