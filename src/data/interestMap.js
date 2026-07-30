/**
 * Primary Interest options for the website Request Form.
 * Each maps to an interest slug used in intake links (?interest=slug)
 * and to a Google Doc titled "Intake Form - …" (synced every 5 minutes).
 *
 * Confirmed in Drive (Victa Security - Intake Forms folder):
 * - Intake Form - Physical Security Assessment
 * - Intake Form - SaaS Implementation
 * - Intake Form - Security Laminate / Glass Hardening
 * - Intake Form - Ballistic Panels
 * - Intake Form - Multiple Services
 * - Intake Form - General  (maps to "Other")
 */

export const INTEREST_OPTIONS = [
  {
    label: 'Physical Security Assessment',
    slug: 'physical-security-assessment',
    docTitle: 'Intake Form - Physical Security Assessment',
    discoveryLabel: 'Physical Security Assessment',
  },
  {
    label: 'SaaS Implementation',
    slug: 'saas-implementation',
    docTitle: 'Intake Form - SaaS Implementation',
    discoveryLabel: 'SaaS / Security System Implementation',
  },
  {
    label: 'Security Laminate / Glass Hardening',
    slug: 'security-laminate',
    docTitle: 'Intake Form - Security Laminate / Glass Hardening',
    discoveryLabel: 'Security Laminate / Glass Hardening',
  },
  {
    label: 'Ballistic Panels',
    slug: 'ballistic-panels',
    docTitle: 'Intake Form - Ballistic Panels',
    discoveryLabel: 'Ballistic Panels / Safe Rooms',
  },
  {
    label: 'Multiple Services',
    slug: 'multiple-services',
    docTitle: 'Intake Form - Multiple Services',
    discoveryLabel: 'Multiple Services',
  },
  {
    label: 'Other',
    slug: 'other',
    docTitle: 'Intake Form - General',
    discoveryLabel: 'Not sure yet',
  },
];

export function interestByLabel(label) {
  return INTEREST_OPTIONS.find((item) => item.label === label) || null;
}

export function interestBySlug(slug) {
  if (!slug) return null;
  return INTEREST_OPTIONS.find((item) => item.slug === slug) || null;
}

export function discoveryLabelFromSlug(slug) {
  const match = interestBySlug(slug);
  return match ? match.discoveryLabel : '';
}
