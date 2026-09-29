# Google Sheets + email setup

The Vouch forms are already wired to send a `POST` request to `VITE_FORM_ENDPOINT`. The included `google-apps-script/Code.gs` stores applications in a Google Sheet and sends an automatic confirmation email to the applicant.

1. Create a Google Sheet.
2. Copy the ID between `/d/` and `/edit` in its URL.
3. Open **Extensions → Apps Script**, paste `google-apps-script/Code.gs`, and set `SPREADSHEET_ID` and `ADMIN_EMAIL`.
4. Deploy as a **Web app**, execute as yourself, and allow anyone with the link.
5. Put the deployed `/exec` URL in `.env` as `VITE_FORM_ENDPOINT=...`.
6. Restart the Vite server and test one business and one seller submission.

The browser does not contain Google credentials. The Apps Script deployment is the secure boundary that writes to the sheet and sends the email.
