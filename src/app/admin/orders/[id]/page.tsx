'use client';

import { useEffect, useState } from 'react';

const statuses = ['NEW', 'PAID', 'IN_PRODUCTION', 'SHIPPED', 'COMPLETED', 'CANCELED'];

export default function AdminOrderDetail({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>();
  const load = () => fetch(`/api/admin/orders/${params.id}`).then((r) => r.json()).then((r) => setOrder(r.order));

  useEffect(load, []);

  if (!order) return <div className="panel">Loading...</div>;

  return (
    <div className="panel space-y-3">
      <h1 className="text-2xl font-semibold">Order {order.id}</h1>
      <p>Status: {order.status}</p>
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            className="rounded bg-white/10 px-3 py-1"
            onClick={async () => {
              await fetch(`/api/admin/orders/${order.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: s }) });
              load();
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <p>Customer: {order.customerFullName} / {order.customerPhone}</p>
      <p>Address: {order.shippingCountry}, {order.shippingCity}, {order.shippingAddress1} {order.shippingAddress2 || ''}</p>
      <p>Payment: {order.paymentMethod.name}</p>
      <p>Total: RUB {order.totalAmountRub}</p>
      <p>Card: {order.card.model} / {order.card.color}</p>
    </div>
  );
}
