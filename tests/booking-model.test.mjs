import test from "node:test";
import assert from "node:assert/strict";
import {
  dateValue,
  emptyExtras,
  sampleStay,
  stayNights,
  validateStay,
  roomFits,
  quote,
  money,
} from "../components/hospitality/booking-model.ts";

test("dates reject impossible dates, reversed ranges, past dates and stays above 30 nights", () => {
  assert.ok(Number.isNaN(dateValue("2026-02-30")));
  const stay = sampleStay("2026-10-08");
  assert.equal(stayNights(stay), 3);
  assert.equal(validateStay(stay, "2026-10-08"), null);
  assert.match(
    validateStay({ ...stay, checkOut: "2026-10-14" }, "2026-10-08"),
    /after check-in/,
  );
  assert.match(
    validateStay({ ...stay, checkIn: "2026-10-07" }, "2026-10-08"),
    /today or later/,
  );
  assert.match(
    validateStay({ ...stay, checkOut: "2026-11-20" }, "2026-10-08"),
    /30 nights/,
  );
});
test("guest allocation respects capacity, inventory, adult supervision and child ages", () => {
  const stay = { ...sampleStay("2026-10-08"), children: 1, childAges: [8] };
  assert.equal(roomFits({ maxGuests: 2 }, stay), false);
  assert.equal(roomFits({ maxGuests: 2 }, { ...stay, rooms: 2 }), true);
  assert.equal(roomFits({ maxGuests: 2 }, { ...stay, rooms: 4 }, 3), false);
  assert.match(validateStay({ ...stay, rooms: 3 }, "2026-10-08"), /one adult/);
  assert.match(validateStay({ ...stay, childAges: [18] }, "2026-10-08"), /age/);
  assert.match(validateStay({ ...stay, childAges: [] }, "2026-10-08"), /age/);
});
test("multiroom totals, child breakfast, extras and room-only discount reconcile in integer cents", () => {
  const stay = {
    ...sampleStay("2026-10-08"),
    rooms: 2,
    children: 1,
    childAges: [8],
  };
  const cost = quote(
    { rate: 120, breakfastIncluded: false },
    stay,
    { breakfast: true, transfer: true, lateCheckout: true },
    true,
  );
  assert.deepEqual(cost, {
    nights: 3,
    roomSubtotal: 72000,
    discount: 7200,
    breakfast: 9900,
    transfer: 3500,
    lateCheckout: 5000,
    extrasTotal: 18400,
    taxes: 8320,
    total: 91520,
  });
  assert.equal(
    quote({ rate: 140, breakfastIncluded: true }, stay, {
      ...emptyExtras,
      breakfast: true,
    }).breakfast,
    0,
  );
  assert.equal(
    quote({ rate: 120, breakfastIncluded: false }, sampleStay("2026-10-08"))
      .total,
    39600,
  );
});
test("currency changes display only and leaves the base EUR quote intact", () => {
  assert.equal(money(39600), "€396");
  assert.match(money(39600, "USD"), /435\.60/);
  assert.match(money(39600, "GBP"), /336\.60/);
});
