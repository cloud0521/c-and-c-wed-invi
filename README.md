# Cloyd & Cyrin — Digital Wedding Invitation

A React, Vite, Tailwind CSS, and Framer Motion wedding experience.

## Local development

```powershell
npm install
npm run dev
```

The npm scripts invoke their local Node entry points directly. This keeps them
working on Windows even when a parent folder contains an ampersand (`&`).

## Production checks

```powershell
npm run lint
npm run build
npm run preview
```

## RSVP Google Sheets setup

The RSVP form posts to the Google Apps Script web app bound to the wedding
spreadsheet. The public deployment URL is configured in `src/lib/googleSheets.js`
and `.env.example`. Deploy the Apps Script to execute as the sheet owner and
allow guest submissions. The script appends submission time, the submitted
names, response, message, and guest count to the `Responses` tab. Keep the Sheet
itself private; the web app only accepts RSVP submissions. Use the spreadsheet
directly to review responses.

## Wedding content

The wedding data is in `src/data/weddings/cloyd-cyrin.ts`. Update the couple,
schedule, locations, entourage, notes, RSVP deadline, and brand signature there.
