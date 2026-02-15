import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

const schema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(2),
  type: z.enum(['manual', 'bank', 'card', 'crypto', 'other']),
  active: z.boolean(),
  instructions: z.string().optional(),
  sortOrder: z.number().int().default(0)
});

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { id, ...data } = parsed.data;
  if (id) {
    const updated = await prisma.paymentMethod.update({ where: { id }, data });
    return NextResponse.json(updated);
  }
  const created = await prisma.paymentMethod.create({ data });
  return NextResponse.json(created);
}

export async function DELETE(request: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  await prisma.paymentMethod.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
