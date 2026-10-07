# Fondasi website hospitality

Kit `templates/hospitality-static/` menghasilkan website statis tanpa dependency runtime. Konten di `property.json`; enam komponen section di `build.mjs`; gaya di `site.css`; draft inquiry di `inquiry.js`. Story, kamar, galeri, fasilitas, lokasi/FAQ, kontak dan link booking diganti melalui konfigurasi. Tidak ada rate, diskon atau review yang diciptakan otomatis.

## Membuat proyek terpisah

Dari repositori website WUUS:

```text
node scripts/create-client-site.mjs nama-klien
```

Output berada di `WUUS/client-projects/nama-klien/` dengan **Git repository baru**, konfigurasi dan aset sendiri. Generator menolak nama/path tidak aman serta direktori yang sudah ada. Daftarkan remote yang dimiliki klien, gunakan hosting project tersendiri, preview tersendiri dan domain klien. Tidak ada impor runtime dari repository WUUS dan tidak ada koneksi ke lead database WUUS.

Di proyek klien:

```text
npm run build
npm run preview
```

Node 22+ untuk build lokal, tidak perlu `npm install`. Host hanya menerima `dist/`. Preview lokal port 4173; gunakan PORT berbeda jika dua proyek dipreview bersamaan. Build biasa menghasilkan `noindex`; `npm run build:production` menolak data fiktif, placeholder dan approval kosong, lalu mengeluarkan canonical/sitemap produksi. Tetap periksa domain/HTTPS dan hasil deploy yang nyata.

## Inquiry dan edit konten

Starter memakai email/WhatsApp draft. Form memvalidasi tanggal, email dan jumlah tamu; membuka draft **tidak berarti inquiry sudah dikirim**. Tamu memilih aplikasi, memeriksa, lalu mengirim sendiri. Tujuan kontak berasal dari konfigurasi yang disetujui klien. Link booking membuka engine yang sudah dimiliki klien. Tidak ada booking engine, availability live, guest payment atau database tamu baru.

Proposal menyatakan WUUS mengedit konten sesuai scope dan revisi. CMS/self-service editing tidak termasuk. Form server, CMS atau booking integration tambahan membutuhkan quote dan kredensial/storage tersendiri untuk klien tersebut.

## Hosting dan biaya

Kit statis dapat dipasang di hosting statis komersial tanpa server aplikasi. Cloudflare Pages merupakan kandidat untuk anggaran awal kecil; docs Free plan mencantumkan 500 build/bulan, 20.000 file dan maksimum 25 MiB/file. Ini belum merupakan verifikasi akun/ketentuan klien atau deployment yang sudah dibuat. Periksa terms, akun, domain, quotas dan siapa pembayar sebelum memilih: https://developers.cloudflare.com/pages/platform/limits/

Vercel Hobby bukan pilihan website komersial: https://vercel.com/docs/plans/hobby. Website utama WUUS masih Next.js dengan API server; migrasinya tidak sama dengan mengunggah kit statis ini. Jangan memindahkan website utama ke static host sambil kehilangan API inquiry/admin.

## Contoh yang sudah diuji

`WUUS/client-projects/casa-aurora-simulation/` adalah properti Portugal fiktif, dua kamar dan tiga foto konsep. Repository independen, dua release, preview lokal, revisi tagline, source ZIP, clone restore, rollback dan rebuild dari ZIP sudah diuji. Kontak/booking placeholder dan label fiktif sengaja dipertahankan. Ini bukan portofolio klien nyata atau bukti booking/pendapatan.

Lihat [SIMULATION.md](SIMULATION.md), [template operasional](templates/ONBOARDING.md) dan [LAUNCH-HANDOVER](templates/LAUNCH-HANDOVER.md). Aset contoh tidak boleh digunakan sebagai foto properti pelanggan nyata.
