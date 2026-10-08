# Langkah menuju klien pertama — 8 Oktober 2026

## Status terbaru

Owner mengonfirmasi notifikasi sudah masuk. Screenshot owner menunjukkan dua inquiry WUUS TEST tampil di dashboard, notification provider configured, pending/processing/needs inspection 0, provider accepted 2. Inquiry hospitality berstatus Review sent. Pemeriksaan MCP read-only mengonfirmasi status hospitality `review_sent`, review `new`: perubahan status tersimpan di database. Alur submit → simpan → notification → inbox owner → admin read → status update terbukti untuk dua data sintetis ini. Ini bukan audit seluruh security/concurrency/restore produksi.

## Urutan kerja

1. Owner archive kedua WUUS TEST setelah selesai memeriksa; tidak perlu delete permanen, mengirim review ke qa@example.com, submit ulang atau apply SQL ulang. Periksa inbox dan admin dua kali setiap hari kerja.
2. Tutup gate operasional sebelum menerima deposit: hosting yang mengizinkan komersial, instruksi pembayaran dan identitas supplier pada proposal/invoice. Vercel Hobby yang terlihat pada screenshot dibatasi penggunaan personal nonkomersial; dengan anggaran Rp0, evaluasi host gratis yang mengizinkan komersial dan mendukung Next API/Auth/notifikasi sebelum migrasi. Tidak otomatis membeli Pro atau memindahkan DNS. Backup/preservation, authenticated nonowner, concurrency dan www tetap mengikuti release checklist.
3. Owner pastikan BRI aktif, nama payee benar dan mutasi dapat dilihat. Isi rekening pada invoice privat. Cek quote/rute negara dan currency klien sebelum menagih; tidak perlu membangun checkout. PAYMENTS.md menjadi acuan, bukan bukti penerimaan transfer internasional rekening owner.
4. Siapkan satu penawaran menurut SAMPLE-PROPOSAL.md: satu halaman hospitality Inggris, maksimum enam section/enam tipe kamar/20 foto, inquiry dan link booking engine klien, dua ronde revisi, source handover. Harga uji €390 dengan DP 50% adalah eksperimen internal; belum membuktikan harga optimal atau willing-to-pay pasar. Hosting/domain dan layanan pihak ketiga disetujui terpisah. Supplier identity, cancellation, fees/tax dan settlement dilengkapi sebelum proposal nyata dikirim.
5. Siapkan daftar 20 properti independen menurut SALES-EXPERIMENT.md: 10 kandidat Cyprus dan 10 Portugal, tipe properti/masalah serupa. Keduanya kandidat eksperimen, bukan klaim pasar terbaik. Untuk tiap properti catat URL resmi, kanal bisnis, satu masalah mobile/inquiry yang benar-benar diamati, demo yang relevan, alasan cocok, status dan next action. Jangan membeli lead/iklan.
6. Siapkan pesan personal berisi satu temuan dan tawaran review singkat. Owner mengirim maksimum lima pesan per hari setelah gate dan aturan kanal/negara diperiksa. Agent belum diberi instruksi mengirim outreach kepada prospek. Review → konfirmasi kebutuhan → proposal → DP terverifikasi → materi lengkap → produksi.

## Target eksperimen

Target operasional awal: 20 prospek ditinjau, lima pesan personal per hari, dan satu deposit proyek pertama. Target bukan janji pemasukan. Ukur balasan relevan, review diminta, proposal, deposit dan jam kerja. Setelah 20 pesan delivered, evaluasi delivery/target/pesan menurut SALES-EXPERIMENT.md sebelum mengganti negara/harga. Batasi review gratis sekitar 15–20 menit sebagai anggaran kerja internal; tidak membuat website penuh gratis.

## Pembagian pekerjaan

Owner: archive fixture, inbox/admin rutin, rekening dan identitas invoice privat, akun/biaya hosting, persetujuan penawaran dan pengiriman pesan. Agent: validasi gate teknis tersisa, evaluasi hosting kompatibel, menyiapkan daftar prospek berbukti, review dan draft pesan/proposal. Perubahan akun/hosting dan pengiriman eksternal mengikuti otorisasi yang berlaku.

Referensi hosting: [Vercel Hobby](https://vercel.com/docs/plans/hobby), diperiksa 8 Oktober 2026. Referensi payment: [Wise IDR transfers](https://wise.com/help/articles/2932330/guide-to-idr-transfers) dan PAYMENTS.md. Dokumen ini tidak membuktikan klien, pembayaran atau deployment klien nyata sudah ada.
