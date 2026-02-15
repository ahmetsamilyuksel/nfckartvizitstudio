import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminSession, validateAdmin } from '@/lib/auth';

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  const ok = await validateAdmin(parsed.data.email, parsed.data.password);
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await createAdminSession(parsed.data.email);
  return NextResponse.json({ ok: true });
}
