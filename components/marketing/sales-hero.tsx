import Link from "next/link";
import { WebsitePreview } from "./examples";
import { ServiceIcon } from "./service-icon";
import s from "./marketing.module.css";

export function SalesHero({ language = "en" }: { language?: "en" | "id" }) {
  const en = language === "en";
  const details = en
    ? ["Your rooms", "A direct enquiry", "Your own website"]
    : ["Informasi usaha", "Kontak langsung", "Website milik Anda"];
  return (
    <section className={s.salesHero}>
      <div className={s.heroHeading}>
        <p className={s.eyebrow}>
          {en
            ? "WUUS / Websites for independent hotels"
            : "WUUS / Desain dan pengembangan website"}
        </p>
        <h1>
          {en ? "A place worth" : "Usaha Anda."}
          <br />
          <span>{en ? "discovering." : "Cerita yang jelas."}</span>
        </h1>
      </div>
      <div className={s.heroIntro}>
        <p className={s.heroCopy}>
          {en
            ? "Bring your property's character online. Show your rooms, answer guests' questions and make the next step simple."
            : "Beri usaha Anda ruang di internet. Tampilkan layanan, jawab pertanyaan pelanggan, dan buat mereka mudah menghubungi Anda."}
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
      </div>
      <div className={s.heroShowcase}>
        <div className={s.showcaseNotes}>
          <span className={s.showcaseIndex}>
            01 / {en ? "A design in context" : "Desain dalam konteks"}
          </span>
          <h2>
            {en
              ? "A little of your world. Online."
              : "Karakter usaha. Dalam setiap halaman."}
          </h2>
          <p>
            {en
              ? "Villa Mare · Fictional guesthouse concept"
              : "Villa Mare · Konsep guesthouse fiktif"}
          </p>
          <ul>
            {details.map((detail, index) => (
              <li key={detail}>
                <ServiceIcon
                  kind={
                    index === 0
                      ? "layout"
                      : index === 1
                        ? "message"
                        : "handover"
                  }
                />
                {detail}
              </li>
            ))}
          </ul>
          <p className={s.visualCaption}>
            {en
              ? "AI-generated concept imagery. Not a client project."
              : "Foto konsep dibuat dengan AI. Bukan proyek klien."}
          </p>
        </div>
        <WebsitePreview language={language} />
      </div>
    </section>
  );
}
