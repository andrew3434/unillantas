import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Unillantas — Las mejores llantas en El Salvador",
    template: "%s · Unillantas",
  },
  description:
    "Distribuidor oficial Michelin, Dunlop, Falken, Yokohama, Sumitomo y BFGoodrich. 18 sucursales, reservá tu cita online en 3 minutos.",
  metadataBase: new URL("https://unillantas.com.sv"),
  applicationName: "Unillantas",
  keywords: [
    "llantas",
    "neumáticos",
    "El Salvador",
    "Michelin",
    "Dunlop",
    "Falken",
    "Yokohama",
    "Sumitomo",
    "BFGoodrich",
    "alineado",
    "balanceo",
    "cambio de aceite",
    "taller mecánico",
  ],
  authors: [{ name: "Unillantas" }],
  creator: "Unillantas",
  publisher: "Importadora Unillantas, S.A. de C.V.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "Unillantas — Número uno en tu camino",
    description:
      "18 sucursales en todo El Salvador. Las mejores marcas, reservá online en 3 minutos.",
    url: "https://unillantas.com.sv",
    siteName: "Unillantas",
    images: [
      {
        url: "/hero-hilux.avif",
        width: 1200,
        height: 630,
        alt: "Unillantas — Toyota Hilux en acción",
      },
    ],
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unillantas — Número uno en tu camino",
    description: "Las mejores llantas en El Salvador. 18 sucursales.",
    images: ["/hero-hilux.avif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen bg-surface-dark text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
