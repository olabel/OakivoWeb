const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const sitemapCode = `
  // Automated Sitemap & Robots.txt Generation
  const DOMAIN = 'https://www.oakivo.com';
  
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    
    // Core routes derived from NavRoute
    const routes = [
      '/', '/verticals', '/industries', '/about', '/firm', '/services',
      '/capabilities', '/case-studies', '/contact', '/schedule', '/perspectives',
      '/insights', '/methodology', '/careers', '/privacy', '/compliance-matrix',
      '/brand-identity', '/client-portal-demo',
      '/solutions/invoice-automation', '/solutions/order-inventory-sync',
      '/solutions/dispatch-route-logging', '/solutions/custom-report-automation',
      '/locations/new-brunswick', '/locations/nova-scotia',
      '/locations/prince-edward-island', '/locations/newfoundland-labrador'
    ];

    const today = new Date().toISOString().split('T')[0];

    const xmlUrls = routes.map(route => {
      // Prioritize priority and changefreq based on route
      let priority = '0.8';
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (route.includes('/locations/') || route.includes('/solutions/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (route === '/insights') {
        priority = '0.9';
        changefreq = 'daily';
      } else if (route === '/privacy' || route === '/compliance-matrix') {
        priority = '0.5';
        changefreq = 'monthly';
      }

      return \`
  <url>
    <loc>\${DOMAIN}\${route}</loc>
    <lastmod>\${today}</lastmod>
    <changefreq>\${changefreq}</changefreq>
    <priority>\${priority}</priority>
  </url>\`;
    }).join('');

    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${xmlUrls}
</urlset>\`;

    res.send(sitemap);
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(\`User-agent: *
Allow: /
Disallow: /admin-portal

Sitemap: \${DOMAIN}/sitemap.xml
\`);
  });
`;

if (!content.includes('/sitemap.xml')) {
  content = content.replace(
    "  app.use('/api/', apiLimiter);",
    "  app.use('/api/', apiLimiter);\n" + sitemapCode
  );
  fs.writeFileSync('server.ts', content);
  console.log("Sitemap and robots.txt endpoints added.");
} else {
  console.log("Sitemap already exists.");
}
