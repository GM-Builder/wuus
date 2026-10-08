import type { RatePlan, Room } from "@/app/hospitality/demo/[slug]/demo-data";

export type Currency = "EUR" | "USD" | "GBP";
export interface Stay {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  childAges: number[];
}
export interface Extras {
  breakfast: boolean;
  transfer: boolean;
  lateCheckout: boolean;
}
export const emptyStay: Stay = {
  checkIn: "",
  checkOut: "",
  adults: 2,
  children: 0,
  rooms: 1,
  childAges: [],
};
export const emptyExtras: Extras = {
  breakfast: false,
  transfer: false,
  lateCheckout: false,
};
const dayMs = 86400000;
const currencyRates = { EUR: 1, USD: 1.1, GBP: 0.85 };

export function dateValue(value: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isFinite(time) &&
    new Date(time).toISOString().slice(0, 10) === value
    ? time
    : NaN;
}
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
export function addDays(value: string, days: number): string {
  return new Date(dateValue(value) + days * dayMs).toISOString().slice(0, 10);
}
export function sampleStay(today = todayISO()): Stay {
  return {
    ...emptyStay,
    checkIn: addDays(today, 7),
    checkOut: addDays(today, 10),
    childAges: [],
  };
}
export function stayNights(stay: Pick<Stay, "checkIn" | "checkOut">): number {
  const nights = (dateValue(stay.checkOut) - dateValue(stay.checkIn)) / dayMs;
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
}
export function validateStay(stay: Stay, today = todayISO()): string | null {
  if (
    !Number.isFinite(dateValue(stay.checkIn)) ||
    !Number.isFinite(dateValue(stay.checkOut))
  )
    return "Choose valid check-in and check-out dates.";
  if (stay.checkIn < today) return "Check-in must be today or later.";
  const nights = stayNights(stay);
  if (!nights) return "Check-out must be after check-in.";
  if (nights > 30) return "This demo supports stays of up to 30 nights.";
  if (
    !Number.isInteger(stay.adults) ||
    stay.adults < 1 ||
    stay.adults > 8 ||
    !Number.isInteger(stay.children) ||
    stay.children < 0 ||
    stay.children > 4 ||
    !Number.isInteger(stay.rooms) ||
    stay.rooms < 1 ||
    stay.rooms > 4
  )
    return "Choose 1–8 adults, 0–4 children and 1–4 rooms.";
  if (stay.adults < stay.rooms) return "Each room needs at least one adult.";
  if (
    stay.childAges.length !== stay.children ||
    stay.childAges.some((age) => !Number.isInteger(age) || age < 0 || age > 17)
  )
    return "Choose an age for each child (0–17).";
  return null;
}
export function roomFits(
  room: Pick<Room, "maxGuests">,
  stay: Stay,
  inventory = 3,
): boolean {
  return (
    stay.rooms <= inventory &&
    stay.adults + stay.children <= room.maxGuests * stay.rooms
  );
}
export function money(cents: number, currency: Currency = "EUR"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: cents % 100 === 0 && currency === "EUR" ? 0 : 2,
  }).format((cents / 100) * currencyRates[currency]);
}
export function quote(
  plan: Pick<RatePlan, "rate" | "breakfastIncluded">,
  stay: Stay,
  extras: Extras = emptyExtras,
  promo = false,
) {
  const nights = stayNights(stay);
  const roomSubtotal = Math.round(plan.rate * 100) * nights * stay.rooms;
  const discount = promo ? Math.round(roomSubtotal * 0.1) : 0;
  const breakfast =
    extras.breakfast && !plan.breakfastIncluded
      ? (stay.adults * 1300 + stay.children * 700) * nights
      : 0;
  const transfer = extras.transfer ? 3500 : 0;
  const lateCheckout = extras.lateCheckout ? 2500 * stay.rooms : 0;
  const extrasTotal = breakfast + transfer + lateCheckout;
  const taxes = Math.round((roomSubtotal - discount + extrasTotal) * 0.1);
  return {
    nights,
    roomSubtotal,
    discount,
    breakfast,
    transfer,
    lateCheckout,
    extrasTotal,
    taxes,
    total: roomSubtotal - discount + extrasTotal + taxes,
  };
}
export function shortDate(value: string): string {
  return Number.isFinite(dateValue(value))
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }).format(new Date(dateValue(value)))
    : "Select date";
}
