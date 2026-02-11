import { env } from './env';

export async function getWikipediaSummary(title: string) {
  const url = `${env.wikipediaApiBaseUrl}/page/summary/${encodeURIComponent(title)}`;
  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) return null;
  const json = await response.json();
  return {
    title: json.title as string,
    excerpt: (json.extract as string)?.split('\n').slice(0, 3).join('\n'),
    sourceUrl: json.content_urls?.desktop?.page as string,
    fetchedAt: new Date().toISOString(),
    licenseNotice: 'Wikipedia content is licensed under CC BY-SA 4.0; attribution and share-alike apply.'
  };
}
