import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { isLocale } from '@/lib/i18n';

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {
  if (!isLocale(params.lang)) return null;
  unstable_setRequestLocale(params.lang);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={params.lang}>
      {children}
    </NextIntlClientProvider>
  );
}
