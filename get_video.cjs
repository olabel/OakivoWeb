const https = require('https');
https.get('https://github.com/mdn/learning-area/raw/main/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4', (res) => {
  console.log(res.statusCode);
});
