# newslook

A modern AI-powered global news summarizer and feed, now called 'newslook'.

- **Frontend**: React + Vite + TypeScript
- **Backend**: Node.js + Express
- **APIs**:
  - News: NewsAPI.org (top headlines, category, search)
  - AI Summaries: OpenAI (optional; can be disabled)

## Quick Start

### 1) Backend

```bash
cd backend
cp .env.example .env
# edit .env to add keys
npm install
npm run dev
```

The backend starts on `http://localhost:8080`.

### 2) Frontend

```bash
cd frontend
cp .env.example .env
# (optional) set VITE_API_BASE if your backend is not localhost:8080
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

### Environment Variables

#### backend/.env
```
NEWS_API_KEY=your_newsapi_key_here
OPENAI_API_KEY=your_openai_key_here   # optional; leave empty to disable summaries
PORT=8080
ALLOWED_ORIGIN=http://localhost:5173
```

#### frontend/.env
```
VITE_API_BASE=http://localhost:8080
```

### Deploy (free-tier friendly)

- Frontend: Vercel / Netlify
- Backend: Render / Railway

Set the same environment variables on your hosting providers.

### Notes

- If you don't want AI summaries, simply leave `OPENAI_API_KEY` blank; the UI will hide "Summarize" buttons.
- NewsAPI sometimes restricts full content; this app displays the data available from the API response.
