import fixture from './demo.json';
import { solutions } from './content';
import { Icon } from './icons';
import { Shot, Stadium, Timeline } from './visuals';

const [replay, venue] = fixture.cases;
const [mainFeed, verticalFeed] = replay.sources;
const [venueFeed] = venue.sources;

function EvidencePanel({ label, title, icon, children }) {
  return <div className="editorial-exhibit editorial-evidence">
    <div className="exhibit-heading">
      <div><span className="micro"><Icon name={icon}/> {label}</span><h2>{title}</h2></div>
      <span className="scene-demo">{fixture.data_label}</span>
    </div>
    {children}
  </div>;
}

export function UseCaseMap() {
  return <EvidencePanel label="Meridian Coast Cup" title="One event. Three paths to the evidence." icon="map">
    <div className="use-case-atlas">
      <div className="atlas-feed-map" data-exhibit-reveal="right"><Stadium/></div>
      <nav className="role-path exhibit-progress" aria-label="Explore by role">
        {solutions.map(item => <a className="role-path-link" key={item.key} href={`/solutions/${item.key}`} data-exhibit-reveal="up">
          <Icon name={item.art}/><span>{item.name}</span><Icon name="arrow" className="action-icon"/>
        </a>)}
      </nav>
    </div>
  </EvidencePanel>;
}

function RightsHolderExhibit() {
  return <EvidencePanel label="Disputed placement" title="The clip beside the clause" icon="clause">
    <div className="rights-comparison">
      <div data-exhibit-reveal="left"><Shot seconds={2}/></div>
      <div data-exhibit-reveal="right"><Shot vertical seconds={2}/></div>
    </div>
    <div className="rights-clause exhibit-progress" data-exhibit-reveal="up">
      <Icon name="clause"/>
      <div><span className="micro">Signed term · {replay.requirement.term_id}</span><strong>{replay.requirement.required_feed}</strong></div>
      <span className="status pending">Reviewer decision needed</span>
    </div>
  </EvidencePanel>;
}

function AgencyExhibit() {
  return <EvidencePanel label="Measurement review" title="The same replay, two observations" icon="chart">
    <div className="agency-evidence" data-exhibit-reveal="up"><Timeline/></div>
    <dl className="agency-baseline exhibit-progress">
      <div data-exhibit-reveal="left"><dt><Icon name="report"/> Current baseline</dt><dd>Reports and human clip annotations</dd></div>
      <div data-exhibit-reveal="right"><dt><Icon name="review"/> Audit output</dt><dd>Source-linked findings and open items</dd></div>
    </dl>
  </EvidencePanel>;
}

function ProductionExhibit() {
  const sources = [mainFeed, verticalFeed, venueFeed];
  return <EvidencePanel label="Source handoff" title="The right feed, version and window" icon="map">
    <div className="production-manifest exhibit-progress">
      {sources.map(source => <details key={source.id} className="source-drawer" data-exhibit-reveal="right">
        <summary><Icon name="report"/><span><strong>{source.name}</strong><small>{source.id} · {source.version}</small></span><Icon name="chevron"/></summary>
        <p>Available window <strong>{source.available_range.start}–{source.available_range.end}</strong>. {source === venueFeed ? 'Ends before the required slate.' : 'Covers the opening replay.'}</p>
      </details>)}
    </div>
  </EvidencePanel>;
}

const exhibits = {
  'rights-holders': RightsHolderExhibit,
  'measurement-agencies': AgencyExhibit,
  'production-partners': ProductionExhibit,
};

export function RoleExhibit({ role }) {
  const Exhibit = exhibits[role];
  return <Exhibit/>;
}

export function PricingPath() {
  return <div className="editorial-exhibit pricing-path">
    <div className="exhibit-heading"><div><span className="micro"><Icon name="clause"/> Proposed commercial model</span><h2>Start with one event package.</h2></div></div>
    <ol className="pricing-journey exhibit-progress">
      <li data-exhibit-reveal="left"><Icon name="clause"/><div><span className="micro">Paid evaluation</span><strong>Placement Audit</strong><p>30 authorized event-hours proposed</p></div><span className="journey-price">Quoted after scope</span></li>
      <li data-exhibit-reveal="right"><Icon name="report"/><div><span className="micro">Proposed annual license</span><strong>Rights-holder license</strong><p>Based on broadcast hours and sponsors</p></div><span className="journey-price">$42,000 / year<small>Planning hypothesis</small></span></li>
    </ol>
  </div>;
}

export function AboutExhibit() {
  return <figure className="editorial-exhibit about-exhibit">
    <div className="about-exhibit-photo" data-exhibit-reveal="right"><img src="/analyst.webp" alt="Illustration of a sports media analyst reviewing match footage in a stadium office" width="1280" height="721"/></div>
    <figcaption>
      <span className="micro">The evidence behind a reporting decision</span>
      <ol className="about-evidence exhibit-progress">
        <li data-exhibit-reveal="up"><Icon name="play"/><span>Approved footage</span></li>
        <li data-exhibit-reveal="up"><Icon name="clause"/><span>Signed requirement</span></li>
        <li data-exhibit-reveal="up"><Icon name="review"/><span>Reviewer finding</span></li>
      </ol>
    </figcaption>
  </figure>;
}
