import { ArrowRight } from "lucide-react";

const colorTokens = [
  { name: "surface.dark", hex: "#0A0A0A", className: "bg-surface-dark" },
  { name: "surface.card", hex: "#1A1A1A", className: "bg-surface-card" },
  { name: "surface.elevated", hex: "#242424", className: "bg-surface-elevated" },
  { name: "brand.red", hex: "#E30613", className: "bg-brand-red" },
  { name: "whatsapp", hex: "#25D366", className: "bg-whatsapp" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-brand-red">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
        Pantalla de validación · Sprint 0
      </div>

      <h1 className="font-display text-7xl leading-[0.9] tracking-display text-white sm:text-8xl md:text-[10rem]">
        TOKENS DE
        <br />
        <span className="text-brand-red">MARCA</span>
      </h1>

      <p className="mt-8 max-w-2xl text-balance font-sans text-lg leading-relaxed text-white/70 sm:text-xl">
        Validación rápida de la base visual: dark mode profundo, rojo de marca
        y la jerarquía tipográfica entre <strong className="text-white">Bebas Neue</strong> para titulares,{" "}
        <strong className="text-white">Inter</strong> para texto y{" "}
        <strong className="text-white">JetBrains Mono</strong> para specs técnicas de llantas.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-card px-3 py-1.5 font-mono text-sm font-medium text-white">
          <span className="text-white/40">Medida:</span>
          <span className="tracking-wider">215/55R17</span>
        </span>

        <button
          type="button"
          className="group inline-flex items-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98]"
        >
          Buscar mis llantas
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl tracking-display text-white/60">
          PALETA
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="overflow-hidden rounded-lg border border-surface-border bg-surface-card"
            >
              <div className={`h-24 ${token.className}`} />
              <div className="p-4">
                <div className="font-mono text-xs text-white/50">{token.name}</div>
                <div className="font-mono text-sm font-medium text-white">{token.hex}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 rounded-2xl border border-surface-border bg-surface-card p-8 lg:grid-cols-3">
        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">
            Display · Bebas Neue
          </div>
          <div className="font-display text-5xl tracking-display text-white">
            MICHELIN
          </div>
        </div>
        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">
            Body · Inter
          </div>
          <div className="font-sans text-base leading-relaxed text-white/80">
            Llantas premium con tecnología EverGrip para frenado en mojado y
            durabilidad extendida.
          </div>
        </div>
        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">
            Mono · JetBrains
          </div>
          <div className="font-mono text-base text-white/80">
            265/70R17 · 112T
          </div>
        </div>
      </section>
    </div>
  );
}
