"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, ArrowRight } from "lucide-react";
import productosData from "@/data/productos.json";
import { FilterSidebar } from "./FilterSidebar";
import { ProductCard } from "./ProductCard";
import {
  MARCAS,
  PRECIO_DEFAULT,
  matchCategoria,
  type CategoriaTipo,
  type FilterState,
  type Producto,
} from "./types";

const PRODUCTOS = productosData as unknown as Producto[];
const MARCAS_SET = new Set<string>(MARCAS);

function emptyFilters(): FilterState {
  return {
    marcas: new Set<string>(),
    tipos: new Set<CategoriaTipo>(),
    ancho: "",
    perfil: "",
    aro: "",
    precioMin: "",
    precioMax: "",
  };
}

function initialFromParams(params: URLSearchParams): FilterState {
  const f = emptyFilters();
  const ancho = params.get("ancho");
  const perfil = params.get("perfil");
  const aro = params.get("aro");
  const marca = params.get("marca");
  if (ancho && /^\d+$/.test(ancho)) f.ancho = ancho;
  if (perfil && /^\d+$/.test(perfil)) f.perfil = perfil;
  if (aro && /^\d+$/.test(aro)) f.aro = aro;
  if (marca && MARCAS_SET.has(marca)) f.marcas.add(marca);
  return f;
}

export function CatalogoClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => emptyFilters());
  const [mobileOpen, setMobileOpen] = useState(false);

  // Pre-fill from URL on mount (and when params change).
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setFilters(initialFromParams(params));
  }, [searchParams]);

  const toggleMarca = useCallback((marca: string) => {
    setFilters((prev) => {
      const next = new Set(prev.marcas);
      if (next.has(marca)) next.delete(marca);
      else next.add(marca);
      return { ...prev, marcas: next };
    });
  }, []);

  const toggleTipo = useCallback((tipo: CategoriaTipo) => {
    setFilters((prev) => {
      const next = new Set(prev.tipos);
      if (next.has(tipo)) next.delete(tipo);
      else next.add(tipo);
      return { ...prev, tipos: next };
    });
  }, []);

  const changeMedida = useCallback(
    (key: "ancho" | "perfil" | "aro", value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const changePrecio = useCallback(
    (key: "precioMin" | "precioMax", value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const clear = useCallback(() => {
    setFilters(emptyFilters());
  }, []);

  const activeCount = useMemo(() => {
    let n = 0;
    n += filters.marcas.size;
    n += filters.tipos.size;
    if (filters.ancho && filters.perfil && filters.aro) n += 1;
    if (filters.precioMin !== "") n += 1;
    if (filters.precioMax !== "") n += 1;
    return n;
  }, [filters]);

  const filtered = useMemo(() => {
    const medidaQuery =
      filters.ancho && filters.perfil && filters.aro
        ? `${filters.ancho}/${filters.perfil}R${filters.aro}`
        : null;

    const minPrice =
      filters.precioMin === ""
        ? PRECIO_DEFAULT.min
        : Number.parseInt(filters.precioMin, 10);
    const maxPrice =
      filters.precioMax === ""
        ? Number.POSITIVE_INFINITY
        : Number.parseInt(filters.precioMax, 10);

    return PRODUCTOS.filter((p) => {
      if (filters.marcas.size > 0 && !filters.marcas.has(p.marca)) return false;
      if (filters.tipos.size > 0) {
        const tiposArr = Array.from(filters.tipos);
        const anyMatch = tiposArr.some((t) => matchCategoria(p.tipo, t));
        if (!anyMatch) return false;
      }
      if (medidaQuery && !p.medidasDisponibles.includes(medidaQuery)) return false;
      if (Number.isFinite(minPrice) && p.precio < minPrice) return false;
      if (Number.isFinite(maxPrice) && p.precio > maxPrice) return false;
      return true;
    });
  }, [filters]);

  const total = filtered.length;
  const countLabel =
    total === 1 ? "1 LLANTA DISPONIBLE" : `${total} LLANTAS DISPONIBLES`;

  const sidebar = (
    <FilterSidebar
      filters={filters}
      onToggleMarca={toggleMarca}
      onToggleTipo={toggleTipo}
      onChangeMedida={changeMedida}
      onChangePrecio={changePrecio}
      onClear={clear}
      activeCount={activeCount}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <header className="flex flex-col items-start gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          {countLabel}
        </span>
        <h1 className="font-display text-5xl leading-none tracking-tight text-white sm:text-7xl">
          <span>NUESTRO</span> <span className="text-brand-red">CATÁLOGO</span>
        </h1>
        <p className="max-w-2xl font-sans text-base text-white">
          Filtrá por marca, tipo de vehículo, medida o presupuesto. Llantas
          oficiales con garantía e instalación en cualquiera de nuestras 18
          sucursales.
        </p>
      </header>

      {/* Mobile filter toggle */}
      <div className="mt-8 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="catalogo-filtros-mobile"
          className="inline-flex w-full items-center justify-between gap-3 rounded-full border border-surface-border bg-surface-card px-5 py-3 font-display text-base uppercase tracking-wider text-white transition-colors hover:border-white/30"
        >
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
        {mobileOpen && (
          <div id="catalogo-filtros-mobile" className="mt-4">
            {sidebar}
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="hidden lg:block">{sidebar}</div>

        <div>
          {total === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-surface-border bg-surface-card px-6 py-16 text-center">
              <p className="font-display text-2xl uppercase tracking-tight text-white">
                No encontramos llantas con esos filtros
              </p>
              <p className="max-w-md font-sans text-sm text-white">
                Probá relajar la búsqueda o limpiar todos los filtros para ver
                el catálogo completo.
              </p>
              <button
                type="button"
                onClick={clear}
                className="group inline-flex animate-red-glow items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 font-display text-base uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98]"
              >
                Limpiar filtros
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
