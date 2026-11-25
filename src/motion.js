import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function topOffset() {
  return Math.ceil(document.querySelector('.header')?.getBoundingClientRect().height || 0);
}

const approachDistance = () => window.innerWidth >= 800 ? 68 : 25;
const incoming = {
  left: { x: () => -approachDistance() },
  right: { x: approachDistance },
  up: { y: 24 },
  down: { y: -24 },
};
const outgoing = {
  left: { x: () => approachDistance() * .66 },
  right: { x: () => -approachDistance() * .66 },
  up: { y: -16 },
  down: { y: 16 },
};

function bindScrollVideo(video) {
  let progress = 0;
  function updateFrame() {
    if (video.seeking || !Number.isFinite(video.duration)) return;
    const lastFrame = Math.max(0, video.duration - 1 / 24);
    const target = Math.min(lastFrame, Math.round(progress * lastFrame * 24) / 24);
    if (Math.abs(video.currentTime - target) >= 1 / 24) video.currentTime = target;
  }
  const cue = ScrollTrigger.create({
    trigger: video.closest('section'),
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => { progress = self.progress; updateFrame(); },
  });
  video.addEventListener('loadedmetadata', updateFrame);
  video.addEventListener('seeked', updateFrame);
  return () => {
    cue.kill();
    video.removeEventListener('loadedmetadata', updateFrame);
    video.removeEventListener('seeked', updateFrame);
  };
}

function revealFrame(element, direction) {
  gsap.timeline({ scrollTrigger: {
    trigger: element, start: 'top 99%', end: 'bottom 8%',
    scrub: .42, invalidateOnRefresh: true,
  }})
    .fromTo(element, { ...incoming[direction], opacity: .54 }, {
      x: 0, y: 0, opacity: 1, duration: .23, ease: 'power2.out',
    })
    .to(element, { ...outgoing[direction], opacity: .82, duration: .18, ease: 'power1.in' }, .82);
}

function fieldHeroMotion(hero, parts, field) {
  const direction = element => element.dataset.productReveal || element.dataset.pageReveal;
  const intro = gsap.timeline({ scrollTrigger: {
    trigger: hero, start: 'top 92%', end: 'bottom 12%', toggleActions: 'play none restart reset',
  }});
  intro.from(parts, {
    x: (_, element) => ({ left: -28, right: 34 }[direction(element)] || 0),
    y: (_, element) => direction(element) === 'up' ? 18 : 0,
    opacity: .48, duration: .65, stagger: .07, ease: 'power3.out',
  });
  const drift = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .58 } });
  drift.to(field, { scale: 1.11, yPercent: 3, ease: 'none' }, 0);
  return { intro, drift };
}

function animateProductPage(page) {
  const hero = page.querySelector('.product-hero');
  const stage = hero.querySelector('.product-stage');
  const { intro, drift } = fieldHeroMotion(hero, hero.querySelectorAll('[data-product-reveal]'), hero.querySelector('.product-field'));

  switch (page.dataset.product) {
    case 'sponsor-assets':
      intro.from(stage.querySelector('.specimen-guides'), { scale: 1.13, opacity: .25, duration: .75, ease: 'power3.out' }, .34)
        .fromTo(stage.querySelector('.specimen-scan'), { xPercent: -100, opacity: .9 }, { xPercent: 100, opacity: 0, duration: 1.25, ease: 'power2.inOut' }, .42);
      drift.to(stage.querySelector('.specimen-guides'), { xPercent: 2, yPercent: 2, ease: 'none' }, 0);
      break;
    case 'exposure-analytics':
      intro.from(stage.querySelector('.main-track b, .venue-track span'), { scaleX: 0, transformOrigin: 'left center', duration: .82, ease: 'power3.out' }, .48)
        .from(stage.querySelector('.exposure-screen'), { x: 12, opacity: .48, duration: .55 }, .5);
      drift.to(stage.querySelector('.exposure-playhead'), { left: '84%', ease: 'none' }, 0);
      break;
    case 'placement-audit':
      intro.from(stage.querySelectorAll('.audit-stream'), { x: index => index === 0 ? -12 : 12, opacity: .43, duration: .52, stagger: .11 }, .43)
        .from(stage.querySelector('.audit-note'), { y: 10, opacity: .5, duration: .5 }, .63);
      drift.to(stage.querySelector('.audit-note'), { '--audit-trace': 1, ease: 'none' }, 0);
      break;
    case 'sponsor-report':
      intro.from(stage.querySelector('.report-packet'), { '--packet-offset': '0px', duration: .7, ease: 'power3.out' }, .37)
        .from(stage.querySelectorAll('.report-packet li'), { x: 10, opacity: .45, duration: .47, stagger: .13 }, .47);
      drift.to(stage.querySelector('.report-packet'), { '--packet-drift': '4px', ease: 'none' }, 0);
      break;
  }

  gsap.to(page.querySelector('.product-close .product-field'), {
    scale: 1.12, ease: 'none',
    scrollTrigger: { trigger: page.querySelector('.product-close'), start: 'top bottom', end: 'bottom top', scrub: .65 },
  });
}

function animateEditorialPage(page) {
  const hero = page.querySelector('.editorial-hero');
  const stage = hero.querySelector('.editorial-stage');
  const { intro, drift } = fieldHeroMotion(hero, hero.querySelectorAll('[data-page-reveal]'), hero.querySelector('.pitch-bg'));
  intro.from(stage.querySelectorAll('[data-exhibit-reveal]'), {
    x: (_, element) => ({ left: -14, right: 14 }[element.dataset.exhibitReveal] || 0),
    y: (_, element) => element.dataset.exhibitReveal === 'up' ? 10 : 0,
    opacity: .45, duration: .56, stagger: .09, ease: 'power2.out',
  }, .42);
  drift.to(stage.querySelector('.exhibit-progress'), { '--exhibit-progress': 1, ease: 'none' }, 0);

  const routes = stage.querySelectorAll('.route-line');
  if (routes.length) intro.fromTo(routes, { strokeDashoffset: .87 }, { strokeDashoffset: 0, stagger: .08, duration: .72 }, .55);
  const bar = stage.querySelector('.agency-evidence .main-track b');
  if (bar) intro.from(bar, { scaleX: 0, transformOrigin: 'left center', duration: .65 }, .61);
  const photo = stage.querySelector('.about-exhibit-photo img');
  if (photo) drift.to(photo, { scale: 1.12, ease: 'none' }, 0);
}

export function useAtlasMotion(root,enabled,isHome) {
  useEffect(()=>{
    const main=root.current;
    if(!main || !enabled) return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(reduced.matches) return;
    const lenis=new Lenis({autoRaf:false,smoothWheel:true,lerp:.12});
    const tick=(t)=>lenis.raf(t*1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const mm=gsap.matchMedia();
    let step=()=>{};
    let onFocus=()=>{};
    const videoCleanup = [];
    const ctx=gsap.context(()=>{
      const product = main.querySelector('.product-page');
      const editorial = main.querySelector('.editorial-page');
      main.querySelectorAll('[data-reveal]').forEach(element => {
        const direction = element.dataset.reveal;
        if (isHome || product || editorial) {
          if (!element.closest('.atlas-track')) revealFrame(element, direction);
          return;
        }
        gsap.from(element, { ...incoming[direction], opacity: 0, duration: .57, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
      if (product) animateProductPage(product);
      if (editorial) animateEditorialPage(editorial);
      main.querySelectorAll('.home-field,.editorial-close').forEach(section => {
        gsap.to(section.querySelector('.pitch-bg'), { scale: 1.1, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: .65 } });
      });
      if (isHome || product || editorial) {
        gsap.to('.chapter-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: main.querySelector('main'), start: 'top top', end: 'bottom bottom', scrub: .28 } });
      }
      if(!isHome)return;
      main.querySelectorAll('[data-scroll-video]').forEach(video => videoCleanup.push(bindScrollVideo(video)));
      const titleParts = main.querySelectorAll('[data-cinema-reveal]');
      gsap.from(titleParts, {
        x: (_, element) => element.dataset.cinemaReveal === 'left' ? -34 : 34,
        opacity: 0, duration: .74, stagger: .095, ease: 'power3.out',
        scrollTrigger: { trigger: '.cinema', start: 'top 88%', end: 'bottom 12%', toggleActions: 'play reverse play reverse' },
      });
      gsap.fromTo('.cinema-plate', { scale: 1.02 }, {
        scale: 1.085, yPercent: 4, ease: 'none',
        scrollTrigger: { trigger: '.cinema', start: 'top top', end: 'bottom top', scrub: .7 },
      });
      gsap.timeline({ scrollTrigger: { trigger: '.cinema', start: 'top 85%', end: 'bottom 15%', toggleActions: 'restart reset restart reset' } })
        .fromTo('.monitor-scan', { yPercent: -100, opacity: 0 }, { opacity: .7, duration: .2 }, .35)
        .to('.monitor-scan', { yPercent: 0, duration: 1.45, ease: 'power1.inOut' }, .35)
        .to('.monitor-scan', { opacity: 0, duration: .23 }, 1.62);
      gsap.timeline({ scrollTrigger: { trigger: '.cinema', start: 'top top', end: 'bottom top', scrub: .65 } })
        .to('.monitor-screen img', { scale: 1.15, xPercent: 2, ease: 'none' }, 0)
        .to('.monitor-target', { scale: .79, xPercent: 10, yPercent: -4, ease: 'none' }, 0);
      gsap.timeline({ scrollTrigger: { trigger: '#compare', start: 'top 90%', end: 'top 30%', scrub: .52 } })
        .fromTo('.comparison-board .shot:not(.vertical-shot) .shot-frame',
          { clipPath: 'inset(0 24% 0 0)' }, { clipPath: 'inset(0%)', duration: .6 }, 0)
        .fromTo('.comparison-board .vertical-shot .shot-frame',
          { clipPath: 'inset(0 0 0 36%)' }, { clipPath: 'inset(0%)', duration: .6 }, .12)
        .from('#compare .main-track b', { scaleX: 0, transformOrigin: 'left', duration: .44 }, .28);
      gsap.to('.trace', { '--trace-drawn': 1, ease: 'none', scrollTrigger: { trigger: '.trace', start: 'top 90%', end: 'top 52%', scrub: .45 } });
      mm.add('(min-width: 1100px) and (min-height: 800px)',()=>{
        const hero=main.querySelector('.hero');
        const heroMotion=gsap.timeline({scrollTrigger:{
          trigger:hero,start:()=>`top ${topOffset()}px`,end:'+=260',pin:true,scrub:.63,anticipatePin:1,refreshPriority:2,
        }});
        heroMotion.fromTo('.hero .route-line',{strokeDashoffset:.88},{strokeDashoffset:0,stagger:.25,ease:'none',duration:.7})
          .fromTo('.film-frames',{x:10},{x:-9,ease:'none',duration:.75},0)
          .fromTo('.hero .map-coordinate',{opacity:.5,y:9},{opacity:1,y:0,duration:.48},.34);
        const windowEl=main.querySelector('.atlas-window');
        const track=main.querySelector('.atlas-track');
        const cards=Array.from(track.querySelectorAll('.product-card'));
        const atlas=main.querySelector('#products');
        const distance=()=>Math.max(1,track.scrollWidth-windowEl.clientWidth);
        const tl=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{
          trigger:atlas,start:()=>`top ${topOffset()}px`,end:()=>'+='+Math.max(430,distance()),pin:true,
          scrub:.6,invalidateOnRefresh:true,anticipatePin:1,refreshPriority:1,
        }});
        const goTo=(index,immediate=false)=>{
          const next=Math.max(0, Math.min(index,cards.length-1));
          const offset=Math.min(distance(),cards[next].offsetLeft)/distance();
          const t=tl.scrollTrigger;
          lenis.scrollTo(t.start+offset*(t.end-t.start),{immediate,duration:.5});
        };
        step=(event)=>{
          const t=tl.scrollTrigger;
          const x=t.progress*distance();
          const offsets=cards.map(card=>Math.min(distance(),card.offsetLeft));
          let index=offsets.reduce((best,v,i)=>Math.abs(v-x)<Math.abs(offsets[best]-x)?i:best,0);
          if(event.detail<0 && x>=distance()-1)index=offsets.findIndex(value=>value>=distance()-1);
          goTo(index+event.detail);
        };
        onFocus=(event)=>{
          const card=event.target.closest('.product-card');
          if(!card) return;
          requestAnimationFrame(()=>goTo(cards.indexOf(card),true));
        };
        document.addEventListener('atlas-step',step);
        track.addEventListener('focusin',onFocus);
        return ()=>{
          document.removeEventListener('atlas-step',step);
          track.removeEventListener('focusin',onFocus);
        };
      });
      const rail=main.querySelector('.chapter-nav');
      for(const link of rail.querySelectorAll('a')){
        const chapter=main.querySelector(link.getAttribute('href'));
        if(chapter) ScrollTrigger.create({trigger:chapter,start:'top 42%',end:'bottom 42%',
          onToggle:({isActive})=>{if(isActive)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}});
      }
    },main);
    function onAnchor(event){
      const link=event.target.closest('a[href^="#"]');
      const selector=link?.getAttribute('href');
      if(!selector || selector==='#' || link.classList.contains('skip-link')) return;
      const destination=document.getElementById(selector.slice(1));
      if(!destination) return;
      event.preventDefault();
      history.pushState(null,'',selector);
      lenis.resize();
      lenis.scrollTo(destination,{onComplete:()=>{destination.setAttribute('tabindex','-1');destination.focus({preventScroll:true});}});
    }
    document.addEventListener('click',onAnchor);
    const refresh=()=>ScrollTrigger.refresh();
    document.fonts.ready.then(()=>{if(main.isConnected)refresh();});
    return ()=>{
      document.removeEventListener('click',onAnchor);
      videoCleanup.forEach(cleanup => cleanup());
      mm.revert();ctx.revert();
      main.querySelectorAll('.chapter-nav [aria-current]').forEach(link=>link.removeAttribute('aria-current'));
      gsap.ticker.remove(tick);lenis.destroy();
    };
  },[enabled,isHome,root]);
}
