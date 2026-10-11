# Verifikasi blog — 11 Oktober 2026

## Pemeriksaan lokal yang selesai

- Website: 47 tes lulus. Mencakup gate metadata, slug/tautan aman, import yang selalu draft, autentikasi publisher, batas input dan QA, konflik serta SQL blog yang dijalankan pada PGlite.
- SQL dapat dijalankan ulang. Tujuh hasil verify PASS. Pengunjung/authenticated tidak dapat menulis artikel, memanggil RPC publikasi atau membaca bukti QA privat; draft/future tidak terbaca. Kiriman identik menghasilkan receipt lama; konflik slug ditolak.
- Build Next 16.4 dan TypeScript lulus. Blog, halaman artikel, API dan sitemap adalah route dinamis. ESLint tidak memiliki error; warning unused legacy tetap terpisah.
- `node scripts/blog-database-smoke.mjs`: production Next server → API → SQL pada database fixture → receipt → halaman publik, index dan sitemap. Slug yang semula 404 menjadi 200 tanpa rebuild; hash isi cocok. Kiriman dua kali menghasilkan satu row. Key salah 401; preview development tetap 404 pada production.
- Office: 91 tes lulus; check dan build UI/Eve berhasil. Tes publisher memerlukan versi/hash dan QA terkini, memeriksa receipt+halaman publik, serta menangani kiriman tidak pasti tanpa POST duplikat. Route/SQL belum siap membuat artikel tetap menunggu, bukan dianggap terbit.

## Batas bukti

Tes HTTP menggunakan fixture loopback dan SQL sungguhan pada PGlite, tanpa menulis artikel uji ke Supabase produksi. Owner belum menjalankan SQL blog atau memasang key baru di Vercel Production. Karena itu publikasi produksi belum diklaim aktif. Artikel contoh lokal tetap draft; perubahan kode perlu deployment pertama melalui GitHub.

PGlite tidak menggantikan verifikasi permission/schema Supabase produksi. Setelah setup, jalankan verify 04 lalu biarkan artikel yang benar-benar lolos QA diterbitkan. Periksa judul, sumber, canonical, CTA, sitemap dan status receipt pada URL publiknya. Kualitas review model tidak menjamin semua fakta benar atau artikel bebas plagiarisme.

Pemeriksaan visual blog desktop/mobile dari 10 Oktober tersimpan di `WUUS/outputs/wuus-blog-20261010/`. Alur CTA menuju `/review` dan navigasi Blog pada kedua bahasa tetap dipertahankan. Perubahan ini tidak mengubah backend inquiry yang sudah berfungsi.
