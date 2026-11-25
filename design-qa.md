# SponsorEvidence design and browser QA

final result: passed

## Evidence

- Approved design is the refined Evidence Atlas board. The [comparison sheet](qa/design-comparison.jpg) places its hero and workbench beside the rendered browser views. The 745 px wide concept art was normalized into separate hero and workbench regions before comparing.
- Hero reviewed at [1440 × 900](qa/home-1440.png) and [390 × 844](qa/home-390.png). Placement Audit reviewed as a full record at [1440 px](qa/placement-audit-1440.png) and [390 px](qa/placement-audit-390.png) with the source references expanded, the shared timecode at 00:18:44 and the same reviewer decision recorded.
- The [browser measurements](qa/qa.json) were collected against the locally served production build.

## Design comparison

- **Typography.** The approved CropEvidence primary families, DM Serif Display and Manrope, both loaded in-browser. Headline wrapping remains readable at 390 px. The display font change is intentional and replaces the font that appeared in the static atlas direction.
- **Spacing and layout.** The approved split hero, single flat map frame, filmstrip, paired media and three-pane workbench translate into responsive layouts. The first pinned product test placed lower controls below the desktop stage. Reduced stage padding and headline height and raised the pinned-scroll viewport threshold. The final desktop stage exposes the product links. The mobile workbench stacks the same record without horizontal page overflow.
- **Color and imagery.** Bone, navy, pine, cobalt and clay map to atlas content and state. The stadium, analyst and replay are original assets. A single original still supplies both feed crops. Deep backgrounds mark the evidence and close, with paper used for the audit record.
- **Content and states.** The live captions and chart use the approved case values. The PA-001 requirement is S-04 and its inspection window is 00:18:42–00:18:47. The PA-002 S-09 case stays open because coverage ends before the required interval. The workbench starts in its review state. The captures show a recorded decision.
- **Interaction.** Verified map feed selection, desktop horizontal product motion, the disable-motion control, the reduced-motion mobile layout, source inspection, keyboard scrubbing, discrepancy and unresolved states, JSON export, local pilot submission and mobile navigation.

## Scope

All 24 approved routes returned successfully in Chromium. The production build and four Sites Worker tests passed. The app remains a local concept preview. Recorded footage, production authentication, intake delivery and remote analytics require separate production setup.

## Sticky navigation and visual refresh

The refreshed build passed all 24 route checks and the four Sites Worker tests. Tested the sticky header during wheel scrolling, Products disclosure with keyboard and Escape, sticky-header anchor clearance, both hover states, the mobile menu, all four product exhibits, and the earlier audit and pilot flows. The first anchor test exposed a duplicate scroll offset. Removing the duplicate lets the shared scroll padding handle native and Lenis navigation.

- [Cinematic desktop hero](qa/refresh/home-1440.png) and [mobile hero](qa/refresh/home-390.png)
- [Desktop Products menu on scroll](qa/refresh/sticky-products-1440.png) and [mobile Products menu](qa/refresh/mobile-products-390.png)
- [Grass-backed use cases](qa/refresh/grass-use-cases-1440.png) and [footer](qa/refresh/footer-1440.png)
- [Sponsor Assets](qa/refresh/sponsor-assets-1440.png), [Exposure Analytics](qa/refresh/exposure-analytics-1440.png), [Placement Audit product](qa/refresh/placement-audit-product-1440.png), and [Sponsor Report](qa/refresh/sponsor-report-1440.png)
- [Audit workbench at 1440 px](qa/refresh/placement-audit-1440.png) and [390 px](qa/refresh/placement-audit-390.png)

## Cinematic homepage pass

The [hero](qa/motion/hero-1440.png) plays an eight-second silent loop with a slow camera push and moving stadium light. The [pitch chapter](qa/motion/field-1440.png) tracks forward or backward with scroll. The clips were animated from original SponsorEvidence stills. They are decorative background media.

Verified in Chromium that the wide and vertical feed panels reveal from opposite sides, then reverse on upward scroll. The pitch video seek time moved from 1.63 seconds to 4.04 and back to 1.75. Also verified muted hero autoplay at desktop and mobile widths, pause offscreen, source removal when toggled off, and [static fallback at 390 px](qa/motion/poster-390.png) without video requests or scroll pins. The browser regression pass covered the 24 routes, sticky Products menu, product controls, audit and export. The production build and four Sites Worker tests passed. [Motion measurements](qa/motion/qa.json)


## Final responsive and workflow QA

- Chromium rendered all 24 routes at 11 widths from 320 to 1920 px. All 264 combinations passed the layout and runtime checks. The scan covered 92 internal link destinations and 13 referenced image and icon assets. Both external market links responded successfully. [Responsive measurements](qa/final/responsive-matrix.json)
- Fixed clipped headings and narrow feed captions, restored readable workbench hover text, and corrected the empty replay overlay’s accessible name. Axe reported zero automated violations across the 48 desktop and mobile scan results. Image-backed contrast still requires visual review. [Automated accessibility results](qa/final/accessibility-scan.json)
- Verified both workbench cases, decision persistence and reset, source inspection, and JSON export. The incomplete venue case exports its coverage gap immediately and includes the reviewer decision after it is recorded. Pilot and contact validation and local downloads, the sign-in preview, and missing-route handling also passed. [Reviewed workbench at 1440 px](qa/final/workbench-reviewed-1440.jpg) · [Reviewed workbench at 390 px](qa/final/workbench-reviewed-390.jpg)
- The production build and all four Sites Worker tests passed. Browser testing used Chromium and emulated widths. The preview uses simulated AI findings, local forms and preview sign-in.
