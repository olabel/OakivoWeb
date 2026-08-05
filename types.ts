export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'transform' | 'automation' | 'erp' | 'security';
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  impact: string;
  imageUrl: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

export enum NavRoute {
  HOME = '/',
  VERTICALS = '/verticals',
  ABOUT = '/about',
  SERVICES = '/services',
  CASE_STUDIES = '/case-studies',
  CONTACT = '/contact',
  BOOKING = '/schedule',
  BLOG = '/perspectives',
  CAREERS = '/careers',
  PRIVACY = '/privacy',
  COMPLIANCE = '/compliance-matrix',
  ADMIN_PORTAL = '/admin-portal',
  BRAND_IDENTITY = '/brand-identity',
  // Solution Pages
  SOLUTION_INVOICE = '/solutions/invoice-automation',
  SOLUTION_INVENTORY = '/solutions/order-inventory-sync',
  SOLUTION_DISPATCH = '/solutions/dispatch-route-logging',
  SOLUTION_REPORTING = '/solutions/custom-report-automation',
  // Location Pages
  LOCATION_NB = '/locations/new-brunswick',
  LOCATION_NS = '/locations/nova-scotia',
  LOCATION_PEI = '/locations/prince-edward-island',
  LOCATION_NL = '/locations/newfoundland-labrador'
}