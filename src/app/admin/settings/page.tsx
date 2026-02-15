'use client';

import { useEffect, useState } from 'react';

export default function AdminSettings() {
  const [basePriceRub, setBasePriceRub] = useState(1490);
  const [methods, setMethods] = useState<any[]>([]);

  const load = () => fetch('/api/admin/settings').then((r)=>r.json()).then((r)=>{setBasePriceRub(r.setting?.basePriceRub || 1490); setMethods(r.methods || []);});
  useEffect(load, []);

  const savePrice = async () => {
    await fetch('/api/admin/settings', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ basePriceRub: Number(basePriceRub) }) });
    load();
  };

  const saveMethod = async (method: any) => {
    await fetch('/api/admin/payment-methods', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(method) });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="panel space-y-3">
        <h2 className="text-xl">Base price (RUB)</h2>
        <input className="rounded bg-white/10 p-2" type="number" value={basePriceRub} onChange={(e)=>setBasePriceRub(Number(e.target.value))} />
        <button className="rounded bg-cyan-400 px-3 py-2 text-slate-900" onClick={savePrice}>Save</button>
      </div>
      <div className="panel space-y-3">
        <h2 className="text-xl">Payment methods</h2>
        {methods.map((m, i) => (
          <div key={m.id} className="rounded border border-white/10 p-3">
            <input className="mr-2 rounded bg-white/10 p-1" value={m.name} onChange={(e)=>setMethods(methods.map((x,idx)=>idx===i?{...x,name:e.target.value}:x))} />
            <label className="ml-3 text-sm"><input type="checkbox" checked={m.active} onChange={(e)=>setMethods(methods.map((x,idx)=>idx===i?{...x,active:e.target.checked}:x))} /> active</label>
            <button className="ml-3 rounded bg-white/10 px-2" onClick={()=>saveMethod(m)}>Update</button>
          </div>
        ))}
        <button className="rounded bg-white/10 px-3 py-2" onClick={()=>saveMethod({ name: 'Новый метод', type: 'manual', active: true, instructions: '', sortOrder: methods.length + 1 })}>Add</button>
      </div>
    </div>
  );
}
