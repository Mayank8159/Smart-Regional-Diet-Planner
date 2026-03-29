import { notFound } from "next/navigation";
import { DietDashboard } from "@/components/diet/DietDashboard";
import { HeroSlideshow } from "@/components/hero/HeroSlideshow";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({ params }: LocalizedPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden" lang={locale}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,196,48,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(75,111,68,0.18),transparent_36%),radial-gradient(circle_at_100%_85%,rgba(200,122,59,0.16),transparent_34%)]" />
      <HeroSlideshow locale={locale as Locale} />
      <DietDashboard locale={locale as Locale} />
    </main>
  );
}
