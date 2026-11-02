import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { Badge, Button, Input, Panel } from "@/components/ui";
import {
  analyze,
  formatCents,
  formatDate,
  issueLabel,
  STATUS_LABEL,
  todayISO,
  type Status,
} from "@/lib/ruta/domain";
import { useRuta, useRutaReady } from "@/lib/ruta/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const ready = useRutaReady();
  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Cargando salidas…</p>
      </Shell>
    );
  }
  return <Dashboard />;
}

const FILTERS: { id: "todas" | Status; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "observado", label: "Con diferencia" },
  { id: "en_ruta", label: "En ruta" },
  { id: "borrador", label: "Borrador" },
  { id: "rendido", label: "Cuadradas" },
];

function toneFor(status: Status) {
  if (status === "rendido") return "ok" as const;
  if (status === "observado") return "danger" as const;
  if (status === "en_ruta") return "warn" as const;
  return "neutral" as const;
}

function Dashboard() {
  const navigate = useNavigate();
  const departures = useRuta((state) => state.departures);
  const rates = useRuta((state) => state.rates);
  const createDeparture = useRuta((state) => state.createDeparture);
  const removeExamples = useRuta((state) => state.removeExamples);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("todas");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      departures
        .map((departure) => ({
          departure,
          analysis: analyze(departure, rates, departures),
        }))
        .sort((a, b) => {
          const rank = { observado: 0, en_ruta: 1, borrador: 2, rendido: 3 };
          const byStatus = rank[a.analysis.status] - rank[b.analysis.status];
          if (byStatus !== 0) return byStatus;
          return a.departure.date < b.departure.date ? 1 : -1;
        }),
    [departures, rates],
  );

  const month = todayISO().slice(0, 7);
  const enRuta = rows.filter((row) => row.analysis.status === "en_ruta");
  const observados = rows.filter((row) => row.analysis.status === "observado");
  const efectivoEnRuta = enRuta.reduce(
    (sum, row) => sum + Math.round((row.departure.cashGiven ?? 0) * 100),
    0,
  );
  const cuadradosMes = rows.filter(
    (row) =>
      row.analysis.status === "rendido" && row.departure.date.startsWith(month),
  ).length;
  const hasExamples = departures.some((departure) => departure.id.startsWith("ej-"));

  const visible = rows.filter((row) => {
    if (filter !== "todas" && row.analysis.status !== filter) return false;
    const haystack = `${row.departure.guide} ${row.departure.serie} ${row.departure.unit}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl tracking-tight text-ink">Salidas del día</h1>
          <p className="mt-2 text-muted">
            El presupuesto del guía sale de las entradas incluidas. Al volver, los tickets
            numerados tienen que coincidir en cantidad y el efectivo, con el vuelto, en monto.
            La serie del ingreso es el sustento para contabilidad.
          </p>
        </div>
        <Button
          onClick={() => {
            const id = createDeparture();
            void navigate({ to: "/salida/$id", params: { id } });
          }}
        >
          Nueva salida
        </Button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Con diferencia" value={String(observados.length)} hint="Revisar antes de pasar a contabilidad" />
        <Metric label="En ruta" value={String(enRuta.length)} hint="Efectivo ya entregado, sin rendir" />
        <Metric label="Efectivo en ruta" value={formatCents(efectivoEnRuta)} hint="Suma en manos de los guías" />
        <Metric label="Cuadradas del mes" value={String(cuadradosMes)} hint="Listas para el registro contable" />
      </div>

      <Panel>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={
                  filter === item.id
                    ? "h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-fg"
                    : "h-11 rounded-md border border-line px-3 text-sm font-medium text-muted"
                }
              >
                {item.label}
              </button>
            ))}
          </div>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar guía, serie o unidad"
            className="md:max-w-72"
            aria-label="Buscar salidas"
          />
        </div>

        {visible.length === 0 ? (
          <p className="py-8 text-center text-muted">No hay salidas con ese filtro.</p>
        ) : (
          <ul className="divide-y divide-line">
            {visible.map(({ departure, analysis }) => (
              <li key={departure.id}>
                <Link
                  to="/salida/$id"
                  params={{ id: departure.id }}
                  className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-ink">
                        {departure.guide.trim() || "Sin guía"}
                      </span>
                      <Badge tone={toneFor(analysis.status)}>
                        {STATUS_LABEL[analysis.status]}
                      </Badge>
                      {departure.id.startsWith("ej-") ? <Badge>Ejemplo</Badge> : null}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {formatDate(departure.date)}
                      {departure.unit ? ` · ${departure.unit}` : ""} · Serie {analysis.numerosLabel}
                    </p>
                    <p className="mt-1 text-sm text-ink">{issueLabel(analysis)}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="tabular-nums text-lg font-medium text-ink">
                      {formatCents(analysis.budgetCents)}
                    </p>
                    <p className="text-sm text-muted">
                      {departure.passengers.length} pasajeros ·{" "}
                      {analysis.sites
                        .filter((site) => site.expected > 0 || site.tickets > 0)
                        .map((site) => {
                          const name =
                            site.siteId === "andahuaylillas"
                              ? "Capilla"
                              : site.siteId === "pucara"
                                ? "Pucará"
                                : site.siteId === "toritos"
                                  ? "Toritos"
                                  : "Raqchi";
                          return `${name} ${site.tickets}/${site.expected}`;
                        })
                        .join(" · ")}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {hasExamples ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Hay tres salidas de ejemplo para ver un cuadre limpio, una en ruta y una con tickets faltantes.
          </p>
          <Button variant="ghost" onClick={removeExamples}>
            Quitar ejemplos
          </Button>
        </div>
      ) : null}
    </Shell>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Panel className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums tracking-tight text-ink">{value}</p>
      <p className="mt-1 text-xs text-faint">{hint}</p>
    </Panel>
  );
}
