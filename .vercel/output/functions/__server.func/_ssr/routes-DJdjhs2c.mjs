import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useRutaReady, C as issueLabel, O as todayISO, b as formatCents, c as Panel, f as Shell, k as useRuta, m as analyze, n as Button, o as Input, t as Badge, u as STATUS_LABEL, x as formatDate } from "./store-Cg5MdMa-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJdjhs2c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	if (!useRutaReady()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Cargando salidas…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
var FILTERS = [
	{
		id: "todas",
		label: "Todas"
	},
	{
		id: "observado",
		label: "Con diferencia"
	},
	{
		id: "en_ruta",
		label: "En ruta"
	},
	{
		id: "borrador",
		label: "Borrador"
	},
	{
		id: "rendido",
		label: "Cuadradas"
	}
];
function toneFor(status) {
	if (status === "rendido") return "ok";
	if (status === "observado") return "danger";
	if (status === "en_ruta") return "warn";
	return "neutral";
}
function Dashboard() {
	const navigate = useNavigate();
	const departures = useRuta((state) => state.departures);
	const rates = useRuta((state) => state.rates);
	const createDeparture = useRuta((state) => state.createDeparture);
	const removeExamples = useRuta((state) => state.removeExamples);
	const [filter, setFilter] = (0, import_react.useState)("todas");
	const [query, setQuery] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => departures.map((departure) => ({
		departure,
		analysis: analyze(departure, rates, departures)
	})).sort((a, b) => {
		const rank = {
			observado: 0,
			en_ruta: 1,
			borrador: 2,
			rendido: 3
		};
		const byStatus = rank[a.analysis.status] - rank[b.analysis.status];
		if (byStatus !== 0) return byStatus;
		return a.departure.date < b.departure.date ? 1 : -1;
	}), [departures, rates]);
	const month = todayISO().slice(0, 7);
	const enRuta = rows.filter((row) => row.analysis.status === "en_ruta");
	const observados = rows.filter((row) => row.analysis.status === "observado");
	const efectivoEnRuta = enRuta.reduce((sum, row) => sum + Math.round((row.departure.cashGiven ?? 0) * 100), 0);
	const cuadradosMes = rows.filter((row) => row.analysis.status === "rendido" && row.departure.date.startsWith(month)).length;
	const hasExamples = departures.some((departure) => departure.id.startsWith("ej-"));
	const visible = rows.filter((row) => {
		if (filter !== "todas" && row.analysis.status !== filter) return false;
		return `${row.departure.guide} ${row.departure.serie} ${row.departure.unit}`.toLowerCase().includes(query.trim().toLowerCase());
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight text-ink",
					children: "Salidas del día"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "El presupuesto del guía sale de las entradas incluidas. Al volver, los tickets numerados tienen que coincidir en cantidad y el efectivo, con el vuelto, en monto. La serie del ingreso es el sustento para contabilidad."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					const id = createDeparture();
					navigate({
						to: "/salida/$id",
						params: { id }
					});
				},
				children: "Nueva salida"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Con diferencia",
					value: String(observados.length),
					hint: "Revisar antes de pasar a contabilidad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "En ruta",
					value: String(enRuta.length),
					hint: "Efectivo ya entregado, sin rendir"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Efectivo en ruta",
					value: formatCents(efectivoEnRuta),
					hint: "Suma en manos de los guías"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Cuadradas del mes",
					value: String(cuadradosMes),
					hint: "Listas para el registro contable"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": filter === item.id,
					onClick: () => setFilter(item.id),
					className: filter === item.id ? "h-11 rounded-md bg-accent px-3 text-sm font-medium text-accent-fg" : "h-11 rounded-md border border-line px-3 text-sm font-medium text-muted",
					children: item.label
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: query,
				onChange: (event) => setQuery(event.target.value),
				placeholder: "Buscar guía, serie o unidad",
				className: "md:max-w-72",
				"aria-label": "Buscar salidas"
			})]
		}), visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-8 text-center text-muted",
			children: "No hay salidas con ese filtro."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: visible.map(({ departure, analysis }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/salida/$id",
				params: { id: departure.id },
				className: "flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-ink",
								children: departure.guide.trim() || "Sin guía"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: toneFor(analysis.status),
								children: STATUS_LABEL[analysis.status]
							}),
							departure.id.startsWith("ej-") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Ejemplo" }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							formatDate(departure.date),
							departure.unit ? ` · ${departure.unit}` : "",
							" · Serie ",
							analysis.numerosLabel
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink",
						children: issueLabel(analysis)
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left md:text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "tabular-nums text-lg font-medium text-ink",
						children: formatCents(analysis.budgetCents)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							departure.passengers.length,
							" pasajeros ·",
							" ",
							analysis.sites.filter((site) => site.expected > 0 || site.tickets > 0).map((site) => {
								return `${site.siteId === "andahuaylillas" ? "Capilla" : site.siteId === "pucara" ? "Pucará" : site.siteId === "toritos" ? "Toritos" : "Raqchi"} ${site.tickets}/${site.expected}`;
							}).join(" · ")
						]
					})]
				})]
			}) }, departure.id))
		})] }),
		hasExamples ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Hay tres salidas de ejemplo para ver un cuadre limpio, una en ruta y una con tickets faltantes."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: removeExamples,
				children: "Quitar ejemplos"
			})]
		}) : null
	] });
}
function Metric({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular-nums tracking-tight text-ink",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-faint",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
