# Scope dan urutan pengerjaan

## Tahap 1 — keamanan dan penerimaan inquiry

Deliverable: API server tervalidasi; skema SQL dengan RLS, consent, deduplikasi, rate limit; dua formulir terhubung; admin Auth + allowlist; error state; pause API AI builder dan pembayaran; build tanpa `db push`; pengujian regresi.

Selesai lokal bila acceptance A01–A12 lulus tanpa akses database/provider produksi. Selesai produksi bila migrasi, env, akun owner, dan uji alur lengkap pada preview serta produksi terverifikasi. Akses dashboard masih diperlukan untuk langkah produksi.

## Tahap 2 — kejelasan penawaran dan kepercayaan

Deliverable: canonical apex, sitemap, penawaran AI berstatus demo, scope jasa tertulis, klaim pembayaran sesuai kemampuan akun, privacy sesuai pengumpulan nyata. Dependency security ditangani sebelum rilis; kompatibilitas diperiksa tanpa upgrade major paksa.

Selesai bila public copy sesuai layanan yang benar-benar dapat diserahkan dan QA mobile/desktop tidak menemukan blocker.

## Tahap 3 — operasi proyek pertama

Deliverable: isi satu proposal contoh dengan aset demo; dry-run brief→preview→revisi→handover; pilih hosting yang mengizinkan komersial dengan biaya tercatat; verifikasi metode pembayaran owner; latihan pemulihan backup. Ini memerlukan beberapa keputusan/akun owner dan tidak dapat dibuktikan hanya dari source code.

## Tahap 4 — penjualan terukur

Jalankan satu eksperimen 20 prospek manual, satu niche, maksimal dua pasar pembanding. Siapkan pesan yang personal dan review ringkas. Pengiriman outreach hanya atas instruksi eksplisit owner. Evaluasi berdasarkan respons berkualitas dan deposit, lalu pertahankan/ubah satu variabel.

## Di luar scope sekarang

- Memperbaiki seluruh produk SaaS AI, ledger kredit dan webhook payment secara end-to-end. Endpoint dipause sampai proyek khusus selesai.
- Dashboard billing, portal klien, multilingual massal, scraper lead, iklan berbayar, otomasi outreach.
- Redesign semua halaman Indonesia, migrasi seluruh demo, atau fitur yang tidak membantu transaksi pertama.
- Mengaktifkan/menagih layanan berbayar tanpa anggaran dan keputusan owner.

## Aturan perubahan

Setiap fitur baru mencatat: masalah klien, manfaat untuk deposit/delivery, biaya berulang, jam pengerjaan, risiko, dan acceptance. Tidak masuk sprint kalau kebutuhan inti belum lulus. Owner menyetujui perubahan komersial klien secara tertulis; Codex mencatat keputusan teknis pada decision log.
