import { NextRequest, NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/tmdb';
import { mockReleases } from '@/lib/data';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (!query) return NextResponse.json({ movies: [], releases: [] });

  const [movies, releases] = await Promise.all([
    tmdbClient.search(query).then((r) => r.results).catch(() => []),
    Promise.resolve(mockReleases.filter((release) => [release.title, release.upc, release.catalogNumber, release.distributor].join(' ').toLowerCase().includes(query.toLowerCase())))
  ]);

  return NextResponse.json({ movies, releases });
}
