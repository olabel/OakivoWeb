const fs = require('fs');

let content = fs.readFileSync('server.ts', 'utf8');

const sitemapStart = content.indexOf('  // Dynamic XML Sitemap Generator');
const sitemapEnd = content.indexOf('  // Health check');

if (sitemapStart !== -1 && sitemapEnd !== -1) {
  const newSitemapBlock = `  // Automated XML Sitemap Generator (Reads from App.tsx)
  app.get('/sitemap.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    const path = require('path');
    
    let allRoutes = [];
    try {
      const appTsxContent = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
      const routeRegex = /<Route[^>]*path=["']([^"']+)["'][^>]*>/g;
      let match;
      while ((match = routeRegex.exec(appTsxContent)) !== null) {
        const routePath = match[1];
        if (!routePath.includes('*') && !routePath.includes(':')) {
           allRoutes.push(routePath);
        }
      }
    } catch (e) {
      console.error("Error generating dynamic routes from App.tsx", e);
      // Fallback
      allRoutes = ['/', '/services', '/case-studies', '/contact', '/insights'];
    }

    allRoutes = [...new Set(allRoutes)].filter(route => !route.includes('/admin-portal'));

    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapUrls = allRoutes.map(route => {
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

      return \`  <url>
    <loc>\${siteUrl}\${route}</loc>
    <lastmod>\${currentDate}</lastmod>
    <changefreq>\${changefreq}</changefreq>
    <priority>\${priority}</priority>
  </url>\`;
    }).join('\\n');

    const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${sitemapUrls}
</urlset>\`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(\`User-agent: *\\nAllow: /\\nDisallow: /admin-portal\\nDisallow: /api/\\n\\nSitemap: \${siteUrl}/sitemap.xml\\n\`);
  });

`;

  content = content.substring(0, sitemapStart) + newSitemapBlock + content.substring(sitemapEnd);
  fs.writeFileSync('server.ts', content);
  console.log("Updated server.ts with App.tsx auto-parsing sitemap.");
} else {
  console.log("Could not find start/end points");
}
