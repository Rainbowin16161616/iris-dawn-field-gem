import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useRutaReady, D as summaryCsv, O as todayISO, a as Field, b as formatCents, c as Panel, d as Select, f as Shell, k as useRuta, m as analyze, n as Button, o as Input, t as Badge, u as STATUS_LABEL, v as detailCsv, x as formatDate, y as downloadText } from "./store-Cg5MdMa-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contabilidad-Cov4t059.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContabilidadPage() {
	if (!useRutaReady()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Cargando registro…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contabilidad, {});
}
function monthStart() {
	return `${todayISO().slice(0, 8)}01`;
}
function toneFor(status) {
	if (status === "rendido") return "ok";
	if (status === "observado") return "danger";
	if (status === "en_ruta") return "warn";
	return "neutral";
}
function Contabilidad() {
	const departures = useRuta((state) => state.departures);
	const rates = useRuta((state) => state.rates);
	const [from, setFrom] = (0, import_react.useState)(monthStart);
	const [to, setTo] = (0, import_react.useState)(todayISO);
	const [guide, setGuide] = (0, import_react.useState)("todos");
	const [onlyIssues, setOnlyIssues] = (0, import_react.useState)(false);
	const guides = (0, import_react.useMemo)(() => [...new Set(departures.map((d) => d.guide.trim()).filter(Boolean))].sort(), [departures]);
	const rows = (0, import_react.useMemo)(() => {
		return departures.filter((departure) => departure.date >= from && departure.date <= to).filter((departure) => guide === "todos" || departure.guide.trim() === guide).map((departure) => ({
			departure,
			analysis: analyze(departure, rates, departures)
		})).filter((row) => onlyIssues ? row.analysis.status === "observado" : row.analysis.status !== "borrador").sort((a, b) => a.departure.date < b.departure.date ? 1 : -1);
	}, [
		departures,
		rates,
		from,
		to,
		guide,
		onlyIssues
	]);
	const presupuesto = rows.reduce((sum, row) => sum + row.analysis.budgetCents, 0);
	const entregado = rows.reduce((sum, row) => sum + Math.round((row.departure.cashGiven ?? 0) * 100), 0);
	const diferencia = rows.reduce((sum, row) => sum + (row.analysis.moneyGapCents ?? 0), 0);
	const abiertas = rows.filter((row) => row.analysis.status === "observado").length;
	const bySerie = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of rows) {
			const key = row.departure.serie.trim() || "Sin serie";
			const current = map.get(key) ?? {
				serie: key,
				presupuesto: 0,
				entregado: 0,
				salidas: 0,
				diferencias: 0
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
		downloadText(`contabilidad-ruta-sol-${from}-a-${to}.csv`, summaryCsv(rows));
	}
	function exportDetail() {
		downloadText(`detalle-ingresos-ruta-sol-${from}-a-${to}.csv`, detailCsv(rows.map((row) => ({
			departure: row.departure,
			rates
		}))));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Registro para contabilidad"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Cada salida queda amarrada a la serie del ingreso. El detalle trae pasajero, número de comprobante y la tarifa de cada entrada incluida, para sustentar el efectivo que salió de caja."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Desde",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: from,
							onChange: (event) => setFrom(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hasta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: to,
							onChange: (event) => setTo(event.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Guía",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: guide,
							onChange: (event) => setGuide(event.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "todos",
								children: "Todos"
							}), guides.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: name,
								children: name
							}, name))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center gap-2 self-end text-sm text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-accent",
							checked: onlyIssues,
							onChange: (event) => setOnlyIssues(event.target.checked)
						}), "Solo con diferencia"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Presupuesto de entradas",
					value: formatCents(presupuesto)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Efectivo entregado",
					value: formatCents(entregado)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Diferencia de caja",
					value: formatCents(diferencia)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
					label: "Salidas observadas",
					value: String(abiertas)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Por serie de ingreso"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: exportSummary,
						disabled: rows.length === 0,
						children: "Exportar resumen"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: exportDetail,
						disabled: rows.length === 0,
						children: "Exportar detalle"
					})]
				})]
			}), bySerie.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "No hay salidas en este rango."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Serie"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Salidas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Presupuesto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3 font-medium",
								children: "Efectivo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 font-medium",
								children: "Con diferencia"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: bySerie.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 font-medium",
								children: row.serie
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 tabular-nums",
								children: row.salidas
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 tabular-nums",
								children: formatCents(row.presupuesto)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3 tabular-nums",
								children: formatCents(row.entregado)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 tabular-nums",
								children: row.diferencias
							})
						]
					}, row.serie)) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-2xl",
			children: "Salidas"
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Nada para elevar a contabilidad con estos filtros."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: rows.map(({ departure, analysis }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/salida/$id",
						params: { id: departure.id },
						className: "font-medium text-ink underline-offset-2 hover:underline",
						children: [
							formatDate(departure.date),
							" · ",
							departure.guide || "Sin guía"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: toneFor(analysis.status),
						children: STATUS_LABEL[analysis.status]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Ingreso ",
						analysis.numerosLabel,
						departure.settlementNote ? ` · ${departure.settlementNote}` : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "tabular-nums text-sm text-ink",
					children: [
						"Presupuesto ",
						formatCents(analysis.budgetCents),
						" · ",
						"Entregado",
						" ",
						departure.cashGiven == null ? "—" : formatCents(Math.round(departure.cashGiven * 100)),
						" · ",
						"Dif. ",
						analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)
					]
				})]
			}, departure.id))
		})] })
	] });
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-2xl font-medium tabular-nums text-ink",
			children: value
		})]
	});
}
//#endregion
export { ContabilidadPage as component };
