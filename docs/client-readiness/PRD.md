# PRD — sistem minimum untuk klien internasional

## Masalah dan hasil yang dituju

WUUS sudah punya website dan demo, tetapi belum punya klien berbayar. Formulir sekarang bisa menampilkan sukses saat penyimpanan gagal. Admin memakai PIN dan flag browser. AI builder memiliki jalur berbiaya serta pembayaran yang belum layak dibuka publik. Ini menghambat kepercayaan, tindak lanjut, dan kendali biaya.

Produk tahap awal adalah **layanan pembuatan website dengan inquiry langsung**, bukan SaaS yang menerima pembayaran otomatis. Hasil bisnis yang dituju: satu proyek dengan scope tertulis, deposit benar-benar diterima, dan delivery yang bisa diselesaikan solo. Ukuran keberhasilan produk: semua inquiry tersimpan atau menunjukkan kegagalan dengan jelas; data prospek hanya dapat diakses owner; klien memahami deliverable, biaya, dan siapa pemilik akun.

## Pengguna dan alur utama

- Calon klien: membuka demo → meminta review/proposal → mendapat konfirmasi penyimpanan → menerima balasan manusia.
- Owner: login → membaca inquiry → menyiapkan review → mencatat tindak lanjut → mengirim proposal → memverifikasi deposit → mengerjakan proyek.
- Klien berbayar: mengirim aset → menyetujui preview → menyelesaikan revisi → melunasi → menerima akun, source, dan panduan.

## Kebutuhan fungsional

| ID | Kebutuhan | Kriteria penerimaan |
| --- | --- | --- |
| FR-01 | Satu API inquiry untuk `/hospitality` dan `/review` | Validasi server, consent wajib, batas ukuran; sukses hanya setelah database mengonfirmasi simpan; kegagalan tidak menghapus isian |
| FR-02 | Pengendalian spam dan retry | Honeypot ditolak tanpa simpan; pembatasan persisten per sumber jaringan; ID permintaan mencegah duplikasi retry |
| FR-03 | Admin terverifikasi server | JWT diverifikasi ke Supabase Auth dan user ID masuk allowlist server; anonymous/non-owner gagal; tidak ada PIN publik |
| FR-04 | Pipeline inquiry | Owner dapat membaca dan mengubah status yang diizinkan; gagal simpan ditampilkan; respons admin tidak di-cache |
| FR-05 | Data prospek terlindungi | RLS aktif, hak anon/authenticated ke tabel dicabut; penulisan/pembacaan layanan melalui server; key server tidak masuk bundle browser |
| FR-06 | Kendali biaya AI | API builder dipause sebelum panggilan provider/database berbiaya; tidak ada top-up publik atau mutasi kredit publik |
| FR-07 | URL publik konsisten | Canonical dan sitemap menggunakan domain apex yang hidup; admin/demo privat tidak masuk sitemap |
| FR-08 | Penawaran bisa dipenuhi | Jasa website ber-scope jelas; AI ditandai demonstrasi dan belum tersedia untuk pembelian; payment method hanya setelah akun verified |
| FR-09 | Build aman | Build tidak mengubah schema database; migration produksi dilakukan terpisah setelah backup |
| FR-10 | Delivery dan pembayaran manual | Template brief, proposal, invoice, perubahan scope, QA, dan handover tersedia; owner mencatat uang diterima terpisah dari pipeline |

## Kebutuhan nonfungsional

- Tidak mengandalkan state memory proses serverless untuk rate limit.
- Pesan error tidak membocorkan key, SQL, isi log, atau identitas prospek lain.
- Tidak mencatat body inquiry atau token di log aplikasi.
- Form usable pada mobile dan keyboard, status diumumkan ke pembaca layar.
- Failure mode: konfigurasi hilang/provider gagal → respons gagal yang jelas, bukan sukses semu.
- Retensi operasional yang diusulkan: hapus prospek tidak aktif setelah 90 hari, kecuali diperlukan untuk hubungan aktif; data akuntansi mengikuti kewajiban owner. Retensi manual sampai job khusus dibuat.
- Permintaan akses/hapus data ditangani owner; hindari data sensitif di inquiry.

## Batas dan ukuran bisnis

Belum membangun booking engine, pembayaran tamu hotel, multi-tenant CRM, live AI concierge, subscription, maupun jaminan kenaikan booking. Tidak menjanjikan sertifikasi kepatuhan hukum atau uptime kontraktual. Maksimum satu proyek aktif dan dua review gratis per hari sampai durasi aktual diketahui.

Sasaran validasi: 20 prospek berkualitas per eksperimen, catat balasan relevan, percakapan, proposal, deposit, dan jam kerja. Sasaran pertama 30 hari: **1 deposit**, dengan kemungkinan hasil nol tetap diakui. Negara tidak dipilih hanya berdasarkan pendapatan nasional; kemampuan membeli dinilai dari bisnis, masalah, otoritas keputusan, dan urgensi.

## Gate

**Siap menerima inquiry:** FR-01 sampai FR-07 lolos lokal dan produksi, email owner dapat mengirim/menerima, admin dipantau setiap hari.

**Siap menerima deposit:** penawaran tertulis disetujui, akun pembayaran dan invoice verified, biaya hosting komersial terdanai, aset/hak pakai dipastikan, jadwal realistis.

**Siap menyerahkan:** acceptance klien tertulis, QA, backup dan uji pemulihan, pelunasan, handover. Selesai kode lokal tidak sama dengan gate produksi lulus.
