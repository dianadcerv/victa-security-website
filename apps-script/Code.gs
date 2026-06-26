/**
 * Victa Security - Discovery Intake Handler
 *
 * Setup:
 * 1. Open your Google Sheet (Victa Discovery Intake Responses)
 * 2. Extensions > Apps Script — paste this file
 * 3. Script properties: INTAKE_SECRET (required), INTAKE_BASE_URL (optional)
 * 4. Run setupAllSheets once, or use menu: Victa Intake > Setup sheets
 * 5. Deploy > Web app (Execute as: Me, Access: Anyone)
 * 6. Copy Web App URL to REACT_APP_INTAKE_ENDPOINT in Vercel / .env
 */

const RESPONSES_SHEET = 'Responses';
const CLIENTS_SHEET = 'Clients';
const DEFAULT_INTAKE_BASE_URL = 'https://www.victasecuritysolutions.com/intake';

const RESPONSE_HEADERS = [
  'submitted_at',
  'client_slug',
  'organization',
  'industry',
  'employee_count',
  'facility_count',
  'contact_name',
  'contact_title',
  'contact_email',
  'contact_phone',
  'decision_makers',
  'primary_location',
  'building_type',
  'public_access',
  'operating_hours',
  'facility_description',
  'access_control',
  'surveillance',
  'perimeter_glazing',
  'security_staff',
  'alarm_monitoring',
  'security_software',
  'compliance_requirements',
  'security_concerns',
  'past_incidents',
  'threat_profile',
  'primary_interest',
  'session_goals',
  'timeline',
  'budget_range',
  'additional_notes',
];

const CLIENT_HEADERS = [
  'Client Name',
  'Client Slug',
  'Intake Link',
  'Contact Email',
  'Discovery Date',
  'Status',
];

function getIntakeBaseUrl_() {
  const configured = PropertiesService.getScriptProperties().getProperty('INTAKE_BASE_URL');
  return (configured || DEFAULT_INTAKE_BASE_URL).replace(/\/$/, '');
}

function slugify_(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildIntakeLink_(slug) {
  if (!slug) return '';
  return getIntakeBaseUrl_() + '/' + slug;
}

function getResponsesSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(RESPONSES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(RESPONSES_SHEET);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(RESPONSE_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getClientsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CLIENTS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(CLIENTS_SHEET);
  }
  return sheet;
}

function setupClientsSheet_() {
  const sheet = getClientsSheet_();
  sheet.clear();
  sheet.getRange(1, 1, 1, CLIENT_HEADERS.length).setValues([CLIENT_HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, CLIENT_HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#0f172a')
    .setFontColor('#f8fafc');
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 420);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 120);
  sheet.getRange('C:C').setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  sheet.getRange('A2').setNote('Type the client or company name — slug and link fill in automatically.');
  sheet.getRange('B2').setNote('Auto-generated from Client Name. Edit only if you need a custom slug.');
  sheet.getRange('C2').setNote('Copy this link into your client email.');
  SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(sheet);
}

function setupAllSheets() {
  getResponsesSheet_();
  setupClientsSheet_();
  SpreadsheetApp.getUi().alert(
    'Sheets ready.\n\n' +
    '• Responses — form submissions land here automatically\n' +
    '• Clients — type a name in column A; slug and intake link appear in B and C'
  );
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Victa Intake')
    .addItem('Setup sheets', 'setupAllSheets')
    .addItem('Add new client…', 'addNewClient')
    .addItem('Refresh all intake links', 'refreshAllClientLinks')
    .addToUi();
}

function onEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== CLIENTS_SHEET) return;

  const row = e.range.getRow();
  if (row < 2) return;

  const col = e.range.getColumn();
  const value = typeof e.value === 'string' ? e.value.trim() : '';

  if (col === 1) {
    if (!value) {
      sheet.getRange(row, 2, 1, 2).clearContent();
      return;
    }
    const slug = slugify_(value);
    sheet.getRange(row, 2).setValue(slug);
    sheet.getRange(row, 3).setValue(buildIntakeLink_(slug));
  } else if (col === 2) {
    const slug = slugify_(value);
    if (slug !== value) {
      sheet.getRange(row, 2).setValue(slug);
    }
    sheet.getRange(row, 3).setValue(buildIntakeLink_(slug));
  }
}

function addNewClient() {
  const ui = SpreadsheetApp.getUi();
  const nameResponse = ui.prompt('Add new client', 'Client or company name:', ui.ButtonSet.OK_CANCEL);
  if (nameResponse.getSelectedButton() !== ui.Button.OK) return;

  const name = nameResponse.getResponseText().trim();
  if (!name) {
    ui.alert('Please enter a client name.');
    return;
  }

  const emailResponse = ui.prompt(
    'Contact email (optional)',
    'Leave blank to skip:',
    ui.ButtonSet.OK_CANCEL
  );
  if (emailResponse.getSelectedButton() !== ui.Button.OK) return;

  const email = emailResponse.getResponseText().trim();
  const slug = slugify_(name);
  const link = buildIntakeLink_(slug);

  const sheet = getClientsSheet_();
  if (sheet.getLastRow() === 0) {
    setupClientsSheet_();
  } else if (sheet.getRange(1, 1).getValue() !== 'Client Name') {
    setupClientsSheet_();
  }

  const nextRow = Math.max(sheet.getLastRow(), 1) + 1;
  sheet.getRange(nextRow, 1, 1, 6).setValues([[
    name,
    slug,
    link,
    email,
    new Date(),
    'Active',
  ]]);

  ui.alert(
    'Client added.\n\n' +
    'Intake link (copy for email):\n' + link
  );
}

function refreshAllClientLinks() {
  const sheet = getClientsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No clients yet. Add a name in the Clients tab or use Add new client.');
    return;
  }

  const slugs = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  const links = slugs.map(function (row) {
    return [buildIntakeLink_(slugify_(row[0] || ''))];
  });
  sheet.getRange(2, 3, links.length, 1).setValues(links);

  SpreadsheetApp.getUi().alert('Refreshed ' + links.length + ' intake link(s).');
}

function mapPayloadToRow_(data) {
  return [
    data.submittedAt || new Date().toISOString(),
    data.clientSlug || 'unspecified',
    data.organization || '',
    data.industry || '',
    data.employeeCount || '',
    data.facilityCount || '',
    data.contactName || '',
    data.contactTitle || '',
    data.contactEmail || '',
    data.contactPhone || '',
    data.decisionMakers || '',
    data.primaryLocation || '',
    data.buildingType || '',
    data.publicAccess || '',
    data.operatingHours || '',
    data.facilityDescription || '',
    data.accessControl || '',
    data.surveillance || '',
    data.perimeterGlazing || '',
    data.securityStaff || '',
    data.alarmMonitoring || '',
    data.securitySoftware || '',
    data.complianceRequirements || '',
    data.securityConcerns || '',
    data.pastIncidents || '',
    data.threatProfile || '',
    data.primaryInterest || '',
    data.sessionGoals || '',
    data.timeline || '',
    data.budgetRange || '',
    data.additionalNotes || '',
  ];
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const configuredSecret = PropertiesService.getScriptProperties().getProperty('INTAKE_SECRET');
    const providedSecret = e.parameter.secret || '';

    if (!configuredSecret || providedSecret !== configuredSecret) {
      return jsonResponse_({ success: false, error: 'Unauthorized' });
    }

    const payload = JSON.parse(e.parameter.payload || '{}');
    getResponsesSheet_().appendRow(mapPayloadToRow_(payload));

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
}

function doGet() {
  return jsonResponse_({ success: true, message: 'Victa discovery intake endpoint is running.' });
}
