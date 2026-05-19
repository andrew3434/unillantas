"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";

const navLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/reservar", label: "Reservar" },
  { href: "/sucursales", label: "Sucursales" },
  { href: "/admin", label: "Admin" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface-card text-white transition-colors hover:border-brand-red md:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              tabIndex={-1}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 cursor-default bg-surface-dark/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-surface-border bg-surface-dark shadow-2xl shadow-black/60 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex h-16 items-center justify-between border-b border-surface-border px-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                  Menú
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-white transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <nav className="flex flex-col gap-3 px-6 py-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl border border-surface-border bg-surface-card px-5 py-4 font-display text-2xl leading-none uppercase tracking-tight text-white transition-all hover:border-brand-red hover:bg-brand-red/10 hover:text-brand-red"
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden
                        className="font-mono text-xs uppercase tracking-widest text-brand-red opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto border-t border-surface-border p-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-display text-base uppercase tracking-wider text-white shadow-lg shadow-black/30 transition-all hover:bg-whatsapp/90 active:scale-[0.98]"
                >
                  <MessageCircle
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  Cotizar por WhatsApp
                </a>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-white">
                  Lun-Vie 8a–5p · Sáb 8a–2p
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
