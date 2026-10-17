# Lima konsep website UMKM

Penugasan Sora: `five-concepts-v1`, job `d97bc210-bbea-47be-8202-022600ddfcc0`.

Semua merek, pilihan, harga, jadwal dan produk merupakan isi demonstrasi. Tidak ada testimoni, alamat, angka pelanggan, pengiriman server, pembayaran, atau klaim klien nyata. Penanda contoh berada pada strip WUUS. Ringkasan hasil menjelaskan bahwa data belum dikirim.

| Route | Arah visual | Alur yang berfungsi |
| --- | --- | --- |
| `/contoh/titik-potong` | Ruang gelap, bronze, hero fotografi penuh, daftar jasa horizontal | Layanan → tanggal → barber A/B → jam sesuai barber → ringkasan kunjungan dan biaya |
| `/contoh/putaran-motor` | Graphite/orange, hero terbagi, label siap jalan, urutan pemeriksaan | Servis → tanggal → jenis, merek/model motor → keluhan → ringkasan estimasi jasa |
| `/contoh/kelopak` | Plum/cream, foto lengkung, catatan rangkaian, katalog dengan foto di samping | Filter nuansa → rangkaian → Regular/Besar → tas dengan jumlah → pesan kartu → subtotal dan ringkasan |
| `/contoh/langkah-belajar` | Deep teal/lime, editorial belajar, catatan latihan, kartu program | Filter kelas → program → tanggal mulai → level → sesi yang menyesuaikan durasi → tujuan → rencana belajar |
| `/contoh/sela-wear` | Ink/lilac, hero editorial penuh, wordmark besar, koleksi dua kolom | Filter kategori → ukuran/warna → tas terpisah per varian → tambah/kurang/hapus → subtotal dan ringkasan |

## File dan batas

- `lib/studio-examples.ts`: lima konsep typed, data katalog, perhitungan harga/total, operasi tas immutable, validasi tanggal kalender.
- `components/concepts/studio-examples.tsx` dan `.module.css`: hero berbeda, navigasi mobile, seluruh bagian katalog/cerita/proses/FAQ/footer, form dan tas. Menggunakan font lokal Satoshi/Outfit dari layout dan `next/image`.
- `app/contoh/[slug]/page.tsx`: Promise params sesuai panduan Next lokal; lima static params, unknown slug `notFound`, canonical masing-masing route, robots noindex, metadata gambar per konsep.
- `tests/studio-examples.test.mjs`: kontrak data, harga ukuran buket, pemisahan varian, penggabungan/kuantitas tas, subtotal, dan tanggal tidak valid.

Koordinator menyediakan gambar `/public/images/concepts/{slug}/hero.webp` dan `detail.webp` (10 file). Komponen tidak memakai stok eksternal atau gambar untuk membuktikan peristiwa nyata. Foto katalog contoh tidak merupakan jaminan produk fisik yang tersedia.

Input tanggal menolak masa lalu. Model motor wajib diisi. Pesan kartu/catatan dibatasi panjangnya. Tas membatasi 20 item per varian, dapat kosong, dan tombol ringkasan nonaktif sebelum ada pilihan. Semua perubahan pilihan menghapus ringkasan lama agar tidak menampilkan harga/rencana usang. State hanya bertahan selama halaman terbuka.

Target responsive: desktop 1440px dan mobile 390px, menu mobile dengan aria-expanded, label input, pressed state filter/slot, status inline, FAQ native details, fokus keyboard, dan prefers-reduced-motion. Inspeksi render desktop/mobile oleh QA tetap diperlukan setelah gambar tersedia; klaim visual lulus harus berdasarkan screenshot aktual.

## Pemeriksaan

Jalankan Node24 proyek untuk `node --experimental-strip-types --test tests/studio-examples.test.mjs`, ESLint pada tiga file TS/TSX, lalu typecheck. Build, server, deploy dan completion registry dikelola koordinator agar tidak bertabrakan dengan penulis lain. Tidak ada build/deploy dijalankan oleh Sora.

Hasil pemeriksaan Sora pada versi penyerahan: lima tes unit lulus; ESLint tanpa temuan; TypeScript `--noEmit --incremental false` lulus; detector Impeccable menghasilkan `[]`. Review React memeriksa state turunan tanpa effect, pembaruan tas immutable, komponen di level modul, label/pressed/disabled/status, serta gambar Next dengan sizes. Inspeksi screenshot dan flow browser merupakan tahap QA koordinator sesudah gambar diimpor.
