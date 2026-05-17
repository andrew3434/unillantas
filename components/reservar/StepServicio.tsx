"use client";

import { useEffect } from "react";
import {
  CircleDot,
  Cog,
  Crosshair,
  Disc3,
  Droplet,
  MoveVertical,
  Snowflake,
  type LucideIcon,
} from "lucide-react";

import serviciosData from "@/data/servicios.json";
import productosData from "@/data/productos.json";
import { useReservaStore } from "@/lib/store/reservas";

type Servicio = {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  precioDesde: number;
  icon: string;
  destacado: boolean;
};

type Producto = {
  id: string;
  marca: string;
  modelo: string;
};

const servicios = serviciosData as Servicio[];
const productos = productosData as Producto[];

const iconMap: Record<string, LucideIcon> = {
  CircleDot,
  Crosshair,
  Droplet,
  Snowflake,
  Cog,
  Disc3,
  MoveVertical,
};

export function StepServicio() {
  const servicioId = useReservaStore((s) => s.servicioId);
  const setServicio = useReservaStore((s) => s.setServicio);
  const setPaso = useReservaStore((s) => s.setPaso);
  const productoId = useReservaStore((s) => s.productoId);

  const producto = productoId
    ? productos.find((p) => p.id === productoId) ?? null
    : null;

  useEffect(() => {
    if (producto && !servicioId) {
      setServicio("llantas");
    }
  }, [producto, servicioId, setServicio]);

  const handleSelect = (id: string) => {
    setServicio(id);
    window.setTimeout(() => {
      setPaso(2);
    }, 250);
  };

  return (
    <section aria-labelledby="paso-servicio-titulo">
      <h2
        id="paso-servicio-titulo"
        className="mb-2 font-display text-3xl italic leading-none tracking-tight text-white sm:text-4xl"
      >
        <span>ELEGÍ TU</span> <span className="text-brand-red">SERVICIO</span>
      </h2>
      <p className="mb-6 font-sans text-sm text-white sm:text-base">
        Tocá el servicio que necesitás. Cada uno tiene su tiempo estimado y se
        confirma con tu sucursal.
      </p>

      {producto ? (
        <div className="mb-6 rounded-xl border border-brand-red/40 bg-brand-red/10 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-red">
            Reserva para tu llanta
          </div>
          <div className="mt-1 font-display text-2xl italic tracking-tight text-white">
            {producto.marca}{" "}
            <span className="text-brand-red">{producto.modelo}</span>
          </div>
          <p className="mt-1 font-sans text-sm text-white">
            Pre-seleccionamos <strong>Venta y Montaje de Llantas</strong> —
            podés cambiarlo si querés otro servicio.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {servicios.map((servicio) => {
          const Icon = iconMap[servicio.icon] ?? CircleDot;
          const isSelected = servicio.id === servicioId;

          if (isSelected) {
            return (
              <button
                key={servicio.id}
                type="button"
                onClick={() => handleSelect(servicio.id)}
                aria-pressed
                className="group relative overflow-hidden rounded-xl border border-brand-red bg-brand-red p-6 text-left text-white shadow-xl shadow-brand-red/30 transition-all after:absolute after:bottom-3 after:left-1/2 after:h-0.5 after:w-12 after:-translate-x-1/2 after:rounded-full after:bg-white after:content-['']"
              >
                <Icon
                  className="mb-4 h-12 w-12 text-white"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="font-display text-2xl italic leading-tight tracking-tight text-white">
                  {servicio.nombre}
                </div>
                <p className="mt-2 font-sans text-sm leading-snug text-white">
                  {servicio.descripcion}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
                  {servicio.duracion}
                </div>
              </button>
            );
          }

          return (
            <button
              key={servicio.id}
              type="button"
              onClick={() => handleSelect(servicio.id)}
              className="group rounded-xl border border-surface-border bg-surface-card p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10"
            >
              <Icon
                className="mb-4 h-12 w-12 text-brand-red"
                strokeWidth={1.5}
                aria-hidden
              />
              <div className="font-display text-2xl italic leading-tight tracking-tight text-white">
                {servicio.nombre}
              </div>
              <p className="mt-2 font-sans text-sm leading-snug text-white">
                {servicio.descripcion}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-elevated px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
                {servicio.duracion}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
