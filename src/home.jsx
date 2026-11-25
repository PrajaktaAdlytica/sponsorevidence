import { useState } from 'react';
import { offers, solutions, roles } from './content';
import { Cards, Demo, FAQ, Lead, Pilot, Pricing, Scorecard } from './chrome';
import { Clause, Graphic, ReportArt, Shot, Stadium, Timeline } from './visuals';
import { staticExample, Workbench } from './workbench';
import { MotionPlate } from './motion-plate';
import { Icon } from './icons';

const chapters=[['map','Map the feeds','map'],['compare','Compare the replay','compare'],['clause','Read the clause','clause'],['products','Explore the products','grid'],['audit','Review evidence','review']];
const trace=[
  ['Approve the mark','Sponsor Assets','Original mark and its version'],
  ['Measure each feed','Exposure Analytics','Source observations and coverage'],
  ['Compare with the schedule','Placement Audit','The named feed and signed term'],
  ['Review and prepare evidence','Sponsor Report','A finding, owner and next action'],
];

function ReplayMonitor() {
  return <a className="replay-monitor" href="#compare" data-cinema-reveal="right">
    <div className="monitor-head"><span><Icon name="compare"/>Opening replay</span><time dateTime="PT18M42S">00:18:42</time></div>
    <div className="monitor-screen">
      <img src="/replay.webp" width="1672" height="941" alt=""/>
      <span className="monitor-target" aria-hidden="true"/>
      <span className="monitor-scan" aria-hidden="true"/>
    </div>
    <div className="monitor-foot"><span>Compare the feeds <Icon name="arrow" className="action-icon"/></span><small>Fictional replay</small></div>
  </a>;
}

function ReplayComparison() {
  const [seconds, setSeconds] = useState(2);
  const timecode = `00:18:${42 + Math.floor(seconds)}`;
  return <div className="comparison-board" data-reveal="left">
    <div className="players"><Shot seconds={seconds} highPriority/><Shot seconds={seconds} vertical highPriority/></div>
    <div className="comparison-controls">
      <label htmlFor="comparison-time"><Icon name="play"/> Replay time</label>
      <input id="comparison-time" type="range" min="0" max="5" step=".25" value={seconds} aria-valuetext={timecode} onChange={event => setSeconds(Number(event.target.value))}/>
      <output htmlFor="comparison-time" aria-live="off">{timecode}</output>
    </div>
    <Timeline/>
  </div>;
}

export function Home({ motion }){
  return <>
    <section className="cinema" aria-labelledby="cinema-title">
      <MotionPlate className="cinema-plate" src="/stadium-motion.mp4" poster="/stadium-night.webp" motion={motion} mode="loop"/>
      <div className="wrap cinema-inner">
        <div className="cinema-copy">
          <p className="eyebrow" data-cinema-reveal="left">Sports sponsorship delivery verification</p>
          <h1 id="cinema-title" data-cinema-reveal="left">Check whether sponsors received the placements they bought.</h1>
          <p className="cinema-deck" data-cinema-reveal="left">Compare the feeds you delivered with the placement schedule. Inspect the approved mark, the clip and the agreement term behind each finding.</p>
          <div className="actions" data-cinema-reveal="right"><Demo className="accent"/><Pilot className="white-outline" placement="hero"/></div>
        </div>
        <ReplayMonitor/>
        <a className="cinema-cue" href="#map" data-cinema-reveal="right">
          <span>Follow the opening replay</span>
          <Icon name="down" className="action-icon"/>
        </a>
      </div>
    </section>
    <div className="chapter-nav"><div className="wrap"><span>THE EVIDENCE ATLAS</span><nav aria-label="Homepage chapters">{chapters.map(([key,label,icon])=><a key={key} href={'#'+key}><Icon name={icon}/>{label}</a>)}</nav></div></div>
    <section className="hero wrap" id="map">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow" data-reveal="left">Meridian Coast Cup</p>
          <h2 data-reveal="left">Map the feeds behind the replay.</h2>
          <p data-reveal="left">Select a feed to inspect its format and source ID. Follow the shared timecode to see which recording delivered the placement.</p>
          <p className="micro evidence-label">Fictional opening replay · DEMO · SIMULATED DATA</p>
        </div>
        <div className="hero-stadium" data-reveal="right"><Stadium/></div>
      </div>
      <a className="contact-sheet" href="#compare" aria-label="Follow the opening replay to the feed comparison">
        <span><strong>Opening replay</strong><small>Meridian Coast Cup</small></span>
        <span className="film-frames" aria-hidden="true">{[0,1,2,3].map(i=><img key={i} src="/replay.webp" alt="" width="178" height="72" style={{objectPosition:[25,43,55,69][i]+'% center'}}/>)}</span>
        <span className="film-time">00:18:42 <small>Compare the feeds <Icon name="arrow" className="action-icon"/></small></span>
      </a>
    </section>
    <section className="chapter sky" id="compare"><div className="wrap">
      <Lead label="The buyer problem" title="One replay. Two feeds." copy="The mark appears on the main broadcast. The agreement calls for the official vertical feed. Confirm what the recording actually shows."/>
      <div className="compare-grid">
        <ReplayComparison/>
        <aside className="comparison-side" data-reveal="right"><span className="eyebrow">Feed and placement</span><Stadium compact/><div className="artifact-rule"><span>Required feed</span><strong>Official vertical</strong></div><div className="artifact-rule"><span>Inspection window</span><strong>00:18:42–00:18:47</strong></div><p>A covered window with an empty overlay is different from missing footage.</p></aside>
      </div>
    </div></section>
    <section className="chapter cobalt home-field field-clause" id="clause"><div className="pitch-bg" aria-hidden="true"/><div className="wrap">
      <Lead label="The evidence trail" title="Connect the clip to the clause." copy="Computer vision proposes where an approved mark appears. Placement Audit checks the observation against the agreed feed. A reviewer inspects the evidence and records a decision."/>
      <div className="proof-grid">
        <div className="proof-art" data-reveal="left"><span className="micro">Source observation</span><Shot/><p>Main feed shows Northline during the replay.</p></div>
        <div data-reveal="down"><Clause/></div>
        <div data-reveal="right"><ReportArt/></div>
      </div>
      <div className="trace">{trace.map(([verb,product,note],index)=><article key={verb} data-reveal="up"><Icon name={offers[index].art}/><strong>{verb}</strong><span>{product}</span><small>{note}</small></article>)}</div>
    </div></section>
    <section className="chapter product-chapter" id="products"><div className="wrap">
      <Lead label="The product atlas" title="Four products. One evidence trail." copy="Start with the approved artwork and follow the same placement all the way to the reviewed report."/>
      <div className="atlas-actions"><div><button className="control" type="button" onClick={()=>document.dispatchEvent(new CustomEvent('atlas-step',{detail:-1}))}><Icon name="left"/>Previous product</button><button className="control" type="button" onClick={()=>document.dispatchEvent(new CustomEvent('atlas-step',{detail:1}))}>Next product<Icon name="arrow"/></button></div><a className="text-link" href="#audit">Skip to the audit</a></div>
      <div className="atlas-window"><div className="atlas-track"><Cards items={offers}/></div></div>
    </div></section>
    <section className="chapter ink home-field field-audit" id="audit"><div className="pitch-bg" aria-hidden="true"/><div className="wrap">
      <Lead label="Placement Audit workbench" title="See the evidence before you make the call." copy="Inspect a fictional case with the clause, feed, provenance and reviewer decision in the same record."/>
      <div data-reveal="up"><Workbench preview/></div>
    </div></section>
    <section className="chapter clay" id="gap"><div className="wrap split">
      <Lead label="The open item · PA-002" title="A missing source keeps the case open." copy="The supplied venue recording ends before the required halftime slate. Leave the issue open and record the segment still needed."><Demo direct text="Inspect both cases" className="primary"/></Lead>
      <div className="gap-art" data-reveal="right"><Clause venue/><Timeline venue/><span className="status pending">Open · evidence incomplete</span></div>
    </div></section>
    <section className="chapter home-field field-handoff" id="handoff"><div className="pitch-bg" aria-hidden="true"/><div className="wrap split">
      <Lead label="Review and handoff" title="The reviewer owns the finding. Commercial owns the next step." copy="Operations checks coverage and approves exports. Reviewers confirm detection and interpretation. Commercial decides whether to pursue a make-good or send a report."><button className="btn light" onClick={staticExample}><Icon name="download"/>Download the example record</button></Lead>
      <div className="report-stage" data-reveal="up"><ReportArt/></div>
    </div></section>
    <section className="chapter grass-section grass-motion"><MotionPlate className="pitch-plate" src="/pitch-motion.mp4" poster="/pitch-grass.webp" motion={motion} mode="scroll"/><div className="wrap">
      <Lead label="Use cases" title="Start with a placement someone can dispute." copy="Bring the evidence your role already works with."/>
      <Cards items={solutions} base="/solutions"/>
    </div></section>
    <section className="chapter ink home-field field-permissions" id="permissions"><div className="pitch-bg" aria-hidden="true"/><div className="wrap split">
      <Lead label="Data & permissions" title="Permission follows the source." copy="Broadcast, vertical and venue feeds can have different owners. Agree what can be used, who can review it and what can be shared."><a className="btn light" href="/trust"><Icon name="shield"/>Review data and permissions</a></Lead>
      <div data-reveal="right" className="permission-panel"><Stadium compact/>{roles.map(([name,note])=><div className="artifact-rule" key={name}><strong>{name}</strong><span>{note}</span></div>)}</div>
    </div></section>
    <section className="chapter"><div className="wrap split">
      <Lead label="Feedback on the concept" title="What would your team still check?" copy="Can you explain why the flag was raised, reconcile it with your current report, and identify which source to get next?"><a href="/contact?topic=Fictional%20demo%20feedback" className="btn light"><Icon name="feedback"/>Give feedback on the example</a></Lead>
      <div className="quote-art" data-reveal="right"><Graphic kind="photo"/><span className="micro">Review the fictional evidence against your own process</span></div>
    </div></section>
    <section className="chapter sky home-field field-pilot" id="pilot"><div className="pitch-bg" aria-hidden="true"/><div className="wrap">
      <Lead label="Paid pilot" title="Test one Placement Audit against your current process." copy="Bring the signed schedule, permitted feeds, approved artwork and the people who can sign off. Agree on scoring before comparison."><div className="actions"><Pilot placement="pilot"/><a className="btn light" href="/evaluation"><Icon name="chart"/>See scope and scorecard</a></div></Lead>
      <div data-reveal="up"><Scorecard/></div>
    </div></section>
    <section className="chapter" id="pricing"><div className="wrap"><Lead label="Pricing" title="Start with a scoped audit." copy="Price the evaluation for the specific event package and review scope. Discuss the annual license after the comparison."/><Pricing/></div></section>
    <section className="chapter sky"><div className="wrap split"><Lead label="About SponsorEvidence" title="Build reporting around evidence people can inspect." copy="We’re developing a way to check the placements rights holders promised across licensed broadcast, streaming and venue footage."><a href="/about" className="text-link">About SponsorEvidence</a><div className="about-photo" data-reveal="left"><Graphic kind="photo"/></div></Lead><FAQ/></div></section>
    <section className="chapter grass-section close field-close"><div className="wrap split"><Lead title="Bring one disputed placement." copy="Tell us the feed, the event package and how you review it today."><div className="actions"><Pilot className="accent" placement="closing"/><Demo className="white-outline"/></div></Lead><div data-reveal="right"><ReportArt/></div></div></section>
  </>;
}
