# Ruang Kayu — konsep website furniture

Rute: `/contoh/ruang-kayu`. Brand fiktif untuk memperlihatkan website usaha furniture lengkap, bukan portofolio klien. Tidak ada checkout, pengiriman inquiry, atau koneksi provider. Foto AI dan semua harga dinyatakan ilustratif. Metadata noindex dan canonical menunjuk rute konsep sendiri.

Pengunjung dapat memfilter tiga koleksi meja, memilih material dan panjang, mengatur jumlah, menghitung estimasi, menambahkan catatan, lalu membuat dan menyalin ringkasan lokal. Pilihan tidak disimpan setelah reload. Perubahan konfigurasi menghapus ringkasan lama agar tidak disalin sebagai quote terbaru. Clipboard gagal: textarea dipilih untuk salin manual, dengan pesan pemulihan. Tidak ada alamat, ulasan, klaim penjualan, atau kontak rekaan.

## Konteks desain terikat brief

Audience: calon pembeli furniture yang perlu memahami karakter material, ukuran dan estimasi sebelum konsultasi. Mode Persuade dengan konfigurator Operate. Hero fotografis memenuhi viewport awal, tipografi Outfit/Satoshi lokal, ivory hangat, charcoal olive, bidang kayu natural. Foto besar serta bayangan berarah pada konfigurator memberikan kedalaman tanpa efek dekorasi berlebihan. Alur: hero → koleksi → cerita material → konfigurator → proses → FAQ → ajakan kembali ke konfigurator. Tidak ada file konteks produk bersama yang diubah.

Gambar dari parent: `public/images/concepts/ruang-kayu/{hero,product,detail}.webp`. Foto katalog adalah ilustrasi bahasa desain satu keluarga, bukan klaim foto tiga SKU nyata. Kartu memberi penjelasan visual tersebut dan dimensi aktual berasal dari konfigurator.

## Kontrak kalkulasi

Panjang integer kelipatan 10 cm, batas berbeda setiap produk; jumlah integer 1–10. Unknown ID, NaN, Infinity dan input di luar batas ditolak. Harga dihitung dari basis produk × rasio panjang × pengali material, dibulatkan Rp1.000, disimpan sebagai integer rupiah. Total adalah harga per unit × jumlah; ongkir/pemasangan tidak termasuk. Ringkasan gagal dibuat bila konfigurasi tidak valid. Catatan dibatasi 500 karakter.

## Aksesibilitas dan responsif

Label input eksplisit, fieldset radio, tombol filter aria-pressed, perubahan quote dan copy status diumumkan, skip link, outline fokus, native details/summary, teks ringkasan read-only yang dapat disalin manual. Susunan desktop tiga kolom katalog dan dua kolom konfigurator; mobile satu kolom. Gambar hero priority, lainnya lazy via next/image. Prefers-reduced-motion mematikan animasi hero dan transisi.

## Pemeriksaan

Tes `tests/ruang-kayu.test.mjs`: 4/4 lulus; mencakup harga dasar/material, integer rupiah, validasi dimensi tiap produk, batas kuantitas, nonfinite dan ID asing, isi ringkasan/disclaimer serta pembatasan catatan. ESLint untuk tiga file TS/TSX lulus (exit 0); `tsc --noEmit --incremental false` repo lulus (exit 0). Impeccable mechanical detector atas route/component/CSS mengembalikan `[]`. Node mengeluarkan warning konfigurasi package module type saat mengimpor TS pada tes, tanpa kegagalan. Browser visual desktop/mobile dan uji alur clipboard diserahkan kepada QA koordinator setelah aset gambar tersedia; belum diklaim lulus di handoff ini.
