import Link from "next/link";
import { MapPin, Phone, MessageCircle, Package, ArrowRight } from "lucide-react";

interface Sucursal {
  id: string;
  nombre: string;
  departamento: string;
  direccion: string;
  telefono: string;
}

interface ProductoStockProps {
  stock: Record<string, number>;
  sucursales: Sucursal[];
}

function badgeClass(cantidad: number): string {
  if (cantidad > 10)
    return "border-green-500/40 bg-green-500/20 text-green-400";
  if (cantidad >= 1)
    return "border-yellow-500/40 bg-yellow-500/20 text-yellow-300";
  return "border-brand-red/40 bg-brand-red/20 text-brand-red";
}

export function ProductoStock({ stock, sucursales }: ProductoStockProps) {
  const sucursalesById = new Map(sucursales.map((s) => [s.id, s]));

  const filas = Object.entries(stock)
    .filter(([, qty]) => qty > 0)
    .map(([sucursalId, cantidad]) => ({
      sucursal: sucursalesById.get(sucursalId),
      cantidad,
      sucursalId,
    }))
    .filter(
      (row): row is { sucursal: Sucursal; cantidad: number; sucursalId: string } =>
        row.sucursal !== undefined
    )
    .sort((a, b) => b.cantidad - a.cantidad);

  return (
    <section className="mt-16 sm:mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
            <span>DISPONIBILIDAD POR</span>{" "}
            <span className="text-brand-red">SUCURSAL</span>
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-base leading-relaxed text-white">
            Stock en tiempo real en cada sucursal Unillantas. Reservá sin costo
            y pasá a montarla cuando te quede cómodo.
          </p>
        </div>
        {filas.length > 0 && (
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-card px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
            <Package className="h-3.5 w-3.5 text-brand-red" aria-hidden />
            {filas.length}{" "}
            {filas.length === 1 ? "sucursal" : "sucursales"} con stock
          </span>
        )}
      </div>

      {filas.length === 0 ? (
        <div className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-brand-red/40 bg-brand-red/10 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-2xl tracking-tight text-white">
              Stock limitado
            </div>
            <p className="mt-1 font-sans text-sm text-white">
              No tenemos esta llanta en piso. Cotizá disponibilidad por
              WhatsApp y te confirmamos tiempos de pedido.
            </p>
          </div>
          <a
            href="https://wa.me/50322250000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-whatsapp bg-whatsapp/15 px-6 py-3 font-display text-base uppercase tracking-wider text-whatsapp transition-all hover:bg-whatsapp/25"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Cotizar por WhatsApp
          </a>
        </div>
      ) : (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {filas.map(({ sucursal, cantidad, sucursalId }) => (
            <li key={sucursalId}>
              <Link
                href={`/sucursales?focus=${sucursalId}`}
                className="group flex h-full items-start justify-between gap-4 rounded-xl border border-surface-border bg-surface-card p-4 transition-all duration-200 hover:-translate-y-1 hover:border-white/30"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-xl uppercase tracking-tight text-white">
                      {sucursal.nombre}
                    </span>
                    <span className="rounded-full border border-surface-border bg-surface-elevated px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-white">
                      {sucursal.departamento}
                    </span>
                  </div>
                  <div className="mt-2 flex items-start gap-1.5 font-sans text-sm text-white">
                    <MapPin
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="leading-snug">{sucursal.direccion}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-white">
                    <Phone
                      className="h-3 w-3 text-brand-red"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {sucursal.telefono}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-xs uppercase tracking-widest ${badgeClass(
                      cantidad
                    )}`}
                  >
                    {cantidad} en piso
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-white transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
