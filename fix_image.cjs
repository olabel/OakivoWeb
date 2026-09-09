const fs = require('fs');
let content = fs.readFileSync('components/OptimizedImage.tsx', 'utf8');
content = content.replace(
  'fetchpriority={fetchPriority}',
  '// @ts-ignore - React 18 typings expect fetchPriority but runtime warns to use fetchpriority\n        fetchpriority={fetchPriority}'
);
fs.writeFileSync('components/OptimizedImage.tsx', content);
