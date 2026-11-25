import { useEffect, useState } from 'react';
import { offers, solutions, info } from './content';
import { Cards, Demo, Lead, Pilot, Scorecard } from './chrome';
import { AboutPage, PricingPage, UseCaseDetail, UseCaseIndex } from './editorial-pages';
import { Graphic, ReportArt } from './visuals';
import { ProductEvidence, ProductScene } from './product-scenes';
import { DEMO_LABEL, downloadJson, recordEvent, staticExample, Workbench } from './workbench';
import { Icon } from './icons';

function Hero({label,title,lead,children,art}) {
  return <section className="page-hero"><div className={`wrap ${art?'split':''}`}><div className="page-hero-copy"><p className="eyebrow" data-reveal="up">{label}</p><h1 className={title.includes('SponsorEvidence') ? 'brand-title' : undefined} data-reveal="up">{title}</h1><p className="hero-desc" data-reveal="left">{lead}</p>{children}</div>{art&&<div className="page-art" data-reveal="right"><Graphic kind={art}/></div>}</div></section>;
}
function FeatureList({parts,art}) {
  return <section className="chapter sky"><div className="wrap feature-list">
    {parts.map(([name,copy,url],i)=><article key={name} className="split" data-reveal={i%2?'right':'left'}><div><h2>{name}</h2><p>{copy}</p>{url&&<a className="text-link" href={url}>Read the source</a>}</div><div className="feature-art"><Graphic kind={i===0?art:i===1?'clause':'report'}/></div></article>)}
  </div></section>;
}
function ActionBar({ product }) {
  return <section className={`chapter close ${product ? 'product-close' : 'cobalt'}`}>
    {product && <div className="product-field" aria-hidden="true"/>}
    <div className="wrap split">
      <Lead title="Bring one disputed placement." copy="Compare one feed-specific decision with the way your team works today.">
        <div className="actions"><Pilot className={product ? 'product-primary' : 'light'}/><Demo className="white-outline"/></div>
      </Lead>
      {product ? <div className="product-close-art" data-reveal="right"><Graphic kind={product.art}/></div> : <ReportArt/>}
    </div>
  </section>;
}
function Platform(){
  return <><Hero label="Platform" title="From the placement schedule to the reviewed decision." lead="Approve the mark, observe it in recorded feeds, verify the agreement and prepare the evidence." art="map"><div className="actions"><Demo/></div></Hero><section className="chapter sky"><div className="wrap"><Lead title="Four distinct responsibilities."/><Cards items={offers}/></div></section><ActionBar/></>;
}
function ProductDetail({ item }) {
  useEffect(() => { recordEvent('offer_view', item.key); }, [item]);
  const report = item.key === 'sponsor-report';
  const audit = item.key === 'placement-audit';
  return <div className={`product-page product-${item.key}`} data-product={item.key}>
    <section className="product-hero" aria-labelledby="product-title">
      <div className="product-field" aria-hidden="true"/>
      <div className="wrap split">
        <div className="product-hero-content">
          <a className="product-back text-link" href="/platform" data-product-reveal="left"><Icon name="left"/> All products</a>
          <p className="eyebrow product-kicker" data-product-reveal="up"><span className="product-hero-icon"><Icon name={item.art}/></span>{item.name}</p>
          <h1 id="product-title" data-product-reveal="left">{item.job}</h1>
          <p className="hero-desc" data-product-reveal="left">{item.copy}</p>
          <div className="actions" data-product-reveal="up">
            {report ? <button className="btn product-primary" onClick={staticExample}><Icon name="download"/>Download the example record</button> : <Demo className="product-primary" direct text={audit ? 'Open the Placement Audit demo' : 'See the workflow in the demo'}/>}
            <Pilot className="white-outline"/>
          </div>
          <a className="product-cue" href="#workflow" data-product-reveal="up">See how it works <Icon name="down" className="action-icon"/></a>
        </div>
        <div className="product-stage" data-product-reveal="right"><ProductScene product={item.key}/></div>
      </div>
    </section>
    <section className="chapter product-workflow" id="workflow">
      <div className="wrap split">
        <div>
          <p className="eyebrow workflow-label" data-reveal="up">How {item.name} works</p>
          <ol className="product-steps">
            {item.features.map(([title, description], index) => <li key={title} data-reveal="left">
              <span className="workflow-step" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h2>{title}</h2><p>{description}</p></div>
            </li>)}
          </ol>
        </div>
        <div data-reveal="right"><ProductEvidence product={item.key}/></div>
      </div>
    </section>
    {audit && <section className="chapter ink"><div className="wrap">
      <Lead label="Placement Audit" title="Inspect both cases." copy="Review a covered replay and an unobserved venue window in the same workbench."/>
      <Workbench preview/>
    </div></section>}
    <section className="chapter"><div className="wrap">
      <Lead title="Follow the rest of the workflow."/><Cards items={offers.filter(other => other.key !== item.key)}/>
    </div></section>
    <ActionBar product={item}/>
  </div>;
}

export function InfoPage({page}) {
  return <><Hero label={page.name} title={page.title} lead={page.lead} art={page.art}><div className="actions"><a className="btn primary" href={page.action[1]}>{page.action[0]}</a></div></Hero><FeatureList parts={page.parts} art={page.art}/></>;
}
export function DemoLanding(){
  return <><Hero label={DEMO_LABEL} title="Audit a fictional opening replay." lead="Read the agreement, compare the main broadcast and official vertical feed, then choose how the record should read." art="report"><div className="actions"><Demo direct text="Start the walkthrough"/><a className="btn light" href="/demo/buyer-account">Open simulated buyer account</a></div></Hero><section className="chapter sky"><div className="wrap split"><Lead title="Two placements. Two evidence states." copy="PA-001 has a source-backed discrepancy for review. PA-002 remains open until a venue source is available."/><ReportArt/></div></section></>;
}
export function DemoPage(){
  return <section className="chapter ink demo-page"><div className="wrap"><p className="eyebrow">{DEMO_LABEL}</p><h1>Placement Audit workbench.</h1><p className="hero-desc">Review the signed schedule, inspect sources and save a simulated decision in this browser.</p><Workbench/></div></section>;
}
const buyerRows=[
  ['Buyer and budget owner','Morgan Hale · Head of Partnership Reporting'],
  ['Organization','North Quay Rights Group · Fictional rights holder'],
  ['Named operator','Robin Bell · Media Measurement Operations Lead'],
  ['Assigned reviewer','Casey Noor · Sponsorship Analyst'],
  ['Feed permission','Representative pilot recordings · Permission pending'],
  ['Baseline','Exposure dashboard, approved schedule, annotations and reconciled delivery report'],
  ['Proposed scope','Placement Audit · 30 authorized event-hours'],
  ['Commercial status','Quote and signed scope pending'],
  ['Next action','Confirm recording and artwork permission, then agree on baseline with the budget owner.'],
];
export function Buyer(){
  return <><Hero label={DEMO_LABEL} title="Pilot buyer account." lead="A fictional account showing the people, permissions and agreements needed for a paid evaluation." art="clause"><div className="actions"><Demo direct text="Open the case workbench"/></div></Hero><section className="chapter sky"><div className="wrap crm"><h2>North Quay Rights Group</h2><span className="demo-flag">{DEMO_LABEL}</span><dl>{buyerRows.map(([key,value])=><div className="artifact-rule" key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></div></section></>;
}
export function Evaluation(){
  return <><Hero label="Paid pilot" title="Evaluate one Placement Audit against your current process." lead="Fund a scoped comparison across 30 authorized event-hours using your schedule, reports and clip annotations." art="report"><div className="actions"><Pilot/></div></Hero>
    <section className="chapter sky"><div className="wrap"><Lead title="Agree the scope before reviewing results." copy="The budget owner agrees the paid scope. Data owners authorize sources. A named reviewer agrees the baseline and comparison protocol."/><Scorecard/></div></section><FeatureList art="clause" parts={[['Bring approved inputs','Supply placement terms, a schedule, authorized footage, approved marks, reconciled reports and human clip annotations.'],['Agree the thresholds','Decide what counts as a miss, false flag and analyst time. Include incomplete evidence and adverse outcomes.'],['Decide whether to proceed','Review results alongside the incumbent, with the reviewer and buyer present.']]}/><ActionBar/></>;
}
export function Intake({contact=false}){
  const [receipt,setReceipt]=useState(null);
  const defaults=new URLSearchParams(window.location.search);
  const options=contact?['Paid Placement Audit','Fictional demo feedback','Production or measurement partnership','Workspace access','Privacy']:['Paid Placement Audit','Later evaluation','Information only'];
  function submit(event){
    event.preventDefault();
    const details=Object.fromEntries(new FormData(event.currentTarget));
    setReceipt({label:'LOCAL CONCEPT PREVIEW · NOT SENT',purpose:contact?'Contact inquiry':'Placement Audit pilot interest',details});
  }
  return <><Hero label={contact?'Contact':'Pilot intake'} title={contact?'Talk to SponsorEvidence.':'Request a paid Placement Audit pilot.'} lead={contact?'Ask about a pilot, share feedback on the fictional case, or discuss a permitted feed handoff.':'Tell us which event package you want to review and who can authorize access.'}/><section className="chapter sky form-section"><div className="wrap split"><div>
    <form className="intake" onSubmit={submit}>
      <div><h2>{contact?'Your inquiry':'Scope your evaluation'}</h2><p>Preview only. This form prepares a local record for you to download.</p></div>
      <div className="form-grid"><label>Contact name<input name="name" autoComplete="name" required/></label><label>Work email<input name="email" type="email" autoComplete="email" required/></label><label>Organization<input name="organization" autoComplete="organization" required/></label><label>Role<input name="role" autoComplete="organization-title" required/></label></div>
      <label>{contact?'Topic':'Pilot interest'}<select name="interest" defaultValue={options.includes(defaults.get('topic'))?defaults.get('topic'):options[0]}>{options.map(option=><option key={option}>{option}</option>)}</select></label>
      {!contact&&<div className="form-grid"><label>Event package<input name="event_package" /></label><label>Permitted feeds<select name="feeds"><option>To confirm</option><option>Main broadcast and vertical</option><option>Venue feed</option><option>Multiple or other feeds</option></select></label><label>Data permission<select name="data_permission"><option>Unsure</option><option>Permission pending</option><option>Authorized for pilot discussion</option></select></label><label>Current reporting workflow<input name="baseline" /></label><label>Expected event-hours<select name="event_hours"><option>To confirm</option><option>Under 30</option><option>30–100</option><option>More than 100</option></select></label><label>Sponsor count<select name="sponsor_count"><option>To confirm</option><option>1–5</option><option>6–20</option><option>More than 20</option></select></label><label>Approval owner<input name="approval_owner" placeholder="Role or team"/></label></div>}
      <label>{contact?'Your message':'Placement or question'}<textarea name="message" rows="4" placeholder="Leave private footage, agreement text and sponsor artwork out of this form."/></label>
      <label>Follow-up preference<select name="follow_up" required defaultValue=""><option disabled value="">Choose an option</option><option>Contact me about this inquiry</option><option>Register interest only</option></select></label>
      <button className="btn primary" type="submit">{contact?'Prepare inquiry':'Prepare pilot request'}</button>
      {receipt&&<div role="status" className="receipt"><strong>Preview record prepared in this browser.</strong><button type="button" className="text-link" onClick={()=>downloadJson('SponsorEvidence-local-inquiry.json',receipt)}>Download your record</button></div>}
    </form></div>
    <aside className="intake-aside"><h2>{contact?'Before reaching out':'Proposed scope'}</h2><p>{contact?'Discuss the workflow and who can authorize access.':'Placement Audit · 30 authorized event-hours proposed. Price quoted after scope.'}</p><ReportArt/><a className="text-link" href="/privacy">Read preview privacy details</a></aside>
  </div></section></>;
}
export function SignIn(){
  const [checked,setChecked]=useState(false);
  return <><Hero label="Workspace access" title="Sign in to your reporting workspace." lead="Review feed evidence, open items and sponsor reports." art="report"/>
    <section className="chapter sky"><div className="wrap split">
      <form className="intake" onSubmit={event=>{event.preventDefault();setChecked(true);}}>
        <div><h2>Workspace by invitation.</h2><p>This concept has no connected authentication. You can preview the sign-in form or explore a fictional workspace.</p></div>
        <label>Work email<input type="email" name="email" autoComplete="email" required/></label>
        <button className="btn primary" type="submit">Continue</button>
        {checked&&<p role="status">You’re in the concept preview. No sign-in link was sent.</p>}
        <div className="actions"><a href="/contact?topic=Workspace%20access" className="btn light">Request workspace access</a><Demo className="light"/></div>
      </form><Graphic kind="map"/>
    </div></section></>;
}
export function resolvePage(path){
  if(path==='/about')return <AboutPage/>;
  if(info[path])return <InfoPage page={info[path]}/>;
  if(path==='/demo')return <DemoLanding/>;
  if(path==='/demo/placement-audit')return <DemoPage/>;
  if(path==='/demo/buyer-account')return <Buyer/>;
  if(path==='/evaluation')return <Evaluation/>;
  if(path==='/pricing')return <PricingPage/>;
  if(path==='/contact')return <Intake contact/>;
  if(path==='/evaluation/request')return <Intake/>;
  if(path==='/sign-in')return <SignIn/>;
  if(path==='/platform')return <Platform/>;
  if(path==='/solutions')return <UseCaseIndex/>;
  const [,type,key,extra]=path.split('/');
  const items=type==='platform'?offers:type==='solutions'?solutions:[];
  const item=items.find(entry=>entry.key===key);
  if(item && extra===undefined)return type==='platform'?<ProductDetail item={item}/>:<UseCaseDetail item={item}/>;
  return <Hero label="Page not found" title="This page isn’t in the atlas." lead="Use the navigation to find the product, demo or pilot." art="map"><a className="btn primary" href="/">Go to the homepage</a></Hero>;
}
