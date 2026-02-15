export const locales = ['ru', 'tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = (process.env.DEFAULT_LOCALE as Locale) || 'ru';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
