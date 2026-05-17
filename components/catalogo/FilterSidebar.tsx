"use client";

import { Check, X } from "lucide-react";
import {
  CATEGORIAS_TIPO,
  MARCAS,
  MEDIDA_RANGOS,
  type CategoriaTipo,
  type FilterState,
} from "./types";

interface FilterSidebarProps {
  filters: FilterState;
  onToggleMarca: (marca: string) => void;
  onToggleTipo: (tipo: CategoriaTipo) => void;
  onChangeMedida: (key: "ancho" | "perfil" | "aro", value: string) => void;
  onChangePrecio: (key: "precioMin" | "precioMax", value: string) => void;
  onClear: () => void;
  activeCount: number;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-white">
      {children}
    </h3>
  );
}

function NumberInput({
  id,
  label,
  value,
  onChange,
  maxLength,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
  placeholder: string;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <label
        htmlFor={id}
        className="mb-1.5 font-mono text-[0.6rem] uppercase tracking-widest text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/\D/g, "").slice(0, maxLength))
        }
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-lg border border-surface-border bg-surface-elevated px-3 py-2.5 text-center font-mono text-base tracking-wider text-white transition-colors placeholder:text-white focus:border-brand-red/40 focus:outline-none focus:ring-2 focus:ring-brand-red/40"
      />
    </div>
  );
}

export function FilterSidebar({
  filters,
  onToggleMarca,
  onToggleTipo,
  onChangeMedida,
  onChangePrecio,
  onClear,
  activeCount,
}: FilterSidebarProps) {
  return (
    <aside className="flex flex-col gap-6 rounded-xl border border-surface-border bg-surface-card p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-white">
          Filtros{activeCount > 0 ? ` (${activeCount})` : ""}
        </span>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-surface-elevated px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-white transition-colors hover:border-white/30 hover:bg-surface-card disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-3 w-3" aria-hidden />
          Limpiar
        </button>
      </div>

      <section>
        <SectionTitle>Marca</SectionTitle>
        <ul className="flex flex-col gap-2">
          {MARCAS.map((marca) => {
            const active = filters.marcas.has(marca);
            return (
              <li key={marca}>
                <button
                  type="button"
                  onClick={() => onToggleMarca(marca)}
                  aria-pressed={active}
                  className="group/check flex w-full items-center gap-3 rounded-md px-1 py-1 text-left transition-colors hover:bg-surface-elevated"
                >
                  <span
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded border transition-colors ${
                      active
                        ? "border-brand-red bg-brand-red"
                        : "border-surface-border bg-surface-elevated group-hover/check:border-white/30"
                    }`}
                    aria-hidden
                  >
                    {active && (
                      <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                    )}
                  </span>
                  <span className="font-sans text-sm text-white">{marca}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <SectionTitle>Tipo</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {CATEGORIAS_TIPO.map((tipo) => {
            const active = filters.tipos.has(tipo);
            return (
              <button
                key={tipo}
                type="button"
                onClick={() => onToggleTipo(tipo)}
                aria-pressed={active}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest transition-colors ${
                  active
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-surface-border bg-surface-elevated text-white hover:border-white/30"
                }`}
              >
                {tipo}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle>Medida</SectionTitle>
        <div className="flex items-end gap-2">
          <NumberInput
            id="filter-ancho"
            label={`Ancho (${MEDIDA_RANGOS.ancho.min}–${MEDIDA_RANGOS.ancho.max})`}
            value={filters.ancho}
            onChange={(v) => onChangeMedida("ancho", v)}
            maxLength={3}
            placeholder="215"
          />
          <span aria-hidden className="pb-2.5 font-mono text-lg text-white">
            /
          </span>
          <NumberInput
            id="filter-perfil"
            label={`Perfil (${MEDIDA_RANGOS.perfil.min}–${MEDIDA_RANGOS.perfil.max})`}
            value={filters.perfil}
            onChange={(v) => onChangeMedida("perfil", v)}
            maxLength={2}
            placeholder="55"
          />
          <span aria-hidden className="pb-2.5 font-mono text-lg text-white">
            R
          </span>
          <NumberInput
            id="filter-aro"
            label={`Aro (${MEDIDA_RANGOS.aro.min}–${MEDIDA_RANGOS.aro.max})`}
            value={filters.aro}
            onChange={(v) => onChangeMedida("aro", v)}
            maxLength={2}
            placeholder="17"
          />
        </div>
      </section>

      <section>
        <SectionTitle>Precio (USD)</SectionTitle>
        <div className="flex items-end gap-3">
          <NumberInput
            id="filter-precio-min"
            label="Mínimo"
            value={filters.precioMin}
            onChange={(v) => onChangePrecio("precioMin", v)}
            maxLength={4}
            placeholder="0"
          />
          <span aria-hidden className="pb-2.5 font-mono text-lg text-white">
            —
          </span>
          <NumberInput
            id="filter-precio-max"
            label="Máximo"
            value={filters.precioMax}
            onChange={(v) => onChangePrecio("precioMax", v)}
            maxLength={4}
            placeholder="350"
          />
        </div>
      </section>
    </aside>
  );
}
