# Pembayaran lintas negara WUUS — 8 Oktober 2026

Rekomendasi untuk kondisi owner solo, anggaran awal Rp0: **Wise milik klien → rekening BRI owner dalam IDR** sebagai opsi transfer awal; **Bank Jago menjadi cadangan**. Owner menyatakan memiliki BRI, GoPay dan Bank Jago pada 8 Oktober 2026. **PayPal Invoice** menjadi alternatif ketika klien memilih tautan/kartu atau tidak ingin memakai Wise. Nama layanan telah dikonfirmasi owner; detail/ownership rekening, provider account serta rute transaksi aktual belum diverifikasi. Belum ada instruksi pembayaran nyata yang diterbitkan.

## Pilihan dan alasan

| Metode | Alur | Kelebihan untuk WUUS | Batas yang harus diperiksa |
| --- | --- | --- | --- |
| Wise → bank IDR | Client memakai Wise dan mengirim ke rekening bank Indonesia owner | Tidak perlu integrasi checkout atau saldo Wise owner; dana diterima di bank | Client mungkin harus daftar/KYC; bank/rute/biaya/estimasi dicek pada quote transaksi |
| PayPal Invoice | Owner membuat invoice, client membuka tautan dan memilih metode yang tersedia | Mudah menjelaskan pembayaran via link/kartu; invoice manual tersedia | KYC/account eligibility, guest-card availability, biaya/FX, hold dan pencairan perlu dicek |

Wise mendukung transfer IDR ke rekening individu/bisnis Indonesia. Wise juga menjelaskan bahwa pembayaran ke bank penerima tidak membutuhkan Wise account penerima; ini berbeda dari memiliki balance/IBAN/SEPA account. Opsi pengirim bergantung negara, currency dan nominal. [IDR guide](https://wise.com/help/articles/2932330/guide-to-idr-transfers), [sending money](https://wise.com/help/articles/86BXb0psaAyZIpMWemqFV/sending-money-with-wise), [recipient account explanation](https://wise.com/us/blog/can-i-open-a-joint-account-wise).

## Rekening yang digunakan

| Layanan milik owner | Peran awal | Bukti dukungan dan batas |
| --- | --- | --- |
| BRI | Rekening penerimaan utama untuk DP/pelunasan via Wise dalam IDR | Wise menyediakan rute transfer ke BRI; status rekening, nama payee dan quote negara/currency klien tetap dicek sebelum invoice diterbitkan |
| Bank Jago | Rekening cadangan bila diperlukan; satu invoice hanya memakai satu rekening aktif | Jago menjelaskan transfer Wise dikonversi dan masuk ke Kantong IDR; gunakan nomor Kantong IDR yang benar, bukan nomor kartu atau nomor wallet |
| GoPay (dompet elektronik) | Pembayaran/pengeluaran domestik; belum dijadikan instruksi invoice luar negeri | Wise mendukung payout GoPay, tetapi batas transfer wallet serta batas saldo/transaksi akun perlu dicek; belum diketahui apakah akun owner terverifikasi |

Dukungan umum di atas diverifikasi dari [Wise ke BRI](https://wise.com/id/send-money/send-money-to-indonesia/bri), [FAQ Jago menerima dana luar negeri](https://www.jago.com/id/jago/support/faq/adding-money-to-jago/from-overseas/how-to-receive-money-from-abroad) dan [Wise IDR/wallet limits](https://wise.com/help/articles/2932330/guide-to-idr-transfers), diperiksa 8 Oktober 2026. Memakai BRI sebagai utama dan Jago sebagai cadangan adalah keputusan operasional agar instruksi invoice konsisten, bukan klaim satu bank lebih cepat atau lebih murah. Tidak perlu membuka rekening baru atau membuat integrasi pembayaran.

Nama bank sudah cukup untuk tahap ini. Owner mengecek rekening BRI aktif, nama pemilik sesuai identitas legal dan akses mutasi tersedia; nomor rekening disimpan pada invoice privat. Jika ingin beralih ke Jago, revisi instruksi hanya setelah memastikan tidak ada pembayaran ke BRI yang sedang diproses. Dukungan umum bukan bukti rekening owner telah berhasil menerima transfer Wise.

PayPal Invoice tidak mengenakan setup/monthly fee untuk fitur invoice; fee dikenakan saat pembayaran diterima. Pembayaran kartu tanpa PayPal account tersedia pada alur tertentu, dengan variasi market/fitur. Jangan menjanjikannya pasti tersedia untuk setiap client sebelum preview checkout yang sebenarnya. [PayPal Indonesia invoice](https://www.paypal.com/id/business/accept-payments/invoice), [paying an invoice](https://www.paypal.com/id/cshelp/article/how-do-i-pay-a-money-request-or-invoice-help316).

PayPal dapat menahan pembayaran awal penjual baru sampai 21 hari. Karena DP akan membiayai pekerjaan, invoice berstatus dibayar tetapi uang held/pending belum menjadi dana operasional yang bisa dibelanjakan. Jangan meminta klien membayar ulang hanya karena provider menahan uang. Jangan menandai jasa belum selesai sebagai completed untuk mempercepat hold. [PayPal hold guidance](https://www.paypal.com/id/cshelp/article/rekening-paypal-baru-%E2%80%93-pembayaran-ditahan-dan-mengakses-dana-anda-dengan-lebih-cepat-help848).

## Langkah owner untuk opsi transfer awal

**Owner tidak perlu mendaftar Wise untuk menerima transfer langsung ke rekening bank Indonesia.** Klien memakai akun Wise untuk mengirim; owner menyiapkan rekening BRI dan instruksi invoice privat, dengan Jago sebagai cadangan. Pendaftaran owner baru relevan bila memilih fitur akun Wise sendiri, yang ketersediaannya tidak diasumsikan. Nama bank sudah diberikan; nomor rekening/saldo tidak diminta di chat. [Recipient account explanation](https://wise.com/us/blog/can-i-open-a-joint-account-wise).

1. Pilih rekening Indonesia atas nama payee legal yang benar; pastikan bank mengizinkan penggunaan yang dimaksud. Isi bank/payee/account number pada invoice **privat**, bukan source website, chat atau Git. Nama merek WUUS tidak menggantikan nama pemilik rekening.
2. Sebelum DP, pilih route sesuai negara/currency client dan bank. Client mengecek quote transfer di Wise; bila route tidak tersedia, pilih alternatif yang telah diverifikasi. Tidak menjanjikan satu fee atau waktu tiba untuk semua negara.
3. Invoice menetapkan satu currency kontrak. Jika EUR invoice dilunasi melalui IDR, sepakati **jumlah settlement IDR, kurs/sumber/waktu quote dan masa berlaku** secara tertulis. Contoh: EUR 195 DP, settlement IDR [amount disepakati], quote [reference/time], berlaku sampai [date]. Jangan mengisi kurs perkiraan atau memperlakukan angka EUR sebagai IDR.
4. Client mengatur jumlah yang **diterima penerima** sesuai settlement IDR tersebut. Biaya layanan Wise ditampilkan pada sisi client dan disepakati sebelum membayar; total sender debit bisa lebih tinggi. Nominal yang berubah karena expiry quote perlu persetujuan baru, bukan invoice berbeda secara diam-diam.
5. Minta invoice reference dalam payment note jika tersedia. Note/nama sender mungkin berbeda pada mutasi bank karena payout menggunakan partner; cocokkan bank credit, nominal, tanggal, payee, transfer ID dan komunikasi invoice. Receipt client merupakan bantuan rekonsiliasi, bukan pengganti mutasi akun owner.
6. Buka bank account langsung dan pastikan dana telah credited/cleared. Catat invoice amount credited [EUR] terpisah dari net bank settlement [IDR] serta conversion reference/fee. Verifikasi memakai [PAYMENT-VERIFICATION](templates/PAYMENT-VERIFICATION.md).

## Langkah owner untuk alternatif PayPal

1. Daftar/aktifkan account Indonesia untuk penggunaan menjual jasa yang diperbolehkan; isi profil/identitas secara benar, selesaikan verifikasi yang diminta dan hubungkan rekening. PayPal memasarkan Business account untuk freelancer juga; ini tidak membuktikan approval account owner otomatis. [Account selection](https://www.paypal.com/id/webapps/mpp/account-selection).
2. Buat **draft** invoice DP 50% dengan supplier/client/project legal details, currency, deliverables, due date dan proposal version. Gunakan pembayaran commercial/invoice untuk jasa. Tautan diterbitkan hanya setelah akun dan instruksi verified; tidak memakai Friends & Family untuk menghindari fee.
3. Saat dibayar, lihat transaction langsung dalam account. Catat gross invoice, merchant fee, FX/net settlement dan status held/released. Uji bank withdrawal/route melalui provider confirmation atau transaksi jasa nyata yang sesuai aturan; tidak membuat transaksi fiktif/self-payment untuk memaksa verifikasi.
4. Tracker operasional memakai PENDING + catatan HELD selama dana belum cleared/available. Ini bukan aturan pengakuan pendapatan akuntansi/pajak. Setelah tersedia dan cocok, VERIFIED; jadwal produksi mengikuti cleared DP + materi lengkap yang tertulis. Biaya hosting/domain dapat dibayar client langsung dengan kesepakatan terpisah.

Fee standar commercial internasional untuk recipient Indonesia pada tabel PayPal yang diperiksa: **4,40% + fixed currency fee**; EUR fixed **€0,35**, USD **$0,30**. Contoh DP €195: merchant fee €8,93, tersisa €186,07 **sebelum** konversi/pencairan. Fee FX/payout bisa menambah biaya; angka final dilihat pada transaksi/account, bukan mengasumsikan net IDR dari rumus ini. WUUS memasukkan biaya provider dalam margin harga yang disepakati; jangan menambahkan surcharge mendadak setelah proposal. [PayPal ID fees](https://www.paypal.com/id/business/paypal-business-fees), diperiksa 8 Oktober 2026; tabel berlabel diperbarui 28 September 2026.

## Satu invoice, satu instruksi aktif

Sepakati metode sebelum menerbitkan invoice. Jika pindah metode, periksa belum ada transfer/pembayaran pending, tutup payment request lama bila tersedia dan kirim instruksi revisi yang jelas. Jangan memberikan dua link payable untuk DP yang sama. Simpan change/reference privat. Refund/dispute direkonsiliasi, tidak menghapus riwayat pembayaran.

Teks client untuk **Wise** (isi hanya setelah instruksi verified):

> You can pay this invoice using Wise to the Indonesian bank account stated on the invoice. Please set the recipient currency to IDR and the recipient amount to [agreed IDR amount], corresponding to [invoice amount/currency] under our agreed conversion quote valid until [date]. Review the transfer fee and estimated arrival time before confirming. Please include invoice [ID] as the reference where supported. We confirm receipt after the funds are credited to our bank account.

Teks client untuk **PayPal** (isi setelah link aktif verified):

> You can pay invoice [ID] using this verified PayPal invoice link: [link]. Available payment methods are shown at checkout. The deposit is [amount/currency]. Our production schedule starts after the deposit is cleared and all agreed materials are complete. If your payment is pending, please contact us before attempting another payment.

Pesan/template disiapkan lokal; tidak ada email, invoice live, account registration atau transaksi yang dibuat otomatis.
