// Oakivo Service Worker for Instant Offline Browsing & Asset Caching
// Enables offline access to Insights library and Compliance Matrix for executives on flights / off-site conferences.

const CACHE_NAME = 'oakivo-pwa-v1';
const PRECACHE_URLS = [
  '/',
  '/insights',
  '/compliance-matrix',
  '/compliance-grader',
  '/favicon.svg',
  '/og-image.png',
  '/manifest.json'
];

// Install: Pre-cache critical routes and offline assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions and claim immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass non-GET requests and browser extensions
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // 1. Navigation requests (HTML documents like /insights, /compliance-matrix)
  // Network-first with cache fallback for offline reading
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // Offline fallback: Check if the exact page is in cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // If viewing an insight subpage offline, return cached /insights or root shell
          if (url.pathname.startsWith('/insights')) {
            const cachedInsights = await caches.match('/insights');
            if (cachedInsights) return cachedInsights;
          }
          const cachedRoot = await caches.match('/');
          if (cachedRoot) return cachedRoot;
          
          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Offline | Oakivo Solutions</title>
                <style>
                  body { background: #070A0F; color: #f8fafc; font-family: ui-sans-serif, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; text-align: center; }
                  .card { max-width: 480px; padding: 32px; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(51, 65, 85, 0.7); border-radius: 16px; }
                  h1 { font-size: 24px; margin-bottom: 12px; color: #38bdf8; }
                  p { color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
                  a { display: inline-block; padding: 10px 20px; background: #0284c7; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="card">
                  <h1>Executive Offline Mode</h1>
                  <p>You are currently offline. Access cached articles in the Insights library or return to previously viewed compliance matrices.</p>
                  <a href="/insights">Open Cached Insights</a>
                </div>
              </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // 2. Static Assets (scripts, CSS, fonts, images): Stale-While-Revalidate
  if (
    url.pathname.match(/\.(js|css|svg|png|jpg|jpeg|webp|woff|woff2)$/) ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. API calls (e.g. /api/insights): Network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Default: Network fetch with cache match fallback
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
