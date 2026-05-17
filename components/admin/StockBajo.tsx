"use client";

import { useMemo } from "react";
import { Disc3 } from "lucide-react";
import productosData from "@/data/productos.json";
import { SUCURSALES } from "./mockData";

type Producto = {
  id: string;
  marca: string;
  modelo: string;
  tipo: string;
  precio: number;
  stock: Record<string, number>;
  imagen?: string;
};

const PRODUCTOS = productosData as unknown as Producto[];

const SUCURSAL_NOMBRE: Record<string, string> = SUCURSALES.reduce(
  (acc, s) => {
    acc[s.id] = s.nombre;
    return acc;
  },
  {} as Record<string, string>,
);

type LowStockItem = {
  producto: Producto;
  peorSucursalId: string;
  peorQty: number;
  totalAfectadas: number;
};

function buildLowStock(): LowStockItem[] {
  const items: LowStockItem[] = [];
  for (const p of PRODUCTOS) {
    const stockEntries = Object.entries(p.stock ?? {}).filter(
      ([, qty]) => qty > 0 && qty < 3,
    );
    if (stockEntries.length === 0) continue;
    stockEntries.sort((a, b) => a[1] - b[1]);
    const [peorId, peorQty] = stockEntries[0];
    items.push({
      producto: p,
      peorSucursalId: peorId,
      peorQty,
      totalAfectadas: stockEntries.length,
    });
  }
  items.sort((a, b) => a.peorQty - b.peorQty);
  return items;
}

export function StockBajo() {
  const items = useMemo(() => buildLowStock(), []);

  const handleReorder = (modelo: string) => {
    if (typeof window !== "undefined") {
      window.alert(`Orden de reabastecimiento generada: ${modelo}`);
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display italic text-3xl leading-none tracking-tight text-white sm:text-4xl">
          <span>STOCK</span> <span className="text-brand-red">BAJO</span>
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white">
          Productos con menos de 3 unidades en alguna sucursal
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-surface-border bg-surface-card p-6 text-center font-mono text-xs uppercase tracking-widest text-white">
          Sin alertas de stock
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {items.map((item) => {
            const nombre =
              SUCURSAL_NOMBRE[item.peorSucursalId] ?? item.peorSucursalId;
            const masTexto =
              item.totalAfectadas > 1
                ? ` y ${item.totalAfectadas - 1} más`
                : "";
            return (
              <article
                key={item.producto.id}
                className="flex items-center gap-4 rounded-xl border border-surface-border bg-surface-card p-4 transition-colors hover:border-white/30 hover:shadow-lg hover:shadow-brand-red/10"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-surface-border bg-surface-elevated">
                  <Disc3 className="h-10 w-10 text-white opacity-[0.06]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white">
                    {item.producto.marca}
                  </div>
                  <div className="truncate font-display italic text-lg leading-tight text-white">
                    {item.producto.modelo}
                  </div>
                  <div className="mt-1 font-sans text-xs text-white">
                    {nombre}
                    <span className="font-mono">{masTexto}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="font-display text-3xl leading-none text-brand-red">
                    {item.peorQty}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReorder(item.producto.modelo)}
                    className="rounded-full bg-brand-red px-3 py-1.5 font-display text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand-red-dark"
                  >
                    Reordenar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
