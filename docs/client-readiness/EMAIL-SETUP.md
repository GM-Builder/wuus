# Zoho inbox + notifikasi website — 8 Oktober 2026

Owner sudah memiliki Zoho Mail gratis. Read-only DNS check: nameserver domain mengarah Rumahweb; MX apex mengarah `mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`. Ini membuktikan konfigurasi DNS publik, **belum** membuktikan email owner tepat atau actual inbox delivery.

Keputusan awal: Zoho untuk inbox dan balasan manual owner; **Resend Free untuk notifikasi sistem**, memakai adapter yang sudah diuji. Kita tidak memerlukan migrasi mailbox atau implementasi SMTP baru untuk alur ini. Zoho Free pricing menyebut pembatasan IMAP/POP/ActiveSync; itu tidak otomatis membuktikan SMTP account ini mati. SMTP bergantung jenis account/datacenter dan perlu dicek pada server settings bila nanti dipakai. [Zoho plans](https://www.zoho.com/mail/zohomail-pricing.html), [Zoho SMTP](https://www.zoho.com/mail/help/zoho-smtp.html).

Resend Free saat diperiksa menawarkan 3.000 email/bulan dan 100/hari. Notifikasi hanya satu recipient owner; quota failure menyisakan lead/outbox, bukan success palsu pada email. Account eligibility/domain verification masih perlu diselesaikan. [Resend pricing](https://resend.com/pricing).

## Langkah owner

1. Pastikan bisa login Zoho dan kirim/terima email manual. Catat alamat owner yang benar. Password Zoho tidak dibutuhkan oleh adapter ini.
2. Buat/login Resend pada plan Free, lalu add **sending domain `notify.webuntukusaha.com`**. Ini nama subdomain yang diusulkan, belum dibuat/verified. Resend mendukung dan menyarankan subdomain untuk pengiriman sistem. [Verified domains](https://resend.com/docs/dashboard/domains/introduction).
3. Pada DNS Rumahweb, tambahkan **hanya record dengan host/type/value/prioritas yang ditampilkan Resend** untuk subdomain tersebut. Record dapat berupa CNAME atau TXT/MX sesuai domain/account; tidak ada nilai rekaan dalam dokumen ini. Pertahankan MX/SPF/DKIM Zoho root, record website/apex dan DMARC yang masih digunakan. Jangan menambahkan dua SPF atau mencampur CNAME dengan record lain pada hostname yang sama, maupun mengganti MX root dengan MX pengirim Resend. [Avoid MX conflicts](https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records).
4. Tunggu domain Resend berstatus Verified. Jangan mengaktifkan receiving di root hanya untuk notifikasi; pengiriman dari subdomain tidak memindahkan inbox Zoho.
5. Buat API key dengan hak sending untuk domain yang dipilih jika restriction tersebut tersedia. Simpan langsung sebagai server environment pada project hosting yang benar:

   ```dotenv
   RESEND_API_KEY=[key privat dari Resend]
   WUUS_NOTIFICATION_FROM=alerts@notify.webuntukusaha.com
   WUUS_OWNER_EMAIL=[alamat Zoho owner]
   ```

   Nilai bertanda kurung adalah placeholder, bukan nilai siap deploy. Sender dipakai hanya setelah domain Verified. Key tidak dimasukkan chat/Git/browser; tidak memakai Zoho password. Redeploy aplikasi dengan SQL/env yang sudah sesuai.
6. Kirim satu inquiry sintetis di website aman. Dashboard harus menunjukkan lead dan status notifikasi; buka inbox dan spam Zoho untuk memastikan **satu** pesan benar-benar diterima. Provider accepted saja belum membuktikan sampai inbox. Retry identik tidak menggandakan lead/email. Catat bukti tanpa lead/token.

Scheduler retry tetap optional dan harus configured di host yang benar; tanpa scheduler, cek dashboard/inbox dua kali setiap hari kerja dan gunakan retry owner. Failed/uncertain deliveries lama diperiksa pada provider dahulu; bukan reset attempts massal. Detail lease, batas 5 attempts dan 23-hour retry window di [NOTIFICATIONS.md](NOTIFICATIONS.md).

Paket ini hanya notifikasi inquiry owner. Akun Supabase Auth email/invitation memiliki konfigurasi pengirim sendiri; Resend key aplikasi tidak otomatis mengonfigurasi SMTP Supabase. Penawaran, invoice dan outreach tetap dikirim manual sesuai instruksi owner.
