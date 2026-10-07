# Verification — 7 Oktober 2026

Hasil pada branch `codex/client-readiness` di dua repositori. **Belum deploy, belum migrasi Supabase produksi, belum menerima uang.** Tidak mengirim outreach, membuat transaksi, atau memanggil provider AI live.

## Implementasi

- Dua form memakai `/api/inquiries`; tidak lagi insert tabel lewat browser. Server validation, batas body streaming, consent, honeypot, exact origin, timeout dan error tanpa detail internal.
- ID permintaan tetap pada retry identik, berubah bila isian berubah. DB RPC memberi hasil saved/duplicate/conflict/limited. Consent time/version dan sumber tercatat.
- Migration transaksional: RLS, revoke anon/authenticated/public, remove policy lama, service-only RPC, rate limit durable dan advisory lock. Record lama tetap utuh; consent legacy tidak diinventaris sebagai consent baru.
- Admin menggunakan Supabase Auth. Server `getUser` + allowlist user UUID sebelum membaca/mengubah data; tidak ada PIN/default master/localStorage flag sebagai otorisasi.
- Builder semua API dipause di middleware dan pada awal tiap handler; root UI menjelaskan pause. Build tidak melakukan `db push`. Pembukaan kembali memerlukan proyek ledger/webhook tersendiri.
- Next.js kedua repositori diperbarui ke 16.4.0; lockfile diperbarui; next-auth yang tidak dipakai builder dihapus. `npm audit fix` tanpa force hanya perubahan kompatibel.
- Canonical apex, sitemap baru, metadata `/review`, English language pada konten internasional. Penawaran AI live dan SEPA/Wise yang belum verified dicabut; copy consent/privacy/terms sesuai alur baru.
- Kalkulator memakai locale eksplisit untuk mencegah hydration mismatch, persentase dibatasi dan angka nonfinite/negatif tidak menghasilkan klaim saving tidak valid.

## Hasil pemeriksaan

| Pemeriksaan | Hasil | Batas bukti |
| --- | --- | --- |
| Website `npm test` | 28/28 pass | Validation, handler, owner guard, retry, calculator dan SQL PostgreSQL lokal |
| Website integrasi `npm run test:integration` | 18/18 HTTP checks pass | API asli + PGlite; Auth/PostgREST disimulasikan |
| Website TypeScript | Pass | `tsc --noEmit --incremental false` |
| Website production build | Pass | Tidak memverifikasi provider/production DB |
| Lint file website baru/diubah | Pass, tanpa error/warning | Core API/form/admin/metadata/legal/script; bukan seluruh repo |
| Builder test | 1/1 pass | Respons helper pause |
| Builder TypeScript | Pass setelah dependency refresh | Tidak melewati ignoreBuildErrors |
| Builder production build | Pass | Prisma generate lokal; tidak push schema |
| Builder HTTP seluruh handler | 19/19 pass, status 503 | Production build lokal; tidak ada request ke provider |
| Website HTTP tanpa konfigurasi | 6/6 expected statuses | Form 503; consent 400; origin 403; admin anonymous 401; allowlist hilang 503 |
| Sitemap/canonical lewat HTTP | Pass | Apex; admin tidak tercantum; www DNS tetap pekerjaan akun |
| Browser dua form failure path | Pass | Error terlihat, isian utuh, email manual, tidak auto-mailto; DB production belum configured |
| Browser layout | Tidak ada horizontal overflow pada 360/390/768/1440 | Hospitality; mobile review juga dilihat; bukan audit semua demo |
| Browser admin anonymous | Login terlihat, tidak menampilkan PII | Belum login akun owner asli |
| Browser hydration kalkulator | Error ditemukan dan diperbaiki; tab baru error logs kosong | Session lama tetap memiliki log historis, tidak dianggap error baru |

Bukti tampilan: `WUUS/docs/client-readiness/qa/hospitality-mobile-error.png` dan `review-mobile-error.png`. Isian hanya data sintetis `example.com`; tidak ada data prospek nyata.

## Dependency dan lint yang tersisa

Audit runtime (`npm audit --omit=dev`) saat verifikasi: website **0 temuan**; builder **2 low** terkait Mermaid/KaTeX, high/critical **0**. Audit seluruh dependency: website 5 high pada rantai lint braces/micromatch/fast-glob/Next eslint; builder 3 high pada Prisma tooling/deepmerge-ts dan 2 low runtime. Angka adalah package entries, bukan jumlah exploit. Tidak melakukan downgrade major paksa hanya untuk menghilangkan angka.

Full lint website tetap memiliki **10 error baseline** pada bento-features, hero, pricing, storytelling dan why-wuus. Lint file perubahan lolos. Builder `npm run lint` baseline tidak tersedia karena eslint tidak diinstall/configured; helper pause dan middleware diperiksa memakai konfigurasi lint website. Ini tercatat sebagai pekerjaan tooling, bukan disamarkan sebagai full lint pass.

`next dev` memperbarui blok AGENTS.md otomatis. Sumber generator Next diverifikasi; tidak ada instruksi owner yang dihapus. Next builder masih memberi warning konvensi middleware deprecated; guard route tetap aktif.

## Gate belum lulus

1. Skema/trigger/policies Supabase asli, migration staging/production dan test REST role belum diverifikasi. Perlu backup dan uji concurrency multi-connection.
2. Service key server, rate-limit secret, allowlist UUID owner dan preview origin belum diset di deployment. Lokal asli hanya memiliki public URL/anon key.
3. Akun owner asli, login/non-owner dan alur kedua form sampai status update di preview/production belum diuji.
4. Plan hosting komersial, account eligibility payment, fees/currency, identitas invoice, inbox delivery dan provider invoice builder lama belum diperiksa.
5. Email alert otomatis, pagination >500, provider spend caps, ledger/webhook AI, full lint cleanup dan delivery/backup restore dry-run belum selesai. Fitur AI tetap dipause.

Lanjutkan menurut [RELEASE-RUNBOOK.md](RELEASE-RUNBOOK.md). Jangan menyebut sistem produksi siap menerima deposit berdasarkan hasil lokal ini.
