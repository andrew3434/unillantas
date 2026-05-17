import Link from "next/link";
import { Disc3, ArrowRight } from "lucide-react";
import type { Producto } from "./types";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  const medidasCount = producto.medidasDisponibles.length;
  const medidasLabel = medidasCount === 1 ? "1 medida" : `${medidasCount} medidas`;

  return (
    <article className="group relative flex flex-col rounded-xl border border-surface-border bg-surface-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10">
      {producto.destacada && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-brand-red px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white">
          Destacada
        </span>
      )}

      <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-surface-elevated to-surface-card">
        <Disc3
          className="h-1/3 w-1/3 text-white"
          strokeWidth={1}
          style={{ opacity: 0.06 }}
          aria-hidden
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white">
          {producto.marca}
        </span>
        <h3 className="mt-1 font-display text-xl uppercase tracking-tight text-white">
          {producto.modelo}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-sm text-white">
            desde ${producto.precio.toFixed(0)}
          </span>
          <span className="inline-flex items-center rounded-md border border-surface-border bg-surface-elevated px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-white">
            {medidasLabel}
          </span>
        </div>

        <Link
          href={`/producto/${producto.id}`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface-elevated px-4 py-2 font-display text-sm uppercase tracking-wider text-white transition-all hover:border-white/30 hover:bg-surface-card group-hover:border-brand-red/40"
        >
          Ver detalles
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
