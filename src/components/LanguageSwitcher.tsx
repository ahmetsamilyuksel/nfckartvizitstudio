'use client';

import { usePathname, useRouter } from 'next/navigation';

const langs = ['ru', 'tr', 'en'];

export function LanguageSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {langs.map((lang) => (
        <button
          key={lang}
          onClick={() => {
            const parts = pathname.split('/');
            parts[1] = lang;
            router.push(parts.join('/') || `/${lang}`);
          }}
          className={`rounded px-2 py-1 text-xs ${current === lang ? 'bg-white text-slate-900' : 'bg-white/10'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
