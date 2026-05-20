import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrlWithMessage } from "@/lib/constants";
import { MotionInView } from "./MotionInView";

const CTA_WHATSAPP = whatsappUrlWithMessage(
  "Hola, quisiera cotizar llantas para mi vehículo.",
);

export function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-surface-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-hilux.avif"
          alt=""
          fill
          quality={85}
          loading="lazy"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-red/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-surface-dark/70" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 32px, white 32px, white 33px)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center sm:py-24">
        <MotionInView>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Empezá hoy mismo
          </span>
        </MotionInView>

        <MotionInView delay={0.1}>
          <h2 className="mt-6 max-w-5xl font-display italic leading-[0.85] tracking-tight text-white">
            <span className="block text-[clamp(3rem,9vw,9rem)]">
              TU PRÓXIMO VIAJE
            </span>
            <span className="block text-[clamp(3rem,9vw,9rem)] text-brand-red">
              EMPIEZA AQUÍ
            </span>
          </h2>
        </MotionInView>

        <MotionInView delay={0.2}>
          <p className="mt-6 max-w-2xl text-balance font-sans text-lg leading-relaxed text-white sm:text-xl">
            Encontrá la llanta perfecta, reservá tu servicio o cotizá con un
            experto. Estamos a un click de distancia.
          </p>
        </MotionInView>

        <MotionInView delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/catalogo"
            className="group inline-flex animate-red-glow items-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-2xl shadow-brand-red/40 transition-all hover:bg-brand-red-dark active:scale-[0.98]"
          >
            Ver catálogo
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>

          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-lg shadow-black/30 transition-all hover:bg-whatsapp/90 active:scale-[0.98]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Cotizar por WhatsApp
          </a>
        </MotionInView>
      </div>
    </section>
  );
}
