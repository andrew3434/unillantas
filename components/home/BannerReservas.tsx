import Link from "next/link";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { MotionInView } from "./MotionInView";

const beneficios = [
  "Sin colas, sin esperas en sucursal",
  "Confirmación inmediata por WhatsApp",
  "Reprogramá o cancelá con un click",
];

const fakeBookings = [
  { hora: "08:30", servicio: "Cambio de aceite" },
  { hora: "10:00", servicio: "Alineado y balanceo" },
  { hora: "14:00", servicio: "Cambio de llantas" },
];

export function BannerReservas() {
  return (
    <section className="relative overflow-hidden bg-brand-red">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 32px, white 32px, white 33px)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <MotionInView>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Reservas online
          </span>

          <h2 className="mt-5 font-display italic leading-[0.9] tracking-tight text-white">
            <span className="block text-5xl sm:text-6xl">
              RESERVÁ TU CITA EN
            </span>
            <span className="mt-2 inline-block bg-surface-dark px-4 py-1 text-6xl text-white sm:text-7xl">
              3 MINUTOS
            </span>
          </h2>

          <ul className="mt-8 space-y-3">
            {beneficios.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 font-sans text-base text-white sm:text-lg"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white">
                  <Check
                    className="h-3.5 w-3.5 text-brand-red"
                    strokeWidth={3}
                    aria-hidden
                  />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/reservar"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-display text-lg uppercase tracking-wider text-brand-red shadow-2xl shadow-black/20 transition-all hover:bg-white/90 active:scale-[0.98]"
          >
            Agendar ahora
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </MotionInView>

        <MotionInView delay={0.15} className="relative flex justify-center">
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/20 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                Agenda de hoy
              </span>
              <Calendar className="h-6 w-6 text-white" aria-hidden />
            </div>

            <ul className="mt-6 space-y-4">
              {fakeBookings.map((b) => (
                <li
                  key={b.hora}
                  className="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    <Check
                      className="h-5 w-5 text-brand-red"
                      strokeWidth={3}
                      aria-hidden
                    />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <span className="font-mono text-sm text-white">
                      {b.hora}
                    </span>
                    <span className="font-display text-lg leading-tight tracking-tight text-white">
                      {b.servicio.toUpperCase()}
                    </span>
                  </div>
                  <span className="rounded-full bg-surface-dark px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                    Confirmada
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-white/20 pt-4 text-center font-mono text-xs uppercase tracking-widest text-white">
              + 312 reservas esta semana
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
