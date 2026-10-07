# Scope dan urutan pengerjaan

## Tahap 1 — keamanan dan penerimaan inquiry

Deliverable: API server tervalidasi; SQL RLS/consent/deduplikasi/rate limit; dua formulir; admin Auth/allowlist/pagination; outbox notifikasi owner dan retry; error state; pause API AI/payment; build tanpa `db push`; pengujian regresi.

Selesai lokal bila acceptance A01–A12 lulus tanpa akses database/provider produksi. Selesai produksi bila migrasi, env, akun owner, dan uji alur lengkap pada preview serta produksi terverifikasi. Akses dashboard masih diperlukan untuk langkah produksi.

## Tahap 2 — kejelasan penawaran dan kepercayaan

Deliverable: canonical apex, sitemap, penawaran AI berstatus demo, scope jasa tertulis, klaim pembayaran sesuai kemampuan akun, privacy sesuai pengumpulan nyata. Dependency security ditangani sebelum rilis; kompatibilitas diperiksa tanpa upgrade major paksa.

Selesai bila public copy sesuai layanan yang benar-benar dapat diserahkan dan QA mobile/desktop tidak menemukan blocker.

## Tahap 3 — operasi proyek pertama

Deliverable: kit hospitality konten terpisah, generator repository sendiri, tracker proyek/pembayaran, template proposal/onboarding/invoice/scope/launch; dry-run fiktif brief→preview→revisi→handover→restore. Hosting komersial, metode pembayaran nyata, inbox receipt dan domain/HTTPS memerlukan akses akun; statusnya dipisahkan dari hasil lokal.

## Tahap 4 — penjualan terukur

Jalankan satu eksperimen 20 prospek manual, satu niche, maksimal dua pasar pembanding. Siapkan pesan yang personal dan review ringkas. Pengiriman outreach hanya atas instruksi eksplisit owner. Evaluasi berdasarkan respons berkualitas dan deposit, lalu pertahankan/ubah satu variabel.

## Di luar scope sekarang

- Memperbaiki seluruh produk SaaS AI, ledger kredit dan webhook payment secara end-to-end. Endpoint dipause sampai proyek khusus selesai.
- Implementasi portal/PMS/booking/analytics lengkap/subscription/outreach massal/AI baru sebelum gate pembeli dan dana. Requirements/roadmap disiapkan sekarang.
- Redesign semua halaman Indonesia, migrasi seluruh demo, atau fitur yang tidak membantu transaksi pertama.
- Mengaktifkan/menagih layanan berbayar tanpa anggaran dan keputusan owner.

## Aturan perubahan

Setiap fitur baru mencatat: masalah klien, manfaat untuk deposit/delivery, biaya berulang, jam pengerjaan, risiko, dan acceptance. Tidak masuk sprint kalau kebutuhan inti belum lulus. Owner menyetujui perubahan komersial klien secara tertulis; Codex mencatat keputusan teknis pada decision log.
