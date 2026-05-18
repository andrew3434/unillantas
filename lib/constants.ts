export const WHATSAPP_NUMBER = "503 2225 0000";
export const WHATSAPP_URL = "https://wa.me/50322250000";
export const WHATSAPP_MAYOREO = "503 7862 8007";
export const WHATSAPP_MAYOREO_URL = "https://wa.me/50378628007";
export const EMAIL = "info@unillantas.com.sv";
export const PHONE_PRINCIPAL = "2555-4935";
export const TAGLINE = "Número uno en tu camino";
export const COMPANY_NAME = "Unillantas";
export const COMPANY_FULL = "Unillantas El Salvador";
export const COMPANY_LEGAL = "Importadora Unillantas, S.A. de C.V.";
export const ANIOS_EXPERIENCIA = 35;
export const ANIO_FUNDACION = 1990;
export const TOTAL_SUCURSALES = 18;

export const SOCIAL_FACEBOOK = "https://facebook.com/unillantassv";
export const SOCIAL_INSTAGRAM = "https://instagram.com/unillantassv";

export const MARCAS_OFICIALES = [
  "Michelin",
  "Dunlop",
  "Falken",
  "Yokohama",
  "Sumitomo",
  "BFGoodrich",
] as const;

export function whatsappUrlWithMessage(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function whatsappMayoreoUrlWithMessage(message: string): string {
  return `${WHATSAPP_MAYOREO_URL}?text=${encodeURIComponent(message)}`;
}
