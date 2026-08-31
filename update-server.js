const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const importGemini = `import { GoogleGenAI } from "@google/genai";\n`;

if (!serverCode.includes('@google/genai')) {
  serverCode = importGemini + serverCode;
}

const chatEndpoint = `
  // Chat API Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      
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
      // We only take the last 10 messages for context, excluding the latest one (which is the new prompt)
      // The Gemini API chat expects alternating user/model roles, starting with user.
      // But we can just use generateContent with system instruction.
      
      const formattedContents = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: formattedContents,
        config: {
          systemInstruction: "You are an expert DevSecOps sales engineer and security consultant for Oakivo. Keep your answers concise, professional, and helpful. Guide the user towards scheduling a compliance audit or security consultation.",
        }
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error('Gemini API error:', error);
      res.status(500).json({ error: 'Failed to process AI response.' });
    }
  });

  // Health check
`;

serverCode = serverCode.replace('// Health check', chatEndpoint);

fs.writeFileSync('server.ts', serverCode);
console.log("server.ts updated");
