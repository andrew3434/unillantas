// Mock data helpers for the admin dashboard.
// Everything here is deterministic — same input always produces the same output
// so React rerenders don't shuffle the demo.

import sucursalesData from "@/data/sucursales.json";
import serviciosData from "@/data/servicios.json";

export type Sucursal = {
  id: string;
  nombre: string;
  departamento: string;
};

export type Servicio = {
  id: string;
  nombre: string;
  duracion: string;
};

export const SUCURSALES = sucursalesData as unknown as Sucursal[];
export const SERVICIOS = serviciosData as unknown as Servicio[];

export const NOMBRES = [
  "Carlos Méndez",
  "María Hernández",
  "Roberto Castillo",
  "Ana López",
  "José Ramírez",
  "Laura Martínez",
  "Diego Flores",
  "Patricia Cruz",
  "Luis Vargas",
  "Sofía Reyes",
  "Andrés Rivera",
  "Camila Aguilar",
  "Jorge Torres",
  "Valeria Gómez",
  "Manuel Ortiz",
  "Daniela Soto",
  "Ricardo Peña",
  "Gabriela Mejía",
  "Fernando Alvarado",
  "Marcela Romero",
];

export const PLACAS = [
  "P-123-456",
  "P-789-012",
  "P-345-678",
  "P-901-234",
  "P-567-890",
  "P-111-222",
  "P-333-444",
  "P-555-666",
  "P-777-888",
  "P-246-810",
  "P-135-792",
  "P-468-024",
  "P-579-135",
  "P-680-246",
  "P-791-357",
  "P-802-468",
];

export type EstadoCita = "Confirmada" | "Pendiente" | "Cancelada";

export type Cita = {
  fecha: string; // dd/MM HH:mm pre-formatted for table
  fechaSort: number; // ms timestamp for ordering
  cliente: string;
  vehiculo: string;
  servicio: string;
  sucursalNombre: string;
  estado: EstadoCita;
};

export type Reserva = {
  hora: string;
  servicioId: string;
  servicioNombre: string;
  cliente: string;
  iniciales: string;
};

// Tiny deterministic PRNG so we get pseudo-random but stable mock data.
export function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getNombre(seed: number): string {
  return NOMBRES[seed % NOMBRES.length];
}

export function getPlaca(seed: number): string {
  return PLACAS[seed % PLACAS.length];
}

export function getIniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + ".")
    .join("");
}

// KPI scaling per sucursal. "all" returns aggregate.
export type KpiSet = {
  reservasHoy: number;
  reservasHoyDelta: number; // % vs ayer
  reservasSemana: number;
  reservasSemanaDelta: number; // % vs sem anterior
  conversion: number; // %
  conversionDelta: number; // %
  servicioTop: string;
  servicioTopPct: number;
};

const SERVICIO_TOP_POOL = [
  "Cambio de Llantas",
  "Alineado y Balanceo",
  "Cambio de Aceite",
  "Frenos",
];

export function getKpis(sucursalId: string): KpiSet {
  if (sucursalId === "all") {
    return {
      reservasHoy: 47,
      reservasHoyDelta: 12,
      reservasSemana: 312,
      reservasSemanaDelta: 8,
      conversion: 68,
      conversionDelta: -3,
      servicioTop: "Cambio de Llantas",
      servicioTopPct: 42,
    };
  }
  const seed = hashString(sucursalId);
  const rnd = mulberry32(seed);
  const hoy = Math.max(1, Math.round(47 / 18 + rnd() * 4 - 2));
  const sem = Math.max(5, Math.round(312 / 18 + rnd() * 20 - 10));
  const hoyDelta = Math.round(rnd() * 30 - 10);
  const semDelta = Math.round(rnd() * 25 - 8);
  const conversion = 55 + Math.round(rnd() * 25);
  const conversionDelta = Math.round(rnd() * 20 - 10);
  const topIdx = Math.floor(rnd() * SERVICIO_TOP_POOL.length);
  const topPct = 30 + Math.round(rnd() * 25);
  return {
    reservasHoy: hoy,
    reservasHoyDelta: hoyDelta,
    reservasSemana: sem,
    reservasSemanaDelta: semDelta,
    conversion,
    conversionDelta,
    servicioTop: SERVICIO_TOP_POOL[topIdx],
    servicioTopPct: topPct,
  };
}

export function servicioBorderClass(servicioId: string): string {
  switch (servicioId) {
    case "llantas":
      return "border-brand-red";
    case "alineado":
      return "border-blue-500";
    case "aceite":
      return "border-amber-500";
    case "ac":
      return "border-cyan-400";
    case "motor":
      return "border-purple-500";
    case "frenos":
      return "border-orange-500";
    case "suspension":
      return "border-pink-500";
    default:
      return "border-surface-border";
  }
}

export function buildWeekReservas(sucursalId: string): Reserva[][] {
  const base = hashString(sucursalId === "all" ? "global" : sucursalId);
  const week: Reserva[][] = [];
  for (let day = 0; day < 7; day++) {
    const rnd = mulberry32(base + day * 1009);
    const min = day >= 5 ? 2 : 3;
    const max = day >= 5 ? 6 : 8;
    const count = min + Math.floor(rnd() * (max - min + 1));
    const dayReservas: Reserva[] = [];
    const usedSlots = new Set<number>();
    for (let slotIdx = 0; slotIdx < count; slotIdx++) {
      let slot = Math.floor(rnd() * 18);
      let attempts = 0;
      while (usedSlots.has(slot) && attempts < 18) {
        slot = (slot + 1) % 18;
        attempts++;
      }
      usedSlots.add(slot);
      const hour = 8 + Math.floor(slot / 2);
      const minute = slot % 2 === 0 ? "00" : "30";
      const servicio = SERVICIOS[(day * 7 + slotIdx) % SERVICIOS.length];
      const clienteSeed = base + day * 31 + slotIdx * 7;
      const cliente = getNombre(clienteSeed);
      dayReservas.push({
        hora: `${String(hour).padStart(2, "0")}:${minute}`,
        servicioId: servicio.id,
        servicioNombre: servicio.nombre,
        cliente,
        iniciales: getIniciales(cliente),
      });
    }
    dayReservas.sort((a, b) => a.hora.localeCompare(b.hora));
    week.push(dayReservas);
  }
  return week;
}

export function buildCitasPendientes(sucursalId: string): Cita[] {
  const base = hashString(
    sucursalId === "all" ? "citas-global" : `citas-${sucursalId}`,
  );
  const rnd = mulberry32(base);
  const estados: EstadoCita[] = ["Confirmada", "Pendiente", "Cancelada"];
  const citas: Cita[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(8, 0, 0, 0);

  const candidateSucursales =
    sucursalId === "all"
      ? SUCURSALES
      : SUCURSALES.filter((s) => s.id === sucursalId);
  const sucursalPool =
    candidateSucursales.length > 0 ? candidateSucursales : SUCURSALES;

  let cursor = start.getTime();
  for (let i = 0; i < 10; i++) {
    const stepHours = 1 + Math.floor(rnd() * 6);
    cursor += stepHours * 60 * 60 * 1000;
    const d = new Date(cursor);
    if (d.getHours() < 8) {
      d.setHours(8, 0, 0, 0);
      cursor = d.getTime();
    } else if (d.getHours() >= 17) {
      d.setDate(d.getDate() + 1);
      d.setHours(8 + Math.floor(rnd() * 2), 0, 0, 0);
      cursor = d.getTime();
    }
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const clienteSeed = base + i * 17;
    const cliente = getNombre(clienteSeed);
    const vehiculo = getPlaca(clienteSeed + 3);
    const servicio = SERVICIOS[(base + i) % SERVICIOS.length];
    const sucursal = sucursalPool[(base + i * 3) % sucursalPool.length];
    const estado = estados[Math.floor(rnd() * estados.length)];
    citas.push({
      fecha: `${dd}/${mm} ${hh}:${mi}`,
      fechaSort: cursor,
      cliente,
      vehiculo,
      servicio: servicio.nombre,
      sucursalNombre: sucursal.nombre,
      estado,
    });
  }
  citas.sort((a, b) => a.fechaSort - b.fechaSort);
  return citas;
}
