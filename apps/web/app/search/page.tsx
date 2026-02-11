import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import { mockReleases } from '@/lib/data';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim() ?? '';
  const movies = query ? await tmdbClient.search(query).then((r) => r.results.slice(0, 10)).catch(() => []) : [];
  const releases = query
    ? mockReleases.filter((release) => [release.title, release.upc, release.catalogNumber, release.distributor].join(' ').toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl">Search Movies & VHS Variants</h1>
      <form className="card-glow flex gap-2 p-3">
        <input className="w-full rounded-md bg-zinc-900 px-3 py-2" placeholder="Title, UPC, catalog, distributor" defaultValue={query} name="q" />
        <button className="rounded-md bg-neon px-4 py-2 text-sm">Search</button>
      </form>
      <section>
        <h2 className="mb-2 font-heading text-lg">Movies</h2>
        <div className="space-y-2">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="card-glow block p-3">
              {movie.title} <span className="text-zinc-400">({movie.release_date?.slice(0, 4) || 'N/A'})</span>
            </Link>
          ))}
          {!movies.length && <p className="text-zinc-400">No movie results.</p>}
        </div>
      </section>
      <section>
        <h2 className="mb-2 font-heading text-lg">VHS Releases</h2>
        <div className="space-y-2">
          {releases.map((release) => (
            <Link key={release.id} href={`/releases/${release.id}`} className="card-glow block p-3">
              {release.title} <span className="text-zinc-400">UPC {release.upc}</span>
            </Link>
          ))}
          {!releases.length && <p className="text-zinc-400">No VHS results.</p>}
        </div>
      </section>
    </div>
  );
}
