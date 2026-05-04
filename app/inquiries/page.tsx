"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function InquiriesPage() {
  const [formData, setFormData] = useState({
    nama: "",
    namaBisnis: "",
    jenisBisnis: "",
    kebutuhan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nama, namaBisnis, jenisBisnis, kebutuhan } = formData;
    
    const text = `Halo tim WUUS,\n\nSaya ingin meminta estimasi proyek untuk website bisnis saya. Berikut adalah detailnya:\n\n*Nama:* ${nama}\n*Nama Bisnis:* ${namaBisnis}\n*Jenis Bisnis:* ${jenisBisnis}\n*Kebutuhan Web:* ${kebutuhan}\n\nMohon informasi lebih lanjut mengenai proposal dan estimasi biayanya. Terima kasih!`;
    
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/6281383521750?text=${encodedText}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <main className="flex min-h-screen flex-col w-full bg-off-white">
      <Navbar />
      
      <section className="relative pt-36 pb-24 flex-grow flex items-center justify-center px-4 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(28,39,51,0.05)] border border-gray-100"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-5xl font-black text-primary-navy tracking-tight mb-4">
                Dapatkan <span className="text-accent-orange">Estimasi</span> Proyek
              </h1>
              <p className="text-gray-500 text-lg">
                Ceritakan kebutuhan website bisnis Anda, dan kami akan membuatkan proposal penawaran teknis beserta estimasi biayanya secara gratis.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nama" className="block text-sm font-bold text-primary-navy">Nama Lengkap</label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    required
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-primary-navy"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="namaBisnis" className="block text-sm font-bold text-primary-navy">Nama Bisnis</label>
                  <input
                    type="text"
                    id="namaBisnis"
                    name="namaBisnis"
                    required
                    value={formData.namaBisnis}
                    onChange={handleChange}
                    placeholder="Contoh: PT. Maju Bersama"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-primary-navy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="jenisBisnis" className="block text-sm font-bold text-primary-navy">Jenis Bisnis / Industri</label>
                <input
                  type="text"
                  id="jenisBisnis"
                  name="jenisBisnis"
                  required
                  value={formData.jenisBisnis}
                  onChange={handleChange}
                  placeholder="Contoh: F&B, Retail, Jasa Konstruksi, dll."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-primary-navy"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="kebutuhan" className="block text-sm font-bold text-primary-navy">Kebutuhan Website</label>
                <textarea
                  id="kebutuhan"
                  name="kebutuhan"
                  required
                  rows={6}
                  value={formData.kebutuhan}
                  onChange={handleChange}
                  placeholder="Ceritakan detail website yang Anda inginkan. Misalnya: Saya butuh website company profile 5 halaman, desain minimalis elegan, ada fitur galeri, form kontak, dan terintegrasi WhatsApp."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 outline-none transition-all text-primary-navy resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-accent-orange hover:bg-accent-yellow text-primary-navy font-black text-lg tracking-wide transition-all shadow-[6px_6px_0px_0px_#1C2733] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1C2733] border-2 border-primary-navy uppercase rounded-sm cursor-pointer"
                >
                  Kirim & Dapatkan Estimasi (via WhatsApp)
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
