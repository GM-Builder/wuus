# Gate produksi dan tindakan akun

Pemeriksaan read-only 7 Oktober 2026; tidak mengganti DNS, mengubah Supabase produksi, membeli plan, atau mempublikasikan deployment.

| Gate | Bukti sekarang | Tindakan berikutnya |
| --- | --- | --- |
| Supabase aktif | CLI `projects list` menolak karena tidak ada access token. Host Supabase dalam `.env.local` gagal DNS (ENOTFOUND); query tanpa lead fields tidak mencapai DB | Owner login CLI/dashboard proyek yang aktif. Cocokkan URL/key lingkungan dan ekspor backup/schema/policies. Tidak menyimpulkan proyek dihapus hanya dari DNS failure |
| RLS/Auth produksi | Migration 001/002/003 dan denial tests lokal lulus; produksi belum dapat diakses | Inventory `supabase/tests/security-inventory.sql`, review views/security-definer routines, staging migrate, test anon/authenticated read/insert/update/delete/RPC, verified owner/nonowner, legacy business_scores denial, lalu migrasi produksi terkoordinasi |
| Hosting/domain yang benar | CLI tersambung BinaHub. API menyatakan plan hobby; proyek webuntukusaha hanya menampilkan webuntukusaha.vercel.app. `vercel inspect webuntukusaha.com` tidak menemukan deployment pada akun ini | Identifikasi akun/project pemilik apex dan akun DNS registrar. Jangan menambahkan domain ke project berbeda berdasarkan kesamaan namanya |
| www/canonical live | Apex HTTPS 200. DNS www: NXDOMAIN. HTML live canonical masih `https://www.webuntukusaha.com`. Canonical apex dan 308 redirect siap/teruji lokal | Di akun yang benar, hubungkan www dengan nilai DNS yang diberikan provider, preserve mail records, arahkan www→apex, deploy versi aman; verifikasi path/query, HTTPS, sitemap dan canonical |
| Komersial | Akun tersambung Hobby; belum membuktikan plan akun pemilik domain | Pilih hosting komersial dan pembayar. Jangan beli plan tanpa dana. Kit klien statis punya pilihan host berbeda; website WUUS ber-API perlu runtime yang sesuai |
| Notifikasi owner | Durable outbox, provider adapter, retry/auth guard dan status UI lulus lokal; key/sender/recipient belum dikonfigurasi | Owner siapkan Resend/SMTP yang dipilih (adapter awal: Resend), verified domain, fixed from/to; simpan secret melalui akun hosting, uji actual inbox receipt + retry scheduler |
| Pembayaran | Owner belum mengonfirmasi rekening/provider dan route klien | Lengkapi identity/invoice, provider eligibility, currency/fees dan receipt verification. Tidak menyebut Wise/SEPA tersedia atas nama owner atau dana diterima |
| Builder live | API pause lulus lokal; project hosting/payment provider builder belum teridentifikasi pada akun tersambung | Deploy containment di project yang benar, periksa invoice Mayar/top-up lama dan transaksi tertunda; jangan membuka kembali AI/payment endpoints |

Owner cukup memberi identitas akun/project/penyedia dan melakukan login lewat layanan terkait. **Jangan kirim password/token/service key di chat.** Server secrets dikonfigurasi di environment provider yang benar. Setelah akses tersedia, seluruh pekerjaan rilis mengikuti [runbook](RELEASE-RUNBOOK.md), termasuk backup sebelum perubahan database.

Dokumen dan simulasi selesai bukan bukti produksi siap menerima inquiry/DP. Tidak ada production gate yang diberi status DONE tanpa hasil live yang mendukungnya.
