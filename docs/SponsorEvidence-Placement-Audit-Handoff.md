# SponsorEvidence Placement Audit demo and evaluation

The public concept has two entries. Analytic users can inspect fictional evidence without signing in. Budget owners can request a separately scoped paid evaluation. The workbench uses read-only source fixtures and local simulated review actions. Keep the simulated CRM on its own route.

## 1. Demo walkthrough

**Every screen and export** · DEMO · SIMULATED DATA.

**Fictional setting** · Meridian Coast Cup · Harbor Vale FC vs. Eastmarsh Athletic · 18 October 2026 · Sponsor “Northline.” All organizations, marks, clips, documents, dates and activities in the demo are invented. Event and footage date labels use a consistent date format. Clip coordinates are feed timecodes rather than match clock values.

| Step | Interface and copy | Behavior |
| --- | --- | --- |
| 1. Open queue | “Choose a placement to review.” “PA-001 · Vertical opening replay · Needs review.” “PA-002 · Halftime venue LED · Open · evidence incomplete.” | First case selected by default. Queue also accessible via keyboard. Switching cases loads source coverage and preserves decisions only in the current browser. |
| 2. Read requirement | “Required placement · S-04.” “Display the approved Northline mark in the opening replay overlay on the official vertical feed.” “Signed schedule · AGR-MCC-01, v3 · 1 October 2026.” | A “View clause” control expands the excerpt and highlights the named feed and scope. The schedule remains immutable. |
| 3. Compare feeds | “Main broadcast · 16:9” and “Official vertical feed · 9:16.” “Replay window 00:18:42–00:18:47.” | Provide a common play/pause control, labeled time scrubber and replay button for original synthetic media. At 390 px, offer a readable feed switch plus a compact two-still comparison. Keep the two sources and shared timecode understandable when motion is off. |
| 4. Inspect sources | “Recorded 18 October 2026.” “F-MCC-MAIN-01 · v2” and “F-MCC-VERT-01 · v1.” “Approved artwork · ART-NL-01 · v2.” “Demo clips · fictional.” | Source panel identifies role, filename or display name, source version, available range, permission state and provenance. Clip presence is recorded separately from the signed feed requirement. |
| 5. Read suggestion | “Possible discrepancy. The Northline mark appears on the main broadcast. The mark was not detected in the expected region on the required vertical replay.” “Model observation · Reviewer confirmation required.” | Show a visible outline and 3.2 synthetic seconds on the main-feed example, from 00:18:43.0 to 00:18:46.2. Show the expected region and full window on the vertical feed. Keep detection, coverage and interpretation separate. Do not assign an accuracy figure. |
| 6. Record decision | “Confirm discrepancy” or “Keep open.” Fixture reviewer “Casey Noor · Sponsorship Analyst.” | PA-001 can be confirmed only after a user action. The simulated note is “The supplied vertical replay covers the required window. The reviewer found no approved mark in the required overlay.” The decision history distinguishes the suggestion, human decision and next action. “Reset simulated decision” restores the starting state. |
| 7. Review open item | “Source needed · Halftime venue LED capture.” “Available venue footage ends before the required time.” | PA-002 keeps an open state and documents the gap. “Keep open” records the action and preserves the unresolved issue. Prevent confirmation from incomplete coverage. |
| 8. Hand off and export | “Commercial next step · Assess whether to review a make-good.” “Sponsor-facing send · Awaiting commercial approval.” “Download example record.” | Download JSON assembled from case state, with source references, role, coverage, outcome and unresolved items. Open records export as open examples. The file is a demo export. No real make-good, sponsor send, case assignment or commercial approval occurs. |

### Case B reference

PA-002 uses the same schedule, term **S-09**, which requires the Northline mark on the venue LED during the halftime slate starting at **00:55:00** on the venue reference. Venue source **F-MCC-VEN-01 v1** was recorded **18 October 2026**. The permitted demo recording ends at **00:51:00**, so the required window is unobserved. Assign **Casey Noor**, retain an open outcome and ask measurement operations for the authorized missing segment. A source gap stays visible in the queue, record and export. There is no missing-placement flag on this case.

### Simple evidence record schema

| Field | Purpose |
| --- | --- |
| schema_version, data_label, case_id, event, event_date, sponsor | Version, simulation disclosure and identity |
| requirement | Agreement ID, signed version and date, term ID, placement, named feed and window |
| sources | Source IDs, type, aspect ratio where applicable, date, version, permitted-use status, relevant available ranges |
| proposed_finding | Finding, origin, referenced source IDs and evidence window |
| coverage, unresolved_gap | Expected and observed scope, missing source or time range |
| assigned_reviewer, reviewed_decision, decision_history | Named reviewer and role, outcome, rationale and local audit trail |
| commercial_follow_up | Owner role, next action and approval state for make-good or sponsor report |
| export_status | Readiness of the example record and whether sponsor-facing distribution is authorized |

The example JSON shows a reviewed PA-001 plus open PA-002. The live walkthrough should begin before PA-001 is reviewed. Generate its export from the state actually shown on screen.

### Simulated buyer account

| Field | Example |
| --- | --- |
| Account | North Quay Rights Group · fictional rights holder |
| Buyer | Morgan Hale · Head of Partnership Reporting · budget owner and proposed scope signer |
| Named operator | Robin Bell · Media Measurement Operations Lead |
| Reviewer | Casey Noor · Sponsorship Analyst |
| Data owner | Meridian Coast Media Desk · feed authorization pending |
| Integration owner | Jules Ren · Media Delivery Lead |
| Data permission | “Synthetic demo data · approved in preview.” “Representative pilot recordings · permission pending.” “Artwork and agreement reuse · to confirm.” |
| Baseline workflow | Exposure dashboard + approved schedule + human clip annotations + reconciled delivery report |
| Proposed evaluation | Placement Audit for one event package across 30 authorized event-hours |
| Commercial status | Pilot quote pending. Signed scope pending. Annual renewal owner to confirm. |
| Next action | “Confirm feed and artwork use with the data owner, then agree baseline and signed scope with the budget owner.” |
| Activity | “18 October · Fictional event recorded.” “20 October · Sample sources added.” “21 October · Proposed scope drafted.” |

## 2. Buyer evaluation and scorecard

**Public copy.** “Bring an agreed event package, placement schedule and applicable agreement terms. Confirm that we can use the footage and artwork for the agreed evaluation. We’ll compare the workbench decisions against your current reporting process and review the results with your named reviewer.”

**Before the comparison.**

1. The budget owner agrees a funded evaluation and the signed package, quote and scope.
2. Each applicable data owner grants permission for the approved footage, sponsor artwork and contract excerpts. Specify access, sharing, approved outputs, retention and deletion. Training or reusable libraries require their own documented rights.
3. The operator and reviewer agree placement terms, expected feeds, available windows, annotation rules, how suggestions and open cases are recorded, and how disagreements are adjudicated.
4. Select 30 authorized event-hours. Record which feeds and windows those event-hours cover. If several feeds represent the same event period, log both event-hours and source-hours so the baseline comparison uses the same sample.
5. Prepare or obtain reconciled delivery reports and human clip annotations. The named reviewer resolves disagreements to create the comparison reference. Define adverse outcomes and go/no-go thresholds before reviewing results.

### Evaluation scorecard

| Measure | What to compare | Current baseline | Placement Audit | Agreed threshold | Result |
| --- | --- | --- | --- | --- | --- |
| Missed contractual placements | Human-confirmed missing placements that each workflow did not flag. Record count and rate over all human-confirmed misses. If there are zero, report the count and use N/A for rate. | ____ | ____ | ____ | ____ |
| False flags | Flags the human reviewer adjudicates as delivered. Record count and rate over all adjudicated flags in each workflow. If there are zero adjudicated flags, use N/A for rate. | ____ | ____ | ____ | ____ |
| Analyst minutes per deliverable | Time to assemble sources, review and prepare the same evidence deliverable. Agree timing boundaries and report the same summary statistic for both workflows. | ____ | ____ | ____ | ____ |
| Coverage and open cases | Of the sampled requirements, record scorable, open due to incomplete evidence, and out-of-scope cases. Show reasons and use agreed denominators above. | ____ | ____ | ____ | ____ |
| Adverse outcomes | Document incorrect make-good escalation, unreadable or mis-versioned sources, and unapproved record sharing if observed. | ____ | ____ | ____ | ____ |

**Sign-off block.** Buyer and quote · Data owners and permission scope · Named operator and reviewer · Baseline version · Review protocol and adverse outcomes · Signed scope · Thresholds · Decision · Reviewer notes · Next commercial action.

**Decision gate.** Move past the isolated preview after the budget owner funds the evaluation, the data owner authorizes representative records and the named reviewer accepts the protocol. Before expanding scope, review the comparison and why the buyer would pay alongside the incumbent. Test the annual price and implementation effort independently.

## 3. Analytics, feedback and acquisition

| Event | Trigger | Allowed properties |
| --- | --- | --- |
| offer_view | A module detail page is viewed | Module enum, route enum |
| demo_start | A visitor starts the fictional walkthrough | Entry surface enum |
| reviewer_interaction | A visitor opens review controls or completes a local action | Interaction category enum only |
| pilot_cta_click | A visitor selects the pilot CTA | Entry route enum, CTA position enum |
| qualified_request | An approved intake backend confirms a request that meets pre-agreed qualification | Qualified boolean, approved coarse campaign enum |
| feedback_cta_click | A visitor opens the demo feedback form | Entry surface enum |

Keep personally identifiable information, emails, organizations, record IDs, findings, reviewer names, notes, clip URLs, media and permission details out of event payloads. Do not emit a qualified request for local form simulation. Store lead responses separately from analytics. Record spend and consent in appropriate systems with separate access controls. For demand testing, agree the bar for a qualified meeting, confirmed data permission and paid evaluation interest.

**Ad variant A.** “Check whether sponsors received the placements they bought.” Body “Compare an authorized event feed with the placement schedule. See how a reviewer would trace a discrepancy to the clip and clause.” CTA “Open the fictional audit.”

**Ad variant B.** “Take this annotated Placement Audit into your next reporting review.” Body “Two feeds. One signed placement. Inspect the evidence, then compare it with the workflow you already use.” CTA “View the annotated example.”

**LinkedIn outreach draft.** “The agreement calls for a sponsor overlay on the vertical opening replay. The mark appears on the main feed. Here’s how a fictional reporting analyst reconciles the two. If you own sponsorship reporting, would you compare the example with a past case you’re authorized to discuss?” Start with sports marketing agencies and media delivery partners. Keep outreach in draft until sending is authorized. Reserve measured outcome claims for an approved evaluation.

**Later Notion tracking fields.** Buyer, named operator, integration owner, pilot module, data permission, baseline, success threshold, pilot quote, signed scope, decision, source links and rights, demo URL, screenshot verification and next action. Keep the reviewer's identity and commercial owner visible on the pilot record where permitted.

## 4. Build acceptance and screenshot specification

- Confirm a first-time visitor can identify the buyer, four modules, paid offer, price hypothesis and demo paths without scrolling through motion.
- Verify the normal demo flow from entry to PA-001 source comparison, reviewer decision and downloadable labeled export. Verify PA-002 stays open and the source gap survives export. Reset and re-run. Verify every demo page, queue and file says “DEMO · SIMULATED DATA.”
- Verify the workbench on keyboard and touch. Focus returns after a panel closes. Playhead controls, case switching and decision feedback work without hover or motion. Check names, term versions, dates and status across the desktop and mobile record.
- Capture an actual browser rendering at **1440 px** and **390 px** after the build. Use PA-001 after a local decision for both. The desktop image should show the full record, the two source inputs, the clause, suggested finding and reviewer decision, with the PA-002 queue item still legible. The mobile record should include the same clause, date, source IDs and versions, readable source panel, decision and unresolved case link. Use a full-page mobile capture and a separate focused source-panel capture if the latter is useful. Use file names such as `placement-audit-1440.png` and `placement-audit-390.png`. Place captures on the product page and in the handoff.
- Verify privacy copy against actual form delivery and analytics. Map applicable event triggers, form validation, submission, error and safe retry. Check staging and production settings before enabling live collection. Finish real authentication, access and consent handling where offered.
- Check module links, metadata, original logo/favicon, open-graph art, responsive typography, visible focus, legal/footer links and absence of platform marks. Validate factual claims, price labels, source attribution, asset rights and commercial authority.
- Push the build to its authorized GitHub repository, verify the Vercel preview, connect the cleared domain when authorized, and repeat browser checks post-deploy.

This package supplies the written design, data example and acceptance criteria. The working demo, analytics instrumentation and 1440/390 px browser captures are implementation deliverables.
