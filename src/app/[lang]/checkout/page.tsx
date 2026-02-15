'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CardPreview from '@/components/CardPreview';
import { useTranslations } from 'next-intl';

type Method = { id: number; name: string; instructions: string; type: string };

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const params = useParams<{ lang: string }>();
  const router = useRouter();
  const [draft, setDraft] = useState<any>();
  const [methods, setMethods] = useState<Method[]>([]);
  const [basePrice, setBasePrice] = useState(1490);
  const [paymentMethodId, setPaymentMethodId] = useState<number>();
  const [form, setForm] = useState({ fullName: '', phone: '', country: 'Russia', city: '', address1: '', address2: '', postalCode: '' });

  useEffect(() => {
    const d = localStorage.getItem('draftCard');
    if (d) setDraft(JSON.parse(d));
    fetch('/api/public/checkout-data').then((r) => r.json()).then((r) => {
      setMethods(r.methods);
      setBasePrice(r.basePriceRub);
      setPaymentMethodId(r.methods[0]?.id);
    });
  }, []);

  const submit = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draft, form, paymentMethodId })
    });
    const data = await res.json();
    if (res.ok) router.push(`/${params.lang}/order/success?orderId=${data.orderId}`);
    else alert(data.error || 'error');
  };

  if (!draft) return <main className="p-8">Draft not found.</main>;

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">{t('title')}</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="panel space-y-3">
          <h2>{t('customer')}</h2>
          <input className="w-full rounded bg-white/10 p-2" placeholder="Ad Soyad" onChange={(e)=>setForm({...form,fullName:e.target.value})} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Telefon" onChange={(e)=>setForm({...form,phone:e.target.value})} />
          <h3>{t('address')}</h3>
          <input className="w-full rounded bg-white/10 p-2" placeholder="Country" value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="City" onChange={(e)=>setForm({...form,city:e.target.value})} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Address line 1" onChange={(e)=>setForm({...form,address1:e.target.value})} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Address line 2" onChange={(e)=>setForm({...form,address2:e.target.value})} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Postal code" onChange={(e)=>setForm({...form,postalCode:e.target.value})} />
          <div className="space-y-2 pt-2">{methods.map((m)=><label key={m.id} className="block rounded border border-white/20 p-2"><input type="radio" name="pm" checked={paymentMethodId===m.id} onChange={()=>setPaymentMethodId(m.id)} /> {m.name}<div className="text-xs opacity-70">{m.instructions}</div></label>)}</div>
          <button onClick={submit} className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900">{t('complete')}</button>
        </div>
        <div className="panel space-y-4">
          <CardPreview model={draft.model} color={draft.color} name={draft.fullName} title={draft.title} />
          <div className="text-lg">RUB {basePrice}</div>
        </div>
      </div>
    </main>
  );
}
