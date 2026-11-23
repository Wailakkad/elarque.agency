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

- `WHATSAPP_NUMBER`: International phone digits only (no `+` or spaces, e.g. `'33612345678'`).
- `CONTACT_EMAIL`: Studio contact email (e.g. `'hello@elarque.studio'`).
- `SITE_URL`: Live canonical domain (e.g. `'https://elarque.studio'`). Also update `<link rel="canonical">`, `og:url` in `index.html`, `public/sitemap.xml`, and `public/robots.txt` to match.
- `INSTAGRAM_URL`: Studio Instagram profile URL.

The form endpoint is **not** in `config.ts` — see [Form to Google Sheets](#form-to-google-sheets).

## Form to Google Sheets

The final CTA form (“Request my free 3-concept sample”) posts submissions to a **Google Apps Script web app**, which appends a row to a Google Sheet.

### How it works

1. The browser sends `POST` with `application/x-www-form-urlencoded` body (`URLSearchParams`) to the Apps Script `/exec` URL.
2. Fields: `name`, `email`, `brand`, `product`, `message`, `lang`, `page`, `company_website` (honeypot).
3. The script replies with JSON: `{"ok": true}` on success or `{"ok": false, "error": "..."}` on failure.
4. No custom `Content-Type` header is set — Apps Script does not support the CORS preflight that JSON would trigger.

### Where to change the URL

- Local: set `VITE_SHEETS_ENDPOINT` in `.env` (copy the pattern from `.env.example`).
- Deployed: set the same variable in your host’s environment (Vercel/Netlify env vars), then rebuild.
- `src/config.ts` reads it as `SHEETS_ENDPOINT` via `import.meta.env.VITE_SHEETS_ENDPOINT`.
- `.env` is gitignored; never commit the live endpoint if your repo is public (the URL alone only accepts writes if the script is deployed as anyone).

### After editing the Apps Script

1. Open the Apps Script project.
2. **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.**
3. Copy the new `/exec` URL into `.env` if it changed.
4. Redeploy the site so the build picks up the new value.

### Keep the sheet private

- Share the Google Sheet only with editors who need access (not “anyone with the link”).
- The Apps Script runs under the deployer’s account; limit who can edit the script.
- Do not expose service-account keys or sheet IDs in client code.

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
