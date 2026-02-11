import { NextResponse } from 'next/server';
import { tmdbClient } from '@/lib/tmdb';

export async function GET() {
  try {
    const data = await tmdbClient.trending();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
