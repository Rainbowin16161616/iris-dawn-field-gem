import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-Cg5MdMa-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var LINKS = [
	{
		to: "/",
		label: "Salidas"
	},
	{
		to: "/contabilidad",
		label: "Contabilidad"
	},
	{
		to: "/tarifas",
		label: "Tarifas"
	}
];
function Shell({ children }) {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "no-print border-b border-line border-t-2 border-t-accent bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 md:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "min-h-11 inline-flex items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl leading-none tracking-tight text-ink",
						children: "Cuadre Sol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-sm text-muted sm:inline",
						children: "Ruta del Sol"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-1",
					children: LINKS.map((link) => {
						const active = link.to === "/" ? pathname === "/" : pathname === link.to || pathname.startsWith(`${link.to}/`);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: cn("inline-flex h-11 items-center rounded-md px-3 text-sm font-medium", active ? "bg-accent-soft text-accent" : "text-muted hover:bg-background hover:text-ink"),
							children: link.label
						}, link.to);
					})
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8",
			children
		})]
	});
}
function Button({ variant = "primary", className, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn("inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50", variant === "primary" && "bg-accent text-accent-fg hover:bg-accent/90", variant === "secondary" && "border border-line-strong bg-surface text-ink hover:bg-background", variant === "ghost" && "text-ink hover:bg-background", variant === "danger" && "bg-danger-soft text-danger hover:bg-danger-soft/70", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-ink outline-none placeholder:text-faint focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20", className),
		...props
	});
}
function TextArea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-base text-ink outline-none placeholder:text-faint focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20", className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-ink outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20", className),
		...props
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-sm font-medium text-muted",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-xs text-faint",
				children: hint
			}) : null
		]
	});
}
function Badge({ tone = "neutral", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tone === "neutral" && "bg-background text-muted", tone === "ok" && "bg-ok-soft text-ok", tone === "warn" && "bg-warn-soft text-warn", tone === "danger" && "bg-danger-soft text-danger", tone === "accent" && "bg-accent-soft text-accent"),
		children
	});
}
function Panel({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-3xl border border-line bg-surface p-4 md:p-5", className),
		children
	});
}
var SITES = [
	{
		id: "andahuaylillas",
		name: "Capilla de Andahuaylillas",
		short: "Andahuaylillas",
		optional: false
	},
	{
		id: "pucara",
		name: "Museo Lítico Pucará",
		short: "Pucará",
		optional: false
	},
	{
		id: "toritos",
		name: "Taller de Toritos",
		short: "Toritos",
		optional: true
	},
	{
		id: "raqchi",
		name: "Ingreso a Raqchi",
		short: "Raqchi",
		optional: false
	}
];
var CATEGORIES = [
	{
		id: "general",
		label: "General"
	},
	{
		id: "estudiante",
		label: "Estudiante"
	},
	{
		id: "menor",
		label: "Menor"
	}
];
var STATUS_LABEL = {
	borrador: "Borrador",
	en_ruta: "En ruta",
	rendido: "Cuadrado",
	observado: "Con diferencia"
};
var DEFAULT_RATES = {
	andahuaylillas: {
		general: 15,
		estudiante: 10,
		menor: 0
	},
	pucara: {
		general: 5,
		estudiante: 3,
		menor: 0
	},
	toritos: {
		general: 5,
		estudiante: 5,
		menor: 0
	},
	raqchi: {
		general: 20,
		estudiante: 10,
		menor: 8
	}
};
var PRESETS = [
	{
		id: "estandar",
		label: "Estándar, sin toritos",
		included: {
			andahuaylillas: true,
			pucara: true,
			toritos: false,
			raqchi: true
		}
	},
	{
		id: "completo",
		label: "Completo",
		included: {
			andahuaylillas: true,
			pucara: true,
			toritos: true,
			raqchi: true
		}
	},
	{
		id: "raqchi",
		label: "Solo Raqchi",
		included: {
			andahuaylillas: false,
			pucara: false,
			toritos: false,
			raqchi: true
		}
	},
	{
		id: "capilla",
		label: "Solo capilla",
		included: {
			andahuaylillas: true,
			pucara: false,
			toritos: false,
			raqchi: false
		}
	}
];
function uid() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
	return `id-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
}
function todayISO() {
	const n = /* @__PURE__ */ new Date();
	const m = String(n.getMonth() + 1).padStart(2, "0");
	const d = String(n.getDate()).padStart(2, "0");
	return `${n.getFullYear()}-${m}-${d}`;
}
function formatDate(iso) {
	if (!iso) return "—";
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Intl.DateTimeFormat("es-PE", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(new Date(y, m - 1, d));
}
function toCents(soles) {
	if (!Number.isFinite(soles)) return 0;
	return Math.round(soles * 100);
}
function formatSoles(soles) {
	return new Intl.NumberFormat("es-PE", {
		style: "currency",
		currency: "PEN",
		minimumFractionDigits: 2
	}).format(soles);
}
function formatCents(cents) {
	return formatSoles(cents / 100);
}
function emptyIncluded(value = false) {
	return {
		andahuaylillas: value,
		pucara: value,
		toritos: false,
		raqchi: value
	};
}
function emptyTramo() {
	return {
		id: uid(),
		desde: "",
		hasta: "",
		anulados: ""
	};
}
function emptySites() {
	return {
		andahuaylillas: {
			talonario: "",
			nota: "",
			tramos: [emptyTramo()]
		},
		pucara: {
			talonario: "",
			nota: "",
			tramos: [emptyTramo()]
		},
		toritos: {
			talonario: "",
			nota: "",
			tramos: [emptyTramo()]
		},
		raqchi: {
			talonario: "",
			nota: "",
			tramos: [emptyTramo()]
		}
	};
}
function isCategory(value) {
	return CATEGORIES.some((c) => c.id === value);
}
function normalizeRates(raw) {
	const out = {
		andahuaylillas: { ...DEFAULT_RATES.andahuaylillas },
		pucara: { ...DEFAULT_RATES.pucara },
		toritos: { ...DEFAULT_RATES.toritos },
		raqchi: { ...DEFAULT_RATES.raqchi }
	};
	if (!raw || typeof raw !== "object") return out;
	const source = raw;
	for (const site of SITES) {
		const row = source[site.id];
		if (!row) continue;
		for (const category of CATEGORIES) {
			const value = row[category.id];
			if (typeof value === "number" && Number.isFinite(value) && value >= 0) out[site.id][category.id] = Math.round(value * 100) / 100;
		}
	}
	return out;
}
function normalizePassenger(raw) {
	const included = emptyIncluded(false);
	for (const site of SITES) if (raw?.included?.[site.id]) included[site.id] = true;
	const category = raw?.category && isCategory(raw.category) ? raw.category : "general";
	return {
		id: raw?.id || uid(),
		name: raw?.name ?? "",
		category,
		included,
		numero: raw?.numero ?? ""
	};
}
function normalizeDeparture(raw) {
	const sites = emptySites();
	for (const site of SITES) {
		const existing = raw.sites?.[site.id];
		sites[site.id] = {
			talonario: existing?.talonario ?? "",
			nota: existing?.nota ?? "",
			tramos: existing?.tramos && existing.tramos.length > 0 ? existing.tramos.map((tramo) => ({
				id: tramo.id || uid(),
				desde: String(tramo.desde ?? ""),
				hasta: String(tramo.hasta ?? ""),
				anulados: String(tramo.anulados ?? "")
			})) : [emptyTramo()]
		};
	}
	return {
		id: raw.id || uid(),
		date: raw.date || todayISO(),
		guide: raw.guide ?? "",
		unit: raw.unit ?? "",
		caja: raw.caja ?? "",
		serie: raw.serie || "B001",
		modo: raw.modo === "grupo" ? "grupo" : "pasajero",
		numeroGrupo: raw.numeroGrupo ?? "",
		passengers: (raw.passengers ?? []).map((p) => normalizePassenger(p)),
		cashGiven: raw.cashGiven == null || !Number.isFinite(raw.cashGiven) ? null : raw.cashGiven,
		cashNote: raw.cashNote ?? "",
		handedAt: raw.handedAt ?? null,
		sites,
		cashReturned: Number.isFinite(raw.cashReturned) ? raw.cashReturned : 0,
		settlementNote: raw.settlementNote ?? "",
		closedAt: raw.closedAt ?? null,
		createdAt: raw.createdAt || (/* @__PURE__ */ new Date()).toISOString()
	};
}
function blankDeparture() {
	return normalizeDeparture({
		id: uid(),
		date: todayISO(),
		guide: "",
		unit: "",
		caja: "",
		serie: "B001",
		modo: "pasajero",
		numeroGrupo: "",
		passengers: [],
		cashGiven: null,
		cashNote: "",
		handedAt: null,
		sites: emptySites(),
		cashReturned: 0,
		settlementNote: "",
		closedAt: null,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
}
function nextNumero(current) {
	const match = current.trim().match(/^(.*?)(\d+)$/);
	if (!match) return "";
	const [, prefix, digits] = match;
	const next = String(Number(digits) + 1).padStart(digits.length, "0");
	return `${prefix ?? ""}${next}`;
}
function passengerCents(passenger, rates) {
	let cents = 0;
	for (const site of SITES) if (passenger.included[site.id]) cents += toCents(rates[site.id][passenger.category]);
	return cents;
}
function budgetCents(departure, rates) {
	return departure.passengers.reduce((sum, passenger) => sum + passengerCents(passenger, rates), 0);
}
function siteAmountCents(departure, siteId, rates) {
	return departure.passengers.reduce((sum, passenger) => {
		if (!passenger.included[siteId]) return sum;
		return sum + toCents(rates[siteId][passenger.category]);
	}, 0);
}
function parseToken(token) {
	const clean = token.trim();
	if (!/^\d+$/.test(clean)) return null;
	const value = Number(clean);
	if (!Number.isSafeInteger(value)) return null;
	return value;
}
function parseTramo(tramo) {
	const desdeRaw = tramo.desde.trim();
	const hastaRaw = tramo.hasta.trim();
	const anuladosRaw = tramo.anulados.trim();
	if (!desdeRaw && !hastaRaw && !anuladosRaw) return {
		blank: true,
		numbers: [],
		rangeLabel: ""
	};
	if (!desdeRaw || !hastaRaw) return {
		blank: false,
		error: "Completa el ticket desde y hasta",
		numbers: [],
		rangeLabel: ""
	};
	const desde = parseToken(desdeRaw);
	const hasta = parseToken(hastaRaw);
	if (desde == null || hasta == null) return {
		blank: false,
		error: "Los tickets deben ser numéricos",
		numbers: [],
		rangeLabel: ""
	};
	if (hasta < desde) return {
		blank: false,
		error: "El ticket hasta es menor que el desde",
		numbers: [],
		rangeLabel: ""
	};
	if (hasta - desde + 1 > 400) return {
		blank: false,
		error: "El rango supera 400 tickets",
		numbers: [],
		rangeLabel: ""
	};
	const voidTokens = anuladosRaw.split(/[\s,;]+/).filter(Boolean);
	const voids = [];
	for (const token of voidTokens) {
		const value = parseToken(token);
		if (value == null) return {
			blank: false,
			error: `Anulado no numérico: ${token}`,
			numbers: [],
			rangeLabel: ""
		};
		voids.push(value);
	}
	const outside = voids.filter((value) => value < desde || value > hasta);
	if (outside.length > 0) return {
		blank: false,
		error: `Anulados fuera del rango: ${outside.join(", ")}`,
		numbers: [],
		rangeLabel: ""
	};
	const voidSet = new Set(voids);
	const numbers = [];
	for (let n = desde; n <= hasta; n += 1) if (!voidSet.has(n)) numbers.push(n);
	return {
		blank: false,
		numbers,
		rangeLabel: `${desdeRaw}–${hastaRaw}${voids.length > 0 ? ` (anul. ${[...new Set(voids)].join(", ")})` : ""}`
	};
}
function analyzeSite(departure, siteId, rates) {
	const expected = departure.passengers.filter((p) => p.included[siteId]).length;
	const freq = /* @__PURE__ */ new Map();
	const errors = [];
	const ranges = [];
	for (const tramo of departure.sites[siteId].tramos) {
		const parsed = parseTramo(tramo);
		if (parsed.blank) continue;
		if (parsed.error) errors.push(parsed.error);
		if (parsed.rangeLabel) ranges.push(parsed.rangeLabel);
		for (const n of parsed.numbers) freq.set(n, (freq.get(n) ?? 0) + 1);
	}
	const duplicateInside = [...freq.entries()].filter(([, count]) => count > 1).map(([n]) => n);
	if (duplicateInside.length > 0) errors.push(`Repetidos en esta salida: ${duplicateInside.slice(0, 6).join(", ")}`);
	const numbers = [...freq.keys()].sort((a, b) => a - b);
	return {
		siteId,
		expected,
		tickets: numbers.length,
		delta: numbers.length - expected,
		amountCents: siteAmountCents(departure, siteId, rates),
		errors,
		ranges,
		numbers
	};
}
function numerosLabel(departure) {
	if (departure.modo === "grupo") return departure.numeroGrupo.trim() ? `${departure.serie}-${departure.numeroGrupo.trim()}` : departure.serie || "Sin serie";
	const nums = departure.passengers.map((p) => p.numero.trim()).filter(Boolean).sort();
	if (nums.length === 0) return departure.serie || "Sin serie";
	if (nums.length === 1) return `${departure.serie}-${nums[0]}`;
	return `${departure.serie} ${nums[0]}–${nums[nums.length - 1]}`;
}
function analyze(departure, rates, all = []) {
	const sites = SITES.map((site) => analyzeSite(departure, site.id, rates));
	const budget = budgetCents(departure, rates);
	const moneyGapCents = departure.handedAt && departure.cashGiven != null ? toCents(departure.cashGiven) - toCents(departure.cashReturned || 0) - budget : null;
	const quantityOk = sites.every((site) => site.delta === 0 && site.errors.length === 0);
	const moneyOk = moneyGapCents === 0;
	let status = "borrador";
	if (departure.closedAt) status = quantityOk && moneyOk ? "rendido" : "observado";
	else if (departure.handedAt) status = "en_ruta";
	const overlaps = [];
	for (const site of sites) {
		if (site.numbers.length === 0) continue;
		const mine = new Set(site.numbers);
		for (const other of all) {
			if (other.id === departure.id) continue;
			const theirs = analyzeSite(other, site.siteId, rates).numbers;
			for (const n of theirs) if (mine.has(n)) overlaps.push({
				siteId: site.siteId,
				number: n,
				date: other.date,
				guide: other.guide || "Sin guía"
			});
		}
	}
	return {
		budgetCents: budget,
		moneyGapCents,
		sites,
		quantityOk,
		moneyOk,
		status,
		overlaps: overlaps.slice(0, 12),
		numerosLabel: numerosLabel(departure)
	};
}
function issueLabel(analysis) {
	if (analysis.status === "borrador") return "Falta confirmar el efectivo";
	if (analysis.status === "en_ruta") return "Pendiente de rendir tickets";
	if (analysis.status === "rendido") return "Listo para contabilidad";
	const bits = [];
	if (!analysis.quantityOk) bits.push("Tickets no coinciden");
	if (!analysis.moneyOk) bits.push("El monto no cuadra");
	return bits.join(" · ") || "Con diferencia";
}
function categoryBreakdown(departure, siteId, rates) {
	const parts = [];
	for (const category of CATEGORIES) {
		const count = departure.passengers.filter((p) => p.included[siteId] && p.category === category.id).length;
		if (count === 0) continue;
		const price = rates[siteId][category.id];
		parts.push(`${count} ${category.label.toLowerCase()} × ${formatSoles(price)}`);
	}
	return parts.join(" · ");
}
var DENOMS = [
	{
		cents: 2e4,
		label: "200"
	},
	{
		cents: 1e4,
		label: "100"
	},
	{
		cents: 5e3,
		label: "50"
	},
	{
		cents: 2e3,
		label: "20"
	},
	{
		cents: 1e3,
		label: "10"
	},
	{
		cents: 500,
		label: "5"
	},
	{
		cents: 200,
		label: "2"
	},
	{
		cents: 100,
		label: "1"
	}
];
function billSuggestion(cents) {
	if (cents <= 0) return "Sin efectivo";
	let left = cents;
	const parts = [];
	for (const denom of DENOMS) {
		const count = Math.floor(left / denom.cents);
		if (count > 0) {
			parts.push(`${count} × S/ ${denom.label}`);
			left -= count * denom.cents;
		}
	}
	if (left > 0) parts.push(`y ${formatCents(left)} en sencillo`);
	return parts.join(" · ");
}
function moneyGapText(gap) {
	if (gap == null) return "Efectivo sin confirmar";
	if (gap === 0) return "El monto cuadra";
	if (gap > 0) return `El guía debe devolver ${formatCents(gap)}`;
	return `Falta efectivo por ${formatCents(Math.abs(gap))}`;
}
function csvCell(value) {
	const text = String(value);
	if (/[;"\n]/.test(text)) return `"${text.replaceAll("\"", "\"\"")}"`;
	return text;
}
function csvLine(cells) {
	return cells.map(csvCell).join(";");
}
function summaryCsv(rows) {
	return [csvLine([
		"fecha",
		"guia",
		"unidad",
		"serie_ingreso",
		"comprobantes",
		"pasajeros",
		"presupuesto",
		"efectivo_entregado",
		"vuelto",
		"diferencia",
		"tickets_cuadran",
		"estado",
		"nota"
	]), ...rows.map(({ departure, analysis }) => csvLine([
		departure.date,
		departure.guide,
		departure.unit,
		departure.serie,
		analysis.numerosLabel,
		departure.passengers.length,
		(analysis.budgetCents / 100).toFixed(2).replace(".", ","),
		departure.cashGiven == null ? "" : departure.cashGiven.toFixed(2).replace(".", ","),
		(departure.cashReturned || 0).toFixed(2).replace(".", ","),
		analysis.moneyGapCents == null ? "" : (analysis.moneyGapCents / 100).toFixed(2).replace(".", ","),
		analysis.quantityOk ? "si" : "no",
		STATUS_LABEL[analysis.status],
		departure.settlementNote
	]))].join("\n");
}
function detailCsv(rows) {
	const header = csvLine([
		"fecha",
		"guia",
		"serie_ingreso",
		"numero_comprobante",
		"pasajero",
		"categoria",
		"sitio",
		"tarifa",
		"salida"
	]);
	const body = [];
	for (const { departure, rates } of rows) for (const passenger of departure.passengers) {
		const numero = departure.modo === "grupo" ? departure.numeroGrupo : passenger.numero;
		for (const site of SITES) {
			if (!passenger.included[site.id]) continue;
			body.push(csvLine([
				departure.date,
				departure.guide,
				departure.serie,
				numero,
				passenger.name,
				passenger.category,
				site.name,
				rates[site.id][passenger.category].toFixed(2).replace(".", ","),
				departure.id
			]));
		}
	}
	return [header, ...body].join("\n");
}
function downloadText(filename, contents) {
	const blob = new Blob([`\uFEFF${contents}`], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function slug(value) {
	return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
}
function tramo(desde, hasta, anulados = "") {
	return {
		id: uid(),
		desde,
		hasta,
		anulados
	};
}
function pax(name, category, included, numero) {
	return {
		id: uid(),
		name,
		category,
		included,
		numero
	};
}
function makeSeed(rates) {
	const day = todayISO();
	const standard = PRESETS[0].included;
	const completo = PRESETS[1].included;
	const square = normalizeDeparture({
		id: "ej-cuadrado",
		date: day,
		guide: "Rosa Quispe",
		unit: "Sprinter 12",
		caja: "Nilda Flores",
		serie: "B001",
		modo: "pasajero",
		numeroGrupo: "",
		passengers: [
			pax("Ana Beltrán", "general", completo, "1041"),
			pax("Marco Silva", "general", standard, "1042"),
			pax("Lucía Fernández", "estudiante", standard, "1043"),
			pax("Peter Vogel", "general", standard, "1044"),
			pax("Chen Wei", "general", completo, "1045"),
			pax("María Ccahuana", "menor", standard, "1046"),
			pax("José Paredes", "general", standard, "1047"),
			pax("Elena Ruiz", "estudiante", standard, "1048")
		],
		cashGiven: null,
		cashNote: "Entrega en base, antes de salir.",
		handedAt: (/* @__PURE__ */ new Date()).toISOString(),
		sites: {
			andahuaylillas: {
				talonario: "AND",
				nota: "",
				tramos: [tramo("3101", "3108")]
			},
			pucara: {
				talonario: "PUC",
				nota: "",
				tramos: [tramo("4101", "4108")]
			},
			toritos: {
				talonario: "TOR",
				nota: "",
				tramos: [tramo("5101", "5102")]
			},
			raqchi: {
				talonario: "RAQ",
				nota: "",
				tramos: [tramo("6101", "6108")]
			}
		},
		cashReturned: 0,
		settlementNote: "",
		closedAt: (/* @__PURE__ */ new Date()).toISOString(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	square.cashGiven = budgetCents(square, rates) / 100;
	const open = normalizeDeparture({
		id: "ej-ruta",
		date: day,
		guide: "Luis Mamani",
		unit: "Hiace 08",
		caja: "Nilda Flores",
		serie: "B001",
		modo: "grupo",
		numeroGrupo: "1100",
		passengers: [
			pax("Grupo Valle — 1", "general", standard, ""),
			pax("Grupo Valle — 2", "general", standard, ""),
			pax("Grupo Valle — 3", "general", standard, ""),
			pax("Grupo Valle — 4", "estudiante", standard, ""),
			pax("Grupo Valle — 5", "general", {
				...standard,
				toritos: true
			}, "")
		],
		cashGiven: null,
		cashNote: "",
		handedAt: (/* @__PURE__ */ new Date()).toISOString(),
		sites: emptySites(),
		cashReturned: 0,
		settlementNote: "",
		closedAt: null,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	open.cashGiven = budgetCents(open, rates) / 100;
	const observed = normalizeDeparture({
		id: "ej-observado",
		date: day,
		guide: "Rosa Quispe",
		unit: "Sprinter 12",
		caja: "Nilda Flores",
		serie: "B001",
		modo: "pasajero",
		numeroGrupo: "",
		passengers: [
			pax("Claudia Ríos", "general", standard, "1088"),
			pax("Andrés Molina", "general", standard, "1089"),
			pax("Sofía Quispe", "general", standard, "1090"),
			pax("Tom Becker", "general", standard, "1091")
		],
		cashGiven: null,
		cashNote: "",
		handedAt: (/* @__PURE__ */ new Date()).toISOString(),
		sites: {
			andahuaylillas: {
				talonario: "AND",
				nota: "",
				tramos: [tramo("3201", "3204")]
			},
			pucara: {
				talonario: "PUC",
				nota: "",
				tramos: [tramo("4201", "4204")]
			},
			toritos: {
				talonario: "",
				nota: "",
				tramos: [emptyTramo()]
			},
			raqchi: {
				talonario: "RAQ",
				nota: "",
				tramos: [tramo("6201", "6203")]
			}
		},
		cashReturned: 0,
		settlementNote: "Raqchi: 4 pasajeros con entrada incluida y solo 3 tickets. No hubo vuelto.",
		closedAt: (/* @__PURE__ */ new Date()).toISOString(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	});
	observed.cashGiven = budgetCents(observed, rates) / 100;
	return [
		observed,
		open,
		square
	];
}
function mapDeparture(departures, id, updater) {
	return departures.map((departure) => departure.id === id ? updater(departure) : departure);
}
var memoryStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useRuta = create()(persist((set) => ({
	rates: DEFAULT_RATES,
	departures: makeSeed(DEFAULT_RATES),
	setRates: (rates) => set({ rates: normalizeRates(rates) }),
	resetRates: () => set({ rates: DEFAULT_RATES }),
	createDeparture: () => {
		const departure = blankDeparture();
		set((state) => ({ departures: [departure, ...state.departures] }));
		return departure.id;
	},
	updateDeparture: (id, patch) => set((state) => ({ departures: mapDeparture(state.departures, id, (departure) => normalizeDeparture({
		...departure,
		...patch,
		id: departure.id
	})) })),
	removeDeparture: (id) => set((state) => ({ departures: state.departures.filter((departure) => departure.id !== id) })),
	removeExamples: () => set((state) => ({ departures: state.departures.filter((departure) => !departure.id.startsWith("ej-")) })),
	addPassenger: (departureId, input) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => {
		const last = [...departure.passengers].reverse().find((p) => p.numero.trim());
		const numero = input?.numero ?? (departure.modo === "pasajero" && last ? nextNumero(last.numero) : "");
		const passenger = {
			id: uid(),
			name: input?.name?.trim() || `Pasajero ${departure.passengers.length + 1}`,
			category: input?.category ?? "general",
			included: { ...input?.included ?? PRESETS[0].included },
			numero
		};
		return {
			...departure,
			passengers: [...departure.passengers, passenger]
		};
	}) })),
	addPassengers: (departureId, names, category, included, startNumero) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => {
		let numero = startNumero.trim();
		const added = names.map((name) => name.trim()).filter(Boolean).map((name) => {
			const passenger = {
				id: uid(),
				name,
				category,
				included: { ...included },
				numero: departure.modo === "pasajero" ? numero : ""
			};
			if (numero) numero = nextNumero(numero);
			return passenger;
		});
		return {
			...departure,
			passengers: [...departure.passengers, ...added]
		};
	}) })),
	updatePassenger: (departureId, passengerId, patch) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		passengers: departure.passengers.map((passenger) => passenger.id === passengerId ? {
			...passenger,
			...patch
		} : passenger)
	})) })),
	toggleSite: (departureId, passengerId, siteId) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		passengers: departure.passengers.map((passenger) => passenger.id === passengerId ? {
			...passenger,
			included: {
				...passenger.included,
				[siteId]: !passenger.included[siteId]
			}
		} : passenger)
	})) })),
	removePassenger: (departureId, passengerId) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		passengers: departure.passengers.filter((passenger) => passenger.id !== passengerId)
	})) })),
	confirmCash: (departureId, amount, note) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		cashGiven: amount,
		cashNote: note,
		handedAt: departure.handedAt ?? (/* @__PURE__ */ new Date()).toISOString()
	})) })),
	setReturned: (departureId, amount) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		cashReturned: amount
	})) })),
	updateRendition: (departureId, siteId, patch) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		sites: {
			...departure.sites,
			[siteId]: {
				...departure.sites[siteId],
				...patch
			}
		}
	})) })),
	updateTramo: (departureId, siteId, tramoId, patch) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		sites: {
			...departure.sites,
			[siteId]: {
				...departure.sites[siteId],
				tramos: departure.sites[siteId].tramos.map((tramo) => tramo.id === tramoId ? {
					...tramo,
					...patch
				} : tramo)
			}
		}
	})) })),
	addTramo: (departureId, siteId) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		sites: {
			...departure.sites,
			[siteId]: {
				...departure.sites[siteId],
				tramos: [...departure.sites[siteId].tramos, emptyTramo()]
			}
		}
	})) })),
	removeTramo: (departureId, siteId, tramoId) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => {
		const current = departure.sites[siteId].tramos.filter((tramo) => tramo.id !== tramoId);
		return {
			...departure,
			sites: {
				...departure.sites,
				[siteId]: {
					...departure.sites[siteId],
					tramos: current.length > 0 ? current : [emptyTramo()]
				}
			}
		};
	}) })),
	closeSettlement: (departureId, note) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		settlementNote: note,
		closedAt: (/* @__PURE__ */ new Date()).toISOString(),
		handedAt: departure.handedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		cashGiven: departure.cashGiven ?? 0
	})) })),
	reopenSettlement: (departureId) => set((state) => ({ departures: mapDeparture(state.departures, departureId, (departure) => ({
		...departure,
		closedAt: null
	})) }))
}), {
	name: "cuadre-sol-v1",
	storage: createJSONStorage(() => typeof window === "undefined" ? memoryStorage : localStorage),
	skipHydration: true,
	partialize: (state) => ({
		rates: state.rates,
		departures: state.departures
	}),
	merge: (persisted, current) => {
		const saved = persisted;
		if (!saved || !Array.isArray(saved.departures)) return current;
		return {
			...current,
			rates: normalizeRates(saved.rates),
			departures: saved.departures.map((departure) => normalizeDeparture(departure))
		};
	}
}));
function useRutaReady() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		Promise.resolve(useRuta.persist.rehydrate()).finally(() => {
			if (alive) setReady(true);
		});
		return () => {
			alive = false;
		};
	}, []);
	return ready;
}
//#endregion
export { useRutaReady as A, issueLabel as C, summaryCsv as D, slug as E, todayISO as O, formatSoles as S, passengerCents as T, cn as _, Field as a, formatCents as b, Panel as c, Select as d, Shell as f, categoryBreakdown as g, billSuggestion as h, DEFAULT_RATES as i, useRuta as k, SITES as l, analyze as m, Button as n, Input as o, TextArea as p, CATEGORIES as r, PRESETS as s, Badge as t, STATUS_LABEL as u, detailCsv as v, moneyGapText as w, formatDate as x, downloadText as y };
