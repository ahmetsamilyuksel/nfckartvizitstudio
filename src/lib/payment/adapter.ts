import { prisma } from '@/lib/db';

export async function listActivePaymentMethods() {
  return prisma.paymentMethod.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } });
}

export async function completeMockPayment(orderId: string) {
  return prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } });
}
