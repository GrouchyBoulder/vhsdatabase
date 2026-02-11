import { NextResponse } from 'next/server';
import { getWikipediaSummary } from '@/lib/wikipedia';

export async function GET(_: Request, { params }: { params: { title: string } }) {
  const summary = await getWikipediaSummary(params.title);
  if (!summary) return NextResponse.json({ error: 'No summary found' }, { status: 404 });
  return NextResponse.json(summary);
}
