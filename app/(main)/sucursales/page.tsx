"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Phone, Search, X } from "lucide-react";

import sucursalesDataRaw from "@/data/sucursales.json";
import { SucursalPlaceholder } from "@/components/sucursales/SucursalPlaceholder";

type Sucursal = {
  id: string;
  nombre: string;
  departamento: "San Salvador" | "La Libertad" | "Santa Ana" | "San Miguel";
  direccion: string;
  telefono: string;
  email: string;
  horario: { lunes_viernes: string; sabado: string; domingo: string };
  lat: number;
  lng: number;
  servicios: string[];
  esPrincipal?: boolean;
  especialidad?: string;
  foto?: string;
};

const sucursalesData = sucursalesDataRaw as Sucursal[];

const MapaSucursales = dynamic(
  () =>
    import("@/components/sucursales/MapaSucursales").then((m) => m.MapaSucursales),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-surface-card" />
    ),
  },
);

const DEPARTAMENTOS: Array<"Todos" | Sucursal["departamento"]> = [
  "Todos",
  "San Salvador",
  "La Libertad",
  "Santa Ana",
  "San Miguel",
];

export default function SucursalesPage() {
  const [query, setQuery] = useState("");
  const [departamento, setDepartamento] =
    useState<(typeof DEPARTAMENTOS)[number]>("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sucursalesData.filter((sucursal) => {
      const matchDepartamento =
        departamento === "Todos" || sucursal.departamento === departamento;
      if (!matchDepartamento) return false;
      if (!q) return true;
      return (
        sucursal.nombre.toLowerCase().includes(q) ||
        sucursal.direccion.toLowerCase().includes(q)
      );
    });
  }, [query, departamento]);

  const markers = useMemo(
    () =>
      filtradas.map((s) => ({
        id: s.id,
        nombre: s.nombre,
        direccion: s.direccion,
        lat: s.lat,
        lng: s.lng,
      })),
    [filtradas],
  );

  const handleVerEnMapa = (id: string) => {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      const mapEl = document.getElementById("mapa-sucursales");
      mapEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const limpiarFiltros = () => {
    setQuery("");
    setDepartamento("Todos");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          18 sucursales en El Salvador
        </span>

        <h1 className="mt-5 font-display text-5xl leading-none tracking-tight text-white sm:text-7xl">
          <span>NUESTRAS</span> <span className="text-brand-red">SUCURSALES</span>
        </h1>

        <p className="mt-4 max-w-2xl font-sans text-base text-white sm:text-lg">
          Encontrá la sucursal más cercana — siempre cerca tuyo.
        </p>
      </header>

      {/* Filtros */}
      <section className="mb-8 space-y-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-red"
            strokeWidth={2}
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscá por nombre o dirección…"
            aria-label="Buscar sucursal por nombre o dirección"
            className="h-12 w-full rounded-xl border border-surface-border bg-surface-card pl-11 pr-4 font-sans text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-red"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {DEPARTAMENTOS.map((dep) => {
            const isActive = dep === departamento;
            return (
              <button
                key={dep}
                type="button"
                onClick={() => setDepartamento(dep)}
                className={[
                  "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                  isActive
                    ? "border-brand-red bg-brand-red text-white shadow-lg shadow-brand-red/30"
                    : "border-surface-border bg-surface-card text-white hover:-translate-y-0.5 hover:border-white/30",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {dep}
              </button>
            );
          })}
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-white">
          <span className="text-brand-red">{filtradas.length}</span>{" "}
          {filtradas.length === 1 ? "sucursal" : "sucursales"} encontradas
        </div>
      </section>

      {/* Layout split */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Mapa (mobile arriba, desktop derecha) */}
        <div
          id="mapa-sucursales"
          className="order-1 h-64 lg:order-2 lg:sticky lg:top-20 lg:col-span-7 lg:h-[600px]"
        >
          <MapaSucursales
            sucursales={markers}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/* Lista */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          {filtradas.length === 0 ? (
            <div className="rounded-2xl border border-surface-border bg-surface-card p-8 text-center">
              <div className="mb-3 font-display text-3xl tracking-tight text-white">
                SIN <span className="text-brand-red">RESULTADOS</span>
              </div>
              <p className="mb-5 font-sans text-sm text-white">
                No encontramos sucursales con esos filtros.
              </p>
              <button
                type="button"
                onClick={limpiarFiltros}
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2 font-mono text-xs uppercase tracking-wider text-white shadow-lg shadow-brand-red/30 transition-all hover:bg-brand-red-dark"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Limpiar filtros
              </button>
            </div>
          ) : (
            <ul className="flex max-h-[600px] flex-col gap-3 overflow-y-auto pr-1">
              {filtradas.map((sucursal) => {
                const isSelected = sucursal.id === selectedId;
                return (
                  <li key={sucursal.id}>
                    <article
                      className={[
                        "overflow-hidden rounded-xl border transition-all duration-200",
                        isSelected
                          ? "border-brand-red bg-brand-red/10"
                          : "border-surface-border bg-surface-card hover:-translate-y-0.5 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10",
                      ].join(" ")}
                    >
                      <div className="relative">
                        {sucursal.foto ? (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={sucursal.foto}
                              alt={`Sucursal ${sucursal.nombre}`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <SucursalPlaceholder
                            nombre={sucursal.nombre}
                            departamento={sucursal.departamento}
                          />
                        )}

                        {(sucursal.esPrincipal || sucursal.especialidad) && (
                          <div className="absolute left-3 top-3 flex flex-col gap-1">
                            {sucursal.esPrincipal ? (
                              <span className="rounded-full bg-brand-red px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-lg shadow-black/40">
                                Principal
                              </span>
                            ) : null}
                            {sucursal.especialidad ? (
                              <span className="rounded-full bg-surface-dark/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-brand-red backdrop-blur-sm">
                                {sucursal.especialidad}
                              </span>
                            ) : null}
                          </div>
                        )}

                        <span className="absolute right-3 top-3 rounded-full bg-surface-dark/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
                          {sucursal.departamento}
                        </span>
                      </div>

                      <div className="p-4">
                        <h2 className="font-display text-xl leading-tight tracking-tight text-white">
                          {sucursal.nombre}
                        </h2>

                        <p className="mt-2 font-sans text-sm leading-snug text-white">
                          {sucursal.direccion}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-white">
                          <a
                            href={`tel:+503${sucursal.telefono.replace(/\D/g, "")}`}
                            className="inline-flex items-center gap-1.5 hover:text-brand-red"
                          >
                            <Phone
                              className="h-3.5 w-3.5 text-brand-red"
                              strokeWidth={2}
                              aria-hidden
                            />
                            {sucursal.telefono}
                          </a>
                          <span>L-V {sucursal.horario.lunes_viernes}</span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleVerEnMapa(sucursal.id)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white shadow-lg shadow-brand-red/30 transition-all hover:bg-brand-red-dark"
                          >
                            <MapPin className="h-3.5 w-3.5" aria-hidden />
                            Ver en mapa
                          </button>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${sucursal.lat},${sucursal.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-card px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white transition-all hover:border-white/30 hover:bg-surface-elevated"
                          >
                            Cómo llegar
                          </a>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
