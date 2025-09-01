📰 AI News Digest

An AI-powered news aggregator that fetches top Indian news and generates concise summaries using OpenAI.
The app is designed to help users stay updated with the latest news in a quick, clutter-free, and intelligent way.

✨ Features

🔍 Fetches real-time Indian news using NewsAPI

🤖 Generates AI-based summaries with OpenAI

🗂️ Categorized news (Politics, Sports, Technology, Business, etc.)

🌐 Simple and responsive web interface

💾 Secure API key handling via .env

(Optional future) 🎙️ Text-to-Speech news summaries in Hindi/English

🛠️ Tech Stack

Frontend: React / Vite

Backend: Node.js, Express

APIs: NewsAPI, OpenAI API

Deployment: Vercel (frontend), Render/Heroku (backend)

📸 Screenshots


![Homepage Screenshot]
<img width="1857" height="859" alt="image" src="https://github.com/user-attachments/assets/be47aaab-50e3-4f27-b88b-dda091827b82" />

![News Summary Screenshot]
<img width="393" height="741" alt="image" src="https://github.com/user-attachments/assets/537c900f-94e7-4992-b9fb-73c2c380e20d" />


🚀 Getting Started
1. Clone the repository
git clone https://github.com/dmrworse007/NEWS-LOOK.git
cd NEWS-LOOK

2. Install dependencies
npm install

3. Set up environment variables

Create a .env file in the root folder and add:

NEWS_API_KEY=your_newsapi_key_here
OPENAI_API_KEY=your_openai_key_here
(for the time being i have made the api key visible for ease)

4. Run the app
npm run dev

📌 Future Improvements

Multi-language support (Hindi, Bengali, etc.)

Personalized news feed based on user preferences

Voice-enabled summaries (Text-to-Speech)

Save/favorite articles


### Notes

- If you don't want AI summaries, simply leave `OPENAI_API_KEY` blank; the UI will hide "Summarize" buttons.
- NewsAPI sometimes restricts full content; this app displays the data available from the API response.
