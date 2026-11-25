# SponsorEvidence design refresh

## Navigation and footer

The header stays at the top of the viewport and adds a compact shadow after the page moves. The Products disclosure gives all four products equal weight, explains what they do, and links to the platform overview. Live demo and the pilot CTA remain directly available on desktop. The mobile menu keeps the same destinations and scrolls internally when needed. Click, touch and keyboard activation work through the same disclosure. Escape closes it and returns focus to its trigger. Section links clear the sticky header. [AngelList navigation on Mobbin](https://mobbin.com/sites/sections/df6f47be-606e-488d-b2c9-a3fe010d35b9) · [W3C disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) · [W3C focus guidance for sticky headers](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

The footer gives the demo and paid pilot a dedicated action area. The rest is a sitemap with Products, Use cases, Resources and Company. Privacy and preview terms sit in their own utility row. [Sequence footer on Mobbin](https://mobbin.com/sites/sections/91ab3ff8-d285-4695-8ffd-15c86b43b467) · [Jasper footer on Mobbin](https://mobbin.com/sites/sections/6b5f1dcc-cf00-4a9c-bd77-f107893da829)

## Interaction and hero

Buttons use a directional highlight and a short arrow shift while their labels and hit areas stay in place. Linked product and use-case cards have a persistent text link, full-card click area, growing top rule and a slight lift of the evidence artwork. The pricing cards use a border and shadow change to distinguish the active quote or pricing link. Spade informed the icon and link placement. MotionKit informed the arrow movement. [Spade cards on Mobbin](https://mobbin.com/sites/sections/e29da92d-89da-48de-a7d2-a58ec93155ec) · [MotionKit button examples](https://motionkit.io/blog/button-hover-effects)

The hero pairs the moving floodlit stadium with a replay monitor, timecode and focus brackets. The monitor links to the synchronized feed comparison. The scroll cue opens the stadium map. The homepage progress line, replay masks, exposure bar and proof trail follow scroll in both directions. The comparison has a keyboard- and touch-operable time slider across the same fictional replay window. [Vizcom hero on Mobbin](https://mobbin.com/sites/sections/5a194a1a-1add-434f-b901-b832b3c4ba78) · [Boomshot development case study](https://anneschmidt.co/portfolio/boomshot) · [Contra Labs development case study](https://contra.com/p/rRkvBLOE-creative-intelligence-2026-report-site-development)

The motion switch and device preference remove the moving treatments and keep the replay comparison, links and evidence readable. Icon-only decoration is hidden from assistive technology, and keyboard focus gives linked cards the same visual cue as hover. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [W3C animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

## Color roles

| Color | Role |
| --- | --- |
| #FFFFFF | Main canvas and card surfaces |
| #F5F8F6 | Recessed panels and secondary backgrounds |
| #E4F4E8 | Mint chapter and selected navigation state |
| #E8F1FF | Source comparison and analytics |
| #102C23 | Primary text on light surfaces |
| #09271E | Dark stadium and footer base |
| #14533A | Evergreen primary action |
| #B9F366 | High-emphasis action on dark backgrounds |
| #244CCE | Evidence routes, proof chapter and keyboard focus |
| #FBE9E2 | Unresolved-evidence chapter |

Calculated solid color contrast is 14.93:1 for primary text on white, 9.02:1 for white on evergreen, 11.43:1 for dark ink on lime, and 7.00:1 for white on cobalt. Photo contrast also depends on the image and overlay. [Carbon color layering](https://www.carbondesignsystem.com/building-blocks/foundations/color/overview) · [Atlassian color roles and states](https://atlassian.design/foundations/color)

## Product visuals

- **Sponsor Assets** pairs a green pitch grade with an artwork scan and registration guides. Light and dark treatments share a versioned record, which connects to the placement schedule below.
- **Exposure Analytics** pairs a blue pitch grade with an exposure bar and a scroll-linked playhead. The feed selector shows how a visible mark, a covered absence and incomplete venue footage differ.
- **Placement Audit** uses a burgundy pitch grade. The two feed frames settle in beside each other and the clause rule connects them to the required vertical placement. Source selection updates the provenance and observation.
- **Sponsor Report** uses a violet pitch grade. Its evidence packet assembles the replay exhibit and reviewed outcomes. Visitors can switch to the source manifest or download the example.

Each route carries its own pitch grade into the closing call to action. The homepage’s button highlights, card feedback and reversible section reveals also apply here. Controls and evidence remain available when motion is disabled.
