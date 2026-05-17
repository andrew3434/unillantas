export interface Producto {
  id: string;
  marca: string;
  modelo: string;
  tipo: string;
  uso: string;
  descripcion: string;
  precio: number;
  medidasDisponibles: string[];
  specs: {
    duracion: string;
    garantia: string;
    indiceVelocidad: string;
    indiceCarga: string;
  };
  destacada: boolean;
  stock: Record<string, number>;
  imagen: string;
}

export type CategoriaTipo = "Automóvil" | "SUV / Camioneta" | "Comercial" | "Moto";

export const CATEGORIAS_TIPO: CategoriaTipo[] = [
  "Automóvil",
  "SUV / Camioneta",
  "Comercial",
  "Moto",
];

export const MARCAS = [
  "Michelin",
  "Falken",
  "Dunlop",
  "Sumitomo",
  "Yokohama",
  "BFGoodrich",
] as const;

export type Marca = (typeof MARCAS)[number];

export const MEDIDA_RANGOS = {
  ancho: { min: 145, max: 355 },
  perfil: { min: 25, max: 85 },
  aro: { min: 13, max: 22 },
} as const;

export const PRECIO_DEFAULT = { min: 0, max: 350 } as const;

export interface FilterState {
  marcas: Set<string>;
  tipos: Set<CategoriaTipo>;
  ancho: string;
  perfil: string;
  aro: string;
  precioMin: string;
  precioMax: string;
}

export function matchCategoria(tipo: string, categoria: CategoriaTipo): boolean {
  if (categoria === "Automóvil") return tipo.includes("Automóvil");
  if (categoria === "SUV / Camioneta")
    return tipo.includes("Camioneta") || tipo.includes("Pick Up");
  if (categoria === "Comercial") return tipo === "Vehículos Comerciales";
  if (categoria === "Moto") return tipo === "Moto altas prestaciones";
  return false;
}
