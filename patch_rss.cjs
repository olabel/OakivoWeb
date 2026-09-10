const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Fix RSS links
content = content.replace(
  /<link>\$\{siteUrl\}\/insights<\/link>\n      <guid>\$\{siteUrl\}\/insights#\$\{post\.id\}<\/guid>/g,
  '<link>${siteUrl}/insights/${post.id}</link>\n      <guid>${siteUrl}/insights/${post.id}</guid>'
);

fs.writeFileSync('server.ts', content);
