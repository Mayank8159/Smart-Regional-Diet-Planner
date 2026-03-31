"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { INDIAN_STATES, stateFoodDatabase, type IndianStateName } from "@/lib/state-food-data";

type RegionNode = {
  id: string;
  state: IndianStateName;
  city: string;
  x: number;
  y: number;
  meal: string;
  calories: number;
  protein: number;
};

const stateNodeMeta: Record<IndianStateName, { x: number; y: number; city: string }> = {
  "Andhra Pradesh": { x: 58, y: 86, city: "Amaravati" },
  "Arunachal Pradesh": { x: 96, y: 32, city: "Itanagar" },
  Assam: { x: 88, y: 42, city: "Dispur" },
  Bihar: { x: 73, y: 54, city: "Patna" },
  Chhattisgarh: { x: 58, y: 70, city: "Raipur" },
  Goa: { x: 36, y: 84, city: "Panaji" },
  Gujarat: { x: 30, y: 66, city: "Gandhinagar" },
  Haryana: { x: 49, y: 40, city: "Chandigarh" },
  "Himachal Pradesh": { x: 52, y: 29, city: "Shimla" },
  Jharkhand: { x: 71, y: 63, city: "Ranchi" },
  Karnataka: { x: 47, y: 96, city: "Bengaluru" },
  Kerala: { x: 49, y: 118, city: "Thiruvananthapuram" },
  "Madhya Pradesh": { x: 52, y: 64, city: "Bhopal" },
  Maharashtra: { x: 44, y: 79, city: "Mumbai" },
  Manipur: { x: 98, y: 50, city: "Imphal" },
  Meghalaya: { x: 85, y: 47, city: "Shillong" },
  Mizoram: { x: 93, y: 58, city: "Aizawl" },
  Nagaland: { x: 96, y: 45, city: "Kohima" },
  Odisha: { x: 68, y: 74, city: "Bhubaneswar" },
  Punjab: { x: 44, y: 34, city: "Chandigarh" },
  Rajasthan: { x: 38, y: 50, city: "Jaipur" },
  Sikkim: { x: 82, y: 45, city: "Gangtok" },
  "Tamil Nadu": { x: 58, y: 118, city: "Chennai" },
  Telangana: { x: 58, y: 80, city: "Hyderabad" },
  Tripura: { x: 90, y: 54, city: "Agartala" },
  "Uttar Pradesh": { x: 61, y: 49, city: "Lucknow" },
  Uttarakhand: { x: 58, y: 38, city: "Dehradun" },
  "West Bengal": { x: 78, y: 61, city: "Kolkata" },
};

const regionNodes: RegionNode[] = INDIAN_STATES.map((state) => {
  const meal = [...stateFoodDatabase]
    .filter((item) => item.state === state)
    .sort((a, b) => b.macros.protein - a.macros.protein)[0];

  const nodeMeta = stateNodeMeta[state];

  return {
    id: state.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    state,
    city: nodeMeta.city,
    x: nodeMeta.x,
    y: nodeMeta.y,
    meal: meal?.foodName ?? `${state} Smart Meal`,
    calories: meal?.calories ?? 360,
    protein: meal?.macros.protein ?? 18,
  };
});

const copyByLocale: Record<Locale, { headline: string; subtitle: string }> = {
  en: {
    headline: "Eat Smarter, Right Where You Are.",
    subtitle: "AI-driven nutrition tailored to Indian palates and local availability.",
  },
  hi: {
    headline: "जहां आप हैं, वहीं समझदारी से खाइए।",
    subtitle: "भारतीय स्वाद और स्थानीय उपलब्धता के अनुसार AI-आधारित पोषण।",
  },
  bn: {
    headline: "আপনি যেখানে আছেন, সেখানেই স্মার্টভাবে খান।",
    subtitle: "ভারতীয় স্বাদ ও স্থানীয় প্রাপ্যতা অনুযায়ী AI-চালিত পুষ্টি।",
  },
};

type InteractiveMapAuraHeroProps = {
  locale: Locale;
};

export function InteractiveMapAuraHero({ locale }: InteractiveMapAuraHeroProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string>(regionNodes[0].id);
  const [pointer, setPointer] = useState({ x: 52, y: 40 });

  const copy = copyByLocale[locale];

  const activeNode = useMemo(
    () => regionNodes.find((node) => node.id === hoveredNodeId) ?? regionNodes[0],
    [hoveredNodeId],
  );

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="bento-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -left-20 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(74,185,171,0.32), transparent 65%)" }}
            animate={{ x: [0, 22, -8, 0], y: [0, -14, 10, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 top-0 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(84,95,190,0.3), transparent 64%)" }}
            animate={{ x: [0, -24, 10, 0], y: [0, 16, -8, 0] }}
            transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(233,162,66,0.28), transparent 66%)" }}
            animate={{ x: [0, 14, -16, 0], y: [0, -12, 8, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
              Interactive Map Aura
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-4xl">
              {copy.headline}
            </h1>
            <p className="max-w-xl text-sm text-[color:var(--text-secondary)] sm:text-base">{copy.subtitle}</p>

            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="bento-subcard mt-4 inline-block rounded-2xl p-4"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-[color:var(--text-secondary)]">Smart Meal • {activeNode.city}, {activeNode.state}</p>
              <p className="mt-1 text-base font-semibold text-[color:var(--text-primary)]">{activeNode.meal}</p>
              <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{activeNode.calories} kcal • {activeNode.protein}g protein</p>
            </motion.div>
          </div>

          <div
            className="bento-subcard relative min-h-[360px] rounded-3xl p-4"
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 100;
              const y = ((event.clientY - rect.top) / rect.height) * 100;
              setPointer({ x, y });
            }}
          >
            <svg viewBox="0 0 120 140" className="h-full w-full">
              <defs>
                <linearGradient id="indiaGlassGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(78,177,167,0.45)" />
                  <stop offset="55%" stopColor="rgba(92,102,194,0.32)" />
                  <stop offset="100%" stopColor="rgba(235,164,74,0.35)" />
                </linearGradient>
              </defs>

              <path
                d="M43 8 L55 11 L63 18 L67 27 L75 31 L80 39 L79 48 L85 56 L83 66 L77 74 L73 84 L67 94 L63 103 L58 114 L53 126 L46 124 L40 115 L34 106 L29 96 L25 86 L21 75 L20 64 L22 56 L19 47 L22 40 L29 33 L33 24 L39 15 Z"
                fill="url(#indiaGlassGradient)"
                stroke="rgba(255,255,255,0.62)"
                strokeWidth="1.1"
              />
              <path
                d="M79 40 L89 37 L98 41 L102 49 L98 57 L90 60 L84 56 L79 48 Z"
                fill="url(#indiaGlassGradient)"
                stroke="rgba(255,255,255,0.62)"
                strokeWidth="1.1"
              />
            </svg>

            {regionNodes.map((node, index) => (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onFocus={() => setHoveredNodeId(node.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                aria-label={`${node.state} smart meal`}
                title={`${node.state}: ${node.meal}`}
              >
                <motion.span
                  className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(89,175,166,0.24)]"
                  animate={{ scale: [0.6, 1.3, 0.6], opacity: [0.6, 0.15, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.1, delay: index * 0.08 }}
                />
                <span
                  className={`relative block h-2.5 w-2.5 rounded-full border border-white/70 ${
                    hoveredNodeId === node.id ? "bg-[color:var(--accent-gold)]" : "bg-[color:var(--accent)]"
                  }`}
                />
              </button>
            ))}

            <motion.div
              className="pointer-events-none absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${pointer.x}%`,
                top: `${pointer.y}%`,
                background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 68%)",
                filter: "blur(10px)",
              }}
              animate={{ opacity: [0.3, 0.62, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
