# Foto profesional WUUS — 8 Oktober 2026

Mode: built-in imagegen. Dua foto bergaya fotografi komersial dibuat untuk menggantikan ilustrasi cat air pada section proses Inggris/Indonesia dan kebutuhan usaha Indonesia. Adegan dan model fiktif; tidak dipresentasikan sebagai foto owner atau klien nyata. Caption singkat AI-generated ditampilkan di kedua bahasa.

## File final dan resolusi

| Aset | Lokasi final | Resolusi | Byte |
| --- | --- | --- | --- |
| Proses desktop | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/process-consultation-v2.webp` | 1920 × 1080 | 189434 |
| Proses mobile | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/process-consultation-v2-mobile.webp` | 960 × 540 | 59432 |
| Kebutuhan desktop | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/business-consultation-v2.webp` | 1920 × 1080 | 166882 |
| Kebutuhan mobile | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/business-consultation-v2-mobile.webp` | 960 × 540 | 54742 |

Prompt meminta native 2048 × 1152 atau minimal Full HD, tetapi hasil generator aktual adalah 1672 × 941. File desktop diekspor ke 1920 × 1080 menggunakan resize Lanczos3 ringan sekitar 1.148 kali. **Full HD merupakan ukuran file akhir, bukan resolusi native sumber; resize tidak menambah detail foto baru.** Versi mobile diperkecil dari sumber. PNG sumber disalin ke `.vercel/generated-photo-sources/`, dan original Codex dipertahankan. Sharp yang sudah tersedia digunakan untuk packaging WebP; tidak menambah dependency.

## Tampilan dan invariant

- Foto penuh 16:9 dengan konteks ruang kerja, detail manusia alami dan pakaian smart casual/business. Tidak memakai efek watercolor, tepian cutout atau mask cat air.
- Foto berada di area terpisah dari teks dan CTA; radius 16 px dan shadow halus. Mobile memakai aset 960 × 540 pada lebar ≤640 px.
- Model menggambarkan freelancer dan pemilik bisnis; logo WUUS, isi empat langkah, harga, kontak, form, admin, API dan database tetap dipertahankan.
- Aset ilustrasi v1 disimpan sebagai riwayat; halaman aktif memakai foto v2.

## Prompt final — proses

```text
Use case: photorealistic-natural.
Asset type: professional photographic website background for WUUS "How we work / Cara kerja". REPLACE the previous watercolor aesthetic with a genuine-looking commercial editorial photograph.
Generate native high resolution 2048x1152 landscape, 16:9, at least Full HD 1920x1080 detail. This is a complete rectangular photo with real environmental context, no painted or fading cutout edges.
Scene: an independent male freelance web designer aged early 30s in a crisp smart-casual navy shirt and a male business owner aged early 40s in a well-fitted charcoal blazer over a white open-collar shirt, seated together at a light oak desk in a tasteful modern private coworking meeting room. The freelancer reviews a laptop with the businessman; the laptop shows a generic hotel website with image blocks and no readable text. A small neat notebook, pen and a few printed website layout sheets make the scope and review process tangible. Exactly two fictional people. The businessman listens thoughtfully while the freelancer indicates one printed page on the desk with a relaxed natural hand. Do not hide faces behind the screen.
Style: REALISTIC COMMERCIAL PHOTOGRAPHY, camera photograph, shot on a full-frame professional camera with a 50mm lens at f/4. Physically plausible natural skin pores, individual hair, lifelike eye detail, realistic hands with correct anatomy, natural fabric weave and real wood grain. Contemporary professional freelance consulting, sophisticated and approachable.
Composition: medium-wide candid side-angle at seated eye level, people and laptop all within the central 80 percent, ample breathing room, faces in sharp focus, softly blurred background. Real office windows, warm neutral wall, subtle blue-gray accents. Restrained navy, cream and wood color palette. Soft window daylight, balanced photographic highlights, neutral natural color grading.
Constraints: fictional non-identifiable models, no actual founder or customer likeness, no brands/logos/watermarks/legible text, no dramatic handshake, no cheesy thumbs-up or posing at camera, no extra people.
ABSOLUTELY NO illustration, watercolor, gouache, painting, pencil marks, brush strokes, cartoons, CGI, 3D render, plastic skin, airbrushed faces, collage, white studio cutout or transparent background. Full photographic realism.
```

## Prompt final — kebutuhan

```text
Use case: photorealistic-natural.
Asset type: professional photographic website background for the Indonesian WUUS "Mulai dari kebutuhan Anda" section. Replace the previous illustration with a genuine-looking commercial editorial photograph of a freelancer and businessman.
Generate native high resolution 2048x1152 landscape, 16:9, at least Full HD 1920x1080 detail. Complete rectangular photo, real scene extending to every edge, no fading painted cutout.
Scene: a professional Indonesian male small-business owner aged late 30s wearing a tailored light charcoal blazer and white open-collar shirt explains his business goals to an independent male freelance web designer aged late 20s wearing a neat navy overshirt over a plain cream T-shirt. Two fictional men sit at a wooden table in the business owner's bright, tasteful small showroom/office with understated shelves behind them. The owner gently gestures toward a product catalog on the table, the freelancer listens and writes a note in a notebook; an open unbranded laptop rests to one side with a simple blurred generic webpage. Thoughtful, calm first consultation about a website, equal professional partnership.
Style: REALISTIC PROFESSIONAL COMMERCIAL PHOTOGRAPHY, shot on a full-frame camera, 50mm lens at f/4, authentic skin texture and pores, individual hair, lifelike eyes, anatomical natural hands, realistic fabric and materials. Realistic Southeast Asian faces without resembling a real identifiable founder.
Composition: medium-wide candid eye-level shot, faces and hands clearly visible and in sharp focus, all key objects and people inside central 80 percent, tasteful depth of field with softly blurred showroom background. Soft daylight from a large side window, balanced exposure. WUUS-compatible palette: navy, ivory, pale blue-gray and light wood. Clean natural professional color grade.
Constraints: exactly two people, fictional generic models, no company logos or readable branding, no watermark or legible text, no handshake or thumbs-up, no posing directly at camera, no duplicated people or extra limbs.
ABSOLUTELY NO watercolor, gouache, illustration, painting, pencil marks, brush strokes, cartoon, CGI, 3D rendering, plastic or airbrushed skin, cutout or transparent background. Full photographic realism.
```
