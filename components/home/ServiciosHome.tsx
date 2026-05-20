import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Cog,
  Crosshair,
  Disc3,
  Droplet,
  MoveVertical,
  Snowflake,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import serviciosData from "@/data/servicios.json";
import { MotionInView } from "./MotionInView";

type LucideIcon = ComponentType<LucideProps>;

const iconMap: Record<string, LucideIcon> = {
  CircleDot,
  Crosshair,
  Droplet,
  Snowflake,
  Cog,
  Disc3,
  MoveVertical,
};

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  precioDesde: number;
  icon: string;
  destacado: boolean;
}

const servicios = serviciosData as Servicio[];
const FEATURED_ID = "llantas";

const featured = servicios.find((s) => s.id === FEATURED_ID) ?? servicios[0];
const others = servicios.filter((s) => s.id !== featured.id);

export function ServiciosHome() {
  return (
    <section className="relative bg-surface-card py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <MotionInView className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Valor agregado
          </span>
          <h2 className="mt-5 font-display italic leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl">
            <span>NUESTROS</span>{" "}
            <span className="text-brand-red">SERVICIOS</span>
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-white sm:text-xl">
            Más que llantas. Cuidamos tu auto completo.
          </p>
        </MotionInView>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <MotionInView
            as="article"
            className="group col-span-2 row-span-2 flex flex-col justify-between overflow-hidden rounded-2xl bg-brand-red p-8 text-white shadow-xl shadow-brand-red/30 transition-all duration-300 hover:bg-brand-red-dark sm:p-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-white backdrop-blur-sm">
                Servicio estrella
              </span>
              {(() => {
                const Icon = iconMap[featured.icon] ?? CircleDot;
                return (
                  <Icon
                    className="mt-8 h-20 w-20 text-white"
                    strokeWidth={1.25}
                    aria-hidden
                  />
                );
              })()}
              <h3 className="mt-6 font-display italic text-4xl leading-none tracking-tight sm:text-5xl">
                {featured.nombre.toUpperCase()}
              </h3>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed">
                {featured.descripcion}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-6">
              <span className="font-mono text-sm uppercase tracking-widest">
                {featured.duracion}
              </span>
              <Link
                href={`/reservar?servicio=${featured.id}`}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-base uppercase tracking-wider text-brand-red transition-all hover:bg-white/90"
              >
                Reservar
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </MotionInView>

          {others.map((servicio, idx) => {
            const Icon = iconMap[servicio.icon] ?? CircleDot;
            return (
              <MotionInView
                key={servicio.id}
                as="article"
                delay={0.1 + idx * 0.05}
                className="group flex flex-col rounded-2xl border border-surface-border bg-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/60 hover:shadow-lg hover:shadow-brand-red/10"
              >
                <Icon
                  className="h-10 w-10 text-brand-red transition-transform group-hover:scale-110"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-4 font-display italic text-2xl leading-tight tracking-tight text-white">
                  {servicio.nombre.toUpperCase()}
                </h3>
                <p className="mt-2 line-clamp-3 font-sans text-sm leading-snug text-white">
                  {servicio.descripcion}
                </p>
                <span className="mt-auto pt-4 font-mono text-xs uppercase tracking-widest text-white">
                  {servicio.duracion}
                </span>
              </MotionInView>
            );
          })}
        </div>

        <MotionInView delay={0.3} className="mt-12 flex justify-center">
          <Link
            href="/reservar"
            className="group inline-flex animate-red-glow items-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98]"
          >
            Reservar un servicio
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
