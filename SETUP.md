# Victa Discovery Intake - Setup Guide

## 1. Install dependencies and run locally

```bash
cd victa-security-website
npm install
cp .env.example .env
npm start
```

Open http://localhost:3000/intake/test-client to preview the form.

## 2. Google Sheet + Apps Script

1. Open your Google Sheet: **Victa Discovery Intake Responses**
2. **Extensions > Apps Script**
3. Replace all code with the contents of `apps-script/Code.gs`
4. **Save**, then reload the spreadsheet
5. You should see a **Victa Intake** menu in the menu bar
6. Click **Victa Intake > Setup sheets** (creates **Responses** and **Clients** tabs)

### Script properties (Project Settings > Script properties)

| Property | Required | Example |
|----------|----------|---------|
| `INTAKE_SECRET` | Yes | long random string (same as Vercel `REACT_APP_INTAKE_SECRET`) |
| `INTAKE_BASE_URL` | No | `https://www.victasecuritysolutions.com/intake` (default if omitted) |

### Deploy web app

1. **Deploy > New deployment > Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Copy the URL (ends in `/exec`) into Vercel and local `.env` as `REACT_APP_INTAKE_ENDPOINT`

## 3. Deploy the website (Vercel)

Set in **Vercel > Project > Settings > Environment Variables**:

- `REACT_APP_INTAKE_ENDPOINT`
- `REACT_APP_INTAKE_SECRET`

Redeploy after saving. Test: https://www.victasecuritysolutions.com/intake/test-client

## 4. New client workflow (no manual link building)

Use the **Clients** tab in your Google Sheet:

### Option A — type in the sheet

1. Open the **Clients** tab
2. Type the client name in **Client Name** (column A)
3. **Client Slug** and **Intake Link** fill in automatically
4. Copy the link from column C into your email

### Option B — menu shortcut

1. **Victa Intake > Add new client…**
2. Enter name (and optional email)
3. A dialog shows the ready-to-copy intake link

When the client submits the form, filter **Responses** by `client_slug` to review their answers.

See `CLIENT_EMAIL.md` for email copy.

## 5. Connect Google to Cursor (optional)

See previous MCP setup in `.cursor/mcp.json` if you want to sync discovery questions from a Google Doc.

## Updating form questions

Edit `src/data/discoveryQuestions.js`. If you add/remove fields, update `RESPONSE_HEADERS` and `mapPayloadToRow_` in `apps-script/Code.gs`.
