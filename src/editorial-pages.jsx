import { Cards, Demo, FAQ, Lead, Pilot, Pricing } from './chrome';
import { faq, info, solutions } from './content';
import { AboutExhibit, PricingPath, RoleExhibit, UseCaseMap } from './editorial-scenes';
import { Icon } from './icons';
import { ReportArt } from './visuals';

function FieldHero({ label, title, copy, icon, visual, section, jump, children, back }) {
  return <section className="editorial-hero" aria-labelledby="editorial-title">
    <div className="pitch-bg" aria-hidden="true"/>
    <div className="wrap split">
      <div className="editorial-copy">
        {back && <a className="editorial-back text-link" href="/solutions" data-page-reveal="left"><Icon name="left"/> All use cases</a>}
        <p className="eyebrow editorial-kicker" data-page-reveal="up"><Icon name={icon}/>{label}</p>
        <h1 id="editorial-title" data-page-reveal="left">{title}</h1>
        <p className="hero-desc" data-page-reveal="left">{copy}</p>
        <div className="actions" data-page-reveal="up">{children}</div>
        <a className="product-cue" href={`#${section}`} data-page-reveal="up">{jump}<Icon className="action-icon" name="down"/></a>
      </div>
      <div className="editorial-stage" data-page-reveal="right">{visual}</div>
    </div>
  </section>;
}

function FieldClose({ title, copy, children, visual }) {
  return <section className="chapter close editorial-close">
    <div className="pitch-bg" aria-hidden="true"/>
    <div className={`wrap ${visual ? 'split' : 'editorial-close-inner'}`}>
      <Lead title={title} copy={copy}><div className="actions" data-reveal="up">{children}</div></Lead>
      {visual && <div data-reveal="right">{visual}</div>}
    </div>
  </section>;
}

export function UseCaseIndex() {
  return <div className="editorial-page use-case-page use-case-index">
    <FieldHero label="Use cases" title="Sponsor delivery across the feeds you sell." copy="Find the workflow that matches your role in reporting, measurement or production." icon="map" visual={<UseCaseMap/>} section="by-role" jump="Explore the three use cases">
      <Demo className="product-primary"/>
    </FieldHero>
    <section className="chapter editorial-tint" id="by-role"><div className="wrap">
      <Lead title="Three roles in the evidence workflow."/>
      <Cards items={solutions} base="/solutions"/>
    </div></section>
    <FieldClose title="Bring one disputed placement." copy="Compare one feed-specific decision with the way your team works today." visual={<ReportArt/>}>
      <Pilot className="product-primary"/><Demo className="white-outline"/>
    </FieldClose>
  </div>;
}

const roleActions = {
  'rights-holders': 'Discuss your feed package',
  'measurement-agencies': 'Compare your workflow',
  'production-partners': 'Discuss a feed handoff',
};

export function UseCaseDetail({ item }) {
  return <div className={`editorial-page use-case-page use-case-${item.key}`}>
    <FieldHero label={item.name} title={item.job} copy={item.copy} icon={item.art} visual={<RoleExhibit role={item.key}/>} section="role-workflow" jump="See the workflow" back>
      <Demo className="product-primary" direct text="Open the Placement Audit demo"/><Pilot className="white-outline"/>
    </FieldHero>
    <section className="chapter editorial-tint" id="role-workflow"><div className="wrap">
      <Lead label={item.name} title="What to review and what to bring."/>
      <div className="editorial-feature-grid">
        {item.features.map(([title, copy], index) => <article className="editorial-feature" key={title} data-reveal={index === 0 ? 'left' : 'right'}>
          <span className="editorial-feature-icon"><Icon name={index === 0 ? item.art : 'shield'}/></span><h3>{title}</h3><p>{copy}</p>
        </article>)}
      </div>
    </div></section>
    <section className="chapter"><div className="wrap"><Lead title="Explore related use cases."/><Cards items={solutions.filter(other => other.key !== item.key)} base="/solutions"/></div></section>
    <FieldClose title="Bring one disputed placement." copy="Compare one feed-specific decision with the way your team works today.">
      <Pilot text={roleActions[item.key]} className="product-primary"/><Demo className="white-outline"/>
    </FieldClose>
  </div>;
}

const pricingQuestions = [
  ['Can we buy the evaluation separately?', 'Yes. The proposed first purchase is a separately scoped and quoted Placement Audit.'],
  ...faq,
];

const quoteInputs = [
  ['map', 'Event package', 'Name the event, placements and recording windows.'],
  ['shield', 'Source access', 'Identify permitted feeds and approved artwork.'],
  ['review', 'Review protocol', 'Agree on the baseline, reviewer and comparison rules.'],
];

export function PricingPage() {
  return <div className="editorial-page pricing-page">
    <FieldHero label="Pricing" title="A paid evaluation, then a scoped annual license." copy="Pilot pricing depends on the event package, feed access and review scope. The proposed annual license is a planning hypothesis." icon="clause" visual={<PricingPath/>} section="pricing-options" jump="Compare the options">
      <Pilot className="product-primary"/>
    </FieldHero>
    <section className="chapter editorial-tint" id="pricing-options"><div className="wrap">
      <Lead title="Compare the evaluation and the annual license."/>
      <Pricing/>
    </div></section>
    <section className="chapter"><div className="wrap split">
      <Lead title="What goes into a pilot quote?" copy="Agree on the records and review protocol before the comparison begins."><a className="btn light" href="/evaluation"><Icon name="chart"/>See the evaluation scorecard</a></Lead>
      <ul className="quote-inputs" data-reveal="right">
        {quoteInputs.map(([icon, title, copy]) => <li key={title}><Icon name={icon}/><div><strong>{title}</strong><p>{copy}</p></div></li>)}
      </ul>
    </div></section>
    <section className="chapter editorial-tint"><div className="wrap split">
      <Lead title="Questions about the evaluation"/><FAQ items={pricingQuestions}/>
    </div></section>
    <FieldClose title="Scope one paid Placement Audit." copy="Tell us the event package, the feeds you can use and the workflow you want to compare."><Pilot className="product-primary"/><Demo className="white-outline"/></FieldClose>
  </div>;
}

const aboutLinks = [
  ['compare', 'Read the methodology', '/resources/methodology'],
  ['shield', 'Review data and permissions', '/trust'],
  ['feedback', 'Discuss a partnership', '/contact?topic=Production%20or%20measurement%20partnership'],
];

export function AboutPage() {
  const page = info['/about'];
  return <div className="editorial-page about-page">
    <FieldHero label="About SponsorEvidence" title={page.title} copy={page.lead} icon="review" visual={<AboutExhibit/>} section="about-purpose" jump="Explore our purpose">
      <a className="btn product-primary" href={page.action[1]}>{page.action[0]}<Icon className="action-icon" name="arrow"/></a>
      <Demo className="white-outline"/>
    </FieldHero>
    <section className="chapter editorial-tint" id="about-purpose"><div className="wrap">
      <Lead title="What we’re building and who it’s for."/>
      <div className="editorial-feature-grid about-pillars">
        {page.parts.map(([title, copy], index) => {
          const [icon, label, href] = aboutLinks[index];
          return <article className="editorial-feature" key={title} data-reveal={['left', 'up', 'right'][index]}>
            <span className="editorial-feature-icon"><Icon name={icon}/></span><h3>{title}</h3><p>{copy}</p>
            <a className="text-link" href={href}>{label} <Icon className="action-icon" name="arrow"/></a>
          </article>;
        })}
      </div>
    </div></section>
    <FieldClose title="Compare a past case with us." copy="We invite sports marketing, media delivery and measurement teams to compare the concept with a real reporting process.">
      <a className="btn product-primary" href={page.action[1]}>{page.action[0]}<Icon className="action-icon" name="arrow"/></a>
      <Demo className="white-outline"/>
    </FieldClose>
  </div>;
}
