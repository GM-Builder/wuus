"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { requestIdentity, submitInquiry } from "@/lib/inquiry-client";
import s from "./marketing.module.css";
export function InquiryForm({
  source,
  initialHotel = "",
}: {
  source: "review" | "hospitality";
  initialHotel?: string;
}) {
  const [values, setValues] = useState({
    hotelName: initialHotel,
    websiteUrl: "",
    contactName: "",
    email: "",
    notes: "",
    consent: false,
    companyWebsite: "",
    requestType: "review" as "review" | "proposal",
  });
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const submission = useRef<{ fingerprint: string; id: string } | null>(null);
  const inFlight = useRef(false);
  const update = (field: keyof typeof values, value: string | boolean) =>
    setValues((previous) => ({ ...previous, [field]: value }));
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    inFlight.current = true;
    setPending(true);
    setError("");
    try {
      const payload = { ...values, source };
      submission.current = requestIdentity(payload, submission.current);
      await submitInquiry({ ...payload, requestId: submission.current.id });
      setSaved(true);
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Your request could not be saved. Please retry or email WUUS.",
      );
    } finally {
      setPending(false);
      inFlight.current = false;
    }
  }
  return (
    <div className={s.formCard}>
      {saved ? (
        <div className={s.success} role="status" aria-live="polite">
          <span className={s.successMark} aria-hidden="true">
            ✓
          </span>
          <h3>Your request is saved.</h3>
          <p>
            Thank you, {values.contactName}. WUUS will reply to{" "}
            <strong>{values.email}</strong> within two working days about{" "}
            <strong>{values.hotelName}</strong>.
          </p>
          <p className={s.hint}>
            No payment is needed. Please check your spam folder if a reply
            hasn&apos;t arrived.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={pending}>
          <div className={s.honeypot} aria-hidden="true">
            <label htmlFor={`${source}-company`}>Leave this field empty</label>
            <input
              id={`${source}-company`}
              name="companyWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={values.companyWebsite}
              onChange={(event) => update("companyWebsite", event.target.value)}
            />
          </div>
          <div className={s.formGrid}>
            <div className={`${s.formField} ${s.full}`}>
              <label htmlFor={`${source}-hotel`}>Property name *</label>
              <input
                id={`${source}-hotel`}
                name="hotelName"
                aria-label="Hotel name"
                required
                maxLength={160}
                autoComplete="organization"
                value={values.hotelName}
                onChange={(event) => update("hotelName", event.target.value)}
                placeholder="Your hotel, guesthouse or apartments"
              />
            </div>
            <div className={`${s.formField} ${s.full}`}>
              <label htmlFor={`${source}-link`}>
                Website or property listing *
              </label>
              <input
                id={`${source}-link`}
                name="websiteUrl"
                aria-label="Hotel link"
                required
                maxLength={2048}
                inputMode="url"
                autoComplete="url"
                value={values.websiteUrl}
                onChange={(event) => update("websiteUrl", event.target.value)}
                placeholder="https://your-property.com"
              />
              <p className={s.hint}>
                No website? A Booking.com, Google Maps or Instagram profile
                works too. Share a link to your property.
              </p>
            </div>
            <div className={s.formField}>
              <label htmlFor={`${source}-name`}>Your name *</label>
              <input
                id={`${source}-name`}
                name="contactName"
                aria-label="Your name"
                required
                maxLength={120}
                autoComplete="name"
                value={values.contactName}
                onChange={(event) => update("contactName", event.target.value)}
              />
            </div>
            <div className={s.formField}>
              <label htmlFor={`${source}-email`}>Email *</label>
              <input
                id={`${source}-email`}
                name="email"
                aria-label="Email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </div>
            {source === "hospitality" ? (
              <div className={`${s.formField} ${s.full}`}>
                <label htmlFor={`${source}-request`}>
                  What would you like?
                </label>
                <select
                  id={`${source}-request`}
                  name="requestType"
                  value={values.requestType}
                  onChange={(event) =>
                    update("requestType", event.target.value)
                  }
                >
                  <option value="review">A free website review</option>
                  <option value="proposal">A website proposal</option>
                </select>
              </div>
            ) : null}
            <div className={`${s.formField} ${s.full}`}>
              <label htmlFor={`${source}-notes`}>
                Anything to look at? <span className={s.soft}>(optional)</span>
              </label>
              <textarea
                id={`${source}-notes`}
                name="notes"
                aria-label="Message"
                rows={3}
                maxLength={3000}
                value={values.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Tell us what you would like to improve."
              />
            </div>
          </div>
          <label className={s.consent}>
            <input
              name="consent"
              type="checkbox"
              required
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
            />
            <span>
              I agree that WUUS can use these details to reply to my request, as
              described in the{" "}
              <Link href="/hospitality/privacy">privacy information</Link>.
            </span>
          </label>
          <button className={s.button} type="submit" disabled={pending}>
            {pending
              ? "Sending your request…"
              : source === "hospitality"
                ? "Send my request"
                : "Request my free review"}
          </button>
          {error ? (
            <div className={s.error} role="alert">
              {error}{" "}
              <a href="mailto:hallo@webuntukusaha.com">Email WUUS directly</a>
            </div>
          ) : null}
          <p className={`${s.hint} text-center mt-4`}>
            A personal reply by email within two working days.
          </p>
        </form>
      )}
    </div>
  );
}
