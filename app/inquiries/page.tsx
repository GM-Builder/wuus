"use client";
import { useState } from "react";
import { MarketingShell } from "@/components/marketing/shell";
import s from "@/components/marketing/marketing.module.css";
export default function InquiriesPage() {
  const [values, setValues] = useState({ nama: "", usaha: "", kebutuhan: "" });
  const [draft, setDraft] = useState("");
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `Halo WUUS, saya ingin membahas website usaha.\nNama: ${values.nama}\nUsaha: ${values.usaha}\nKebutuhan: ${values.kebutuhan}`;
    setDraft(`https://wa.me/6281383521750?text=${encodeURIComponent(message)}`);
  }
  return (
    <MarketingShell language="id">
      <main id="main" className={`${s.container} ${s.reviewMain}`}>
        <div className={s.hero}>
          <p className={s.eyebrow}>Diskusi website</p>
          <h1>
            Mulai dari
            <br />
            <span className={s.soft}>kebutuhan usaha Anda.</span>
          </h1>
          <p className={s.heroCopy}>
            Isi ringkasan berikut untuk menyiapkan pesan WhatsApp. Pesan dikirim
            setelah Anda membukanya dan menekan kirim di WhatsApp.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <form className={s.formCard} onSubmit={prepare}>
            <div className={s.formGrid}>
              {[
                ["nama", "Nama Anda", 120],
                ["usaha", "Nama usaha", 160],
              ].map(([field, label, limit]) => (
                <div className={`${s.formField} ${s.full}`} key={field}>
                  <label htmlFor={`business-${field}`}>{label} *</label>
                  <input
                    id={`business-${field}`}
                    name={String(field)}
                    required
                    maxLength={Number(limit)}
                    autoComplete={field === "nama" ? "name" : "organization"}
                    value={values[field as "nama" | "usaha"]}
                    onChange={(event) => {
                      setDraft("");
                      setValues((previous) => ({
                        ...previous,
                        [field]: event.target.value,
                      }));
                    }}
                  />
                </div>
              ))}
              <div className={`${s.formField} ${s.full}`}>
                <label htmlFor="business-needs">
                  Apa yang Anda butuhkan? *
                </label>
                <textarea
                  id="business-needs"
                  required
                  maxLength={3000}
                  rows={4}
                  value={values.kebutuhan}
                  onChange={(event) => {
                    setDraft("");
                    setValues((previous) => ({
                      ...previous,
                      kebutuhan: event.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <p className={`${s.hint} my-5`}>
              Form ini tidak menyimpan inquiry di dashboard. Detail akan
              diteruskan ke WhatsApp bila Anda memilih tautan berikutnya.
            </p>
            <button type="submit" className={s.button}>
              Siapkan pesan WhatsApp
            </button>
            {draft ? (
              <div role="status" className="mt-5">
                <a href={draft} className={s.buttonLight}>
                  Buka draft di WhatsApp ↗
                </a>
                <p className={s.hint}>
                  Pesan belum dikirim. Periksa draft sebelum mengirim.
                </p>
              </div>
            ) : null}
            <p className={`${s.hint} mt-6`}>
              Atau email{" "}
              <a href="mailto:hallo@webuntukusaha.com">
                hallo@webuntukusaha.com
              </a>
              . <a href="/kebijakan-privasi">Informasi privasi</a>.
            </p>
          </form>
        </div>
      </main>
    </MarketingShell>
  );
}
