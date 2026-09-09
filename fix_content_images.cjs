const fs = require('fs');
let content = fs.readFileSync('content/insights.ts', 'utf8');

// Replace the 3 404 images with 3 reliable tech-related Unsplash IDs
// 1614064641913-6b71a2eaa4a4 -> 1526374965328-7f61d4dc18c5 (matrix code style)
content = content.replace("1614064641913-6b71a2eaa4a4", "1526374965328-7f61d4dc18c5");

// 1510511459019-5efa3709b1f0 -> 1518770660439-4636190af475 (circuit board)
content = content.replace("1510511459019-5efa3709b1f0", "1518770660439-4636190af475");

// 1586528116311-ad8ed7e50c40 -> 1639322537228-f710d846310a (cyber/digital grid)
content = content.replace("1586528116311-ad8ed7e50c40", "1639322537228-f710d846310a");

fs.writeFileSync('content/insights.ts', content);
