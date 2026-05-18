import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

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
        <Link
          href="/"
          className="group flex items-center"
          aria-label="Unillantas — Inicio"
        >
          <Image
            src="/logo-unillantas.png"
            alt="Unillantas"
            width={180}
            height={40}
            priority
            className="h-8 w-auto brightness-0 invert sm:h-10"
          />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:text-brand-red"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={WHATSAPP_URL}
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
