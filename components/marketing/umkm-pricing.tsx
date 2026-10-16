import Link from "next/link";
import { rupiah, umkmOffers, umkmInquiry, umkmInitialBudgetCeiling } from "@/lib/umkm-offers";
import s from "./marketing.module.css";

export function UmkmPricing() {
  return (
    <section id="pricing" className={`${s.section} ${s.wash}`} aria-labelledby="umkm-pricing-title">
      <div className={s.container}>
        <div className={s.sectionHead}>
          <h2 id="umkm-pricing-title">Pilih yang Anda butuhkan.<br />Biayanya kita jelaskan di awal.</h2>
          <p>Belum tahu harus pilih yang mana? Ceritakan dulu usaha dan anggaran Anda. Kami bantu memilih paketnya. Diskusi dan pengerjaan bisa dilakukan online, dari mana pun di Indonesia.</p>
        </div>
        <div className={s.umkmPrices}>
          {umkmOffers.map((offer) => (
            <article className={s.priceCard} key={offer.id}>
              <h3>{offer.name}</h3>
              <p className={s.priceIntro}>{offer.description}</p>
              <div className={s.price}>{rupiah(offer.price)}</div>
              <p className={s.priceNote}>Biaya pengerjaan sekali bayar</p>
              <ul>{offer.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a href={umkmInquiry(offer)} className={s.button}>Konsultasi {offer.name}</a>
            </article>
          ))}
        </div>
        <div className={s.umkmTerms}>
          <div>
            <h3>Rincian biaya sebelum pembayaran.</h3>
            <p>Harga paket merupakan biaya pengerjaan sekali bayar. Domain, hosting komersial, layanan pihak ketiga dan pajak jika berlaku dirinci dalam penawaran. Total biaya awal paket UMKM, termasuk biaya wajib tahun pertama, maksimal {rupiah(umkmInitialBudgetCeiling)}. Jika kebutuhan melebihi anggaran, kami menyesuaikan cakupan pekerjaan atau merekomendasikan alat siap pakai.</p>
          </div>
          <div>
            <h3>Pembayaran bertahap sesuai proses.</h3>
            <p>Uang muka 50%; pelunasan setelah pratinjau disetujui, sebelum peluncuran. Uang muka pengerjaan Website Mulai sebesar {rupiah(umkmOffers[0].price / 2)} di luar biaya layanan pihak ketiga yang perlu dibayar di muka. Anda menyediakan materi usaha. Dukungan perbaikan kesalahan fungsi sesuai kesepakatan tersedia selama 14 hari setelah peluncuran. Biaya perpanjangan tahunan dijelaskan dalam penawaran.</p>
          </div>
        </div>
        <p className={s.smallPrint}>Katalog menggunakan WhatsApp untuk pertanyaan pelanggan; keranjang belanja dan pembayaran online tidak termasuk. Sistem Satu Alur tidak mencakup sistem perusahaan terpadu (ERP), akuntansi, pemindahan data dalam jumlah besar atau integrasi berbayar. Pemeliharaan opsional mulai Rp150.000/bulan untuk pemeriksaan dan pembaruan ringan sesuai kesepakatan, di luar biaya layanan pihak ketiga. <Link href="/syarat-ketentuan">Baca ketentuan proyek</Link>.</p>
      </div>
    </section>
  );
}
