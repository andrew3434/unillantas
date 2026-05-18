"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrlWithMessage } from "@/lib/constants";

interface ProductoInteractiveProps {
  productoId: string;
  marca: string;
  modelo: string;
  medidasDisponibles: string[];
  precio: number;
}

export function ProductoInteractive({
  productoId,
  marca,
  modelo,
  medidasDisponibles,
  precio,
}: ProductoInteractiveProps) {
  const [medidaSeleccionada, setMedidaSeleccionada] = useState<string>(
    medidasDisponibles[0] ?? ""
  );

  const reservarHref = useMemo(() => {
    const params = new URLSearchParams({ producto: productoId });
    if (medidaSeleccionada) params.set("medida", medidaSeleccionada);
    return `/reservar?${params.toString()}`;
  }, [productoId, medidaSeleccionada]);

  const whatsappHref = useMemo(() => {
    const texto = `Hola, quiero cotizar ${marca} ${modelo}${
      medidaSeleccionada ? ` en medida ${medidaSeleccionada}` : ""
    } (USD $${precio}).`;
    return whatsappUrlWithMessage(texto);
  }, [marca, modelo, medidaSeleccionada, precio]);

  const enabled = medidaSeleccionada.length > 0;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-white">
            Medida
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-white">
            {medidasDisponibles.length} disponibles
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {medidasDisponibles.map((medida) => {
            const selected = medida === medidaSeleccionada;
            return (
              <button
                key={medida}
                type="button"
                onClick={() => setMedidaSeleccionada(medida)}
                className={`rounded-md border px-3 py-2 font-mono text-sm tracking-wider transition-colors ${
                  selected
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-surface-border bg-surface-elevated text-white hover:border-white/30"
                }`}
                aria-pressed={selected}
              >
                {medida}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={reservarHref}
          className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98] ${
            enabled ? "animate-red-glow" : ""
          }`}
        >
          Reservar en sucursal
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp bg-whatsapp/15 px-6 py-3 font-display text-base uppercase tracking-wider text-whatsapp transition-all hover:bg-whatsapp/25"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
