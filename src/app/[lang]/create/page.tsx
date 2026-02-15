'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CardPreview from '@/components/CardPreview';

const models = ['minimal', 'wave', 'premium'];
const colors = ['turquoise', 'navy', 'graphite'];

export default function CreatePage() {
  const t = useTranslations('create');
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const [model, setModel] = useState('minimal');
  const [color, setColor] = useState('turquoise');
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState('');

  const steps = useMemo(() => [t('design'), t('info'), t('preview'), t('payment')], [t]);

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ratio = Math.min(1, 600 / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let quality = 0.9;
        let data = canvas.toDataURL('image/jpeg', quality);
        while (data.length > 300_000 && quality > 0.4) {
          quality -= 0.1;
          data = canvas.toDataURL('image/jpeg', quality);
        }
        setPhotoDataUrl(data);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">{t('title')}</h1>
      <div className="mt-4 flex gap-2 text-xs">{steps.map((s, i) => <div key={s} className="rounded-full bg-white/10 px-3 py-1">{i + 1}. {s}</div>)}</div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="panel space-y-5">
          <div>
            <p className="mb-2 text-sm">Model</p>
            <div className="flex gap-2">{models.map((m)=><button key={m} onClick={()=>setModel(m)} className={`rounded border px-3 py-2 ${model===m?'border-cyan-300':'border-white/20'}`}>{m}</button>)}</div>
          </div>
          <div>
            <p className="mb-2 text-sm">Color</p>
            <div className="flex gap-2">{colors.map((c)=><button key={c} onClick={()=>setColor(c)} className={`rounded border px-3 py-2 ${color===c?'border-cyan-300':'border-white/20'}`}>{c}</button>)}</div>
          </div>
          <input className="w-full rounded bg-white/10 p-2" placeholder="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <input className="w-full rounded bg-white/10 p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e)=>onFile(e.target.files?.[0])} />
          <button
            onClick={() => {
              localStorage.setItem('draftCard', JSON.stringify({ model, color, fullName, title, company, phone, email, photoDataUrl }));
              router.push(`/${params.lang}/checkout`);
            }}
            className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900"
          >
            {t('toCheckout')}
          </button>
        </div>
        <div className="panel flex items-center justify-center">
          <CardPreview model={model} color={color} name={fullName} title={title} />
        </div>
      </div>
    </main>
  );
}
