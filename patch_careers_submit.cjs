const fs = require('fs');
let content = fs.readFileSync('pages/Careers.tsx', 'utf8');

const target = `// Save to Firebase
      const entryId = await db.saveEntry('applicant', formState);
      
      // Notify via server
      await fetch('/api/notify-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'applicant', data: formState, entryId })
      }).catch(err => console.warn('Email notification failed, but lead saved:', err));`;

const replacement = `// Save to Firebase (this automatically triggers the email notification)
      await db.saveEntry('applicant', formState);`;

content = content.replace(target, replacement);
fs.writeFileSync('pages/Careers.tsx', content);
