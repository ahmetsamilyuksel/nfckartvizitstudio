import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function Landing({ params }: { params: { lang: string } }) {
  const t = await getTranslations('landing');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8">
      <section className="mx-auto mt-20 max-w-5xl text-center">
        <h1 className="text-5xl font-bold">{t('title')}</h1>
        <p className="mt-4 text-slate-300">{t('subtitle')}</p>
        <Link href={`/${params.lang}/create`} className="mt-8 inline-block rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950">
          {t('cta')}
        </Link>
      </section>
    </main>
  );
}
