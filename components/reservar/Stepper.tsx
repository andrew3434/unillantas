"use client";

import { Check } from "lucide-react";

const PASOS = [
  { num: 1, label: "Servicio" },
  { num: 2, label: "Sucursal" },
  { num: 3, label: "Fecha y Hora" },
  { num: 4, label: "Confirmar" },
] as const;

type StepperProps = {
  pasoActual: 1 | 2 | 3 | 4;
};

export function Stepper({ pasoActual }: StepperProps) {
  return (
    <nav aria-label="Progreso de la reserva" className="mb-10">
      <ol className="flex items-start justify-between gap-2">
        {PASOS.map((paso, idx) => {
          const isCompleted = paso.num < pasoActual;
          const isCurrent = paso.num === pasoActual;
          const isLast = idx === PASOS.length - 1;

          return (
            <li
              key={paso.num}
              className="flex flex-1 flex-col items-center"
              aria-current={isCurrent ? "step" : undefined}
            >
              <div className="flex w-full items-center">
                <div className="flex-1">
                  {idx > 0 ? (
                    <div
                      className={`h-0.5 w-full ${
                        paso.num <= pasoActual
                          ? "bg-brand-red"
                          : "bg-surface-border"
                      }`}
                    />
                  ) : null}
                </div>

                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm transition-all sm:h-12 sm:w-12 sm:text-base",
                    isCompleted
                      ? "bg-brand-red text-white shadow-lg shadow-brand-red/30"
                      : isCurrent
                        ? "border-2 border-brand-red bg-surface-dark text-brand-red shadow-lg shadow-brand-red/20"
                        : "border border-surface-border bg-surface-elevated text-white",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                  ) : (
                    paso.num
                  )}
                </div>

                <div className="flex-1">
                  {!isLast ? (
                    <div
                      className={`h-0.5 w-full ${
                        paso.num < pasoActual
                          ? "bg-brand-red"
                          : "bg-surface-border"
                      }`}
                    />
                  ) : null}
                </div>
              </div>

              <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white sm:text-xs">
                {paso.label}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
