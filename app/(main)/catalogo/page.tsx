import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoClient } from "@/components/catalogo/CatalogoClient";

export const metadata: Metadata = {
  title: "Catálogo de llantas",
  description:
    "Explorá nuestro catálogo de llantas Michelin, Falken, Dunlop, Sumitomo, Yokohama y BFGoodrich. Filtrá por marca, tipo, medida y precio.",
};

function CatalogoFallback() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <div className="flex flex-col items-start gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Cargando catálogo
        </span>
        <h1 className="font-display text-5xl leading-none tracking-tight text-white sm:text-7xl">
          <span>NUESTRO</span> <span className="text-brand-red">CATÁLOGO</span>
        </h1>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<CatalogoFallback />}>
      <CatalogoClient />
    </Suspense>
  );
}
