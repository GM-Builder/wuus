# Acceptance dan rencana QA

| ID | Skenario | Hasil wajib | Cara verifikasi |
| --- | --- | --- | --- |
| A01 | Form valid dari kedua halaman | Sukses hanya setelah penyimpanan; 1 record | Unit handler dengan DB fake + E2E preview setelah konfigurasi |
| A02 | Database gagal / konfigurasi hilang / network putus | Pesan gagal, isian tetap, manual email terlihat, tidak auto-mailto | Unit fake store gagal + browser preview |
| A03 | Consent false, email invalid, URL javascript, body besar | Ditolak tanpa tulis DB | Unit + HTTP lokal |
| A04 | Honeypot terisi | Ditolak tanpa tulis DB | Unit |
| A05 | Retry ID sama / ID sama payload berbeda / burst > batas | Retry tidak duplikat; konflik ditolak; burst 429 | Unit + SQL regression di DB staging |
| A06 | anon dan authenticated langsung REST tabel/RPC | Tidak dapat read/update/insert/delete; RPC hanya service_role | SQL privileges/RLS + REST staging tanpa mengambil data nyata |
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
| A17 | Owner notification | Antrean atomik, gagal provider tetap menyimpan lead, fixed recipient, lease/idempotency/bounded retry; inbox nyata menerima | SQL + provider stub lokal + owner/cron denial; provider receipt produksi |
| A18 | Kit konten hospitality | Section lengkap, foto/URL tervalidasi, HTML escaped, fictional/missing approval tidak lolos production build | Unit + independent sample build + browser widths/form/privacy |
| A19 | Isolasi client | Repo/config/assets/preview/deploy tersendiri; tidak memakai WUUS lead DB | Generator + source review; hosting/client remote saat onboarding |
| A20 | Tracker pembayaran | Simulasi/bukti missing tidak dihitung, currency tidak dicampur, approved CR/refund tercatat | Formula scenario tests, error scan, render semua tab |
| A21 | Restore | Source ZIP/checksum dan Git previous/final release bisa dibangun ulang identik di folder baru | delivery-simulation-report.json |
| A22 | www | 308 ke apex dengan path/query utuh; DNS/HTTPS/canonical live benar | Local real Host-header HTTP pass; akun DNS/hosting untuk live |
| A23 | Tes skor lama | Perhitungan lokal; browser tidak menulis DB; data historis tetap ada; role publik tidak dapat CRUD/sequence | Migration 003 PGlite: tabel tidak ada, policy terbuka, rerun, preservasi dan denial anon/authenticated; inventory views/routines staging |

QA manual: lebar 360/390/768/1440, keyboard tab/focus/submit, status `aria-live`, double-click, retry setelah timeout, browser back/refresh, email panjang dan notes maksimum. Respons error tidak berisi SQL/key/body. Periksa bahwa logo/demo/link dan navigasi tetap berfungsi. Tidak membuat transaksi keuangan atau memanggil AI live untuk uji lokal.

`npm run test:integration` menjalankan API Next.js asli dengan PostgreSQL lokal (PGlite) dan adapter Auth/PostgREST simulasi. Tidak menghubungkan production DB. Hentikan `next dev` lain di repositori sebelum menjalankannya. Adapter ini menguji integrasi aplikasi, tidak menggantikan role/token/REST di Supabase asli. Advisory locks disediakan SQL; concurrency multi-connection masih harus diuji di staging karena PGlite memakai satu koneksi.
