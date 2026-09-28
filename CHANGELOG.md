# Changelog

All notable changes to the WUUS (Web Untuk Usaha) project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.5] - 2026-09-28

### Changed
- **Sweet-Spot Pricing Calibration & Staging-First Quality Guarantee (`/hospitality#pricing`)**:
  - Calibrated investment pricing to eliminate upfront friction for independent Western Balkan boutique stays:
    - **Tier 1: Boutique Direct Showcase**: Pressed to **€690 flat** (from €1,450), delivering bespoke Next.js architecture, sub-800ms speed, and 0% OTA commission direct flow.
    - **Tier 2: The Complete AI Hospitality Engine**: Pressed to **€1,290 flat** (from €2,450), delivering full digital flagship + 24/7 Multilingual AI Concierge in 20+ languages + WhatsApp lead hand-off + 6 months hosting included.
  - Added **Staging-First Quality Guarantee**: WUUS builds the interactive site and tests the live AI Concierge on a private staging link first, allowing hoteliers to verify mobile speed and quality before final payment.
  - Updated value comparison: entire investment breaks even in less than 2 weeks of direct bookings (approx. 4–5 room nights).
  - Synchronized package dropdowns in main form & modal, and updated `docs/outreach/reply-library.md`.
  - Bumped version to `0.2.5`.

## [0.2.4] - 2026-09-28

### Added
- **24/7 Multilingual AI Guest Concierge Showcase (`/hospitality#ai-concierge`)**:
  - Implemented interactive live simulation on the international hospitality page allowing hoteliers to test real European guest inquiries (German, Italian, English, French).
  - Grounded RAG architecture with strict citation guardrails (zero hallucinations, never invents unauthorized rates or policies).
  - Instant response simulation (<2s latency) and 1-tap automated WhatsApp booking lead hand-off with pre-filled guest details.
  - 4 core architectural pillars: 20+ Native European Languages, Zero Hallucinations, Direct Rate Defense against OTAs, and Zero Host Bottleneck (100% turnkey managed by WUUS).
- **Two-Tier Investment Architecture (`/hospitality#pricing`)**:
  - **Tier 1: Boutique Direct Showcase (€1,450)**: Bespoke Next.js digital flagship, sub-800ms performance, 0% OTA commission engine, full code ownership.
  - **Tier 2: The Complete AI Hospitality Engine (€2,450)**: Everything in Tier 1 + 24/7 Multilingual AI Concierge, verified property handbook setup, and 6 months concierge hosting & fine-tuning included.
  - Added package interest selector to the inquiry form & review modal with dynamic contextual actions and automatic Supabase lead recording.
- **Client Acquisition & Outreach Engine Updates**:
  - Added Option B (AI Concierge & Direct Inquiry Hook) to Wave 1 cold email sequences in `docs/outreach/campaigns/batch-01-top-5-emails.md`.
  - Added AI Concierge objection handling and RAG grounding scripts to `docs/outreach/reply-library.md`.
  - Bumped version to `0.2.4`.

## [0.2.3] - 2026-09-28

### Added
- **Studio Admin & Client Maintenance CRM (`/admin/inquiries`)**:
  - Implemented PIN-protected client relationship management dashboard (`/admin/inquiries`).
  - Added live synchronization with Supabase table `hospitality_inquiries`.
  - Added pipeline metrics (Total Inquiries, New Leads, Reviews Sent, Client Won).
  - Added real-time status management (`new`, `audit_prepared`, `review_sent`, `won`, `archived`).
  - Added 1-click action buttons: Direct Website Inspector, Open in Zoho Mail, Send WhatsApp Message, and Copy Pre-filled 1-Page Review Delivery Script.
  - Added detailed Client Dossier modal view for inspecting hotelier notes and contact info.
  - Added automatic fallback with copyable SQL table schema setup if Supabase table is not yet created.
  - Bumped version to `0.2.3`.

## [0.2.2] - 2026-09-27

### Fixed
- **Hospitality Storytelling UI Localization (`/hospitality`)**:
  - Eliminated legacy Indonesian image assets (`step1-storytelling.png` and `step2-storytelling.png` containing *"Momen Kritis Pertama"* and *"Kabur ke Kompetitor"*).
  - Implemented bespoke, interactive English UI simulations:
    - **Step 01 (The Heavy Loading Wall)**: Browser performance simulation with 8.4s LCP indicator, 12.8MB uncompressed image payload alert, pulsing progress bar, and 82% mobile drop-off metric.
    - **Step 02 (The Clunky Booking Widget)**: Mobile iframe popup error simulation showing broken datepicker on iOS, lost direct booking alert, and -18% OTA commission leak.
    - **Step 03 (The Calm Direct Alternative)**: Live visual showcase with sub-800ms paint badge and 0% OTA fee guarantee.
  - Bumped version to `0.2.2`.

## [0.2.1] - 2026-09-27

### Changed
- **Visual Identity Alignment for Hospitality (`/hospitality`)**:
  - Completely aligned `/hospitality` with the primary Indonesian brand design system (`bg-light-grey`, `bg-off-white`, `text-primary-navy`, `bg-accent-orange`).
  - Swapped generic placeholders with official brand assets (`/logo.png`, `/Hero1.png`, `/Hero2.png`, and `/wuus-bg-navy.jpg`).
  - Integrated real portfolio mockups (`/Savoria-mockup.png`, `/trust-mockup.png`, `/kain-nusantara-mockup.png`, `/urbanThreads-mockup.png`, and `/dressy-rent-mockup.png`).
  - Added signature neo-brutalist studio aesthetics: sharp contrast action buttons (`shadow-[4px_4px_0px_0px_#1C2733]`), brush edge section transitions (`.brush-edge-bottom`), dark contrast storytelling block (`#020617`), and studio office map embed.
  - Replaced generic AI template vibes with human studio craftsmanship, transparent pricing (€1,450+), and bespoke async workflow communication.
  - Bumped version to `0.2.1`.

## [0.2.0] - 2026-09-27

### Added
- **International Hospitality Acquisition Engine (`/hospitality`)**:
  - Implemented modern Next.js 16 (Turbopack) landing page tailored for independent boutique hotels in the Adriatic & Western Balkans.
  - Added dedicated design system tokens: Aegean Navy (`#1C2733`), Adriatic Blue (`#1B4965`), Terracotta Gold (`#D4A373`), and warm background neutrals (`#F7F5F0`).
  - Added ADRA concept case study showcase highlighting visual room discovery, mobile navigation integrity, and direct reservation pathways.
  - Implemented interactive Review Request modal with structured direct inquiry form.
  - Added full international SEO metadata, OpenGraph tags, JSON-LD structured schema, and responsive mobile-first typography.
- **Client Acquisition & Market Intelligence System (`docs/outreach/`)**:
  - Established Ideal Customer Profile (ICP) for independent heritage hotels, small luxury stays, and family-owned hospitality businesses.
  - Created master Outreach Playbook (`outreach-playbook.md`) with permission-first cold outreach frameworks.
  - Added comprehensive Objection Handling & Reply Library (`reply-library.md`).
  - Developed Proposal Structure (`proposal-structure.md`) and 1-Page Internal Audit Templates (`audit-template.md`).
- **Western Balkans Market Prospecting Database (`outreach/prospects.csv`)**:
  - Researched, inspected, and verified 15 boutique hotel properties across Albania (AL-01–05), Bosnia & Herzegovina (BA-01–05), and North Macedonia (MK-01–05).
  - Documented 18+ disqualified properties with factual market signals in the Rejected Candidates pool.
  - Completed in-depth internal audits with objective DOM and technical observations in `docs/outreach/audits/`.
- **Top 5 Batch 01 Outreach Sequences (`docs/outreach/campaigns/batch-01-top-5-emails.md`)**:
  - Authored personalized, permission-first cold email sequences for Muslibegovic House (Mostar), City Boutique Hotel (Sarajevo), Vila & Winery Mal Sveti Kliment (Ohrid), Hotel Senigallia (Skopje), and Padam Boutique Hotel & Villa (Tirana).
  - Added structured Follow-up 1 and Follow-up 2 sequences adhering to strict non-salesy, respectful tone.

### Changed
- Refactored `components/back-to-top.tsx` z-index and spacing for improved mobile usability.
- Adjusted floating AI builder button positioning in `app/layout.tsx`.
- Updated tracking fields and operational statuses in `outreach/prospects.csv`.
- Bumped application version to `0.2.0` in `package.json`.

---

## [0.1.0] - 2026-09-22

### Added
- Initial release of WUUS (Web Untuk Usaha) core Indonesian digital agency platform.
- Hero, service offerings, and local business onboarding components.
- Supabase integration and basic inquiry submission flows.
- Performance optimization with Next.js Turbopack and TailwindCSS.
