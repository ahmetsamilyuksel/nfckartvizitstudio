const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.adminSetting.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, currency: 'RUB', basePriceRub: 1490 }
  });

  const defaults = [
    { name: 'Оплата переводом', type: 'manual', active: true, instructions: 'Переведите сумму и отправьте чек менеджеру.', sortOrder: 1 },
    { name: 'Наличные', type: 'manual', active: true, instructions: 'Оплата наличными при получении.', sortOrder: 2 }
  ];

  for (const method of defaults) {
    const exists = await prisma.paymentMethod.findFirst({ where: { name: method.name } });
    if (!exists) await prisma.paymentMethod.create({ data: method });
  }
}

main().finally(async () => prisma.$disconnect());
