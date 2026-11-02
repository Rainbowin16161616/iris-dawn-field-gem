import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Button, Input, Panel } from "@/components/ui";
import { CATEGORIES, DEFAULT_RATES, SITES, type CategoryId, type SiteId } from "@/lib/ruta/domain";
import { useRuta, useRutaReady } from "@/lib/ruta/store";

export const Route = createFileRoute("/tarifas")({ component: TarifasPage });

function TarifasPage() {
  const ready = useRutaReady();
  if (!ready) {
    return (
      <Shell>
        <p className="text-muted">Cargando tarifas…</p>
      </Shell>
    );
  }
  return <Tarifas />;
}

function Tarifas() {
  const rates = useRuta((state) => state.rates);
  const setRates = useRuta((state) => state.setRates);
  const resetRates = useRuta((state) => state.resetRates);

  function update(siteId: SiteId, category: CategoryId, raw: string) {
    const value = Number(raw.replace(",", "."));
    if (!Number.isFinite(value) || value < 0) return;
    setRates({
      ...rates,
      [siteId]: { ...rates[siteId], [category]: Math.round(value * 100) / 100 },
    });
  }

  return (
    <Shell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl tracking-tight">Tarifas de entrada</h1>
          <p className="mt-2 text-muted">
            Con estas tarifas se arma el presupuesto que caja entrega al guía. Raqchi usa la
            tarifa general de referencia (S/ 20). Andahuaylillas no entra en el Boleto Turístico.
            Toritos es opcional. Cámbialas cuando el sitio actualice el precio.
          </p>
        </div>
        <Button variant="secondary" onClick={resetRates}>
          Restaurar referencia
        </Button>
      </div>

      <Panel className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-b border-line text-sm text-muted">
              <th className="py-3 pr-4 font-medium">Punto de la ruta</th>
              {CATEGORIES.map((category) => (
                <th key={category.id} className="px-2 py-3 font-medium">
                  {category.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SITES.map((site) => (
              <tr key={site.id} className="border-b border-line last:border-0">
                <th className="py-4 pr-4 text-left font-medium text-ink">
                  {site.name}
                  {site.optional ? (
                    <span className="mt-1 block text-xs font-normal text-faint">Opcional</span>
                  ) : null}
                </th>
                {CATEGORIES.map((category) => (
                  <td key={category.id} className="px-2 py-3">
                    <Input
                      inputMode="decimal"
                      aria-label={`${site.name} ${category.label}`}
                      value={String(rates[site.id][category.id])}
                      onChange={(event) => update(site.id, category.id, event.target.value)}
                      className="tabular-nums"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-faint">
          Referencia cargada: capilla general S/ {DEFAULT_RATES.andahuaylillas.general}, museo
          S/ {DEFAULT_RATES.pucara.general}, toritos S/ {DEFAULT_RATES.toritos.general}, Raqchi
          general S/ {DEFAULT_RATES.raqchi.general}, estudiante S/ {DEFAULT_RATES.raqchi.estudiante},
          menor S/ {DEFAULT_RATES.raqchi.menor}. Menor en capilla y museo queda en 0 hasta que
          confirmes la tarifa del sitio.
        </p>
      </Panel>
    </Shell>
  );
}
