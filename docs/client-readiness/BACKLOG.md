# Backlog eksekusi

Status: TODO = belum mulai; LOCAL = implementasi + verifikasi lokal selesai; PARTIAL = bagian selesai, ada gate tersisa; ACCOUNT = menunggu konfigurasi/akses akun; DONE = terverifikasi produksi/operasional. Tidak ada status DONE hanya dari membaca kode.

| ID | Prioritas | Pekerjaan | Acceptance | Status |
| --- | --- | --- | --- | --- |
| W01 | P0 | API inquiry, validation, consent, retry | A01–A05 | LOCAL |
| W02 | P0 | SQL RLS + rate limit persisten | A06 | PARTIAL; owner 24 PASS + project/service key cocok + anon REST tiga tabel 401; authenticated nonowner/concurrency staging pending |
| W03 | P0 | Auth admin server + pipeline | A07–A08 | PARTIAL; Auth owner/email confirmed, allowlist lokal dan deployment baru live; anon/token palsu ditolak; login owner/status update pending |
| W04 | P0 | Pause semua API builder sebelum side effect | A09 | DONE; main 560a7de production deployed, 19/19 method/route live 503 BUILDER_PAUSED |
| W05 | P0 | Build tanpa perubahan DB | A10 | DONE; script generate + build, local checks pass dan production deployment sukses; tidak menjalankan DB push/migration |
| W06 | P0 | Dependencies berisiko tinggi dan build | A11 | PARTIAL; kedua runtime audit 0; builder full audit 0; website 5 dev-chain advisory tanpa patched braces; website full lint 0 error |
| W07 | P1 | Canonical apex, sitemap, penawaran AI | A12 | PARTIAL; canonical apex/sitemap/website baru live dan builder pause live; www DNS masih pending |
| W08 | P0 rilis | Migrasi backup + service key + allowlist owner | A13 | PARTIAL; owner 24 PASS, project/service key cocok, env Vercel owner-reported updated; backup/login owner pending |
| W09 | P0 rilis | Preview + produksi test dengan inquiry sintetis | A14 | PARTIAL; production deployment/negative-path checks pass; owner submit dua inquiry/status update/inbox pending |
| W10 | P0 komersial | Hosting komersial, payment eligibility, inbox | A15 | ACCOUNT |
| W11 | P1 | Proposal contoh dan dry-run delivery | A16 | LOCAL; revisi, Git rollback dan ZIP restore identik; actual payment/domain/hosting ACCOUNT |
| W12 | P1 setelah gate | Eksperimen prospek dan pencatatan hasil | SALES-EXPERIMENT.md | TODO |
| W13 | P1 | Kit hospitality, konten terpisah dan generator repository klien | A18–A19 | LOCAL; client-owned remote/deploy/domain dibuat untuk klien nyata setelah onboarding |
| W14 | P0 | Outbox owner notification, retry, guard dan status | A17 | PARTIAL; Resend verified, env updated owner-reported, endpoint notification protected live; actual send/inbox/retry/scheduler pending |
| W15 | P1 | Template proposal/onboarding/invoice/payment/CR/launch | A15–A16 | LOCAL; identitas dan ketentuan klien nyata diisi sebelum dipakai |
| W16 | P1 | Tracker proyek, pembayaran dan perubahan scope | A20 | LOCAL; formula/mata uang/simulasi/bukti missing diuji; tidak terkoneksi bank |
| W17 | P1 | Persyaratan roadmap portal/PMS/analytics/billing/outreach/AI | FUTURE-ROADMAP.md | LOCAL; implementasi menunggu pembeli dan dana |
| W18 | P0 | www redirect dan penelusuran akun produksi | A22 | PARTIAL; GM-Builder production repositories confirmed dan deployed; canonical apex live; www DNS/HTTPS/redirect pending |
| W19 | P0 | Hentikan tracking skor browser dan kunci tabel historis | A23 | PARTIAL; source penghentian tracking deployed, score table anon REST 401 + owner PASS; verifikasi browser produksi lanjutan pending |
| W20 | P0 | Paket SQL manual sesuai pilihan owner | A24 | PARTIAL; LOCAL bundle + 4 guard/preservation tests; owner 24 PASS, project/service key cocok dan anon REST independent 401; backup/preservation aktual belum verified |
| W21 | P0 operasional | Rumahweb/Zoho/email guide dan payment recommendation | EMAIL-SETUP.md/PAYMENTS.md | PARTIAL; Zoho aktif, Resend domain verified, env updated owner-reported; actual inbox/payment route/hosting komersial pending |

## Bukti dan risiko tersisa

Hasil pengujian dicatat di [VERIFICATION.md](VERIFICATION.md). Owner mengirim hasil apply/verify 24 PASS; ini bukti hasil checker dari owner, belum pemeriksaan REST/Auth/konkurensi independen. Tidak ulang migration. Endpoint AI yang dipause bukan bukti bahwa ledger/webhook lama sudah benar. Tidak membuka kembali endpoint hanya untuk membuat demo berjalan.

Pekerjaan berikutnya menurut OWNER-NEXT-STEPS.md: owner kirim dua inquiry uji → login admin/status update → actual inbox → www dan hosting komersial/payment gate → W12. Website dan builder sudah rilis lewat GitHub production main, tanpa CLI Vercel BinaHub. SQL manual owner PASS; tidak apply ulang. Tidak ada klaim produksi siap menerima deposit sebelum gate tersisa lulus.
