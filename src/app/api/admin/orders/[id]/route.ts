import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

const schema = z.object({ status: z.enum(['NEW', 'PAID', 'IN_PRODUCTION', 'SHIPPED', 'COMPLETED', 'CANCELED']) });

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { card: true, paymentMethod: true } });
  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const order = await prisma.order.update({ where: { id: params.id }, data: { status: parsed.data.status } });
  return NextResponse.json(order);
}
