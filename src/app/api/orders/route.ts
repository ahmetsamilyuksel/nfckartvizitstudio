import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { completeMockPayment } from '@/lib/payment/adapter';
import { makePublicId } from '@/lib/utils';

const schema = z.object({
  draft: z.object({
    fullName: z.string().min(1),
    company: z.string().optional(),
    title: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    model: z.enum(['minimal', 'wave', 'premium']),
    color: z.enum(['turquoise', 'navy', 'graphite']),
    photoDataUrl: z.string().optional()
  }),
  form: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(5),
    country: z.string().min(2),
    city: z.string().min(1),
    address1: z.string().min(3),
    address2: z.string().optional(),
    postalCode: z.string().optional()
  }),
  paymentMethodId: z.number().int()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { draft, form, paymentMethodId } = parsed.data;
  const setting = await prisma.adminSetting.findUnique({ where: { id: 1 } });
  const cardId = makePublicId('card');
  const orderId = makePublicId('ord');

  await prisma.card.create({ data: { id: cardId, ...draft } });

  await prisma.order.create({
    data: {
      id: orderId,
      totalAmountRub: setting?.basePriceRub || 1490,
      paymentMethodId,
      customerFullName: form.fullName,
      customerPhone: form.phone,
      shippingCountry: form.country,
      shippingCity: form.city,
      shippingAddress1: form.address1,
      shippingAddress2: form.address2,
      shippingPostalCode: form.postalCode,
      cardId,
      status: 'NEW'
    }
  });

  await completeMockPayment(orderId);

  return NextResponse.json({ orderId, cardId });
}
