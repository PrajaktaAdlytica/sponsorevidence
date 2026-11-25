import { useState } from 'react';

const feeds = [
  {name:'Main broadcast', id:'F-MCC-MAIN-01', format:'16:9', version:'v2', path:'M 12 26 H 31 L 39 34 H 55', point:[55,34]},
  {name:'Official vertical', id:'F-MCC-VERT-01', format:'9:16', version:'v1', path:'M 12 48 H 33 L 41 52 H 57', point:[57,52]},
  {name:'Venue feed', id:'F-MCC-VEN-01', format:'Venue reference', version:'v1', path:'M 12 73 H 34 L 42 68 H 61', point:[61,68]},
];

export function Stadium({compact=false}) {
  const [active, select] = useState(0);
  return <figure className={`stadium ${compact ? 'compact-map' : ''}`}>
    <div className="map-frame">
      <img src="/atlas-stadium.webp" alt="Detailed top-down illustration of the fictional Meridian Coast stadium" width="1536" height="1024" loading={compact ? 'lazy' : 'eager'} />
      <svg className="routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {feeds.map((feed, i) => <g key={feed.id} className={active === i ? 'selected-route' : ''}><path className="route-line" pathLength="1" d={feed.path}/><circle cx={feed.point[0]} cy={feed.point[1]} r="1.1"/></g>)}
      </svg>
      {!compact && <div className="map-layers" aria-label="Select a feed">
        {feeds.map((feed, i)=><button key={feed.id} onClick={()=>select(i)} aria-pressed={active === i}><span className="feed-number">{i + 1}</span> {feed.name}</button>)}
      </div>}
      {!compact && <span className="map-coordinate">MERIDIAN COAST CUP</span>}
    </div>
    <figcaption className="map-caption"><strong>{feeds[active].name}</strong><span>{feeds[active].id} · {feeds[active].version} · {feeds[active].format}</span><span>18 Oct 2026</span></figcaption>
  </figure>;
}

export function Shot({ vertical=false, seconds=1, highPriority=false }) {
  const active = seconds >= 1 && seconds <= 4.2;
  return <figure className={`shot ${vertical ? 'vertical-shot' : ''}`}>
    <figcaption><strong>{vertical ? 'Official vertical feed' : 'Main broadcast'}</strong><span>{vertical ? '9:16' : '16:9'}</span></figcaption>
    <div className="shot-frame">
      <img src="/replay.webp" width="1672" height="941" loading={highPriority ? 'eager' : 'lazy'} alt={vertical ? 'Vertical crop of the fictional goal replay' : 'Wide view of the same fictional goal replay'} />
      {vertical ? <span className="empty-overlay" role="img" aria-label="Expected overlay area, empty"/> : active && <span className="sponsor-overlay">NORTHLINE <small>REPLAY</small></span>}
      <span className="clip-time">00:18:{String(42+Math.floor(seconds)).padStart(2,'0')}</span>
    </div>
  </figure>;
}

export function Timeline({venue=false}) {
  return <div className="timeline">
    <div className="time-labels"><span>{venue ? '00:45:00' : '00:18:42'}</span><span>{venue ? '00:51:00' : '00:18:44'}</span><span>{venue ? '00:55:00' : '00:18:47'}</span></div>
    {venue ? <><div className="time-track venue-track"><span/><b/></div><div className="track-label"><span>Available recording</span><span>Required slate · unobserved</span></div></> : <><div className="time-track main-track"><span/><b/></div><div className="track-label"><span>Main broadcast</span><span>3.2 s observed</span></div><div className="time-track vertical-track"><span/></div><div className="track-label"><span>Official vertical feed</span><span>Covered · mark absent</span></div></>}
  </div>;
}

export function Clause({venue=false}) {
  return <div className="clause-art">
    <div className="micro">Signed requirement · AGR-MCC-01 v3</div>
    <strong>{venue ? 'S-09' : 'S-04'}</strong>
    <h3>{venue ? 'Halftime venue LED' : 'Vertical opening replay overlay'}</h3>
    <p>{venue ? 'Display the approved Northline mark on the venue LED during the halftime slate.' : 'Display the approved Northline mark in the opening replay overlay on the official vertical feed.'}</p>
    <div className="artifact-rule"><span>{venue ? 'Venue reference' : 'Official vertical feed'}</span><span>{venue ? '00:55:00' : '00:18:42–00:18:47'}</span></div>
  </div>;
}

export function ReportArt() {
  return <div className="report-art">
    <span className="micro">Meridian Coast Cup · 18 Oct 2026</span>
    <h3>Placement evidence</h3>
    <div className="report-grid"><img src="/replay.webp" alt="Replay still attached as an evidence exhibit" width="1672" height="941" loading="lazy"/><div><span className="micro">S-04 · PA-001</span><p>Required vertical replay</p><span className="status discrepancy">Confirmed discrepancy</span></div></div>
    <div className="artifact-rule"><span>S-09 · PA-002</span><strong>Open · coverage incomplete</strong></div>
    <div className="artifact-rule"><span>Commercial follow-up</span><strong>Awaiting decision</strong></div>
  </div>;
}

export function Graphic({kind}) {
  if(kind === 'map') return <Stadium compact/>;
  if(kind === 'photo') return <img className="documentary" src="/analyst.webp" width="1280" height="721" loading="lazy" alt="A sports media analyst reviews match footage from a stadium office"/>;
  if(kind === 'clause') return <Clause/>;
  if(kind === 'report') return <ReportArt/>;
  if(kind === 'chart') return <div className="chart-art"><span className="micro">Opening replay · feed exposure</span><Timeline/></div>;
  return <div className="asset-art"><span className="micro">Approved sponsor artwork</span><div className="mark-specimens"><span>NORTHLINE</span><span>NORTHLINE</span></div><div className="artifact-rule"><span>ART-NL-01 · v2</span><strong>Approved</strong></div></div>;
}
