import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { Badge, Button, Field, Input, Panel, Select, TextArea } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  analyze,
  billSuggestion,
  CATEGORIES,
  categoryBreakdown,
  detailCsv,
  downloadText,
  formatCents,
  formatDate,
  formatSoles,
  issueLabel,
  moneyGapText,
  passengerCents,
  PRESETS,
  SITES,
  slug,
  STATUS_LABEL,
  summaryCsv,
  type CategoryId,
  type Departure,
  type DepartureAnalysis,
  type Status,
} from "@/lib/ruta/domain";
import { useRuta, useRutaReady } from "@/lib/ruta/store";

export const Route = createFileRoute("/salida/$id")({ component: SalidaPage });

const STEPS = ["Pasajeros", "Efectivo", "Tickets", "Liquidación"] as const;

function SalidaPage() {
  const ready = useRutaReady();
  const { id } = Route.useParams();
  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Cargando la salida…</p>
      </Shell>
    );
  }
  return <Salida id={id} />;
}

function toneFor(status: Status) {
  if (status === "rendido") return "ok" as const;
  if (status === "observado") return "danger" as const;
  if (status === "en_ruta") return "warn" as const;
  return "neutral" as const;
}

function Salida({ id }: { id: string }) {
  const navigate = useNavigate();
  const departure = useRuta((state) => state.departures.find((item) => item.id === id));
  const departures = useRuta((state) => state.departures);
  const rates = useRuta((state) => state.rates);
  const updateDeparture = useRuta((state) => state.updateDeparture);
  const removeDeparture = useRuta((state) => state.removeDeparture);
  const [step, setStep] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!departure) {
    return (
      <Shell>
        <Panel>
          <h1 className="font-display text-3xl">Esta salida no está</h1>
          <p className="mt-2 text-muted">Puede haberse eliminado en este navegador.</p>
          <Link to="/" className="mt-4 inline-flex h-11 items-center text-sm font-medium text-accent">
            Volver a salidas
          </Link>
        </Panel>
      </Shell>
    );
  }

  const analysis = analyze(departure, rates, departures);
  const guides = [...new Set(departures.map((item) => item.guide.trim()).filter(Boolean))];

  return (
    <Shell>
      <div className="no-print mb-4">
        <Link to="/" className="text-sm text-muted hover:text-ink">
          Salidas
        </Link>
      </div>

      <div className="no-print mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-4xl tracking-tight">
              {departure.guide.trim() || "Nueva salida"}
            </h1>
            <Badge tone={toneFor(analysis.status)}>{STATUS_LABEL[analysis.status]}</Badge>
          </div>
          <p className="mt-1 text-muted">{issueLabel(analysis)}</p>
        </div>
        {confirmDelete ? (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
              Cancelar
            </Button>
            <Button
            variant="danger"
            onClick={() => {
              removeDeparture(departure.id);
              void navigate({ to: "/" });
            }}
          >
            Confirmar
          </Button>
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setConfirmDelete(true)}>
            Eliminar salida
          </Button>
        )}
      </div>

      <Panel className="no-print mb-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Fecha">
            <Input
              type="date"
              value={departure.date}
              onChange={(event) => updateDeparture(departure.id, { date: event.target.value })}
            />
          </Field>
          <Field label="Guía">
            <Input
              list="guias-conocidos"
              value={departure.guide}
              onChange={(event) => updateDeparture(departure.id, { guide: event.target.value })}
              placeholder="Nombre del guía"
            />
            <datalist id="guias-conocidos">
              {guides.map((guide) => (
                <option key={guide} value={guide} />
              ))}
            </datalist>
          </Field>
          <Field label="Unidad">
            <Input
              value={departure.unit}
              onChange={(event) => updateDeparture(departure.id, { unit: event.target.value })}
              placeholder="Vehículo o grupo"
            />
          </Field>
          <Field label="Responsable de caja">
            <Input
              value={departure.caja}
              onChange={(event) => updateDeparture(departure.id, { caja: event.target.value })}
              placeholder="Quién entrega el efectivo"
            />
          </Field>
          <Field label="Serie de ingreso" hint="La serie del comprobante con el que entró el dinero.">
            <Input
              value={departure.serie}
              onChange={(event) =>
                updateDeparture(departure.id, { serie: event.target.value.toUpperCase() })
              }
              placeholder="B001"
            />
          </Field>
          <Field label="Cómo se facturó">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                aria-pressed={departure.modo === "pasajero"}
                onClick={() => updateDeparture(departure.id, { modo: "pasajero" })}
                className={cn(
                  "h-11 rounded-md text-sm font-medium",
                  departure.modo === "pasajero"
                    ? "bg-accent text-accent-fg"
                    : "border border-line text-muted",
                )}
              >
                Por pasajero
              </button>
              <button
                type="button"
                aria-pressed={departure.modo === "grupo"}
                onClick={() => updateDeparture(departure.id, { modo: "grupo" })}
                className={cn(
                  "h-11 rounded-md text-sm font-medium",
                  departure.modo === "grupo"
                    ? "bg-accent text-accent-fg"
                    : "border border-line text-muted",
                )}
              >
                Un comprobante
              </button>
            </div>
          </Field>
          {departure.modo === "grupo" ? (
            <Field label="Número del comprobante">
              <Input
                value={departure.numeroGrupo}
                onChange={(event) =>
                  updateDeparture(departure.id, { numeroGrupo: event.target.value })
                }
                placeholder="1100"
                className="tabular-nums"
              />
            </Field>
          ) : null}
        </div>
      </Panel>

      <div className="no-print mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {STEPS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={cn(
              "h-11 rounded-md px-3 text-sm font-medium",
              step === index ? "bg-accent text-accent-fg" : "border border-line bg-surface text-muted",
            )}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      <div className="no-print mb-4 grid gap-3 sm:grid-cols-3">
        <Summary label="Presupuesto" value={formatCents(analysis.budgetCents)} />
        <Summary
          label="Efectivo entregado"
          value={
            departure.cashGiven == null ? "—" : formatCents(Math.round(departure.cashGiven * 100))
          }
        />
        <Summary
          label="Diferencia"
          value={analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)}
        />
      </div>

      {step === 0 ? <Passengers departure={departure} /> : null}
      {step === 1 ? (
        <CashStep
          key={departure.id}
          departure={departure}
          analysis={analysis}
          onContinue={() => setStep(2)}
        />
      ) : null}
      {step === 2 ? <Tickets departure={departure} analysis={analysis} /> : null}
      {step === 3 ? (
        <Liquidacion departure={departure} analysis={analysis} />
      ) : null}

      <div id="liquidacion" className={step === 3 ? "mt-4" : "sheet-closed"}>
        <LiquidacionSheet departure={departure} analysis={analysis} />
      </div>
    </Shell>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="tabular-nums text-lg font-medium text-ink">{value}</p>
    </div>
  );
}

function Passengers({ departure }: { departure: Departure }) {
  const rates = useRuta((state) => state.rates);
  const addPassenger = useRuta((state) => state.addPassenger);
  const addPassengers = useRuta((state) => state.addPassengers);
  const updatePassenger = useRuta((state) => state.updatePassenger);
  const toggleSite = useRuta((state) => state.toggleSite);
  const removePassenger = useRuta((state) => state.removePassenger);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<CategoryId>("general");
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [bulk, setBulk] = useState("");
  const [startNumero, setStartNumero] = useState("");
  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[0];

  function addOne() {
    addPassenger(departure.id, {
      name,
      category,
      included: preset.included,
    });
    setName("");
  }

  function addBulk() {
    addPassengers(
      departure.id,
      bulk.split("\n"),
      category,
      preset.included,
      startNumero,
    );
    setBulk("");
    setStartNumero("");
  }

  return (
    <div className="no-print space-y-4">
      <Panel>
        <h2 className="font-display text-2xl">Entradas incluidas</h2>
        <p className="mt-1 text-sm text-muted">
          Marca solo lo que ya está pagado en la reserva. Toritos es opcional: si no está
          incluido, no entra al presupuesto del guía.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={presetId === item.id}
              onClick={() => setPresetId(item.id)}
              className={cn(
                "h-11 rounded-md px-3 text-sm font-medium",
                presetId === item.id
                  ? "bg-accent text-accent-fg"
                  : "border border-line text-muted",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <form
          className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            addOne();
          }}
        >
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nombre del pasajero"
            aria-label="Nombre del pasajero"
          />
          <Select
            aria-label="Categoría"
            value={category}
            onChange={(event) => setCategory(event.target.value as CategoryId)}
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </Select>
          <Button type="submit">Agregar</Button>
        </form>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-accent">
            Cargar una lista
          </summary>
          <div className="mt-3 grid gap-3">
            <TextArea
              value={bulk}
              onChange={(event) => setBulk(event.target.value)}
              placeholder={"Un nombre por línea\nAna Beltrán\nMarco Silva"}
            />
            {departure.modo === "pasajero" ? (
              <Field label="Primer número de comprobante" hint="Los siguientes correlativos se completan solos.">
                <Input
                  value={startNumero}
                  onChange={(event) => setStartNumero(event.target.value)}
                  placeholder="1041"
                  className="tabular-nums md:max-w-48"
                />
              </Field>
            ) : null}
            <div>
              <Button variant="secondary" onClick={addBulk} disabled={!bulk.trim()}>
                Agregar lista
              </Button>
            </div>
          </div>
        </details>
      </Panel>

      {departure.passengers.length === 0 ? (
        <Panel>
          <p className="text-muted">Todavía no hay pasajeros. Agrega el grupo para calcular el efectivo.</p>
        </Panel>
      ) : (
        <>
          <div className="hidden md:block">
            <Panel className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-muted">
                    <th className="py-2 pr-2 font-medium">Pasajero</th>
                    <th className="py-2 pr-2 font-medium">Categoría</th>
                    {departure.modo === "pasajero" ? (
                      <th className="py-2 pr-2 font-medium">Nº ingreso</th>
                    ) : null}
                    {SITES.map((site) => (
                      <th key={site.id} className="px-1 py-2 font-medium">
                        {site.short}
                        {site.optional ? " (opc.)" : ""}
                      </th>
                    ))}
                    <th className="py-2 pr-2 font-medium">Importe</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {departure.passengers.map((passenger) => (
                    <tr key={passenger.id} className="border-b border-line last:border-0">
                      <td className="py-2 pr-2">
                        <Input
                          value={passenger.name}
                          aria-label={`Nombre de ${passenger.name}`}
                          onChange={(event) =>
                            updatePassenger(departure.id, passenger.id, { name: event.target.value })
                          }
                        />
                      </td>
                      <td className="py-2 pr-2">
                        <Select
                          aria-label={`Categoría de ${passenger.name}`}
                          value={passenger.category}
                          onChange={(event) =>
                            updatePassenger(departure.id, passenger.id, {
                              category: event.target.value as CategoryId,
                            })
                          }
                        >
                          {CATEGORIES.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.label}
                            </option>
                          ))}
                        </Select>
                      </td>
                      {departure.modo === "pasajero" ? (
                        <td className="py-2 pr-2">
                          <Input
                            value={passenger.numero}
                            aria-label={`Comprobante de ${passenger.name}`}
                            onChange={(event) =>
                              updatePassenger(departure.id, passenger.id, {
                                numero: event.target.value,
                              })
                            }
                            className="tabular-nums"
                          />
                        </td>
                      ) : null}
                      {SITES.map((site) => (
                        <td key={site.id} className="px-1 py-2">
                          <SiteToggle
                            on={passenger.included[site.id]}
                            label={passenger.included[site.id] ? "Sí" : "No"}
                            onClick={() => toggleSite(departure.id, passenger.id, site.id)}
                          />
                        </td>
                      ))}
                      <td className="py-2 pr-2 tabular-nums font-medium">
                        {formatCents(passengerCents(passenger, rates))}
                      </td>
                      <td className="py-2">
                        <Button
                          variant="ghost"
                          onClick={() => removePassenger(departure.id, passenger.id)}
                          aria-label={`Quitar a ${passenger.name}`}
                        >
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
          </div>
          <div className="space-y-3 md:hidden">
            {departure.passengers.map((passenger) => (
              <Panel key={passenger.id}>
                <Input
                  value={passenger.name}
                  aria-label="Nombre"
                  onChange={(event) =>
                    updatePassenger(departure.id, passenger.id, { name: event.target.value })
                  }
                />
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Select
                    aria-label="Categoría"
                    value={passenger.category}
                    onChange={(event) =>
                      updatePassenger(departure.id, passenger.id, {
                        category: event.target.value as CategoryId,
                      })
                    }
                  >
                    {CATEGORIES.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                  {departure.modo === "pasajero" ? (
                    <Input
                      value={passenger.numero}
                      aria-label="Número de ingreso"
                      placeholder="Nº ingreso"
                      onChange={(event) =>
                        updatePassenger(departure.id, passenger.id, { numero: event.target.value })
                      }
                    />
                  ) : null}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {SITES.map((site) => (
                    <SiteToggle
                      key={site.id}
                      on={passenger.included[site.id]}
                      label={`${site.short}${passenger.included[site.id] ? "" : " — no"}`}
                      onClick={() => toggleSite(departure.id, passenger.id, site.id)}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="tabular-nums font-medium">
                    {formatCents(passengerCents(passenger, rates))}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => removePassenger(departure.id, passenger.id)}
                  >
                    Quitar
                  </Button>
                </div>
              </Panel>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SiteToggle({
  on,
  label,
  onClick,
}: {
  on: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "h-11 w-full rounded-md px-2 text-sm font-medium transition-colors",
        on ? "bg-accent text-accent-fg" : "border border-line bg-background text-muted",
      )}
    >
      {label}
    </button>
  );
}

function CashStep({
  departure,
  analysis,
  onContinue,
}: {
  departure: Departure;
  analysis: DepartureAnalysis;
  onContinue: () => void;
}) {
  const rates = useRuta((state) => state.rates);
  const confirmCash = useRuta((state) => state.confirmCash);
  const [amount, setAmount] = useState(
    departure.cashGiven != null
      ? String(departure.cashGiven)
      : (analysis.budgetCents / 100).toFixed(2),
  );
  const [note, setNote] = useState(departure.cashNote);
  const parsed = Number(amount.replace(",", "."));
  const valid = amount.trim() !== "" && Number.isFinite(parsed) && parsed >= 0;
  const gap = valid ? Math.round(parsed * 100) - analysis.budgetCents : null;

  return (
    <div className="no-print space-y-4">
      <Panel>
        <h2 className="font-display text-2xl">Presupuesto para el guía</h2>
        <p className="mt-1 text-sm text-muted">
          Este es el efectivo que cubre exactamente las entradas incluidas. No hace falta
          calcularlo a mano.
        </p>
        <ul className="mt-4 divide-y divide-line">
          {analysis.sites.map((site) => {
            const meta = SITES.find((item) => item.id === site.siteId);
            if (!meta || (site.expected === 0 && site.amountCents === 0)) return null;
            return (
              <li key={site.siteId} className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-ink">
                    {meta.name}
                    {meta.optional ? " · opcional" : ""}
                  </p>
                  <p className="text-sm text-muted">
                    {categoryBreakdown(departure, site.siteId, rates) || "Sin incluidos"}
                  </p>
                </div>
                <p className="tabular-nums font-medium">{formatCents(site.amountCents)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 flex items-end justify-between border-t border-line pt-3">
          <div>
            <p className="text-sm text-muted">Total a entregar</p>
            <p className="text-sm text-faint">{billSuggestion(analysis.budgetCents)}</p>
          </div>
          <p className="font-display text-3xl tabular-nums">{formatCents(analysis.budgetCents)}</p>
        </div>
      </Panel>
      <Panel>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Efectivo que sale de caja">
            <Input
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="tabular-nums"
            />
          </Field>
          <Field label="Nota de entrega">
            <Input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Sobre, hora, quién contó"
            />
          </Field>
        </div>
        <p className={cn("mt-3 text-sm", gap === 0 ? "text-ok" : "text-warn")}>
          {gap == null
            ? "Escribe el monto entregado."
            : gap === 0
              ? "Coincide con el presupuesto."
              : gap > 0
                ? `Sale ${formatCents(gap)} de más respecto a las entradas incluidas.`
                : `Faltan ${formatCents(Math.abs(gap))} para cubrir las entradas.`}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            disabled={!valid}
            onClick={() => {
              confirmCash(departure.id, parsed, note);
              onContinue();
            }}
          >
            {departure.handedAt ? "Actualizar y seguir a tickets" : "Confirmar entrega"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setAmount((analysis.budgetCents / 100).toFixed(2))}
          >
            Usar el presupuesto
          </Button>
        </div>
      </Panel>
    </div>
  );
}

function Tickets({
  departure,
  analysis,
}: {
  departure: Departure;
  analysis: DepartureAnalysis;
}) {
  const setReturned = useRuta((state) => state.setReturned);
  const updateRendition = useRuta((state) => state.updateRendition);
  const updateTramo = useRuta((state) => state.updateTramo);
  const addTramo = useRuta((state) => state.addTramo);
  const removeTramo = useRuta((state) => state.removeTramo);

  return (
    <div className="no-print space-y-4">
      {!departure.handedAt ? (
        <Panel>
          <p className="text-sm text-warn">
            Aún no confirmas la entrega de efectivo. Puedes anotar tickets, pero el cuadre de
            monto queda abierto.
          </p>
        </Panel>
      ) : null}
      {analysis.overlaps.length > 0 ? (
        <Panel>
          <p className="text-sm text-danger">
            Hay tickets repetidos en otra salida:{" "}
            {analysis.overlaps
              .map(
                (item) =>
                  `${SITES.find((site) => site.id === item.siteId)?.short} ${item.number} (${formatDate(item.date)}, ${item.guide})`,
              )
              .join(" · ")}
          </p>
        </Panel>
      ) : null}
      {SITES.map((site) => {
        const siteAnalysis = analysis.sites.find((item) => item.siteId === site.id);
        if (!siteAnalysis) return null;
        const ok = siteAnalysis.delta === 0 && siteAnalysis.errors.length === 0;
        const idle = siteAnalysis.expected === 0 && siteAnalysis.tickets === 0;
        return (
          <Panel key={site.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl">
                  {site.name}
                  {site.optional ? " · opcional" : ""}
                </h2>
                <p className="text-sm text-muted">
                  {siteAnalysis.expected} incluidos · {formatCents(siteAnalysis.amountCents)}
                </p>
              </div>
              <Badge tone={idle ? "neutral" : ok ? "ok" : "danger"}>
                {idle
                  ? "Sin movimiento"
                  : ok
                    ? `${siteAnalysis.tickets} tickets`
                    : `${siteAnalysis.tickets} tickets / ${siteAnalysis.expected} incluidos`}
              </Badge>
            </div>
            {siteAnalysis.expected > 0 ? (
              <p className="mt-2 text-sm text-muted">
                {departure.passengers
                  .filter((passenger) => passenger.included[site.id])
                  .map((passenger) => passenger.name)
                  .join(" · ")}
              </p>
            ) : null}
            <div className="mt-4 max-w-sm">
              <Field label="Talonario del sitio" hint="Serie física del ticket, distinta de la serie de ingreso.">
                <Input
                  value={departure.sites[site.id].talonario}
                  onChange={(event) =>
                    updateRendition(departure.id, site.id, { talonario: event.target.value })
                  }
                  placeholder="AND, RAQ…"
                />
              </Field>
            </div>
            <div className="mt-4 space-y-3">
              {departure.sites[site.id].tramos.map((tramo, index) => (
                <div key={tramo.id} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                  <Field label={index === 0 ? "Desde" : "Desde"}>
                    <Input
                      inputMode="numeric"
                      value={tramo.desde}
                      onChange={(event) =>
                        updateTramo(departure.id, site.id, tramo.id, { desde: event.target.value })
                      }
                      className="tabular-nums"
                      placeholder="3101"
                    />
                  </Field>
                  <Field label="Hasta">
                    <Input
                      inputMode="numeric"
                      value={tramo.hasta}
                      onChange={(event) =>
                        updateTramo(departure.id, site.id, tramo.id, { hasta: event.target.value })
                      }
                      className="tabular-nums"
                      placeholder="3108"
                    />
                  </Field>
                  <Field label="Anulados">
                    <Input
                      value={tramo.anulados}
                      onChange={(event) =>
                        updateTramo(departure.id, site.id, tramo.id, {
                          anulados: event.target.value,
                        })
                      }
                      placeholder="3104, 3106"
                    />
                  </Field>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={() => removeTramo(departure.id, site.id, tramo.id)}
                      aria-label="Quitar tramo"
                    >
                      Quitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {siteAnalysis.errors.map((error) => (
              <p key={error} className="mt-2 text-sm text-danger">
                {error}
              </p>
            ))}
            <div className="mt-3">
              <Button variant="secondary" onClick={() => addTramo(departure.id, site.id)}>
                Otro tramo
              </Button>
            </div>
          </Panel>
        );
      })}
      <Panel>
        <Field label="Vuelto que devuelve el guía">
          <Input
            inputMode="decimal"
            className="tabular-nums md:max-w-xs"
            value={String(departure.cashReturned || "")}
            onChange={(event) => {
              const raw = event.target.value.replace(",", ".");
              const value = raw === "" ? 0 : Number(raw);
              if (Number.isFinite(value) && value >= 0) setReturned(departure.id, value);
            }}
            placeholder="0.00"
          />
        </Field>
        <p className="mt-3 text-sm text-ink">{moneyGapText(analysis.moneyGapCents)}</p>
      </Panel>
    </div>
  );
}

function Liquidacion({
  departure,
  analysis,
}: {
  departure: Departure;
  analysis: DepartureAnalysis;
}) {
  const closeSettlement = useRuta((state) => state.closeSettlement);
  const reopenSettlement = useRuta((state) => state.reopenSettlement);
  const [note, setNote] = useState(departure.settlementNote);
  const square = analysis.quantityOk && analysis.moneyOk && departure.handedAt;

  return (
    <div className="no-print space-y-4">
      <Panel>
        <h2 className="font-display text-2xl">Cierre</h2>
        <p className="mt-1 text-sm text-ink">
          {analysis.quantityOk
            ? moneyGapText(analysis.moneyGapCents)
            : "Los tickets no coinciden con los incluidos. Aunque el efectivo cuadre con las reservas, contabilidad no tiene sustento físico."}
        </p>
        <ul className="mt-3 space-y-1 text-sm">
          {analysis.sites
            .filter((site) => site.expected > 0 || site.tickets > 0)
            .map((site) => {
              const meta = SITES.find((item) => item.id === site.siteId);
              const ok = site.delta === 0 && site.errors.length === 0;
              return (
                <li key={site.siteId} className={ok ? "text-ok" : "text-danger"}>
                  {meta?.short}: {site.tickets} tickets para {site.expected} incluidos
                  {site.ranges.length > 0 ? ` · ${site.ranges.join(", ")}` : ""}
                </li>
              );
            })}
        </ul>
        <div className="mt-4">
          <Field label="Nota para contabilidad">
            <TextArea value={note} onChange={(event) => setNote(event.target.value)} />
          </Field>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {departure.closedAt ? (
            <Button variant="secondary" onClick={() => reopenSettlement(departure.id)}>
              Reabrir
            </Button>
          ) : (
            <Button onClick={() => closeSettlement(departure.id, note)} disabled={!departure.handedAt && analysis.budgetCents > 0}>
              {square ? "Cerrar cuadrado" : "Cerrar con observación"}
            </Button>
          )}
          <Button variant="secondary" onClick={() => window.print()}>
            Imprimir liquidación
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              downloadText(
                `liquidacion-${departure.date}-${slug(departure.guide || "guia")}.csv`,
                summaryCsv([{ departure, analysis }]),
              )
            }
          >
            CSV de la salida
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              downloadText(
                `detalle-${departure.date}-${slug(departure.guide || "guia")}.csv`,
                detailCsv([{ departure, rates: useRuta.getState().rates }]),
              )
            }
          >
            CSV por pasajero
          </Button>
        </div>
      </Panel>
    </div>
  );
}

function LiquidacionSheet({
  departure,
  analysis,
}: {
  departure: Departure;
  analysis: DepartureAnalysis;
}) {
  const rates = useRuta((state) => state.rates);
  return (
    <article id="liquidacion" className="rounded-3xl border border-line bg-surface p-5 md:p-8">
      <p className="text-xs tracking-wide text-muted">LIQUIDACIÓN DE ENTRADAS</p>
      <h2 className="font-display text-3xl tracking-tight">Ruta del Sol</h2>
      <p className="mt-1 text-sm text-muted">
        {formatDate(departure.date)} · {departure.guide || "Sin guía"}
        {departure.unit ? ` · ${departure.unit}` : ""} · Caja: {departure.caja || "—"}
      </p>
      <p className="mt-4 text-sm">
        Sustento de ingreso: <strong>{analysis.numerosLabel}</strong>
        {departure.modo === "grupo" ? " (un comprobante para el grupo)" : " (un número por pasajero)"}
      </p>

      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-muted">
            <th className="py-2 font-medium">Pasajero</th>
            <th className="py-2 font-medium">Comprobante</th>
            <th className="py-2 font-medium">Incluye</th>
            <th className="py-2 text-right font-medium">Importe</th>
          </tr>
        </thead>
        <tbody>
          {departure.passengers.map((passenger) => {
            const numero = departure.modo === "grupo" ? departure.numeroGrupo : passenger.numero;
            const sites = SITES.filter((site) => passenger.included[site.id]).map((site) => site.short);
            return (
              <tr key={passenger.id} className="border-b border-line">
                <td className="py-2 pr-2">
                  {passenger.name}
                  <span className="block text-xs text-faint">
                    {CATEGORIES.find((item) => item.id === passenger.category)?.label}
                  </span>
                </td>
                <td className="py-2 pr-2 tabular-nums">
                  {departure.serie}-{numero || "s/n"}
                </td>
                <td className="py-2 pr-2">{sites.join(", ") || "—"}</td>
                <td className="py-2 text-right tabular-nums">
                  {formatCents(passengerCents(passenger, rates))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-muted">
            <th className="py-2 font-medium">Sitio</th>
            <th className="py-2 font-medium">Talonario</th>
            <th className="py-2 font-medium">Tickets</th>
            <th className="py-2 font-medium">Cantidad</th>
            <th className="py-2 text-right font-medium">Según reserva</th>
          </tr>
        </thead>
        <tbody>
          {analysis.sites.map((site) => {
            const meta = SITES.find((item) => item.id === site.siteId);
            return (
              <tr key={site.siteId} className="border-b border-line">
                <td className="py-2 pr-2">{meta?.name}</td>
                <td className="py-2 pr-2">{departure.sites[site.siteId].talonario || "—"}</td>
                <td className="py-2 pr-2">{site.ranges.join(", ") || "—"}</td>
                <td className="py-2 pr-2 tabular-nums">
                  {site.tickets}/{site.expected}
                </td>
                <td className="py-2 text-right tabular-nums">{formatCents(site.amountCents)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <dl className="mt-6 grid gap-2 text-sm md:grid-cols-2">
        <div className="flex justify-between gap-4 border-b border-line py-1">
          <dt className="text-muted">Presupuesto</dt>
          <dd className="tabular-nums">{formatCents(analysis.budgetCents)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line py-1">
          <dt className="text-muted">Efectivo entregado</dt>
          <dd className="tabular-nums">
            {departure.cashGiven == null ? "—" : formatSoles(departure.cashGiven)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line py-1">
          <dt className="text-muted">Vuelto</dt>
          <dd className="tabular-nums">{formatSoles(departure.cashReturned || 0)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-line py-1">
          <dt className="text-muted">Diferencia</dt>
          <dd className="tabular-nums">
            {analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-sm font-medium">
        {STATUS_LABEL[analysis.status]}.{" "}
        {analysis.quantityOk
          ? moneyGapText(analysis.moneyGapCents)
          : `Tickets incompletos. ${moneyGapText(analysis.moneyGapCents)}.`}
      </p>
      {departure.settlementNote ? (
        <p className="mt-2 text-sm text-muted">{departure.settlementNote}</p>
      ) : null}
      <div className="mt-8 grid gap-6 text-sm text-muted sm:grid-cols-3">
        <p>Caja<br />________________</p>
        <p>Guía<br />________________</p>
        <p>Contabilidad<br />________________</p>
      </div>
    </article>
  );
}
