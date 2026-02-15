import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

const schema = z.object({ basePriceRub: z.number().int().min(1) });

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const setting = await prisma.adminSetting.findUnique({ where: { id: 1 } });
  const methods = await prisma.paymentMethod.findMany({ orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ setting, methods });
}

export async function PATCH(request: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const updated = await prisma.adminSetting.upsert({ where: { id: 1 }, update: parsed.data, create: { id: 1, currency: 'RUB', ...parsed.data } });
  return NextResponse.json(updated);
}
