# Hospitality booking concept

Owner-approved scope, 8 October 2026: upgrade the three property demos into convincing hospitality websites with a complete frontend booking journey. No backend, real inventory, reservation, guest email, card capture or payment processing.

## Product purpose

Help prospective WUUS clients experience the design and booking journey their property could have. This is a demonstration of a possible deliverable, not an OTA marketplace or a live booking engine. An actual engine integration must be scoped separately before a client launch.

Routes: `/hospitality/demo/seaside-guesthouse`, `/hospitality/demo/lakeside-wine-estate`, `/hospitality/demo/city-apartments`. Indonesian and English marketing previews link to the same property concepts, which currently use English guest-facing copy.

## Visual direction

- Coastal: ivory, deep teal, natural stone and sea; editorial serif headings.
- Winery: cream, forest green, timber and warm stone; heritage typography.
- Urban: cool neutrals, slate, brick and walnut; cleaner sans-serif headings.
- Original WUUS logo in the demo toolbar; room-first photography, clear typographic hierarchy, borders and restrained gloss. Maximum corner radius 16px.
- Eleven new AI-generated photographs: property terraces, six room types, coastal breakfast, cellar and city lounge. These depict fictional properties. Local WebP assets replace remote image dependencies in these demos. Marketing previews also use the new photography.
- Fictional-property notice, generated-photo disclosure, demonstration reviews and simulated checkout remain clear. No fabricated OTA savings or scarcity claims.

## Implemented experience

1. Property navigation, mobile section navigation, saved-stay toggle for the current visit, EUR/USD/GBP display conversion.
2. Interactive property/room galleries, numbered thumbnails, next/previous controls and room-detail dialogs.
3. Date inputs plus a two-month calendar. Check-in must be today or later, checkout later than check-in, maximum 30 nights. Sample dates are generated on interaction rather than fixed into the build.
4. Adults, children with ages, room count. Capacity and example inventory constrain room results; at least one adult per room. The example assumes rooms of the selected type and sufficient capacity in each room; it does not allocate unrelated room types to a group.
5. Breakfast/flexible-rate filters, price/space sorting, empty results and reset. All current rate plans are flexible, so the flexible filter retains them.
6. Applied search is separate from edits. Date/guest changes must be applied before selecting a rate, preventing checkout with stale search choices.
7. Room selection with different meal plans and full-stay totals. Quote = room rate × nights × rooms, less an optional room-only discount, plus extras and illustrative 10% tax.
8. Guest details → extras/payment preference → review → local simulated confirmation. Required fields and demo acknowledgment prevent premature confirmation. Payment preference uses either pay-at-property or a preset sample card; no real card details can be entered.
9. Optional breakfast (€13/adult and €7/child/night on room-only plans), one-way transfer (€35 per booking), late checkout (€25/room). STAY10 reduces rooms by 10%; included breakfast is never charged again.
10. Transparent quote throughout checkout, compact mobile total with price-details link, edit/back controls, reference number and downloadable text voucher clearly marked as a sample.
11. Facilities, nearby recommendations with interactive descriptions, sample reviews, FAQ and a locally scripted stay assistant.

## Technical scope

Property content stays in `app/hospitality/demo/[slug]/demo-data.ts`. Shared `components/hospitality` contains pricing/validation, native modal dialog, date calendar, checkout and scoped styles. No new dependencies are required. Prices use integer cents, UTC date-only arithmetic and fixed illustrative currency rates (EUR 1, USD 1.1, GBP 0.85).

Guest fields live only in React state, discarded when closing checkout/reloading. Booking code contains no API call, server action, storage write, messaging link or external booking submission. Existing marketing inquiry APIs are outside this change.

Native dialogs provide a modal boundary, keyboard navigation and Escape dismissal. Opening controls are focused before activation and restored on close; the dialog heading receives focus when a checkout stage changes. Body scrolling is restored. Reduced-motion preference disables transitions; all interactive controls have keyboard focus treatment.

## Acceptance and verification

- Each property renders with distinct colors and complete room content; photographs load locally.
- Empty, reversed, impossible, past and overlong date ranges cannot open a booking.
- Capacity/inventory filters produce an honest empty state. Two-room price doubles correctly; child breakfast follows guest count.
- Rate filters/sorting/currency/gallery/room details/nearby recommendations/save/assistant respond to interaction.
- Mandatory guest details and simulation acknowledgment are enforced. Promo and extras reconcile across review, confirmation and sample voucher.
- Desktop, tablet and 360px mobile have no horizontal document or modal overflow. Maximum card/button radius remains 16px.
- Build, TypeScript and relevant ESLint checks pass. Booking model tests cover date boundaries, capacity, multiroom pricing, discount/extras and conversion; existing test suite remains passing.
- No live backend booking, payment, message or inquiry is triggered by testing this concept.

Evidence is recorded in `qa/hospitality-booking-concept-20261008.json` and accompanying screenshots. Generated asset paths and the complete prompts are in [HOSPITALITY-MEDIA-PROMPTS.json](HOSPITALITY-MEDIA-PROMPTS.json); all generation used the built-in image_gen tool. Outputs are about 1672×940–941px; they are not native 4K.

## Reference principles

The design uses familiar room selection, facilities, price summary and booking progression patterns while preserving independent property branding. Primary reference material: [Booking.com accommodation journey](https://help.business.booking.com/hc/en-us/articles/28518928349204-Make-an-accommodation-booking), [Traveloka hotel experience](https://www.traveloka.com/en-sg/hotel), [Traveloka room facilities](https://www.traveloka.com/en-sg/help/hotel/accommodation-booking/booking/hotel-information/hotel-facilities), and [Agoda payment options](https://www.agoda.com/info/how-do-i-pay-for-my-booking.html). The scope does not claim parity with these companies’ search inventories, payments, support or reservation systems.

## Client launch boundary

Replace concept photography/content/reviews with approved client material. Confirm actual house rules, taxes, rate inclusions, capacity and policies. Connect the client’s existing booking engine or separately approved backend, availability and payment services. The current booking demo must never be represented as a functioning reservation system.
