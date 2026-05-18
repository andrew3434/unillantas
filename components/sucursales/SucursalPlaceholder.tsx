interface SucursalPlaceholderProps {
  nombre: string;
  departamento: string;
  variant?: "card" | "tall";
  className?: string;
}

export function SucursalPlaceholder({
  nombre,
  departamento,
  variant = "card",
  className = "",
}: SucursalPlaceholderProps) {
  const inicial = nombre.charAt(0).toUpperCase();
  const aspect = variant === "tall" ? "aspect-[3/4]" : "aspect-[16/10]";

  return (
    <div
      className={`relative ${aspect} overflow-hidden bg-gradient-to-br from-surface-card via-surface-elevated to-surface-card ${className}`}
      role="img"
      aria-label={`Sucursal ${nombre}, ${departamento}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-6 -top-12 h-[200%] w-14 rotate-12 bg-brand-red opacity-25" />
        <div className="absolute -right-20 -top-12 h-[200%] w-8 rotate-12 bg-brand-red opacity-15" />
        <div className="absolute -right-32 -top-12 h-[200%] w-5 rotate-12 bg-brand-red opacity-10" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-10"
      >
        <span
          className="font-display italic text-[10rem] leading-none tracking-tight text-brand-red sm:text-[12rem]"
          style={{ opacity: 0.32 }}
        >
          {inicial}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="font-display text-lg leading-tight tracking-tight text-white">
          {nombre.toUpperCase()}
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white">
          {departamento}
        </div>
      </div>
    </div>
  );
}
