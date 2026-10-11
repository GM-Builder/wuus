# Perluasan editorial WUUS

12 Oktober 2026. Cakupan blog: teknologi, AI/robot, software, keuangan/crypto, ekonomi Indonesia/global, geopolitik dan hospitality. Bahasa en/id.

## Langkah produksi

1. Owner menjalankan supabase/manual/05-blog-editorial-apply.sql di SQL Editor Supabase, setelah migration03 yang sudah dipasang. Ini mengubah batas language/category dan QA relevance, tanpa menghapus artikel atau membuka hak tulis publik.
2. Jalankan supabase/manual/06-blog-editorial-verify.sql; semua check harus PASS. Migration05 dapat dijalankan ulang. Jangan menjalankan ulang migration03 setelah05 karena03 memulihkan function QA versi lama.
3. Deployment GitHub → Vercel harus memuat API/publisher v2. Kunci publikasi tetap server-only, tidak ada env baru untuk migration ini.
4. Worker lokal memeriksa header x-wuus-editorial-version:2 dari readiness probe. Header hanya diberikan bila RPC wuus_blog_capabilities berhasil mengonfirmasi versi2. Sebelum itu, artikel kategori baru tetap approved dan tidak POST.
5. Editor/QA tetap wajib memeriksa versi/hash, fakta dan sumber primer. contentRelevance menggantikan keharusan semua artikel relevan hospitality; compatibility hospitalityRelevance hanya berlaku pada kategori Hotel websites.

Sumber diperluas melalui allowlist exact-host, HTTPS, tanpa kredensial/query; bukan akses URL bebas. Artikel finance/geopolitik memerlukan data/tanggal/konteks aktual. Screenshot referensi bukan bukti berita. Publikasi akun sosial belum termasuk.

Schema awal hanya menerima English/Hotel websites, sehingga code dan panduan saja tidak cukup untuk produksi. Office tidak menjalankan SQL di akun owner secara otomatis sesuai pilihan owner sebelumnya. Tidak diperlukan SQL baru per artikel setelah migration ini.
