import Link from "next/link";
import { MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/reservar", label: "Reservar" },
  { href: "/sucursales", label: "Sucursales" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-surface-dark/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface-dark/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2" aria-label="Unillantas — Inicio">
          <span className="font-display text-3xl leading-none tracking-display">
            <span className="text-white">UNI</span>
            <span className="text-brand-red">LLANTAS</span>
          </span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/50322250000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp/15 px-4 py-2 text-sm font-medium text-whatsapp ring-1 ring-whatsapp/30 transition-all hover:bg-whatsapp/25"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
