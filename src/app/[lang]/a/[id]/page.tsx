import { prisma } from '@/lib/db';
import CardPreview from '@/components/CardPreview';

export default async function DigitalCard({ params }: { params: { id: string } }) {
  const card = await prisma.card.findUnique({ where: { id: params.id } });
  if (!card) return <main className="p-8">Card not found.</main>;
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <CardPreview model={card.model} color={card.color} name={card.fullName} title={card.title || ''} />
    </main>
  );
}
