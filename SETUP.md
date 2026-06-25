# Victa Discovery Intake - Setup Guide

This guide walks you through connecting Google, deploying the intake backend, and sending your first client link.

## 1. Install dependencies and run locally

```bash
cd victa-security-website
npm install
cp .env.example .env
npm start
```

Open http://localhost:3000/intake/test-client to preview the form.

## 2. Google Sheet + Apps Script (stores responses automatically)

1. Create a new Google Sheet: **Victa Discovery Intake Responses**
2. Go to **Extensions > Apps Script**
3. Replace the default code with the contents of `apps-script/Code.gs`
4. Open **Project Settings > Script properties** and add:
   - `INTAKE_SECRET` = a long random string (e.g. from a password generator)
5. **Deploy > New deployment > Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the Web App URL (ends in `/exec`)
7. In your local `.env` file set:
   - `REACT_APP_INTAKE_ENDPOINT` = the Web App URL
   - `REACT_APP_INTAKE_SECRET` = same value as `INTAKE_SECRET`

Test: submit the form locally and confirm a new row appears in the Sheet.

## 3. Deploy the website

Push changes to GitHub and deploy using your existing pipeline for victasecuritysolutions.com.

**Important:** Set `REACT_APP_INTAKE_ENDPOINT` and `REACT_APP_INTAKE_SECRET` in your hosting provider environment variables before building.

After deploy, verify: https://www.victasecuritysolutions.com/intake/test-client

## 4. Connect Google to Cursor (optional, for reading your discovery Doc)

1. Create a Google Cloud project and enable Drive, Docs, and Sheets APIs
2. Create OAuth Desktop credentials
3. Add to `C:\Users\Diana\.cursor\mcp.json`:

```json
{
  "mcpServers": {
    "google-mcp": {
      "command": "npx",
      "args": ["-y", "@chieflatif/google-mcp"],
      "env": {
        "MCP_CORE_TOOLS": "1",
        "GOOGLE_CLIENT_ID": "YOUR_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET": "YOUR_CLIENT_SECRET"
      }
    }
  }
}
```

4. Restart Cursor, enable the MCP server, and complete OAuth in Agent mode

## 5. Send a link to a new client

1. Choose a client slug, e.g. `acme-corp`
2. Send this link:

   `https://www.victasecuritysolutions.com/intake/acme-corp`

3. When they submit, filter the Sheet by `client_slug` = `acme-corp`

See `CLIENT_EMAIL.md` for a ready-to-send email template.

## Updating form questions

Edit `src/data/discoveryQuestions.js` to match your Google Doc. If you add/remove fields, also update `apps-script/Code.gs` header row and `mapPayloadToRow_`.