import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import { fetchNews, type Article } from './api'
import ArticleCard from './components/ArticleCard'

function App() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('general')

  const [aiEnabled, setAiEnabled] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      // Revert to original: fetch US news
      const data = await fetchNews({ country: 'us', category, q: q || undefined, pageSize: 24 })
      setArticles(data.articles || [])
    } catch (e:any) {
      setError('Failed to load news. Check backend and NEWS_API_KEY.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Hide AI if backend lacks OPENAI key (we detect via a quick check on first summarize attempt)
  // For simplicity, we let summarize endpoint respond if missing key.

  return (
    <div className="container">
      <Header q={q} setQ={setQ} category={category} setCategory={setCategory} onSearch={load} />
      <div className="toolbar">
        <div className="hint">Default feed: Global top news. Use search/category to refine.</div>
        <label className="toggle">
          <input type="checkbox" checked={aiEnabled} onChange={() => setAiEnabled(v => !v)} />
          <span>AI summaries</span>
        </label>
      </div>
      {loading && <div className="loading">Loading latest headlines…</div>}
      {error && <div className="error">{error}</div>}
      <div className="grid">
        {!loading && articles.map((a, i) => <ArticleCard key={i} article={a} aiEnabled={aiEnabled} />)}
      </div>
    </div>
  )
}

export default App
