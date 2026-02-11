import Link from 'next/link';
import { tmdbClient } from '@/lib/tmdb';
import { mockReleases } from '@/lib/data';
import { MovieCard } from '@/components/movie-card';
import { ReleaseCard } from '@/components/release-card';

export const revalidate = 3600;

export default async function HomePage() {
  const [trending, popular] = await Promise.allSettled([tmdbClient.trending(), tmdbClient.popular()]);

  const trendingMovies = trending.status === 'fulfilled' ? trending.value.results.slice(0, 8) : [];
  const popularMovies = popular.status === 'fulfilled' ? popular.value.results.slice(0, 8) : [];

  return (
    <div className="space-y-10">
      <section className="card-glow p-6">
        <h1 className="font-heading text-2xl text-cyan-100">VHS Collector Database</h1>
        <p className="mt-2 max-w-2xl text-zinc-300">Search canonical movie titles and collector-grade VHS variants. Track your owned and wanted releases with moderation-backed metadata.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/search" className="rounded-md bg-neon px-4 py-2 text-sm font-semibold">Search now</Link>
          <Link href="/add-release" className="rounded-md border border-cyan-300/40 px-4 py-2 text-sm">Add VHS release</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl">Trending from TMDb</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {trendingMovies.map((movie) => <MovieCard key={movie.id} id={movie.id} title={movie.title} year={movie.release_date?.slice(0, 4)} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl">Popular right now</h2>
        <div className="grid gap-3 md:grid-cols-4">
          {popularMovies.map((movie) => <MovieCard key={movie.id} id={movie.id} title={movie.title} year={movie.release_date?.slice(0, 4)} />)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl">Recently added VHS variants</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {mockReleases.map((release) => <ReleaseCard key={release.id} id={release.id} title={release.title} distributor={release.distributor} upc={release.upc} />)}
        </div>
      </section>
    </div>
  );
}
