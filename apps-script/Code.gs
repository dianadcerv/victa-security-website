/**
 * Victa Security - Discovery Intake + Request Lead Handler
 *
 * Setup:
 * 1. Open your Google Sheet (Victa Discovery Intake Responses)
 * 2. Extensions > Apps Script — paste this file
 * 3. Script properties:
 *    - INTAKE_SECRET (required)
 *    - INTAKE_BASE_URL (optional)
 *    - NOTIFY_EMAIL (optional — receives new Request Form leads)
 * 4. Run setupAllSheets once, or use menu: Victa Intake > Setup sheets
 * 5. Also add SchemaSync.gs to the same Apps Script project (File > New)
 * 6. Victa Intake > Install 5-min schema sync + Sync intake schemas now
 * 7. Deploy > Web App (Execute as: Me, Access: Anyone)
 * 8. Copy Web App URL to REACT_APP_INTAKE_ENDPOINT in Vercel / .env
 *
 * Lead flow (option C):
 *   Website Request Form → doPost type=lead → Clients row + interest-based intake link
 * Discovery flow:
 *   /intake/:slug?interest=… → loads schema via doGet → doPost type=intake → Responses
 */

const RESPONSES_SHEET = 'Responses';
const CLIENTS_SHEET = 'Clients';
const TEMPLATES_SHEET = 'Templates';
const DEFAULT_INTAKE_BASE_URL = 'https://www.victasecuritysolutions.com/intake';

/** Mirrors src/data/interestMap.js — keep in sync when options change. */
const INTEREST_TEMPLATES = [
  {
    label: 'Physical Security Assessment',
    slug: 'physical-security-assessment',
    docTitle: 'Intake Form - Physical Security Assessment',
  },
  {
    label: 'Security Laminate / Glass Hardening',
    slug: 'security-laminate',
    docTitle: 'Intake Form - Security Laminate / Glass Hardening',
  },
  {
    label: 'Ballistic Panels',
    slug: 'ballistic-panels',
    docTitle: 'Intake Form - Ballistic Panels',
  },
  {
    label: 'Multiple Services',
    slug: 'multiple-services',
    docTitle: 'Intake Form - Multiple Services',
  },
  {
    label: 'Other',
    slug: 'other',
    docTitle: 'Intake Form - General',
  },
];

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
  'interest_slug',
  'answers_json',
];

const CLIENT_HEADERS = [
  'Client Name',
  'Client Slug',
  'Intake Link',
  'Contact Email',
  'Primary Interest',
  'Organization',
  'Phone',
  'Discovery Date',
  'Status',
  'Notes',
  'Source',
];

const TEMPLATE_HEADERS = [
  'Primary Interest',
  'Interest Slug',
  'Expected Doc Title',
  'Google Doc URL',
  'Notes',
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

function interestSlugFromLabel_(label) {
  if (!label) return '';
  const match = INTEREST_TEMPLATES.find(function (item) {
    return item.label === label;
  });
  return match ? match.slug : slugify_(label);
}

function buildIntakeLink_(slug, interestSlug) {
  if (!slug) return '';
  var link = getIntakeBaseUrl_() + '/' + slug;
  if (interestSlug) {
    link += '?interest=' + encodeURIComponent(interestSlug);
  }
  return link;
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
  ensureClientsHeaders_(sheet);
  return sheet;
}

/**
 * Upgrade older Clients layouts (6 columns) without wiping rows.
 */
function ensureClientsHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CLIENT_HEADERS.length).setValues([CLIENT_HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  const headerA = String(sheet.getRange(1, 1).getValue() || '');
  const headerE = String(sheet.getRange(1, 5).getValue() || '');

  if (headerA !== 'Client Name') return;

  // Legacy: E was Discovery Date — insert Interest / Organization / Phone before it
  if (headerE === 'Discovery Date' || headerE === 'Status') {
    sheet.insertColumnsAfter(4, 3);
    sheet.getRange(1, 5).setValue('Primary Interest');
    sheet.getRange(1, 6).setValue('Organization');
    sheet.getRange(1, 7).setValue('Phone');
  }

  // Ensure trailing Notes + Source columns exist
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headerI = String(sheet.getRange(1, 9).getValue() || '');
  if (headerI === 'Status' && lastCol < 11) {
    if (lastCol < 10) sheet.getRange(1, 10).setValue('Notes');
    if (lastCol < 11) sheet.getRange(1, 11).setValue('Source');
  }

  sheet.getRange(1, 1, 1, CLIENT_HEADERS.length).setValues([CLIENT_HEADERS]);
}

function getTemplatesSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TEMPLATES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(TEMPLATES_SHEET);
  }
  return sheet;
}

function setupTemplatesSheet_() {
  const sheet = getTemplatesSheet_();
  sheet.clear();
  sheet.getRange(1, 1, 1, TEMPLATE_HEADERS.length).setValues([TEMPLATE_HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, TEMPLATE_HEADERS.length)
    .setFontWeight('bold')
    .setBackground('#0f172a')
    .setFontColor('#f8fafc');

  const rows = INTEREST_TEMPLATES.map(function (item) {
    return [
      item.label,
      item.slug,
      item.docTitle,
      '',
      'Paste share link for the Google Doc that starts with this title',
    ];
  });
  sheet.getRange(2, 1, rows.length, TEMPLATE_HEADERS.length).setValues(rows);
  sheet.setColumnWidth(1, 260);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 320);
  sheet.setColumnWidth(4, 420);
  sheet.setColumnWidth(5, 280);
  sheet.getRange('D2').setNote(
    'Optional: paste the Google Doc URL. Sync also finds Docs by Expected Doc Title and fills this column.'
  );
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
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 420);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 220);
  sheet.setColumnWidth(6, 180);
  sheet.setColumnWidth(7, 130);
  sheet.setColumnWidth(8, 120);
  sheet.setColumnWidth(9, 100);
  sheet.setColumnWidth(10, 200);
  sheet.setColumnWidth(11, 140);
  sheet.getRange('C:C').setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
  sheet.getRange('A2').setNote('Type the client or company name — slug and link fill in automatically.');
  sheet.getRange('B2').setNote('Auto-generated from Client Name. Edit only if you need a custom slug.');
  sheet.getRange('C2').setNote('Copy this link into your client email. Includes ?interest= when Primary Interest is set.');
  sheet.getRange('E2').setNote('Set Primary Interest to choose which intake template/link variant to use.');
}

function setupAllSheets() {
  getResponsesSheet_();
  const clients = getClientsSheet_();
  // Only wipe Clients when empty / never initialized
  if (clients.getLastRow() <= 1 && !String(clients.getRange(2, 1).getValue() || '')) {
    setupClientsSheet_();
  } else {
    ensureClientsHeaders_(clients);
  }
  setupTemplatesSheet_();
  getSchemasSheet_();
  SpreadsheetApp.getUi().alert(
    'Sheets ready.\n\n' +
    '• Responses — discovery intake submissions\n' +
    '• Clients — leads + manual clients; intake link includes interest\n' +
    '• Templates — Primary Interest → Intake Form Doc titles\n' +
    '• Schemas — synced form JSON (website reads this)\n\n' +
    'Next: Victa Intake > Sync intake schemas now, then Install 5-min schema sync.'
  );
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Victa Intake')
    .addItem('Setup sheets', 'setupAllSheets')
    .addItem('Add new client…', 'addNewClient')
    .addItem('Refresh all intake links', 'refreshAllClientLinks')
    .addSeparator()
    .addItem('Sync intake schemas now', 'syncAllIntakeSchemas')
    .addItem('Install 5-min schema sync', 'installSchemaSyncTrigger')
    .addToUi();
}

function rebuildClientLink_(sheet, row) {
  const slug = slugify_(sheet.getRange(row, 2).getValue() || sheet.getRange(row, 1).getValue() || '');
  const interestLabel = String(sheet.getRange(row, 5).getValue() || '').trim();
  const interestSlug = interestSlugFromLabel_(interestLabel);
  if (slug) {
    sheet.getRange(row, 2).setValue(slug);
  }
  sheet.getRange(row, 3).setValue(buildIntakeLink_(slug, interestSlug));
}

function onEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  if (sheet.getName() !== CLIENTS_SHEET) return;

  const row = e.range.getRow();
  if (row < 2) return;

  const col = e.range.getColumn();
  const value = typeof e.value === 'string' ? e.value.trim() : '';

  // A Client Name, B Client Slug, or E Primary Interest → rebuild link
  if (col === 1) {
    if (!value) {
      sheet.getRange(row, 2, 1, 2).clearContent();
      return;
    }
    sheet.getRange(row, 2).setValue(slugify_(value));
    rebuildClientLink_(sheet, row);
  } else if (col === 2 || col === 5) {
    if (col === 2 && value) {
      const slug = slugify_(value);
      if (slug !== value) {
        sheet.getRange(row, 2).setValue(slug);
      }
    }
    rebuildClientLink_(sheet, row);
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

  const interestLabels = INTEREST_TEMPLATES.map(function (item) {
    return item.label;
  }).join('\n');
  const interestResponse = ui.prompt(
    'Primary Interest (optional)',
    'Paste one of:\n' + interestLabels + '\n\nOr leave blank for generic intake:',
    ui.ButtonSet.OK_CANCEL
  );
  if (interestResponse.getSelectedButton() !== ui.Button.OK) return;

  const interest = interestResponse.getResponseText().trim();
  const interestSlug = interestSlugFromLabel_(interest);
  const slug = slugify_(name);
  const link = buildIntakeLink_(slug, interestSlug);

  const sheet = getClientsSheet_();
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== 'Client Name') {
    setupClientsSheet_();
  }

  const nextRow = Math.max(sheet.getLastRow(), 1) + 1;
  sheet.getRange(nextRow, 1, 1, CLIENT_HEADERS.length).setValues([[
    name,
    slug,
    link,
    email,
    interest,
    name,
    '',
    new Date(),
    'Active',
    '',
    'Manual',
  ]]);

  ui.alert(
    'Client added.\n\n' +
    'Primary Interest: ' + (interest || '(generic)') + '\n' +
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

  for (var row = 2; row <= lastRow; row++) {
    const name = sheet.getRange(row, 1).getValue();
    if (!name) continue;
    rebuildClientLink_(sheet, row);
  }

  SpreadsheetApp.getUi().alert('Refreshed intake links through row ' + lastRow + '.');
}

function findClientRowBySlug_(sheet, slug) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  const slugs = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < slugs.length; i++) {
    if (String(slugs[i][0] || '') === slug) return i + 2;
  }
  return -1;
}

/**
 * Create or update a Clients row from the website Request Form.
 */
function handleLead_(data) {
  const organization = String(data.organization || '').trim();
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const phone = String(data.phone || '').trim();
  const interest = String(data.interest || '').trim();
  const notes = String(data.notes || '').trim();

  if (!organization && !name) {
    return { success: false, error: 'Organization or name is required' };
  }

  const clientName = organization || name;
  const interestSlug = interestSlugFromLabel_(interest);
  const slug = slugify_(clientName);
  const link = buildIntakeLink_(slug, interestSlug);

  const sheet = getClientsSheet_();
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== 'Client Name') {
    setupClientsSheet_();
  }

  const existingRow = findClientRowBySlug_(sheet, slug);
  const rowValues = [
    clientName,
    slug,
    link,
    email,
    interest,
    organization,
    phone,
    new Date(),
    'Lead',
    notes,
    'Website Request',
  ];

  if (existingRow > 0) {
    sheet.getRange(existingRow, 1, 1, CLIENT_HEADERS.length).setValues([rowValues]);
  } else {
    const nextRow = Math.max(sheet.getLastRow(), 1) + 1;
    sheet.getRange(nextRow, 1, 1, CLIENT_HEADERS.length).setValues([rowValues]);
  }

  notifyLead_(rowValues, link);

  return {
    success: true,
    clientSlug: slug,
    interestSlug: interestSlug,
    intakeLink: link,
  };
}

function notifyLead_(rowValues, link) {
  const notifyEmail = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
  if (!notifyEmail) return;

  const subject = 'New Victa assessment request: ' + (rowValues[0] || 'Unknown');
  const body = [
    'A new Request Form submission created/updated a Clients row.',
    '',
    'Client: ' + rowValues[0],
    'Organization: ' + rowValues[5],
    'Contact: ' + rowValues[3],
    'Phone: ' + rowValues[6],
    'Primary Interest: ' + (rowValues[4] || '(none)'),
    'Notes: ' + (rowValues[9] || '(none)'),
    '',
    'Intake link to send:',
    link,
    '',
    'Open the Victa Discovery Intake Responses sheet → Clients tab to manage this lead.',
  ].join('\n');

  try {
    MailApp.sendEmail(notifyEmail, subject, body);
  } catch (err) {
    // Non-fatal — lead is already saved
    console.error('notifyLead_ failed: ' + err.message);
  }
}

function mapPayloadToRow_(data) {
  const answers = {};
  Object.keys(data || {}).forEach(function (key) {
    if (key === 'type' || key === 'secret') return;
    answers[key] = data[key];
  });

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
    data.interestSlug || '',
    JSON.stringify(answers),
  ];
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const configuredSecret = PropertiesService.getScriptProperties().getProperty('INTAKE_SECRET');
    const providedSecret = (e && e.parameter && e.parameter.secret) || '';

    if (!configuredSecret || providedSecret !== configuredSecret) {
      return jsonResponse_({ success: false, error: 'Unauthorized' });
    }

    const payload = JSON.parse((e && e.parameter && e.parameter.payload) || '{}');
    const type = payload.type || (e.parameter && e.parameter.type) || 'intake';

    if (type === 'lead') {
      return jsonResponse_(handleLead_(payload));
    }

    getResponsesSheet_().appendRow(mapPayloadToRow_(payload));
    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
}

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';

  if (action === 'schema') {
    const interest = (e.parameter && e.parameter.interest) || '';
    return jsonResponse_(getPublishedSchema_(interest));
  }

  if (action === 'schemas') {
    const sheet = getSchemasSheet_();
    const lastRow = sheet.getLastRow();
    const list = [];
    if (lastRow >= 2) {
      const values = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
      for (var i = 0; i < values.length; i++) {
        list.push({
          interestSlug: values[i][0],
          docTitle: values[i][1],
          syncedAt: values[i][4],
          fieldCount: values[i][5],
          status: values[i][6],
        });
      }
    }
    return jsonResponse_({ success: true, schemas: list });
  }

  return jsonResponse_({
    success: true,
    message: 'Victa discovery intake + request lead + schema endpoint is running.',
  });
}
