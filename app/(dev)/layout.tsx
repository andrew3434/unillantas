import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
    <html lang="es" className={montserrat.variable}>
      <body className="min-h-screen bg-surface-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
