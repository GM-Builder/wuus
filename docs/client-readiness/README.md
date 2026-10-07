# WUUS — acuan kesiapan klien pertama

Versi 1 · 7 Oktober 2026 · Owner: Faisal · Pelaksana teknis: Codex.

Tujuan: menerima pemasukan pertama dari jasa website dengan scope terkendali, biaya dibayar dari deposit, dan proses yang bisa dijalankan satu orang. Pendapatan saat ini **0**, anggaran akuisisi **Rp0**. Target pendapatan adalah sasaran, bukan prediksi atau jaminan.

Urutan baca dan kerja:

1. [PRD](PRD.md): tujuan produk dan syarat kelulusan.
2. [Scope dan tahapan](SCOPE.md): batas pekerjaan serta urutan implementasi.
3. [Backlog](BACKLOG.md): status tiap pekerjaan dan bukti penyelesaiannya.
4. [Acceptance dan QA](ACCEPTANCE.md): pemeriksaan sebelum produksi.
5. [Release runbook](RELEASE-RUNBOOK.md): konfigurasi, migrasi, peluncuran, dan pemulihan.
6. [Operasional dan template klien](OPERATIONS.md): brief → proposal → deposit → delivery → pelunasan.
7. [Eksperimen penjualan](SALES-EXPERIMENT.md): validasi pasar dengan biaya akuisisi nol.
8. [Decision log](DECISIONS.md): alasan keputusan supaya arah tidak berganti tanpa bukti.
9. [Proposal contoh](SAMPLE-PROPOSAL.md): dry-run Starter dengan batas yang konkret.
10. [Verification](VERIFICATION.md): hasil pengujian dan gate yang belum lulus.

Dokumen ini menjadi acuan eksekusi yang menghubungkan audit sebelumnya di `WUUS/docs/audits/2026-10-06/` dengan perubahan pada repositori `webuntukusaha` dan `wuus-ai-builder`. Temuan audit bukan bukti bahwa konfigurasi produksi sudah diperbaiki. Status lokal dan produksi harus dicatat terpisah.

Data klien, invoice berisi identitas, akses akun, dan bukti transfer disimpan di folder privat milik owner, **bukan Git**. Jangan menaruh token atau detail rekening dalam dokumen publik ini.
