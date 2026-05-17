"use client";

import { useState } from "react";
import { Disc3 } from "lucide-react";

interface ProductoGaleriaProps {
  modelo: string;
}

const VARIANTS: Array<{
  gradient: string;
  iconScale: string;
  opacity: number;
  strokeWidth: number;
}> = [
  {
    gradient: "from-surface-elevated to-surface-card",
    iconScale: "h-1/2 w-1/2",
    opacity: 0.08,
    strokeWidth: 1,
  },
  {
    gradient: "from-surface-card to-surface-dark",
    iconScale: "h-2/5 w-2/5",
    opacity: 0.1,
    strokeWidth: 1.25,
  },
  {
    gradient: "from-surface-elevated via-surface-card to-surface-dark",
    iconScale: "h-1/2 w-1/2",
    opacity: 0.06,
    strokeWidth: 0.75,
  },
  {
    gradient: "from-surface-card to-surface-elevated",
    iconScale: "h-1/3 w-1/3",
    opacity: 0.12,
    strokeWidth: 1.5,
  },
];

export function ProductoGaleria({ modelo }: ProductoGaleriaProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = VARIANTS[activeIndex] ?? VARIANTS[0];

  return (
    <div className="space-y-3">
      <div
        className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br ${active.gradient}`}
      >
        <Disc3
          className={`${active.iconScale} text-white`}
          strokeWidth={active.strokeWidth}
          style={{ opacity: active.opacity }}
          aria-hidden
        />
        <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[0.65rem] uppercase tracking-widest text-white/50">
          {modelo} · vista {activeIndex + 1}/{VARIANTS.length}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {VARIANTS.map((variant, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
              aria-pressed={isActive}
              className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br ${
                variant.gradient
              } transition-all ${
                isActive
                  ? "border-transparent ring-2 ring-brand-red"
                  : "border-surface-border hover:border-white/30"
              }`}
            >
              <Disc3
                className={`${variant.iconScale} text-white`}
                strokeWidth={variant.strokeWidth}
                style={{ opacity: variant.opacity }}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
