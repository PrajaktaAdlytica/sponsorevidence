# SponsorEvidence

Evidence Atlas is a 24-route sports sponsorship verification website and fictional Placement Audit workbench. It uses React, Vite, Lenis, GSAP and ScrollTrigger. DM Serif Display and Manrope are served locally with their font licenses.

The homepage carries the Meridian Coast Cup case from a flat stadium plan to the two feed views, the signed clause, the workbench, the open coverage case and the example report. Each product has its own page. The paid evaluation, intake, pricing, use cases and supporting routes follow the approved IA.

## Preview and build

The local preview for this build is at [127.0.0.1:4175](http://127.0.0.1:4175/). The workbench is at [/demo/placement-audit](http://127.0.0.1:4175/demo/placement-audit).

The project can be installed with `npm ci`, run with `npm run dev`, and packaged with `npm run build`. The build emits its static client and a Sites-compatible Worker. Run `npm run test:sites` to verify Worker routing and asset handling. A static host needs to fall back to the client index on app routes.

## Connect to Vercel

Import this GitHub repository from [Vercel's New Project screen](https://vercel.com/new). Use the repository root (`.`) and `main` as the production branch. The checked-in `vercel.json` sets the Vite preset, `npm ci` install command, `npm run build` build command, `dist/client` output directory, and the fallback for direct links to app routes.

Deploy from the import screen. After deployment, open `/pricing` and `/demo/placement-audit` directly to verify the route fallback. For social sharing, set the optional `VITE_PUBLIC_SITE_URL` variable to the public HTTPS origin you plan to share, then redeploy so the share image uses an absolute URL.

## Preview behavior

- The replay uses a fictional still and a simulated exposure window. The media is original concept artwork.
- Review decisions are stored in the current browser. The downloadable JSON distinguishes the two cases and labels the dataset as simulated.
- Pilot and contact forms produce downloadable local records. Sign-in is a concept flow.
- Interaction counts are stored in session storage without personal or case data.
- No production analytics, form delivery, identity provider or public deployment are configured.

See [the design refresh and reference studies](design-refresh.md), [design and browser QA](design-qa.md), the [audit fixture](src/demo.json), the [site structure and copy](docs/SponsorEvidence-Website-IA-and-Copy.md), and the [Touchline brand kit](docs/branding/Touchline-brand-kit.zip).
