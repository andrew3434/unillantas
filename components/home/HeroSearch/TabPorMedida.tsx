"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const ANCHO_MIN = 145;
const ANCHO_MAX = 355;
const PERFIL_MIN = 25;
const PERFIL_MAX = 85;
const ARO_MIN = 13;
const ARO_MAX = 22;

const outOfRange = (val: string, min: number, max: number) => {
  if (val === "") return false;
  const n = parseInt(val, 10);
  return Number.isNaN(n) || n < min || n > max;
};

type FieldKey = "ancho" | "perfil" | "aro";

interface InputCellProps {
  id: FieldKey;
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength: number;
  invalid: boolean;
  placeholder: string;
}

function InputCell({
  id,
  label,
  value,
  onChange,
  maxLength,
  invalid,
  placeholder,
}: InputCellProps) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    onChange(digitsOnly);
  };

  return (
    <div className="flex flex-1 flex-col">
      <label
        htmlFor={`medida-${id}`}
        className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/40"
      >
        {label}
      </label>
      <input
        id={`medida-${id}`}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        value={value}
        onChange={handle}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={`w-full rounded-lg border bg-surface-elevated px-3 py-4 text-center font-mono text-3xl tracking-wider text-white transition-colors placeholder:text-white/15 focus:outline-none focus:ring-2 focus:ring-brand-red/40 ${
          invalid
            ? "border-brand-red/60"
            : "border-surface-border focus:border-brand-red/40"
        }`}
      />
    </div>
  );
}

function Separator({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="flex items-end pb-4 font-mono text-2xl text-white/30"
    >
      {children}
    </div>
  );
}

export function TabPorMedida() {
  const router = useRouter();
  const [ancho, setAncho] = useState("");
  const [perfil, setPerfil] = useState("");
  const [aro, setAro] = useState("");

  const anchoErr = outOfRange(ancho, ANCHO_MIN, ANCHO_MAX);
  const perfilErr = outOfRange(perfil, PERFIL_MIN, PERFIL_MAX);
  const aroErr = outOfRange(aro, ARO_MIN, ARO_MAX);

  const allFilled = ancho !== "" && perfil !== "" && aro !== "";
  const disabled = !allFilled || anchoErr || perfilErr || aroErr;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    router.push(`/catalogo?ancho=${ancho}&perfil=${perfil}&aro=${aro}`);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex items-stretch gap-3 sm:gap-4">
        <InputCell
          id="ancho"
          label={`Ancho (${ANCHO_MIN}–${ANCHO_MAX})`}
          value={ancho}
          onChange={setAncho}
          maxLength={3}
          invalid={anchoErr}
          placeholder="215"
        />
        <Separator>/</Separator>
        <InputCell
          id="perfil"
          label={`Perfil (${PERFIL_MIN}–${PERFIL_MAX})`}
          value={perfil}
          onChange={setPerfil}
          maxLength={3}
          invalid={perfilErr}
          placeholder="55"
        />
        <Separator>R</Separator>
        <InputCell
          id="aro"
          label={`Aro (${ARO_MIN}–${ARO_MAX})`}
          value={aro}
          onChange={setAro}
          maxLength={2}
          invalid={aroErr}
          placeholder="17"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
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
