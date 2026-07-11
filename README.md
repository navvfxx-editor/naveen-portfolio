# Naveen — Cinematic Video Editor Portfolio

A React + Vite frontend (deploy on **Netlify**) with a custom **Node/Express +
PostgreSQL** backend (deploy on **Render**). No Firebase involved. Fully
owner-editable through a protected `/admin` panel — no code changes needed
for day-to-day content updates.

```
video-portfolio/
├── src/            ← React frontend (deploy this to Netlify)
├── server/         ← Express + Prisma + PostgreSQL API (deploy this to Render)
└── README.md
```

---

## 1. Backend setup (`/server`)

### 1a. Install dependencies

```bash
cd server
npm install
```

### 1b. Get a PostgreSQL database

Easiest path — create it directly on Render (free tier available):

1. [dashboard.render.com](https://dashboard.render.com) → **New → PostgreSQL** → give it a name → Create.
2. Once it's ready, copy the **"External Database URL"** (for running locally) — you'll use the **"Internal Database URL"** later when the API itself runs on Render.

(Alternatively, run Postgres locally or use any hosted Postgres — Supabase, Neon, Railway, etc. — anything that gives you a `DATABASE_URL` connection string works.)

### 1c. Configure environment variables

```bash
cp .env.example .env
```

Fill in `.env`:

```
DATABASE_URL=<your Postgres connection string>
JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))">
OWNER_EMAIL=navv.fxx@gmail.com
OWNER_PASSWORD=<choose a strong password>
FRONTEND_URL=http://localhost:5173
PUBLIC_URL=http://localhost:4000
PORT=4000
```

### 1d. Create the database tables

```bash
npx prisma migrate dev --name init
```

### 1e. Create the ONE owner account + seed default content

There is **no signup route on purpose** — only one account can ever exist.

```bash
npm run seed
```

This creates the single admin login (`OWNER_EMAIL` / `OWNER_PASSWORD` from
`.env`) and seeds sensible default content (Naveen's info, default services,
FAQs) so the site isn't empty on first run.

### 1f. Run the backend locally

```bash
npm run dev
```

API now runs at `http://localhost:4000`. Test it: open `http://localhost:4000/health` — should return `{"ok":true}`.

---

## 2. Frontend setup (project root)

```bash
npm install
cp .env.example .env
```

`.env`:
```
VITE_API_URL=http://localhost:4000
```

```bash
npm run dev
```

Visit `http://localhost:5173`. The public site works with default content
immediately; log into `/admin/login` with the owner email/password from step
1e to start editing everything for real.

---

## 3. Deploying the backend to Render

### Option A — One-click blueprint

`server/render.yaml` already describes the web service + database. In the
Render dashboard: **New → Blueprint** → connect your repo → Render reads
`render.yaml` and provisions the Postgres DB + API together. You'll be asked
to fill in `OWNER_PASSWORD`, `FRONTEND_URL`, and `PUBLIC_URL` (your Render
service's own URL, e.g. `https://naveen-portfolio-api.onrender.com`) during
setup.

### Option B — Manual

1. Push your code to GitHub.
2. Render dashboard → **New → Web Service** → connect the repo → set **Root Directory** to `server`.
3. Build command: `npm install && npx prisma migrate deploy`
4. Start command: `npm start`
5. Add the same environment variables as your local `.env` (use the **Internal Database URL** from your Render Postgres for `DATABASE_URL`, and set `PUBLIC_URL`/`FRONTEND_URL` to the real deployed URLs).
6. Once live, SSH/shell into the service (Render dashboard → Shell) and run `npm run seed` once, to create the owner account.

### ⚠️ File uploads on Render's free tier

Render's free web services use an **ephemeral filesystem** — uploaded
images/videos in `server/uploads` will be wiped on every redeploy or restart.
For production, either:
- Attach a **Render Disk** (paid, persistent storage) mounted at `server/uploads`, or
- Swap the upload route to a cloud storage provider (Cloudinary, AWS S3, Backblaze B2) instead of local disk — ask if you'd like this wired up.

This doesn't affect local development or a quick demo — just long-term media persistence in production.

---

## 4. Deploying the frontend to Netlify

1. Push to GitHub (if not already).
2. [netlify.com](https://netlify.com) → **Add new site → Import an existing project** → pick your repo.
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Site settings → Environment variables** → add:
   ```
   VITE_API_URL=https://naveen-portfolio-api.onrender.com
   ```
   (your real Render backend URL)
5. Deploy. Then go back to your **Render backend's** environment variables and set `FRONTEND_URL` to your new Netlify URL (e.g. `https://naveen-portfolio.netlify.app`) so CORS allows it — redeploy the backend after changing this.

A `netlify.toml` is included so React Router's client-side routes (like
`/admin/login`) work correctly on refresh/direct visits.

---

## Notes on the Contact page

- WhatsApp, Instagram, and Email icons use real deep links (`wa.me/<number>`,
  the Instagram profile URL, and `mailto:`), and show the owner's name on
  hover/focus. Edit all three from **Admin → Contact Info** any time.

## Notes on Short Form / Long Form videos

- Every portfolio project has a `type` of `shorts` or `long` plus a YouTube
  Video ID, added from **Admin → Portfolio**.
- Videos **play inline** via a `youtube-nocookie.com` embed — clicking a
  thumbnail never redirects to youtube.com.

## Owner-only editing, enforced on the server

The frontend never decides who's an admin — the **backend** does. Since only
one row can ever exist in the `AdminUser` table (created once via `npm run
seed`, no signup route exists), any valid login token always belongs to the
owner. Every write endpoint (`POST`/`PUT`/`DELETE` under `/api/content` and
`/api/items`, plus `/api/upload`) requires that token; all `GET` endpoints
are public so the site itself renders for visitors.

## Production build (frontend)

```bash
npm run build
npm run preview   # preview the production build locally
```

## Known simplifications

- Home page stats and About page skill bars ship with solid defaults but
  don't yet have their own admin sub-forms (everything else — Portfolio,
  Services, Testimonials, FAQ, Contact Info, Settings, Messages — is fully
  CRUD-editable from `/admin`).
- "Live" admin dashboard counts poll the API every 8 seconds rather than
  using a real-time push connection (kept intentionally simple for a REST
  backend). Ask if you'd like a WebSocket-based live version instead.
