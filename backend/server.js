import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const app = express();
app.use(express.json());

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ALLOWED_ORIGIN }));

const PORT = process.env.PORT || 8080;
const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Fetch news (India-focused by default)
app.get('/api/news', async (req, res) => {
  try {
    const { category = '', q = '', pageSize = 20 } = req.query;
    const url = 'https://newsapi.org/v2/everything';
    const searchQuery = q && q.trim().length > 0 ? q : 'news';
    const params = {
      apiKey: NEWS_API_KEY,
      q: searchQuery,
      pageSize,
      sortBy: 'publishedAt',
      language: 'en'
    };
    const { data } = await axios.get(url, { params });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Summarize endpoint (Gemini)
app.post('/api/summarize', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Gemini not configured' });
    }
    const { text } = req.body;
    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Provide the article content (>= 50 chars)' });
    }
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Summarize the following news article in 3 concise bullet points.\nUse simple Indian English. Avoid clickbait. Output only bullets.\n---\n${text}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    res.json({ summary });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to summarize' });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
