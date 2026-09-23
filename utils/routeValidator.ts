import { insightsData } from '../content/insights';

export interface RouteCheckResult {
  valid: boolean;
  redirectUrl?: string;
  statusCode: number; // 200, 301, or 404
}

export const VALID_STATIC_ROUTES = new Set([
  '/',
  '/services',
  '/case-studies',
  '/contact',
  '/booking',
  '/methodology',
  '/careers',
  '/about',
  '/verticals',
  '/privacy',
  '/compliance-matrix',
  '/brand-identity',
  '/client-portal',
  '/client-portal-demo',
  '/admin-portal',
  '/insights',
  '/risk-calculator',
  '/404'
]);

export const ROUTE_REDIRECTS: Record<string, string> = {
  '/capabilities': '/services',
  '/expertise': '/services',
  '/casestudies': '/case-studies',
  '/work': '/case-studies',
  '/schedule': '/booking',
  '/audit': '/booking',
  '/firm': '/about',
  '/industries': '/verticals',
  '/compliance': '/compliance-matrix',
  '/matrix': '/compliance-matrix',
  '/perspectives': '/insights',
  '/locations/newfoundland': '/locations/newfoundland-labrador'
};

export const VALID_SOLUTIONS = new Set([
  'invoice-automation',
  'order-inventory-sync',
  'dispatch-route-logging',
  'custom-report-automation',
  'cloud-security',
  'devsecops-automation',
  'continuous-compliance',
  'zero-trust-architecture',
  'enterprise-erp-hardening'
]);

export const VALID_LOCATIONS = new Set([
  'new-brunswick',
  'nova-scotia',
  'prince-edward-island',
  'newfoundland-labrador',
  'alberta',
  'ontario'
]);

export const VALID_FRAMEWORKS = new Set([
  'bill-c26',
  'pipeda',
  'soc2',
  'iso27001',
  'hipaa',
  'pci-dss',
  'gdpr',
  'fedramp',
  'cjis'
]);

export const VALID_PROVIDERS = new Set(['aws', 'azure', 'gcp', 'kubernetes']);

export const VALID_COMPLIANCE_SPECIAL_SLUGS = new Set([
  'bill-c26-critical-cyber-systems',
  'pipeda-canadian-data-sovereignty',
  'soc2-audit-readiness-canada'
]);

/**
 * Validates a requested URL path.
 * Returns HTTP 200 for valid routes, 301 for permanent redirects, and 404 for invalid/soft-404 routes.
 */
export function validateRoute(rawPath: string): RouteCheckResult {
  if (!rawPath) {
    return { valid: true, statusCode: 200 };
  }

  // Remove query params and hashes, trim whitespace
  const cleanPath = rawPath.split('?')[0].split('#')[0].trim();
  
  // Normalize trailing slashes (except root '/')
  const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '');

  // 1. Direct 301 redirects
  if (ROUTE_REDIRECTS[normalizedPath]) {
    return {
      valid: false,
      redirectUrl: ROUTE_REDIRECTS[normalizedPath],
      statusCode: 301
    };
  }

  // 2. Trailing slash redirect: e.g. /services/ -> /services
  if (cleanPath !== normalizedPath && cleanPath !== '/') {
    return {
      valid: false,
      redirectUrl: normalizedPath,
      statusCode: 301
    };
  }

  // 3. Static routes
  if (VALID_STATIC_ROUTES.has(normalizedPath)) {
    return { valid: true, statusCode: 200 };
  }

  // 4. Dynamic Insights: /insights/:id
  const insightsMatch = normalizedPath.match(/^\/insights\/([^/]+)$/);
  if (insightsMatch) {
    const slug = insightsMatch[1];
    const exists = insightsData.some(p => p.id === slug);
    if (exists) {
      return { valid: true, statusCode: 200 };
    }
    return { valid: false, statusCode: 404 };
  }

  // 5. Perspectives redirect: /perspectives/:id -> /insights/:id
  const perspectivesMatch = normalizedPath.match(/^\/perspectives\/([^/]+)$/);
  if (perspectivesMatch) {
    const slug = perspectivesMatch[1];
    const exists = insightsData.some(p => p.id === slug);
    if (exists) {
      return {
        valid: false,
        redirectUrl: `/insights/${slug}`,
        statusCode: 301
      };
    }
    return { valid: false, statusCode: 404 };
  }

  // 6. Dynamic Solutions: /solutions/:slug
  const solutionsMatch = normalizedPath.match(/^\/solutions\/([^/]+)$/);
  if (solutionsMatch) {
    const slug = solutionsMatch[1].toLowerCase();
    if (VALID_SOLUTIONS.has(slug)) {
      return { valid: true, statusCode: 200 };
    }
    return { valid: false, statusCode: 404 };
  }

  // 7. Dynamic Locations: /locations/:slug
  const locationsMatch = normalizedPath.match(/^\/locations\/([^/]+)$/);
  if (locationsMatch) {
    const slug = locationsMatch[1].toLowerCase();
    if (slug === 'newfoundland') {
      return {
        valid: false,
        redirectUrl: '/locations/newfoundland-labrador',
        statusCode: 301
      };
    }
    if (VALID_LOCATIONS.has(slug)) {
      return { valid: true, statusCode: 200 };
    }
    return { valid: false, statusCode: 404 };
  }

  // 8. Dynamic Compliance: /compliance/:slug
  const complianceMatch = normalizedPath.match(/^\/compliance\/([^/]+)$/);
  if (complianceMatch) {
    const slug = complianceMatch[1].toLowerCase();

    // Standalone framework (e.g., /compliance/bill-c26, /compliance/soc2)
    if (VALID_FRAMEWORKS.has(slug)) {
      return { valid: true, statusCode: 200 };
    }

    // Special vanity slug
    if (VALID_COMPLIANCE_SPECIAL_SLUGS.has(slug)) {
      return { valid: true, statusCode: 200 };
    }

    // Framework on provider: e.g., bill-c26-on-aws
    const onMatch = slug.match(/^([a-z0-9-]+)-on-([a-z0-9-]+)$/);
    if (onMatch) {
      const fw = onMatch[1];
      const prov = onMatch[2];
      if (VALID_FRAMEWORKS.has(fw) && VALID_PROVIDERS.has(prov)) {
        return { valid: true, statusCode: 200 };
      }
    }

    return { valid: false, statusCode: 404 };
  }

  // Everything else is not a recognized route -> 404
  return { valid: false, statusCode: 404 };
}
