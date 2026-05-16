import type { Metadata } from "next";
import { Inter, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "../globals.css";

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
  title: "Dev · Unillantas",
  description: "Componentes en desarrollo aislado — sin Header ni Footer global.",
  robots: { index: false, follow: false },
};

export default function DevRootLayout({
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
        {children}
      </body>
    </html>
  );
}
