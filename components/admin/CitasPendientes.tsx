"use client";

import { useMemo } from "react";
import { Check, X, MessageCircle } from "lucide-react";
import { buildCitasPendientes, type EstadoCita } from "./mockData";

type Props = {
  sucursalId: string;
};

function estadoChip(estado: EstadoCita): string {
  switch (estado) {
    case "Confirmada":
      return "bg-green-500/20 text-green-400 border border-green-500/40";
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40";
    case "Cancelada":
      return "bg-brand-red/20 text-brand-red border border-brand-red/40";
  }
}

export function CitasPendientes({ sucursalId }: Props) {
  const citas = useMemo(() => buildCitasPendientes(sucursalId), [sucursalId]);

  const handleConfirm = (cliente: string) => {
    if (typeof window !== "undefined") {
      window.alert(`Cita confirmada para ${cliente}`);
    }
  };
  const handleCancel = (cliente: string) => {
    if (typeof window !== "undefined") {
      window.alert(`Cita cancelada para ${cliente}`);
    }
  };
  const handleWhatsapp = (cliente: string) => {
    if (typeof window !== "undefined") {
      window.alert(`Abriendo WhatsApp para ${cliente}`);
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display italic text-3xl leading-none tracking-tight text-white sm:text-4xl">
          <span>CITAS</span> <span className="text-brand-red">PENDIENTES</span>
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white">
          Próximas 10 citas agendadas
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-card">
        <div className="max-h-[520px] overflow-auto">
          <table className="w-full min-w-[860px] border-collapse">
            <thead className="sticky top-0 z-10 bg-surface-elevated">
              <tr>
                <Th>Fecha / Hora</Th>
                <Th>Cliente</Th>
                <Th>Vehículo</Th>
                <Th>Servicio</Th>
                <Th>Sucursal</Th>
                <Th>Estado</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {citas.map((c, i) => (
                <tr
                  key={i}
                  className="border-t border-surface-border transition-colors hover:bg-surface-elevated/50"
                >
                  <td className="px-4 py-3 font-mono text-sm text-white">
                    {c.fecha}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-white">
                    {c.cliente}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-white">
                    {c.vehiculo}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-white">
                    {c.servicio}
                  </td>
                  <td className="px-4 py-3 font-sans text-sm text-white">
                    {c.sucursalNombre}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${estadoChip(c.estado)}`}
                    >
                      {c.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <IconBtn
                        label={`Confirmar cita de ${c.cliente}`}
                        onClick={() => handleConfirm(c.cliente)}
                        className="text-green-400 hover:bg-green-500/10"
                      >
                        <Check className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn
                        label={`Cancelar cita de ${c.cliente}`}
                        onClick={() => handleCancel(c.cliente)}
                        className="text-brand-red hover:bg-brand-red/10"
                      >
                        <X className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn
                        label={`Enviar WhatsApp a ${c.cliente}`}
                        onClick={() => handleWhatsapp(c.cliente)}
                        className="text-whatsapp hover:bg-whatsapp/10"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left font-mono text-[11px] uppercase tracking-widest text-white ${className}`}
    >
      {children}
    </th>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
