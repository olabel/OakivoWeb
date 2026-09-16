const fs = require('fs');
const path = require('path');

// Extract insights directly from content/insights.ts
const insightsFile = fs.readFileSync(path.join(__dirname, '..', 'content', 'insights.ts'), 'utf8');

// Regex extraction for each insight item
const insightBlocks = insightsFile.split(/\{\s*id:\s*['"]/g).slice(1);

const insights = insightBlocks.map(block => {
  const idMatch = block.match(/^([^'"]+)['"]/);
  const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
  const excerptMatch = block.match(/excerpt:\s*['"]([^'"]+)['"]/);
  const authorMatch = block.match(/author:\s*['"]([^'"]+)['"]/);
  const dateMatch = block.match(/date:\s*['"]([^'"]+)['"]/);
  const categoryMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
  const readTimeMatch = block.match(/readTime:\s*['"]([^'"]+)['"]/);
  const coverImageMatch = block.match(/coverImage:\s*['"]([^'"]+)['"]/);

  return {
    id: idMatch ? idMatch[1] : '',
    title: titleMatch ? titleMatch[1] : '',
    excerpt: excerptMatch ? excerptMatch[1] : '',
    author: authorMatch ? authorMatch[1] : 'Oakivo Research Group',
    date: dateMatch ? dateMatch[1] : '2026-09-16',
    category: categoryMatch ? categoryMatch[1] : 'DevSecOps',
    readTime: readTimeMatch ? readTimeMatch[1] : '8 min read',
    coverImage: coverImageMatch ? coverImageMatch[1] : 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200'
  };
}).filter(i => i.id && i.title);

console.log(`Extracted ${insights.length} insight articles for RSS and Sitemap.`);

const siteUrl = 'https://www.oakivo.com';

// 1. Generate RSS XML Feed
let rssItemsXml = '';
insights.forEach(post => {
  const postUrl = `${siteUrl}/insights/${post.id}`;
  let pubDateStr;
  try {
    pubDateStr = new Date(post.date).toUTCString();
  } catch {
    pubDateStr = new Date().toUTCString();
  }

  rssItemsXml += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDateStr}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
      <enclosure url="${post.coverImage.replace(/&/g, '&amp;')}" type="image/jpeg" length="0" />
    </item>`;
});

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Oakivo Security Insights | Cloud Security &amp; DevSecOps Intelligence</title>
    <link>${siteUrl}/insights</link>
    <description>Authoritative research on Bill C-26, PIPEDA &amp; Law 25 sovereign cloud architectures, SOC 2 Type II audit automation, Zero-Trust, and Kubernetes posture management by Oakivo Solutions.</description>
    <language>en-ca</language>
    <copyright>Copyright ${new Date().getFullYear()} Oakivo Solutions Inc. All rights reserved.</copyright>
    <managingEditor>contact@oakivo.com (Oakivo Editorial Team)</managingEditor>
    <webMaster>contact@oakivo.com (Oakivo Webmaster)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${rssItemsXml}
  </channel>
</rss>`;

// Write public/rss.xml and public/feed.xml
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXml.trim(), 'utf8');
fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssXml.trim(), 'utf8');
console.log('Successfully written public/rss.xml and public/feed.xml');

// 2. Generate Comprehensive Sitemap XML
const coreRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/capabilities', priority: '0.9', changefreq: 'weekly' },
  { path: '/expertise', priority: '0.9', changefreq: 'weekly' },
  { path: '/case-studies', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance-matrix', priority: '0.95', changefreq: 'weekly' },
  { path: '/compliance', priority: '0.95', changefreq: 'weekly' },
  
  // Specialized Canadian Compliance Frameworks (High-Intent SEO)
  { path: '/compliance/bill-c26', priority: '0.95', changefreq: 'weekly' },
  { path: '/compliance/pipeda', priority: '0.95', changefreq: 'weekly' },
  { path: '/compliance/soc2', priority: '0.95', changefreq: 'weekly' },
  { path: '/compliance/bill-c26-critical-cyber-systems', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/pipeda-canadian-data-sovereignty', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/soc2-audit-readiness-canada', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/bill-c26-on-aws', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/bill-c26-on-azure', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/bill-c26-on-kubernetes', priority: '0.85', changefreq: 'weekly' },
  { path: '/compliance/pipeda-on-aws', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/pipeda-on-azure', priority: '0.85', changefreq: 'weekly' },
  { path: '/compliance/soc2-on-aws', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance/soc2-on-azure', priority: '0.85', changefreq: 'weekly' },
  { path: '/compliance/soc2-on-kubernetes', priority: '0.85', changefreq: 'weekly' },

  // Provincial Hubs
  { path: '/locations/new-brunswick', priority: '0.9', changefreq: 'weekly' },
  { path: '/locations/alberta', priority: '0.85', changefreq: 'weekly' },
  { path: '/locations/ontario', priority: '0.85', changefreq: 'weekly' },
  { path: '/locations/nova-scotia', priority: '0.85', changefreq: 'weekly' },
  { path: '/locations/prince-edward-island', priority: '0.8', changefreq: 'monthly' },
  { path: '/locations/newfoundland', priority: '0.8', changefreq: 'monthly' },

  // Solution detail pages
  { path: '/solutions/cloud-security', priority: '0.85', changefreq: 'monthly' },
  { path: '/solutions/devsecops-automation', priority: '0.85', changefreq: 'monthly' },
  { path: '/solutions/continuous-compliance', priority: '0.85', changefreq: 'monthly' },
  { path: '/solutions/zero-trust-architecture', priority: '0.85', changefreq: 'monthly' },
  { path: '/solutions/enterprise-erp-hardening', priority: '0.8', changefreq: 'monthly' },

  // Hubs, Tools & Conversions
  { path: '/risk-calculator', priority: '0.85', changefreq: 'weekly' },
  { path: '/schedule', priority: '0.9', changefreq: 'monthly' },
  { path: '/booking', priority: '0.85', changefreq: 'monthly' },
  { path: '/contact', priority: '0.85', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/methodology', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/insights', priority: '0.9', changefreq: 'daily' }
];

const today = new Date().toISOString().split('T')[0];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

coreRoutes.forEach(r => {
  sitemapXml += `
  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
});

insights.forEach(post => {
  sitemapXml += `
  <url>
    <loc>${siteUrl}/insights/${post.id}</loc>
    <lastmod>${post.date || today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
});

sitemapXml += `
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml.trim(), 'utf8');
console.log('Successfully written public/sitemap.xml');
