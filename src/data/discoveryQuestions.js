/**
 * Discovery intake field definitions.
 * Update after syncing with your Google Doc discovery questionnaire.
 */
export const discoverySections = [
  {
    id: 'organization',
    title: 'Organization & Contact',
    description: 'Basic information about your organization and primary contact.',
    fields: [
      { id: 'organization', label: 'Organization Name', type: 'text', required: true, placeholder: 'Company or facility name' },
      { id: 'industry', label: 'Industry', type: 'select', required: true, options: ['Corporate / Commercial', 'Manufacturing / Industrial', 'Financial Services', 'Healthcare', 'Education', 'Government / Municipal', 'Nonprofit', 'Other'] },
      { id: 'employeeCount', label: 'Approximate Employee Count', type: 'select', required: true, options: ['Under 50', '50-200', '200-1,000', '1,000+'] },
      { id: 'facilityCount', label: 'Number of Facilities / Locations', type: 'text', required: true, placeholder: 'e.g. 1 headquarters, 3 regional offices' },
      { id: 'contactName', label: 'Primary Contact Name', type: 'text', required: true, placeholder: 'Full name' },
      { id: 'contactTitle', label: 'Title / Role', type: 'text', required: true, placeholder: 'e.g. Facilities Director, COO' },
      { id: 'contactEmail', label: 'Email', type: 'email', required: true, placeholder: 'contact@company.com' },
      { id: 'contactPhone', label: 'Phone', type: 'tel', required: false, placeholder: '(123) 456-7890' },
      { id: 'decisionMakers', label: 'Other Decision-Makers Involved', type: 'textarea', required: false, placeholder: 'Names and roles of others involved in security decisions', rows: 2 },
    ],
  },
  {
    id: 'facilities',
    title: 'Facilities & Operations',
    description: 'Help us understand your physical environment and how it operates.',
    fields: [
      { id: 'primaryLocation', label: 'Primary Location Address', type: 'text', required: true, placeholder: 'City, state or full address' },
      { id: 'buildingType', label: 'Building Type', type: 'select', required: true, options: ['Office / Corporate HQ', 'Retail / Customer-facing', 'Warehouse / Distribution', 'Mixed-use', 'Campus (multiple buildings)', 'Other'] },
      { id: 'publicAccess', label: 'Public / Visitor Access', type: 'select', required: true, options: ['Minimal - employees and vendors only', 'Moderate - scheduled visitors, reception desk', 'High - open to public during business hours', 'Varies by location'] },
      { id: 'operatingHours', label: 'Operating Hours', type: 'text', required: true, placeholder: 'e.g. Mon-Fri 7am-7pm' },
      { id: 'facilityDescription', label: 'Facility Layout & Notable Areas', type: 'textarea', required: false, placeholder: 'Reception, executive floors, server rooms, loading docks, parking, etc.', rows: 4 },
    ],
  },
  {
    id: 'currentSecurity',
    title: 'Current Security Posture',
    description: 'What is already in place today?',
    fields: [
      { id: 'accessControl', label: 'Access Control', type: 'textarea', required: false, placeholder: 'Badge readers, locks, mantraps, visitor management', rows: 2 },
      { id: 'surveillance', label: 'Video Surveillance / Cameras', type: 'textarea', required: false, placeholder: 'Coverage areas, monitoring, retention', rows: 2 },
      { id: 'perimeterGlazing', label: 'Perimeter / Glazing / Windows', type: 'textarea', required: false, placeholder: 'Glass type, film, bollards, fencing', rows: 2 },
      { id: 'securityStaff', label: 'Security Staff / Guards', type: 'textarea', required: false, placeholder: 'In-house, contracted, hours of coverage', rows: 2 },
      { id: 'alarmMonitoring', label: 'Alarm / Monitoring / Response', type: 'textarea', required: false, placeholder: 'Intrusion, panic buttons, central station', rows: 2 },
      { id: 'securitySoftware', label: 'Security-Related Software / SaaS', type: 'textarea', required: false, placeholder: 'VMS, visitor management, incident reporting, etc.', rows: 2 },
      { id: 'complianceRequirements', label: 'Compliance or Standards Requirements', type: 'textarea', required: false, placeholder: 'CMMC, UL 752, internal policies, insurance requirements', rows: 2 },
    ],
  },
  {
    id: 'threats',
    title: 'Threats & Incidents',
    description: 'What concerns you, and what has happened before?',
    fields: [
      { id: 'securityConcerns', label: 'Top Security Concerns', type: 'textarea', required: true, placeholder: 'What keeps you up at night regarding physical security?', rows: 4 },
      { id: 'pastIncidents', label: 'Past Incidents or Near-Misses', type: 'textarea', required: false, placeholder: 'Share only what you are comfortable disclosing', rows: 4 },
      { id: 'threatProfile', label: 'Known Threat Profile', type: 'select', required: true, options: ['General crime / opportunistic theft', 'Targeted theft or espionage', 'Workplace violence risk', 'Civil unrest / protest exposure', 'Active shooter / forced entry concerns', 'Multiple / not sure'] },
    ],
  },
  {
    id: 'goals',
    title: 'Goals & Discovery Session',
    description: 'What do you want to accomplish, and by when?',
    fields: [
      { id: 'primaryInterest', label: 'Primary Interest', type: 'select', required: true, options: ['Physical Security Assessment', 'Strategic Security Consulting', 'Security Laminate / Glass Hardening', 'Ballistic Panels / Safe Rooms', 'SaaS / Security System Implementation', 'Vendor Selection / RFP Support', 'Multiple Services', 'Not sure yet'] },
      { id: 'sessionGoals', label: 'Goals for Our Discovery Session', type: 'textarea', required: true, placeholder: 'What would make this session a success for you?', rows: 3 },
      { id: 'timeline', label: 'Desired Timeline', type: 'select', required: true, options: ['Urgent - within 30 days', '1-3 months', '3-6 months', '6+ months / planning phase', 'Exploratory - no fixed timeline'] },
      { id: 'budgetRange', label: 'Budget Range (Optional)', type: 'select', required: false, options: ['Under $25,000', '$25,000 - $100,000', '$100,000 - $500,000', '$500,000+', 'Not established yet', 'Prefer not to say'] },
      { id: 'additionalNotes', label: 'Anything Else We Should Know', type: 'textarea', required: false, placeholder: 'Constraints, past vendor experiences, specific areas to focus on', rows: 4 },
    ],
  },
];

export const allFieldIds = discoverySections.flatMap((section) => section.fields.map((field) => field.id));
