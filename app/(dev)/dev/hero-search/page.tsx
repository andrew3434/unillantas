"use client";

import { motion, type Variants } from "framer-motion";
import { HeroSearch } from "@/components/home/HeroSearch";

const containerV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const linesSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><line x1='0' y1='40' x2='40' y2='0' stroke='white' stroke-width='1'/></svg>",
);

export default function HeroSearchDevPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-surface-dark bg-[radial-gradient(circle_at_50%_30%,rgba(227,6,19,0.12),transparent_60%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${linesSvg}")`,
        }}
      />

      <motion.div
        variants={containerV}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-6 py-12"
      >
        <motion.div
          variants={itemV}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-white"
        >
          <span>18 sucursales</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand-red" />
          <span>Desde 1990</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-brand-red" />
          <span>+35 años de confianza</span>
        </motion.div>

        <motion.div
          variants={itemV}
          className="mb-10 flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-white/10"
        >
          <span className="font-mono text-xs text-white">
            [ HERO IMAGE — 2400×1200 — coming soon ]
          </span>
        </motion.div>

        <motion.div variants={itemV}>
          <HeroSearch />
        </motion.div>
      </motion.div>
    </main>
  );
}
