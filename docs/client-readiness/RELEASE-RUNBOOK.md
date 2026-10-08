# Release runbook

Status: perubahan lokal. Migrasi tersimpan bukan bukti produksi sudah aman. Tidak ada test lokal yang memakai database produksi atau provider AI/payment live.

Owner update 8 Oktober 2026: memilih menjalankan SQL lewat dashboard. Gunakan `supabase/manual/README.md`: inspect/backup → `01-apply.sql` satu transaksi berisi migration 001/002/003 → `02-verify.sql`. CLI login tidak diperlukan untuk langkah tersebut. Jangan menerapkan lagi lewat CLI tanpa reconcile manual schema/history. Email inbox Zoho sudah ada; follow EMAIL-SETUP.md. Payment recommendation di PAYMENTS.md tetap memerlukan rekening/rute aktual.

Update bukti owner: inventory awal direview; owner mengirim 24 PASS pada dua output identik (apply sudah mencetak verify sesudah commit). Jangan ulang apply/migration hanya untuk melanjutkan rilis. Screenshot Vercel mengidentifikasi project `wuus`, akun `gm-builder-9019`, apex Valid Configuration pada Production, plan Hobby. CLI lokal masih `binahubid-7508`: belum mendapat akses akun produksi tersebut. Zoho menunjukkan pengguna admin/hallo aktif; Resend memakai root domain. Lihat [langkah owner berikutnya](OWNER-NEXT-STEPS.md).

**Update rilis 8 Oktober 05:38 UTC:** owner melaporkan env Vercel updated dan mengotorisasi commit/push. GitHub deployments mengonfirmasi repository GM-Builder/wuus dan wuus-builder, branch main; push fast-forward memicu production deploy sukses tanpa memakai CLI Vercel BinaHub. Website canonical/contact/admin denial dan builder 19/19 pause live terverifikasi. Langkah yang masih perlu dilakukan: positive inquiry/owner login/status/inbox, www, commercial hosting serta payment/backup gates. Dua laporan qa/production-*-20261008.json mencatat commit dan batas pemeriksaan. Bagian staging/migrasi di bawah adalah prosedur untuk pekerjaan berikutnya, bukan instruksi apply ulang produksi owner.

## Konfigurasi dan staging

1. Pastikan akses proyek Supabase dan project `wuus` pada akun produksi owner `gm-builder-9019`; catat project/team IDs privat. CLI lokal BinaHub adalah akun berbeda, jangan menautkan/deploy ke project BinaHub lama. Screenshot akun produksi juga menampilkan Hobby. [Vercel Hobby](https://vercel.com/docs/plans/hobby) hanya personal nonkomersial. Lihat PRODUCTION-BLOCKERS.md; jangan membeli layanan tanpa pendanaan/keputusan owner.
2. Siapkan staging tanpa PII. Ekspor schema/data/policies/sequence grants lama ke penyimpanan privat. Cocokkan tipe `id`, constraint dan trigger dengan migration. Migrasi mempertahankan record lama tetapi mencabut semua policy lama pada tabel inquiry.
3. Untuk staging/proyek baru, review inventory read-only, dependent views dan security-definer routines. Terapkan **satu** alur: bundle manual `01-apply.sql` atau migration 001/002/003 melalui workflow CLI yang sudah direconcile, bukan keduanya. Proyek owner yang sudah dilaporkan 24 PASS tidak perlu apply ulang. Migration 003 menutup tracking `business_scores` tanpa menghapus record historis. Tes regresi `supabase/tests/inquiries.sql` hanya di staging (rollback). Uji anon/authenticated read/insert/update/delete dan RPC lewat REST Supabase asli, outbox/lease/retry serta multi-connection concurrency di staging.
4. Buat akun Supabase Auth owner dengan email yang dikendalikan owner. Tidak ada signup UI. Nonaktifkan signup provider bila tidak diperlukan dan tidak mengganggu aplikasi lain; aktifkan perlindungan login yang tersedia. Gunakan UUID owner dalam allowlist, bukan email/PIN.

## Environment

| Nama | Akses | Isi |
| --- | --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Browser/server | URL sesuai lingkungan |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Browser/server | publishable/anon key; data dilindungi RLS |
| SUPABASE_SERVICE_ROLE_KEY | Server saja | service_role/secret key, tidak pernah NEXT_PUBLIC |
| WUUS_ADMIN_USER_IDS | Server saja | UUID owner, comma-separated |
| WUUS_RATE_LIMIT_SECRET | Server saja | random secret ≥32 karakter, berbeda per lingkungan |
| WUUS_ALLOWED_ORIGINS | Server saja | exact preview origins, comma-separated; tanpa wildcard |
| RESEND_API_KEY | Server saja | key provider email dengan sender domain verified |
| WUUS_NOTIFICATION_FROM | Server saja | `hallo@webuntukusaha.com` setelah root domain Resend verified |
| WUUS_OWNER_EMAIL | Server saja | `admin@webuntukusaha.com`, recipient pilihan owner; uji actual inbox |
| CRON_SECRET | Server saja | optional scheduler Bearer secret ≥32 karakter |

Apex HTTPS otomatis diizinkan. Localhost:3000/3100 hanya mode development. Local production build/preview harus masuk allowed origins. Origin bukan autentikasi anti-bot. Browser memakai session Supabase SDK; server memverifikasi JWT ke Auth dan allowlist, bukan flag localStorage.

Rate limit lima inquiry baru per network/15 menit; retry identik tidak memakai slot tambahan. Network disimpan sebagai HMAC. Di Vercel `VERCEL=1` memakai [x-vercel-forwarded-for](https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for); verifikasi header tanpa mencetak IP. Host lain memakai satu bucket fallback sampai adapter IP tepercaya dibuat. Pengunjung berbagi NAT dapat terkena limit. Admin memakai pagination 100/page, pencarian pada halaman aktif dan request ID; record lama tetap bisa dibuka.

## Verifikasi dan rilis

Website: `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`, `npm audit --omit=dev`.

Tambahan lokal: `npm run test:integration` sebelum build, tanpa server development lain yang aktif. Fixtures mengganti env Supabase dengan URL loopback/key sintetis dan membersihkan proses serta database memory setelah uji.

Builder: `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev`. Tidak ada `db push` pada build. Semua API tetap 503.

Uji preview: submit satu inquiry sintetis pada kedua form → login owner → data tampil → status berubah. Anonymous/token palsu/non-owner ditolak. Database unavailable harus menampilkan gagal, menjaga isian dan menawarkan email manual. Hapus test dari dashboard DB; jangan menyimpan token/PII di bukti.

Urutan produksi:

1. Backup DB dan record deploy lama; siapkan maintenance window serta inbox manual yang bekerja.
2. Periksa provider builder: nonaktifkan invoice/top-up lama yang masih payable, tangani transaksi tertunda, lalu deploy containment. Webhook 503 dapat diretry provider; tidak membuktikan uang belum diterima.
3. Terapkan migration, server env, allowlist dan website secara terkoordinasi. Form lama tidak lagi dapat menulis anonim setelah revoke; jangan mempertahankan frontend lama sebagai release aktif.
4. Verifikasi Apex HTTPS, canonical, sitemap, kedua form, owner read/update, non-owner denial dan RLS produksi dengan data sintetis.
5. Konfigurasi sender/recipient email dan scheduler bila dipakai; verifikasi satu synthetic inquiry → satu outbox → provider accepted → inbox owner menerima. Retry tidak menggandakan lead/email; provider outage tidak menghilangkan lead. Ikuti NOTIFICATIONS.md. Owner tetap cek admin/inbox dua kali setiap hari kerja.
6. Catat deploy ID, waktu, bukti dan pemilik tindakan privat. Baru ubah backlog ke DONE.

## Pemulihan dan maintenance

Jika release gagal, pertahankan RLS/revoke dan email fallback. Jangan kembali ke PIN/anon table access atau membuka API builder lama. Redeploy server yang aman; rollback hanya ke release aman yang sudah diverifikasi. Reversi schema dari backup yang direview, jangan menghapus kolom/policy proteksi untuk membuat frontend lama bekerja.

Cek log status/error tanpa body/token dan biaya provider setiap hari minggu pertama. Owner meninjau retensi mingguan: periksa kandidat secara privat sebelum penghapusan; hapus bucket network >48 jam dan inquiry inactive >90 hari sesuai policy/kebutuhan hubungan aktif. Jangan menjalankan penghapusan pada build. Backup data privat mingguan dan latihan restore ke staging; export bukan untuk Git.

Catat advisory dev-only/baseline lint; jangan menutupinya dengan downgrade paksa atau ignoreBuildErrors. Rotate key di provider jika dicurigai bocor, ubah env dan redeploy, audit sesi/akses terkait.
