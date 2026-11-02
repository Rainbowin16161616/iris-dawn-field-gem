import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useRutaReady, C as issueLabel, D as summaryCsv, E as slug, S as formatSoles, T as passengerCents, _ as cn, a as Field, b as formatCents, c as Panel, d as Select, f as Shell, g as categoryBreakdown, h as billSuggestion, k as useRuta, l as SITES, m as analyze, n as Button, o as Input, p as TextArea, r as CATEGORIES, s as PRESETS, t as Badge, u as STATUS_LABEL, v as detailCsv, w as moneyGapText, x as formatDate, y as downloadText } from "./store-Cg5MdMa-.mjs";
import { n as Route } from "./router-_9F-YjbX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/salida._id-DtL0EUZS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Pasajeros",
	"Efectivo",
	"Tickets",
	"Liquidación"
];
function SalidaPage() {
	const ready = useRutaReady();
	const { id } = Route.useParams();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted",
		children: "Cargando la salida…"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Salida, { id });
}
function toneFor(status) {
	if (status === "rendido") return "ok";
	if (status === "observado") return "danger";
	if (status === "en_ruta") return "warn";
	return "neutral";
}
function Salida({ id }) {
	const navigate = useNavigate();
	const departure = useRuta((state) => state.departures.find((item) => item.id === id));
	const departures = useRuta((state) => state.departures);
	const rates = useRuta((state) => state.rates);
	const updateDeparture = useRuta((state) => state.updateDeparture);
	const removeDeparture = useRuta((state) => state.removeDeparture);
	const [step, setStep] = (0, import_react.useState)(0);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	if (!departure) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Esta salida no está"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Puede haberse eliminado en este navegador."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-flex h-11 items-center text-sm font-medium text-accent",
			children: "Volver a salidas"
		})
	] }) });
	const analysis = analyze(departure, rates, departures);
	const guides = [...new Set(departures.map((item) => item.guide.trim()).filter(Boolean))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-print mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-muted hover:text-ink",
				children: "Salidas"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mb-5 flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl tracking-tight",
					children: departure.guide.trim() || "Nueva salida"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: toneFor(analysis.status),
					children: STATUS_LABEL[analysis.status]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted",
				children: issueLabel(analysis)
			})] }), confirmDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setConfirmDelete(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => {
						removeDeparture(departure.id);
						navigate({ to: "/" });
					},
					children: "Confirmar"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => setConfirmDelete(true),
				children: "Eliminar salida"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			className: "no-print mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fecha",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: departure.date,
							onChange: (event) => updateDeparture(departure.id, { date: event.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Guía",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							list: "guias-conocidos",
							value: departure.guide,
							onChange: (event) => updateDeparture(departure.id, { guide: event.target.value }),
							placeholder: "Nombre del guía"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
							id: "guias-conocidos",
							children: guides.map((guide) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: guide }, guide))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Unidad",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: departure.unit,
							onChange: (event) => updateDeparture(departure.id, { unit: event.target.value }),
							placeholder: "Vehículo o grupo"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Responsable de caja",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: departure.caja,
							onChange: (event) => updateDeparture(departure.id, { caja: event.target.value }),
							placeholder: "Quién entrega el efectivo"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Serie de ingreso",
						hint: "La serie del comprobante con el que entró el dinero.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: departure.serie,
							onChange: (event) => updateDeparture(departure.id, { serie: event.target.value.toUpperCase() }),
							placeholder: "B001"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Cómo se facturó",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": departure.modo === "pasajero",
								onClick: () => updateDeparture(departure.id, { modo: "pasajero" }),
								className: cn("h-11 rounded-md text-sm font-medium", departure.modo === "pasajero" ? "bg-accent text-accent-fg" : "border border-line text-muted"),
								children: "Por pasajero"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": departure.modo === "grupo",
								onClick: () => updateDeparture(departure.id, { modo: "grupo" }),
								className: cn("h-11 rounded-md text-sm font-medium", departure.modo === "grupo" ? "bg-accent text-accent-fg" : "border border-line text-muted"),
								children: "Un comprobante"
							})]
						})
					}),
					departure.modo === "grupo" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Número del comprobante",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: departure.numeroGrupo,
							onChange: (event) => updateDeparture(departure.id, { numeroGrupo: event.target.value }),
							placeholder: "1100",
							className: "tabular-nums"
						})
					}) : null
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-print mb-4 grid grid-cols-2 gap-2 md:grid-cols-4",
			children: STEPS.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setStep(index),
				className: cn("h-11 rounded-md px-3 text-sm font-medium", step === index ? "bg-accent text-accent-fg" : "border border-line bg-surface text-muted"),
				children: [
					index + 1,
					". ",
					label
				]
			}, label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mb-4 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					label: "Presupuesto",
					value: formatCents(analysis.budgetCents)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					label: "Efectivo entregado",
					value: departure.cashGiven == null ? "—" : formatCents(Math.round(departure.cashGiven * 100))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
					label: "Diferencia",
					value: analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)
				})
			]
		}),
		step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Passengers, { departure }) : null,
		step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashStep, {
			departure,
			analysis,
			onContinue: () => setStep(2)
		}, departure.id) : null,
		step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tickets, {
			departure,
			analysis
		}) : null,
		step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Liquidacion, {
			departure,
			analysis
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "liquidacion",
			className: step === 3 ? "mt-4" : "sheet-closed",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidacionSheet, {
				departure,
				analysis
			})
		})
	] });
}
function Summary({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "tabular-nums text-lg font-medium text-ink",
			children: value
		})]
	});
}
function Passengers({ departure }) {
	const rates = useRuta((state) => state.rates);
	const addPassenger = useRuta((state) => state.addPassenger);
	const addPassengers = useRuta((state) => state.addPassengers);
	const updatePassenger = useRuta((state) => state.updatePassenger);
	const toggleSite = useRuta((state) => state.toggleSite);
	const removePassenger = useRuta((state) => state.removePassenger);
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("general");
	const [presetId, setPresetId] = (0, import_react.useState)(PRESETS[0].id);
	const [bulk, setBulk] = (0, import_react.useState)("");
	const [startNumero, setStartNumero] = (0, import_react.useState)("");
	const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[0];
	function addOne() {
		addPassenger(departure.id, {
			name,
			category,
			included: preset.included
		});
		setName("");
	}
	function addBulk() {
		addPassengers(departure.id, bulk.split("\n"), category, preset.included, startNumero);
		setBulk("");
		setStartNumero("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Entradas incluidas"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Marca solo lo que ya está pagado en la reserva. Toritos es opcional: si no está incluido, no entra al presupuesto del guía."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: PRESETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": presetId === item.id,
					onClick: () => setPresetId(item.id),
					className: cn("h-11 rounded-md px-3 text-sm font-medium", presetId === item.id ? "bg-accent text-accent-fg" : "border border-line text-muted"),
					children: item.label
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 grid gap-3 md:grid-cols-[1fr_180px_auto]",
				onSubmit: (event) => {
					event.preventDefault();
					addOne();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (event) => setName(event.target.value),
						placeholder: "Nombre del pasajero",
						"aria-label": "Nombre del pasajero"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						"aria-label": "Categoría",
						value: category,
						onChange: (event) => setCategory(event.target.value),
						children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Agregar"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer text-sm font-medium text-accent",
					children: "Cargar una lista"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: bulk,
							onChange: (event) => setBulk(event.target.value),
							placeholder: "Un nombre por línea\nAna Beltrán\nMarco Silva"
						}),
						departure.modo === "pasajero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Primer número de comprobante",
							hint: "Los siguientes correlativos se completan solos.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: startNumero,
								onChange: (event) => setStartNumero(event.target.value),
								placeholder: "1041",
								className: "tabular-nums md:max-w-48"
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: addBulk,
							disabled: !bulk.trim(),
							children: "Agregar lista"
						}) })
					]
				})]
			})
		] }), departure.passengers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Todavía no hay pasajeros. Agrega el grupo para calcular el efectivo."
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[920px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Pasajero"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Categoría"
							}),
							departure.modo === "pasajero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Nº ingreso"
							}) : null,
							SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "px-1 py-2 font-medium",
								children: [site.short, site.optional ? " (opc.)" : ""]
							}, site.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2 font-medium",
								children: "Importe"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "py-2" })
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: departure.passengers.map((passenger) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line last:border-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: passenger.name,
									"aria-label": `Nombre de ${passenger.name}`,
									onChange: (event) => updatePassenger(departure.id, passenger.id, { name: event.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
									"aria-label": `Categoría de ${passenger.name}`,
									value: passenger.category,
									onChange: (event) => updatePassenger(departure.id, passenger.id, { category: event.target.value }),
									children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.label
									}, item.id))
								})
							}),
							departure.modo === "pasajero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: passenger.numero,
									"aria-label": `Comprobante de ${passenger.name}`,
									onChange: (event) => updatePassenger(departure.id, passenger.id, { numero: event.target.value }),
									className: "tabular-nums"
								})
							}) : null,
							SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-1 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteToggle, {
									on: passenger.included[site.id],
									label: passenger.included[site.id] ? "Sí" : "No",
									onClick: () => toggleSite(departure.id, passenger.id, site.id)
								})
							}, site.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2 tabular-nums font-medium",
								children: formatCents(passengerCents(passenger, rates))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => removePassenger(departure.id, passenger.id),
									"aria-label": `Quitar a ${passenger.name}`,
									children: "Quitar"
								})
							})
						]
					}, passenger.id)) })]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3 md:hidden",
			children: departure.passengers.map((passenger) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: passenger.name,
					"aria-label": "Nombre",
					onChange: (event) => updatePassenger(departure.id, passenger.id, { name: event.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						"aria-label": "Categoría",
						value: passenger.category,
						onChange: (event) => updatePassenger(departure.id, passenger.id, { category: event.target.value }),
						children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.label
						}, item.id))
					}), departure.modo === "pasajero" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: passenger.numero,
						"aria-label": "Número de ingreso",
						placeholder: "Nº ingreso",
						onChange: (event) => updatePassenger(departure.id, passenger.id, { numero: event.target.value })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: SITES.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteToggle, {
						on: passenger.included[site.id],
						label: `${site.short}${passenger.included[site.id] ? "" : " — no"}`,
						onClick: () => toggleSite(departure.id, passenger.id, site.id)
					}, site.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums font-medium",
						children: formatCents(passengerCents(passenger, rates))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => removePassenger(departure.id, passenger.id),
						children: "Quitar"
					})]
				})
			] }, passenger.id))
		})] })]
	});
}
function SiteToggle({ on, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: cn("h-11 w-full rounded-md px-2 text-sm font-medium transition-colors", on ? "bg-accent text-accent-fg" : "border border-line bg-background text-muted"),
		children: label
	});
}
function CashStep({ departure, analysis, onContinue }) {
	const rates = useRuta((state) => state.rates);
	const confirmCash = useRuta((state) => state.confirmCash);
	const [amount, setAmount] = (0, import_react.useState)(departure.cashGiven != null ? String(departure.cashGiven) : (analysis.budgetCents / 100).toFixed(2));
	const [note, setNote] = (0, import_react.useState)(departure.cashNote);
	const parsed = Number(amount.replace(",", "."));
	const valid = amount.trim() !== "" && Number.isFinite(parsed) && parsed >= 0;
	const gap = valid ? Math.round(parsed * 100) - analysis.budgetCents : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Presupuesto para el guía"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Este es el efectivo que cubre exactamente las entradas incluidas. No hace falta calcularlo a mano."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line",
				children: analysis.sites.map((site) => {
					const meta = SITES.find((item) => item.id === site.siteId);
					if (!meta || site.expected === 0 && site.amountCents === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium text-ink",
							children: [meta.name, meta.optional ? " · opcional" : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: categoryBreakdown(departure, site.siteId, rates) || "Sin incluidos"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular-nums font-medium",
							children: formatCents(site.amountCents)
						})]
					}, site.siteId);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-end justify-between border-t border-line pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Total a entregar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-faint",
					children: billSuggestion(analysis.budgetCents)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl tabular-nums",
					children: formatCents(analysis.budgetCents)
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Efectivo que sale de caja",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "decimal",
						value: amount,
						onChange: (event) => setAmount(event.target.value),
						className: "tabular-nums"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nota de entrega",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: note,
						onChange: (event) => setNote(event.target.value),
						placeholder: "Sobre, hora, quién contó"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-sm", gap === 0 ? "text-ok" : "text-warn"),
				children: gap == null ? "Escribe el monto entregado." : gap === 0 ? "Coincide con el presupuesto." : gap > 0 ? `Sale ${formatCents(gap)} de más respecto a las entradas incluidas.` : `Faltan ${formatCents(Math.abs(gap))} para cubrir las entradas.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: !valid,
					onClick: () => {
						confirmCash(departure.id, parsed, note);
						onContinue();
					},
					children: departure.handedAt ? "Actualizar y seguir a tickets" : "Confirmar entrega"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setAmount((analysis.budgetCents / 100).toFixed(2)),
					children: "Usar el presupuesto"
				})]
			})
		] })]
	});
}
function Tickets({ departure, analysis }) {
	const setReturned = useRuta((state) => state.setReturned);
	const updateRendition = useRuta((state) => state.updateRendition);
	const updateTramo = useRuta((state) => state.updateTramo);
	const addTramo = useRuta((state) => state.addTramo);
	const removeTramo = useRuta((state) => state.removeTramo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print space-y-4",
		children: [
			!departure.handedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-warn",
				children: "Aún no confirmas la entrega de efectivo. Puedes anotar tickets, pero el cuadre de monto queda abierto."
			}) }) : null,
			analysis.overlaps.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-danger",
				children: [
					"Hay tickets repetidos en otra salida:",
					" ",
					analysis.overlaps.map((item) => `${SITES.find((site) => site.id === item.siteId)?.short} ${item.number} (${formatDate(item.date)}, ${item.guide})`).join(" · ")
				]
			}) }) : null,
			SITES.map((site) => {
				const siteAnalysis = analysis.sites.find((item) => item.siteId === site.id);
				if (!siteAnalysis) return null;
				const ok = siteAnalysis.delta === 0 && siteAnalysis.errors.length === 0;
				const idle = siteAnalysis.expected === 0 && siteAnalysis.tickets === 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-2xl",
							children: [site.name, site.optional ? " · opcional" : ""]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								siteAnalysis.expected,
								" incluidos · ",
								formatCents(siteAnalysis.amountCents)
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: idle ? "neutral" : ok ? "ok" : "danger",
							children: idle ? "Sin movimiento" : ok ? `${siteAnalysis.tickets} tickets` : `${siteAnalysis.tickets} tickets / ${siteAnalysis.expected} incluidos`
						})]
					}),
					siteAnalysis.expected > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: departure.passengers.filter((passenger) => passenger.included[site.id]).map((passenger) => passenger.name).join(" · ")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 max-w-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Talonario del sitio",
							hint: "Serie física del ticket, distinta de la serie de ingreso.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: departure.sites[site.id].talonario,
								onChange: (event) => updateRendition(departure.id, site.id, { talonario: event.target.value }),
								placeholder: "AND, RAQ…"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: departure.sites[site.id].tramos.map((tramo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: index === 0 ? "Desde" : "Desde",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "numeric",
										value: tramo.desde,
										onChange: (event) => updateTramo(departure.id, site.id, tramo.id, { desde: event.target.value }),
										className: "tabular-nums",
										placeholder: "3101"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Hasta",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "numeric",
										value: tramo.hasta,
										onChange: (event) => updateTramo(departure.id, site.id, tramo.id, { hasta: event.target.value }),
										className: "tabular-nums",
										placeholder: "3108"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Anulados",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: tramo.anulados,
										onChange: (event) => updateTramo(departure.id, site.id, tramo.id, { anulados: event.target.value }),
										placeholder: "3104, 3106"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => removeTramo(departure.id, site.id, tramo.id),
										"aria-label": "Quitar tramo",
										children: "Quitar"
									})
								})
							]
						}, tramo.id))
					}),
					siteAnalysis.errors.map((error) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-danger",
						children: error
					}, error)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => addTramo(departure.id, site.id),
							children: "Otro tramo"
						})
					})
				] }, site.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Vuelto que devuelve el guía",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					inputMode: "decimal",
					className: "tabular-nums md:max-w-xs",
					value: String(departure.cashReturned || ""),
					onChange: (event) => {
						const raw = event.target.value.replace(",", ".");
						const value = raw === "" ? 0 : Number(raw);
						if (Number.isFinite(value) && value >= 0) setReturned(departure.id, value);
					},
					placeholder: "0.00"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-ink",
				children: moneyGapText(analysis.moneyGapCents)
			})] })
		]
	});
}
function Liquidacion({ departure, analysis }) {
	const closeSettlement = useRuta((state) => state.closeSettlement);
	const reopenSettlement = useRuta((state) => state.reopenSettlement);
	const [note, setNote] = (0, import_react.useState)(departure.settlementNote);
	const square = analysis.quantityOk && analysis.moneyOk && departure.handedAt;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-print space-y-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Cierre"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-ink",
				children: analysis.quantityOk ? moneyGapText(analysis.moneyGapCents) : "Los tickets no coinciden con los incluidos. Aunque el efectivo cuadre con las reservas, contabilidad no tiene sustento físico."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm",
				children: analysis.sites.filter((site) => site.expected > 0 || site.tickets > 0).map((site) => {
					const meta = SITES.find((item) => item.id === site.siteId);
					const ok = site.delta === 0 && site.errors.length === 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: ok ? "text-ok" : "text-danger",
						children: [
							meta?.short,
							": ",
							site.tickets,
							" tickets para ",
							site.expected,
							" incluidos",
							site.ranges.length > 0 ? ` · ${site.ranges.join(", ")}` : ""
						]
					}, site.siteId);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nota para contabilidad",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						value: note,
						onChange: (event) => setNote(event.target.value)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					departure.closedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => reopenSettlement(departure.id),
						children: "Reabrir"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => closeSettlement(departure.id, note),
						disabled: !departure.handedAt && analysis.budgetCents > 0,
						children: square ? "Cerrar cuadrado" : "Cerrar con observación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => window.print(),
						children: "Imprimir liquidación"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => downloadText(`liquidacion-${departure.date}-${slug(departure.guide || "guia")}.csv`, summaryCsv([{
							departure,
							analysis
						}])),
						children: "CSV de la salida"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => downloadText(`detalle-${departure.date}-${slug(departure.guide || "guia")}.csv`, detailCsv([{
							departure,
							rates: useRuta.getState().rates
						}])),
						children: "CSV por pasajero"
					})
				]
			})
		] })
	});
}
function LiquidacionSheet({ departure, analysis }) {
	const rates = useRuta((state) => state.rates);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: "liquidacion",
		className: "rounded-3xl border border-line bg-surface p-5 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted",
				children: "LIQUIDACIÓN DE ENTRADAS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Ruta del Sol"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					formatDate(departure.date),
					" · ",
					departure.guide || "Sin guía",
					departure.unit ? ` · ${departure.unit}` : "",
					" · Caja: ",
					departure.caja || "—"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm",
				children: [
					"Sustento de ingreso: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: analysis.numerosLabel }),
					departure.modo === "grupo" ? " (un comprobante para el grupo)" : " (un número por pasajero)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-4 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Pasajero"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Comprobante"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Incluye"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-medium",
							children: "Importe"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: departure.passengers.map((passenger) => {
					const numero = departure.modo === "grupo" ? departure.numeroGrupo : passenger.numero;
					const sites = SITES.filter((site) => passenger.included[site.id]).map((site) => site.short);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 pr-2",
								children: [passenger.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-faint",
									children: CATEGORIES.find((item) => item.id === passenger.category)?.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 pr-2 tabular-nums",
								children: [
									departure.serie,
									"-",
									numero || "s/n"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: sites.join(", ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: formatCents(passengerCents(passenger, rates))
							})
						]
					}, passenger.id);
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-6 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Sitio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Talonario"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Tickets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Cantidad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 text-right font-medium",
							children: "Según reserva"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: analysis.sites.map((site) => {
					const meta = SITES.find((item) => item.id === site.siteId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: meta?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: departure.sites[site.siteId].talonario || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 pr-2",
								children: site.ranges.join(", ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 pr-2 tabular-nums",
								children: [
									site.tickets,
									"/",
									site.expected
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 text-right tabular-nums",
								children: formatCents(site.amountCents)
							})
						]
					}, site.siteId);
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid gap-2 text-sm md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4 border-b border-line py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Presupuesto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: formatCents(analysis.budgetCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4 border-b border-line py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Efectivo entregado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: departure.cashGiven == null ? "—" : formatSoles(departure.cashGiven)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4 border-b border-line py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Vuelto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: formatSoles(departure.cashReturned || 0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4 border-b border-line py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Diferencia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: analysis.moneyGapCents == null ? "—" : formatCents(analysis.moneyGapCents)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm font-medium",
				children: [
					STATUS_LABEL[analysis.status],
					".",
					" ",
					analysis.quantityOk ? moneyGapText(analysis.moneyGapCents) : `Tickets incompletos. ${moneyGapText(analysis.moneyGapCents)}.`
				]
			}),
			departure.settlementNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: departure.settlementNote
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 text-sm text-muted sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Caja",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"________________"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Guía",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"________________"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Contabilidad",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"________________"
					] })
				]
			})
		]
	});
}
//#endregion
export { SalidaPage as component };
