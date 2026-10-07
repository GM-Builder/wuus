# Decision log

| Tanggal | Keputusan | Alasan | Syarat ditinjau kembali |
| --- | --- | --- | --- |
| 2026-10-07 | Jasa website dahulu, AI builder dipause | Belum ada pendapatan; risiko biaya dan payment tidak mendukung deposit pertama | Ledger debit/refund atomic, ownership, rate limit, provider caps, webhook verifikasi + idempotency diuji end-to-end |
| 2026-10-07 | Inquiry lewat server dan RLS terkunci | Public PIN/anon query tidak dapat menjadi otorisasi | Tetap prinsip dasar; implementasi dapat diganti dengan bukti setara |
| 2026-10-07 | Admin Auth + server allowlist user ID | Verifikasi nyata tanpa membangun auth sendiri | Tambah peran hanya setelah ada anggota tim nyata |
| 2026-10-07 | Pembayaran jasa manual | Menghindari membangun checkout sebelum akun penerimaan uang terbukti | Volume transaksi membenarkan otomasi |
| 2026-10-07 | Apex sebagai canonical | Apex hidup; www belum resolvable pada audit | DNS www + redirect terverifikasi, canonical tetap satu |
| 2026-10-07 | Hosting komersial harus diverifikasi | Vercel Hobby dibatasi personal nonkomersial; plan akun saat ini belum diketahui | Pilih plan/host sesuai biaya, runtime, dan ketentuan |
| 2026-10-07 | Rp0 budget tidak berarti biaya operasi nol | Provider, domain, payment fees dan jam owner tetap berbiaya | Deposit dan margin proyek menentukan alokasi |

Referensi teknis diverifikasi 7 Oktober 2026: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Supabase getUser](https://supabase.com/docs/reference/javascript/auth-getuser), [Vercel Hobby](https://vercel.com/docs/plans/hobby). Jangan membuka key service_role/secret di browser; keputusan otorisasi memakai identitas hasil verifikasi server.
