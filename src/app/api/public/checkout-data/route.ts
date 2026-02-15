import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const setting = await prisma.adminSetting.findUnique({ where: { id: 1 } });
  const methods = await prisma.paymentMethod.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
  return NextResponse.json({ basePriceRub: setting?.basePriceRub || 1490, methods });
}
