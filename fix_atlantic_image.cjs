const fs = require('fs');

let content = fs.readFileSync('content/insights.ts', 'utf8');

// Replace the bad image URL with a known good one (a different ocean/water image or just a generic tech one, 
// let's use a confirmed good one from unsplash: 1518770660439 or similar, let's find a valid water image:
// How about 1451187580459 (Earth from space, which was 200 OK) or just reuse one of the other good ones.
// Or 1558494949-ef010cbdcc31

// Wait, looking at the previous output, the following were 200:
// 1451187580459-43490279c0fa (Earth from space)
// 1677442136019-21780ecad995
// 1620712943543-bcc4688e7485
// 1550751827-4bd374c3f58b
// 1639322537228-f710d846310a
// 1558494949-ef010cbdcc31
// 1526374965328-7f61d4dc18c5
// 1555255707-c07966088b7b
// 1576091160550-2173dba999ef
// 1518770660439-4636190af475

// I will replace 1577700030588-4228469e5d62 with 1451187580459-43490279c0fa

content = content.replace(/1577700030588-4228469e5d62/g, '1451187580459-43490279c0fa');

fs.writeFileSync('content/insights.ts', content);
