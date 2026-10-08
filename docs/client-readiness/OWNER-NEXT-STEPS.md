# Langkah owner sesudah SQL — 8 Oktober 2026

Database: owner mengirim 24 PASS, inventory awal direview. Paket manual hanya `00-inspect.sql`, `01-apply.sql`, `02-verify.sql`; `01` sudah menggabungkan tiga migration dan mencetak verify setelah commit. Tidak perlu SQL tambahan atau mengulang tiga migration untuk setup awal. Hasil PASS belum membuktikan Auth/API/inbox/deployment.

## 1. DNS Rumahweb

Screenshot menunjukkan website apex serta MX/SPF/DKIM Zoho. Pertahankan record tersebut dan record preview/build/Clerk yang sudah dipakai.

Update 04:37 UTC: owner sudah menambahkan ketiga record Resend; DKIM dan dua CNAME terkonfirmasi pada tiga nameserver authoritative yang merespons (satu lainnya timeout). **Jangan menambahkan duplikat**; petunjuk tabel berikut adalah referensi konfigurasi. Langkah saat ini: cek Verified di Resend lalu siapkan key/env dan tes inbox.

Resend root domain `webuntukusaha.com` sudah dibuat pada akun owner. Tambahkan record berikut menggunakan **content lengkap dari dashboard Resend**, bukan string screenshot terpotong:

| Type | Host relatif | Content |
| --- | --- | --- |
| TXT | `resend._domainkey` | Seluruh nilai DKIM yang disediakan Resend |
| CNAME | `resend` | Target lengkap yang disediakan Resend |
| CNAME | `send` | Target lengkap yang disediakan Resend |

Jika editor Rumahweb memakai FQDN, gunakan `resend._domainkey.webuntukusaha.com`, `resend.webuntukusaha.com`, dan `send.webuntukusaha.com`. Domain tidak boleh terulang dua kali. Tidak menggabungkan CNAME dengan record lain pada hostname yang sama.

Tetap **Enable Receiving OFF** pada Resend; MX inbox root tetap Zoho. Pastikan domain sending benar-benar Verified. DNS authoritative pukul 04:12 UTC belum menemukan ketiga host Resend maupun www. Tidak menafsirkan indikator hijau/toggle sebagai bukti inbox delivery. [Panduan Resend](https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records).

Di Vercel project `wuus` → Domains, tambahkan `www.webuntukusaha.com`, pilih redirect permanen ke `https://webuntukusaha.com`, lalu tambahkan CNAME `www` di Rumahweb memakai **target persis dari project/domain Vercel tersebut**. Jangan menyalin target preview/build atau menebak CNAME generik. [Panduan Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

`www` adalah alamat tambahan, bukan kewajiban memilihnya sebagai alamat utama. WUUS tetap membagikan URL tanpa www; redirect melayani pengunjung/link yang menggunakan www dan menuju halaman setara di apex. Canonical/sitemap memakai apex secara konsisten. [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## 2. Auth dan konfigurasi project yang benar

Screenshot mengidentifikasi akun `gm-builder-9019`, project `wuus`, apex Valid Configuration pada Production. Nama team UI terpotong; team slug/ID dan repository link masih perlu dibaca dari project asli. CLI saat ini memakai `binahubid-7508` (BinaHub), akun berbeda. Owner login CLI ke akun yang memiliki akses project `wuus` bila rilis memakai CLI; jangan mengirim token/password di chat.

Pada Supabase Authentication → Users, buat/pilih owner login email/password yang berfungsi dan simpan UUID user. Zoho email aktif tidak otomatis membuat Supabase Auth user.

Screenshot terbaru sudah menunjukkan user Email `admin@webuntukusaha.com` dibuat pada Authentication di main/Production. Gunakan user tersebut, tidak membuat duplikat. Last sign-in masih kosong; pastikan password/konfirmasi account sesuai alur pembuatan dan uji login. UUID dari baris user masuk `WUUS_ADMIN_USER_IDS` di server env secara privat; belum menjadi bukti dashboard admin mengizinkan akun itu sebelum env dan runtime proyek cocok.

Isi environment **project `wuus` yang benar**, dengan project Supabase yang menjalankan SQL tadi:

| Variable | Isi |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL proyek aktif |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable/anon key proyek tersebut |
| `SUPABASE_SERVICE_ROLE_KEY` | Server secret/service role proyek tersebut |
| `WUUS_ADMIN_USER_IDS` | UUID Auth owner |
| `WUUS_RATE_LIMIT_SECRET` | Secret acak baru minimal 32 karakter |
| `WUUS_ALLOWED_ORIGINS` | Exact preview origin bila digunakan |
| `RESEND_API_KEY` | Key sending untuk domain yang sesuai, disimpan privat |
| `WUUS_NOTIFICATION_FROM` | `hallo@webuntukusaha.com`, setelah Resend Verified |
| `WUUS_OWNER_EMAIL` | `admin@webuntukusaha.com` |

Password/key/nomor rekening tidak masuk chat/source/Git. Preview memakai data dan secrets staging sendiri. `CRON_SECRET` hanya bila scheduler retry benar-benar dipakai.

### Update konfigurasi lokal dan MCP — 8 Oktober, 05:24 UTC

`.env.local` sudah diisi dengan UUID admin yang cocok dengan Auth proyek `zsodlugndrjtnxoohxht`, sender `hallo`, recipient `admin`, serta dua secret acak berbeda sepanjang 64 karakter. Key Supabase dan Resend yang sudah tersedia dipertahankan. Salinan privat `.env.wuus-vercel.local` berisi hanya 10 variabel WUUS/Supabase/Resend untuk import pada project Vercel `wuus` yang benar; kedua file diabaikan Git. Jangan membagikan file ini atau menggunakannya untuk staging.

`WUUS_ALLOWED_ORIGINS` sengaja kosong: kode selalu mengizinkan `https://webuntukusaha.com`. Tambahkan exact origin preview hanya jika memang diperlukan, dengan data/secret staging terpisah. `CRON_SECRET` sudah dibuat untuk kebutuhan endpoint retry; ini tidak membuat scheduler otomatis.

Pemeriksaan API read-only berhasil: service key mengarah ke proyek yang benar; UUID dan email Auth admin cocok, email terkonfirmasi, tetapi belum pernah login. REST anonim ke `business_scores`, `hospitality_inquiries`, dan `wuus_inquiry_notifications` masing-masing ditolak HTTP 401. API Resend mengonfirmasi domain root berstatus **verified**. Ini belum membuktikan alur form, login owner atau penerimaan email.

MCP `supabase` terdaftar pada konfigurasi Codex global, dibatasi project reference di atas dan `read_only=true`. Perintah Claude tidak dipakai untuk mengonfigurasi Codex. OAuth selesai dengan hasil CLI **Successfully logged in**; owner memilih akun dashboard saat login langsung, sehingga email akun OAuth tidak diverifikasi dari hasil CLI. Akun dashboard berbeda dari akun Auth admin website. Muat ulang koneksi MCP di Codex bila alat belum muncul pada sesi ini. Untuk autentikasi ulang jalankan `codex mcp login supabase` di terminal. SQL produksi tetap dikerjakan manual oleh owner.

Langkah berikutnya: import env privat pada **Production** project Vercel yang benar, lalu ikuti pemeriksaan preview/rilis di bawah. Tidak mengimpor secret produksi ke preview publik. Registrasi/OAuth MCP selesai; pemanggilan tool MCP di chat ini belum diuji karena tool belum termuat. Pemeriksaan API di atas menggunakan konfigurasi lokal, bukan klaim keberhasilan tool MCP.

### Rilis produksi — 8 Oktober, 05:38 UTC

Owner melaporkan env Vercel sudah diperbarui. GitHub mengonfirmasi repository produksi: `GM-Builder/wuus` dan `GM-Builder/wuus-builder`, masing-masing branch `main`. Perubahan dikirim secara fast-forward ke dua repository tersebut dan branch `codex/client-readiness`; mirror `faisalfarizi22` tidak diubah. Semua secret lokal tetap diabaikan Git.

Website commit `1bb39a7` berhasil deploy (Vercel `2FXALJySaRdh9m29XN5J4szvfKKj`, GitHub deployment `6928094070`). Apex/hospitality/review HTTPS 200 dan canonical apex. Kontak publik pada homepage/hospitality memakai hallo; tidak menampilkan admin/email personal lama. API admin/notification/cron menolak anonymous 401; admin juga menolak token palsu dan token service-role sebagai user session. Form menolak origin asing 403 dan payload tidak sah 400. Ini tidak membuat lead/email dan belum menguji submit sah atau login owner.

Builder commit `560a7de` berhasil deploy (Vercel `3wed2f5NEydjZxG3oBASDar4Jkkc`, GitHub deployment `6928086601`). Pada `build.webuntukusaha.com`, 19/19 kombinasi method/route mengembalikan 503 `BUILDER_PAUSED`. Tidak ada panggilan ke provider AI/payment dari pemeriksaan ini. Invoice/top-up lama dan settlement di provider masih perlu diperiksa owner.

**Tindakan owner berikutnya:**

1. Buka `https://webuntukusaha.com/hospitality`, kirim satu inquiry fiktif dengan penanda **WUUS TEST — hospitality** dan email milik sendiri. Ulangi pada `/review` dengan penanda **WUUS TEST — review**. Jangan memakai data tamu/prospek asli.
2. Buka `https://webuntukusaha.com/admin/inquiries`, login dengan Supabase Auth `admin@webuntukusaha.com` dan password yang dibuat saat membuat user tersebut. Password ini dapat berbeda dari password Zoho. Pastikan kedua inquiry terlihat dan ubah status salah satu menjadi `audit_prepared`; setelah pemeriksaan, archive kedua inquiry uji.
3. Cek inbox/spam `admin@webuntukusaha.com` di Zoho. Notifikasi harus benar-benar diterima; angka Provider accepted pada admin saja belum membuktikan inbox. Jika gagal, gunakan request ID/error/status untuk diagnosis tanpa mengirim password/key di chat.
4. Tambahkan www dan redirect ke apex lewat project Vercel `wuus` lalu Rumahweb memakai target DNS dari project tersebut. Pemeriksaan 05:37 UTC masih belum menemukan DNS www; domain utama sudah berfungsi.
5. Selesaikan hosting yang mengizinkan penggunaan komersial dan verifikasi detail/rute pembayaran BRI sebelum menerima DP. Setelah QA form/admin/inbox lulus, mulai batch prospek terarah menurut SALES-EXPERIMENT.md; jangan menambah fitur besar sebelum ada kebutuhan pembeli.

Bukti: `qa/production-website-20261008.json` dan `qa/production-builder-20261008.json`. Hasil tersebut berlaku pada commit/waktu pemeriksaan yang tercatat; tidak mengklaim semua production gate selesai.

Screenshot production menunjukkan **Hobby**, yang dibatasi personal nonkomersial. Pilih hosting/plan yang mengizinkan penggunaan jasa komersial sebelum rilis komersial; tidak membeli plan otomatis dengan budget Rp0. [Vercel Hobby](https://vercel.com/docs/plans/hobby). Pemindahan main app harus mendukung Next server API/Auth, bukan hanya upload kit statis.

## 3. Rilis dan pemeriksaan

Siapkan rilis aman dari branch `codex/client-readiness` di repo website, cocokkan repository/root directory dengan project `wuus`, lalu jalankan runbook. Jangan melakukan Git push ke semua push URL tanpa memilih repository yang benar. Apply SQL sudah dilaporkan selesai; form live lama yang menulis langsung dari browser perlu diganti aplikasi server yang baru. Jangan membuka ulang grants publik supaya form lama dapat menulis.

Periksa preview lalu produksi: inquiry sintetis tersimpan → owner login dan data tampil → status bisa berubah → satu notifikasi diterima di inbox admin. Anonymous/nonowner harus ditolak. Error mempertahankan isian dan menampilkan email manual. Verifikasi www→apex/path/query/HTTPS, canonical apex dan email publik hallo. Regresi database yang menulis banyak fixture hanya di staging.

Builder memiliki deployment sendiri; hubungkan project sebenarnya dan deploy containment, sambil mengecek invoice/top-up lama. Website release tidak otomatis menutup API builder di `build`.

Status produksi baru DONE setelah bukti live, sesuai [release runbook](RELEASE-RUNBOOK.md) dan [gate produksi](PRODUCTION-BLOCKERS.md). Tidak mengirim email/outreach, menjalankan SQL, mengubah DNS, membeli plan atau deploy dari pembuatan dokumen ini.
