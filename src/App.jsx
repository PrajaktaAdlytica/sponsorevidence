import { useEffect, useRef, useState } from 'react';
import { Footer, Header } from './chrome';
import { Home } from './home';
import { resolvePage } from './pages';
import { info, offers, solutions } from './content';
import { useAtlasMotion } from './motion';

const path=location.pathname.replace(/\/+$/,'') || '/';
const home=path==='/';
const workflow=path.startsWith('/demo/')||['/evaluation/request','/contact','/sign-in','/privacy','/terms'].includes(path);
const labels={'/platform':'Platform','/solutions':'Use cases','/demo':'Demo','/demo/placement-audit':'Placement Audit workbench','/demo/buyer-account':'Simulated buyer account','/evaluation':'Paid pilot','/evaluation/request':'Pilot request','/pricing':'Pricing','/contact':'Contact','/sign-in':'Sign in'};
const slug=path.split('/').at(-1);
const routeLabel=info[path]?.name||labels[path]||[...offers,...solutions].find(item=>item.key===slug)?.name;
const reduceMotion = '(prefers-reduced-motion: reduce)';

export default function App(){
  const root=useRef(null);
  const [userMotion,setMotion]=useState(()=>{
    try{return localStorage.getItem('se-motion')!=='off';}catch{return true;}
  });
  const [reduced,setReduced]=useState(()=>window.matchMedia(reduceMotion).matches);
  const motion=userMotion&&!reduced;
  useEffect(()=>{
    const preference=window.matchMedia(reduceMotion);
    const onChange=event=>setReduced(event.matches);
    preference.addEventListener('change',onChange);
    return ()=>preference.removeEventListener('change',onChange);
  },[]);
  function updateMotion(value){
    setMotion(value);
    try{localStorage.setItem('se-motion',value?'on':'off');}catch{}
  }
  useEffect(()=>{
    if(routeLabel)document.title=routeLabel+' | SponsorEvidence';
    if(location.hash){
      const id=location.hash.slice(1);
      requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView());
    }
  },[]);
  useAtlasMotion(root,motion&&!workflow,home);
  return <div id="top" ref={root} className={`app ${motion?'motion-on':'motion-off'}`}>
    <Header motion={motion} setMotion={updateMotion} reducedMotion={reduced}/>
    <main id="main" tabIndex="-1">{home?<Home motion={motion}/>:resolvePage(path)}</main>
    <Footer/>
  </div>;
}
