export type TabMode = "medida" | "vehiculo" | "wizard";

export interface MedidaInput {
  ancho: string;
  perfil: string;
  aro: string;
}

export interface VehiculoSeleccion {
  marca: string;
  modelo: string;
  año: string;
}

export type TipoVehiculo = "sedan" | "suv" | "pickup" | "hatchback";
export type EstiloManejo = "ciudad" | "mixto" | "carretera" | "offroad";
export type Prioridad = "precio" | "duracion" | "agarre" | "comodidad";

export interface WizardRespuestas {
  tipoVehiculo: TipoVehiculo | null;
  estiloManejo: EstiloManejo | null;
  prioridad: Prioridad | null;
}
