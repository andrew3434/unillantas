import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import {
  COMPANY_LEGAL,
  EMAIL,
  PHONE_PRINCIPAL,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
  TAGLINE,
  WHATSAPP_MAYOREO,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from "@/lib/constants";

const llantasLinks = [
  { href: "/catalogo", label: "Catálogo completo" },
  { href: "/catalogo?marca=Michelin", label: "Por marca" },
  { href: "/catalogo", label: "Por medida" },
  { href: "/catalogo", label: "Por vehículo" },
];

const serviciosLinks = [
  { href: "/reservar?servicio=llantas", label: "Venta y montaje" },
  { href: "/reservar?servicio=alineado", label: "Alineado y balanceo" },
  { href: "/reservar?servicio=aceite", label: "Cambio de aceite" },
  { href: "/reservar", label: "Reservar cita" },
  { href: "/sucursales", label: "Ver sucursales" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-surface-border bg-surface-dark">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block"
              aria-label="Unillantas — Inicio"
            >
              <Image
                src="/logo-unillantas.png"
                alt="Unillantas"
                width={160}
                height={36}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>

            <p className="mt-5 font-display italic text-2xl leading-tight tracking-tight text-white">
              {TAGLINE.toUpperCase()}
            </p>

            <p className="mt-4 font-sans text-sm leading-relaxed text-white">
              Distribuidor oficial Michelin, Dunlop, Falken, Yokohama, Sumitomo
              y BFGoodrich.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface-card text-white transition-all hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-border bg-surface-card text-white transition-all hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Llantas
            </h3>
            <ul className="mt-5 space-y-3">
              {llantasLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Servicios
            </h3>
            <ul className="mt-5 space-y-3">
              {serviciosLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-red">
              Contacto
            </h3>
            <ul className="mt-5 space-y-3 font-sans text-sm">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-white transition-colors hover:text-whatsapp"
                >
                  <MessageCircle
                    className="h-4 w-4 text-whatsapp"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <span className="font-mono">{WHATSAPP_NUMBER}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="font-mono">{PHONE_PRINCIPAL}</span>
              </li>
              <li className="flex items-start gap-2 text-white">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-colors hover:text-brand-red"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <Link
                  href="/sucursales"
                  className="group inline-flex items-center gap-2 font-display text-sm uppercase tracking-wider text-white transition-colors hover:text-brand-red"
                >
                  <MapPin className="h-4 w-4 text-brand-red" strokeWidth={1.75} aria-hidden />
                  Ver todas las sucursales →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-3 border-t border-surface-border pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-white">
            © {year} {COMPANY_LEGAL} · Todos los derechos reservados.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white">
            <span className="text-brand-red">Unillantas Mayoreo</span> · Llantas
            para flotas · {WHATSAPP_MAYOREO}
          </p>
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-80" />
    </footer>
  );
}
