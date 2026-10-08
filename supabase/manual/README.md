# SQL manual untuk owner — 8 Oktober 2026

Owner memilih menjalankan sendiri melalui Supabase SQL Editor. **Tidak perlu login CLI untuk langkah manual ini.** Paket ini menyiapkan database; tidak membuat akun Auth, mengatur secret hosting, mengirim email atau mempublikasikan website.

## Urutan yang dijalankan

1. Buka **proyek Supabase yang benar → SQL Editor → query baru**. Pastikan proyek aktif. Bila tabel sudah berisi data, simpan backup data/schema dan policy/grants secara privat sebelum perubahan. Hasil inspect bukan backup penuh data. Pertahankan salinan release lama dan jadwalkan perubahan bersama deployment aplikasi aman; form browser versi lama akan berhenti menulis setelah akses langsung dicabut.
2. Buka [00-inspect.sql](00-inspect.sql), salin **seluruh isi**, lalu Run. Query hanya membaca metadata, bukan isi lead. Simpan hasil privat. Periksa dependent views, trigger, dan security-definer routines: routine yang memanggil routine lain atau dynamic SQL tetap membutuhkan review. Jangan mengirim function bodies/secret atau data pelanggan ke chat.
3. Buka [01-apply.sql](01-apply.sql), salin **seluruh isi**, lalu Run sebagai satu query. Tidak ada placeholder email/password/UUID yang perlu diganti di file ini. Script membungkus tiga migrasi dalam **satu transaksi**: RLS/private leads, limiter/RPC server, outbox notifikasi, dan penghentian tracking skor publik. Record historis dipertahankan; policy publik dan table/column/sequence grants terkait dicabut. Lead historis tidak dimasukkan ke antrean email.
4. Buka [02-verify.sql](02-verify.sql), salin seluruh isi, lalu Run. Semua baris harus **PASS**. Simpan waktu, project reference dan hasil privat. PASS hanya membuktikan pemeriksaan skema/permission yang tercantum, bukan login/API/konkurensi/inbox produksi.

Jika apply berhenti: jangan menghapus tabel/data/view untuk memaksa lulus. Kirim pesan error yang menyebut object/type saja untuk diperiksa. Transaksi gagal tidak melakukan commit; jika editor memakai koneksi transaksi yang masih aborted, jalankan `ROLLBACK;` sebelum mengulang. Timeout/putus koneksi bisa membuat hasil commit tidak pasti: jalankan verify dahulu, periksa status di dashboard, lalu tentukan perlu mengulang. Script dapat dijalankan ulang pada schema yang cocok; bukan alasan mengulang tanpa memeriksa hasil sebelumnya.

Safety checks mengenali ID numerik, kolom yang sesuai, generator/index ID, mandatory custom columns, trigger lama, publicly readable view chains dan callable definer yang secara langsung mereferensikan data WUUS. Schema dengan ID UUID/custom types atau dependent objects perlu adaptasi tersendiri. Pemeriksaan statis tidak mendeteksi semua dynamic SQL/indirect access; inspect/manual review dan REST staging tetap wajib.

## Akun owner dan environment sesudah SQL

Di **Authentication → Users**, buat atau pilih akun owner dengan login **email/password** yang sudah berfungsi, lalu salin user UUID. Jangan membuat user dengan INSERT langsung ke `auth.users`. Jika menggunakan invitation, selesaikan konfirmasi dan pengaturan password sebelum menguji dashboard. UUID masuk allowlist server; `authenticated` tetap tidak diberi akses langsung ke tabel lead. Dokumentasi [Supabase Users](https://supabase.com/docs/guides/auth/users).

Di environment **project hosting yang benar**, isi:

| Nama | Nilai yang disiapkan owner |
| --- | --- |
| NEXT_PUBLIC_SUPABASE_URL | Project URL aktif |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | publishable/anon key proyek yang sama |
| SUPABASE_SERVICE_ROLE_KEY | server secret/service_role key; tidak pernah NEXT_PUBLIC |
| WUUS_ADMIN_USER_IDS | UUID Auth owner |
| WUUS_RATE_LIMIT_SECRET | random secret baru minimal 32 karakter |
| WUUS_ALLOWED_ORIGINS | exact preview origin jika dipakai; apex sudah diizinkan aplikasi |

Key/password disimpan langsung di environment/provider, bukan chat/Git. Host Supabase pada config lokal lama belum resolvable saat audit; jangan menyalin config lama tanpa mencocokkan proyek aktif. Secret limiter dapat dibuat lokal dengan `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`; simpan hasil langsung ke environment privat. Redeploy diperlukan karena public config masuk build.

Notifikasi owner: lanjutkan [panduan Zoho + Resend](../../docs/client-readiness/EMAIL-SETUP.md). Setelah deploy: inquiry sintetis → owner login → data tampil/status berubah → satu notifikasi benar-benar masuk inbox. Uji anon/nonowner langsung REST/API dan konkurensi di staging. Jangan menggunakan regression yang menulis data uji pada database produksi.

## Sumber dan pencatatan

`01-apply.sql` dihasilkan oleh `node scripts/build-manual-supabase-sql.mjs` dari migration 001/002/003, safety checks dan verify; SHA-256 masing-masing sumber dicantumkan. Unit test memastikan bundle tidak menyimpang dari sumber. Tidak ada SQL reset/drop tabel, default admin password atau penempatan service key dalam script.

Owner mencatat manual apply date/project/bundle commit privat. Paket tidak mengubah tabel internal `supabase_migrations`. Supabase menjelaskan bahwa perubahan lewat SQL Editor melewati migration history; sebelum memakai `db push` pada proyek ini di kemudian hari, reconcile schema/history terhadap tiga file sumber dahulu. Jangan langsung reset database. [Database migrations](https://supabase.com/docs/guides/deployment/database-migrations).
