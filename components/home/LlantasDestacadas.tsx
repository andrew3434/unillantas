import Link from "next/link";
import { ArrowRight } from "lucide-react";
import productosData from "@/data/productos.json";
import { ProductCard } from "@/components/catalogo/ProductCard";
import type { Producto } from "@/components/catalogo/types";
import { MotionInView } from "./MotionInView";

const productos = productosData as unknown as Producto[];
const destacadas = productos.filter((p) => p.destacada).slice(0, 4);

export function LlantasDestacadas() {
  return (
    <section className="relative bg-surface-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <MotionInView className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Productos destacados
          </span>
          <h2 className="mt-5 font-display italic leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl">
            <span>LAS MEJORES</span>{" "}
            <span className="text-brand-red">LLANTAS</span>
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-white sm:text-xl">
            Selección curada por nuestros expertos. Marcas oficiales, precios
            de distribuidor, garantía Unillantas.
          </p>
        </MotionInView>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destacadas.map((producto, idx) => (
            <MotionInView key={producto.id} delay={idx * 0.08}>
              <ProductCard producto={producto} />
            </MotionInView>
          ))}
        </div>

        <MotionInView delay={0.3} className="mt-12 flex justify-center">
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 font-display text-lg uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/5 active:scale-[0.98]"
          >
            Ver todo el catálogo
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </MotionInView>
      </div>
    </section>
  );
}
