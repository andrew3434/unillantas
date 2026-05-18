"use client";

import Image from "next/image";
import { HeroSearch } from "@/components/home/HeroSearch";

export function HeroHome() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-surface-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-hilux.avif"
          alt="Toyota Hilux en acción"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-dark/95 via-surface-dark/60 to-surface-dark/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-dark via-surface-dark/80 to-transparent" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 z-10 select-none text-[40rem] font-display italic leading-none text-white opacity-[0.04]"
        style={{ transform: "translateX(20%)" }}
      >
        U
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/3 overflow-hidden"
      >
        <div className="absolute -right-20 top-0 h-[200%] w-32 rotate-12 bg-brand-red opacity-30" />
        <div className="absolute -right-40 top-10 h-[200%] w-24 rotate-12 bg-brand-red opacity-20" />
        <div className="absolute -right-60 top-20 h-[200%] w-16 rotate-12 bg-brand-red opacity-15" />
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-16">
        <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Los #1 en llantas de El Salvador
        </span>

        <h1 className="mb-6 max-w-3xl font-display italic leading-[0.85] tracking-tight text-white">
          <span className="block text-[clamp(3rem,9vw,11rem)]">
            ENCONTRÁ TU
          </span>
          <span className="block text-[clamp(3rem,9vw,11rem)] text-brand-red">
            LLANTA
          </span>
        </h1>

        <p className="mb-12 max-w-xl text-balance font-sans text-lg leading-relaxed text-white sm:text-xl">
          Las mejores marcas. 18 sucursales en todo El Salvador.
          <br />
          Encontrá tu llanta perfecta en{" "}
          <span className="font-display italic text-brand-red">3 clicks</span>.
        </p>

        <div className="w-full max-w-2xl lg:max-w-md xl:max-w-lg 2xl:max-w-2xl">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
