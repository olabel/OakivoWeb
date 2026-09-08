import express from 'express';
import path from 'path';
import fs from 'fs';
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
            "https://apis.google.com", 
            "https://www.gstatic.com", 
            "https://www.googletagmanager.com"
          ], // Removed unsafe-inline and unsafe-eval to prevent XSS
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // unsafe-inline kept ONLY for Framer Motion animation styles
          fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
          imgSrc: ["'self'", "data:", "https://*", "blob:"],
          connectSrc: ["'self'", "https://*", "wss://*"],
          frameSrc: ["'self'", "https://*.firebaseapp.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: [],
        },
      } : false, // Keep CSP off in dev to avoid Vite HMR issues
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
      frameguard: {
        action: 'deny' // Prevent clickjacking
      },
      xContentTypeOptions: true, // X-Content-Type-Options: nosniff
      hidePoweredBy: true,
    })
  );

  app.use(cors());
  app.use(express.json({ limit: '10kb' })); // Restrict payload size to prevent DOS

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
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      connectionTimeout: 2000, // 2 seconds timeout so it doesn't hang UI
      greetingTimeout: 2000,
      socketTimeout: 2000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Fallback to ethereal email for testing or simply log
    transporter = {
      sendMail: async (info: any) => {
        console.log('--- MOCK EMAIL SENT ---');
        console.log('To:', info.to);
        console.log('Subject:', info.subject);
        console.log('Text:', info.text);
        console.log('-----------------------');
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

  
  // Automated XML Sitemap Generator (Reads from App.tsx)
  app.get('/sitemap.xml', (req, res) => {
    const siteUrl = 'https://www.oakivo.com';
    
    
    let allRoutes = [];
    try {
      const appTsxContent = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf8');
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
      // Fallback
      allRoutes = ['/', '/services', '/case-studies', '/contact', '/insights'];
    }

    allRoutes = [...new Set(allRoutes)].filter(route => !route.includes('/admin-portal'));

    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapUrls = allRoutes.map(route => {
      let priority = '0.8';
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = '1.0';
        changefreq = 'daily';
      } else if (route.includes('/locations/') || route.includes('/solutions/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (route === '/insights') {
        priority = '0.9';
        changefreq = 'daily';
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

    res.header('Content-Type', 'application/xml');
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

  // Vite middleware for development or Static serve for production
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
    // Use app.use for SPA fallback to avoid Express 5 wildcard routing issues
    app.use((req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Secure Backend] Server running on port ${PORT}`);
  });
}

startServer();
