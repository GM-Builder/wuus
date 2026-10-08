# Frontend penjualan WUUS — 8 Oktober 2026

## Keputusan dan cakupan

Tujuan: calon pelanggan memahami jasa, contoh desain, scope, harga, dan cara menghubungi WUUS melalui tampilan bersih. Iterasi terbaru memakai satu kanvas editorial dan preview website panoramik, menggantikan hero dua panel yang tidak disukai owner. Identitas WUUS: logo asli, navy `#1c2e43`, cream, amber `#f6cf83`, biru pucat, tipografi sistem, dan motif garis SVG. Referensi [Deel](https://www.deel.com/) hanya menjadi bagian eksplorasi sebelumnya; komposisi hero sekarang dibuat khusus untuk WUUS.

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

Catatan historis: hero dua panel dan aturan radius pada iterasi ini telah digantikan iterasi ketiga di bawah.

- Hero Indonesia dan hospitality memakai komponen Server Component bersama: panel pesan navy, CTA amber, dan panel cream berisi preview konsep website. Pada tablet dan mobile, panel ditumpuk agar teks dan tombol tetap terbaca.
- Kartu layanan memakai cream, biru, dan amber pucat. Galeri konsep memiliki bidang biru dan kartu putih; bagian harga memakai cream dengan Starter navy. Profil studio dan footer menggunakan navy. Tidak menambahkan logo pelanggan, angka penjualan, atau testimoni fiktif.
- Radius utama 10 px untuk detail, 16 px untuk kartu, 24 px untuk panel besar; tombol aksi memakai pill. Panel mobile memakai 16 px. Spasi konten mengikuti unit 8 px; jarak section desktop 96 px dan mobile 64 px.
- Halaman review memakai hero cream dan panel informasi biru. Overlay pada foto hero membantu keterbacaan teks. Preview sosial dan PNG kompatibilitas mengikuti warna yang sama.
- Build produksi final, TypeScript, dan ESLint terhadap TSX yang diubah lulus. Sembilan pemeriksaan browser terhadap `/`, `/hospitality`, `/review` pada 360/768/1280 px lulus: satu H1, tanpa overflow elemen/horizontal, tanpa nama pribadi owner. Menu mobile, FAQ CMS, dan penolakan form review kosong diperiksa. Bukti: `qa/studio-design-responsive-20261008.json`.
- Logika API, autentikasi, database, pembayaran, dan submit form tidak diubah. Tidak ada inquiry atau email produksi baru yang dikirim untuk iterasi CSS/markup ini.

## Iterasi visual ketiga — kanvas WUUS dan radius maksimal 16 px

- Hero memakai satu bidang cream: judul besar, pengantar dan CTA, lalu preview panoramik dengan catatan konsep di sampingnya. Mobile menumpuk konten dan meringkas catatan dekoratif agar preview lebih cepat terlihat. Tidak mengklaim desain ini belum pernah ada di seluruh internet.
- Artwork asli `/logo-tanpa-bg.png` dipakai melalui framing SVG pada header, footer, dan identitas studio. Framing membuang margin kosong saat tampil tanpa mengubah berkas logo. Versi pada latar terang diberi filter gelap agar terbaca.
- Background `public/graphics/studio-contour.svg` dan `card-contour.svg`, serta ikon layout/message/handover dibuat sebagai vektor. Motif tetap tajam saat diperbesar; foto konsep dan logo memakai resolusi sumber yang tersedia, bukan klaim seluruh media merupakan foto 4K.
- Radius sudut maksimum 16 px berlaku pada halaman pemasaran dan ketiga demo. Tombol memakai 10–16 px; pill lama dihapus. Lima perubahan kelas radius demo tidak mengubah logika booking/concierge simulasi.
- Build final dan TypeScript lulus; ESLint tanpa error. File demo memiliki 22 warning unused-variable yang sudah ada sebelum perubahan kelas radius. Tidak menambah dependency atau JavaScript klien untuk artwork.
- 37 tes yang sudah ada lulus, termasuk validasi, otorisasi, database lokal dan notifikasi. Dua belas pemeriksaan responsif pada 360/768/1440/3840 px lulus; ketiga demo tampil dengan radius maksimum 16 px. Menu mobile, prefill review `?h=Villa-Mare`, penolakan form kosong, FAQ CMS, dan opsi review/proposal diperiksa. Bukti: `qa/canvas-design-responsive-20261008.json`.

### Fitur yang dipertahankan

| Area | Status pada perubahan visual ini |
| --- | --- |
| Inquiry/review dan opsi proposal | Tetap tersedia; komponen submit dan request identity tidak diubah |
| Database, auth admin, pipeline lead, notifikasi owner | Kode backend tidak berubah dibanding `c0e9661`; akses produksi terverifikasi owner pada tahap sebelumnya |
| Tiga demo, harga €390/€590, FAQ, email/WhatsApp, privasi/terms | Tetap tersedia |
| Pembayaran | Tetap invoice/pencatatan manual; tidak mengklaim checkout baru |
| AI berbayar dan skor lama | Tetap mengikuti pengamanan/perapihan sebelum iterasi ini; bukan fitur yang dihapus oleh penggantian hero |

Tidak mengirim inquiry/email baru ke produksi dan tidak menjalankan SQL produksi untuk perubahan ini.

## Iterasi visual keempat — gambar material dan glossy selektif

- Dua background dibuat dengan built-in imagegen: ivory glass untuk hero, navy glass untuk bagian studio dan kartu Starter. Gambar hanya dipasang pada area tersebut; layout editorial, logo asli, konten, dan area form tetap dipertahankan.
- Export WebP desktop berukuran sekitar 22 KB dan 29 KB, dengan versi mobile sekitar 8 KB dan 11 KB pada lebar maksimal 640 px. Resolusi sumber aktual 1672 × 941; tidak melakukan upscale atau mengklaim native 4K. Prompt final, dimensi, lokasi berkas dan penggunaan dicatat di `GENERATED-SURFACES.md`.
- Glossy berupa highlight statis pada bingkai preview, bar preview, ikon layanan dan tombol Starter, dengan rim tipis pada permukaan navy. Overlay navy menjaga keterbacaan. Lapisan dekoratif preview memakai `pointer-events: none`; tidak menambah animasi, dependency atau JavaScript klien.
- Build produksi final dan TypeScript lulus. Dua belas pemeriksaan browser pada halaman `/`, `/hospitality`, `/review` dengan lebar 360/768/1440/3840 px memastikan satu H1, tidak ada overflow, radius maksimal 16 px, tiga referensi logo asli dan tidak ada nama pribadi owner. Pemilihan background mobile/desktop diperiksa; showcase tidak mendapat gambar background tambahan.
- Tampilan hero, studio dan Starter diperiksa secara visual pada desktop dan mobile. Klik preview membuka demo; tombol Discuss Starter menuju inquiry, opsi proposal tersedia, dan form review kosong ditolak dengan fokus ke property name tanpa pesan sukses. Console browser tidak mencatat error/warning. Bukti: `qa/generated-surfaces-responsive-20261008.json`.
- Perubahan runtime hanya CSS dan aset gambar; submit form, API, autentikasi, database dan notifikasi tidak diubah. Tidak mengirim inquiry/email atau menjalankan SQL produksi.

## Iterasi visual kelima — ilustrasi cerita dengan karakter manusia

- Dua ilustrasi realistis bergaya editorial dibuat dengan built-in imagegen: diskusi layout untuk How we work/Cara kerja pada kedua bahasa, dan pemilik usaha menjelaskan produknya untuk Mulai dari kebutuhan Anda pada halaman Indonesia. Karakter fiktif, bukan foto owner, tim atau klien nyata. Prompt final dan lokasi aset: `GENERATED-STORY-ILLUSTRATIONS.md`.
- Ilustrasi proses mengisi ruang di bawah pengantar tanpa menimpa empat langkah. Kontak Indonesia memakai dua kolom pada desktop, kemudian ditumpuk pada mobile. Ilustrasi kebutuhan menyatu dengan latar biru melalui tepian lembut. Teks dan kedua tombol kontak tetap berupa elemen HTML yang terpisah dari artwork.
- PNG sumber 1536 × 1024 diekspor menjadi WebP 1200 × 800 untuk desktop dan 720 × 480 untuk mobile. Aset proses sekitar 101/37 KB; kebutuhan sekitar 74/28 KB. Tidak upscale, tidak mengubah gambar yang sudah disetujui, tidak menambah dependency atau JavaScript klien. Elemen dekoratif memakai `aria-hidden` dan `pointer-events: none`.
- Build produksi, TypeScript dan ESLint pada kedua halaman yang diubah lulus. Delapan pemeriksaan browser pada `/` dan `/hospitality`, lebar 360/768/1440/3840 px, memastikan tidak ada overflow, radius maksimal 16 px, satu H1, empat langkah, tiga referensi logo asli dan pemilihan background mobile/desktop yang benar. Kontak email dan WhatsApp tetap tepat. Visual proses dan kebutuhan diperiksa pada desktop/mobile; console tidak mencatat error/warning. Bukti: `qa/story-illustrations-responsive-20261008.json`.
- Inquiry, opsi proposal, admin, API, database, dan notifikasi tidak diubah. Tidak mengirim inquiry/email atau menjalankan SQL produksi.
