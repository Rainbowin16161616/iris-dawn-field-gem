export const SITES = [
  {
    id: "andahuaylillas",
    name: "Capilla de Andahuaylillas",
    short: "Andahuaylillas",
    optional: false,
  },
  {
    id: "pucara",
    name: "Museo Lítico Pucará",
    short: "Pucará",
    optional: false,
  },
  {
    id: "toritos",
    name: "Taller de Toritos",
    short: "Toritos",
    optional: true,
  },
  {
    id: "raqchi",
    name: "Ingreso a Raqchi",
    short: "Raqchi",
    optional: false,
  },
] as const;

export type SiteId = (typeof SITES)[number]["id"];

export const CATEGORIES = [
  { id: "general", label: "General" },
  { id: "estudiante", label: "Estudiante" },
  { id: "menor", label: "Menor" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type Rates = Record<SiteId, Record<CategoryId, number>>;

export type Included = Record<SiteId, boolean>;

export type Passenger = {
  id: string;
  name: string;
  category: CategoryId;
  included: Included;
  numero: string;
};

export type TicketTramo = {
  id: string;
  desde: string;
  hasta: string;
  anulados: string;
};

export type SiteRendition = {
  talonario: string;
  nota: string;
  tramos: TicketTramo[];
};

export type Departure = {
  id: string;
  date: string;
  guide: string;
  unit: string;
  caja: string;
  serie: string;
  modo: "grupo" | "pasajero";
  numeroGrupo: string;
  passengers: Passenger[];
  cashGiven: number | null;
  cashNote: string;
  handedAt: string | null;
  sites: Record<SiteId, SiteRendition>;
  cashReturned: number;
  settlementNote: string;
  closedAt: string | null;
  createdAt: string;
};

export type Status = "borrador" | "en_ruta" | "rendido" | "observado";

export const STATUS_LABEL: Record<Status, string> = {
  borrador: "Borrador",
  en_ruta: "En ruta",
  rendido: "Cuadrado",
  observado: "Con diferencia",
};

export const DEFAULT_RATES: Rates = {
  andahuaylillas: { general: 15, estudiante: 10, menor: 0 },
  pucara: { general: 5, estudiante: 3, menor: 0 },
  toritos: { general: 5, estudiante: 5, menor: 0 },
  raqchi: { general: 20, estudiante: 10, menor: 8 },
};

export const PRESETS: { id: string; label: string; included: Included }[] = [
  {
    id: "estandar",
    label: "Estándar, sin toritos",
    included: {
      andahuaylillas: true,
      pucara: true,
      toritos: false,
      raqchi: true,
    },
  },
  {
    id: "completo",
    label: "Completo",
    included: {
      andahuaylillas: true,
      pucara: true,
      toritos: true,
      raqchi: true,
    },
  },
  {
    id: "raqchi",
    label: "Solo Raqchi",
    included: {
      andahuaylillas: false,
      pucara: false,
      toritos: false,
      raqchi: true,
    },
  },
  {
    id: "capilla",
    label: "Solo capilla",
    included: {
      andahuaylillas: true,
      pucara: false,
      toritos: false,
      raqchi: false,
    },
  },
];

export function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
}

export function todayISO(): string {
  const n = new Date();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${n.getFullYear()}-${m}-${d}`;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

export function toCents(soles: number): number {
  if (!Number.isFinite(soles)) return 0;
  return Math.round(soles * 100);
}

export function formatSoles(soles: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  }).format(soles);
}

export function formatCents(cents: number): string {
  return formatSoles(cents / 100);
}

export function emptyIncluded(value = false): Included {
  return {
    andahuaylillas: value,
    pucara: value,
    toritos: false,
    raqchi: value,
  };
}

export function emptyTramo(): TicketTramo {
  return { id: uid(), desde: "", hasta: "", anulados: "" };
}

export function emptySites(): Record<SiteId, SiteRendition> {
  return {
    andahuaylillas: { talonario: "", nota: "", tramos: [emptyTramo()] },
    pucara: { talonario: "", nota: "", tramos: [emptyTramo()] },
    toritos: { talonario: "", nota: "", tramos: [emptyTramo()] },
    raqchi: { talonario: "", nota: "", tramos: [emptyTramo()] },
  };
}

export function siteById(id: SiteId) {
  return SITES.find((s) => s.id === id) ?? SITES[0];
}

export function isCategory(value: string): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function normalizeRates(raw: unknown): Rates {
  const out: Rates = {
    andahuaylillas: { ...DEFAULT_RATES.andahuaylillas },
    pucara: { ...DEFAULT_RATES.pucara },
    toritos: { ...DEFAULT_RATES.toritos },
    raqchi: { ...DEFAULT_RATES.raqchi },
  };
  if (!raw || typeof raw !== "object") return out;
  const source = raw as Partial<Rates>;
  for (const site of SITES) {
    const row = source[site.id];
    if (!row) continue;
    for (const category of CATEGORIES) {
      const value = row[category.id];
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        out[site.id][category.id] = Math.round(value * 100) / 100;
      }
    }
  }
  return out;
}

function normalizePassenger(raw: Partial<Passenger> | undefined): Passenger {
  const included = emptyIncluded(false);
  for (const site of SITES) {
    if (raw?.included?.[site.id]) included[site.id] = true;
  }
  const category = raw?.category && isCategory(raw.category) ? raw.category : "general";
  return {
    id: raw?.id || uid(),
    name: raw?.name ?? "",
    category,
    included,
    numero: raw?.numero ?? "",
  };
}

export function normalizeDeparture(raw: Departure): Departure {
  const sites = emptySites();
  for (const site of SITES) {
    const existing = raw.sites?.[site.id];
    sites[site.id] = {
      talonario: existing?.talonario ?? "",
      nota: existing?.nota ?? "",
      tramos:
        existing?.tramos && existing.tramos.length > 0
          ? existing.tramos.map((tramo) => ({
              id: tramo.id || uid(),
              desde: String(tramo.desde ?? ""),
              hasta: String(tramo.hasta ?? ""),
              anulados: String(tramo.anulados ?? ""),
            }))
          : [emptyTramo()],
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
    cashGiven:
      raw.cashGiven == null || !Number.isFinite(raw.cashGiven) ? null : raw.cashGiven,
    cashNote: raw.cashNote ?? "",
    handedAt: raw.handedAt ?? null,
    sites,
    cashReturned: Number.isFinite(raw.cashReturned) ? raw.cashReturned : 0,
    settlementNote: raw.settlementNote ?? "",
    closedAt: raw.closedAt ?? null,
    createdAt: raw.createdAt || new Date().toISOString(),
  };
}

export function blankDeparture(): Departure {
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
    createdAt: new Date().toISOString(),
  });
}

export function nextNumero(current: string): string {
  const match = current.trim().match(/^(.*?)(\d+)$/);
  if (!match) return "";
  const [, prefix, digits] = match;
  const next = String(Number(digits) + 1).padStart(digits.length, "0");
  return `${prefix ?? ""}${next}`;
}

export function passengerCents(passenger: Passenger, rates: Rates): number {
  let cents = 0;
  for (const site of SITES) {
    if (passenger.included[site.id]) {
      cents += toCents(rates[site.id][passenger.category]);
    }
  }
  return cents;
}

export function budgetCents(departure: Departure, rates: Rates): number {
  return departure.passengers.reduce(
    (sum, passenger) => sum + passengerCents(passenger, rates),
    0,
  );
}

export function siteAmountCents(
  departure: Departure,
  siteId: SiteId,
  rates: Rates,
): number {
  return departure.passengers.reduce((sum, passenger) => {
    if (!passenger.included[siteId]) return sum;
    return sum + toCents(rates[siteId][passenger.category]);
  }, 0);
}

type ParsedTramo = {
  blank: boolean;
  error?: string;
  numbers: number[];
  rangeLabel: string;
};

function parseToken(token: string): number | null {
  const clean = token.trim();
  if (!/^\d+$/.test(clean)) return null;
  const value = Number(clean);
  if (!Number.isSafeInteger(value)) return null;
  return value;
}

export function parseTramo(tramo: TicketTramo): ParsedTramo {
  const desdeRaw = tramo.desde.trim();
  const hastaRaw = tramo.hasta.trim();
  const anuladosRaw = tramo.anulados.trim();
  if (!desdeRaw && !hastaRaw && !anuladosRaw) {
    return { blank: true, numbers: [], rangeLabel: "" };
  }
  if (!desdeRaw || !hastaRaw) {
    return {
      blank: false,
      error: "Completa el ticket desde y hasta",
      numbers: [],
      rangeLabel: "",
    };
  }
  const desde = parseToken(desdeRaw);
  const hasta = parseToken(hastaRaw);
  if (desde == null || hasta == null) {
    return {
      blank: false,
      error: "Los tickets deben ser numéricos",
      numbers: [],
      rangeLabel: "",
    };
  }
  if (hasta < desde) {
    return {
      blank: false,
      error: "El ticket hasta es menor que el desde",
      numbers: [],
      rangeLabel: "",
    };
  }
  const span = hasta - desde + 1;
  if (span > 400) {
    return {
      blank: false,
      error: "El rango supera 400 tickets",
      numbers: [],
      rangeLabel: "",
    };
  }
  const voidTokens = anuladosRaw.split(/[\s,;]+/).filter(Boolean);
  const voids: number[] = [];
  for (const token of voidTokens) {
    const value = parseToken(token);
    if (value == null) {
      return {
        blank: false,
        error: `Anulado no numérico: ${token}`,
        numbers: [],
        rangeLabel: "",
      };
    }
    voids.push(value);
  }
  const outside = voids.filter((value) => value < desde || value > hasta);
  if (outside.length > 0) {
    return {
      blank: false,
      error: `Anulados fuera del rango: ${outside.join(", ")}`,
      numbers: [],
      rangeLabel: "",
    };
  }
  const voidSet = new Set(voids);
  const numbers: number[] = [];
  for (let n = desde; n <= hasta; n += 1) {
    if (!voidSet.has(n)) numbers.push(n);
  }
  const label = `${desdeRaw}–${hastaRaw}${
    voids.length > 0 ? ` (anul. ${[...new Set(voids)].join(", ")})` : ""
  }`;
  return { blank: false, numbers, rangeLabel: label };
}

export type SiteAnalysis = {
  siteId: SiteId;
  expected: number;
  tickets: number;
  delta: number;
  amountCents: number;
  errors: string[];
  ranges: string[];
  numbers: number[];
};

export type Overlap = {
  siteId: SiteId;
  number: number;
  date: string;
  guide: string;
};

export type DepartureAnalysis = {
  budgetCents: number;
  moneyGapCents: number | null;
  sites: SiteAnalysis[];
  quantityOk: boolean;
  moneyOk: boolean;
  status: Status;
  overlaps: Overlap[];
  numerosLabel: string;
};

export function analyzeSite(
  departure: Departure,
  siteId: SiteId,
  rates: Rates,
): SiteAnalysis {
  const expected = departure.passengers.filter((p) => p.included[siteId]).length;
  const freq = new Map<number, number>();
  const errors: string[] = [];
  const ranges: string[] = [];
  for (const tramo of departure.sites[siteId].tramos) {
    const parsed = parseTramo(tramo);
    if (parsed.blank) continue;
    if (parsed.error) errors.push(parsed.error);
    if (parsed.rangeLabel) ranges.push(parsed.rangeLabel);
    for (const n of parsed.numbers) freq.set(n, (freq.get(n) ?? 0) + 1);
  }
  const duplicateInside = [...freq.entries()]
    .filter(([, count]) => count > 1)
    .map(([n]) => n);
  if (duplicateInside.length > 0) {
    errors.push(`Repetidos en esta salida: ${duplicateInside.slice(0, 6).join(", ")}`);
  }
  const numbers = [...freq.keys()].sort((a, b) => a - b);
  return {
    siteId,
    expected,
    tickets: numbers.length,
    delta: numbers.length - expected,
    amountCents: siteAmountCents(departure, siteId, rates),
    errors,
    ranges,
    numbers,
  };
}

function numerosLabel(departure: Departure): string {
  if (departure.modo === "grupo") {
    return departure.numeroGrupo.trim()
      ? `${departure.serie}-${departure.numeroGrupo.trim()}`
      : departure.serie || "Sin serie";
  }
  const nums = departure.passengers
    .map((p) => p.numero.trim())
    .filter(Boolean)
    .sort();
  if (nums.length === 0) return departure.serie || "Sin serie";
  if (nums.length === 1) return `${departure.serie}-${nums[0]}`;
  return `${departure.serie} ${nums[0]}–${nums[nums.length - 1]}`;
}

export function analyze(
  departure: Departure,
  rates: Rates,
  all: Departure[] = [],
): DepartureAnalysis {
  const sites = SITES.map((site) => analyzeSite(departure, site.id, rates));
  const budget = budgetCents(departure, rates);
  const moneyGapCents =
    departure.handedAt && departure.cashGiven != null
      ? toCents(departure.cashGiven) - toCents(departure.cashReturned || 0) - budget
      : null;
  const quantityOk = sites.every(
    (site) => site.delta === 0 && site.errors.length === 0,
  );
  const moneyOk = moneyGapCents === 0;
  let status: Status = "borrador";
  if (departure.closedAt) status = quantityOk && moneyOk ? "rendido" : "observado";
  else if (departure.handedAt) status = "en_ruta";

  const overlaps: Overlap[] = [];
  for (const site of sites) {
    if (site.numbers.length === 0) continue;
    const mine = new Set(site.numbers);
    for (const other of all) {
      if (other.id === departure.id) continue;
      const theirs = analyzeSite(other, site.siteId, rates).numbers;
      for (const n of theirs) {
        if (mine.has(n)) {
          overlaps.push({
            siteId: site.siteId,
            number: n,
            date: other.date,
            guide: other.guide || "Sin guía",
          });
        }
      }
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
    numerosLabel: numerosLabel(departure),
  };
}

export function issueLabel(analysis: DepartureAnalysis): string {
  if (analysis.status === "borrador") return "Falta confirmar el efectivo";
  if (analysis.status === "en_ruta") return "Pendiente de rendir tickets";
  if (analysis.status === "rendido") return "Listo para contabilidad";
  const bits: string[] = [];
  if (!analysis.quantityOk) bits.push("Tickets no coinciden");
  if (!analysis.moneyOk) bits.push("El monto no cuadra");
  return bits.join(" · ") || "Con diferencia";
}

export function categoryBreakdown(
  departure: Departure,
  siteId: SiteId,
  rates: Rates,
): string {
  const parts: string[] = [];
  for (const category of CATEGORIES) {
    const count = departure.passengers.filter(
      (p) => p.included[siteId] && p.category === category.id,
    ).length;
    if (count === 0) continue;
    const price = rates[siteId][category.id];
    parts.push(
      `${count} ${category.label.toLowerCase()} × ${formatSoles(price)}`,
    );
  }
  return parts.join(" · ");
}

const DENOMS: { cents: number; label: string }[] = [
  { cents: 20000, label: "200" },
  { cents: 10000, label: "100" },
  { cents: 5000, label: "50" },
  { cents: 2000, label: "20" },
  { cents: 1000, label: "10" },
  { cents: 500, label: "5" },
  { cents: 200, label: "2" },
  { cents: 100, label: "1" },
];

export function billSuggestion(cents: number): string {
  if (cents <= 0) return "Sin efectivo";
  let left = cents;
  const parts: string[] = [];
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

export function moneyGapText(gap: number | null): string {
  if (gap == null) return "Efectivo sin confirmar";
  if (gap === 0) return "El monto cuadra";
  if (gap > 0) return `El guía debe devolver ${formatCents(gap)}`;
  return `Falta efectivo por ${formatCents(Math.abs(gap))}`;
}

function csvCell(value: string | number): string {
  const text = String(value);
  if (/[;"\n]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function csvLine(cells: (string | number)[]): string {
  return cells.map(csvCell).join(";");
}

export function summaryCsv(rows: { departure: Departure; analysis: DepartureAnalysis }[]): string {
  const header = csvLine([
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
    "nota",
  ]);
  const body = rows.map(({ departure, analysis }) =>
    csvLine([
      departure.date,
      departure.guide,
      departure.unit,
      departure.serie,
      analysis.numerosLabel,
      departure.passengers.length,
      (analysis.budgetCents / 100).toFixed(2).replace(".", ","),
      departure.cashGiven == null
        ? ""
        : departure.cashGiven.toFixed(2).replace(".", ","),
      (departure.cashReturned || 0).toFixed(2).replace(".", ","),
      analysis.moneyGapCents == null
        ? ""
        : (analysis.moneyGapCents / 100).toFixed(2).replace(".", ","),
      analysis.quantityOk ? "si" : "no",
      STATUS_LABEL[analysis.status],
      departure.settlementNote,
    ]),
  );
  return [header, ...body].join("\n");
}

export function detailCsv(rows: { departure: Departure; rates: Rates }[]): string {
  const header = csvLine([
    "fecha",
    "guia",
    "serie_ingreso",
    "numero_comprobante",
    "pasajero",
    "categoria",
    "sitio",
    "tarifa",
    "salida",
  ]);
  const body: string[] = [];
  for (const { departure, rates } of rows) {
    for (const passenger of departure.passengers) {
      const numero =
        departure.modo === "grupo" ? departure.numeroGrupo : passenger.numero;
      for (const site of SITES) {
        if (!passenger.included[site.id]) continue;
        body.push(
          csvLine([
            departure.date,
            departure.guide,
            departure.serie,
            numero,
            passenger.name,
            passenger.category,
            site.name,
            rates[site.id][passenger.category].toFixed(2).replace(".", ","),
            departure.id,
          ]),
        );
      }
    }
  }
  return [header, ...body].join("\n");
}

export function downloadText(filename: string, contents: string) {
  const blob = new Blob([`\uFEFF${contents}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

function tramo(desde: string, hasta: string, anulados = ""): TicketTramo {
  return { id: uid(), desde, hasta, anulados };
}

function pax(
  name: string,
  category: CategoryId,
  included: Included,
  numero: string,
): Passenger {
  return { id: uid(), name, category, included, numero };
}

export function makeSeed(rates: Rates): Departure[] {
  const day = todayISO();
  const standard = PRESETS[0].included;
  const completo = PRESETS[1].included;

  const squarePassengers: Passenger[] = [
    pax("Ana Beltrán", "general", completo, "1041"),
    pax("Marco Silva", "general", standard, "1042"),
    pax("Lucía Fernández", "estudiante", standard, "1043"),
    pax("Peter Vogel", "general", standard, "1044"),
    pax("Chen Wei", "general", completo, "1045"),
    pax("María Ccahuana", "menor", standard, "1046"),
    pax("José Paredes", "general", standard, "1047"),
    pax("Elena Ruiz", "estudiante", standard, "1048"),
  ];

  const square: Departure = normalizeDeparture({
    id: "ej-cuadrado",
    date: day,
    guide: "Rosa Quispe",
    unit: "Sprinter 12",
    caja: "Nilda Flores",
    serie: "B001",
    modo: "pasajero",
    numeroGrupo: "",
    passengers: squarePassengers,
    cashGiven: null,
    cashNote: "Entrega en base, antes de salir.",
    handedAt: new Date().toISOString(),
    sites: {
      andahuaylillas: {
        talonario: "AND",
        nota: "",
        tramos: [tramo("3101", "3108")],
      },
      pucara: { talonario: "PUC", nota: "", tramos: [tramo("4101", "4108")] },
      toritos: { talonario: "TOR", nota: "", tramos: [tramo("5101", "5102")] },
      raqchi: { talonario: "RAQ", nota: "", tramos: [tramo("6101", "6108")] },
    },
    cashReturned: 0,
    settlementNote: "",
    closedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });
  square.cashGiven = budgetCents(square, rates) / 100;

  const openPassengers: Passenger[] = [
    pax("Grupo Valle — 1", "general", standard, ""),
    pax("Grupo Valle — 2", "general", standard, ""),
    pax("Grupo Valle — 3", "general", standard, ""),
    pax("Grupo Valle — 4", "estudiante", standard, ""),
    pax("Grupo Valle — 5", "general", { ...standard, toritos: true }, ""),
  ];
  const open: Departure = normalizeDeparture({
    id: "ej-ruta",
    date: day,
    guide: "Luis Mamani",
    unit: "Hiace 08",
    caja: "Nilda Flores",
    serie: "B001",
    modo: "grupo",
    numeroGrupo: "1100",
    passengers: openPassengers,
    cashGiven: null,
    cashNote: "",
    handedAt: new Date().toISOString(),
    sites: emptySites(),
    cashReturned: 0,
    settlementNote: "",
    closedAt: null,
    createdAt: new Date().toISOString(),
  });
  open.cashGiven = budgetCents(open, rates) / 100;

  const observedPassengers: Passenger[] = [
    pax("Claudia Ríos", "general", standard, "1088"),
    pax("Andrés Molina", "general", standard, "1089"),
    pax("Sofía Quispe", "general", standard, "1090"),
    pax("Tom Becker", "general", standard, "1091"),
  ];
  const observed: Departure = normalizeDeparture({
    id: "ej-observado",
    date: day,
    guide: "Rosa Quispe",
    unit: "Sprinter 12",
    caja: "Nilda Flores",
    serie: "B001",
    modo: "pasajero",
    numeroGrupo: "",
    passengers: observedPassengers,
    cashGiven: null,
    cashNote: "",
    handedAt: new Date().toISOString(),
    sites: {
      andahuaylillas: {
        talonario: "AND",
        nota: "",
        tramos: [tramo("3201", "3204")],
      },
      pucara: { talonario: "PUC", nota: "", tramos: [tramo("4201", "4204")] },
      toritos: { talonario: "", nota: "", tramos: [emptyTramo()] },
      raqchi: { talonario: "RAQ", nota: "", tramos: [tramo("6201", "6203")] },
    },
    cashReturned: 0,
    settlementNote:
      "Raqchi: 4 pasajeros con entrada incluida y solo 3 tickets. No hubo vuelto.",
    closedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });
  observed.cashGiven = budgetCents(observed, rates) / 100;

  return [observed, open, square];
}
