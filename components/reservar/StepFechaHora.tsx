"use client";

import { useMemo } from "react";
import {
  addDays,
  format,
  isSameDay,
  isSunday,
  parseISO,
  startOfToday,
} from "date-fns";
import { es } from "date-fns/locale";

import { useReservaStore } from "@/lib/store/reservas";

const DIAS_SHOWN = 14;

function buildSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h <= 17; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots.slice(0, 18);
}

const SLOTS = buildSlots();

function isSlotOcupado(fecha: Date, hourIdx: number): boolean {
  return (fecha.getDate() + hourIdx) % 3 === 0;
}

export function StepFechaHora() {
  const fecha = useReservaStore((s) => s.fecha);
  const hora = useReservaStore((s) => s.hora);
  const setFechaHora = useReservaStore((s) => s.setFechaHora);

  const dias = useMemo(() => {
    const today = startOfToday();
    return Array.from({ length: DIAS_SHOWN }, (_, i) => addDays(today, i));
  }, []);

  const selectedDate = fecha ? parseISO(fecha) : null;

  const handleSelectDay = (date: Date) => {
    const iso = format(date, "yyyy-MM-dd");
    if (hora) {
      const idx = SLOTS.indexOf(hora);
      if (idx >= 0 && !isSlotOcupado(date, idx)) {
        setFechaHora(iso, hora);
        return;
      }
    }
    setFechaHora(iso, "");
  };

  const handleSelectSlot = (slot: string) => {
    if (!fecha) return;
    setFechaHora(fecha, slot);
  };

  return (
    <section aria-labelledby="paso-fechahora-titulo">
      <h2
        id="paso-fechahora-titulo"
        className="mb-2 font-display text-3xl italic leading-none tracking-tight text-white sm:text-4xl"
      >
        <span>ELEGÍ FECHA Y</span>{" "}
        <span className="text-brand-red">HORA</span>
      </h2>
      <p className="mb-6 font-sans text-sm text-white sm:text-base">
        Próximos 14 días. Los domingos no atendemos. Los horarios ocupados se
        muestran en gris.
      </p>

      <div className="mb-2 font-mono text-xs uppercase tracking-widest text-white">
        Día
      </div>
      <div className="mb-8 grid grid-cols-7 gap-2">
        {dias.map((date) => {
          const iso = format(date, "yyyy-MM-dd");
          const isDisabled = isSunday(date);
          const isSelected = selectedDate
            ? isSameDay(date, selectedDate)
            : false;
          const diaSemana = format(date, "EEEEE", { locale: es }).toUpperCase();
          const diaMes = format(date, "d");
          const mes = format(date, "MMM", { locale: es });

          if (isDisabled) {
            return (
              <div
                key={iso}
                aria-disabled
                className="flex flex-col items-center gap-1 rounded-xl border border-surface-border bg-surface-card p-2 text-white opacity-30 sm:p-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {diaSemana}
                </span>
                <span className="font-display text-2xl leading-none sm:text-3xl">
                  {diaMes}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  {mes}
                </span>
              </div>
            );
          }

          if (isSelected) {
            return (
              <button
                key={iso}
                type="button"
                onClick={() => handleSelectDay(date)}
                aria-pressed
                className="flex flex-col items-center gap-1 rounded-xl border border-brand-red bg-brand-red p-2 text-white shadow-lg shadow-brand-red/30 transition-all sm:p-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  {diaSemana}
                </span>
                <span className="font-display text-2xl leading-none text-white sm:text-3xl">
                  {diaMes}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  {mes}
                </span>
              </button>
            );
          }

          return (
            <button
              key={iso}
              type="button"
              onClick={() => handleSelectDay(date)}
              className="flex flex-col items-center gap-1 rounded-xl border border-surface-border bg-surface-card p-2 text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10 sm:p-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                {diaSemana}
              </span>
              <span className="font-display text-2xl leading-none text-white sm:text-3xl">
                {diaMes}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                {mes}
              </span>
            </button>
          );
        })}
      </div>

      {selectedDate ? (
        <div>
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-white">
            Horarios disponibles ·{" "}
            <span className="text-brand-red">
              {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SLOTS.map((slot, idx) => {
              const ocupado = isSlotOcupado(selectedDate, idx);
              const isSelected = !ocupado && hora === slot;

              if (ocupado) {
                return (
                  <div
                    key={slot}
                    aria-disabled
                    className="flex flex-col items-center gap-1 rounded-lg border border-surface-border bg-surface-card px-3 py-3 opacity-30"
                  >
                    <span className="font-mono text-sm text-white line-through">
                      {slot}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white">
                      Ocupado
                    </span>
                  </div>
                );
              }

              if (isSelected) {
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSelectSlot(slot)}
                    aria-pressed
                    className="rounded-lg border border-brand-red bg-brand-red px-3 py-3 font-mono text-sm text-white shadow-lg shadow-brand-red/30 transition-all"
                  >
                    {slot}
                  </button>
                );
              }

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleSelectSlot(slot)}
                  className="rounded-lg border border-surface-border bg-surface-elevated px-3 py-3 font-mono text-sm text-white transition-all hover:-translate-y-0.5 hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10"
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-surface-border bg-surface-card p-6 font-mono text-xs uppercase tracking-widest text-white">
          Seleccioná un día para ver los horarios disponibles.
        </div>
      )}
    </section>
  );
}
