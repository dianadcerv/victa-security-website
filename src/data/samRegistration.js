/** SAM.gov registration facts shown on /government and site footer. */
export const SAM_REGISTRATION = {
  legalName: 'Victa Security Solutions LLC',
  uei: 'GWNWAAESCLE6',
  cageCode: '277J8',
  samStatus: 'Active registration',
  ownership: 'Woman-owned business',
  physicalAddress: {
    street: '2442 W Fletcher St',
    city: 'Chicago',
    state: 'IL',
    zip: '60618',
  },
};

/** NAICS codes registered in SAM.gov. primary: true marks the primary code. */
export const NAICS_CODES = [
  { code: '238150', title: 'Glass and Glazing Contractors', primary: true },
  { code: '238390', title: 'Other Building Finishing Contractors' },
  { code: '444180', title: 'Other Building Material Dealers' },
  { code: '541618', title: 'Other Management Consulting Services' },
  { code: '541690', title: 'Other Scientific and Technical Consulting Services' },
  { code: '561621', title: 'Security Systems Services (except Locksmiths)' },
  { code: '811122', title: 'Automotive Glass Replacement Shops' },
];

/** Product Service Codes (PSC) registered in SAM.gov. */
export const PRODUCT_SERVICE_CODES = [
  { code: '5680', title: 'Miscellaneous Construction Materials' },
  { code: 'S216', title: 'Housekeeping: Facilities Operations Support' },
  { code: 'R499', title: 'Support: Professional: Other' },
  { code: 'R707', title: 'Support: Management: Contract/Procurement/Acquisition Support' },
];

/** Set to true and add public/capability-statement.pdf to show capability statement download. */
export const SHOW_CAPABILITY_STATEMENT_SECTION = false;
export const CAPABILITY_STATEMENT_PATH = '/capability-statement.pdf';

export const CONTRACTING_EMAIL = 'diana@victasecuritysolutions.com';