/**
 * Victa Intake — Google Doc → form schema sync (every 5 minutes)
 *
 * Add this as a second file in the same Apps Script project as Code.gs
 * (File > New > Script file), or paste below Code.gs in one file.
 *
 * Doc format expected (see DOC_TEMPLATE.md):
 *   SECTION 1 — TITLE          → form section
 *   Question text __________   → textarea
 *   Question (check all that apply)
 *   [ ] Option A               → checkbox group
 *   [ ] Option B
 */

const SCHEMAS_SHEET = 'Schemas';

const SCHEMA_HEADERS = [
  'Interest Slug',
  'Doc Title',
  'Doc Id',
  'Doc Url',
  'Synced At',
  'Field Count',
  'Sync Status',
  'Schema JSON',
];

function getSchemasSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SCHEMAS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(SCHEMAS_SHEET);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, SCHEMA_HEADERS.length).setValues([SCHEMA_HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, SCHEMA_HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#0f172a')
      .setFontColor('#f8fafc');
    sheet.setColumnWidth(1, 200);
    sheet.setColumnWidth(2, 300);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 320);
    sheet.setColumnWidth(5, 160);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 120);
    sheet.setColumnWidth(8, 500);
  }
  return sheet;
}

/**
 * Install (or reinstall) a 5-minute sync trigger.
 */
function installSchemaSyncTrigger() {
  removeSchemaSyncTriggers_();
  ScriptApp.newTrigger('syncAllIntakeSchemas')
    .timeBased()
    .everyMinutes(5)
    .create();
  SpreadsheetApp.getUi().alert(
    'Installed 5-minute sync trigger.\n\n' +
    'Edits to Intake Form Google Docs will appear on the website within about 5 minutes.\n' +
    'Use Victa Intake > Sync intake schemas now to run immediately.'
  );
}

function removeSchemaSyncTriggers_() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'syncAllIntakeSchemas') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

/**
 * Sync all Templates / INTEREST_TEMPLATES Docs into the Schemas sheet.
 * Safe to run from menu or time-driven trigger.
 */
function syncAllIntakeSchemas() {
  getSchemasSheet_();
  ensureTemplatesSeeded_();

  const templates = getTemplateRows_();
  const results = [];

  templates.forEach(function (row) {
    results.push(syncOneInterestSchema_(row.slug, row.docTitle, row.docUrl));
  });

  const ok = results.filter(function (r) { return r.ok; }).length;
  const failed = results.length - ok;
  const summary = 'Synced ' + ok + ' schema(s)' + (failed ? ', ' + failed + ' failed' : '') + '.';

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast(summary, 'Victa Intake Sync', 8);
  } catch (err) {
    // toast unavailable when run from trigger
  }

  return { success: true, results: results, summary: summary };
}

function ensureTemplatesSeeded_() {
  const sheet = getTemplatesSheet_();
  if (sheet.getLastRow() < 2) {
    setupTemplatesSheet_();
  }
}

function getTemplateRows_() {
  const sheet = getTemplatesSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return INTEREST_TEMPLATES.map(function (item) {
      return { slug: item.slug, docTitle: item.docTitle, docUrl: '' };
    });
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
  const rows = [];
  for (var i = 0; i < values.length; i++) {
    const slug = String(values[i][1] || '').trim();
    const docTitle = String(values[i][2] || '').trim();
    const docUrl = String(values[i][3] || '').trim();
    if (!slug && !docTitle) continue;
    rows.push({
      slug: slug || slugify_(String(values[i][0] || '')),
      docTitle: docTitle,
      docUrl: docUrl,
    });
  }
  return rows.length ? rows : INTEREST_TEMPLATES.map(function (item) {
    return { slug: item.slug, docTitle: item.docTitle, docUrl: '' };
  });
}

function syncOneInterestSchema_(interestSlug, docTitle, docUrlHint) {
  const sheet = getSchemasSheet_();
  try {
    const file = findIntakeDoc_(docTitle, docUrlHint);
    if (!file) {
      upsertSchemaRow_(sheet, {
        interestSlug: interestSlug,
        docTitle: docTitle,
        docId: '',
        docUrl: docUrlHint || '',
        syncedAt: new Date().toISOString(),
        fieldCount: 0,
        status: 'DOC_NOT_FOUND',
        schemaJson: '',
      });
      return { ok: false, interestSlug: interestSlug, error: 'DOC_NOT_FOUND' };
    }

    const doc = DocumentApp.openById(file.getId());
    const bodyText = doc.getBody().getText();
    const sections = parseIntakeDocText_(bodyText);
    const fieldCount = sections.reduce(function (sum, s) {
      return sum + (s.fields ? s.fields.length : 0);
    }, 0);

    const schema = {
      interestSlug: interestSlug,
      docTitle: file.getName(),
      docId: file.getId(),
      syncedAt: new Date().toISOString(),
      sections: sections,
    };

    const docUrl = 'https://docs.google.com/document/d/' + file.getId() + '/edit';
    upsertSchemaRow_(sheet, {
      interestSlug: interestSlug,
      docTitle: file.getName(),
      docId: file.getId(),
      docUrl: docUrl,
      syncedAt: schema.syncedAt,
      fieldCount: fieldCount,
      status: fieldCount > 0 ? 'OK' : 'EMPTY',
      schemaJson: JSON.stringify(schema),
    });

    // Keep Templates column D in sync when we discover the Doc
    updateTemplateDocUrl_(interestSlug, docUrl);

    return { ok: true, interestSlug: interestSlug, fieldCount: fieldCount };
  } catch (err) {
    upsertSchemaRow_(sheet, {
      interestSlug: interestSlug,
      docTitle: docTitle,
      docId: '',
      docUrl: docUrlHint || '',
      syncedAt: new Date().toISOString(),
      fieldCount: 0,
      status: 'ERROR: ' + err.message,
      schemaJson: '',
    });
    return { ok: false, interestSlug: interestSlug, error: err.message };
  }
}

function findIntakeDoc_(docTitle, docUrlHint) {
  const idFromUrl = extractDocIdFromUrl_(docUrlHint);
  if (idFromUrl) {
    try {
      return DriveApp.getFileById(idFromUrl);
    } catch (err) {
      // fall through to title search
    }
  }

  if (!docTitle) return null;

  const query =
    "title = '" + escapeDriveQuery_(docTitle) + "' " +
    "and mimeType = 'application/vnd.google-apps.document' " +
    'and trashed = false';

  const files = DriveApp.searchFiles(query);
  if (files.hasNext()) {
    return files.next();
  }

  // Loose match: title contains
  const loose = DriveApp.searchFiles(
    "title contains 'Intake Form' and mimeType = 'application/vnd.google-apps.document' and trashed = false"
  );
  while (loose.hasNext()) {
    const file = loose.next();
    if (file.getName() === docTitle) return file;
  }
  return null;
}

function extractDocIdFromUrl_(url) {
  if (!url) return '';
  const match = String(url).match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : '';
}

function escapeDriveQuery_(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function updateTemplateDocUrl_(interestSlug, docUrl) {
  const sheet = getTemplatesSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;
  const slugs = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < slugs.length; i++) {
    if (String(slugs[i][0] || '') === interestSlug) {
      const current = String(sheet.getRange(i + 2, 4).getValue() || '');
      if (!current) {
        sheet.getRange(i + 2, 4).setValue(docUrl);
      }
      return;
    }
  }
}

function upsertSchemaRow_(sheet, row) {
  const lastRow = sheet.getLastRow();
  var targetRow = -1;
  if (lastRow >= 2) {
    const slugs = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = 0; i < slugs.length; i++) {
      if (String(slugs[i][0] || '') === row.interestSlug) {
        targetRow = i + 2;
        break;
      }
    }
  }
  if (targetRow < 0) {
    targetRow = Math.max(sheet.getLastRow(), 1) + 1;
  }

  sheet.getRange(targetRow, 1, 1, SCHEMA_HEADERS.length).setValues([[
    row.interestSlug,
    row.docTitle,
    row.docId,
    row.docUrl,
    row.syncedAt,
    row.fieldCount,
    row.status,
    row.schemaJson,
  ]]);
}

/**
 * Parse Victa Intake Form Doc plain text into branded form sections.
 */
function parseIntakeDocText_(text) {
  const rawLines = String(text || '').split(/\r?\n/);
  const lines = [];
  for (var i = 0; i < rawLines.length; i++) {
    const trimmed = rawLines[i].replace(/\u00a0/g, ' ').trim();
    if (trimmed) lines.push(trimmed);
  }

  const sections = [];
  var current = null;
  var pendingField = null;

  function ensureSection(title) {
    if (!current) {
      current = {
        id: slugify_(title || 'general'),
        title: title || 'General',
        description: '',
        fields: [],
      };
      sections.push(current);
    }
  }

  function finalizePending() {
    if (pendingField && current) {
      current.fields.push(pendingField);
    }
    pendingField = null;
  }

  for (var li = 0; li < lines.length; li++) {
    const line = lines[li];

    // Skip document title lines that mirror the Doc name
    if (/^Intake Form\b/i.test(line) && line.length < 120 && sections.length === 0 && !current) {
      continue;
    }

    const sectionMatch = line.match(/^SECTION\s+(\d+)\s*[—\–\-|:]\s*(.+)$/i);
    if (sectionMatch) {
      finalizePending();
      const title = toTitleCase_(sectionMatch[2]);
      current = {
        id: 'section-' + sectionMatch[1] + '-' + slugify_(title),
        title: title,
        description: '',
        fields: [],
      };
      sections.push(current);
      continue;
    }

    // All-caps heading used as a section (e.g. SERVICE REQUIREMENTS)
    if (
      line.length > 3 &&
      line.length < 80 &&
      line === line.toUpperCase() &&
      /[A-Z]/.test(line) &&
      !/^\[\s*\]/.test(line) &&
      line.indexOf('?') === -1 &&
      !/_/.test(line)
    ) {
      finalizePending();
      const title = toTitleCase_(line);
      current = {
        id: slugify_(title),
        title: title,
        description: '',
        fields: [],
      };
      sections.push(current);
      continue;
    }

    const checkboxOpt = line.match(/^\[\s*[xX ]?\s*\]\s*(.+)$/);
    if (checkboxOpt) {
      ensureSection('General');
      if (!pendingField || pendingField.type !== 'checkbox') {
        finalizePending();
        pendingField = {
          id: slugify_('options-' + checkboxOpt[1]).slice(0, 40) + '-' + String(li),
          label: 'Select all that apply',
          type: 'checkbox',
          required: false,
          options: [],
        };
      }
      pendingField.options.push(checkboxOpt[1].trim());
      continue;
    }

    // Question / prompt line
    const isQuestion =
      /\?/.test(line) ||
      /_{3,}/.test(line) ||
      /\(check all that apply\)/i.test(line) ||
      /\(select one\)/i.test(line);

    if (isQuestion) {
      finalizePending();
      ensureSection('General');

      var label = line
        .replace(/_{3,}/g, '')
        .replace(/\(check all that apply\)/ig, '')
        .replace(/\(select one\)/ig, '')
        .trim();
      label = label.replace(/[:\-\s]+$/, '').trim();
      if (!label) continue;

      const multi = /\(check all that apply\)/i.test(line);
      const selectOne = /\(select one\)/i.test(line);
      const fieldId = slugify_(label).slice(0, 48) || ('field-' + li);

      if (multi) {
        pendingField = {
          id: fieldId,
          label: label,
          type: 'checkbox',
          required: false,
          options: [],
        };
      } else if (selectOne) {
        pendingField = {
          id: fieldId,
          label: label,
          type: 'select',
          required: false,
          options: [],
        };
      } else {
        current.fields.push({
          id: fieldId,
          label: label,
          type: 'textarea',
          required: false,
          placeholder: '',
          rows: 3,
        });
        pendingField = null;
      }
      continue;
    }

    // Options for a pending select (lines that aren't checkboxes)
    if (pendingField && pendingField.type === 'select' && line.length < 120) {
      pendingField.options.push(line);
      continue;
    }
  }

  finalizePending();

  // Drop empty sections
  return sections.filter(function (s) {
    return s.fields && s.fields.length > 0;
  });
}

function toTitleCase_(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\b([a-z])/g, function (m, c) {
      return c.toUpperCase();
    })
    .replace(/\bAnd\b/g, 'and')
    .replace(/\bOf\b/g, 'of')
    .replace(/\bOr\b/g, 'or');
}

/**
 * Read published schema for an interest slug (used by doGet).
 */
function getPublishedSchema_(interestSlug) {
  if (!interestSlug) {
    return { success: false, error: 'Missing interest parameter' };
  }

  const sheet = getSchemasSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return {
      success: false,
      error: 'No schemas synced yet. Run Victa Intake > Sync intake schemas now.',
    };
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0] || '') === interestSlug) {
      const status = String(values[i][6] || '');
      const raw = String(values[i][7] || '');
      if (!raw) {
        return { success: false, error: 'Schema empty', status: status, interestSlug: interestSlug };
      }
      try {
        const schema = JSON.parse(raw);
        return { success: true, schema: schema };
      } catch (err) {
        return { success: false, error: 'Invalid schema JSON', interestSlug: interestSlug };
      }
    }
  }

  return { success: false, error: 'Schema not found for interest', interestSlug: interestSlug };
}
