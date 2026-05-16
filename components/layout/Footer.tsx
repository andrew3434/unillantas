export function Footer() {
  return (
    <footer className="mt-24 border-t border-surface-border/60 bg-surface-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl leading-none tracking-display">
            <span className="text-white">UNI</span>
            <span className="text-brand-red">LLANTAS</span>
          </span>
          <span className="text-xs uppercase tracking-widest text-white/40">
            Desde 1990
          </span>
        </div>

        <div className="text-xs text-white/40">
          © {new Date().getFullYear()} Importadora Unillantas, S.A. de C.V. — Todos los derechos reservados
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-60" />
    </footer>
  );
}
