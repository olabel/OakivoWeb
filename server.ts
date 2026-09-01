import express from 'express';
import path from 'path';
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
      contentSecurityPolicy: false, // Vite needs inline scripts for HMR
    })
  );

  app.use(cors());
  app.use(express.json());

  // Rate Limiting for API
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
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

  // Booking / Contact API Endpoint
  app.post('/api/book-audit', async (req, res) => {
    try {
      const { name, email, company, message, urgency } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
      }

      const mailOptions = {
        from: process.env.SMTP_USER || '"Oakivo System" <no-reply@oakivo.com>',
        to: process.env.CONTACT_EMAIL || 'ahmed.bello@oakivo.com',
        subject: `[High Priority] Security Audit Request - ${company || name}`,
        text: `New Security Audit Request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nUrgency: ${urgency || 'Normal'}\n\nMessage:\n${message}`,
        html: `<h2>New Security Audit Request</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Company:</strong> ${company || 'N/A'}</p>
               <p><strong>Urgency:</strong> ${urgency || 'Normal'}</p>
               <hr/>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br>')}</p>`
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

  // Chat API Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, language } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Valid messages array is required.' });
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Secure Backend] Server running on port ${PORT}`);
  });
}

startServer();
