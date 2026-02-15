'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (!res.ok) return setError('Invalid credentials');
    router.push('/admin');
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="panel w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <input className="w-full rounded bg-white/10 p-2" placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full rounded bg-white/10 p-2" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button className="w-full rounded bg-cyan-400 px-4 py-2 font-semibold text-slate-900">Login</button>
      </form>
    </main>
  );
}
