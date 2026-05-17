"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Stepper } from "@/components/reservar/Stepper";
import { StepServicio } from "@/components/reservar/StepServicio";
import { StepSucursal } from "@/components/reservar/StepSucursal";
import { StepFechaHora } from "@/components/reservar/StepFechaHora";
import {
  PantallaCompletado,
  StepConfirmacion,
} from "@/components/reservar/StepConfirmacion";
import productosData from "@/data/productos.json";
import { useReservaStore, type PasoReserva } from "@/lib/store/reservas";

type Producto = { id: string };
const productos = productosData as Producto[];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function ReservarInner() {
  const searchParams = useSearchParams();
  const productoParam = searchParams.get("producto");

  const paso = useReservaStore((s) => s.paso);
  const servicioId = useReservaStore((s) => s.servicioId);
  const sucursalId = useReservaStore((s) => s.sucursalId);
  const fecha = useReservaStore((s) => s.fecha);
  const hora = useReservaStore((s) => s.hora);
  const datos = useReservaStore((s) => s.datos);
  const setPaso = useReservaStore((s) => s.setPaso);
  const setProducto = useReservaStore((s) => s.setProducto);
  const confirmarReserva = useReservaStore((s) => s.confirmarReserva);

  useEffect(() => {
    if (!productoParam) {
      setProducto(null);
      return;
    }
    const exists = productos.some((p) => p.id === productoParam);
    setProducto(exists ? productoParam : null);
  }, [productoParam, setProducto]);

  if (paso === "completado") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <PantallaCompletado />
      </div>
    );
  }

  const pasoNumber = paso as 1 | 2 | 3 | 4;

  const datosCompletos =
    datos.nombre.trim().length > 0 &&
    datos.telefono.trim().length > 0 &&
    isValidEmail(datos.email) &&
    datos.placa.trim().length > 0;

  const siguienteDisabled = (() => {
    switch (pasoNumber) {
      case 1:
        return !servicioId;
      case 2:
        return !sucursalId;
      case 3:
        return !fecha || !hora;
      case 4:
        return !datosCompletos;
      default:
        return true;
    }
  })();

  const handleSiguiente = () => {
    if (siguienteDisabled) return;
    if (pasoNumber === 4) {
      confirmarReserva();
      return;
    }
    const next = (pasoNumber + 1) as PasoReserva;
    setPaso(next);
  };

  const handleAtras = () => {
    if (pasoNumber <= 1) return;
    const prev = (pasoNumber - 1) as PasoReserva;
    setPaso(prev);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <header className="mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Agendá tu cita en 4 pasos
        </span>

        <h1 className="mt-5 font-display text-5xl italic leading-none tracking-tight text-white sm:text-7xl">
          <span>RESERVA TU</span>{" "}
          <span className="text-brand-red">SERVICIO</span>
        </h1>

        <p className="mt-4 max-w-2xl font-sans text-base text-white sm:text-lg">
          Elegí el servicio, la sucursal más cercana y el horario que te quede
          mejor. Sin esperas, sin sorpresas.
        </p>
      </header>

      <Stepper pasoActual={pasoNumber} />

      <div className="min-h-[400px]">
        {pasoNumber === 1 ? <StepServicio /> : null}
        {pasoNumber === 2 ? <StepSucursal /> : null}
        {pasoNumber === 3 ? <StepFechaHora /> : null}
        {pasoNumber === 4 ? <StepConfirmacion /> : null}
      </div>

      <div className="mt-10 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {pasoNumber > 1 ? (
          <button
            type="button"
            onClick={handleAtras}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:border-white/30 hover:bg-surface-elevated"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Atrás
          </button>
        ) : (
          <div aria-hidden />
        )}

        <button
          type="button"
          onClick={handleSiguiente}
          disabled={siguienteDisabled}
          className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-red disabled:hover:shadow-brand-red/20 ${
            !siguienteDisabled ? "animate-red-glow" : ""
          }`}
        >
          {pasoNumber === 4 ? "Confirmar reserva" : "Siguiente"}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </button>
      </div>

      {pasoNumber === 4 ? (
        <p className="mt-3 text-center font-mono text-xs text-white">
          Te enviaremos un WhatsApp con la confirmación
        </p>
      ) : null}
    </div>
  );
}

export default function ReservarPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
          <div className="h-12 w-2/3 animate-pulse rounded-lg bg-surface-card" />
        </div>
      }
    >
      <ReservarInner />
    </Suspense>
  );
}
