"use client";

import { useState } from "react";
import type { TabMode } from "@/types/hero-search";
import { TabPorMedida } from "@/components/home/HeroSearch/TabPorMedida";
import { TabPorVehiculo } from "@/components/home/HeroSearch/TabPorVehiculo";
import { TabAyudameElegir } from "@/components/home/HeroSearch/TabAyudameElegir";

const tabs: { id: TabMode; label: string }[] = [
  { id: "medida", label: "Por medida" },
  { id: "vehiculo", label: "Por vehículo" },
  { id: "wizard", label: "Ayudame a elegir" },
];

export function HeroSearch() {
  const [activeTab, setActiveTab] = useState<TabMode>("medida");

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-surface-card p-6 shadow-2xl shadow-black/40 sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
        Encontrá tu llanta ideal
      </span>

      <div
        role="tablist"
        aria-label="Modo de búsqueda"
        className="mb-6 mt-6 flex flex-wrap gap-2"
      >
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(t.id)}
              className={
                active
                  ? "rounded-full bg-brand-red px-5 py-2 font-display text-base leading-none tracking-display text-white shadow-md shadow-brand-red/20 transition-all"
                  : "rounded-full border border-surface-border bg-transparent px-5 py-2 font-display text-base leading-none tracking-display text-white transition-all hover:border-white/30 hover:text-white"
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === "medida" && <TabPorMedida />}
        {activeTab === "vehiculo" && <TabPorVehiculo />}
        {activeTab === "wizard" && <TabAyudameElegir />}
      </div>

      <p className="mt-6 border-t border-surface-border pt-6 font-mono text-xs text-white">
        🔍 ¿No sabés tu medida? Está en el costado de tu llanta actual.
      </p>
    </div>
  );
}
