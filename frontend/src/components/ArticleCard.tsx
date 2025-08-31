import React, { useState } from 'react';
import type { Article } from '../api';
import { summarize } from '../api';

type Props = {
  article: Article;
  aiEnabled: boolean;
};

const ArticleCard: React.FC<Props> = ({ article, aiEnabled }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');

  const onSummarize = async () => {
    if (!article.content && !article.description) return;
    setLoading(true);
    try {
      const text = (article.content || article.description || '').slice(0, 4000);
      const s = await summarize(text);
      setSummary(s);
    } catch (e) {
      setSummary('Failed to summarize.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {article.urlToImage && <img className="thumb" src={article.urlToImage} alt={article.title || 'news'} />}
      <div className="body">
        <div className="meta">
          <span className="source">{article.source?.name || 'Unknown'}</span>
          {article.publishedAt && <span className="date">{new Date(article.publishedAt).toLocaleString()}</span>}
        </div>
        <h3 className="title">{article.title}</h3>
        {article.description && <p className="desc">{article.description}</p>}
        <div className="actions">
          <a className="read" href={article.url || '#'} target="_blank" rel="noreferrer">Read Full</a>
          {aiEnabled && (
            <button onClick={onSummarize} disabled={loading}>
              {loading ? 'Summarizing…' : 'AI Summary'}
            </button>
          )}
        </div>
        {summary && (
          <div className="summary">
            {summary.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
