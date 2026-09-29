/*
  Vouch pilot form receiver.
  1. Create a Google Sheet and copy its ID from the URL.
  2. In Extensions > Apps Script, paste this file.
  3. Set SPREADSHEET_ID, save, then Deploy > New deployment > Web app.
  4. Execute as you, allow anyone with the link, and paste the /exec URL into VITE_FORM_ENDPOINT.
*/
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HEREhttps://docs.google.com/spreadsheets/d/1NMAeGiuITUnwWZlj2so-zdAMtq0L0h7m_WbnsGhLCbA/edit?usp=sharing'
const SHEET_NAME = 'data'
const ADMIN_EMAIL = 'mohamedchedlybelkhir11@gmail.com'

function doPost(e) {
  try {
    const data = e.parameter || {}
    if (data.website) return json({ ok: true })
    const sheet = getSheet_()
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Type', 'Name', 'Business', 'Email', 'WhatsApp', 'City', 'Offer', 'Price', 'Commission', 'Demo', 'About', 'How they find buyers', 'Why they want in'])
    sheet.appendRow([new Date(), data.application_type || '', data.name || '', data.business || '', data.email || '', data.whatsapp || '', data.city || '', data.offer || '', data.price || '', data.commission || '', data.demo || '', data.about || '', data.find || '', data.why || ''])
    if (data.email) MailApp.sendEmail({ to: data.email, subject: 'We received your Vouch application', htmlBody: '<p>Thanks for applying to the Vouch pilot.</p><p>We will review your details and get back to you soon.</p><p>— The Vouch team</p>' })
    if (ADMIN_EMAIL && ADMIN_EMAIL.indexOf('PASTE_') !== 0) MailApp.sendEmail({ to: ADMIN_EMAIL, subject: 'New Vouch pilot application', body: `${data.application_type || 'Unknown'} application from ${data.name || 'Unknown'} (${data.email || 'no email'})` })
    return json({ ok: true })
  } catch (error) { return json({ ok: false, error: String(error) }) }
}

function doGet() { return json({ ok: true, service: 'vouch-forms' }) }
function getSheet_() { const book = SpreadsheetApp.openById(SPREADSHEET_ID); return book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME) }
function json(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON) }
