# Acceptance dan rencana QA

| ID | Skenario | Hasil wajib | Cara verifikasi |
| --- | --- | --- | --- |
| A01 | Form valid dari kedua halaman | Sukses hanya setelah penyimpanan; 1 record | Unit handler dengan DB fake + E2E preview setelah konfigurasi |
| A02 | Database gagal / konfigurasi hilang / network putus | Pesan gagal, isian tetap, manual email terlihat, tidak auto-mailto | Unit fake store gagal + browser preview |
| A03 | Consent false, email invalid, URL javascript, body besar | Ditolak tanpa tulis DB | Unit + HTTP lokal |
| A04 | Honeypot terisi | Ditolak tanpa tulis DB | Unit |
| A05 | Retry ID sama / ID sama payload berbeda / burst > batas | Retry tidak duplikat; konflik ditolak; burst 429 | Unit + SQL regression di DB staging |
| A06 | anon dan authenticated langsung REST tabel/RPC | Tidak dapat read/update/insert; RPC hanya service_role | SQL privileges/RLS + REST staging tanpa mengambil data nyata |
| A07 | Tanpa token, token palsu, user non-owner, allowlist kosong | Admin API menolak, tidak query data | Unit guard + integrasi HTTP lokal; Auth asli di staging |
| A08 | Owner read dan status update; ID/status invalid; DB update gagal | 200 untuk valid; gagal jelas; Cache-Control no-store | Unit + staging Auth; logout hapus data UI |
| A09 | Semua API builder termasuk payment webhook | 503 sebelum Clerk/DB/AI/payment side effects saat pause | Inventaris + HTTP lokal per endpoint |
| A10 | Build builder | Generate Prisma lokal boleh; tidak ada `db push` | Inspect script + build |
| A11 | Types, lint file baru/ubah, build, audit dependencies | Tidak ada error dari perubahan; risiko audit tersisa tercatat | npm scripts + npm audit; pisahkan baseline lint lama |
| A12 | Canonical, robots, sitemap, AI copy | Domain apex; tidak ada admin sitemap; AI tidak dijual sebagai fitur live | Build + HTTP + browser |
| A13 | Release database | Backup/export aman, migrasi transaksional, RLS/privilege regression pass | Checklist runbook; tidak memakai DB produksi untuk test destruktif |
| A14 | Release aplikasi | Submit inquiry sintetis → owner lihat → status berubah → hapus test | Preview lalu produksi; catat waktu, deploy ID, bukti tanpa PII |
| A15 | Penerimaan uang | Akun dapat menerima dari negara target; biaya/payout/hosting terdanai | Dashboard/account eligibility + verifikasi inbox; jangan berasumsi Wise/SEPA tersedia |
| A16 | Delivery | Scope cocok, 2 ronde revisi, backup restore, handover | Dry-run dan checklist proyek privat |

QA manual: lebar 360/390/768/1440, keyboard tab/focus/submit, status `aria-live`, double-click, retry setelah timeout, browser back/refresh, email panjang dan notes maksimum. Respons error tidak berisi SQL/key/body. Periksa bahwa logo/demo/link dan navigasi tetap berfungsi. Tidak membuat transaksi keuangan atau memanggil AI live untuk uji lokal.

`npm run test:integration` menjalankan API Next.js asli dengan PostgreSQL lokal (PGlite) dan adapter Auth/PostgREST simulasi. Tidak menghubungkan production DB. Hentikan `next dev` lain di repositori sebelum menjalankannya. Adapter ini menguji integrasi aplikasi, tidak menggantikan role/token/REST di Supabase asli. Advisory locks disediakan SQL; concurrency multi-connection masih harus diuji di staging karena PGlite memakai satu koneksi.
