import { NextResponse } from 'next/server';
import { mockReleases } from '@/lib/data';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const release = mockReleases.find((entry) => entry.id === params.id);
  if (!release) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(release);
}
