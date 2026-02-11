const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'] as const;

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`Missing env var ${key}`);
  }
}

export const env = {
  tmdbApiKey: process.env.TMDB_API_KEY,
  tmdbBaseUrl: process.env.TMDB_API_BASE_URL ?? 'https://api.themoviedb.org/3',
  wikipediaApiBaseUrl: process.env.WIKIPEDIA_API_BASE_URL ?? 'https://en.wikipedia.org/api/rest_v1',
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  scanlinesDefault: process.env.NEXT_PUBLIC_SCANLINES_DEFAULT === 'true'
};
