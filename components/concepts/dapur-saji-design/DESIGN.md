---
name: Dapur Saji — scoped concept
description: Observed design system for the fictional Dapur Saji catering example at /contoh/dapur-saji.
colors:
  deep-olive: "#23352b"
  warm-ivory: "#f7f3e9"
  terracotta: "#bf4d29"
  muted: "#5d665d"
  line: "#d6d9ce"
  strip: "#e6e8db"
  sage-surface: "#e9ecdf"
  primary-hover: "#384e3e"
  filter-hover: "#e5e9db"
  control-border: "#818d7b"
  field-border: "#7b8974"
  field-surface: "#fffefa"
  field-placeholder: "#66705f"
  image-placeholder: "#e6e3d6"
  step-line: "#9da68d"
  faq-line: "#bfc6b8"
  ribbon-dot: "#bdcc90"
  selection: "#d8e3b1"
  order-icon: "#cbdb9e"
  order-copy: "#d3d8ce"
  disclosure-line: "#66755f"
  disclosure-label: "#d7e6a6"
  disclosure-copy: "#c5cfbf"
  white: "#ffffff"
  header: "#f7f3e9f5"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(52px, 5.3vw, 80px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.04em"
  display-accent:
    fontFamily: "Georgia, serif"
    fontWeight: 400
  headline:
    fontFamily: "Outfit, sans-serif"
    fontSize: "clamp(34px, 3.4vw, 50px)"
    fontWeight: 450
    lineHeight: 1.12
    letterSpacing: "-.035em"
  menu-title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "23px"
    fontWeight: 500
    lineHeight: 1.2
  form-title:
    fontFamily: "Outfit, sans-serif"
    fontSize: "26px"
    fontWeight: 450
    lineHeight: 1.2
  body:
    fontFamily: "Satoshi, sans-serif"
    lineHeight: 1.6
  hero-body:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "17px"
  button:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "14px"
    fontWeight: 550
  label:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "12px"
    fontWeight: 550
rounded:
  field: "6px"
  control: "8px"
  mobile-cart: "10px"
  panel: "12px"
  category-badge: "20px"
  filter: "30px"
  circle: "50%"
spacing:
  field-padding: "12px"
  primary-padding: "15px 23px"
  filter-padding: "10px 18px"
  grid-gap: "24px"
  section-desktop: "100px 40px"
  section-mobile: "65px 24px"
  form-desktop: "35px"
  form-mobile: "25px"
components:
  button-primary:
    backgroundColor: "{colors.deep-olive}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "{spacing.primary-padding}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.deep-olive}"
    rounded: "{rounded.filter}"
    padding: "{spacing.filter-padding}"
  filter-selected:
    backgroundColor: "{colors.deep-olive}"
    textColor: "{colors.white}"
  field:
    backgroundColor: "{colors.field-surface}"
    textColor: "{colors.deep-olive}"
    rounded: "{rounded.field}"
    padding: "{spacing.field-padding}"
  order-panel:
    backgroundColor: "{colors.warm-ivory}"
    textColor: "{colors.deep-olive}"
    rounded: "{rounded.panel}"
    padding: "{spacing.form-desktop}"
---

# Design System: Dapur Saji

## Overview

This is a scoped, descriptive record of the implemented Dapur Saji concept, not the global WUUS identity. Authority: `../dapur-saji.tsx`, `../dapur-saji.module.css`, `../../../docs/CONCEPT-CURATION.md`, and the desktop/mobile hero and full-page captures under `outputs/dapur-saji/`, inspected 17 October 2026. The captures show a selected menu and generated local summary; these are interaction states, not default content.

The confirmed direction is warm editorial food imagery, large type and generous space, with ivory, deep olive and terracotta. An asymmetric hero leads into the catalogue. The visual language alternates open catalogue rows, pale sage story sections, and a deep olive order section containing a light form. No additional creative metaphor or new brand doctrine is asserted here.

The public label is **Contoh desain**. Dapur Saji, its food and prices are illustrative; the UI creates a local summary and accepts no payments or order transmission. Food imagery is AI-generated and disclosed in the footer. This document does not certify completion, accessibility compliance or production readiness.

## Colors

Deep olive is the text, button, navigation emblem, ribbon and order-section color. Warm ivory is the page, note and form surface. Terracotta marks the italic hero phrase, small menu tags, step numbers, story/closing icons and keyboard focus. Muted green-gray supports descriptions; the line token separates sections and totals.

The remaining frontmatter colors are observed contextual values, not a generated tonal ramp: sage surfaces for story/closing; a pale design strip; independent control, field, FAQ and step borders; light order copy and disclosure accents. White is used for primary-button text and selected filters. The sticky header uses translucent ivory `#f7f3e9f5` without a blur effect.

## Typography

Satoshi and Outfit are the existing local project fonts, exposed through `--font-satoshi` and `--font-outfit`. Satoshi carries body copy, controls, labels and navigation; Outfit carries headings, the wordmark and photo note. Georgia is an italic accent only on the hero's `<em>` phrase; its inherited display size and leading remain intact.

The hero display clamp becomes `60px` at widths up to `800px` and `53px` up to `500px`. Section headings retain their clamp. Menu and process titles use `23px`; form titles use `26px`. The wordmark is `28px` with `-.04em` tracking, weight `650` for Dapur and `350` for Saji; below `1100px` it is `24px`. Hero description is `17px`, max `37ch`; section/story text is `15px`; catalogue descriptions are `13px/1.7`; auxiliary information is `11–12px`. Body size is not independently set by `.site`; do not invent a new base-size token. Numeric quantity outputs and order totals use tabular figures.

## Layout

Desktop navigation, content sections and footer use `max-width:1320px`; navigation has `40px` horizontal padding and `88px` minimum height. Main sections use `100px 40px`. The hero is capped at `1500px`, uses `.9fr 1.1fr`, and has `670px` minimum height. Its copy padding is `78px 45px 50px max(40px, calc((100vw - 1240px)/2))`; image has `580px` minimum height and cover cropping. Hero actions wrap with `20px` gap. Heading/intro rows use a `55px` gap.

Catalogue: four equal columns and `24px` gaps. Story: two equal columns; image minimum height `590px`, text padding `65px clamp(32px,6vw,100px)`. Steps: three columns and `50px` gap. Order: `.75fr 1.25fr`, `80px` gap, `85px max(40px, calc((100vw - 1240px)/2))` padding. FAQ: `.8fr 1.2fr` and `80px` gap. Fields begin as two columns separated by `20px`.

- At `max-width:1100px`: navigation side padding `24px`; hero copy `60px 30px`; hero/image minimum height `600px`; catalogue becomes two columns with `40px 24px` gaps; order gap becomes `40px`.
- At `max-width:800px`: hero/story/order/FAQ become single-column; hero copy `45px 24px`; hero image minimum height `470px`; main sections `65px 24px`; story image `420px`; story text `45px 24px`; order `60px 24px` with `35px` gap; form padding `25px`; FAQ gap `30px`. Heading intros stack. Navigation becomes a toggle plus an absolute menu below a `74px` header. Footer reserves space with `95px` bottom padding. A cart link appears when quantity is nonzero, fixed `16px` from the sides and bottom.
- At `max-width:500px`: catalogue and steps become one column; fields stack; hero image minimum height `390px`; story image `340px`; navigation side padding `18px`; menu image aspect ratio changes from square to `1.25`.

## Elevation & Depth

Depth primarily comes from photography and alternating flat color fields. Catalogue items have no enclosing card background or shadow. Only the photo note (`0 10px 28px #2a29151c`) and mobile cart (`0 6px 25px #172a2a38`) have shadows. The sticky header has a bottom border and z-index `30`; the mobile cart uses `35`. No generalized shadow scale is inferred.

## Shapes

Fields and copy button use `6px` corners; primary and quantity controls `8px`; mobile cart `10px`; food images, photo note and order panel `12px`. Category labels use `20px`; filters `30px`; brand emblem, count badge and photo-note arrow are circular. Hero/story photos are edge-to-edge rectangles with cover cropping. One-pixel rules and borders structure catalogue controls, process steps, FAQ and totals.

## Components

**Primary actions:** olive with white text, `15px 23px` padding, `24px` icon gap, `14px/550` text, `8px` radius. Hover changes background to the hover token in `.2s`; the order submit spans the panel and spaces text/icon apart. Disabled buttons use opacity `.55` and a not-allowed cursor.

**Category filters:** `13px` text, `10px 18px` padding, `1px` control border. `aria-pressed=true` fills olive and uses white text. Hover uses the pale filter-hover surface and olive text, including when selected.

**Menu items:** square cover image, `12px` corners, overlaid category badge; open text beneath with `20px` top padding. Image hover scales to `1.025` over `.35s`. Price/minimum remain visible before the outlined quantity control. Quantity buttons have `44px` minimum height and width. First selection starts at the menu minimum; decrementing at minimum removes it; maximum is `500` per menu. Feedback uses a status region.

**Order form:** ivory panel, `12px` radius, `35px` desktop/`25px` mobile padding. Fields use `12px` padding, `1px` field border, `6px` radius, `14px` normal text and `46px` minimum height. Labels are `12px/550`, `8px` gap, `20px` bottom margin. Empty selection, subtotal exclusions, generated-summary status and clipboard fallback are explicit. Required date/area use native constraints; area has a `120` character limit and notes `1000`. No bespoke error palette is defined.

**Navigation and FAQ:** desktop text links underline on hover; mobile menu opens under the header and closes on anchor selection. FAQ uses native `details/summary`, `23px 0` row padding, one-pixel dividers and an inline plus that rotates `45deg` when open.

**Focus and motion:** links, buttons, fields and summaries receive a `3px` terracotta outline with `4px` offset on `:focus-visible`. Hero image arrival lasts `1.2s`, ease `cubic-bezier(.16,1,.3,1)`, from scale `1.04`/saturation `.8` to scale `1`/saturation `1`. Reduced-motion CSS removes animations and transitions and sets automatic scrolling. No animation is documented beyond the current CSS.

## Do's and Don'ts

- **Do** scope these tokens to Dapur Saji; keep WUUS return links and the public **Contoh desain** label distinct from catering interactions.
- **Do** preserve the local font pairing, italic hero accent, contextual food illustrations, responsive stacking and visible focus treatment.
- **Do** label menu prices as illustrative, exclude delivery from the subtotal and state that a generated summary has not been sent.
- **Don't** apply this palette or type hierarchy to the global WUUS identity by inference.
- **Don't** turn example content into customer claims, a real catering affiliation, testimonials, sales evidence or a completed payment/order state.
- **Don't** treat screenshot-selected quantities or a generated summary as the default state, or generalize unobserved tokens, ramps or motion rules.
