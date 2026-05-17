"use client";

import { useMemo } from "react";
import {
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  buildWeekReservas,
  servicioBorderClass,
  type Reserva,
} from "./mockData";

type Props = {
  sucursalId: string;
};

const DAY_LETTERS = ["L", "M", "X", "J", "V", "S", "D"];

export function CalendarioSemanal({ sucursalId }: Props) {
  const today = useMemo(() => new Date(), []);
  const weekStart = useMemo(
    () => startOfWeek(today, { weekStartsOn: 1, locale: es }),
    [today],
  );
  const weekEnd = useMemo(
    () => endOfWeek(today, { weekStartsOn: 1, locale: es }),
    [today],
  );
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );
  const reservasByDay = useMemo(
    () => buildWeekReservas(sucursalId),
    [sucursalId],
  );

  const rangoLabel = `Semana del ${format(weekStart, "dd MMM", { locale: es })} al ${format(weekEnd, "dd MMM, yyyy", { locale: es })}`;

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display italic text-3xl leading-none tracking-tight text-white sm:text-4xl">
          <span>AGENDA DE LA</span> <span className="text-brand-red">SEMANA</span>
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white">
          {rangoLabel}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface-card">
        <div className="grid min-w-[840px] grid-cols-7">
          {days.map((day, dayIdx) => {
            const reservas = reservasByDay[dayIdx] ?? [];
            const esHoy = isSameDay(day, today);
            const sobrecargado = reservas.length > 6;
            return (
              <DayColumn
                key={dayIdx}
                date={day}
                letter={DAY_LETTERS[dayIdx]}
                esHoy={esHoy}
                sobrecargado={sobrecargado}
                reservas={reservas}
                last={dayIdx === 6}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DayColumn({
  date,
  letter,
  esHoy,
  sobrecargado,
  reservas,
  last,
}: {
  date: Date;
  letter: string;
  esHoy: boolean;
  sobrecargado: boolean;
  reservas: Reserva[];
  last: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${last ? "" : "border-r border-surface-border"}`}
    >
      <header className="sticky top-0 z-10 border-b border-surface-border bg-surface-elevated px-3 py-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div
              className={`font-mono text-[10px] uppercase tracking-widest ${esHoy ? "text-brand-red" : "text-white"}`}
            >
              {letter}
            </div>
            <div
              className={`font-display text-2xl leading-none ${esHoy ? "text-brand-red" : "text-white"}`}
            >
              {format(date, "dd")}
            </div>
          </div>
          {sobrecargado && (
            <span className="rounded-sm bg-brand-red px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
              SOBRECARGADO
            </span>
          )}
        </div>
      </header>

      <div className="flex min-h-[280px] flex-col gap-2 p-2">
        {reservas.length === 0 ? (
          <div className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-white">
            Sin reservas
          </div>
        ) : (
          reservas.map((r, i) => (
            <article
              key={i}
              className={`rounded border-l-4 ${servicioBorderClass(r.servicioId)} bg-surface-elevated p-2 text-xs`}
            >
              <div className="font-mono text-white">{r.hora}</div>
              <div className="mt-0.5 font-sans leading-tight text-white">
                {r.servicioNombre}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white">
                {r.iniciales}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
