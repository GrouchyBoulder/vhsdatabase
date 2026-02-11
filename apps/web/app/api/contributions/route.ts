import { NextRequest, NextResponse } from 'next/server';
import { contributionSchema } from '@vhs/shared/src/schemas';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = contributionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({ status: 'queued', data: parsed.data }, { status: 202 });
}
