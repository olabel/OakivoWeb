const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const notifyEndpoint = `
  // Generic Form Notification API Endpoint
  app.post('/api/notify-form', logFormSubmission, async (req, res) => {
    try {
      const { type, data, entryId } = req.body;
      
      let htmlContent = \`<h2>New Form Submission: \${type.toUpperCase()}</h2>\`;
      htmlContent += \`<p><strong>Entry ID:</strong> \${entryId}</p><hr/>\`;
      
      let textContent = \`New Form Submission: \${type.toUpperCase()}\\nEntry ID: \${entryId}\\n\\n\`;
      
      for (const [key, value] of Object.entries(data)) {
        const safeKey = escapeHtml(key);
        const safeValue = escapeHtml(String(value));
        htmlContent += \`<p><strong>\${safeKey}:</strong> \${safeValue}</p>\`;
        textContent += \`\${safeKey}: \${safeValue}\\n\`;
      }

      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || 'olabel@gmail.com, ahmed.bello@oakivo.com',
        subject: \`[Oakivo] New \${type} Submission\`,
        text: textContent,
        html: htmlContent
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error('Email send failed:', mailError);
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error('API processing error:', error);
      res.status(500).json({ error: 'Failed to process request.' });
    }
  });
`;

if (!content.includes('/api/notify-form')) {
  content = content.replace(
    "  // Chat API Endpoint",
    notifyEndpoint + "\n  // Chat API Endpoint"
  );
  fs.writeFileSync('server.ts', content);
  console.log("Patched server.ts with notify-form endpoint");
}
