"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { copyByLocale, type Locale } from "@/lib/i18n";

type HeroSlide = {
  id: string;
  image: string;
};

const slides: HeroSlide[] = [
  {
    id: "dashboard",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "analytics",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "regional",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "planning",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=2000&q=80",
  },
];

const SLIDE_INTERVAL_MS = 4200;

type HeroSlideshowProps = {
  locale: Locale;
};

export function HeroSlideshow({ locale }: HeroSlideshowProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const copy = copyByLocale[locale];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlideIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = useMemo(() => slides[activeSlideIndex], [activeSlideIndex]);
  const activeSlideText = copy.hero.slides[activeSlideIndex] ?? copy.hero.slides[0];

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] shadow-[0_20px_70px_rgba(30,46,40,0.24)] backdrop-blur-xl sm:min-h-[430px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlideText.title}
            initial={{ opacity: 0.18, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.16, scale: 1.02 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,20,18,0.62)_18%,rgba(12,20,18,0.28)_52%,rgba(12,20,18,0.08)_100%)]" />

        <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-9">
          <motion.p
            key={`${activeSlide.id}-kicker`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-2 inline-flex w-fit rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/90"
          >
            {copy.hero.kicker}
          </motion.p>
          <motion.h2
            key={`${activeSlide.id}-title`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-4xl"
          >
            {activeSlideText.title}
          </motion.h2>
          <motion.p
            key={`${activeSlide.id}-subtitle`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base"
          >
            {activeSlideText.subtitle}
          </motion.p>

          <div className="mt-5 flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`${copy.hero.goToSlideLabel} ${index + 1}`}
                onClick={() => setActiveSlideIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeSlideIndex ? "w-8 bg-white" : "w-2.5 bg-white/45 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
