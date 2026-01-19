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

export enum NavRoute {
  HOME = '/',
  VERTICALS = '/verticals',
  ABOUT = '/about',
  SERVICES = '/services',
  CASE_STUDIES = '/case-studies',
  CONTACT = '/contact'
}