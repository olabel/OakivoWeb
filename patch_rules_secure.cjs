const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');
content = content.replace("allow write: if true; // Temporarily allow for syncing", "allow write: if request.auth != null;");
fs.writeFileSync('firestore.rules', content);
