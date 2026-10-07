# WUUS Hospitality Starter — independent client website

This is a standalone static website, with no dependencies or connection to the WUUS lead database. Each generated project has its own Git repository, content, build output, hosting project, preview and domain. Node 22+ is needed locally to build; the host serves only `dist/`.

1. Edit `property.json`. Components live in `build.mjs`; styles in `site.css`; inquiry draft preparation in `inquiry.js`. Six sections combine identity/story, rooms, gallery, amenities, location/FAQ and inquiry/booking link.
2. Add client-approved images to `assets/`. Record asset licences/permissions privately. Existing WUUS sample pictures are illustrative concepts for simulation only; do not use them as real property photographs.
3. Run `npm run build`, then `npm run preview`. Default preview is localhost:4173. Set a different PORT for a second simultaneous project.
4. The inquiry prepares a draft in the guest's email or WhatsApp app. The guest must send it. No server form, guest payment, room inventory, live availability or booking engine is included. Link to the client's existing booking URL, or leave `bookingUrl` empty. SMTP/server forms require separate scope and per-client credentials/database.
5. WUUS edits content under the agreed scope. There is no CMS. Give the client `property.json` plus this guide if source editing is part of handover; self-service CMS is separately quoted.
6. Before launch, replace every placeholder; set `simulation:false`, real HTTPS `siteUrl`, contacts and booking/map destinations; record written approval in `approval`. Run `npm run build:production`. That command rejects fictional projects and missing approvals. Preview builds use `noindex` and do not claim the client's canonical URL. Production builds include canonical, robots and sitemap.

Create one separate hosting project per client, with its own repository remote, preview and production settings. Never point two clients at one build directory/project. Use a host whose current terms allow commercial use. Vercel Hobby is unsuitable for commercial websites. A static host can serve this template without paid server compute; verify its current terms, quotas, custom-domain support and owner access before choosing it. No host is provisioned automatically.

Before source handover: final written preview approval, verified balance payment, mobile/desktop/link/inquiry QA, domain/HTTPS, backup restore test, cost/renewal owner and support dates. Copy `docs/client-readiness/templates/` from the WUUS source for operational forms, kept privately for real clients.

For rollback, save a Git release tag and a source archive before publishing. Restore the tag in a separate checkout, build again and deploy to a new preview before promoting. Never store account passwords, payment evidence or private client correspondence in this repository. Disable/delete old preview deployments when they are no longer needed.
