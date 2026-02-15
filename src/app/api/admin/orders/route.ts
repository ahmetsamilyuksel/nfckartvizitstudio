import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const q = searchParams.get('q');
  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(q
        ? {
            OR: [
              { id: { contains: q } },
              { customerFullName: { contains: q } },
              { customerPhone: { contains: q } }
            ]
          }
        : {})
    },
    include: { paymentMethod: true, card: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json({ orders });
}
