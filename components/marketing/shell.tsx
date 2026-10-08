import Link from "next/link";
import { BrandArtwork } from "./brand-artwork";
import s from "./marketing.module.css";
type Language = "en" | "id";
export function Brand({ href = "/hospitality" }: { href?: string }) {
  return (
    <Link href={href} className={s.brand} aria-label="WUUS home">
      <BrandArtwork className={s.brandArtwork} />
    </Link>
  );
}
export function StudioAvatar() {
  return (
    <div className={s.avatar} role="img" aria-label="WUUS studio logo">
      <BrandArtwork className={s.brandArtwork} />
    </div>
  );
}
export function MarketingHeader({
  language = "en",
  review = false,
}: {
  language?: Language;
  review?: boolean;
}) {
  const en = language === "en";
  const home = en ? "/hospitality" : "/";
  const links = en
    ? [
        ["Examples", `${home}#examples`],
        ["Pricing", `${home}#pricing`],
        ["Process", `${home}#process`],
        ["FAQ", `${home}#faq`],
      ]
    : [
        ["Layanan", "/#services"],
        ["Contoh desain", "/#examples"],
        ["Cara kerja", "/#process"],
        ["FAQ", "/#faq"],
      ];
  return (
    <header className={s.header}>
      <a href="#main" className={s.skip}>
        {en ? "Skip to content" : "Lewati ke konten"}
      </a>
      <div className={`${s.container} ${s.nav}`}>
        <div className="flex items-center">
          <Brand href={home} />
          <span className={s.brandNote}>
            {en ? "Independent web studio" : "Studio website independen"}
          </span>
        </div>
        <nav
          className={s.desktopNav}
          aria-label={en ? "Main navigation" : "Navigasi utama"}
        >
          {links.map(([label, href]) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className={s.navAction}>
          <Link
            className={s.language}
            href={en ? "/" : "/hospitality"}
            lang={en ? "id" : "en"}
          >
            {en ? "Indonesia" : "English"}
          </Link>
          <Link
            className={s.button}
            href={
              review ? "/hospitality#examples" : en ? "/review" : "/#contact"
            }
          >
            {review ? "View examples" : en ? "Free review" : "Bahas website"}
          </Link>
          <details className={s.mobileNav}>
            <summary>Menu</summary>
            <nav aria-label={en ? "Mobile navigation" : "Navigasi mobile"}>
              {links.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
              <Link href={en ? "/" : "/hospitality"}>
                {en ? "Bahasa Indonesia" : "English"}
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
export function MarketingFooter({ language = "en" }: { language?: Language }) {
  const en = language === "en";
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerTop}>
          <div>
            <Brand href={en ? "/hospitality" : "/"} />
            <p>
              {en
                ? "Independent web design. Based in Jakarta."
                : "Desain dan pengembangan website. Berbasis di Jakarta."}
            </p>
          </div>
          <div className={s.footerLinks}>
            <a href="mailto:hallo@webuntukusaha.com">hallo@webuntukusaha.com</a>
            <Link href={en ? "/" : "/hospitality"}>
              {en ? "Bahasa Indonesia" : "Hospitality · English"}
            </Link>
          </div>
        </div>
        <div className={s.footerBottom}>
          <span>© {new Date().getFullYear()} WUUS</span>
          <div className={s.footerLinks}>
            <Link href={en ? "/hospitality/privacy" : "/kebijakan-privasi"}>
              {en ? "Privacy" : "Privasi"}
            </Link>
            <Link href={en ? "/hospitality/terms" : "/syarat-ketentuan"}>
              {en ? "Project terms" : "Ketentuan proyek"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function MarketingShell({
  children,
  language = "en",
  review = false,
}: {
  children: React.ReactNode;
  language?: Language;
  review?: boolean;
}) {
  return (
    <div lang={language} className={s.site}>
      <MarketingHeader language={language} review={review} />
      {children}
      <MarketingFooter language={language} />
    </div>
  );
}
