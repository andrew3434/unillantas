import Link from "next/link";
import { Disc3, ArrowRight } from "lucide-react";
import type { Producto } from "@/components/catalogo/types";

interface ProductoRelacionadosProps {
  relacionados: Producto[];
}

export function ProductoRelacionados({ relacionados }: ProductoRelacionadosProps) {
  if (relacionados.length === 0) return null;

  return (
    <section className="mt-16 sm:mt-24">
      <h2 className="font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
        <span>LLANTAS</span> <span className="text-brand-red">RELACIONADAS</span>
      </h2>
      <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-white">
        Otras opciones del mismo tipo de vehículo, seleccionadas por
        compatibilidad y uso.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {relacionados.map((producto) => (
          <Link
            key={producto.id}
            href={`/producto/${producto.id}`}
            className="group flex flex-col rounded-xl border border-surface-border bg-surface-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10"
          >
            <div className="relative flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-surface-elevated to-surface-card">
              <Disc3
                className="h-1/3 w-1/3 text-white"
                strokeWidth={1}
                style={{ opacity: 0.08 }}
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
              <div className="mt-3 flex items-center justify-between">
                <span className="font-mono text-sm text-white">
                  desde ${producto.precio.toFixed(0)}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-white transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
