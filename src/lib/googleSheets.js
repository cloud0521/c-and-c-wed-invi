const GOOGLE_SHEETS_WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL
  || 'https://script.google.com/macros/s/AKfycbxpyMLhcWgSyzWQs8ksvVwGEzy6_dGshMJXcC-aEnIvCz-pg7EtvPMSeG5plPj0nZU8qw/exec';

export async function submitRsvpToGoogleSheets(data) {
  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    throw new Error('The Google Sheets RSVP endpoint is not configured.');
  }

  // Apps Script does not provide configurable CORS headers. A text/plain JSON
  // POST avoids preflight; no-cors lets the browser send it without reading the
  // cross-origin response body.
  await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data),
  });
}
