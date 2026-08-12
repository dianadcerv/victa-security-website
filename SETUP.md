# Victa Discovery Intake - Setup Guide

## 1. Install dependencies and run locally

```bash
cd victa-security-website
npm install
cp .env.example .env
npm start
```

Open http://localhost:3000/intake/test-client?interest=multiple-services to preview an interest-specific link.

## 2. Google Sheet + Apps Script

1. Open your Google Sheet: **Victa Discovery Intake Responses**
2. **Extensions > Apps Script**
3. Replace `Code.gs` with `apps-script/Code.gs`
4. **File > New > Script file** named `SchemaSync` — paste `apps-script/SchemaSync.gs`
5. **Save**, then reload the spreadsheet
6. **Victa Intake > Setup sheets**
7. **Victa Intake > Sync intake schemas now** (finds your Intake Form Docs by title)
8. **Victa Intake > Install 5-min schema sync**

### Script properties (Project Settings > Script properties)

| Property | Required | Example |
|----------|----------|---------|
| `INTAKE_SECRET` | Yes | long random string (same as Vercel `REACT_APP_INTAKE_SECRET`) |
| `INTAKE_BASE_URL` | No | `https://www.victasecuritysolutions.com/intake` (use `http://localhost:3000/intake` for local link tests) |
| `NOTIFY_EMAIL` | No | your email — gets a message when the Request Form creates a lead |

### Deploy web app

1. **Deploy > New deployment > Web app** (or **Manage deployments** → edit → **New version**)
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Copy the URL (ends in `/exec`) into Vercel and local `.env` as `REACT_APP_INTAKE_ENDPOINT`

After any Apps Script change, create a **new deployment version**.

### Verify schema API

Open in a browser (replace with your deployment URL and interest):

```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=schema&interest=multiple-services
```

You should see JSON with `"success": true` and a `sections` array.

## 3. Doc → website sync (no redeploy for question edits)

| Primary Interest | Google Doc title |
|------------------|------------------|
| Physical Security Assessment | Intake Form - Physical Security Assessment |
| Security Laminate / Glass Hardening | Intake Form - Security Laminate / Glass Hardening |
| Ballistic Panels | Intake Form - Ballistic Panels |
| Multiple Services | Intake Form - Multiple Services |
| Other | Intake Form - General |

1. Edit the matching Google Doc (see `DOC_TEMPLATE.md` for formatting).
2. Within ~5 minutes the **Schemas** sheet updates (or run **Sync intake schemas now**).
3. Next prospect who opens the intake link sees the new questions in Victa branding.

The website loads: `REACT_APP_INTAKE_ENDPOINT?action=schema&interest=…`  
If sync has not run yet, it falls back to built-in `discoveryQuestions.js`.

## 4. Deploy the website (Vercel)

Set:

- `REACT_APP_INTAKE_ENDPOINT`
- `REACT_APP_INTAKE_SECRET`

Redeploy after saving. Redeploy is only needed for **code** changes — not for Doc question edits after sync is installed.

## 5. Lead → intake link workflow

When someone submits **Schedule Assessment**:

1. Apps Script creates/updates a **Clients** row  
2. **Intake Link** includes `?interest=…`  
3. Optional `NOTIFY_EMAIL` sends you the link  
4. Prospect opens the link → questions load from the synced Doc for that interest  

## 6. Updating code vs Docs

| Change | Where | Redeploy site? |
|--------|--------|----------------|
| Question text / options / sections | Google Doc | No (wait ≤5 min or Sync now) |
| Request Form interest labels | `src/data/interestMap.js` + `Code.gs` INTEREST_TEMPLATES | Yes |
| Branding / layout of form shell | React components | Yes |
