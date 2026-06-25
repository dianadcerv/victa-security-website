/**
 * Victa Security - Discovery Intake Handler
 *
 * Setup:
 * 1. Create a Google Sheet named "Victa Discovery Intake Responses"
 * 2. Paste this script in Extensions > Apps Script (bound to the sheet)
 * 3. Set Script Property INTAKE_SECRET to a random string (Project Settings > Script properties)
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into REACT_APP_INTAKE_ENDPOINT
 */

const SHEET_NAME = 'Responses';

const HEADER_ROW = [
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

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
    sheet.setFrozenRows(1);
  }
  return sheet;
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

function jsonResponse_(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doPost(e) {
  try {
    const configuredSecret = PropertiesService.getScriptProperties().getProperty('INTAKE_SECRET');
    const providedSecret = e.parameter.secret || '';

    if (!configuredSecret || providedSecret !== configuredSecret) {
      return jsonResponse_({ success: false, error: 'Unauthorized' });
    }

    const payload = JSON.parse(e.parameter.payload || '{}');
    const sheet = getSheet_();
    sheet.appendRow(mapPayloadToRow_(payload));

    return jsonResponse_({ success: true });
  } catch (err) {
    return jsonResponse_({ success: false, error: err.message });
  }
}

function doGet() {
  return jsonResponse_({ success: true, message: 'Victa discovery intake endpoint is running.' });
}