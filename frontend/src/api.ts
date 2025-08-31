import axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export const api = axios.create({
  baseURL: apiBase
});

export type Article = {
  source?: { name?: string };
  author?: string | null;
  title?: string;
  description?: string | null;
  url?: string;
  urlToImage?: string | null;
  publishedAt?: string;
  content?: string | null;
};

export async function fetchNews(params: { country?: string; category?: string; q?: string; pageSize?: number }) {
  const { data } = await api.get('/api/news', { params });
  return data;
}

export async function summarize(text: string): Promise<string> {
  const { data } = await api.post('/api/summarize', { text });
  return data.summary;
}
