"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import vehiculos from "@/data/vehiculos.json";

type VehiculosData = Record<string, Record<string, Record<string, string>>>;
const data = vehiculos as VehiculosData;

const MEDIDA_REGEX = /^(\d{2,3})\/(\d{2,3})R(\d{2})$/;

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled: boolean;
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: SelectFieldProps) {
  const handle = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value);

  return (
    <div className={`flex flex-col ${disabled ? "opacity-40" : ""}`}>
      <label
        htmlFor={id}
        className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/40"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={handle}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-surface-border bg-surface-elevated px-4 py-3.5 pr-10 font-sans text-base text-white transition-colors focus:border-brand-red/40 focus:outline-none focus:ring-2 focus:ring-brand-red/40 disabled:cursor-not-allowed"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
        />
      </div>
    </div>
  );
}

export function TabPorVehiculo() {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");

  const marcas = Object.keys(data);
  const modelos = marca ? Object.keys(data[marca] ?? {}) : [];
  const anios = marca && modelo ? Object.keys(data[marca]?.[modelo] ?? {}) : [];

  const medida =
    marca && modelo && anio ? data[marca]?.[modelo]?.[anio] ?? null : null;
  const parsed = medida ? medida.match(MEDIDA_REGEX) : null;
  const noMatch = marca !== "" && modelo !== "" && anio !== "" && !parsed;

  const handleMarca = (v: string) => {
    setMarca(v);
    setModelo("");
    setAnio("");
  };
  const handleModelo = (v: string) => {
    setModelo(v);
    setAnio("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!parsed) return;
    const [, ancho, perfil, aro] = parsed;
    router.push(`/catalogo?ancho=${ancho}&perfil=${perfil}&aro=${aro}`);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        <SelectField
          id="vehiculo-marca"
          label="Marca"
          value={marca}
          onChange={handleMarca}
          options={marcas}
          placeholder="Elegí tu marca"
          disabled={false}
        />
        <SelectField
          id="vehiculo-modelo"
          label="Modelo"
          value={modelo}
          onChange={handleModelo}
          options={modelos}
          placeholder={marca ? "Elegí tu modelo" : "Primero la marca"}
          disabled={!marca}
        />
        <SelectField
          id="vehiculo-anio"
          label="Año"
          value={anio}
          onChange={setAnio}
          options={anios}
          placeholder={modelo ? "Elegí el año" : "Primero el modelo"}
          disabled={!modelo}
        />
      </div>

      <div className="mt-5 min-h-[2.25rem]">
        {parsed && (
          <span className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-elevated px-3 py-1.5 font-mono text-sm font-medium text-white">
            <span className="text-white/40">Llantas:</span>
            <span className="tracking-wider">{medida}</span>
          </span>
        )}
        {noMatch && (
          <span className="font-mono text-xs text-white/40">
            No encontramos esa combinación
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={!parsed}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-4 font-display text-base uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-red disabled:hover:shadow-brand-red/20 disabled:active:scale-100"
      >
        Buscar llantas
        <ArrowRight
          className="h-5 w-5 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </button>
    </form>
  );
}
