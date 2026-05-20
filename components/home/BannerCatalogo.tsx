import Link from "next/link";
import { ArrowRight, Check, Disc3 } from "lucide-react";
import { MotionInView } from "./MotionInView";

const beneficios = [
  "6 marcas oficiales: Michelin, Falken, Dunlop, Yokohama, Sumitomo, BFGoodrich",
  "Filtros por medida, marca y precio",
  "Stock en tiempo real por sucursal",
];

const preview = [
  { marca: "Falken", modelo: "Azenis FK510", precio: 175 },
  { marca: "Michelin", modelo: "LTX Force", precio: 215 },
  { marca: "BFGoodrich", modelo: "All-Terrain KO2", precio: 235 },
];

export function BannerCatalogo() {
  return (
    <section className="relative overflow-hidden bg-brand-red">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 32px, white 32px, white 33px)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <MotionInView>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Catálogo completo
          </span>

          <h2 className="mt-5 font-display italic leading-[0.9] tracking-tight text-white">
            <span className="block text-5xl sm:text-6xl">EXPLORÁ EL</span>
            <span className="mt-2 inline-block bg-surface-dark px-4 py-1 text-6xl text-white sm:text-7xl">
              CATÁLOGO
            </span>
          </h2>

          <ul className="mt-8 space-y-3">
            {beneficios.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 font-sans text-base text-white sm:text-lg"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                  <Check
                    className="h-3.5 w-3.5 text-brand-red"
                    strokeWidth={3}
                    aria-hidden
                  />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/catalogo"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-lg uppercase tracking-wider text-brand-red shadow-2xl shadow-black/20 transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            Ver catálogo
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </MotionInView>

        <MotionInView delay={0.15} className="relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                Top vendidas
              </span>
              <Disc3 className="h-6 w-6 text-white" aria-hidden />
            </div>

            <ul className="mt-6 space-y-4">
              {preview.map((p) => (
                <li
                  key={`${p.marca}-${p.modelo}`}
                  className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white"
                  >
                    <Disc3
                      className="h-5 w-5 text-brand-red"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                      {p.marca}
                    </span>
                    <span className="font-display text-lg leading-tight tracking-tight text-white">
                      {p.modelo.toUpperCase()}
                    </span>
                  </div>
                  <span className="rounded-full bg-surface-dark px-3 py-1 font-mono text-xs text-white">
                    ${p.precio}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/20 pt-4 text-center font-mono text-xs uppercase tracking-widest text-white">
              + 18 llantas más en stock
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
