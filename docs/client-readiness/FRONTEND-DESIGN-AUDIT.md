# Frontend penjualan WUUS — 8 Oktober 2026

## Keputusan dan cakupan

Tujuan: calon pelanggan memahami jasa, contoh desain, scope, harga, dan cara menghubungi WUUS melalui tampilan bersih. Iterasi terbaru mempertahankan kesederhanaan awal serta memakai prinsip komposisi dan kontras dari referensi owner, [Deel](https://www.deel.com/). Identitas WUUS: navy `#1c2e43`, cream, amber `#f6cf83`, biru pucat, tipografi sistem, dan jarak lapang. Aset, merek, serta klaim bisnis referensi tidak digunakan.

Halaman yang diperbarui: `/`, `/hospitality`, `/review`, `/inquiries`, `/score-test`, serta privasi dan ketentuan dalam bahasa Indonesia dan Inggris. Header/footer dan preview tautan mengikuti identitas yang sama. Dashboard admin dan tiga website demo properti mempertahankan alur sebelumnya; demo mempunyai identitas masing-masing dan ditandai sebagai contoh fiktif.

## Perubahan penting

- Foto `studio-designer.jpg` yang bukan foto owner dihapus. Identitas publik memakai monogram WUUS dan kontak `hallo@webuntukusaha.com`, tanpa nama pribadi owner.
- Homepage berhenti menampilkan jumlah klien, rating, testimoni, dan janji performa yang belum dibuktikan. Halaman evaluasi mengganti pembanding industri/prediksi grafik dengan tiga pertanyaan praktis tanpa skor pendapatan.
- Penawaran hospitality fokus pada website dan inquiry langsung. Demo AI/calculator tidak dijadikan paket jasa. Bahasa Inggris bersifat umum untuk independent properties, tanpa membatasi negara prospek ke Balkan.
- Starter €390 / Showcase €590 merupakan tarif pengenalan untuk dua proyek pertama yang ditandatangani. Scope, bahasa, revisi, DP, biaya layanan pihak ketiga, CMS, dan handover dijelaskan. Domain/hosting komersial serta layanan tambahan dikutip terpisah; proposal mengonfirmasi total sebelum pembayaran.
- Ketentuan Indonesia diselaraskan dengan penawaran: ownership/handover setelah pelunasan, biaya domain/hosting terpisah, pembatalan mengikuti proposal. Privasi menjelaskan inquiry storage dan penyedia notifikasi yang benar.
- Komponen pemasaran menggunakan Server Components. JavaScript interaktif dibatasi pada form. Validasi, request ID/idempotency, perlindungan submit ganda, penyimpanan melalui API, dan pesan kegagalan dipertahankan.
- Form hospitality mendukung review atau proposal; form review mempertahankan prefill `?h=`. Form bisnis hanya menyiapkan draft WhatsApp dan menyatakan pesan belum dikirim. Pesan tersebut tidak dicatat sebagai inquiry tersimpan.

## Verifikasi sebelum rilis

- Build produksi Next.js 16.4.0 dan pemeriksaan TypeScript lulus. ESLint terhadap file TSX yang diubah lulus.
- 37 unit tests lulus; 29 pemeriksaan API/database pada PostgreSQL lokal dengan simulated Auth/PostgREST lulus. Lihat `qa/integration-report.json`.
- Browser mengirim URL tidak valid melalui form review: pesan error terlihat dan data tetap tersedia untuk diperbaiki. Retry dengan URL sah menampilkan sukses setelah API mengonfirmasi penyimpanan.
- Browser menyimpan dua inquiry sintetis: `review/review` dan `hospitality/proposal`. Query database lokal mengonfirmasi source dan request type. Tidak menyentuh database produksi atau mengirim email dari simulasi. Lihat `qa/marketing-browser-flow-20261008.json`.
- Homepage, hospitality, dan review diperiksa pada lebar 360, 768, dan 1280 px: satu H1 per halaman, tanpa overflow horizontal, tanpa nama/foto pribadi owner. Menu mobile, navigasi FAQ, dan jawaban CMS diverifikasi lewat browser.
- Draft WhatsApp berisi input yang tepat dan tidak dikirim otomatis. Preview sosial PNG berhasil dirender dengan identitas baru.

## Batas kesiapan

Frontend utama siap untuk menunjukkan penawaran dan menerima inquiry setelah deployment produksi diverifikasi. Desain tidak membuktikan konversi penjualan. Demo tetap memakai materi konsep/fiktif yang dilabeli; foto klien produksi harus disediakan atau dilisensikan dengan benar. Bukti proyek/testimoni baru boleh ditambahkan setelah ada pekerjaan nyata dan izin penggunaan.

Email dan dashboard produksi telah dikonfirmasi owner sebelum pekerjaan visual ini. Rilis frontend mempertahankan backend tersebut; pengujian browser sukses pada pekerjaan ini dilakukan terisolasi agar tidak menambahkan inquiry/email produksi baru.

## Iterasi visual kedua — komposisi dan warna

- Hero Indonesia dan hospitality memakai komponen Server Component bersama: panel pesan navy, CTA amber, dan panel cream berisi preview konsep website. Pada tablet dan mobile, panel ditumpuk agar teks dan tombol tetap terbaca.
- Kartu layanan memakai cream, biru, dan amber pucat. Galeri konsep memiliki bidang biru dan kartu putih; bagian harga memakai cream dengan Starter navy. Profil studio dan footer menggunakan navy. Tidak menambahkan logo pelanggan, angka penjualan, atau testimoni fiktif.
- Radius utama 10 px untuk detail, 16 px untuk kartu, 24 px untuk panel besar; tombol aksi memakai pill. Panel mobile memakai 16 px. Spasi konten mengikuti unit 8 px; jarak section desktop 96 px dan mobile 64 px.
- Halaman review memakai hero cream dan panel informasi biru. Overlay pada foto hero membantu keterbacaan teks. Preview sosial dan PNG kompatibilitas mengikuti warna yang sama.
- Build produksi final, TypeScript, dan ESLint terhadap TSX yang diubah lulus. Sembilan pemeriksaan browser terhadap `/`, `/hospitality`, `/review` pada 360/768/1280 px lulus: satu H1, tanpa overflow elemen/horizontal, tanpa nama pribadi owner. Menu mobile, FAQ CMS, dan penolakan form review kosong diperiksa. Bukti: `qa/studio-design-responsive-20261008.json`.
- Logika API, autentikasi, database, pembayaran, dan submit form tidak diubah. Tidak ada inquiry atau email produksi baru yang dikirim untuk iterasi CSS/markup ini.
