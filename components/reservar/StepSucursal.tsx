"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Phone } from "lucide-react";

import sucursalesData from "@/data/sucursales.json";
import productosData from "@/data/productos.json";
import { useReservaStore } from "@/lib/store/reservas";

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
};

type Producto = {
  id: string;
  stock?: Record<string, number>;
};

const sucursales = sucursalesData as Sucursal[];
const productos = productosData as unknown as Producto[];

const MapaReservar = dynamic(
  () =>
    import("@/components/reservar/MapaReservar").then((m) => m.MapaReservar),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-surface-card" />
    ),
  },
);

const DEPARTAMENTOS: Array<"Todas" | Sucursal["departamento"]> = [
  "Todas",
  "San Salvador",
  "La Libertad",
  "Santa Ana",
  "San Miguel",
];

function stockBadge(qty: number) {
  if (qty > 10) {
    return {
      label: `${qty} en stock`,
      className: "border border-whatsapp/40 bg-whatsapp/15 text-white",
    };
  }
  if (qty > 0) {
    return {
      label: `Quedan ${qty}`,
      className: "border border-yellow-500/50 bg-yellow-500/15 text-white",
    };
  }
  return {
    label: "Sin stock",
    className: "border border-surface-border bg-surface-elevated text-white",
  };
}

export function StepSucursal() {
  const servicioId = useReservaStore((s) => s.servicioId);
  const sucursalId = useReservaStore((s) => s.sucursalId);
  const setSucursal = useReservaStore((s) => s.setSucursal);
  const setPaso = useReservaStore((s) => s.setPaso);
  const productoId = useReservaStore((s) => s.productoId);

  const handleSelectSucursal = (id: string) => {
    setSucursal(id);
    setTimeout(() => setPaso(3), 250);
  };

  const [departamento, setDepartamento] =
    useState<(typeof DEPARTAMENTOS)[number]>("Todas");

  const producto = useMemo(
    () =>
      productoId ? productos.find((p) => p.id === productoId) ?? null : null,
    [productoId],
  );

  const filtradas = useMemo(() => {
    if (departamento === "Todas") return sucursales;
    return sucursales.filter((s) => s.departamento === departamento);
  }, [departamento]);

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

  const sucursalSeleccionada = sucursalId
    ? sucursales.find((s) => s.id === sucursalId) ?? null
    : null;

  const serviceWarning =
    sucursalSeleccionada && servicioId
      ? !sucursalSeleccionada.servicios.includes(servicioId)
      : false;

  return (
    <section aria-labelledby="paso-sucursal-titulo">
      <h2
        id="paso-sucursal-titulo"
        className="mb-2 font-display text-3xl italic leading-none tracking-tight text-white sm:text-4xl"
      >
        <span>ELEGÍ TU</span> <span className="text-brand-red">SUCURSAL</span>
      </h2>
      <p className="mb-6 font-sans text-sm text-white sm:text-base">
        Mirá el mapa o filtrá por departamento. Tocá la sucursal que te quede
        más cerca.
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
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

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="order-1 h-64 lg:order-2 lg:sticky lg:top-20 lg:col-span-7 lg:h-[560px]">
          <MapaReservar
            sucursales={markers}
            selectedId={sucursalId}
            onSelect={handleSelectSucursal}
          />
        </div>

        <div className="order-2 lg:order-1 lg:col-span-5">
          <ul className="flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
            {filtradas.map((sucursal) => {
              const isSelected = sucursal.id === sucursalId;
              const stockQty =
                producto && producto.stock
                  ? producto.stock[sucursal.id] ?? 0
                  : null;
              const showStock = servicioId === "llantas" && stockQty !== null;
              const badge = showStock ? stockBadge(stockQty as number) : null;

              return (
                <li key={sucursal.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectSucursal(sucursal.id)}
                    aria-pressed={isSelected}
                    className={[
                      "block w-full rounded-xl border p-4 text-left transition-all duration-200",
                      isSelected
                        ? "border-brand-red bg-brand-red text-white shadow-xl shadow-brand-red/30"
                        : "border-surface-border bg-surface-card hover:-translate-y-1 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10",
                    ].join(" ")}
                  >
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        {sucursal.especialidad ? (
                          <div
                            className={`mb-1 font-mono text-[10px] uppercase tracking-widest ${
                              isSelected ? "text-white" : "text-brand-red"
                            }`}
                          >
                            {sucursal.especialidad}
                          </div>
                        ) : null}
                        <div className="font-display text-xl italic leading-tight tracking-tight text-white">
                          {sucursal.nombre}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span
                          className={[
                            "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white",
                            isSelected
                              ? "border border-white/40 bg-white/10"
                              : "border border-surface-border bg-surface-elevated",
                          ].join(" ")}
                        >
                          {sucursal.departamento}
                        </span>
                        {showStock && badge ? (
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                              isSelected
                                ? "border border-white/40 bg-white/10 text-white"
                                : badge.className
                            }`}
                          >
                            {badge.label}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="mb-2 font-sans text-sm leading-snug text-white">
                      {sucursal.direccion}
                    </p>

                    <div className="flex items-center gap-2 font-mono text-xs text-white">
                      <Phone
                        className="h-3.5 w-3.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {sucursal.telefono}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {serviceWarning ? (
        <div className="mt-4 rounded-xl border border-brand-red/40 bg-brand-red/10 p-3 font-mono text-xs uppercase tracking-wider text-brand-red">
          Este servicio no está disponible en esta sucursal — confirmamos
          disponibilidad por WhatsApp.
        </div>
      ) : null}
    </section>
  );
}
