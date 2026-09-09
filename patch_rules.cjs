const fs = require('fs');

let content = fs.readFileSync('firestore.rules', 'utf8');

const newRules = `    match /insights/{document=**} {
      allow read: if true;
      allow write: if true; // Temporarily allow for syncing
    }
  }
}`;

content = content.replace("  }\n}", newRules);
fs.writeFileSync('firestore.rules', content);
