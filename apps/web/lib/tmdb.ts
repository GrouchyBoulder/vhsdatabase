import { env } from './env';

async function tmdbFetch<T>(path: string): Promise<T> {
  if (!env.tmdbApiKey) throw new Error('TMDB_API_KEY missing');
  const res = await fetch(`${env.tmdbBaseUrl}${path}${path.includes('?') ? '&' : '?'}api_key=${env.tmdbApiKey}`, {
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error(`TMDb error ${res.status}`);
  return res.json();
}

export const tmdbClient = {
  trending: () => tmdbFetch<{ results: Array<{ id: number; title: string; poster_path: string | null; release_date: string }> }>('/trending/movie/week'),
  popular: () => tmdbFetch<{ results: Array<{ id: number; title: string; poster_path: string | null; release_date: string }> }>('/movie/popular'),
  search: (query: string) => tmdbFetch<{ results: Array<{ id: number; title: string; poster_path: string | null; release_date: string }> }>(`/search/movie?query=${encodeURIComponent(query)}`),
  details: (id: string) => tmdbFetch<any>(`/movie/${id}?append_to_response=credits,images`)
};
