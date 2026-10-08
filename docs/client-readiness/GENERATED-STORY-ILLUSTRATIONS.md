# Ilustrasi cerita WUUS — 8 Oktober 2026

Mode: built-in imagegen. Dua ilustrasi baru dengan karakter fiktif dibuat dan diperiksa secara visual; bukan foto owner, tim WUUS atau klien nyata. Ilustrasi dekoratif dipasang sebagai CSS background pada area terpisah dari teks agar tidak mengganggu keterbacaan. Tidak ada nama pribadi atau logo baru di dalam gambar.

## Aset dan penempatan

| Aset | Lokasi final | Resolusi | Byte | Penempatan |
| --- | --- | --- | --- | --- |
| Proses desktop | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/process-collaboration-v1.webp` | 1200 × 800 | 101326 | How we work / Cara kerja |
| Proses mobile | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/process-collaboration-v1-mobile.webp` | 720 × 480 | 36674 | Proses pada lebar ≤640 px |
| Diskusi kebutuhan desktop | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/business-conversation-v1.webp` | 1200 × 800 | 73562 | Mulai dari kebutuhan Anda, halaman Indonesia |
| Diskusi kebutuhan mobile | `C:/Users/USER/OneDrive/Desktop/my-Project/WUUS/webuntukusaha/public/images/stories/business-conversation-v1-mobile.webp` | 720 × 480 | 28078 | Diskusi kebutuhan pada lebar ≤640 px |

Sumber PNG asli 1536 × 1024 disalin ke `.vercel/generated-story-sources/` pada workspace. Original di direktori Codex generated-images dipertahankan. Sharp yang sudah tersedia hanya dipakai untuk resize dan encoding WebP, tanpa upscale atau mengganti artwork. Tidak ada dependency baru.

Ilustrasi proses memperlihatkan review layout bersama, notebook, materi visual dan folder. Ilustrasi kebutuhan memperlihatkan pemilik usaha menjelaskan produknya kepada desainer. Keduanya merupakan cerita generik; komunikasi WUUS sebagai studio satu orang tidak diubah. Background dekoratif memakai `aria-hidden` dan `pointer-events: none`. Isi empat langkah, kontak email/WhatsApp, form, logo WUUS dan radius maksimal 16 px tetap dipertahankan.

## Prompt final — proses

```text
Use case: illustration-story.
Asset type: narrative background illustration for the "How we work / Cara kerja" section of WUUS, an independent one-person web studio. This artwork will sit BELOW the real heading and copy in the LEFT column of a two-column section; it will never contain readable copy.
Primary request: a refined realistic editorial illustration telling the story of a business owner and an independent web designer working together from a clear plan to a website handover.
Scene: two fictional adults sit across a small light-oak desk, discussing a laptop website layout. One points gently at the screen, the other holds an open notebook. A few neatly arranged physical page sketches, a room photograph contact sheet, and a simple folder on the desk suggest review, planning, revision and handover. Make it one believable quiet conversation, not four duplicated scenes.
Style: realistic hand-painted digital editorial illustration with natural human proportions, tactile gouache and fine pencil details, restrained painterly shading, carefully drawn hands and approachable faces. Clearly illustrated rather than a photograph. No cartoon blob people or plastic 3D characters.
Composition: landscape 3:2. Entire two-person scene occupies the central/lower 80 percent with generous breathing room. Keep all people, hands and laptop fully inside the frame. Minimal room context; the outer edges and upper background dissolve softly into pure white #ffffff, with no rectangular border. Gentle atmospheric shadow below desk.
Palette: warm ivory, WUUS navy #1c2e43 clothing and laptop accents, pale blue and restrained amber. Soft diffused daylight.
Constraints: fictional generic people, not likenesses of an actual founder or real client; no logos, branding, legible text, letters, numbers, watermarks, UI labels, floating app panels, icons, neon, purple, busy architecture or decorative particles. No embedded title. Opaque white background.
```

## Prompt final — kebutuhan usaha

```text
Use case: illustration-story.
Asset type: narrative background illustration for the Indonesian WUUS section "Mulai dari kebutuhan Anda". Actual heading, text and contact buttons will remain in a separate LEFT column; this illustration belongs in the RIGHT column.
Primary request: a refined realistic editorial illustration of a small-business owner explaining the needs of her business to an independent web designer, showing a friendly first conversation about a future website.
Scene: a fictional Indonesian woman who owns a small boutique shop sits at a pale wooden table with a fictional male independent designer. She gestures toward her product notebook and a small tasteful ceramic item from her business; he listens and lightly sketches a simple unlabeled page layout on paper beside a closed/slightly open laptop. A very faint simplified shop shelf silhouette in the background suggests her business, without creating a detailed room. Two people only; calm professional collaboration.
Style: realistic hand-painted digital editorial illustration with natural human proportions, tactile gouache and fine pencil details, restrained painterly shading, carefully drawn hands and approachable faces. Clearly illustrated rather than a photograph. Match an elegant navy/ivory web studio; no cartoon blob people or plastic 3D characters.
Composition: landscape 3:2, self-contained scene occupying central/lower 80 percent, all people and objects fully visible within frame, generous breathing room. The outer edges dissolve softly into uniform pale blue #e9f0f7, no frame or rectangular image border. Soft daylight and low contrast background.
Palette: pale blue #e9f0f7 background, navy #1c2e43 accents, warm ivory, pale oak and small restrained amber details.
Constraints: generic fictional characters, no resemblance to a real owner, no company logos, legible text, letters, numbers, watermarks, embedded section headings, floating UI/app panels, neon, purple, busy scene or particles. Opaque pale-blue background.
```
