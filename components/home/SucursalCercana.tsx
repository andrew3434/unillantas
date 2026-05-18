"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Clock,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import sucursalesData from "@/data/sucursales.json";
import { MotionInView } from "./MotionInView";
import type { MiniSucursalMarker } from "./MiniMapaHome";

interface Sucursal {
  id: string;
  nombre: string;
  departamento: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: {
    lunes_viernes: string;
    sabado: string;
    domingo: string;
  };
  lat: number;
  lng: number;
  servicios: string[];
  esPrincipal?: boolean;
  especialidad?: string;
}

const sucursales = sucursalesData as Sucursal[];
// Featured: tomamos la primera de Santa Ana como "ByPass" (la sucursal exacta
// ByPass no está en el JSON; usamos santa-ana-centro como proxy + foto real).
const featured =
  sucursales.find((s) => s.id === "santa-ana-centro") ??
  sucursales.find((s) => s.departamento === "Santa Ana") ??
  sucursales[0];
const featuredFoto = "/sucursal-bypass.jpg";

const markers: MiniSucursalMarker[] = sucursales.map((s) => ({
  id: s.id,
  nombre: s.nombre,
  lat: s.lat,
  lng: s.lng,
}));

const MiniMapaHome = dynamic(
  () => import("./MiniMapaHome").then((m) => m.MiniMapaHome),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl border border-surface-border bg-surface-card" />
    ),
  },
);

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${featured.lat},${featured.lng}`;
const mapsUrl = `/sucursales?focus=${featured.id}`;

export function SucursalCercana() {
  return (
    <section className="relative bg-surface-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <MotionInView className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            18 sucursales · 4 departamentos
          </span>
          <h2 className="mt-5 font-display italic leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl">
            <span>TU SUCURSAL</span>{" "}
            <span className="text-brand-red">MÁS CERCANA</span>
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-white sm:text-xl">
            18 sucursales en todo El Salvador, una siempre cerca tuyo.
          </p>
        </MotionInView>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <MotionInView className="lg:col-span-5">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface-card">
              <div className="relative h-64 overflow-hidden border-b border-brand-red/30">
                <Image
                  src={featuredFoto}
                  alt={`Sucursal ${featured.nombre}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent"
                />
                <span className="absolute right-3 top-3 rounded-full bg-brand-red px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white shadow-lg shadow-black/40">
                  Tu sucursal en Santa Ana
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-white">
                  Sucursal recomendada
                </span>
                <h3 className="mt-2 font-display italic text-3xl leading-tight tracking-tight text-white sm:text-4xl">
                  {featured.nombre.toUpperCase()}
                </h3>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-start gap-3 font-sans text-white">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span>{featured.direccion}</span>
                  </li>
                  <li className="flex items-start gap-3 font-mono text-white">
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span>{featured.telefono}</span>
                  </li>
                  <li className="flex items-start gap-3 font-mono text-xs text-white">
                    <Clock
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span>
                      L–V {featured.horario.lunes_viernes}
                      <br />
                      Sáb {featured.horario.sabado}
                    </span>
                  </li>
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Link
                    href={mapsUrl}
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-red px-5 py-3 font-display text-sm uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98]"
                  >
                    Ver en mapa
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-surface-border bg-surface-elevated px-5 py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:border-white/30 hover:bg-surface-card"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Cómo llegar
                  </a>
                </div>
              </div>
            </article>
          </MotionInView>

          <MotionInView delay={0.15} className="h-[400px] lg:col-span-7 lg:h-auto">
            <MiniMapaHome sucursales={markers} />
          </MotionInView>
        </div>

        <MotionInView delay={0.3} className="mt-12 flex justify-center">
          <Link
            href="/sucursales"
            className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 font-display text-lg uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/5 active:scale-[0.98]"
          >
            Ver todas las sucursales
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
