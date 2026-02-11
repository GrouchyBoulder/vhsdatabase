import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import { getWikipediaSummary } from '@/lib/wikipedia';
import { mockReleases } from '@/lib/data';

export const revalidate = 3600;

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const details = await tmdbClient.details(params.id).catch(() => null);
  if (!details) return <div className="card-glow p-6">Movie unavailable (rate limit or missing data).</div>;

  const summary = await getWikipediaSummary(details.title);
  const releases = mockReleases.filter((release) => release.movieId === params.id);

  return (
    <div className="space-y-6">
      <section className="card-glow p-6">
        <h1 className="font-heading text-2xl text-cyan-100">{details.title}</h1>
        <p className="text-zinc-300">{details.release_date?.slice(0, 4)} • {details.runtime} min</p>
        <p className="mt-2 text-zinc-300">Genres: {details.genres?.map((g: { name: string }) => g.name).join(', ') || 'N/A'}</p>
        <p className="mt-2 text-zinc-300">Top cast: {details.credits?.cast?.slice(0, 5).map((c: { name: string }) => c.name).join(', ') || 'N/A'}</p>
      </section>

      <section className="card-glow p-6">
        <h2 className="font-heading text-xl">Wikipedia Summary</h2>
        <p className="mt-2 whitespace-pre-line text-zinc-200">{summary?.excerpt || 'No summary available.'}</p>
        <div className="mt-3 text-xs text-zinc-400">
          <p>Source: <Link className="text-cyan-300" href={summary?.sourceUrl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(details.title)}`}>Wikipedia</Link></p>
          <p>Fetched: {summary?.fetchedAt ?? 'N/A'}</p>
          <p>Wikipedia content is licensed under CC BY-SA 4.0; attribution and share-alike apply.</p>
        </div>
      </section>

      <section className="card-glow p-6">
        <h2 className="font-heading text-xl">VHS Releases / Variants</h2>
        <div className="mt-3 space-y-2">
          {releases.map((release) => (
            <Link key={release.id} href={`/releases/${release.id}`} className="block rounded-md border border-cyan-300/20 p-3">
              {release.title} • {release.packaging} • {release.region}
            </Link>
          ))}
          {!releases.length && <p className="text-zinc-400">No variants yet. Add one.</p>}
        </div>
      </section>
    </div>
  );
}
