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

// 2. Generate Comprehensive Sitemap XML (Only Canonical, Indexable URLs - No Aliases)
const coreRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'daily' },
  { path: '/case-studies', priority: '0.9', changefreq: 'weekly' },
  { path: '/compliance-matrix', priority: '0.95', changefreq: 'daily' },
  { path: '/compliance-grader', priority: '0.95', changefreq: 'daily' },
  { path: '/booking', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.85', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/methodology', priority: '0.8', changefreq: 'monthly' },
  { path: '/verticals', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/risk-calculator', priority: '0.85', changefreq: 'weekly' },
  { path: '/brand-identity', priority: '0.7', changefreq: 'monthly' },
  { path: '/client-portal', priority: '0.7', changefreq: 'monthly' },
  { path: '/insights', priority: '0.9', changefreq: 'daily' }
];

// Dynamic Solution Detail Pages
const solutions = [
  'cloud-security',
  'devsecops-automation',
  'continuous-compliance',
  'zero-trust-architecture',
  'enterprise-erp-hardening',
  'invoice-automation',
  'order-inventory-sync',
  'dispatch-route-logging',
  'custom-report-automation'
];
solutions.forEach(slug => {
  coreRoutes.push({ path: `/solutions/${slug}`, priority: '0.85', changefreq: 'weekly' });
});

// Provincial Hubs
const locations = [
  'new-brunswick',
  'nova-scotia',
  'prince-edward-island',
  'newfoundland-labrador',
  'alberta',
  'ontario'
];
locations.forEach(slug => {
  coreRoutes.push({ path: `/locations/${slug}`, priority: '0.85', changefreq: 'weekly' });
});

// Compliance Frameworks & Cloud Providers
const frameworks = ['bill-c26', 'pipeda', 'soc2', 'iso27001', 'hipaa', 'pci-dss', 'gdpr', 'fedramp', 'cjis'];
const providers = ['aws', 'azure', 'gcp', 'kubernetes'];

frameworks.forEach(fw => {
  coreRoutes.push({ path: `/compliance/${fw}`, priority: '0.9', changefreq: 'weekly' });
  providers.forEach(prov => {
    coreRoutes.push({ path: `/compliance/${fw}-on-${prov}`, priority: '0.85', changefreq: 'weekly' });
  });
});

// Special Canadian Compliance Intent Pages
coreRoutes.push({ path: '/compliance/bill-c26-critical-cyber-systems', priority: '0.9', changefreq: 'weekly' });
coreRoutes.push({ path: '/compliance/pipeda-canadian-data-sovereignty', priority: '0.9', changefreq: 'weekly' });
coreRoutes.push({ path: '/compliance/soc2-audit-readiness-canada', priority: '0.9', changefreq: 'weekly' });

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
