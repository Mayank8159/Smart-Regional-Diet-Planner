import type { Locale } from "@/lib/i18n";

const intlLocaleMap: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
};

export function toIntlLocale(locale: Locale): string {
  return intlLocaleMap[locale];
}

export function formatNumber(locale: Locale, value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(toIntlLocale(locale), options).format(value);
}

export function formatGrams(locale: Locale, value: number): string {
  return formatNumber(locale, value, { maximumFractionDigits: 1 });
}

export function formatCalories(locale: Locale, value: number): string {
  return formatNumber(locale, value, { maximumFractionDigits: 0 });
}

export function formatDate(locale: Locale, value: Date): string {
  return new Intl.DateTimeFormat(toIntlLocale(locale), { dateStyle: "medium" }).format(value);
}
