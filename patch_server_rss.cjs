const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// The file content/insights.ts exports insightsData array, we can import it or parse it dynamically. Wait, server.ts is compiled using esbuild. Since it's in a different folder, we'll try to import it if it compiles nicely, or we can just read the file and eval/regex it. Or better yet, we can do a dynamic import or require. Wait, `esbuild` bundles it, so `import { insightsData } from './src/content/insights'` might work if we import it at the top. Let's look for imports.

const importLine = `import fs from 'fs';
import path from 'path';
import { insightsData } from './src/content/insights';`;

content = content.replace("import fs from 'fs';\nimport path from 'path';", importLine);

const rssRoute = `  // Automated RSS Syndication
  app.get('/rss.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    
    let rssItems = '';
    try {
      // Use imported insightsData
      insightsData.forEach(post => {
        rssItems += \`
    <item>
      <title><![CDATA[\${post.title}]]></title>
      <link>\${siteUrl}/insights</link>
      <guid>\${siteUrl}/insights#\${post.id}</guid>
      <pubDate>\${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[\${post.excerpt}]]></description>
      <category><![CDATA[\${post.category}]]></category>
    </item>\`;
      });
    } catch (e) {
      console.error("Error generating RSS", e);
    }
    
    const rssFeed = \`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Oakivo Security Insights</title>
    <link>\${siteUrl}/insights</link>
    <description>Authoritative research on Zero-Trust Architecture, Kubernetes Posture Management, and DevSecOps automation by Oakivo.</description>
    <language>en-us</language>
    <lastBuildDate>\${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="\${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />\${rssItems}
  </channel>
</rss>\`;

    res.header('Content-Type', 'application/xml');
    res.send(rssFeed);
  });
  
  app.get('/sitemap.xml', (req, res) => {`;

content = content.replace("  app.get('/sitemap.xml', (req, res) => {", rssRoute);

fs.writeFileSync('server.ts', content);
console.log("RSS injected");
