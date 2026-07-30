/**
 * Load intake form schema for an interest from Apps Script (synced from Google Docs).
 * Falls back to null so the caller can use discoveryQuestions.js.
 */

export async function fetchIntakeSchema(endpoint, interestSlug) {
  if (!endpoint || !interestSlug) return null;

  const url = new URL(endpoint);
  url.searchParams.set('action', 'schema');
  url.searchParams.set('interest', interestSlug);

  const response = await fetch(url.toString(), {
    method: 'GET',
    redirect: 'follow',
  });

  if (!response.ok) return null;

  const data = await response.json();
  if (!data || data.success === false || !data.schema || !Array.isArray(data.schema.sections)) {
    return null;
  }

  if (!data.schema.sections.length) return null;
  return data.schema;
}

export function buildFormStateFromSections(sections, extras = {}) {
  const state = { ...extras };
  (sections || []).forEach((section) => {
    (section.fields || []).forEach((field) => {
      if (field.type === 'checkbox') {
        state[field.id] = Array.isArray(state[field.id]) ? state[field.id] : [];
      } else if (state[field.id] === undefined) {
        state[field.id] = '';
      }
    });
  });
  return state;
}

export function countFields(sections) {
  return (sections || []).reduce((sum, section) => sum + (section.fields || []).length, 0);
}
