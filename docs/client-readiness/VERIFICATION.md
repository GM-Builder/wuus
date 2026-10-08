# Verification — 7–8 Oktober 2026

Hasil pada branch `codex/client-readiness` di dua repositori. **Agent belum deploy atau menjalankan SQL produksi; owner telah mengirim hasil manual apply/verify 24 PASS.** Tidak mengirim outreach, menerima uang, membuat transaksi, atau memanggil provider AI live. Output SQL/screenshot owner dibedakan dari pemeriksaan live independen agent.

## Implementasi

- Dua form memakai `/api/inquiries`; tidak lagi insert tabel lewat browser. Server validation, batas body streaming, consent, honeypot, exact origin, timeout dan error tanpa detail internal.
- ID permintaan tetap pada retry identik, berubah bila isian berubah. DB RPC memberi hasil saved/duplicate/conflict/limited. Consent time/version dan sumber tercatat.
- Migration transaksional: RLS, revoke anon/authenticated/public, remove policy lama, service-only RPC, rate limit durable dan advisory lock. Record lama tetap utuh; consent legacy tidak diinventaris sebagai consent baru.
- Admin menggunakan Supabase Auth. Server `getUser` + allowlist user UUID sebelum membaca/mengubah data; tidak ada PIN/default master/localStorage flag sebagai otorisasi.
- Builder semua API dipause di middleware dan pada awal tiap handler; root UI menjelaskan pause. Build tidak melakukan `db push`. Pembukaan kembali memerlukan proyek ledger/webhook tersendiri.
- Next.js kedua repositori diperbarui ke 16.4.0; lockfile diperbarui; next-auth yang tidak dipakai builder dihapus. `npm audit fix` tanpa force hanya perubahan kompatibel.
- Canonical apex, sitemap baru, metadata `/review`, English language pada konten internasional. Penawaran AI live dan SEPA/Wise yang belum verified dicabut; copy consent/privacy/terms sesuai alur baru.
- Kalkulator memakai locale eksplisit untuk mencegah hydration mismatch, persentase dibatasi dan angka nonfinite/negatif tidak menghasilkan klaim saving tidak valid.
- Outbox notifikasi atomik, fixed recipient, provider idempotency, lease/backoff dan owner/cron guard; email tidak dinyatakan terkirim ke inbox hanya dari provider acceptance. Dashboard menampilkan status antrean dan pagination 100/page.
- Kit hospitality statis terpisah dari WUUS, generator Git repo per klien, input/URL/photo validation, HTML escaping, approval/fictitious production gate dan fresh build output.
- Template operasional lengkap, tracker Excel dan simulasi fiktif sampai revisi/handover/Git rollback/ZIP restore. Roadmap fitur besar memakai gate pembeli/dana.
- Tes skor bisnis hanya menghitung jawaban di browser; anonymous insert `business_scores` dihentikan. Migration 003 opsional-tabel mempertahankan record historis, menutup grants/policies/sequence publik dan lulus denial CRUD kedua role.
- Owner meminta SQL manual: inspect, generated apply satu transaksi, readonly verify dan guide tersedia di `supabase/manual/`. Column-level grants lama juga dicabut; outbox policies lama ditutup. Bundle cocok dengan sumber migration, preserve legacy rows, no backfill emails, incompatible schema/view chains/callable direct definers berhenti sebelum commit. Unknown indirect/dynamic access tetap manual review.

## Hasil pemeriksaan

| Pemeriksaan | Hasil | Batas bukti |
| --- | --- | --- |
| Website `npm test` | 37/37 pass, 8 Oktober | Inquiry/Auth/SQL, table + column grants, legacy score-table denial, outbox, kit; 4 manual-bundle cases (fresh/legacy/rollback/exposure guard) |
| Website integrasi `npm run test:integration` | 29/29 checks pass | API asli + PGlite; Auth/PostgREST simulasi; cron/owner denial, >500 pagination, local www 308 |
| Website TypeScript | Pass | `tsc --noEmit --incremental false` |
| Website production build | Pass | Tidak memverifikasi provider/production DB |
| Full lint website | 0 error, 44 warnings baseline | `npm run lint` exit 0; warning tidak disamarkan sebagai clean tanpa warning |
| Builder test | 3/3 pass | Pause + patched deepmerge cyclic graph/config merge + KaTeX inherited trust denial |
| Builder TypeScript | Pass setelah dependency refresh | Tidak melewati ignoreBuildErrors |
| Builder production build | Pass | Prisma generate lokal; tidak push schema |
| Builder HTTP seluruh handler | 19/19 pass, status 503 | Production build lokal; tidak ada request ke provider |
| Website HTTP tanpa konfigurasi | 6/6 expected statuses | Form 503; consent 400; origin 403; admin anonymous 401; allowlist hilang 503 |
| Sitemap/canonical lewat HTTP | Pass | Apex; admin tidak tercantum; www DNS tetap pekerjaan akun |
| Browser dua form failure path | Pass | Error terlihat, isian utuh, email manual, tidak auto-mailto; DB production belum configured |
| Browser layout | Tidak ada horizontal overflow pada 360/390/768/1440 | Hospitality; mobile review juga dilihat; bukan audit semua demo |
| Browser admin anonymous | Login terlihat, tidak menampilkan PII | Belum login akun owner asli |
| Browser hydration kalkulator | Error ditemukan dan diperbaiki; tab baru error logs kosong | Session lama tetap memiliki log historis, tidak dianggap error baru |
| Kit browser | 360/390/768/1440 tanpa overflow/broken images; reversed dates ditolak; draft invalidated setelah edit; privacy hidup; console kosong | Local fictional property, tidak mengirim email/WhatsApp |
| Builder diagram browser | Workflow SVG dan KaTeX math rendered; console kosong | Smoke test menggunakan DOM asli; belum full AI-workspace regression |
| Tracker Excel | Formula scenario tests, error scan 0, semua tab dirender/diinspeksi | Simulasi 0 income; missing proof 0; currency mismatch 0; duplicate invoice 0; approved CR/refund benar; bukan bank integration |
| Delivery/restore | Git clone rebuild, rollback v1/return v2, ZIP extraction rebuild identik | Fictional approvals/payments dan local launch rehearsal; real revenue 0 |
| DNS/mail 8 Oktober | Apex HTTPS 200, authoritative NS Rumahweb, MX Zoho, www ENOTFOUND, live canonical masih www | Public read-only checks; tidak membuktikan account hosting/inbox receipt |
| Kontak email 8 Oktober | Build termasuk TypeScript pass; targeted lint 0 error/2 baseline warnings; empat HTML publik memakai `hallo` dan tidak menampilkan `admin`; fallback error `/review` sesuai source; static fallback `node --check` pass | Recipient lokal `admin@webuntukusaha.com`; tidak deploy, membuat mailbox/alias, mengirim email nyata atau membuktikan inbox receipt |
| Bukti owner SQL/accounts 8 Oktober | Dua output identik 24 PASS; inventory bigint inquiry/UUID score sesuai; screenshot gm-builder-9019/project wuus Production/Hobby, Zoho admin/hallo aktif, Resend root domain ada | USER-REPORTED SQL, belum direct REST/Auth; screenshot tidak memberikan akses CLI/key/env atau inbox receipt |
| DNS Resend/www 04:12 UTC | Resolver publik + authoritative nsid1.rumahweb.com: resend._domainkey/resend/send/www belum ditemukan; MX root tetap Zoho | Tidak menganggap indikator screenshot sebagai domain sending Verified; exact DNS values diambil owner dari dashboard |
| DNS/Auth update 04:37 UTC | Resend DKIM TXT dan resend/send CNAME ada pada nsid1/nsid3/nsid4; MX Zoho tetap sama; nsid2 timeout. Screenshot Supabase menunjukkan Email admin user dibuat, last sign-in kosong | Presence DNS bukan provider Verified/inbox receipt; Auth user existence bukan tes login/allowlist; UUID tidak disalin ke Git |
| API/env/MCP update 05:24 UTC | Service key cocok proyek `zsodlugndrjtnxoohxht`; admin UUID/email cocok dan email terkonfirmasi. Ketiga tabel menolak REST anon HTTP 401. Resend API: root domain verified. Env lokal privat dan salinan import Vercel siap; secret acak berbeda masing-masing 64 karakter. MCP dibatasi project reference/read-only, OAuth CLI Successfully logged in | Konfigurasi global Codex, bukan Claude; email akun OAuth tidak diekspos hasil CLI, tool belum termuat di chat ini. Tidak menjalankan SQL, mengirim email, mengubah data atau deploy. Last sign-in kosong; uji form/owner/inbox tetap pending |

Bukti tampilan: `WUUS/docs/client-readiness/qa/hospitality-mobile-error.png` dan `review-mobile-error.png`. Isian hanya data sintetis `example.com`; tidak ada data prospek nyata.

## Dependency dan lint yang tersisa

Audit runtime saat verifikasi: website **0**, builder **0**. Builder full audit juga **0**, setelah targeted overrides deepmerge-ts 8.0.0 dan KaTeX 0.18.2. Prisma generate/build dan renderer browser lulus; overrides dipertahankan sampai upstream memasukkan patched versions. Website full audit masih **5 high package entries** pada rantai lint braces/micromatch/fast-glob/Next eslint. GitHub [braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) mencantumkan **tidak ada patched version**, dan npm latest masih 3.0.3. Tidak downgrade Next/eslint ke 14 untuk menghilangkan angka. Lint memakai pola/path repo terkontrol, tidak memproses glob pengunjung; jangan membuka dev/lint service publik atau menerima glob tak dipercaya.

Sepuluh lint error website diperbaiki: inferred types, quote JSX dan viewport subscription menggantikan synchronous state effects. Full website lint exit 0, warning baseline tetap dicatat. Builder full lint belum tersedia (eslint tidak diinstall/configured); helper/middleware sebelumnya diperiksa dengan konfigurasi website. Tidak menyebut builder full lint pass.

`next dev` memperbarui blok AGENTS.md otomatis. Sumber generator Next diverifikasi; tidak ada instruksi owner yang dihapus. Next builder masih memberi warning konvensi middleware deprecated; guard route tetap aktif.

## Gate belum lulus

1. Owner melaporkan 24 PASS setelah apply manual; project aktif kini cocok dengan URL/service key melalui API, dan REST anonim tiga tabel ditolak 401. Backup/preservation aktual, authenticated nonowner serta concurrency multi-connection tetap perlu dibuktikan. Tidak perlu mengulang migration 001/002/003.
2. URL/key Supabase, key/sender Resend, UUID admin dan dua secret acak sudah siap lokal, dengan salinan privat untuk import Vercel. Belum dipasang di deployment. Allowed origins tambahan kosong karena apex built-in; staging memakai data/secret terpisah.
3. API mengonfirmasi admin Auth/email terkonfirmasi, last sign-in kosong. Login/non-owner, UUID allowlist runtime dan alur kedua form sampai status update di preview/production belum diuji. Registrasi dan OAuth MCP berhasil; pemanggilan tool dalam chat belum diuji.
4. Screenshot owner mengidentifikasi akun produksi `gm-builder-9019`, project `wuus`, apex Valid Configuration/Production dengan **Hobby**. CLI lokal masih BinaHub/binahubid-7508; project/team ID, repo/root directory, akses rilis dan hosting komersial belum diselesaikan. Registrar/NS Rumahweb dan MX Zoho confirmed; www ENOTFOUND/canonical live www. SQL manual tidak memerlukan CLI Supabase login; config aktif belum dicocokkan dengan proyek apply.
5. Zoho admin/hallo aktif dan Resend API mengonfirmasi root sending domain verified; key/sender lokal tersedia. Actual inbox, env deployment dan scheduler belum diuji. Owner menyebut BRI, Jago dan GoPay; dukungan Wise umum terkonfirmasi, BRI utama/Jago cadangan. Detail/ownership rekening, actual payment route/fees/currency/identitas dan invoice builder lama belum verified. AI tetap dipause lokal; production indirect access dan multiconnection concurrency belum diuji.

Bukti tambahan: qa/integration-report.json, qa/delivery-simulation-report.json, qa/client-desktop.png, qa/client-mobile-inquiry.png, qa/diagram-dependency-report.json. Kondisi akun/rilis dirangkum di PRODUCTION-BLOCKERS.md. Kit contoh adalah repo fiktif terpisah; source archive serta restore outputs berada di folder output workspace.

Lanjutkan menurut [RELEASE-RUNBOOK.md](RELEASE-RUNBOOK.md). Jangan menyebut sistem produksi siap menerima deposit berdasarkan hasil lokal ini.
