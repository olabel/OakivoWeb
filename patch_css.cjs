const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf8');

if (!content.includes('@plugin "@tailwindcss/typography"')) {
  content = content.replace(
    '@import "tailwindcss";',
    '@import "tailwindcss";\n@plugin "@tailwindcss/typography";'
  );
  fs.writeFileSync('src/index.css', content);
  console.log('Patched index.css with typography plugin');
}
