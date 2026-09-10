const fs = require('fs');
let content = fs.readFileSync('components/SolutionsInAction.tsx', 'utf8');

const realVideoBlock = `{/* Real Video Player */}
                <iframe 
                  className="w-full h-full"
                  src={activeVideo === 'cspm' ? 'https://www.youtube.com/embed/50g05T8VupU?autoplay=1&mute=1' : 
                       activeVideo === 'devsecops' ? 'https://www.youtube.com/embed/bvd3qCjvuP4?autoplay=1&mute=1' : 
                       activeVideo === 'iam' ? 'https://www.youtube.com/embed/q6-pLg9y5hA?autoplay=1&mute=1' : 
                       'https://www.youtube.com/embed/y2_B4I1jWAA?autoplay=1&mute=1'}
                  title="Solutions in Action Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>`;

content = content.replace(/\{\/\* Real Video Player \*\/\}[^<]*<video[\s\S]*?\/>/m, realVideoBlock);

fs.writeFileSync('components/SolutionsInAction.tsx', content);
