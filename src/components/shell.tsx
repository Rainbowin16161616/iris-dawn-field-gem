import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Salidas" },
  { to: "/contabilidad", label: "Contabilidad" },
  { to: "/tarifas", label: "Tarifas" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen">
      <header className="no-print border-b border-line border-t-2 border-t-accent bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:px-6">
          <Link to="/" className="min-h-11 inline-flex items-baseline gap-3">
            <span className="font-display text-2xl leading-none tracking-tight text-ink">
              Cuadre Sol
            </span>
            <span className="hidden text-sm text-muted sm:inline">Ruta del Sol</span>
          </Link>
          <nav className="flex items-center gap-1">
            {LINKS.map((link) => {
              const active =
                link.to === "/"
                  ? pathname === "/"
                  : pathname === link.to || pathname.startsWith(`${link.to}/`);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium",
                    active ? "bg-accent-soft text-accent" : "text-muted hover:bg-background hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">{children}</main>
    </div>
  );
}
