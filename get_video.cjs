const https = require('https');
https.get('https://www.pexels.com/search/videos/technology/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/https:\/\/player\.vimeo\.com\/external\/[^"']+\.mp4[^"']*/);
    console.log(match ? match[0] : 'Not found');
  });
});
