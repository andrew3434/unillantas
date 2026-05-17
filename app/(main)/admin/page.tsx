"use client";

import { useMemo, useState } from "react";
import { TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { CalendarioSemanal } from "@/components/admin/CalendarioSemanal";
import { CitasPendientes } from "@/components/admin/CitasPendientes";
import { StockBajo } from "@/components/admin/StockBajo";
import {
  SUCURSALES,
  getKpis,
  type KpiSet,
} from "@/components/admin/mockData";

export default function AdminPage() {
  const [sucursalId, setSucursalId] = useState<string>("all");
  const kpis = useMemo(() => getKpis(sucursalId), [sucursalId]);

  const sucursalLabel =
    sucursalId === "all"
      ? "Todas las sucursales"
      : SUCURSALES.find((s) => s.id === sucursalId)?.nombre ?? "Sucursal";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <header className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            Panel de administración
          </span>
          <h1 className="mt-5 font-display italic text-5xl leading-none tracking-tight text-white sm:text-7xl">
            <span>DASHBOARD</span>{" "}
            <span className="text-brand-red">CENTRAL</span>
          </h1>
          <p className="mt-4 max-w-xl font-sans text-base text-white sm:text-lg">
            Reservas, KPIs y operación en tiempo real
          </p>
        </div>

        <SucursalSelector
          value={sucursalId}
          onChange={setSucursalId}
          currentLabel={sucursalLabel}
        />
      </header>

      <div className="space-y-12">
        <KpiGrid kpis={kpis} />
        <CalendarioSemanal sucursalId={sucursalId} />
        <CitasPendientes sucursalId={sucursalId} />
        <StockBajo />
      </div>
    </div>
  );
}

function SucursalSelector({
  value,
  onChange,
  currentLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  currentLabel: string;
}) {
  return (
    <label className="flex flex-col gap-2 lg:items-end">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white">
        Filtrar por sucursal
      </span>
      <div className="relative inline-flex items-center">
        <MapPin
          className="pointer-events-none absolute left-3 h-4 w-4 text-brand-red"
          aria-hidden
        />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Sucursal actual: ${currentLabel}`}
          className="min-w-[260px] appearance-none rounded-full border border-surface-border bg-surface-card py-2.5 pl-9 pr-10 font-sans text-sm text-white outline-none transition-colors hover:border-white/30 focus:border-brand-red focus:ring-2 focus:ring-brand-red/40"
        >
          <option value="all">Todas las sucursales</option>
          {SUCURSALES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre} · {s.departamento}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 font-mono text-xs text-white"
          aria-hidden
        >
          ▾
        </span>
      </div>
    </label>
  );
}

function KpiGrid({ kpis }: { kpis: KpiSet }) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Reservas hoy"
          value={String(kpis.reservasHoy)}
          deltaLabel={`${formatDelta(kpis.reservasHoyDelta)} vs ayer`}
          deltaUp={kpis.reservasHoyDelta >= 0}
        />
        <KpiCard
          label="Reservas esta semana"
          value={String(kpis.reservasSemana)}
          deltaLabel={`${formatDelta(kpis.reservasSemanaDelta)} vs sem. anterior`}
          deltaUp={kpis.reservasSemanaDelta >= 0}
        />
        <KpiCard
          label="Tasa de conversión"
          value={`${kpis.conversion}%`}
          deltaLabel={`${formatDelta(kpis.conversionDelta)} vs sem. anterior`}
          deltaUp={kpis.conversionDelta >= 0}
        />
        <KpiCard
          label="Servicio más solicitado"
          value={`${kpis.servicioTopPct}%`}
          subline={kpis.servicioTop}
        />
      </div>
    </section>
  );
}

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta}%`;
}

function KpiCard({
  label,
  value,
  deltaLabel,
  deltaUp,
  subline,
}: {
  label: string;
  value: string;
  deltaLabel?: string;
  deltaUp?: boolean;
  subline?: string;
}) {
  return (
    <article className="flex flex-col justify-between rounded-xl border border-surface-border bg-surface-card p-6 transition-colors hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10">
      <div className="font-mono text-xs uppercase tracking-widest text-white">
        {label}
      </div>
      <div className="mt-3 font-display text-5xl leading-none text-white">
        {value}
      </div>
      {subline && (
        <div className="mt-2 truncate font-display text-base uppercase tracking-tight text-white">
          {subline}
        </div>
      )}
      {deltaLabel && (
        <div
          className={`mt-3 inline-flex items-center gap-1.5 font-mono text-sm ${deltaUp ? "text-green-400" : "text-brand-red"}`}
        >
          {deltaUp ? (
            <TrendingUp className="h-4 w-4" aria-hidden />
          ) : (
            <TrendingDown className="h-4 w-4" aria-hidden />
          )}
          <span>{deltaLabel}</span>
        </div>
      )}
    </article>
  );
}
