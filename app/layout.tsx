import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Unillantas — 18 sucursales en El Salvador",
    template: "%s · Unillantas",
  },
  description:
    "Distribuidor oficial Michelin, Dunlop, Falken, Yokohama, Sumitomo y BFGoodrich. 18 sucursales, servicio profesional, reservas en línea.",
  metadataBase: new URL("https://unillantas.com.sv"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bebas.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-surface-dark text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
