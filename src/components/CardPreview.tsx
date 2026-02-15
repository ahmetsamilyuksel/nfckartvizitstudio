'use client';

const modelClasses: Record<string, string> = {
  minimal: 'rounded-xl',
  wave: 'rounded-[2rem] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_45%)]',
  premium: 'rounded-xl border border-white/30'
};

const colorClasses: Record<string, string> = {
  turquoise: 'from-cyan-400 to-teal-700',
  navy: 'from-blue-500 to-slate-800',
  graphite: 'from-slate-500 to-slate-900'
};

export default function CardPreview({ model, color, name, title }: { model: string; color: string; name: string; title: string }) {
  return (
    <div className={`relative h-48 w-full max-w-md overflow-hidden bg-gradient-to-br p-6 text-white ${modelClasses[model]} ${colorClasses[color]}`}>
      <div className="text-xl font-semibold">{name || 'Ad Soyad'}</div>
      <div className="mt-1 text-sm opacity-90">{title || 'Pozisyon'}</div>
      <div className="mt-10 text-xs opacity-70">nfc-kartvizit.studio</div>
    </div>
  );
}
