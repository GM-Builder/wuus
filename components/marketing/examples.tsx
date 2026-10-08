import Image from "next/image";
import Link from "next/link";
import s from "./marketing.module.css";
const examples = [
  {
    slug: "seaside-guesthouse",
    image: "guesthouse.webp",
    title: "Seaside guesthouse",
    idTitle: "Guesthouse tepi laut",
    description:
      "A photo-led introduction, clear room details and a direct enquiry.",
    idDescription:
      "Foto properti, informasi kamar, dan jalur inquiry yang mudah ditemukan.",
  },
  {
    slug: "lakeside-wine-estate",
    image: "savoria-hero-banner.jpg",
    title: "Lakeside wine estate",
    idTitle: "Penginapan di kebun anggur",
    description: "Rooms, the estate story and local experiences in one place.",
    idDescription:
      "Kamar, cerita properti, dan pengalaman sekitar dalam satu website.",
  },
  {
    slug: "city-apartments",
    image: "urban-loft.jpg",
    title: "City apartments",
    idTitle: "Apartemen kota",
    description:
      "A simple way to compare rooms, amenities and arrival details.",
    idDescription:
      "Tipe unit, fasilitas, dan informasi kedatangan yang tersusun jelas.",
  },
];
export function Examples({ language = "en" }: { language?: "en" | "id" }) {
  const en = language === "en";
  return (
    <div className={s.three}>
      {examples.map((example, index) => (
        <article className={s.example} key={example.slug}>
          <Link
            href={`/hospitality/demo/${example.slug}`}
            className={s.exampleImage}
            aria-label={`${en ? "View" : "Lihat"} ${en ? example.title : example.idTitle}`}
          >
            <Image
              src={`/images/hospitality/${example.image}`}
              alt={
                en
                  ? `${example.title} design concept`
                  : `Konsep desain ${example.idTitle.toLowerCase()}`
              }
              fill
              sizes="(max-width: 640px) 90vw, 33vw"
            />
          </Link>
          <span className={s.number}>
            0{index + 1} · {en ? "Design concept" : "Konsep desain"}
          </span>
          <h3>{en ? example.title : example.idTitle}</h3>
          <p>{en ? example.description : example.idDescription}</p>
          <Link
            href={`/hospitality/demo/${example.slug}`}
            className={s.textLink}
          >
            {en ? "Explore the demo" : "Buka demo"}{" "}
            <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
export function WebsitePreview({
  language = "en",
}: {
  language?: "en" | "id";
}) {
  const en = language === "en";
  return (
    <figure className={s.product}>
      <div className={s.productBar}>
        <strong>Villa Mare</strong>
        <span>{en ? "A WUUS design concept" : "Konsep desain WUUS"}</span>
      </div>
      <div className={s.productImage}>
        <Image
          src="/images/hospitality/guesthouse.webp"
          alt={
            en
              ? "Coastal guesthouse courtyard used in a fictional website concept"
              : "Halaman guesthouse dalam konsep website fiktif"
          }
          fill
          sizes="(max-width: 900px) 90vw, (max-width: 1300px) 65vw, 1000px"
          preload
        />
        <div className={s.productLabel}>
          A quiet place
          <br />
          by the sea.
        </div>
      </div>
      <div className={s.productBottom}>
        <div>
          <strong>
            {en
              ? "See the rooms. Find your stay."
              : "Kenali kamar. Rencanakan perjalanan."}
          </strong>
          <p>
            {en
              ? "Room details, a photo gallery and a direct enquiry."
              : "Informasi kamar, galeri foto, dan inquiry langsung."}
          </p>
        </div>
        <Link
          className={s.buttonLight}
          href="/hospitality/demo/seaside-guesthouse"
        >
          {en ? "Explore the concept" : "Lihat konsep"}{" "}
          <span className="ml-3" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </figure>
  );
}
