import Link from "next/link";
import { WebsitePreview } from "./examples";
import s from "./marketing.module.css";

export function SalesHero({ language = "en" }: { language?: "en" | "id" }) {
  const en = language === "en";
  return (
    <section className={s.salesHero}>
      <div className={s.salesCopy}>
        <p className={s.eyebrow}>
          {en
            ? "Websites for independent hotels"
            : "Desain dan pengembangan website"}
        </p>
        <h1>
          {en ? "Your hotel," : "Website yang rapi."}
          <br />
          <span className={s.soft}>
            {en ? "clearly presented." : "Untuk usaha Anda."}
          </span>
        </h1>
        <p className={s.heroCopy}>
          {en
            ? "A website that shows your rooms, answers guests' questions and makes it easy to contact you directly."
            : "Tampilkan layanan, jawab pertanyaan pelanggan, dan beri mereka cara mudah untuk menghubungi Anda."}
        </p>
        <div className={s.actions}>
          {en ? (
            <Link className={s.button} href="/review">
              Get a free website review <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <a className={s.button} href="#contact">
              Bahas website Anda <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href="#examples" className={s.textLink}>
            {en ? "Explore the designs" : "Lihat contoh desain"}
          </a>
        </div>
        <p className={s.caption}>
          {en
            ? "A one-page review. By email in two working days. No obligation."
            : "Scope dan biaya disepakati sebelum pengerjaan."}
        </p>
        <div className={s.heroStudio}>
          <span className={s.studioSymbol} aria-hidden="true">
            W.
          </span>
          <span>
            {en
              ? "Independent studio. One point of contact."
              : "Studio independen. Komunikasi langsung."}
          </span>
        </div>
      </div>
      <div className={s.salesVisual}>
        <div className={s.visualHeading}>
          <span>{en ? "A website, in context" : "Desain dalam konteks"}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <WebsitePreview language={language} />
        <p className={s.visualCaption}>
          {en
            ? "Fictional property · AI-generated concept imagery · Not a client project"
            : "Properti fiktif · Foto konsep dibuat dengan AI · Bukan proyek klien"}
        </p>
      </div>
    </section>
  );
}
