# Decision log

| Tanggal | Keputusan | Alasan | Syarat ditinjau kembali |
| --- | --- | --- | --- |
| 2026-10-07 | Jasa website dahulu, AI builder dipause | Belum ada pendapatan; risiko biaya dan payment tidak mendukung deposit pertama | Ledger debit/refund atomic, ownership, rate limit, provider caps, webhook verifikasi + idempotency diuji end-to-end |
| 2026-10-07 | Inquiry lewat server dan RLS terkunci | Public PIN/anon query tidak dapat menjadi otorisasi | Tetap prinsip dasar; implementasi dapat diganti dengan bukti setara |
| 2026-10-07 | Tes skor lokal, tracking DB lama dihentikan | Penyimpanan skor anonim tidak dibutuhkan untuk menerima klien pertama; mengurangi jalur tulis publik | Analytics hanya setelah kebutuhan, consent, retention dan endpoint terbatas tersedia |
| 2026-10-07 | Admin Auth + server allowlist user ID | Verifikasi nyata tanpa membangun auth sendiri | Tambah peran hanya setelah ada anggota tim nyata |
| 2026-10-07 | Pembayaran jasa manual | Menghindari membangun checkout sebelum akun penerimaan uang terbukti | Volume transaksi membenarkan otomasi |
| 2026-10-07 | Apex sebagai canonical | Apex hidup; www belum resolvable pada audit | DNS www + redirect terverifikasi, canonical tetap satu |
| 2026-10-07 | Hosting komersial harus diverifikasi | Akun CLI BinaHub Hobby terverifikasi, domain apex ada pada konteks akun lain/belum ditemukan | Temukan owner account/domain; pilih plan/host sesuai biaya/runtime/terms |
| 2026-10-07 | Rp0 budget tidak berarti biaya operasi nol | Provider, domain, payment fees dan jam owner tetap berbiaya | Deposit dan margin proyek menentukan alokasi |
| 2026-10-07 | Kit hospitality statis per klien | Scope jasa awal cukup dengan konten, draft inquiry dan link existing booking; tidak memerlukan server/CMS baru | Server forms/CMS ditambah setelah quote, per-client data/access dan biaya disetujui |
| 2026-10-07 | Outbox atomik dan notifikasi tanpa lead PII | Lead tidak hilang ketika email gagal; key/recipient dikendalikan server, retry terbatas | Actual inbox receipt dan scheduler terverifikasi sebelum mengandalkan alert |
| 2026-10-07 | Dua aktif, satu fokus produksi | Mengikuti arahan owner, menjaga kapasitas solo | Jam aktual/deadline membuktikan kapasitas tambahan |
| 2026-10-07 | Builder security overrides terarah | Patched deepmerge 8.0.0 dan KaTeX 0.18.2 tersedia; build/Prisma/renderer dicek | Remove override setelah upstream aman; full AI regression sebelum reopen |
| 2026-10-07 | Fitur besar disiapkan sebagai funded roadmap | Owner meminta persiapan, implementasi setelah kebutuhan pembeli/dana jelas | Buyer, scope, deposit, unit cost/support dan acceptance tercatat |
| 2026-10-08 | SQL Editor manual untuk Supabase | Owner meminta kode dan akan menjalankan sendiri; bundle satu transaksi + inspect/verify tersedia | CLI deploy di masa depan setelah schema/history reconciled |
| 2026-10-08 | Zoho inbox, Resend Free sender subdomain | Mailbox sudah ada; adapter aplikasi memiliki queue/idempotency; tidak perlu mengganti Zoho | Actual domain verification/inbox receipt; SMTP diperiksa hanya bila perlu adapter baru |
| 2026-10-08 | Wise→bank awal, PayPal Invoice alternatif | Bank payout tidak membutuhkan balance Wise owner; PayPal link praktis tetapi ada fee/hold untuk cash flow nol | Verified account/rute/client preference dan margin aktual |
| 2026-10-08 | BRI utama, Jago cadangan, GoPay domestik | Owner sudah memiliki ketiganya; dukungan Wise ke BRI dan Kantong IDR Jago ada pada sumber resmi; satu rekening aktif per invoice mengurangi kebingungan | Rekening aktif/payee legal dan rute aktual verified; perubahan rekening memastikan tidak ada pembayaran pending |
| 2026-10-08 | Gunakan root domain Resend yang sudah dibuat owner | Screenshot memakai webuntukusaha.com; notify sebelumnya usulan, bukan syarat; preserve Zoho MX dan receiving OFF | Domain sending/DNS verified, from hallo/to admin; subdomain bisa dipilih kemudian untuk pemisahan reputasi |
| 2026-10-08 | SQL owner 24 PASS dilanjutkan konfigurasi, bukan apply ulang | Bundle sudah berisi tiga migration dan verify; dua hasil identik wajar | Match project/env, test REST/Auth/inbox dan concurrency staging; reconcile history sebelum workflow CLI masa depan |

Referensi teknis diverifikasi 7 Oktober 2026: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Supabase getUser](https://supabase.com/docs/reference/javascript/auth-getuser), [Vercel Hobby](https://vercel.com/docs/plans/hobby). Jangan membuka key service_role/secret di browser; keputusan otorisasi memakai identitas hasil verifikasi server.
