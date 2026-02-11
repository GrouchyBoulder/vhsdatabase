import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/tmdb';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const details = await tmdbClient.details(params.id);
    return NextResponse.json(details);
  } catch {
    return NextResponse.json({ error: 'Movie unavailable' }, { status: 404 });
  }
}
