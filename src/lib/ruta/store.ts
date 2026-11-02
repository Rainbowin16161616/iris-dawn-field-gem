import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import {
  blankDeparture,
  DEFAULT_RATES,
  emptyTramo,
  makeSeed,
  nextNumero,
  normalizeDeparture,
  normalizeRates,
  PRESETS,
  type CategoryId,
  type Departure,
  type Included,
  type Passenger,
  type Rates,
  type SiteId,
  uid,
} from "@/lib/ruta/domain";

type RutaState = {
  rates: Rates;
  departures: Departure[];
  setRates: (rates: Rates) => void;
  resetRates: () => void;
  createDeparture: () => string;
  updateDeparture: (id: string, patch: Partial<Departure>) => void;
  removeDeparture: (id: string) => void;
  removeExamples: () => void;
  addPassenger: (
    departureId: string,
    input?: { name?: string; category?: CategoryId; included?: Included; numero?: string },
  ) => void;
  addPassengers: (
    departureId: string,
    names: string[],
    category: CategoryId,
    included: Included,
    startNumero: string,
  ) => void;
  updatePassenger: (
    departureId: string,
    passengerId: string,
    patch: Partial<Omit<Passenger, "id" | "included">> & { included?: Included },
  ) => void;
  toggleSite: (departureId: string, passengerId: string, siteId: SiteId) => void;
  removePassenger: (departureId: string, passengerId: string) => void;
  confirmCash: (departureId: string, amount: number, note: string) => void;
  setReturned: (departureId: string, amount: number) => void;
  updateRendition: (
    departureId: string,
    siteId: SiteId,
    patch: Partial<{ talonario: string; nota: string }>,
  ) => void;
  updateTramo: (
    departureId: string,
    siteId: SiteId,
    tramoId: string,
    patch: Partial<{ desde: string; hasta: string; anulados: string }>,
  ) => void;
  addTramo: (departureId: string, siteId: SiteId) => void;
  removeTramo: (departureId: string, siteId: SiteId, tramoId: string) => void;
  closeSettlement: (departureId: string, note: string) => void;
  reopenSettlement: (departureId: string) => void;
};

function mapDeparture(
  departures: Departure[],
  id: string,
  updater: (departure: Departure) => Departure,
): Departure[] {
  return departures.map((departure) =>
    departure.id === id ? updater(departure) : departure,
  );
}

const memoryStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useRuta = create<RutaState>()(
  persist(
    (set) => ({
      rates: DEFAULT_RATES,
      departures: makeSeed(DEFAULT_RATES),
      setRates: (rates) => set({ rates: normalizeRates(rates) }),
      resetRates: () => set({ rates: DEFAULT_RATES }),
      createDeparture: () => {
        const departure = blankDeparture();
        set((state) => ({ departures: [departure, ...state.departures] }));
        return departure.id;
      },
      updateDeparture: (id, patch) =>
        set((state) => ({
          departures: mapDeparture(state.departures, id, (departure) =>
            normalizeDeparture({ ...departure, ...patch, id: departure.id }),
          ),
        })),
      removeDeparture: (id) =>
        set((state) => ({
          departures: state.departures.filter((departure) => departure.id !== id),
        })),
      removeExamples: () =>
        set((state) => ({
          departures: state.departures.filter(
            (departure) => !departure.id.startsWith("ej-"),
          ),
        })),
      addPassenger: (departureId, input) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => {
            const last = [...departure.passengers].reverse().find((p) => p.numero.trim());
            const numero =
              input?.numero ??
              (departure.modo === "pasajero" && last ? nextNumero(last.numero) : "");
            const passenger: Passenger = {
              id: uid(),
              name: input?.name?.trim() || `Pasajero ${departure.passengers.length + 1}`,
              category: input?.category ?? "general",
              included: { ...(input?.included ?? PRESETS[0].included) },
              numero,
            };
            return { ...departure, passengers: [...departure.passengers, passenger] };
          }),
        })),
      addPassengers: (departureId, names, category, included, startNumero) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => {
            let numero = startNumero.trim();
            const added: Passenger[] = names
              .map((name) => name.trim())
              .filter(Boolean)
              .map((name) => {
                const passenger: Passenger = {
                  id: uid(),
                  name,
                  category,
                  included: { ...included },
                  numero: departure.modo === "pasajero" ? numero : "",
                };
                if (numero) numero = nextNumero(numero);
                return passenger;
              });
            return {
              ...departure,
              passengers: [...departure.passengers, ...added],
            };
          }),
        })),
      updatePassenger: (departureId, passengerId, patch) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            passengers: departure.passengers.map((passenger) =>
              passenger.id === passengerId ? { ...passenger, ...patch } : passenger,
            ),
          })),
        })),
      toggleSite: (departureId, passengerId, siteId) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            passengers: departure.passengers.map((passenger) =>
              passenger.id === passengerId
                ? {
                    ...passenger,
                    included: {
                      ...passenger.included,
                      [siteId]: !passenger.included[siteId],
                    },
                  }
                : passenger,
            ),
          })),
        })),
      removePassenger: (departureId, passengerId) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            passengers: departure.passengers.filter(
              (passenger) => passenger.id !== passengerId,
            ),
          })),
        })),
      confirmCash: (departureId, amount, note) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            cashGiven: amount,
            cashNote: note,
            handedAt: departure.handedAt ?? new Date().toISOString(),
          })),
        })),
      setReturned: (departureId, amount) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            cashReturned: amount,
          })),
        })),
      updateRendition: (departureId, siteId, patch) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            sites: {
              ...departure.sites,
              [siteId]: { ...departure.sites[siteId], ...patch },
            },
          })),
        })),
      updateTramo: (departureId, siteId, tramoId, patch) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            sites: {
              ...departure.sites,
              [siteId]: {
                ...departure.sites[siteId],
                tramos: departure.sites[siteId].tramos.map((tramo) =>
                  tramo.id === tramoId ? { ...tramo, ...patch } : tramo,
                ),
              },
            },
          })),
        })),
      addTramo: (departureId, siteId) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            sites: {
              ...departure.sites,
              [siteId]: {
                ...departure.sites[siteId],
                tramos: [...departure.sites[siteId].tramos, emptyTramo()],
              },
            },
          })),
        })),
      removeTramo: (departureId, siteId, tramoId) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => {
            const current = departure.sites[siteId].tramos.filter(
              (tramo) => tramo.id !== tramoId,
            );
            return {
              ...departure,
              sites: {
                ...departure.sites,
                [siteId]: {
                  ...departure.sites[siteId],
                  tramos: current.length > 0 ? current : [emptyTramo()],
                },
              },
            };
          }),
        })),
      closeSettlement: (departureId, note) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            settlementNote: note,
            closedAt: new Date().toISOString(),
            handedAt: departure.handedAt ?? new Date().toISOString(),
            cashGiven: departure.cashGiven ?? 0,
          })),
        })),
      reopenSettlement: (departureId) =>
        set((state) => ({
          departures: mapDeparture(state.departures, departureId, (departure) => ({
            ...departure,
            closedAt: null,
          })),
        })),
    }),
    {
      name: "cuadre-sol-v1",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({
        rates: state.rates,
        departures: state.departures,
      }),
      merge: (persisted, current) => {
        const saved = persisted as { rates?: unknown; departures?: Departure[] } | undefined;
        if (!saved || !Array.isArray(saved.departures)) return current;
        return {
          ...current,
          rates: normalizeRates(saved.rates),
          departures: saved.departures.map((departure) => normalizeDeparture(departure)),
        };
      },
    },
  ),
);

export function useRutaReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    void Promise.resolve(useRuta.persist.rehydrate()).finally(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
