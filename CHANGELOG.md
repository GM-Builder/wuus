# Changelog

All notable changes to the WUUS (Web Untuk Usaha) project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
