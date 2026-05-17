"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Car, CheckCircle, Mail, Phone, User } from "lucide-react";

import serviciosData from "@/data/servicios.json";
import sucursalesData from "@/data/sucursales.json";
import productosData from "@/data/productos.json";
import { useReservaStore } from "@/lib/store/reservas";

type Servicio = {
  id: string;
  nombre: string;
  duracion: string;
};

type Sucursal = {
  id: string;
  nombre: string;
  direccion: string;
};

type Producto = {
  id: string;
  marca: string;
  modelo: string;
};

const servicios = serviciosData as Servicio[];
const sucursales = sucursalesData as Sucursal[];
const productos = productosData as Producto[];

function buildIcsContent(input: {
  codigo: string;
  servicio: Servicio;
  sucursal: Sucursal;
  fecha: string;
  hora: string;
}): string {
  const [yyyy, mm, dd] = input.fecha.split("-").map((s) => parseInt(s, 10));
  const [hh, mi] = input.hora.split(":").map((s) => parseInt(s, 10));
  const start = new Date(yyyy, mm - 1, dd, hh, mi);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const fmtUtc = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(
      d.getUTCHours(),
    )}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const now = new Date();
  const safeAddr = input.sucursal.direccion.replace(/,/g, "\\,");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Unillantas//Reserva//ES",
    "BEGIN:VEVENT",
    `UID:${input.codigo}@unillantas.com.sv`,
    `DTSTAMP:${fmtUtc(now)}`,
    `DTSTART:${fmtUtc(start)}`,
    `DTEND:${fmtUtc(end)}`,
    `SUMMARY:Unillantas - ${input.servicio.nombre}`,
    `DESCRIPTION:Reserva en ${input.sucursal.nombre}\\nCódigo: ${input.codigo}`,
    `LOCATION:${safeAddr}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function ResumenCard({
  servicio,
  sucursal,
  fechaLegible,
  hora,
  producto,
}: {
  servicio: Servicio | undefined;
  sucursal: Sucursal | undefined;
  fechaLegible: string | null;
  hora: string | null;
  producto: Producto | null;
}) {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
        Resumen
      </span>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white">
            Servicio
          </div>
          <div className="mt-1 font-display text-xl italic tracking-tight text-white">
            {servicio?.nombre ?? "—"}
          </div>
          {servicio ? (
            <div className="mt-1 font-mono text-xs text-white">
              Duración: {servicio.duracion}
            </div>
          ) : null}
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white">
            Sucursal
          </div>
          <div className="mt-1 font-display text-xl italic tracking-tight text-white">
            {sucursal?.nombre ?? "—"}
          </div>
          {sucursal ? (
            <div className="mt-1 font-sans text-xs text-white">
              {sucursal.direccion}
            </div>
          ) : null}
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white">
            Fecha
          </div>
          <div className="mt-1 font-display text-xl italic tracking-tight text-white">
            {fechaLegible ?? "—"}
          </div>
          {hora ? (
            <div className="mt-1 font-mono text-xs text-white">
              a las <span className="text-brand-red">{hora}</span>
            </div>
          ) : null}
        </div>

        {producto ? (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white">
              Llanta seleccionada
            </div>
            <div className="mt-1 font-display text-xl italic tracking-tight text-white">
              {producto.marca}{" "}
              <span className="text-brand-red">{producto.modelo}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function StepConfirmacion() {
  const servicioId = useReservaStore((s) => s.servicioId);
  const sucursalId = useReservaStore((s) => s.sucursalId);
  const fecha = useReservaStore((s) => s.fecha);
  const hora = useReservaStore((s) => s.hora);
  const productoId = useReservaStore((s) => s.productoId);
  const datos = useReservaStore((s) => s.datos);
  const setDatos = useReservaStore((s) => s.setDatos);

  const servicio = useMemo(
    () => servicios.find((s) => s.id === servicioId),
    [servicioId],
  );
  const sucursal = useMemo(
    () => sucursales.find((s) => s.id === sucursalId),
    [sucursalId],
  );
  const producto = useMemo(
    () =>
      productoId ? productos.find((p) => p.id === productoId) ?? null : null,
    [productoId],
  );

  const fechaLegible = fecha
    ? format(parseISO(fecha), "EEEE d 'de' MMMM", { locale: es })
    : null;

  return (
    <section aria-labelledby="paso-confirmar-titulo" className="space-y-6">
      <h2
        id="paso-confirmar-titulo"
        className="font-display text-3xl italic leading-none tracking-tight text-white sm:text-4xl"
      >
        <span>CONFIRMÁ TUS</span>{" "}
        <span className="text-brand-red">DATOS</span>
      </h2>
      <p className="-mt-2 font-sans text-sm text-white sm:text-base">
        Revisá el resumen y completá tus datos. Te enviamos confirmación por
        WhatsApp.
      </p>

      <ResumenCard
        servicio={servicio}
        sucursal={sucursal}
        fechaLegible={fechaLegible}
        hora={hora}
        producto={producto}
      />

      <div className="rounded-2xl border border-surface-border bg-surface-card p-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
          Tus datos
        </span>

        <form
          className="mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="sm:col-span-1">
            <label
              htmlFor="reserva-nombre"
              className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <User className="h-3 w-3 text-brand-red" aria-hidden /> Nombre
              completo
            </label>
            <input
              id="reserva-nombre"
              type="text"
              required
              value={datos.nombre}
              onChange={(e) => setDatos({ nombre: e.target.value })}
              placeholder="Ej: José Martínez"
              className="w-full rounded-lg border border-surface-border bg-surface-elevated px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            />
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="reserva-telefono"
              className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <Phone className="h-3 w-3 text-brand-red" aria-hidden /> Teléfono
              (WhatsApp)
            </label>
            <input
              id="reserva-telefono"
              type="tel"
              required
              value={datos.telefono}
              onChange={(e) => setDatos({ telefono: e.target.value })}
              placeholder="7777-7777"
              className="w-full rounded-lg border border-surface-border bg-surface-elevated px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            />
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="reserva-email"
              className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <Mail className="h-3 w-3 text-brand-red" aria-hidden /> Correo
              electrónico
            </label>
            <input
              id="reserva-email"
              type="email"
              required
              value={datos.email}
              onChange={(e) => setDatos({ email: e.target.value })}
              placeholder="tucorreo@email.com"
              className="w-full rounded-lg border border-surface-border bg-surface-elevated px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            />
          </div>

          <div className="sm:col-span-1">
            <label
              htmlFor="reserva-placa"
              className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <Car className="h-3 w-3 text-brand-red" aria-hidden /> Placa del
              vehículo
            </label>
            <input
              id="reserva-placa"
              type="text"
              required
              value={datos.placa}
              onChange={(e) =>
                setDatos({ placa: e.target.value.toUpperCase() })
              }
              placeholder="P123-456"
              className="w-full rounded-lg border border-surface-border bg-surface-elevated px-4 py-3 font-mono text-white placeholder:text-white/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="reserva-notas"
              className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white"
            >
              <Calendar className="h-3 w-3 text-brand-red" aria-hidden /> Notas
              (opcional)
            </label>
            <textarea
              id="reserva-notas"
              rows={3}
              value={datos.notas}
              onChange={(e) => setDatos({ notas: e.target.value })}
              placeholder="Algún detalle que debamos saber antes de tu visita…"
              className="w-full resize-none rounded-lg border border-surface-border bg-surface-elevated px-4 py-3 font-sans text-white placeholder:text-white/40 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export function PantallaCompletado() {
  const codigo = useReservaStore((s) => s.codigoReserva);
  const servicioId = useReservaStore((s) => s.servicioId);
  const sucursalId = useReservaStore((s) => s.sucursalId);
  const fecha = useReservaStore((s) => s.fecha);
  const hora = useReservaStore((s) => s.hora);
  const productoId = useReservaStore((s) => s.productoId);
  const reset = useReservaStore((s) => s.reset);

  const servicio = useMemo(
    () => servicios.find((s) => s.id === servicioId),
    [servicioId],
  );
  const sucursal = useMemo(
    () => sucursales.find((s) => s.id === sucursalId),
    [sucursalId],
  );
  const producto = useMemo(
    () =>
      productoId ? productos.find((p) => p.id === productoId) ?? null : null,
    [productoId],
  );

  const fechaLegible = fecha
    ? format(parseISO(fecha), "EEEE d 'de' MMMM", { locale: es })
    : null;

  const icsDataUrl = useMemo(() => {
    if (!servicio || !sucursal || !fecha || !hora || !codigo) return null;
    const ics = buildIcsContent({
      codigo,
      servicio,
      sucursal,
      fecha,
      hora,
    });
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  }, [servicio, sucursal, fecha, hora, codigo]);

  return (
    <section className="py-8 sm:py-16">
      <div className="flex flex-col items-center text-center">
        <CheckCircle
          className="h-20 w-20 text-whatsapp"
          strokeWidth={1.5}
          aria-hidden
        />
        <h2 className="mt-5 font-display text-4xl italic leading-none tracking-tight text-white sm:text-6xl">
          ¡RESERVA <span className="text-brand-red">CONFIRMADA</span>!
        </h2>
        <p className="mt-3 max-w-xl font-sans text-sm text-white sm:text-base">
          Te enviamos un WhatsApp con la confirmación al teléfono que indicaste.
          Si necesitás reprogramar, respondé al mensaje.
        </p>

        <div className="mt-6 font-mono text-2xl text-white">
          Código:{" "}
          <span className="font-display text-4xl text-brand-red">{codigo}</span>
        </div>
      </div>

      <div className="mt-10">
        <ResumenCard
          servicio={servicio}
          sucursal={sucursal}
          fechaLegible={fechaLegible}
          hora={hora}
          producto={producto}
        />
      </div>

      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
        {icsDataUrl ? (
          <a
            href={icsDataUrl}
            download="reserva-unillantas.ics"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-surface-border bg-surface-card px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all hover:border-white/30 hover:bg-surface-elevated"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            Agregar a calendario
          </a>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="group inline-flex animate-red-glow items-center justify-center gap-2 rounded-full bg-brand-red px-8 py-4 font-display text-lg uppercase tracking-wider text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-brand-red/40 active:scale-[0.98]"
        >
          Hacer otra reserva
        </button>
      </div>
    </section>
  );
}
