---
name: "WUUS — seven concept website identities"
description: "Scoped extraction of implemented laundry, furniture and five studio concept themes."
colors:
  laundry-ink: "#172d4a"
  laundry-primary: "#174fc5"
  laundry-background: "#fbfcff"
  laundry-pale: "#edf3fc"
  laundry-muted: "#56657a"
  laundry-line: "#ccd8e8"
  kayu-background: "#f4f0e8"
  kayu-ink: "#292c25"
  kayu-muted: "#65685e"
  kayu-olive: "#777b59"
  titik-background: "#191a18"
  titik-ink: "#f2eadd"
  titik-muted: "#bfb8ac"
  titik-accent: "#d2a577"
  titik-accent-ink: "#241b12"
  titik-panel: "#232420"
  titik-line: "#41423b"
  putaran-background: "#eceeea"
  putaran-ink: "#232724"
  putaran-muted: "#59605b"
  putaran-accent: "#ff622a"
  putaran-accent-ink: "#211a16"
  putaran-panel: "#fff"
  putaran-line: "#cdd2c9"
  kelopak-background: "#f6f0e6"
  kelopak-ink: "#4d283d"
  kelopak-muted: "#76576a"
  kelopak-accent: "#663749"
  kelopak-accent-ink: "#fff7ed"
  kelopak-panel: "#fffaf3"
  kelopak-line: "#d8c6c7"
  langkah-background: "#f4f6ec"
  langkah-ink: "#123f3a"
  langkah-muted: "#49635d"
  langkah-accent: "#d5ed86"
  langkah-accent-ink: "#163d34"
  langkah-panel: "#fff"
  langkah-line: "#ced8ce"
  sela-background: "#f4f2f7"
  sela-ink: "#292833"
  sela-muted: "#62606c"
  sela-accent: "#d1bce9"
  sela-accent-ink: "#2d2439"
  sela-panel: "#fff"
  sela-line: "#d5d0dc"
typography:
  studio-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3.1rem, 6.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.01
    letterSpacing: "-.03em"
  studio-headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.8rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.03em"
  studio-body:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  laundry-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(52px, 5.1vw, 76px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.04em"
  kayu-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(64px, 6.7vw, 96px)"
    fontWeight: 400
    lineHeight: 1.015
    letterSpacing: "-.035em"
  titik-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3.1rem, 6.6vw, 6rem)"
    fontWeight: 450
    lineHeight: 1.01
    letterSpacing: "-.03em"
  putaran-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3rem, 5.8vw, 5.8rem)"
    fontWeight: 650
    lineHeight: 1.01
    letterSpacing: "-.03em"
  kelopak-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3.1rem, 5.7vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-.03em"
  langkah-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3.2rem, 5.6vw, 5.6rem)"
    fontWeight: 550
    lineHeight: 1.01
    letterSpacing: "-.03em"
  sela-display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(3.5rem, 6.7vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-.03em"
rounded:
  studio-control: "4px"
  studio-result: "8px"
  studio-card: "12px"
  studio-filter: "30px"
  laundry-control: "12px"
  laundry-panel: "20px"
  laundry-hero: "28px"
  kayu-control: "0"
spacing:
  studio-section: "100px 5%"
  studio-mobile-section: "65px 6%"
  studio-button: "17px 24px"
  laundry-button: "15px 22px"
  kayu-button: "18px 24px"
components:
  laundry-button:
    backgroundColor: "{colors.laundry-primary}"
    textColor: "#fff"
    rounded: "{rounded.laundry-control}"
    padding: "{spacing.laundry-button}"
  kayu-button:
    backgroundColor: "{colors.kayu-background}"
    textColor: "{colors.kayu-ink}"
    rounded: "{rounded.kayu-control}"
    padding: "{spacing.kayu-button}"
  titik-button:
    backgroundColor: "{colors.titik-accent}"
    textColor: "{colors.titik-accent-ink}"
    rounded: "{rounded.studio-control}"
    padding: "{spacing.studio-button}"
  putaran-button:
    backgroundColor: "{colors.putaran-accent}"
    textColor: "{colors.putaran-accent-ink}"
    rounded: "{rounded.studio-control}"
    padding: "{spacing.studio-button}"
  kelopak-button:
    backgroundColor: "{colors.kelopak-accent}"
    textColor: "{colors.kelopak-accent-ink}"
    rounded: "{rounded.studio-control}"
    padding: "{spacing.studio-button}"
  langkah-button:
    backgroundColor: "{colors.langkah-accent}"
    textColor: "{colors.langkah-accent-ink}"
    rounded: "{rounded.studio-control}"
    padding: "{spacing.studio-button}"
  sela-button:
    backgroundColor: "{colors.sela-accent}"
    textColor: "{colors.sela-accent-ink}"
    rounded: "{rounded.studio-control}"
    padding: "{spacing.studio-button}"
---

# Design System: WUUS concept expansion

## Overview

**Creative North Star: "Seven businesses, seven material worlds"**

These are seven scoped demonstration websites, each with its own palette, hero composition and working local selection flow. Shared local Satoshi and Outfit fonts connect the implementation; they do not make the concepts one interchangeable template. The modern, dimensional direction is established by photography, image framing, layered notes, selective shadows and contrasting section surfaces.

Scope is limited to `/contoh/bersih-laundry`, `/contoh/ruang-kayu`, `/contoh/titik-potong`, `/contoh/putaran-motor`, `/contoh/kelopak`, `/contoh/langkah-belajar` and `/contoh/sela-wear`. This document is not the WUUS marketing identity and does not govern Dapur Saji. Tokens describe the current source, not a new global theme API.

**Key Characteristics:**

- Distinct business palettes and hero geometry.
- Photographic depth supported by restrained material surfaces.
- Shared typography with theme-specific display weights and sizing.
- Local interactive plans and illustrative prices with honest demonstration labels.

Authority: `bersih-laundry.tsx/.module.css`, `ruang-kayu.tsx/.module.css`, `studio-examples.tsx/.module.css` under `components/concepts`; local font registration in `app/layout.tsx`. Context: `docs/CONCEPT-CURATION.md`, `docs/RUANG-KAYU-CONCEPT.md`, `docs/FIVE-CONCEPTS.md`. The curation document's earlier “Ruang Kayu queued” entry is historical; implemented source is the visual authority. This pass inspected source, not screenshots or computed browser styles. Release QA belongs to the coordinator.

## Colors

Frontmatter keys are prefixed by concept so no accent is mistaken for a shared WUUS token. Laundry maps its CSS blue to primary; furniture maps its olive separately; the five studio variants map their own accent, accent ink, foreground, background, panel, muted text and line colors directly.

| Identity | Primary and neutral roles | Additional implemented surface treatment |
| --- | --- | --- |
| Bersih Laundry | Cobalt actions, navy text, cool white background, pale blue sections | Hero base `#0d3895` with a radial `#2e6bd1` light field; estimate panel `#143b92`; hero action becomes white with `#163e9a` text |
| Ruang Kayu | Ivory canvas, charcoal olive text, olive identity detail | Story `#e6e1d5`, configurator `#fffdf7`; wood swatches Sungkai `#cfb48b`, Jati `#a67543`, Mahoni `#614537` |
| Titik Potong | Dark charcoal, warm ivory text, bronze actions | Story `#282922`; hero's final headline span `#e2b98e`; dark form color scheme |
| Putaran Motor | Light graphite canvas, dark ink, orange actions | Hero `#222724`; process `#252a26` with light text and local muted/line overrides |
| Kelopak | Cream canvas, plum text and actions | Floating note `#e6d5d0`; story `#eaddd7`; cart `#e9dcd8` |
| Langkah Belajar | Pale cream-green, deep teal text, lime actions | Course cards use panel, `#e7eddb`, then `#15463f` with light text |
| Sela Wear | Cool off-white, ink text, lilac actions | Story `#292833`; cart `#e4dcec`; additional product panels `#e7dcef` and `#e7e6ec` |

These additional colors are local component treatments, not a synthesized tonal scale. No invented palette ramps are prescribed.

**The Scoped Palette Rule.** Keep each concept's foreground, background, accent and section overrides together.

## Typography

Both shared font families are local variable WOFF2 assets loaded with `next/font/local` and `display: swap`. Components consume `--font-satoshi` and `--font-outfit`; no remote font loading is required. Satoshi supports body, labels, controls and supporting copy; Outfit supports display headings, brands and large prices. Ruang Kayu alone adds Georgia for emphasis through `em`.

Frontmatter display tokens describe desktop rules. The studio base display is overridden by each identity token. Studio hero paragraphs use the body token, max-width (430px); general paragraph measure is capped at (70ch). Studio section headlines use the shared headline token and titles are (1.65rem). Laundry hero body is (17px/1.7), max-width (37ch). Furniture hero body is (16px/1.7); section headings use (clamp(36px, 4.2vw, 60px)), weight (400), line-height (1.06).

Studio price figures use tabular numerals and Outfit, normally (28px/500), plan prices (43px/500) and totals (31px/500). Furniture dimension figures use (36px/400) with tabular numerals. Laundry total uses (clamp(35px, 3.8vw, 52px)/500), line-height (1.1). Do not assume the base body's computed font size from CSS inheritance; only explicitly declared text roles are tokenized here.

## Layout

| Scope | Desktop composition | Responsive behavior from source |
| --- | --- | --- |
| Laundry | Hero (.9fr/1.1fr), max (1440px), gap (30px), padding (65px 55px 75px); navigation and sections max (1320px); three quick links; services (.75fr/1.25fr); planner (1.12fr/.88fr) | At (1250px) gutters/padding tighten; (1000px) typography and planner proportions adjust. At (800px) hero, services, process, planner, tracking, story and FAQ stack; estimate moves above form and stops sticking; menu opens below (74px) nav. At (500px) form rows stack, options become vertical, nav CTA hides; hero heading becomes (54px), hero image minimum (330px). |
| Furniture | Hero margin (0 20px), height (calc(100svh - 155px)), min/max (680px/840px); three-column collection, gap (28px); two-column story and configurator; configurator (.85fr/1fr), gap (12%) | At (1000px) card photos reduce to (290px) and padding tightens. At (700px) hero fixed (690px), heading (63px), image focus (62% center); collection, story, configurator and FAQ stack. Header nav hides with header CTA retained; no hamburger is implemented. Product images become (350px). At (1600px) site caps at (1900px). |
| Five studio identities | Common section padding (100px 5%); process (.9fr/1.1fr); plan/cart (.8fr/1.2fr); FAQ (.9fr/1.1fr) | At (1050px) spacing and typography tighten. At (760px) main grids and forms stack, menu becomes an absolute dropdown, section gutters generally become (6%), fields become (16px). At (1600px) selected section gutters account for a (1440px) content width. |

Studio hero differences are structural: Titik Potong uses a full-image (760px) hero with a dark directional shade and a low note; Putaran Motor uses a (1fr/1fr), minimum (690px) split hero with an orange rotated stamp. Kelopak uses (1.05fr/1fr), an arched photo (570px) and an overlapping note. Langkah Belajar uses (1.1fr/1fr), a (470px) photo and a rotated lesson note. Sela Wear uses a full-image (760px) hero with a low oversized translucent wordmark.

At studio mobile breakpoint, Titik hero minimum is (670px), Putaran photo minimum (340px), Kelopak photo (390px), Langkah photo (340px), and Sela hero minimum (700px). Mobile crop for Titik/Sela moves to (65% center). Course cards and fashion catalog become one column; flower catalog photo and product list stack. Mobile cart rows wrap and retain separate quantity/remove controls.

## Elevation & Depth

Depth is selective, not applied to every content row. Laundry carries the strongest ambient and inset shadows, with a photo tilted (1.5deg) and overlapping ticket tilted (-2deg). Furniture keeps square photographic panels and lifts the light configurator. Titik and Sela rely mainly on photographic shades and alternating surfaces. Putaran's stamp, Kelopak's arched image/note, and Langkah's lesson note provide local elevation.

Actual shadow vocabulary, also indexed in the sidecar:

- Laundry hero: `0 18px 50px -30px #173d8d80`; photo: `0 20px 45px #061f6159`; ticket: `0 16px 35px #061f614d`.
- Furniture configurator: `0 18px 48px #45452b12`; wood swatches use inset `0 2px 4px #332b1620`.
- Putaran stamp: `0 14px 36px #0004`.
- Kelopak photo: `0 24px 45px #643c4a20`; note: `0 10px 24px #643c4a1c`.
- Langkah photo: `0 20px 50px #0f413322`; note: `0 15px 35px #1a493527`; course card: `0 12px 30px #1243320c`.
- Studio mobile navigation: `0 18px 30px #0002`.

No universal shadow scale is established by this source.

## Shapes

Laundry uses broadly rounded surfaces: hero radius token, photos (22px), ticket/quick links (16px), planner/estimate and care photo containers use the panel token. Its quantity control is (9px), tracking input (10px), tracking panel (18px).

Furniture preserves rectangular hero, product photos, buttons and fields. Circular material swatches are (32px); product action circles are (43px). Its filter pills use (30px). The furniture light/dark buttons have no radius declaration and render square under the site's current styling.

Studio primary buttons, add buttons, fields and slot buttons use the control token. Filter pills use the filter token. Results/empty states use the result token. Learning cards and flower catalog photo use the card token; learning story and hero photo use (14px). Kelopak hero arch is (46% 46% 12px 12px), changing to (45% 45% 9px 9px) on mobile. Service action circles are (52px), then (42px) on mobile; Putaran overrides the circle with (4px).

## Components

Buttons: studio actions use the scoped accent pair, minimum height (52px), weight (700), frontmatter padding; hover dims through `filter: brightness(.94)` and lifts (-2px). Laundry actions are minimum (50px), weight (600), with inset and short ambient shadow, darkening to `#123d9b` and lifting (-1px). Laundry hero/closing actions switch to light backgrounds. Furniture light action changes to `#e1d7c6` on hover and lifts (-2px); dark action uses charcoal/ivory.

Focus: laundry uses a (3px) amber outline `#e49b24`, offset (4px); furniture uses a (3px) `#a36c2d` outline, offset (5px), reducing to (3px) mobile; studio uses a dark `#202522` outline (3px), offset (3px), with a white (3px) inner ring. These are documented source states, not a contrast certification.

Filters and slots: use explicit pressed state. Studio selection inverts foreground/background and border; furniture selection uses charcoal background with ivory text. Slots use the rectangular control shape. Disabled studio/laundry controls have opacity (.5), furniture (.45), and a not-allowed cursor.

Forms and results: studio desktop forms are two-column with (23px 20px) gaps, fields minimum (48px), padding (13px 14px), and theme background/ink/line. Titik opts into dark native fields. Laundry separates planner and estimate; furniture combines material radio swatches, dimensions and quote inside the lifted square panel. Local summaries appear inline; studio results preserve line wrapping and use (23px) padding, then (18px) mobile. Empty carts offer a link back to selection. No modal or server confirmation is established.

Navigation: laundry alone uses a sticky header; studio/furniture headers remain in document flow. Laundry menu appears at (800px), studio at (760px); furniture hides the desktop navigation at (700px) without introducing a menu. Keep the “Contoh desain” provenance strip and route back to WUUS separate from business planning controls.

Motion: studio photos scale to (1.025) over (.8s) with `cubic-bezier(.16,1,.3,1)`; furniture product photos use (.55s) and variant-specific crops; laundry and furniture hero image entrance animations exist. Reduced-motion rules disable transitions/animations and scroll animation. Studio also cancels hover transforms for photos/actions; laundry/furniture reduced-motion source removes animation/transition but does not universally remove static hover transform declarations.

FAQ uses native details/summary. Studio chevrons rotate (180deg) when open with a (.2s) transition. Local copy summaries and input feedback retain explicit status text. No dialog, tooltip or toast design system should be inferred.

## Do's and Don'ts

### Do:

- **Do** keep each concept's foreground, background, accent and section overrides together.
- **Do** preserve theme-specific hero composition and photo crops when extending a concept.
- **Do** retain visible labels, pressed states, inline status, keyboard focus and reduced-motion behavior.
- **Do** present fictional products, prices and imagery as demonstration content and local plans as unsent.

### Don't:

- **Don't** apply these scoped tokens to the WUUS marketing identity or Dapur Saji.
- **Don't** flatten all seven identities into the same hero, card grid or shadow treatment.
- **Don't** invent customer proof, delivery success, live booking, payment or provider integration.
- **Don't** treat this source extraction as completed browser, accessibility or release QA.
