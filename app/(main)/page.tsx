import type { Metadata } from "next";
import { BannerReservas } from "@/components/home/BannerReservas";
import { CTAFinal } from "@/components/home/CTAFinal";
import { HeroHome } from "@/components/home/HeroHome";
import { LlantasDestacadas } from "@/components/home/LlantasDestacadas";
import { PorQueUnillantas } from "@/components/home/PorQueUnillantas";
import { ServiciosHome } from "@/components/home/ServiciosHome";
import { SucursalCercana } from "@/components/home/SucursalCercana";
import { Testimonios } from "@/components/home/Testimonios";

export const metadata: Metadata = {
  title: "Unillantas — Las mejores llantas en El Salvador",
  description:
    "Distribuidor oficial Michelin, Dunlop, Falken, Yokohama, Sumitomo y BFGoodrich. 18 sucursales, servicio profesional, reservas online en 3 minutos.",
};

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ServiciosHome />
      <BannerReservas />
      <LlantasDestacadas />
      <SucursalCercana />
      <PorQueUnillantas />
      <Testimonios />
      <CTAFinal />
    </>
  );
}
