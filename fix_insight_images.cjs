const fs = require('fs');

// We will overwrite the coverImage fields in content/insights.ts with known good Unsplash images that match the themes.
const images = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200", // cyber
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200", // servers
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200", // matrix code
  "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200", // security
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200", // earth network
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200", // circuit
  "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200", // data
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200", // tech
  "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&q=80&w=1200", // lock
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", // analytics
  "https://images.unsplash.com/photo-1577700030588-4228469e5d62?auto=format&fit=crop&q=80&w=1200", // ocean/atlantic
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"  // health
];

let content = fs.readFileSync('content/insights.ts', 'utf8');

// replace all coverImage: "..." with one of these sequentially
let imgIdx = 0;
content = content.replace(/coverImage: "(.*?)"/g, (match) => {
  const replacement = `coverImage: "${images[imgIdx % images.length]}"`;
  imgIdx++;
  return replacement;
});

fs.writeFileSync('content/insights.ts', content);

