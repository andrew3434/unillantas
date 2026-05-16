"use client";

import { useState, useEffect, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  CarFront,
  Truck,
  CarTaxiFront,
  DollarSign,
  Shield,
  Zap,
  Volume2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  type LucideProps,
} from "lucide-react";
import type {
  WizardRespuestas,
  TipoVehiculo,
  EstiloManejo,
  Prioridad,
} from "@/types/hero-search";

type Paso = 1 | 2 | 3 | "analizando" | "resultados";
type LucideIcon = ComponentType<LucideProps>;

const tipoOpciones: { id: TipoVehiculo; label: string; Icon: LucideIcon }[] = [
  { id: "sedan", label: "Sedán", Icon: Car },
  { id: "suv", label: "SUV", Icon: CarFront },
  { id: "pickup", label: "Pickup", Icon: Truck },
  { id: "hatchback", label: "Hatchback", Icon: CarTaxiFront },
];

const estiloOpciones: { id: EstiloManejo; label: string }[] = [
  { id: "ciudad", label: "Solo ciudad" },
  { id: "mixto", label: "Mixto" },
  { id: "carretera", label: "Mucha carretera" },
  { id: "offroad", label: "Off-road ocasional" },
];

const prioridadOpciones: { id: Prioridad; label: string; Icon: LucideIcon }[] = [
  { id: "precio", label: "Precio justo", Icon: DollarSign },
  { id: "duracion", label: "Durabilidad", Icon: Shield },
  { id: "agarre", label: "Agarre y seguridad", Icon: Zap },
  { id: "comodidad", label: "Comodidad y silencio", Icon: Volume2 },
];

const recomendaciones = [
  {
    marca: "Michelin",
    modelo: "LTX Force",
    medida: "265/65R17",
    precio: 215,
    match: 94,
  },
  {
    marca: "Falken",
    modelo: "Wildpeak A/T3W",
    medida: "265/70R17",
    precio: 195,
    match: 89,
  },
  {
    marca: "BFGoodrich",
    modelo: "All-Terrain T/A KO2",
    medida: "265/70R17",
    precio: 235,
    match: 82,
  },
];

const motionProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.25 },
};

const cardBase =
  "relative rounded-xl border p-6 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/40 sm:p-8";
const cardIdle =
  "border-surface-border bg-surface-elevated text-white hover:-translate-y-1 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10";
const cardSelected =
  "border-brand-red bg-brand-red/10 text-white after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-12 after:-translate-x-1/2 after:rounded-full after:bg-brand-red after:content-['']";

export function TabAyudameElegir() {
  const [paso, setPaso] = useState<Paso>(1);
  const [respuestas, setRespuestas] = useState<WizardRespuestas>({
    tipoVehiculo: null,
    estiloManejo: null,
    prioridad: null,
  });

  useEffect(() => {
    if (paso !== "analizando") return;
    const t = setTimeout(() => setPaso("resultados"), 1500);
    return () => clearTimeout(t);
  }, [paso]);

  const advance = (next: Paso) => {
    setTimeout(() => setPaso(next), 200);
  };

  const handleTipo = (id: TipoVehiculo) => {
    setRespuestas((r) => ({ ...r, tipoVehiculo: id }));
    advance(2);
  };
  const handleEstilo = (id: EstiloManejo) => {
    setRespuestas((r) => ({ ...r, estiloManejo: id }));
    advance(3);
  };
  const handlePrioridad = (id: Prioridad) => {
    setRespuestas((r) => ({ ...r, prioridad: id }));
    advance("analizando");
  };

  const reset = () => {
    setRespuestas({
      tipoVehiculo: null,
      estiloManejo: null,
      prioridad: null,
    });
    setPaso(1);
  };

  const numericPaso = paso === 1 || paso === 2 || paso === 3 ? paso : null;
  const progress = numericPaso !== null ? (numericPaso / 3) * 100 : 0;

  return (
    <div>
      {numericPaso !== null && (
        <div className="mb-6">
          <div className="mb-2 font-mono text-xs uppercase tracking-widest text-white/40">
            Paso {numericPaso} de 3
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-elevated">
            <div
              className="h-full bg-brand-red transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {paso === 1 && (
          <motion.div key="paso-1" {...motionProps}>
            <h3 className="mb-5 font-display text-2xl tracking-display text-white">
              ¿Qué tipo de vehículo manejás?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {tipoOpciones.map((o) => {
                const selected = respuestas.tipoVehiculo === o.id;
                const isSuv = o.id === "suv";
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleTipo(o.id)}
                    className={`${cardBase} flex flex-col items-center gap-3 ${
                      selected ? cardSelected : cardIdle
                    }`}
                  >
                    {isSuv && (
                      <span className="absolute right-2 top-2 rounded-full border border-brand-red/40 bg-brand-red/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-red">
                        Más común
                      </span>
                    )}
                    <o.Icon
                      strokeWidth={1.5}
                      className={`h-12 w-12 ${
                        selected ? "text-brand-red" : "text-white/70"
                      }`}
                      aria-hidden
                    />
                    <span className="font-display text-base tracking-display text-white">
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {paso === 2 && (
          <motion.div key="paso-2" {...motionProps}>
            <h3 className="mb-5 font-display text-2xl tracking-display text-white">
              ¿Cómo es tu manejo diario?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {estiloOpciones.map((o) => {
                const selected = respuestas.estiloManejo === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleEstilo(o.id)}
                    className={`${cardBase} ${
                      selected ? cardSelected : cardIdle
                    }`}
                  >
                    <span className="font-display text-base tracking-display text-white">
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {paso === 3 && (
          <motion.div key="paso-3" {...motionProps}>
            <h3 className="mb-5 font-display text-2xl tracking-display text-white">
              ¿Qué te importa más?
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {prioridadOpciones.map((o) => {
                const selected = respuestas.prioridad === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handlePrioridad(o.id)}
                    className={`${cardBase} flex flex-col items-center gap-3 ${
                      selected ? cardSelected : cardIdle
                    }`}
                  >
                    <o.Icon
                      strokeWidth={1.5}
                      className={`h-12 w-12 ${
                        selected ? "text-brand-red" : "text-white/70"
                      }`}
                      aria-hidden
                    />
                    <span className="font-display text-base tracking-display text-white">
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {paso === "analizando" && (
          <motion.div
            key="analizando"
            {...motionProps}
            className="flex flex-col items-center py-12 text-center"
          >
            <Sparkles
              className="h-12 w-12 animate-spin text-brand-red"
              style={{ animationDuration: "2s" }}
              aria-hidden
            />
            <h3 className="mt-6 font-display text-2xl tracking-display text-white">
              Analizando tus preferencias
            </h3>
            <div className="mt-3 flex items-center gap-1.5" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-brand-red"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {paso === "resultados" && (
          <motion.div key="resultados" {...motionProps}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              3 llantas recomendadas
            </span>

            <div className="mt-5 flex flex-col gap-3">
              {recomendaciones.map((r) => (
                <div
                  key={`${r.marca}-${r.modelo}`}
                  className="flex items-center gap-4 rounded-xl border border-surface-border bg-surface-elevated p-4"
                >
                  <div
                    className="h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br from-surface-card to-surface-dark"
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[0.65rem] uppercase tracking-widest text-white/50">
                      {r.marca}
                    </div>
                    <div className="font-display text-2xl leading-tight tracking-display text-white">
                      {r.modelo}
                    </div>
                    <div className="mt-0.5 font-mono text-sm text-white/70">
                      {r.medida} · ${r.precio}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand-red px-3 py-1 font-display text-sm tracking-display text-white">
                    {r.match}% match
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:bg-white/5"
            >
              Ver todas las opciones
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </button>

            <button
              type="button"
              onClick={reset}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white/70"
            >
              <RotateCcw className="h-3 w-3" aria-hidden />
              Volver a empezar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
