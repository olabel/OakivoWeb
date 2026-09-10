const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Add Security Logger after app.use(express.json())
const securityLoggerCode = `
  // Structured Security Logging Middleware
  app.use((req, res, next) => {
    if (req.method === 'POST') {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'] || 'Unknown';
      console.log(\`[SECURITY AUDIT] \${new Date().toISOString()} | \${req.method} \${req.path} | IP: \${ip} | UA: \${userAgent}\`);
      
      // Bot Detection Logging
      if (req.body && req.body.b_company_suite) {
        console.warn(\`[SECURITY ALERT] Honeypot field filled on \${req.path}. Potential bot activity from IP: \${ip}\`);
      }
    }
    next();
  });
`;

if (!content.includes('[SECURITY AUDIT]')) {
  content = content.replace(
    "app.use(express.json({ limit: '10kb' })); // Restrict payload size to prevent DOS",
    "app.use(express.json({ limit: '10kb' })); // Restrict payload size to prevent DOS\n" + securityLoggerCode
  );
}

// Ensure frameSrc allows youtube
content = content.replace(
  'frameSrc: ["\'self\'", "https://*.firebaseapp.com"],',
  'frameSrc: ["\'self\'", "https://*.firebaseapp.com", "https://www.youtube.com", "https://youtube.com"],'
);

// Ensure scriptSrc allows youtube API if needed, and 'unsafe-inline' is enabled in production if the user wants it to build without issues.
// Vite sometimes needs 'unsafe-inline' for inline scripts in HTML.
content = content.replace(
  `scriptSrc: [
            "'self'", 
            "https://apis.google.com", 
            "https://www.gstatic.com", 
            "https://www.googletagmanager.com"
          ],`,
  `scriptSrc: [
            "'self'", 
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://apis.google.com", 
            "https://www.gstatic.com", 
            "https://www.googletagmanager.com",
            "https://www.youtube.com",
            "https://s.ytimg.com"
          ],`
);

fs.writeFileSync('server.ts', content);
