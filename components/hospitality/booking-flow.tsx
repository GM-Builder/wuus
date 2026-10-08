"use client";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Coffee,
  CreditCard,
  Download,
  ShieldCheck,
} from "lucide-react";
import type {
  PropertyData,
  RatePlan,
  Room,
} from "@/app/hospitality/demo/[slug]/demo-data";
import { DemoDialog } from "./demo-dialog";
import {
  emptyExtras,
  money,
  quote,
  shortDate,
  type Currency,
  type Stay,
} from "./booking-model";
import s from "./demo.module.css";

export function BookingFlow({
  property,
  room,
  plan,
  stay,
  currency,
  onClose,
}: {
  property: PropertyData;
  room: Room;
  plan: RatePlan;
  stay: Stay;
  currency: Currency;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [guestError, setGuestError] = useState("");
  const [guest, setGuest] = useState({
    first: "",
    last: "",
    email: "",
    arrival: "14:00–16:00",
    request: "",
  });
  const [extras, setExtras] = useState({ ...emptyExtras });
  const [coupon, setCoupon] = useState("");
  const [promo, setPromo] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [payment, setPayment] = useState("property");
  const [consent, setConsent] = useState(false);
  const [reference, setReference] = useState("");
  const cost = quote(plan, stay, extras, promo);
  const fmt = (cents: number) => money(cents, currency);
  const titles = [
    "Your details",
    "Make it yours",
    "Review your stay",
    "Demo booking complete",
  ];
  function continueGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!guest.first.trim() || !guest.last.trim()) {
      setGuestError("Enter a first and last name.");
      return;
    }
    setGuestError("");
    setGuest({
      ...guest,
      first: guest.first.trim(),
      last: guest.last.trim(),
      email: guest.email.trim(),
    });
    setStep(1);
  }
  function complete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;
    setReference(`DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`);
    setStep(3);
  }
  function download() {
    const text = `WUUS CONCEPT — SAMPLE VOUCHER\nNot a reservation. No room held, email sent or payment processed.\n\n${reference}\n${property.name}\n${room.name} / ${plan.name}\n${stay.checkIn} to ${stay.checkOut} (${cost.nights} nights)\n${stay.rooms} room(s), ${stay.adults} adult(s), ${stay.children} child(ren)\n${guest.first} ${guest.last}\n${guest.email}\nExample total: ${fmt(cost.total)}\nPayment preference: ${payment === "property" ? "Pay at property" : "Sample card ending 4242"}\nCurrency conversions and tax are illustrative.\n`;
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reference}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const summary = (
    <aside className={s.bookingSummary} id="booking-price-details">
      <div className={s.summaryPhoto}>
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 700px) 90vw, 320px"
        />
      </div>
      <div className={s.summaryInner}>
        <small>{property.name}</small>
        <h3>{room.name}</h3>
        <p>{plan.name}</p>
        <div className={s.stayDates}>
          <div>
            <small>CHECK-IN</small>
            <strong>{shortDate(stay.checkIn)}</strong>
          </div>
          <ArrowRight size={18} />
          <div>
            <small>CHECK-OUT</small>
            <strong>{shortDate(stay.checkOut)}</strong>
          </div>
        </div>
        <p>
          {cost.nights} nights · {stay.rooms}{" "}
          {stay.rooms === 1 ? "room" : "rooms"}
          <br />
          {stay.adults} adults
          {stay.children
            ? ` · ${stay.children} children (${stay.childAges.join(", ")} years)`
            : ""}
        </p>
        <dl className={s.priceLines}>
          <div>
            <dt>Rooms · {fmt(plan.rate * 100)} / night</dt>
            <dd>{fmt(cost.roomSubtotal)}</dd>
          </div>
          {promo && (
            <div className={s.positive}>
              <dt>STAY10 · room discount</dt>
              <dd>−{fmt(cost.discount)}</dd>
            </div>
          )}
          {cost.breakfast > 0 && (
            <div>
              <dt>Breakfast</dt>
              <dd>{fmt(cost.breakfast)}</dd>
            </div>
          )}
          {cost.transfer > 0 && (
            <div>
              <dt>Airport transfer</dt>
              <dd>{fmt(cost.transfer)}</dd>
            </div>
          )}
          {cost.lateCheckout > 0 && (
            <div>
              <dt>Late checkout</dt>
              <dd>{fmt(cost.lateCheckout)}</dd>
            </div>
          )}
          <div>
            <dt>Example tax · 10%</dt>
            <dd>{fmt(cost.taxes)}</dd>
          </div>
          <div className={s.total}>
            <dt>Total for your stay</dt>
            <dd>{fmt(cost.total)}</dd>
          </div>
        </dl>
        <small>
          All prices, inventory and currency conversions are illustrative. No
          booking fee.
        </small>
        <div className={s.policy}>
          <ShieldCheck size={18} />
          <span>
            {plan.freeCancellation
              ? "Example policy: free cancellation until 48 hours before arrival."
              : "Example policy: non-refundable rate."}
          </span>
        </div>
      </div>
    </aside>
  );
  return (
    <DemoDialog title={titles[step]} onClose={onClose} wide>
      <div className={s.checkoutProgress} aria-label="Booking progress">
        {["Guest", "Extras", "Review"].map((label, index) => (
          <span key={label} className={step >= index ? s.activeStep : ""}>
            <b>{step > index ? <Check size={14} /> : index + 1}</b>
            {label}
          </span>
        ))}
      </div>
      <div className={s.mobileQuote}>
        <span>
          <strong>{room.name}</strong>
          <small>
            {cost.nights} nights · {stay.rooms} room(s)
          </small>
        </span>
        <button
          type="button"
          className={s.textButton}
          onClick={() =>
            document
              .getElementById("booking-price-details")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          {fmt(cost.total)}
          <small>Price details</small>
        </button>
      </div>
      <div className={s.checkoutGrid}>
        <div className={s.checkoutMain}>
          {step === 0 && (
            <form onSubmit={continueGuest}>
              <p className={s.eyebrow}>A LITTLE ABOUT YOU</p>
              <h3>Who’s coming along?</h3>
              <p className={s.muted}>
                Try the complete experience using example details.
              </p>
              <button
                type="button"
                className={s.textButton}
                onClick={() =>
                  setGuest({
                    ...guest,
                    first: "Alex",
                    last: "Morgan",
                    email: "alex@example.com",
                  })
                }
              >
                Fill example details
              </button>
              <div className={s.formGrid}>
                <label>
                  First name
                  <input
                    name="firstName"
                    required
                    maxLength={80}
                    autoComplete="given-name"
                    value={guest.first}
                    onChange={(e) =>
                      setGuest({ ...guest, first: e.target.value })
                    }
                  />
                </label>
                <label>
                  Last name
                  <input
                    name="lastName"
                    required
                    maxLength={80}
                    autoComplete="family-name"
                    value={guest.last}
                    onChange={(e) =>
                      setGuest({ ...guest, last: e.target.value })
                    }
                  />
                </label>
              </div>
              {guestError && (
                <p className={s.error} role="alert">
                  {guestError}
                </p>
              )}
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={guest.email}
                  onChange={(e) =>
                    setGuest({ ...guest, email: e.target.value })
                  }
                />
              </label>
              <small>
                Used only in this local demo. No confirmation email will be
                sent.
              </small>
              <label>
                Expected arrival
                <select
                  value={guest.arrival}
                  onChange={(e) =>
                    setGuest({ ...guest, arrival: e.target.value })
                  }
                >
                  {[
                    "14:00–16:00",
                    "16:00–18:00",
                    "18:00–22:00",
                    "After 22:00",
                  ].map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
              <label>
                Special requests <small>(optional)</small>
                <textarea
                  maxLength={300}
                  rows={3}
                  placeholder="Anything that would make your stay more comfortable?"
                  value={guest.request}
                  onChange={(e) =>
                    setGuest({ ...guest, request: e.target.value })
                  }
                />
              </label>
              <small>
                Requests are examples and are not sent to a property.
              </small>
              <button className={s.button} type="submit">
                Continue to extras <ArrowRight size={16} />
              </button>
            </form>
          )}
          {step === 1 && (
            <div>
              <p className={s.eyebrow}>THE SMALL DETAILS</p>
              <h3>Your stay, your way.</h3>
              <p className={s.muted}>
                Optional touches, with every cost shown upfront.
              </p>
              {plan.breakfastIncluded ? (
                <div className={s.included}>
                  <Coffee size={20} />
                  <span>Daily breakfast is included in your rate.</span>
                </div>
              ) : (
                <label className={s.extra}>
                  <input
                    type="checkbox"
                    checked={extras.breakfast}
                    onChange={(e) =>
                      setExtras({ ...extras, breakfast: e.target.checked })
                    }
                  />
                  <span>
                    <strong>Breakfast, each morning</strong>
                    <small>
                      {fmt(1300)} / adult · {fmt(700)} / child, per night
                    </small>
                  </span>
                </label>
              )}
              <label className={s.extra}>
                <input
                  type="checkbox"
                  checked={extras.transfer}
                  onChange={(e) =>
                    setExtras({ ...extras, transfer: e.target.checked })
                  }
                />
                <span>
                  <strong>A smooth airport arrival</strong>
                  <small>One vehicle · one way · {fmt(3500)} total</small>
                </span>
              </label>
              <label className={s.extra}>
                <input
                  type="checkbox"
                  checked={extras.lateCheckout}
                  onChange={(e) =>
                    setExtras({ ...extras, lateCheckout: e.target.checked })
                  }
                />
                <span>
                  <strong>A slower goodbye</strong>
                  <small>Late checkout to 13:00 · {fmt(2500)} per room</small>
                </span>
              </label>
              <label>
                Have an offer code?
                <div className={s.coupon}>
                  <input
                    aria-label="Offer code"
                    value={coupon}
                    maxLength={24}
                    placeholder="Try STAY10"
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button
                    type="button"
                    className={s.secondaryButton}
                    onClick={() => {
                      const valid = coupon.trim().toUpperCase() === "STAY10";
                      setPromo(valid);
                      setCouponError(
                        valid ? "" : "Try STAY10 for 10% off the room price.",
                      );
                    }}
                  >
                    Apply
                  </button>
                </div>
              </label>
              {promo && (
                <p className={s.positive} role="status">
                  STAY10 applied · 10% off rooms
                </p>
              )}
              {couponError && (
                <p className={s.error} role="alert">
                  {couponError}
                </p>
              )}
              <h4>How would you like to pay?</h4>
              <label className={s.extra}>
                <input
                  type="radio"
                  name="payment"
                  value="property"
                  checked={payment === "property"}
                  onChange={() => setPayment("property")}
                />
                <span>
                  <strong>Pay at the property</strong>
                  <small>A payment preference for this demonstration.</small>
                </span>
              </label>
              <label className={s.extra}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                />
                <CreditCard size={20} />
                <span>
                  <strong>Try the card experience</strong>
                  <small>
                    Sample card •••• 4242. No card details collected.
                  </small>
                </span>
              </label>
              <div className={s.formActions}>
                <button
                  className={s.secondaryButton}
                  onClick={() => setStep(0)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button className={s.button} onClick={() => setStep(2)}>
                  Review stay <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <form onSubmit={complete}>
              <p className={s.eyebrow}>ONE LAST LOOK</p>
              <h3>Everything in one place.</h3>
              <div className={s.reviewBlock}>
                <div>
                  <h4>Guest details</h4>
                  <button
                    className={s.textButton}
                    type="button"
                    onClick={() => setStep(0)}
                  >
                    Edit guest
                  </button>
                </div>
                <p>
                  {guest.first} {guest.last}
                  <br />
                  {guest.email}
                  <br />
                  Arrival: {guest.arrival}
                </p>
                {guest.request && <p>Request: {guest.request}</p>}
              </div>
              <div className={s.reviewBlock}>
                <div>
                  <h4>Payment preference</h4>
                  <button
                    className={s.textButton}
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Edit extras
                  </button>
                </div>
                <p>
                  {payment === "property"
                    ? "Pay at the property"
                    : "Sample card ending 4242"}
                </p>
                <small>No payment is processed.</small>
              </div>
              <div className={s.policy}>
                <ShieldCheck size={20} />
                <span>
                  {plan.freeCancellation
                    ? "Free cancellation until 48 hours before arrival, for this example rate."
                    : "This example rate is non-refundable."}{" "}
                  Check-in from 14:00. Check-out by 11:00, or 13:00 with late
                  checkout.
                </span>
              </div>
              <label className={s.extra}>
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  I understand this is a demo. No real reservation, email or
                  payment will be created.
                </span>
              </label>
              <div className={s.formActions}>
                <button
                  type="button"
                  className={s.secondaryButton}
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className={s.button}>
                  Complete demo booking <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}
          {step === 3 && (
            <div className={s.confirmation}>
              <CheckCircle2 size={48} />
              <p className={s.eyebrow}>EXPERIENCE COMPLETE</p>
              <h3>That’s how easy it could be.</h3>
              <p>Your example stay is ready to preview.</p>
              <div className={s.reference}>{reference}</div>
              <p>
                <strong>This is a simulated confirmation.</strong>
                <br />
                No room is held, no email has been sent and no money has been
                charged.
              </p>
              <button className={s.button} onClick={download}>
                <Download size={17} /> Download sample voucher
              </button>
              <button className={s.secondaryButton} onClick={onClose}>
                Back to the property
              </button>
            </div>
          )}
        </div>
        {summary}
      </div>
    </DemoDialog>
  );
}
