# Backlog eksekusi

Status: TODO = belum mulai; LOCAL = implementasi + verifikasi lokal selesai; PARTIAL = bagian selesai, ada gate tersisa; ACCOUNT = menunggu konfigurasi/akses akun; DONE = terverifikasi produksi/operasional. Tidak ada status DONE hanya dari membaca kode.

| ID | Prioritas | Pekerjaan | Acceptance | Status |
| --- | --- | --- | --- | --- |
| W01 | P0 | API inquiry, validation, consent, retry | A01–A05 | LOCAL |
| W02 | P0 | SQL RLS + rate limit persisten | A06 | PARTIAL; LOCAL + owner-reported 24 PASS schema/grants; runtime project/REST/concurrency ACCOUNT |
| W03 | P0 | Auth admin server + pipeline | A07–A08 | PARTIAL; LOCAL + screenshot admin Email user dibuat; login/UUID allowlist/runtime ACCOUNT |
| W04 | P0 | Pause semua API builder sebelum side effect | A09 | LOCAL |
| W05 | P0 | Build tanpa perubahan DB | A10 | LOCAL |
| W06 | P0 | Dependencies berisiko tinggi dan build | A11 | PARTIAL; kedua runtime audit 0; builder full audit 0; website 5 dev-chain advisory tanpa patched braces; website full lint 0 error |
| W07 | P1 | Canonical apex, sitemap, penawaran AI | A12 | LOCAL |
| W08 | P0 rilis | Migrasi backup + service key + allowlist owner | A13 | PARTIAL; owner apply/verify 24 PASS; backup/project identity/service key/Auth allowlist belum verified |
| W09 | P0 rilis | Preview + produksi test dengan inquiry sintetis | A14 | ACCOUNT |
| W10 | P0 komersial | Hosting komersial, payment eligibility, inbox | A15 | ACCOUNT |
| W11 | P1 | Proposal contoh dan dry-run delivery | A16 | LOCAL; revisi, Git rollback dan ZIP restore identik; actual payment/domain/hosting ACCOUNT |
| W12 | P1 setelah gate | Eksperimen prospek dan pencatatan hasil | SALES-EXPERIMENT.md | TODO |
| W13 | P1 | Kit hospitality, konten terpisah dan generator repository klien | A18–A19 | LOCAL; client-owned remote/deploy/domain dibuat untuk klien nyata setelah onboarding |
| W14 | P0 | Outbox owner notification, retry, guard dan status | A17 | LOCAL; sender/provider/inbox/scheduler produksi ACCOUNT |
| W15 | P1 | Template proposal/onboarding/invoice/payment/CR/launch | A15–A16 | LOCAL; identitas dan ketentuan klien nyata diisi sebelum dipakai |
| W16 | P1 | Tracker proyek, pembayaran dan perubahan scope | A20 | LOCAL; formula/mata uang/simulasi/bukti missing diuji; tidak terkoneksi bank |
| W17 | P1 | Persyaratan roadmap portal/PMS/analytics/billing/outreach/AI | FUTURE-ROADMAP.md | LOCAL; implementasi menunggu pembeli dan dana |
| W18 | P0 | www redirect dan penelusuran akun produksi | A22 | PARTIAL; LOCAL redirect; screenshot gm-builder-9019/project wuus confirmed, CLI masih BinaHub; www NXDOMAIN/canonical live www |
| W19 | P0 | Hentikan tracking skor browser dan kunci tabel historis | A23 | PARTIAL; LOCAL + owner-reported score RLS/grants PASS; deploy penghentian browser tracking/REST produksi ACCOUNT |
| W20 | P0 | Paket SQL manual sesuai pilihan owner | A24 | PARTIAL; LOCAL bundle + 4 guard/preservation tests; owner 24 PASS apply/verify, project identity/REST independent belum verified |
| W21 | P0 operasional | Rumahweb/Zoho/email guide dan payment recommendation | EMAIL-SETUP.md/PAYMENTS.md | PARTIAL; Zoho admin/hallo aktif; Resend DNS terpublikasi di tiga NS yang merespons; provider Verified/env/inbox/payment route ACCOUNT |

## Bukti dan risiko tersisa

Hasil pengujian dicatat di [VERIFICATION.md](VERIFICATION.md). Owner mengirim hasil apply/verify 24 PASS; ini bukti hasil checker dari owner, belum pemeriksaan REST/Auth/konkurensi independen. Tidak ulang migration. Endpoint AI yang dipause bukan bukti bahwa ledger/webhook lama sudah benar. Tidak membuka kembali endpoint hanya untuk membuat demo berjalan.

Pekerjaan berikutnya menurut OWNER-NEXT-STEPS.md: cek Verified Resend/www → akses project wuus dan env/UUID Auth user yang sudah dibuat → keputusan hosting komersial → rilis/test live → payment/inbox/scope verified → W12. Akun produksi teridentifikasi tetapi CLI memakai akun berbeda. SQL manual sudah dilaporkan PASS; runtime config masih harus dicocokkan. Tidak ada klaim produksi siap menerima deposit sebelum gate tersebut lulus.
