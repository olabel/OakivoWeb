/**
 * Sub-50ms Instant Route Pre-fetching Utility
 * Pre-fetches lazy-loaded page modules on mouseover / touchstart
 * ensuring instant, seamless client-side page transitions.
 */

// Route loaders mapping
const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/insights': () => import('../pages/Insights'),
  '/compliance-matrix': () => import('../pages/ComplianceMatrix'),
  '/compliance-grader': () => import('../pages/ComplianceGrader'),
  '/services': () => import('../pages/Services'),
  '/case-studies': () => import('../pages/CaseStudies'),
  '/contact': () => import('../pages/Contact'),
  '/booking': () => import('../pages/Booking'),
  '/about': () => import('../pages/About'),
  '/methodology': () => import('../pages/Methodology'),
  '/privacy': () => import('../pages/Privacy')
};

const prefetchedRoutes = new Set<string>();

/**
 * Pre-fetch a specific route by pathname
 */
export const prefetchRoute = (pathname: string): void => {
  const cleanPath = pathname.split('?')[0].split('#')[0];

  // If already prefetched, skip
  if (prefetchedRoutes.has(cleanPath)) return;

  // Direct match
  if (routeLoaders[cleanPath]) {
    prefetchedRoutes.add(cleanPath);
    routeLoaders[cleanPath]().catch(() => {});
    return;
  }

  // Insight detail dynamic route match
  if (cleanPath.startsWith('/insights/') && cleanPath.length > '/insights/'.length) {
    if (!prefetchedRoutes.has('/insights/:id')) {
      prefetchedRoutes.add('/insights/:id');
      import('../pages/InsightDetail').catch(() => {});
    }
    return;
  }

  // Solution detail dynamic route match
  if (cleanPath.startsWith('/solutions/') && cleanPath.length > '/solutions/'.length) {
    if (!prefetchedRoutes.has('/solutions/:slug')) {
      prefetchedRoutes.add('/solutions/:slug');
      import('../pages/SolutionDetail').catch(() => {});
    }
    return;
  }
};

/**
 * Initialize global delegation listener for instant sub-50ms pre-fetching on link hover/touch
 */
export const initGlobalRoutePrefetch = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const handleLinkInteraction = (event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const anchor = target.closest('a') as HTMLAnchorElement | null;
    if (!anchor || !anchor.href) return;

    // Check if internal relative link or same origin
    const url = new URL(anchor.href, window.location.origin);
    if (url.origin === window.location.origin && url.pathname) {
      prefetchRoute(url.pathname);
    }
  };

  // Passive listeners on mouseover and touchstart
  document.addEventListener('mouseover', handleLinkInteraction, { passive: true });
  document.addEventListener('touchstart', handleLinkInteraction, { passive: true });

  return () => {
    document.removeEventListener('mouseover', handleLinkInteraction);
    document.removeEventListener('touchstart', handleLinkInteraction);
  };
};
