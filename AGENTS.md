# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

SponsorEvidence uses the approved Evidence Atlas direction and the 24-route IA. Use CropEvidence's primary font pair, DM Serif Display and Manrope, throughout. Keep cards, maps, media and type front-facing. Use Lenis + GSAP for progressively discovering evidence on marketing pages and native scrolling inside workflows. The approved fixtures define all case values.

Use a white and cool-green canvas, a full-bleed original stadium scene, and grass photography in selected sections. Keep Products directly available from a sticky, keyboard-operable header. Give each product route a distinct evidence visual and use focus or hover states without tilting content.

On the homepage, use cinematic stadium and pitch motion, plus directional reveals that respond to scroll in both directions. Offer static posters when motion is off or reduced, and preserve the flat evidence layout.

Use the approved Touchline logo throughout the site. Use the evergreen SVG wordmark on light surfaces, the white SVG wordmark on dark surfaces and the standalone Touchline symbol for favicons.

Use the replay monitor, scroll progress and reversible evidence transitions to bring the homepage to life. Use a directional highlight on buttons, a growing rule on linked cards and consistent line icons for actions and modules. Keep hover effects flat and give keyboard focus an equivalent cue.

Use distinct grades of the original pitch photography on the four product routes. Give each hero a working exhibit with motion specific to the product, and preserve the same evidence and controls when animation is off.

Give Use Cases and its three role pages, Pricing and About their own pitch backgrounds and animated exhibits. On the homepage, use pitch photography behind the evidence trail, workbench, review handoff, data permissions and scorecard. Keep the handoff and paid pilot treatments light, and use plum for data and permissions.
