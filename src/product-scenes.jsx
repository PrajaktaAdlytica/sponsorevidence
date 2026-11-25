import { useState } from 'react';
import fixture from './demo.json';
import { Clause, Shot, Stadium, Timeline } from './visuals';
import { Icon } from './icons';

const [replayCase, venueCase] = fixture.cases;
const [mainSource, verticalSource, artwork] = replayCase.sources;
const [venueSource] = venueCase.sources;
const sourceList = [mainSource, verticalSource, venueSource];

function Panel({ label, title, icon, children }) {
  return <div className="product-scene">
    <div className="scene-heading">
      <div><span className="micro scene-label">{icon && <Icon name={icon}/>} {label}</span><h2>{title}</h2></div>
      <span className="scene-demo">{fixture.data_label}</span>
    </div>
    {children}
  </div>;
}

function AssetRegistry() {
  const [variant, selectVariant] = useState('Light');
  return <Panel label="Sponsor artwork registry" title="Northline" icon="asset">
    <div className="specimen-control" role="group" aria-label="Artwork variant">
      {['Light', 'Dark'].map(value => <button key={value} type="button" className="scene-filter" aria-pressed={variant === value} onClick={() => selectVariant(value)}>{value} treatment</button>)}
    </div>
    <figure className="specimen-plate" data-variant={variant}>
      <span className="specimen-guides" aria-hidden="true"/>
      <span className="specimen-scan" aria-hidden="true"/>
      <strong>NORTHLINE</strong>
      <figcaption>Approved wordmark · {variant.toLowerCase()} treatment</figcaption>
    </figure>
    <dl className="scene-facts"><div><dt>Source ID</dt><dd>{artwork.id}</dd></div><div><dt>Version</dt><dd>{artwork.version}</dd></div><div><dt>Effective date</dt><dd>{artwork.date}</dd></div></dl>
    <div className="scene-end"><span className="status good"><Icon name="check"/> Approved reference</span><span>For fictional preview use</span></div>
  </Panel>;
}

function ExposureMonitor() {
  const [index, selectFeed] = useState(0);
  const source = sourceList[index];
  return <Panel label="Feed monitor" title="Opening replay exposure" icon="chart">
    <div className="specimen-control" role="group" aria-label="Filter by feed">
      {sourceList.map((entry, i) => <button className="scene-filter" key={entry.id} type="button" aria-pressed={index === i} onClick={() => selectFeed(i)}>{i === 1 ? 'Vertical feed' : entry.name}</button>)}
    </div>
    <div className="exposure-screen">
      {index === 2 ? <div className="venue-window scene-swap" key={source.id}><Stadium compact/><p>Venue coverage ends before the required slate.</p></div> :
        <div className={`exposure-media scene-swap feed-choice-${index}`} key={source.id}>
          <Shot vertical={index === 1} seconds={2}/>
          <div className="exposure-readout"><span className="micro">Northline</span><strong>{index === 0 ? '3.2 s' : '0.0 s'}</strong><p>{index === 0 ? 'Observed on main broadcast' : 'Covered · mark absent'}</p></div>
        </div>}
    </div>
    <div className="exposure-timeline" data-feed={index}>
      <Timeline venue={index === 2}/>
      <span className="exposure-playhead" aria-hidden="true"/>
    </div>
    <div className="scene-end"><span>{source.id} · {source.version}</span><span>{source.date}</span></div>
  </Panel>;
}

function AuditExhibit() {
  const [source, selectSource] = useState(verticalSource);
  return <Panel label="Requirement and source" title="Vertical opening replay" icon="clause">
    <div className="audit-exhibit">
      <div className="specimen-control" role="group" aria-label="Inspect a source">
        {[mainSource, verticalSource].map(entry => <button key={entry.id} type="button" className="scene-filter" aria-pressed={source.id === entry.id} onClick={() => selectSource(entry)}>{entry === mainSource ? 'Main broadcast' : 'Official vertical'}</button>)}
      </div>
      <div className="audit-frames">
        <div className="audit-stream" data-selected={source === mainSource}><Shot seconds={2}/></div>
        <div className="audit-stream" data-selected={source === verticalSource}><Shot vertical seconds={2}/></div>
      </div>
      <div className="audit-note">
        <Icon name="clause"/>
        <div><span className="micro">Signed clause · {replayCase.requirement.term_id}</span><strong>{replayCase.requirement.required_feed}</strong></div>
        <span className="status pending">Needs review</span>
      </div>
    </div>
    <dl className="scene-facts"><div><dt>Case</dt><dd>{replayCase.case_id}</dd></div><div><dt>Inspection window</dt><dd>00:18:42–00:18:47</dd></div></dl>
    <div className="scene-end" aria-live="polite"><span>{source.id} · {source.version}</span><span>{source === verticalSource ? 'Covered · mark absent' : 'Mark observed · alternate feed'}</span></div>
  </Panel>;
}

function ReportPreview() {
  const [manifest, showManifest] = useState(false);
  return <Panel label="Reviewed evidence packet" title="Meridian Coast Cup" icon="report">
    <div className="specimen-control" role="group" aria-label="Report view">
      <button className="scene-filter" type="button" aria-pressed={!manifest} onClick={() => showManifest(false)}>Case summary</button>
      <button className="scene-filter" type="button" aria-pressed={manifest} onClick={() => showManifest(true)}>Source manifest</button>
    </div>
    <div className="report-packet">
      {manifest ? <ul className="manifest-list scene-swap" key="manifest">
        {sourceList.map(source => <li key={source.id}><Icon name="report"/><div><strong>{source.name}</strong><span>{source.id} · {source.version}</span></div></li>)}
      </ul> : <div className="report-summary scene-swap" key="summary">
        <figure className="report-exhibit"><img src="/replay.webp" alt="Fictional opening replay attached to case PA-001" width="1672" height="941"/><figcaption><Icon name="play"/> Replay exhibit</figcaption></figure>
        <ol className="report-outcomes">
          <li><span className="micro">PA-001 · S-04</span><strong>Vertical opening replay</strong><span className="status discrepancy">Confirmed discrepancy</span></li>
          <li><span className="micro">PA-002 · S-09</span><strong>Halftime venue LED</strong><span className="status pending">Open · coverage incomplete</span></li>
        </ol>
      </div>}
    </div>
    <div className="scene-end"><span>18 October 2026</span><span>Commercial decision pending</span></div>
  </Panel>;
}

const scenes = {
  'sponsor-assets': AssetRegistry,
  'exposure-analytics': ExposureMonitor,
  'placement-audit': AuditExhibit,
  'sponsor-report': ReportPreview,
};

export function ProductScene({ product }) {
  const Scene = scenes[product];
  return <Scene/>;
}

export function ProductEvidence({ product }) {
  switch (product) {
    case 'sponsor-assets':
      return <Panel label="Placement schedule" title="Approved mark, named feed" icon="asset">
        <dl className="scene-facts schedule-facts">
          <div><dt><Icon name="asset"/> Sponsor</dt><dd>{replayCase.sponsor}</dd></div>
          <div><dt><Icon name="check"/> Artwork</dt><dd>{artwork.id} · {artwork.version}</dd></div>
          <div><dt><Icon name="clause"/> Rule</dt><dd>{replayCase.requirement.term_id} · {replayCase.requirement.version}</dd></div>
          <div><dt><Icon name="compare"/> Approved for</dt><dd>{replayCase.requirement.required_feed}</dd></div>
        </dl>
      </Panel>;
    case 'exposure-analytics':
      return <Panel label="Source coverage" title="Covered and unobserved windows" icon="chart"><Timeline/><Timeline venue/></Panel>;
    case 'placement-audit':
      return <div className="audit-clause-pair"><Clause/><Clause venue/></div>;
    case 'sponsor-report':
      return <Panel label="Commercial handoff" title="From review to next action" icon="report">
        <ol className="report-outcomes">
          <li><span className="micro">Measurement operations</span><strong>Approve the evidence export</strong></li>
          <li><span className="micro">Commercial owner</span><strong>Decide whether to send or pursue a make-good</strong></li>
        </ol>
      </Panel>;
    default:
      return null;
  }
}
