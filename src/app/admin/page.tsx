import { prisma } from '@/lib/db';

export default async function AdminDashboard() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [daily, weekly, recent] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: dayAgo } } }),
    prisma.order.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 8 })
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="panel">Daily orders: {daily}</div>
        <div className="panel">Weekly orders: {weekly}</div>
      </div>
      <div className="panel">
        <h2 className="mb-3 text-xl">Recent orders</h2>
        <ul className="space-y-2">{recent.map((o) => <li key={o.id}>{o.id} - {o.customerFullName} - {o.status}</li>)}</ul>
      </div>
    </div>
  );
}
