import {
  Award,
  BadgeCheck,
  MapPin,
  Shield,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import { MotionInView } from "./MotionInView";

type LucideIcon = ComponentType<LucideProps>;

interface ProofPoint {
  Icon: LucideIcon;
  stat: string;
  titulo: string;
  detalle: string;
}

const proofPoints: ProofPoint[] = [
  {
    Icon: Award,
    stat: "35",
    titulo: "AÑOS DE EXPERIENCIA",
    detalle: "Desde 1990 cuidando los vehículos de El Salvador.",
  },
  {
    Icon: MapPin,
    stat: "18",
    titulo: "SUCURSALES",
    detalle: "En San Salvador, La Libertad, Santa Ana y San Miguel.",
  },
  {
    Icon: BadgeCheck,
    stat: "6",
    titulo: "MARCAS OFICIALES",
    detalle: "Michelin, Dunlop, Falken, Yokohama, Sumitomo y BFGoodrich.",
  },
  {
    Icon: Shield,
    stat: "100%",
    titulo: "GARANTÍA UNILLANTAS",
    detalle: "Respaldo total. Si algo falla, lo resolvemos.",
  },
];

export function PorQueUnillantas() {
  return (
    <section className="relative bg-surface-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <MotionInView className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            La diferencia Unillantas
          </span>
          <h2 className="mt-5 font-display italic leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl">
            <span>POR QUÉ</span>{" "}
            <span className="text-brand-red">UNILLANTAS</span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {proofPoints.map(({ Icon, stat, titulo, detalle }, idx) => (
            <MotionInView
              key={titulo}
              as="article"
              delay={idx * 0.08}
              className="group flex flex-col items-start rounded-2xl border border-surface-border bg-surface-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/60 hover:shadow-lg hover:shadow-brand-red/10 sm:p-8"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-red/40 bg-brand-red/10 transition-colors group-hover:bg-brand-red/20">
                <Icon
                  className="h-8 w-8 text-brand-red"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
              <div className="mt-6 font-display italic text-6xl leading-none tracking-tight text-white sm:text-7xl">
                {stat}
              </div>
              <h3 className="mt-2 font-display text-base uppercase tracking-widest text-white">
                {titulo}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white">
                {detalle}
              </p>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
