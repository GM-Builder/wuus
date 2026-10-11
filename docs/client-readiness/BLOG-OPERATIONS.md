# Blog WUUS: operasi editorial — 11 Oktober 2026

Alur aktif adalah **Manager → Writer → Editor/revisi → QA → API → Supabase → blog publik**. Owner mengizinkan auto-publish setelah lolos pemeriksaan. Tidak perlu memilih tema atau memberi izin ulang untuk setiap artikel dalam scope hospitality WUUS.

## Produksi harian

Manager memilih pertanyaan pembeli yang relevan untuk properti independen tanpa website resmi atau hanya landing page. Target adalah tiga draft berkualitas per hari; artikel yang gagal review ditahan, sehingga jumlah publikasi dapat lebih rendah. Writer menyimpan versi dan sumber; Editor memeriksa konten. QA harus mencatat pemeriksaan fakta, orisinalitas, bahasa, relevansi hospitality, brand dan klaim, disertai kutipan dari sumber yang benar-benar diambil. Persetujuan mengacu ke hash versi konkret. Revisi membatalkan QA versi sebelumnya.

Publisher lokal mengambil versi terbaru yang disetujui. Sesudah probe konfigurasi, publisher mengirim JSON ke API menggunakan key khusus. Artikel dianggap terbit sesudah receipt database dan hash halaman publik cocok. Kiriman tidak pasti diperiksa melalui receipt tanpa mengulang POST secara buta.

## Setup dan operasi

Ikuti [setup database publishing](BLOG-DATABASE-PUBLISHING.md): SQL blog 03, verify 04, key publikasi di Vercel Production, satu deployment kode melalui GitHub. SQL inquiry yang selesai tidak perlu diulang. Artikel berikutnya tidak memerlukan GitHub push, Vercel CLI, SQL manual atau deployment.

Office masih lokal. PC, koneksi, Eve dan worker internal harus aktif untuk pekerjaan baru. Artikel yang sudah terbit tetap dibaca dari Supabase oleh website ketika PC mati. Telegram dipakai untuk laporan/kontrol; antrean internal berjalan terpisah dari koneksi Telegram. Izin ini tidak mencakup pengiriman outreach, posting sosial, pembelian layanan atau perluasan akses.

API v1 membuat publikasi baru secara idempoten; belum menyediakan CMS/media upload, edit artikel published atau penarikan otomatis. Simpan revisi dan minta proses koreksi terpisah jika artikel published perlu diperbaiki. Jangan menganggap target volume sebagai bukti pemasukan.

## Konten dan tampilan

Blog publik memakai bahasa Inggris, logo WUUS dan identitas brand, tanpa foto/nama owner atau tim manusia palsu. Renderer Markdown tidak menjalankan HTML/MDX; tautan dibatasi, gambar remote dalam body tidak dirender. Metadata, canonical, sitemap dan BlogPosting berasal dari artikel published yang tanggalnya valid. Hindari rating, testimonial, hasil penjualan dan klaim hukum/pembayaran tanpa bukti.

File lokal `content/blog` hanya menjadi draft development/warisan. Import manual selalu menghasilkan draft. Preview `/blog/preview/<slug>` hanya tersedia pada development, noindex/nofollow; produksi dan Vercel Preview mengembalikan 404. Artikel contoh `prepare-your-hotel-website` tetap draft.
