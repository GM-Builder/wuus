# PRD — sistem minimum untuk klien internasional

## Masalah dan hasil yang dituju

WUUS sudah punya website dan demo, tetapi belum punya klien berbayar. Pada audit awal, formulir dapat menampilkan sukses saat penyimpanan gagal, admin memakai PIN/flag browser, dan AI builder memiliki jalur berbiaya yang belum layak dibuka publik. Perbaikan kode lokal sudah dibuat; penerapan dan verifikasi produksi tetap diperlukan.

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
| FR-11 | Pemberitahuan owner | Inquiry dan outbox satu transaksi; fixed owner recipient; email gagal tidak menghilangkan lead; retry berizin dan bounded; actual inbox receipt diuji saat rilis |
| FR-12 | Kit hospitality reusable | Konten/foto/kamar/identitas dipisahkan; story, gallery, amenities, lokasi/FAQ, inquiry langsung dan existing booking link; tidak membuat inventori sendiri |
| FR-13 | Isolasi setiap klien | Repository, konfigurasi, aset, preview, hosting project dan domain tersendiri; tidak bergantung pada runtime WUUS |
| FR-14 | Tracker solo | Status, next action, due date, verified payment dan scope changes terlihat; max dua aktif dan satu fokus produksi |
| FR-15 | Dry-run | Simulasi fiktif inquiry sampai handover, revisi dan restore versi/source archive menghasilkan bukti nyata; tanpa mengklaim uang/approval klien nyata |

## Kebutuhan nonfungsional

- Tidak mengandalkan state memory proses serverless untuk rate limit.
- Pesan error tidak membocorkan key, SQL, isi log, atau identitas prospek lain.
- Tidak mencatat body inquiry atau token di log aplikasi.
- Form usable pada mobile dan keyboard, status diumumkan ke pembaca layar.
- Storage/config inquiry hilang → respons gagal yang jelas. Email gagal setelah lead tersimpan → antrean retry dan status owner; tidak mengklaim inbox delivery.
- Retensi operasional yang diusulkan: hapus prospek tidak aktif setelah 90 hari, kecuali diperlukan untuk hubungan aktif; data akuntansi mengikuti kewajiban owner. Retensi manual sampai job khusus dibuat.
- Permintaan akses/hapus data ditangani owner; hindari data sensitif di inquiry.

## Batas dan ukuran bisnis

Persyaratan portal besar, PMS/booking engine, analytics lengkap, subscription, outreach massal dan AI baru disiapkan di FUTURE-ROADMAP; implementasi dimulai setelah kebutuhan pembeli dan pendanaan jelas. Tidak menjanjikan sertifikasi hukum, uptime kontraktual atau kenaikan booking. Maksimum dua proyek aktif, satu fokus produksi, serta dua review gratis/hari sampai durasi aktual diketahui.

Sasaran validasi: 20 prospek berkualitas per eksperimen, catat balasan relevan, percakapan, proposal, deposit, dan jam kerja. Sasaran pertama 30 hari: **1 deposit**, dengan kemungkinan hasil nol tetap diakui. Negara tidak dipilih hanya berdasarkan pendapatan nasional; kemampuan membeli dinilai dari bisnis, masalah, otoritas keputusan, dan urgensi.

## Gate

**Siap menerima inquiry:** FR-01 sampai FR-07 lolos lokal dan produksi, email owner dapat mengirim/menerima, admin dipantau setiap hari.

**Siap menerima deposit:** penawaran tertulis disetujui, akun pembayaran dan invoice verified, biaya hosting komersial terdanai, aset/hak pakai dipastikan, jadwal realistis.

**Siap menyerahkan:** acceptance klien tertulis, QA, backup dan uji pemulihan, pelunasan, handover. Selesai kode lokal tidak sama dengan gate produksi lulus.
