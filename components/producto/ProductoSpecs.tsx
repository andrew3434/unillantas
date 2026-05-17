import { Gauge, Shield, Zap, Weight } from "lucide-react";

interface ProductoSpecsProps {
  specs: {
    duracion: string;
    garantia: string;
    indiceVelocidad: string;
    indiceCarga: string;
  };
}

const ITEMS: Array<{
  key: keyof ProductoSpecsProps["specs"];
  label: string;
  Icon: typeof Gauge;
}> = [
  { key: "duracion", label: "Duración", Icon: Gauge },
  { key: "garantia", label: "Garantía", Icon: Shield },
  { key: "indiceVelocidad", label: "Índice velocidad", Icon: Zap },
  { key: "indiceCarga", label: "Índice carga", Icon: Weight },
];

export function ProductoSpecs({ specs }: ProductoSpecsProps) {
  return (
    <section className="mt-16 sm:mt-24">
      <h2 className="font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
        <span>ESPECIFICACIONES</span> <span className="text-brand-red">TÉCNICAS</span>
      </h2>
      <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-white">
        Datos verificados por el fabricante y validados por nuestros técnicos en
        cada una de las 18 sucursales.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {ITEMS.map(({ key, label, Icon }) => (
          <div
            key={key}
            className="group rounded-xl border border-surface-border bg-surface-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-white/30"
          >
            <Icon
              className="h-8 w-8 text-brand-red"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="mt-5 font-mono text-[0.65rem] uppercase tracking-widest text-white">
              {label}
            </div>
            <div className="mt-1 font-display text-3xl leading-none tracking-tight text-white">
              {specs[key]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
