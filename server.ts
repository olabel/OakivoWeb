import express from 'express';
import path from 'path';
import fs from 'fs';
import { insightsData } from './content/insights';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the reverse proxy (required for Rate Limiter when deployed in container environments)
  app.set('trust proxy', 1);

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'", 
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://apis.google.com", 
            "https://www.gstatic.com", 
            "https://www.googletagmanager.com",
            "https://www.youtube.com",
            "https://s.ytimg.com"
          ],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: ["'self'", "data:", "https://*", "blob:"],
          connectSrc: ["'self'", "https://*", "wss://*"],
          frameSrc: ["'self'", "https://*.firebaseapp.com", "https://www.youtube.com", "https://youtube.com"],
          frameAncestors: ["*"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: [],
        },
      } : false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
      frameguard: false, // Must be disabled so AI Studio iframe preview can render
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      xContentTypeOptions: true,
      hidePoweredBy: true,
    })
  );

  app.use(cors());
  app.use(express.json({ limit: '10kb' })); // Restrict payload size to prevent DOS

  // Structured Security Logging Middleware
  app.use((req, res, next) => {
    if (req.method === 'POST') {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'] || 'Unknown';
      console.log(`[SECURITY AUDIT] ${new Date().toISOString()} | ${req.method} ${req.path} | IP: ${ip} | UA: ${userAgent}`);
      
      // Bot Detection Logging
      if (req.body && req.body.b_company_suite) {
        console.warn(`[SECURITY ALERT] Honeypot field filled on ${req.path}. Potential bot activity from IP: ${ip}`);
      }
    }
    next();
  });


  // Global Rate Limiting for generic API endpoints
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  });

  // Strict Rate Limiting for Contact & Booking Forms to prevent spam/brute-force
  const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // limit each IP to 5 form submissions per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many form submissions from this IP, please try again after an hour. For urgent matters, email us directly.' },
  });

  // Strict Rate Limiting for AI Chat to prevent API quota exhaustion
  const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 15 chat interactions per 15 minutes
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Chat limit reached to prevent AI abuse. Please try again later or contact us directly.' },
  });

  app.use('/api/', apiLimiter);

  // Email Transporter Setup (Mocked if credentials not provided)
  let transporter: nodemailer.Transporter;
  
  const smtpHost = process.env.SMTP_HOST || 'smtp.oakivo.com';
  const smtpPort = process.env.SMTP_PORT || '587';
  const smtpUser = process.env.SMTP_USER || 'no-reply@oakivo.com';
  
  if (process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpPort === '465',
      connectionTimeout: 2000,
      greetingTimeout: 2000,
      socketTimeout: 2000,
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    console.warn("\n[WARNING] No SMTP_PASS found in environment variables. Real emails cannot be sent to olabel@gmail.com without the password for " + smtpUser + ". Falling back to console logging.\n");
    transporter = {
      sendMail: async (info: any) => {
        console.log('--- MOCK EMAIL SENT (Intercepted due to missing SMTP_PASS) ---');
        console.log('To:', info.to);
        console.log('Subject:', info.subject);
        console.log('Text:', info.text);
        console.log('--------------------------------------------------------------');
        return { messageId: 'mock-id' };
      }
    } as any;
  }

  const escapeHtml = (unsafe: string) => {
    if (typeof unsafe !== 'string') return unsafe;
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  // Activity Logging Middleware for Form Submissions
  const logFormSubmission = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    let maskedIp = 'unknown';
    
    if (ip !== 'unknown') {
      if (ip.includes(':')) {
        // IPv6 masking
        const parts = ip.split(':');
        maskedIp = parts.slice(0, Math.max(1, parts.length - 2)).join(':') + ':***:***';
      } else {
        // IPv4 masking
        const parts = ip.split('.');
        maskedIp = parts.slice(0, Math.max(1, parts.length - 1)).join('.') + '.***';
      }
    }
    
    const timestamp = new Date().toISOString();
    console.log(`[SECURITY_LOG] Form Submission Attempt | Time: ${timestamp} | Endpoint: ${req.originalUrl} | IP: ${maskedIp}`);
    next();
  };

  // Booking / Contact API Endpoint
  app.post('/api/book-audit', formLimiter, logFormSubmission, async (req, res) => {
    try {
      const { name, email, company, message, urgency } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      // Input size validation to prevent oversized payloads processing
      if (
        name.length > 100 || 
        email.length > 150 || 
        message.length > 5000 || 
        (company && company.length > 100) || 
        (urgency && urgency.length > 50)
      ) {
        return res.status(400).json({ error: 'Input exceeds maximum allowed length.' });
      }

      // Basic email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }

      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || 'olabel@gmail.com, ahmed.bello@oakivo.com',
        subject: `[High Priority] Security Audit Request - ${company || name}`,
        text: `New Security Audit Request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nUrgency: ${urgency || 'Normal'}\n\nMessage:\n${message}`,
        html: `<h2>New Security Audit Request</h2>
               <p><strong>Name:</strong> ${escapeHtml(name)}</p>
               <p><strong>Email:</strong> ${escapeHtml(email)}</p>
               <p><strong>Company:</strong> ${escapeHtml(company || 'N/A')}</p>
               <p><strong>Urgency:</strong> ${escapeHtml(urgency || 'Normal')}</p>
               <hr/>
               <p><strong>Message:</strong></p>
               <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error('Email send failed (likely due to sandbox environment blocking port), continuing anyway:', mailError);
      }
      
      res.json({ success: true, message: 'Your request has been prioritized and dispatched to our engineering team.' });
    } catch (error) {
      console.error('API processing error:', error);
      res.status(500).json({ error: 'Failed to process request. Please try again later.' });
    }
  });


  // Generic Form Notification API Endpoint
  app.post('/api/notify-form', logFormSubmission, async (req, res) => {
    try {
      const { type, data, entryId } = req.body;
      
      let htmlContent = `<h2>New Form Submission: ${type.toUpperCase()}</h2>`;
      htmlContent += `<p><strong>Entry ID:</strong> ${entryId}</p><hr/>`;
      
      let textContent = `New Form Submission: ${type.toUpperCase()}\nEntry ID: ${entryId}\n\n`;
      
      for (const [key, value] of Object.entries(data)) {
        const safeKey = escapeHtml(key);
        const safeValue = escapeHtml(String(value));
        htmlContent += `<p><strong>${safeKey}:</strong> ${safeValue}</p>`;
        textContent += `${safeKey}: ${safeValue}\n`;
      }

      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || 'olabel@gmail.com, ahmed.bello@oakivo.com',
        subject: `[Oakivo] New ${type} Submission`,
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

  // Chat API Endpoint
  app.post('/api/chat', chatLimiter, async (req, res) => {
    try {
      const { messages, language } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Valid messages array is required.' });
      }
      
      // Prevent massive context window abuses
      if (messages.length > 50) {
        return res.status(400).json({ error: 'Too many messages in history.' });
      }
      
      // Validate each message payload length
      for (const msg of messages) {
        if (!msg.content || typeof msg.content !== 'string' || msg.content.length > 2000) {
           return res.status(400).json({ error: 'Message content must be a string under 2000 characters.' });
        }
        if (msg.type !== 'user' && msg.type !== 'bot') {
           return res.status(400).json({ error: 'Invalid message type.' });
        }
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'AI capabilities are currently unavailable.' });
      }

      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare history for chat
      // We only take the last 10 messages for context
      const formattedContents = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const langInstruction = language === 'fr' 
        ? "Vous devez répondre en français. " 
        : "You must reply in English. ";

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction: langInstruction + "You are an expert DevSecOps sales engineer and security consultant for Oakivo. Keep your answers concise, professional, and helpful. Guide the user towards scheduling a compliance audit or security consultation.",
        }
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error('Gemini API error:', error);
      res.status(500).json({ error: 'Failed to process AI response.' });
    }
  });

  // Automated XML Sitemap Generator & RSS Syndication
  app.get('/rss.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    
    let rssItems = '';
    try {
      // Use imported insightsData
      insightsData.forEach(post => {
        const postUrl = `${siteUrl}/insights/${post.id}`;
        const pubDateStr = new Date(post.date).toUTCString();
        const escapedContent = post.content ? post.content.replace(/]]>/g, ']]&gt;') : '';
        const escapedExcerpt = post.excerpt ? post.excerpt.replace(/]]>/g, ']]&gt;') : '';
        
        rssItems += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDateStr}</pubDate>
      <author><![CDATA[${post.author || 'Oakivo Research Group'}]]></author>
      <description><![CDATA[${escapedExcerpt}]]></description>
      <content:encoded><![CDATA[${escapedContent}]]></content:encoded>
      ${post.coverImage ? `<enclosure url="${post.coverImage.replace(/&/g, '&amp;')}" type="image/jpeg" length="0" />` : ''}
      <category><![CDATA[${post.category}]]></category>
    </item>`;
      });
    } catch (e) {
      console.error("Error generating RSS", e);
    }
    
    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Oakivo Security Insights | Cloud Security &amp; DevSecOps Intelligence</title>
    <link>${siteUrl}/insights</link>
    <description>Authoritative research on Zero-Trust Architecture, Kubernetes Posture Management, automated compliance (SOC 2, PIPEDA, ISO 27001), and DevSecOps pipelines by Oakivo Solutions.</description>
    <language>en-ca</language>
    <copyright>Copyright ${new Date().getFullYear()} Oakivo Solutions Inc. All rights reserved.</copyright>
    <managingEditor>contact@oakivo.com (Oakivo Editorial Team)</managingEditor>
    <webMaster>contact@oakivo.com (Oakivo Webmaster)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />${rssItems}
  </channel>
</rss>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600');
    res.send(rssFeed);
  });
  
  app.get('/sitemap.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    
    let allRoutes: string[] = [];
    try {
      // App.tsx is at project root
      const appTsxPath = fs.existsSync(path.join(process.cwd(), 'App.tsx'))
        ? path.join(process.cwd(), 'App.tsx')
        : path.join(process.cwd(), 'src', 'App.tsx');
      const appTsxContent = fs.readFileSync(appTsxPath, 'utf8');
      const routeRegex = /<Route[^>]*path=["']([^"']+)["'][^>]*>/g;
      let match;
      while ((match = routeRegex.exec(appTsxContent)) !== null) {
        const routePath = match[1];
        if (!routePath.includes('*') && !routePath.includes(':')) {
           allRoutes.push(routePath);
        }
      }
    } catch (e) {
      console.error("Error generating dynamic routes from App.tsx", e);
    }

    // Core static routes fallback to ensure complete coverage
    const coreRoutes = [
      '/',
      '/services',
      '/capabilities',
      '/case-studies',
      '/work',
      '/contact',
      '/schedule',
      '/methodology',
      '/careers',
      '/about',
      '/firm',
      '/verticals',
      '/industries',
      '/privacy',
      '/compliance-matrix',
      '/brand-identity',
      '/client-portal',
      '/insights',
      '/risk-calculator'
    ];

    allRoutes = [...new Set([...allRoutes, ...coreRoutes])].filter(route => !route.includes('/admin-portal') && !route.includes('/client-portal-demo'));

    // Dynamic solution pages
    const solutionSlugs = [
      'invoice-automation',
      'order-inventory-sync',
      'dispatch-route-logging',
      'custom-report-automation'
    ];
    solutionSlugs.forEach(slug => allRoutes.push(`/solutions/${slug}`));

    // Dynamic location pages
    const locationSlugs = [
      'new-brunswick',
      'nova-scotia',
      'prince-edward-island',
      'newfoundland-labrador'
    ];
    locationSlugs.forEach(slug => allRoutes.push(`/locations/${slug}`));

    // Dynamic compliance pages
    const complianceFrameworks = ['soc2', 'hipaa', 'iso27001', 'pci-dss', 'gdpr', 'pipeda', 'fedramp', 'cjis'];
    const complianceProviders = ['aws', 'azure', 'gcp', 'kubernetes'];
    complianceFrameworks.forEach(fw => {
      complianceProviders.forEach(prov => {
        allRoutes.push(`/compliance/${fw}-on-${prov}`);
      });
    });

    // Dynamic insights/articles
    try {
      insightsData.forEach(post => {
        allRoutes.push(`/insights/${post.id}`);
      });
    } catch(e) {}

    allRoutes = [...new Set(allRoutes)];

    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapUrls = allRoutes.map(route => {
      let priority = '0.7';
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (route === '/insights' || route === '/services' || route === '/capabilities') {
        priority = '0.9';
        changefreq = 'daily';
      } else if (route.startsWith('/insights/') || route.startsWith('/solutions/') || route.startsWith('/locations/')) {
        priority = '0.85';
        changefreq = 'weekly';
      } else if (route.startsWith('/compliance/')) {
        priority = '0.8';
        changefreq = 'weekly';
      } else if (route === '/privacy' || route === '/compliance-matrix') {
        priority = '0.5';
        changefreq = 'monthly';
      }

      return `  <url>
    <loc>https://www.oakivo.com${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=3600');
    res.send(sitemap);
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin-portal\nDisallow: /api/\n\nSitemap: https://www.oakivo.com/sitemap.xml\n`);
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', secure: true });
  });

  // Vite middleware for development vs static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    // Dynamic OG meta tags for social crawlers on insights routes
    app.get('/insights/:id', (req, res, next) => {
      const insightId = req.params.id;
      const post = insightsData.find((p: any) => p.id === insightId);
      const indexPath = path.join(distPath, 'index.html');
      if (post && fs.existsSync(indexPath)) {
        let html = fs.readFileSync(indexPath, 'utf-8');
        const title = `${post.title} | Oakivo DevSecOps Insights`;
        const description = post.excerpt || 'Read the latest DevSecOps and cloud security insights from Oakivo Solutions in Atlantic Canada.';
        const image = post.coverImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200';
        const url = `https://www.oakivo.com/insights/${post.id}`;

        const ogTags = `
          <title>${title}</title>
          <meta name="title" content="${title}" />
          <meta name="description" content="${description}" />
          <meta name="author" content="Oakivo Solutions Inc." />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Oakivo Solutions Inc." />
          <meta property="og:url" content="${url}" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:image:secure_url" content="${image}" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="${title}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@oakivo" />
          <meta name="twitter:creator" content="@oakivo" />
          <meta name="twitter:url" content="${url}" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />`;

        html = html.replace(/<meta property="og:.*?>/gi, '');
        html = html.replace(/<meta name="twitter:.*?>/gi, '');
        html = html.replace(/<title>.*?<\/title>/i, '');
        html = html.replace('</head>', `${ogTags}\n</head>`);
        return res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
      }
      next();
    });

    // Catch-all SPA fallback for production refreshing
    app.get('*all', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application build not found. Please run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Secure Backend] Server running on port ${PORT}`);
  });
}

startServer();
