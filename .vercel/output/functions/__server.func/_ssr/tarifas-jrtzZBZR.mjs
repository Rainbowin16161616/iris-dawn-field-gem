import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useRutaReady, c as Panel, f as Shell, i as DEFAULT_RATES, k as useRuta, l as SITES, n as Button, o as Input, r as CATEGORIES } from "./store-Cg5MdMa-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tarifas-jrtzZBZR.js
var import_jsx_runtime = require_jsx_runtime();
function TarifasPage() {
	if (!useRutaReady()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Cargando tarifas…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tarifas, {});
}
function Tarifas() {
	const rates = useRuta((state) => state.rates);
	const setRates = useRuta((state) => state.setRates);
	const resetRates = useRuta((state) => state.resetRates);
	function update(siteId, category, raw) {
		const value = Number(raw.replace(",", "."));
		if (!Number.isFinite(value) || value < 0) return;
		setRates({
			...rates,
			[siteId]: {
				...rates[siteId],
				[category]: Math.round(value * 100) / 100
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Tarifas de entrada"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Con estas tarifas se arma el presupuesto que caja entrega al guía. Raqchi usa la tarifa general de referencia (S/ 20). Andahuaylillas no entra en el Boleto Turístico. Toritos es opcional. Cámbialas cuando el sitio actualice el precio."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "secondary",
			onClick: resetRates,
			children: "Restaurar referencia"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[640px] text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-3 pr-4 font-medium",
					children: "Punto de la ruta"
				}), CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-2 py-3 font-medium",
					children: category.label
				}, category.id))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
					className: "py-4 pr-4 text-left font-medium text-ink",
					children: [site.name, site.optional ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs font-normal text-faint",
						children: "Opcional"
					}) : null]
				}), CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-2 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "decimal",
						"aria-label": `${site.name} ${category.label}`,
						value: String(rates[site.id][category.id]),
						onChange: (event) => update(site.id, category.id, event.target.value),
						className: "tabular-nums"
					})
				}, category.id))]
			}, site.id)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-faint",
			children: [
				"Referencia cargada: capilla general S/ ",
				DEFAULT_RATES.andahuaylillas.general,
				", museo S/ ",
				DEFAULT_RATES.pucara.general,
				", toritos S/ ",
				DEFAULT_RATES.toritos.general,
				", Raqchi general S/ ",
				DEFAULT_RATES.raqchi.general,
				", estudiante S/ ",
				DEFAULT_RATES.raqchi.estudiante,
				", menor S/ ",
				DEFAULT_RATES.raqchi.menor,
				". Menor en capilla y museo queda en 0 hasta que confirmes la tarifa del sitio."
			]
		})]
	})] });
}
//#endregion
export { TarifasPage as component };
