import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function SuccessPage({ searchParams, params }: { searchParams: { orderId?: string }; params: { lang: string } }) {
  const t = await getTranslations('success');
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-6 text-center">
      <div className="panel w-full">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 opacity-80">{t('desc')}</p>
        <p className="mt-6 text-xl">#{searchParams.orderId}</p>
        <Link href={`/${params.lang}/`} className="mt-6 inline-block rounded bg-white/10 px-4 py-2">Home</Link>
      </div>
    </main>
  );
}
