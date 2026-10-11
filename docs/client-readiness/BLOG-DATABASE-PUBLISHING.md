# Blog WUUS: publikasi langsung ke database

Arsitektur yang berlaku mulai 11 Oktober 2026:

**Office → Writer → Editor/revisi → QA dengan sumber aktual → API WUUS → Supabase → blog publik.**

GitHub → Vercel tetap digunakan untuk kode dan desain. Artikel baru tidak memerlukan commit, build atau Vercel CLI. Website membaca Supabase saat request; daftar blog, halaman artikel dan sitemap mengikuti data publik. Draft file lokal masih tersedia untuk preview development, tetapi produksi tidak menampilkan draft.

## Setup satu kali oleh owner

1. Di SQL Editor project Supabase WUUS yang sudah ada, jalankan `supabase/manual/03-blog-apply.sql`. Ini hanya menambah tabel blog, RLS dan RPC; tidak menyentuh inquiry/notifikasi. SQL inquiry 00–02 yang sudah dijalankan tidak perlu diulang.
2. Jalankan `supabase/manual/04-blog-verify.sql`. Semua hasil harus PASS. Ini pemeriksaan baca saja.
3. Tambahkan `WUUS_BLOG_PUBLISH_KEY` di Environment Variables **Production** project Vercel `wuus`. Nilainya harus sama dengan file privat `wuus-office/data/private/BLOG-PUBLISH-VERCEL.env`. Jangan ditempel ke chat/GitHub. Key ini khusus API artikel; key NGN dan Supabase service role tidak dipakai oleh agent.
4. Kode fitur ini masuk lewat GitHub seperti perubahan website biasa. Jika env ditambahkan setelah deployment, lakukan satu redeploy dari dashboard Vercel agar env terbaca. Tidak perlu login CLI.

Konfigurasi Supabase website yang sudah dipakai inquiry tetap dipakai: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Tidak perlu membuat project Supabase baru. Private key publikasi belum otomatis tersedia di dashboard Vercel hanya karena dibuat lokal.

## Kontrol akses dan kualitas

- Public/anon dan pengguna nonadmin hanya mendapat SELECT artikel published yang tanggalnya sudah berlaku. Draft/withdrawn/future tidak terbaca; INSERT/UPDATE/DELETE/TRUNCATE dan RPC publikasi ditolak.
- Bukti QA dan payload idempotensi disimpan di schema privat, bukan bersama konten publik.
- API mengharuskan Bearer key khusus minimal 32 karakter, JSON dengan ukuran terbatas, format metadata/body dan persetujuan QA. Key kosong tidak dapat mengaktifkan API.
- Worker memeriksa versi terbaru, hash body, review Editor dan persetujuan QA tersimpan; bukti sumber harus cocok dengan teks yang diambil.
- ID versi artikel menjadi kunci idempotensi. Kiriman identik mengembalikan receipt lama. Slug/ID yang bertabrakan dengan konten lain ditolak, tidak menimpa artikel.
- Status terbit hanya dicatat setelah receipt database dan hash pada halaman publik cocok. Kiriman tidak pasti diperiksa melalui GET receipt; POST tidak diulang buta.
- Pemeriksaan model tidak menjamin seluruh fakta benar atau artikel bebas plagiarisme. Jika review gagal, artikel ditahan. Target tiga draft/hari bukan janji tiga publikasi/hari.

Publisher melakukan probe baca sebelum kiriman pertama. Jika route/key/SQL belum tersedia, artikel tetap approved dan menunggu setup; tidak diklaim terbit. Akun Vercel dan database produksi belum diverifikasi hanya karena tes lokal lulus.

## Operasi

Office tetap lokal: PC, internet, Eve dan worker internal harus aktif untuk membuat/mengirim artikel baru. Artikel yang sudah tersimpan di Supabase tetap tersedia di website ketika PC mati. Laporan dan balasan Telegram mengikuti koneksi Telegram.

File yang pernah disiapkan oleh publisher deployment lama tidak otomatis dipublikasikan melalui GitHub. Mode deployment artikel lama dinonaktifkan. Perubahan isi artikel published atau penarikan artikel memerlukan alur editorial terpisah; API v1 hanya membuat publikasi baru dan mengembalikan receipt.
