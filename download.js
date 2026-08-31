const ytdl = require('ytdl-core');
const fs = require('fs');
ytdl('http://www.youtube.com/watch?v=J0wg1YLhXi8', { filter: format => format.container === 'mp4' })
  .pipe(fs.createWriteStream('public/background-loop.mp4'))
  .on('finish', () => console.log('Downloaded!'));
