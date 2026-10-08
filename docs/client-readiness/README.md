# WUUS — acuan kesiapan klien pertama

Versi 3 · 8 Oktober 2026 · Owner: Faisal · Pelaksana teknis: Codex.

Tujuan: menerima pemasukan pertama dari jasa website dengan scope terkendali, biaya dibayar dari deposit, dan proses yang bisa dijalankan satu orang. Pendapatan saat ini **0**, anggaran akuisisi **Rp0**. Target pendapatan adalah sasaran, bukan prediksi atau jaminan.

Keputusan owner 8 Oktober: kontak publik `hallo@webuntukusaha.com`, notifikasi `admin@webuntukusaha.com`. Zoho kedua pengguna aktif; actual inbox belum diuji. SQL manual owner 24 PASS. Update 05:24 UTC: API Supabase mengonfirmasi admin UUID/email terkonfirmasi serta tiga tabel menolak akses REST anonim; Resend API mengonfirmasi root domain verified. Env lokal privat dan salinan import Vercel siap, belum dipasang di deployment. MCP Supabase Codex terdaftar untuk proyek WUUS dalam mode read-only dan OAuth berhasil; tool belum termuat dalam chat ini. Vercel gm-builder-9019/project wuus/Hobby teridentifikasi; CLI masih akun berbeda. Ikuti OWNER-NEXT-STEPS.md. BRI utama/Jago cadangan/GoPay domestik; akun Wise owner tidak diperlukan, detail rekening/rute hanya invoice privat. Apex tetap URL utama dan www diarahkan ke apex sebagai alamat tambahan.

**Update rilis 05:38 UTC:** owner melaporkan env Vercel updated dan meminta commit/push. Repository produksi GM-Builder terkonfirmasi lewat GitHub deployments; main website `1bb39a7` dan builder `560a7de` berhasil deploy. Canonical apex dan kontak hallo live; API admin/notification/cron menolak anonymous, form menolak input/origin tidak sah. Builder 19/19 method/route live mengembalikan 503 BUILDER_PAUSED. Langkah owner kini: inquiry uji pada dua form → login admin/status update → actual inbox; lalu www, hosting komersial dan payment gate. Bukti dalam dua qa/production-*-20261008.json; tidak mengklaim seluruh gate selesai.

Urutan baca dan kerja:

**Update perbaikan 06:13 UTC:** akses CLI Vercel workspace berhasil sebagai gm-builder-9019. Service-role key Production yang hilang sudah ditambahkan, URL/public key dicocokkan. Website `0d44d11` dan builder `f401e2c` production success; nama pribadi di publik diganti WUUS. Dua inquiry browser sintetis sukses dan tersimpan, dua outbox sent dan Resend melaporkan delivered hallo→admin. Owner perlu memeriksa kedua WUUS TEST di admin, mengubah status dan melihat inbox/spam; tidak perlu submit ulang atau mengulang SQL. Bukti `qa/production-inquiry-fix-20261008.json`. Status historis di paragraf sebelumnya bukan status konfigurasi terkini.

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
11. [Fondasi website klien](CLIENT-SITE-FOUNDATION.md): generator, konten terpisah, repository/preview/deployment per klien.
12. [Notifikasi owner](NOTIFICATIONS.md): outbox, email, retry dan konfigurasi.
13. [Simulasi delivery](SIMULATION.md): proposal → revisi → handover → rollback/restore yang sudah dijalankan.
14. [Gate akun produksi](PRODUCTION-BLOCKERS.md): temuan Vercel/DNS/Supabase dan tindakan yang belum dapat dilakukan.
15. [Roadmap fitur besar](FUTURE-ROADMAP.md): kebutuhan dan pendanaan sebelum portal/PMS/billing/outreach/AI.
16. [SQL manual Supabase](../../supabase/manual/README.md): inspect → satu transaksi apply → verify; owner menjalankan melalui SQL Editor.
17. [Setup Zoho + Resend](EMAIL-SETUP.md): inbox yang sudah ada, sending subdomain dan environment.
18. [Pembayaran lintas negara](PAYMENTS.md): Wise ke rekening IDR sebagai opsi awal; PayPal Invoice alternatif, fee/hold dan instruksi klien.
19. [Langkah owner sesudah SQL](OWNER-NEXT-STEPS.md): DNS Resend/www, akun produksi yang ditemukan, Auth/env dan pemeriksaan rilis.

Template siap diisi: [onboarding](templates/ONBOARDING.md), [proposal lengkap](templates/PROPOSAL.md), [invoice/receipt](templates/INVOICE.md), [payment verification](templates/PAYMENT-VERIFICATION.md), [scope change](templates/CHANGE-REQUEST.md), [launch/handover](templates/LAUNCH-HANDOVER.md).

Tracker Excel berada di `WUUS/outputs/wuus-readiness-20261007/WUUS-Tracker.xlsx`. Empat tab: Proyek, Pembayaran, Perubahan dan Panduan. Contoh SIMULASI tidak menjadi pemasukan. Maksimal dua proyek aktif dengan satu fokus utama. Simpan salinan yang berisi data nyata secara privat.

Dokumen ini menjadi acuan eksekusi yang menghubungkan audit sebelumnya di `WUUS/docs/audits/2026-10-06/` dengan perubahan pada repositori `webuntukusaha` dan `wuus-ai-builder`. Temuan audit bukan bukti bahwa konfigurasi produksi sudah diperbaiki. Status lokal dan produksi harus dicatat terpisah.

Data klien, invoice berisi identitas, akses akun, dan bukti transfer disimpan di folder privat milik owner, **bukan Git**. Jangan menaruh token atau detail rekening dalam dokumen publik ini.
