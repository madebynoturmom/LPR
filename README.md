# LPR App

A SvelteKit application for License Plate Recognition with OTP authentication.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Set up the database:
   ```sh
   npm run db:push
   ```

3. Configure email for OTP:

   **Option A: Gmail (Recommended for testing)**
   - Enable 2-factor authentication on your Gmail account
   - Generate an app password: https://support.google.com/accounts/answer/185833
   - Update `.env`:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=your-gmail@gmail.com
     SMTP_PASS=your-16-character-app-password
     ```

   **Option B: SendGrid**
   - Sign up at https://sendgrid.com
   - Get your API key from Settings > API Keys
   - Update `.env`:
     ```
     SMTP_HOST=smtp.sendgrid.net
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=apikey
     SMTP_PASS=your-sendgrid-api-key
     ```

   **Option C: Mailgun**
   - Sign up at https://mailgun.com
   - Get SMTP credentials from Domains > Select Domain > SMTP
   - Update `.env`:
     ```
     SMTP_HOST=smtp.mailgun.org
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=postmaster@your-domain.mailgun.org
     SMTP_PASS=your-mailgun-password
     ```

   **Test your email setup:**
   ```sh
   npm run test-email
   ```

   **Troubleshooting:**
   - **Gmail issues**: Make sure you use an App Password, not your regular password
   - **Connection errors**: Check firewall settings and port availability
   - **Authentication failed**: Verify credentials and try different ports (587/465)
   - **Rate limits**: Free tiers have sending limits (Gmail: 500/day, SendGrid: 100/day free)

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
