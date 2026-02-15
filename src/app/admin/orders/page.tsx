'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const statuses = ['ALL', 'NEW', 'PAID', 'IN_PRODUCTION', 'SHIPPED', 'COMPLETED', 'CANCELED'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [status, setStatus] = useState('ALL');
  const [q, setQ] = useState('');

  const load = () => {
    const query = new URLSearchParams();
    if (status !== 'ALL') query.set('status', status);
    if (q) query.set('q', q);
    fetch(`/api/admin/orders?${query.toString()}`).then((r) => r.json()).then((r) => setOrders(r.orders || []));
  };

  useEffect(load, [status]);

  return (
    <div className="panel">
      <div className="mb-4 flex gap-2">
        <input className="rounded bg-white/10 p-2" placeholder="search" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button className="rounded bg-white/10 px-3" onClick={load}>Search</button>
        <select className="rounded bg-white/10 p-2" value={status} onChange={(e)=>setStatus(e.target.value)}>{statuses.map((s)=><option key={s}>{s}</option>)}</select>
      </div>
      <div className="space-y-2">{orders.map((o)=><Link key={o.id} href={`/admin/orders/${o.id}`} className="block rounded border border-white/10 p-3">{o.id} - {o.customerFullName} - {o.status}</Link>)}</div>
    </div>
  );
}
