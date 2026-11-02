import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { Badge, Button, Field, Input, Panel, Select } from "@/components/ui";
import {
  analyze,
  detailCsv,
  downloadText,
  formatCents,
  formatDate,
  STATUS_LABEL,
  summaryCsv,
  todayISO,
  type Status,
} from "@/lib/ruta/domain";
import { useRuta, useRutaReady } from "@/lib/ruta/store";

export const Route = createFileRoute("/contabilidad")({ component: ContabilidadPage });

function ContabilidadPage() {
  const ready = useRutaReady();
  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Cargando registro…</p>
      </Shell>
    );
  }
  return <Contabilidad />;
}

function monthStart(): string {
  const today = todayISO();
  return `${today.slice(0, 8)}01`;
}

function toneFor(status: Status) {
  if (status === "rendido") return "ok" as const;
  if (status === "observado") return "danger" as const;
  if (status === "en_ruta") return "warn" as const;
  return "neutral" as const;
}

function Contabilidad() {
  const departures = useRuta((state) => state.departures);
  const rates = useRuta((state) => state.rates);
  const [from, setFrom] = useState(monthStart);
  const [to, setTo] = useState(todayISO);
  const [guide, setGuide] = useState("todos");
  const [onlyIssues, setOnlyIssues] = useState(false);

  const guides = useMemo(
    () => [...new Set(departures.map((d) => d.guide.trim()).filter(Boolean))].sort(),
    [departures],
  );

  const rows = useMemo(() => {
    return departures
      .filter((departure) => departure.date >= from && departure.date <= to)
      .filter((departure) => guide === "todos" || departure.guide.trim() === guide)
      .map((departure) => ({
        departure,
        analysis: analyze(departure, rates, departures),
      }))
      .filter((row) => (onlyIssues ? row.analysis.status === "observado" : row.analysis.status !== "borrador"))
      .sort((a, b) => (a.departure.date < b.departure.date ? 1 : -1));
  }, [departures, rates, from, to, guide, onlyIssues]);

  const presupuesto = rows.reduce((sum, row) => sum + row.analysis.budgetCents, 0);
  const entregado = rows.reduce(
    (sum, row) => sum + Math.round((row.departure.cashGiven ?? 0) * 100),
    0,
  );
  const diferencia = rows.reduce((sum, row) => sum + (row.analysis.moneyGapCents ?? 0), 0);
  const abiertas = rows.filter((row) => row.analysis.status === "observado").length;

  const bySerie = useMemo(() => {
    const map = new Map<
      string,
      { serie: string; presupuesto: number; entregado: number; salidas: number; diferencias: number }
    >();
    for (const row of rows) {
      const key = row.departure.serie.trim() || "Sin serie";
      const current = map.get(key) ?? {
        serie: key,
        presupuesto: 0,
        entregado: 0,
        salidas: 0,
        diferencias: 0,
      };
      current.presupuesto += row.analysis.budgetCents;
      current.entregado += Math.round((row.departure.cashGiven ?? 0) * 100);
      current.salidas += 1;
      if (row.analysis.status === "observado") current.diferencias += 1;
      map.set(key, current);
    }
    return [...map.values()];
  }, [rows]);

  function exportSummary() {
    downloadText(
      `contabilidad-ruta-sol-${from}-a-${to}.csv`,
      summaryCsv(rows),
    );
  }

  function exportDetail() {
    downloadText(
      `detalle-ingresos-ruta-sol-${from}-a-${to}.csv`,
      detailCsv(rows.map((row) => ({ departure: row.departure, rates }))),
    );
  }

  return (
    <Shell>
      <div className="mb-6 max-w-2xl">
        <h1 className="font-display text-4xl tracking-tight">Registro para contabilidad</h1>
        <p className="mt-2 text-muted">
          Cada salida queda amarrada a la serie del ingreso. El detalle trae pasajero,
          número de comprobante y la tarifa de cada entrada incluida, para sustentar el
          efectivo que salió de caja.
        </p>
      </div>

      <Panel className="mb-4">
        <div className="grid gap-3 md:grid-cols-4">
          <Field label="Desde">
            <Input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
          </Field>
          <Field label="Hasta">
            <Input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
          </Field>
          <Field label="Guía">
            <Select value={guide} onChange={(event) => setGuide(event.target.value)}>
              <option value="todos">Todos</option>
              {guides.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </Field>
          <label className="flex h-11 items-center gap-2 self-end text-sm text-ink">
            <input
              type="checkbox"
              className="size-4 accent-accent"
              checked={onlyIssues}
              onChange={(event) => setOnlyIssues(event.target.checked)}
            />
            Solo con diferencia
          </label>
        </div>
      </Panel>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Mini label="Presupuesto de entradas" value={formatCents(presupuesto)} />
        <Mini label="Efectivo entregado" value={formatCents(entregado)} />
        <Mini label="Diferencia de caja" value={formatCents(diferencia)} />
        <Mini label="Salidas observadas" value={String(abiertas)} />
      </div>

      <Panel className="mb-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Por serie de ingreso</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportSummary} disabled={rows.length === 0}>
              Exportar resumen
            </Button>
            <Button onClick={exportDetail} disabled={rows.length === 0}>
              Exportar detalle
            </Button>
          </div>
        </div>
        {bySerie.length === 0 ? (
          <p className="text-muted">No hay salidas en este rango.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-2 pr-3 font-medium">Serie</th>
                  <th className="py-2 pr-3 font-medium">Salidas</th>
                  <th className="py-2 pr-3 font-medium">Presupuesto</th>
                  <th className="py-2 pr-3 font-medium">Efectivo</th>
                  <th className="py-2 font-medium">Con diferencia</th>
                </tr>
              </thead>
              <tbody>
                {bySerie.map((row) => (
                  <tr key={row.serie} className="border-b border-line last:border-0">
                    <td className="py-3 pr-3 font-medium">{row.serie}</td>
                    <td className="py-3 pr-3 tabular-nums">{row.salidas}</td>
                    <td className="py-3 pr-3 tabular-nums">{formatCents(row.presupuesto)}</td>
                    <td className="py-3 pr-3 tabular-nums">{formatCents(row.entregado)}</td>
                    <td className="py-3 tabular-nums">{row.diferencias}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Panel>
        <h2 className="mb-3 font-display text-2xl">Salidas</h2>
        {rows.length === 0 ? (
          <p className="text-muted">Nada para elevar a contabilidad con estos filtros.</p>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map(({ departure, analysis }) => (
              <li key={departure.id} className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/salida/$id"
                      params={{ id: departure.id }}
                      className="font-medium text-ink underline-offset-2 hover:underline"
                    >
                      {formatDate(departure.date)} · {departure.guide || "Sin guía"}
                    </Link>
                    <Badge tone={toneFor(analysis.status)}>{STATUS_LABEL[analysis.status]}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    Ingreso {analysis.numerosLabel}
                    {departure.settlementNote ? ` · ${departure.settlementNote}` : ""}
                  </p>
                </div>
                <p className="tabular-nums text-sm text-ink">
                  Presupuesto {formatCents(analysis.budgetCents)}
                  {" · "}
                  Entregado{" "}
                  {departure.cashGiven == null ? "—" : formatCents(Math.round(departure.cashGiven * 100))}
                  {" · "}
                  Dif. {analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </Shell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <Panel className="p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-medium tabular-nums text-ink">{value}</p>
    </Panel>
  );
}
