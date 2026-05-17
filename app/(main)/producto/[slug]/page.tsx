import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";

import productosData from "@/data/productos.json";
import sucursalesData from "@/data/sucursales.json";
import type { Producto } from "@/components/catalogo/types";

import { ProductoGaleria } from "@/components/producto/ProductoGaleria";
import { ProductoInteractive } from "@/components/producto/ProductoInteractive";
import { ProductoSpecs } from "@/components/producto/ProductoSpecs";
import { ProductoStock } from "@/components/producto/ProductoStock";
import { ProductoRelacionados } from "@/components/producto/ProductoRelacionados";

const productos = productosData as unknown as Producto[];
const sucursales = sucursalesData as unknown as Array<{
  id: string;
  nombre: string;
  departamento: string;
  direccion: string;
  telefono: string;
}>;

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const producto = productos.find((p) => p.id === params.slug);
  if (!producto) {
    return { title: "Producto no encontrado" };
  }
  return {
    title: `${producto.marca} ${producto.modelo} — desde $${producto.precio} USD`,
    description: `${producto.descripcion} Disponible en ${producto.medidasDisponibles.length} medidas. Reservá en cualquiera de las 18 sucursales Unillantas.`,
  };
}

export default function ProductoPage({ params }: PageProps) {
  const producto = productos.find((p) => p.id === params.slug);
  if (!producto) {
    notFound();
  }

  const relacionados = productos
    .filter((p) => p.tipo === producto.tipo && p.id !== producto.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-white"
      >
        <Link href="/" className="hover:text-brand-red">
          Inicio
        </Link>
        <ChevronRight className="h-3 w-3 text-white" aria-hidden />
        <Link href="/catalogo" className="hover:text-brand-red">
          Catálogo
        </Link>
        <ChevronRight className="h-3 w-3 text-white" aria-hidden />
        <span className="text-brand-red">{producto.modelo}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        <ProductoGaleria modelo={producto.modelo} />

        <div className="mt-10 lg:mt-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            {producto.marca}
            {producto.destacada && (
              <span className="ml-1 rounded-sm bg-brand-red px-1.5 py-0.5 text-[0.55rem] tracking-widest text-white">
                Destacada
              </span>
            )}
          </span>

          <h1 className="mt-5 font-display text-6xl italic leading-[0.9] tracking-tight text-white sm:text-7xl">
            {producto.modelo.toUpperCase()}
          </h1>

          <div className="mt-4 font-mono text-sm uppercase tracking-widest text-white">
            {producto.tipo} <span className="text-brand-red">·</span>{" "}
            {producto.uso}
          </div>

          <div className="mt-6 flex items-baseline gap-2 font-mono text-2xl text-white">
            $
            <span className="font-display text-5xl text-brand-red">
              {producto.precio.toFixed(0)}
            </span>
            <span className="text-base">USD</span>
            <span className="ml-2 font-mono text-xs uppercase tracking-widest text-white">
              · precio por unidad
            </span>
          </div>

          <p className="mt-6 font-sans text-base leading-relaxed text-white">
            {producto.descripcion}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2">
              <div className="font-mono text-[0.55rem] uppercase tracking-widest text-white">
                Duración
              </div>
              <div className="mt-0.5 font-display text-lg leading-none tracking-tight text-white">
                {producto.specs.duracion}
              </div>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2">
              <div className="font-mono text-[0.55rem] uppercase tracking-widest text-white">
                Garantía
              </div>
              <div className="mt-0.5 font-display text-lg leading-none tracking-tight text-white">
                {producto.specs.garantia}
              </div>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2">
              <div className="font-mono text-[0.55rem] uppercase tracking-widest text-white">
                Velocidad
              </div>
              <div className="mt-0.5 font-display text-lg leading-none tracking-tight text-white">
                {producto.specs.indiceVelocidad}
              </div>
            </div>
            <div className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-2">
              <div className="font-mono text-[0.55rem] uppercase tracking-widest text-white">
                Carga
              </div>
              <div className="mt-0.5 font-display text-lg leading-none tracking-tight text-white">
                {producto.specs.indiceCarga}
              </div>
            </div>
          </div>

          <ProductoInteractive
            productoId={producto.id}
            marca={producto.marca}
            modelo={producto.modelo}
            medidasDisponibles={producto.medidasDisponibles}
            precio={producto.precio}
          />
        </div>
      </div>

      <ProductoSpecs specs={producto.specs} />

      <ProductoStock stock={producto.stock} sucursales={sucursales} />

      <ProductoRelacionados relacionados={relacionados} />
    </div>
  );
}
