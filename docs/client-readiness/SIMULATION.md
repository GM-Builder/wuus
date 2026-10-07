# Simulasi delivery internal — Casa Aurora

Dijalankan 7 Oktober 2026. Properti, kontak, approval dan pembayaran adalah **fiktif**. Pendapatan nyata tetap **0**. Tidak ada email/WhatsApp/outreach, payment live atau public client deployment yang dibuat.

1. Inquiry sintetis melalui API Next.js asli tersimpan di PostgreSQL lokal; owner yang diverifikasi adapter Auth dapat membaca dan mengubah status. Visitor, token palsu/nonowner dan scheduler palsu ditolak. Provider email yang belum configured tidak mengklaim delivery; outbox tetap tersedia. Bukti terbaru: [integration report](qa/integration-report.json).
2. Brief/onboarding, proposal €390, invoice DP €195, invoice pelunasan €195, dan payment ledger fiktif dibuat di repository contoh. Ledger menyatakan actualReceived=0, tanpa rekening/receipt palsu. Ada scope enam section, dua kamar, satu bahasa, batas dua revisi, external costs, cancellation fixture, ownership dan 14-day defect support.
3. Generator membuat proyek/repository terpisah. Build awal ditag `simulation-v1`.
4. Preview diperiksa pada 360/390/768/1440: tidak ada horizontal overflow atau foto rusak. Tanggal departure sebelum arrival ditolak. Draft email valid memuat isian, menyatakan belum terkirim dan disembunyikan lagi setelah isian berubah. Privacy page dapat dibuka. Console error/warning kosong. Tidak mengirim draft ke alamat contoh.
5. Ronde revisi pertama mengganti tagline menjadi “A slower stay. A warmer welcome.” Tanpa tambahan fee/scope. Commit final ditag `simulation-v2`.
6. Source ZIP dan panduan handover dibuat. Checkout terpisah membangun HTML dengan SHA-256 identik. Rollback ke v1 menghasilkan hash awal; kembali ke v2 menghasilkan hash final. ZIP diverifikasi checksum, diekstrak ke folder baru dan dibangun ulang dengan hasil identik.

Bukti: [delivery report](qa/delivery-simulation-report.json), [desktop preview](qa/client-desktop.png), [mobile inquiry](qa/client-mobile-inquiry.png). Source/handover bundle berada di `WUUS/outputs/wuus-readiness-20261007/handover/`. Detail alur dan source disimpan dalam repository contoh; tidak ada data klien nyata.

Untuk mengulang: gunakan workspace simulasi baru dan sesuaikan fixture path secara eksplisit. Script menolak menjalankan ulang di repository yang sudah memiliki commit atau direktori restore yang sudah ada; bukti lama tidak ditimpa. Jalankan integration harness dahulu, lalu generator, simulation script dan archive verification. Scripts hanya untuk data fiktif.

Yang belum dibuktikan oleh simulasi: uang diterima, akun/domain/HTTPS publik, actual inbox delivery, Auth/RLS Supabase asli, approval pelanggan nyata serta handover akses akun. Semuanya tetap menjadi gate sebelum transaksi/launch nyata. Timetable 5–7 hari adalah estimasi delivery, bukan waktu simulasi ini; jam kerja nyata proyek pertama perlu diukur.
