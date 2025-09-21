
# LPR (Residence Access Management)

This repository contains a SvelteKit application for residence/visitor access management with the following core features:

- Role-based authentication: admins and residents use email OTPs; guards authenticate using a username + password.
- Guest pass management (create, expire, revoke).
- Guard dashboard and settings (change password, update profile picture).
- File uploads saved to `static/uploads` and user/profile images.
- SQLite (via Drizzle ORM) for local/dev persistence.

This README is a practical guide for developers and operators: how to run the app in dev, build for production, and common deployment notes (nginx + Let's Encrypt, systemd / pm2).

## Quick start

1. Clone the repo and install dependencies

```bash
git clone https://github.com/madebynoturmom/LPR.git
cd LPR
npm ci
```

2. Set environment variables

Create a `.env` file in the project root with at least the SMTP settings and app secret; example (replace values):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
SESSION_SECRET=some-long-random-secret
BASE_URL=http://localhost:5173
```

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Important scripts

The project uses scripts defined in `package.json`. Useful ones:

- npm ci            # install dependencies
- npm run dev       # start dev server (vite)
- npm run build     # produce a production build
- npm run preview   # preview the production build locally
- npm run start     # run the production build (runs 'node build')
- npm run check     # runs svelte-check + ts checks
- npm run test      # runs unit and e2e tests (vitest + playwright)
- npm run db:push   # apply Drizzle DB schema changes
- npm run test-email # sends a test email using configured SMTP

Use `npm run` to list all available scripts.

## Environment variables

At minimum, set these for a functioning app in dev or prod:

- SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS — SMTP settings (used for OTP email delivery)
- SESSION_SECRET — secret for session token signing
- BASE_URL — public base URL the app will be served at (used in email links)

Optional/Helpful variables:

- NODE_ENV=production
- DATABASE_URL= file path or connection string for your SQLite / other DB

## Database

This project uses Drizzle ORM with SQLite for local development. Migrations & schema utilities are available through `drizzle-kit` scripts in `package.json`:

- npm run db:push      # apply schema changes
- npm run db:migrate   # create a migration
- npm run db:generate  # generate types/artifacts

Backups: For production, do regular backups of your SQLite DB file or migrate to a more robust DB (Postgres) and update the `DATABASE_URL`.

## Deployment notes (nginx + HTTPS)

We recommend running the SvelteKit production build behind a reverse proxy (nginx) with TLS terminated at nginx (Let's Encrypt).

High-level steps:

1. Build the app on the server:

```bash
npm ci
npm run build
```

2. Run the app (example using node):

```bash
# from the repo root
node build
# or use a process manager (recommended)
# systemd or pm2 example in this repo's docs
```

3. nginx site (example):

Make sure your nginx site proxies traffic to the app and forwards the proto header:

```
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
```

4. Obtain certs with certbot:

```bash
sudo certbot --nginx -d lprapp.online -d www.lprapp.online
```

Notes:
- Keep `/etc/letsencrypt` and nginx site definitions outside the app folder so redeploys won't remove certs.
- Ensure Security Group / firewall allows inbound 80 and 443.
- Ensure nginx includes `proxy_set_header X-Forwarded-Proto $scheme;` so the app can mark cookies as Secure when appropriate.

## Running on boot (systemd example)

Create a unit file `/etc/systemd/system/lprapp.service` (adjust paths):

```ini
[Unit]
Description=LPR App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/lpr-app
ExecStart=/usr/bin/node build
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable lprapp
sudo systemctl start lprapp
sudo systemctl status lprapp
```

Or use pm2 if preferred:

```bash
pm2 start npm --name lprapp -- start
pm2 save
```

## Troubleshooting

- Cookies not set in browser: ensure the site is served over HTTPS and nginx sets `X-Forwarded-Proto`. Browsers refuse cookies with the Secure flag on plain HTTP.
- OTP emails not delivered: verify SMTP credentials and network firewall; run `npm run test-email`.
- 502/504 from nginx: ensure the app process is running and listening on the upstream (e.g., localhost:3000 or port configured).
- CSP / hydration warnings: the app currently uses a pragmatic CSP to avoid SvelteKit hydration issues; consider tightening CSP with nonces in production.

## Contributing

Please open issues or PRs for bugs and features. Tests use `vitest` and the E2E suite uses Playwright.

## License

This project is provided as-is. Check the repository for an explicit license file.

---

If you'd like, I can also add an example `systemd` unit file into the `deploy/` folder and a step-by-step deploy script that clones to a releases folder and switches a symlink for zero-downtime redeploys.
