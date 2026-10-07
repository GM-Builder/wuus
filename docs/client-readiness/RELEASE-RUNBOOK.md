# Release runbook

Status: perubahan lokal. Migrasi tersimpan bukan bukti produksi sudah aman. Tidak ada test lokal yang memakai database produksi atau provider AI/payment live.

## Konfigurasi dan staging

1. Pastikan akses proyek Supabase dan hosting yang benar; catat ID privat. Cek plan komersial. [Vercel Hobby](https://vercel.com/docs/plans/hobby) hanya personal nonkomersial; plan akun belum diketahui. Jangan membeli layanan tanpa pendanaan/keputusan owner.
2. Siapkan staging tanpa PII. Ekspor schema/data/policies/sequence grants lama ke penyimpanan privat. Cocokkan tipe `id`, constraint dan trigger dengan migration. Migrasi mempertahankan record lama tetapi mencabut semua policy lama pada tabel inquiry.
3. Terapkan `supabase/migrations/202610070001_secure_inquiries.sql`. Jalankan `supabase/tests/inquiries.sql`; semua data sintetis rollback. Uji juga role anon/authenticated langsung REST di Supabase asli.
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

Apex HTTPS otomatis diizinkan. Localhost:3000/3100 hanya mode development. Local production build/preview harus masuk allowed origins. Origin bukan autentikasi anti-bot. Browser memakai session Supabase SDK; server memverifikasi JWT ke Auth dan allowlist, bukan flag localStorage.

Rate limit lima inquiry baru per network/15 menit; retry identik tidak memakai slot tambahan. Network disimpan sebagai HMAC. Di Vercel `VERCEL=1` memakai [x-vercel-forwarded-for](https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for); verifikasi header pada deployment tanpa mencetak IP pengunjung. Host lain memakai satu bucket fallback konservatif sampai ada adapter IP tepercaya. Pengunjung berbagi NAT dapat terkena limit; ini bukan pertahanan sempurna terhadap bot terdistribusi. Admin menampilkan 500 inquiry terbaru; tambah pagination saat diperlukan.

## Verifikasi dan rilis

Website: `npm ci`, `npm test`, `npm run typecheck`, lint file terkait, `npm run build`, `npm audit --omit=dev`.

Tambahan lokal: `npm run test:integration` sebelum build, tanpa server development lain yang aktif. Fixtures mengganti env Supabase dengan URL loopback/key sintetis dan membersihkan proses serta database memory setelah uji.

Builder: `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm audit --omit=dev`. Tidak ada `db push` pada build. Semua API tetap 503.

Uji preview: submit satu inquiry sintetis pada kedua form → login owner → data tampil → status berubah. Anonymous/token palsu/non-owner ditolak. Database unavailable harus menampilkan gagal, menjaga isian dan menawarkan email manual. Hapus test dari dashboard DB; jangan menyimpan token/PII di bukti.

Urutan produksi:

1. Backup DB dan record deploy lama; siapkan maintenance window serta inbox manual yang bekerja.
2. Periksa provider builder: nonaktifkan invoice/top-up lama yang masih payable, tangani transaksi tertunda, lalu deploy containment. Webhook 503 dapat diretry provider; tidak membuktikan uang belum diterima.
3. Terapkan migration, server env, allowlist dan website secara terkoordinasi. Form lama tidak lagi dapat menulis anonim setelah revoke; jangan mempertahankan frontend lama sebagai release aktif.
4. Verifikasi Apex HTTPS, canonical, sitemap, kedua form, owner read/update, non-owner denial dan RLS produksi dengan data sintetis.
5. Verifikasi inbox kirim/terima. Belum ada email notification otomatis; owner cek admin dua kali setiap hari kerja.
6. Catat deploy ID, waktu, bukti dan pemilik tindakan privat. Baru ubah backlog ke DONE.

## Pemulihan dan maintenance

Jika release gagal, pertahankan RLS/revoke dan email fallback. Jangan kembali ke PIN/anon table access atau membuka API builder lama. Redeploy server yang aman; rollback hanya ke release aman yang sudah diverifikasi. Reversi schema dari backup yang direview, jangan menghapus kolom/policy proteksi untuk membuat frontend lama bekerja.

Cek log status/error tanpa body/token dan biaya provider setiap hari minggu pertama. Owner meninjau retensi mingguan: periksa kandidat secara privat sebelum penghapusan; hapus bucket network >48 jam dan inquiry inactive >90 hari sesuai policy/kebutuhan hubungan aktif. Jangan menjalankan penghapusan pada build. Backup data privat mingguan dan latihan restore ke staging; export bukan untuk Git.

Catat advisory dev-only/baseline lint; jangan menutupinya dengan downgrade paksa atau ignoreBuildErrors. Rotate key di provider jika dicurigai bocor, ubah env dan redeploy, audit sesi/akses terkait.
