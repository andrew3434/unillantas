import { create } from "zustand";

export type PasoReserva = 1 | 2 | 3 | 4 | "completado";

export interface DatosReserva {
  nombre: string;
  telefono: string;
  email: string;
  placa: string;
  notas: string;
}

interface ReservaState {
  paso: PasoReserva;
  servicioId: string | null;
  sucursalId: string | null;
  fecha: string | null; // ISO date YYYY-MM-DD
  hora: string | null; // "HH:mm"
  productoId: string | null; // del ?producto=X
  datos: DatosReserva;
  codigoReserva: string | null;
  setPaso: (p: PasoReserva) => void;
  setServicio: (id: string) => void;
  setSucursal: (id: string) => void;
  setFechaHora: (fecha: string, hora: string) => void;
  setProducto: (id: string | null) => void;
  setDatos: (d: Partial<DatosReserva>) => void;
  confirmarReserva: () => void;
  reset: () => void;
}

const datosVacios: DatosReserva = {
  nombre: "",
  telefono: "",
  email: "",
  placa: "",
  notas: "",
};

export const useReservaStore = create<ReservaState>((set) => ({
  paso: 1,
  servicioId: null,
  sucursalId: null,
  fecha: null,
  hora: null,
  productoId: null,
  datos: datosVacios,
  codigoReserva: null,
  setPaso: (p) => set({ paso: p }),
  setServicio: (id) => set({ servicioId: id }),
  setSucursal: (id) => set({ sucursalId: id }),
  setFechaHora: (fecha, hora) => set({ fecha, hora }),
  setProducto: (id) => set({ productoId: id }),
  setDatos: (d) => set((s) => ({ datos: { ...s.datos, ...d } })),
  confirmarReserva: () =>
    set({
      codigoReserva: `UNI-${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`,
      paso: "completado",
    }),
  reset: () =>
    set({
      paso: 1,
      servicioId: null,
      sucursalId: null,
      fecha: null,
      hora: null,
      productoId: null,
      datos: { ...datosVacios },
      codigoReserva: null,
    }),
}));
