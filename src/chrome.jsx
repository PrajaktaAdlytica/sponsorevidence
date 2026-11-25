import { useEffect, useRef, useState } from 'react';
import { offers, solutions, faq, metrics } from './content';
import { Graphic } from './visuals';
import { recordEvent } from './workbench';
import { Icon } from './icons';

export function Brand({ reversed = false }) {
  return (
    <a className="brand" href="/" aria-label="SponsorEvidence home">
      <img src={reversed ? '/brand/logo-reversed.svg' : '/brand/logo.svg'} alt="" width="438" height="72" />
    </a>
  );
}
export function Pilot({text='Request a paid pilot', className='primary', placement='page'}) {
  return <a className={'btn '+className} href="/evaluation/request" onClick={()=>recordEvent('pilot_cta_click',placement)}>{text}<Icon name="arrow" className="action-icon"/></a>;
}
export function Demo({text='Explore the demo', className='primary', direct=false}) {
  return <a className={'btn '+className} href={direct?'/demo/placement-audit':'/demo'} onClick={()=>{if(direct)recordEvent('demo_start','direct');}}><Icon name="play"/>{text}</a>;
}
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

export function Header({ motion, setMotion, reducedMotion }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shell = useRef(null);
  const products = useRef(null);
  const productsButton = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    function updateScroll() {
      setScrolled(window.scrollY > 12);
    }
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !productsOpen) return;
    function onOutside(event) {
      if (!shell.current?.contains(event.target)) {
        setProductsOpen(false);
        setMobileOpen(false);
      } else if (!products.current?.contains(event.target)) {
        setProductsOpen(false);
      }
    }
    function onKey(event) {
      if (event.key !== 'Escape') return;
      if (productsOpen) {
        setProductsOpen(false);
        productsButton.current?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    }
    function onFocus(event) {
      if (!products.current?.contains(event.target)) setProductsOpen(false);
      if (!shell.current?.contains(event.target)) setMobileOpen(false);
    }
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
    };
  }, [mobileOpen, productsOpen]);

  function toggleMenu() {
    setMobileOpen(!mobileOpen);
    setProductsOpen(false);
  }

  const navLinks = [['Use cases', '/solutions'], ['Resources', '/resources/methodology'], ['Pricing', '/pricing']];
  return <>
    <a className="skip-link" href="#main">Skip to main content</a>
    <header className="header" ref={shell} data-scrolled={scrolled}>
      <div className="wrap header-inner">
        <Brand/>
        <button className="menu-toggle control" ref={menuButton} type="button" aria-controls="primary-navigation" aria-expanded={mobileOpen} onClick={toggleMenu}>
          {mobileOpen ? 'Close menu' : 'Menu'}
        </button>
        <nav className={mobileOpen ? 'navigation is-open' : 'navigation'} id="primary-navigation" aria-label="Main navigation" data-lenis-prevent>
          <div className="nav-products" ref={products}>
            <button className="nav-item product-trigger" ref={productsButton} type="button" aria-controls="product-navigation" aria-expanded={productsOpen} data-current={currentPath.startsWith('/platform')} onClick={() => setProductsOpen(!productsOpen)}>
              Products <span className="nav-chevron" aria-hidden="true"/>
            </button>
            <div className="product-nav-panel" id="product-navigation" hidden={!productsOpen}>
              <div className="product-nav-intro">
                <span className="eyebrow">The platform</span>
                <h2>From the mark to the report.</h2>
                <a className="text-link" href="/platform" aria-current={currentPath === '/platform' ? 'page' : undefined}>Explore the platform</a>
              </div>
              <ul className="product-nav-list">
                {offers.map(offer => {
                  const href = '/platform/' + offer.key;
                  return <li key={offer.key}><a className="product-nav-link" href={href} aria-current={currentPath === href ? 'page' : undefined}>
                    <span className={'product-nav-accent ' + offer.color}><Icon name={offer.art}/></span>
                    <span><strong>{offer.name}</strong><small>{offer.job}</small></span>
                  </a></li>;
                })}
              </ul>
            </div>
          </div>
          {navLinks.map(([name, href]) => <a className="nav-item" key={href} href={href} aria-current={currentPath === href ? 'page' : undefined}>{name}</a>)}
          <div className="nav-end">
            <a className="nav-item nav-signin" href="/sign-in" aria-current={currentPath === '/sign-in' ? 'page' : undefined}>Sign in</a>
            <a className="nav-item nav-demo" href="/demo" aria-current={currentPath === '/demo' ? 'page' : undefined}>Live demo</a>
            <Pilot placement="header"/>
          </div>
        </nav>
        <button type="button" className="motion-switch" aria-pressed={motion} disabled={reducedMotion} title={reducedMotion ? 'Reduced motion is enabled on this device' : undefined} onClick={() => setMotion(!motion)}><Icon name={motion ? 'pause' : 'play'}/>{motion ? 'Motion on' : 'Motion off'}</button>
      </div>
      <div className="chapter-progress" aria-hidden="true"/>
    </header>
  </>;
}

const footerLinks = [
  ['Products', [['Platform overview', '/platform'], ...offers.map(offer => [offer.name, '/platform/' + offer.key])]],
  ['Use cases', solutions.map(item => [item.name, '/solutions/' + item.key])],
  ['Resources', [['Live demo', '/demo'], ['Paid evaluation', '/evaluation'], ['Pricing', '/pricing'], ['Methodology', '/resources/methodology'], ['Sources', '/resources/sources']]],
  ['Company', [['About', '/about'], ['Contact', '/contact'], ['Sign in', '/sign-in'], ['Data & permissions', '/trust']]],
];

export function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-mast">
        <div><Brand reversed/><p>Sports sponsorship delivery verification.</p></div>
        <div className="footer-action">
          <p>Open the fictional audit or discuss a paid evaluation.</p>
          <div className="actions"><Demo className="white-outline"/><Pilot className="accent" placement="footer"/></div>
        </div>
      </div>
      <nav className="footer-grid" aria-label="Footer navigation">
        {footerLinks.map(([title, links]) => <section key={title}><h2>{title}</h2>{links.map(([label, url]) => <a key={url} href={url}>{label}</a>)}</section>)}
      </nav>
      <div className="footer-end">
        <span>© SponsorEvidence · Concept preview</span>
        <div><a href="/privacy">Privacy</a><a href="/terms">Preview terms</a><a className="back-to-top" href="#top">Back to top <Icon name="down"/></a></div>
      </div>
    </div>
  </footer>;
}
export function Lead({label,title,copy,children}){
  return <div className="section-lead">
    {label&&<p className="eyebrow" data-reveal="up">{label}</p>}
    <h2 data-reveal="up">{title}</h2>
    {copy&&<p className="lead-copy" data-reveal="right">{copy}</p>}
    {children}
  </div>;
}
export function Cards({items,base='/platform'}){
  return <div className="card-grid">{items.map(item=><article key={item.key} className={'product-card '+item.color} data-reveal="up">
    <div className="product-text"><span className="product-icon"><Icon name={item.art}/></span><h3>{item.name}</h3><p><strong>{item.job}</strong></p><p>{item.copy}</p></div>
    <div className="offer-art"><Graphic kind={item.art}/></div>
    <a className="text-link card-link" href={base+'/'+item.key}>Explore {item.name}<Icon name="arrow" className="action-icon"/></a>
  </article>)}</div>;
}
export function Pricing(){
  return <div className="pricing-grid"><article className="price-card" data-reveal="left"><span className="eyebrow">First paid evaluation</span><h3>Placement Audit</h3><p className="price">Quoted after scope</p><p>One agreed event package, feed set and reviewer protocol.</p><ul><li>Proposed sample of 30 authorized event-hours</li><li>Comparison with your reporting baseline</li><li>Reviewed evidence and evaluation scorecard</li></ul><Pilot text="Discuss a pilot quote" placement="price"/></article><article className="price-card" data-reveal="right"><span className="eyebrow">Proposed annual license</span><h3>Rights-holder license</h3><p className="price">$42,000 <small>/ year</small></p><p><strong>Planning hypothesis.</strong> Quote depends on broadcast hours and sponsor count.</p><ul><li>Scope agreed separately during discovery</li><li>Four proposed workflow modules</li><li>Renewal and implementation to evaluate</li></ul><a className="btn light" href={location.pathname.replace(/\/+$/,'') === '/pricing' ? '/evaluation' : '/pricing'}>{location.pathname.replace(/\/+$/,'') === '/pricing' ? 'Review the evaluation' : 'View proposed pricing'}</a></article></div>;
}
export function Scorecard(){
  return <div id="scorecard" className="scorecard"><div className="artifact-rule"><strong>Evaluation scorecard</strong><span>30 authorized event-hours proposed</span></div><div className="table-scroll" tabIndex="0" role="region" aria-label="Pilot scorecard table"><table><thead><tr><th>Measure</th><th>Current baseline</th><th>Placement Audit</th><th>Agreed threshold</th></tr></thead><tbody>{metrics.map(([name,copy])=><tr key={name}><th scope="row">{name}<span>{copy}</span></th><td>To record</td><td>To record</td><td>To agree</td></tr>)}</tbody></table></div></div>;
}
export function FAQ({items=faq}={}){return <div className="faqs">{items.map(([title,copy])=><details key={title} data-reveal="up"><summary>{title}<Icon name="chevron"/></summary><p>{copy}</p></details>)}</div>;}
