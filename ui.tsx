import clsx from "clsx";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "primary" | "good" | "warn"; size?: "md" | "sm" }) {
  const { variant="default", size="md", className, ...rest } = props;
  const base =
    "inline-flex items-center justify-center font-bold border rounded-xl transition select-none disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "px-3 py-2 text-sm" : "px-3.5 py-2.5 text-sm";
  const styles = {
    default: "bg-white/5 hover:bg-white/10 border-line text-slate-100",
    primary: "bg-gradient-to-br from-blue-500/95 to-blue-500/70 hover:brightness-110 border-blue-400/30",
    good: "bg-emerald-400/15 hover:bg-emerald-400/20 border-emerald-300/25",
    warn: "bg-amber-300/15 hover:bg-amber-300/20 border-amber-200/25",
  }[variant];

  return <button className={clsx(base, sizes, styles, className)} {...rest} />;
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs px-2.5 py-1 rounded-full border border-line bg-white/5 text-slate-300 font-bold">
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl2 border border-line bg-white/[0.03] shadow-soft overflow-hidden", className)}>
      {children}
    </div>
  );
}
