import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics component to track page views and Core Web Vitals.
 * Designed to integrate with Google Analytics 4 (GA4).
 */
export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (measurementId && typeof window !== 'undefined') {
      // Inject GA script if it doesn't exist
      if (!document.getElementById('ga-script')) {
        const script = document.createElement('script');
        script.id = 'ga-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'ga-inline-script';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `;
        document.head.appendChild(inlineScript);
      }
      
      // Log page views on route change
      if ((window as any).gtag) {
        (window as any).gtag('config', measurementId, {
          page_path: location.pathname + location.search,
        });
      }
    }

    // Console logging for debugging in dev environment
    if (import.meta.env.DEV) {
      console.log(`[Analytics] Pageview triggered: ${location.pathname}${location.search}`);
    }
  }, [location]);

  return null;
};
