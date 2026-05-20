import { Quote, Star } from "lucide-react";
import { MotionInView } from "./MotionInView";

interface Testimonio {
  nombre: string;
  ciudad: string;
  texto: string;
}

const testimonios: Testimonio[] = [
  {
    nombre: "Roberto M.",
    ciudad: "San Salvador",
    texto:
      "Llevé mi pickup el sábado y en 40 minutos estaba lista. Excelente servicio y los precios mejores que la competencia.",
  },
  {
    nombre: "Carolina P.",
    ciudad: "Santa Tecla",
    texto:
      "Reservé mi cita por internet y no esperé nada cuando llegué. Las Michelin que me recomendaron andan perfectas.",
  },
  {
    nombre: "Daniel A.",
    ciudad: "Santa Ana",
    texto:
      "Llevo 10 años llevando mis vehículos a Unillantas. Confiables, profesionales y siempre con buenas promociones.",
  },
];

function iniciales(nombre: string): string {
  const parts = nombre.replace(".", "").split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function Testimonios() {
  return (
    <section className="relative bg-surface-card py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <MotionInView className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Voces reales
          </span>
          <h2 className="mt-5 font-display italic leading-[0.95] tracking-tight text-white text-5xl sm:text-7xl">
            <span>QUÉ DICEN</span>{" "}
            <span className="text-brand-red">NUESTROS CLIENTES</span>
          </h2>
        </MotionInView>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonios.map((t, idx) => (
            <MotionInView
              key={t.nombre}
              as="article"
              delay={idx * 0.1}
              className="relative flex flex-col rounded-2xl border border-surface-border bg-surface-card p-8 transition-all duration-200 hover:-translate-y-1 hover:border-brand-red/60 hover:shadow-lg hover:shadow-brand-red/10"
            >
              <Quote
                className="absolute right-6 top-6 h-8 w-8 text-brand-red"
                strokeWidth={1.5}
                aria-hidden
                style={{ transform: "scaleX(-1)" }}
              />

              <div
                className="flex items-center gap-1 text-brand-red"
                aria-label="5 estrellas"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    aria-hidden
                  />
                ))}
              </div>

              <p className="mt-5 flex-1 font-sans italic text-lg leading-relaxed text-white">
                &ldquo;{t.texto}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-4 border-t border-surface-border pt-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red font-display text-lg leading-none tracking-tight text-white">
                  {iniciales(t.nombre)}
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-lg leading-tight tracking-tight text-white">
                    {t.nombre.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-white">
                    {t.ciudad}
                  </span>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
