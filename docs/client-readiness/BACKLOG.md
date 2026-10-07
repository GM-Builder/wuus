# Backlog eksekusi

Status: TODO = belum mulai; LOCAL = implementasi + verifikasi lokal selesai; PARTIAL = bagian selesai, ada gate tersisa; ACCOUNT = menunggu konfigurasi/akses akun; DONE = terverifikasi produksi/operasional. Tidak ada status DONE hanya dari membaca kode.

| ID | Prioritas | Pekerjaan | Acceptance | Status |
| --- | --- | --- | --- | --- |
| W01 | P0 | API inquiry, validation, consent, retry | A01–A05 | LOCAL |
| W02 | P0 | SQL RLS + rate limit persisten | A06 | LOCAL; Supabase asli ACCOUNT |
| W03 | P0 | Auth admin server + pipeline | A07–A08 | LOCAL; Auth asli ACCOUNT |
| W04 | P0 | Pause semua API builder sebelum side effect | A09 | LOCAL |
| W05 | P0 | Build tanpa perubahan DB | A10 | LOCAL |
| W06 | P0 | Dependencies berisiko tinggi dan build | A11 | PARTIAL; runtime high/critical 0, lint baseline/dev advisory tersisa |
| W07 | P1 | Canonical apex, sitemap, penawaran AI | A12 | LOCAL |
| W08 | P0 rilis | Migrasi backup + service key + allowlist owner | A13 | ACCOUNT |
| W09 | P0 rilis | Preview + produksi test dengan inquiry sintetis | A14 | ACCOUNT |
| W10 | P0 komersial | Hosting komersial, payment eligibility, inbox | A15 | ACCOUNT |
| W11 | P1 | Proposal contoh dan dry-run delivery | A16 | PARTIAL; contoh siap, delivery/restore belum |
| W12 | P1 setelah gate | Eksperimen prospek dan pencatatan hasil | SALES-EXPERIMENT.md | TODO |

## Bukti dan risiko tersisa

Hasil pengujian dicatat di [VERIFICATION.md](VERIFICATION.md). SQL yang disimpan bukan bukti bahwa migrasi sudah diterapkan. Endpoint AI yang dipause bukan bukti bahwa ledger/webhook lama sudah benar. Tidak membuka kembali endpoint hanya untuk membuat demo berjalan.

Pekerjaan berikutnya: W08 → W09 → W10 → sisa W11 → W12. Owner perlu menjawab plan hosting dan akses Supabase, lalu konfigurasi staging/production mengikuti runbook. Belum ada notifikasi email inquiry otomatis. Website tidak dinyatakan siap menerima deposit sebelum payment, hosting dan scope klien verified.
