import { useEffect, useState } from 'react';
import fixture from './demo.json';
import { Clause, Shot, Timeline } from './visuals';
import { Icon } from './icons';

export const DEMO_LABEL = fixture.data_label;
const storageKey = 'se-review-v1';

export function recordEvent(name, category='') {
  try {
    const past = JSON.parse(sessionStorage.getItem('se-events') || '{}');
    const key = name + (category ? '/' + category : '');
    past[key]=(past[key]||0)+1;
    sessionStorage.setItem('se-events',JSON.stringify(past));
  } catch {}
}

export function downloadJson(name, value) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value,null,2)], { type: 'application/json' }));
  const link=document.createElement('a');
  link.href=url; link.download=name; link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function staticExample() {
  downloadJson('SponsorEvidence-DEMO-example.json',fixture);
}

export function Workbench({preview=false}) {
  const [index,setIndex]=useState(0);
  const [seconds,setSeconds]=useState(0);
  const [playing,setPlaying]=useState(false);
  const [sourceTab,setSourceTab]=useState(false);
  const [review,setReview]=useState(()=>{
    if(preview) return {};
    try {return JSON.parse(localStorage.getItem(storageKey)||'{}')||{};} catch {return {};}
  });
  const item=fixture.cases[index];
  const isVenue=index===1;
  const decision=review[item.case_id];
  const timecode=`00:18:${42+Math.floor(seconds)}`;
  const state=isVenue ? 'Open · evidence incomplete' : decision==='confirmed' ? 'Confirmed discrepancy' : decision==='open' ? 'Open · review pending' : 'Needs review';
  useEffect(()=>{
    if(!playing) return;
    const tick=window.setInterval(()=>setSeconds(p=>Math.min(5,p+.25)),250);
    return ()=>clearInterval(tick);
  },[playing]);
  useEffect(()=>{if(seconds>=5)setPlaying(false);},[seconds]);
  function selectCase(i){setIndex(i);setPlaying(false);setSeconds(0);setSourceTab(false);recordEvent('reviewer_interaction','select_case');}
  function decide(value){
    if(preview) return;
    const next={...review,[item.case_id]:value};
    setReview(next);
    try { localStorage.setItem(storageKey,JSON.stringify(next)); } catch {}
    recordEvent('reviewer_interaction','record_decision');
  }
  function reset(){
    const next={...review};
    delete next[item.case_id];
    setReview(next);
    try {localStorage.setItem(storageKey,JSON.stringify(next));} catch {}
  }
  function download(){
    const current = structuredClone(item);
    const hasExampleDecision = isVenue ? decision === 'open' : decision === 'confirmed';
    if (!hasExampleDecision) {
      current.reviewed_decision = null;
      current.decision_history = current.decision_history.filter(entry => entry.actor_role !== item.assigned_reviewer.role);
    }
    if(!isVenue && decision!=='confirmed'){
      if(decision==='open') {
        current.reviewed_decision={outcome:'open_review_pending',rationale:'The reviewer left the item open.'};
        current.decision_history.push({action:'keep_open',actor_role:item.assigned_reviewer.role});
      }
      current.commercial_follow_up={status:'review_pending',owner_role:'Commercial lead',next_action:'Await a reviewed finding.'};
    }
    current.export_status={...current.export_status,measurement_review:state,sponsor_facing_distribution:'not_authorized_by_demo'};
    downloadJson('SponsorEvidence-DEMO-' + current.case_id + '.json',{schema_version:fixture.schema_version,data_label:DEMO_LABEL,case:current});
  }
  return <div className="workbench">
    <div className="workbench-top"><span>Meridian Coast Cup <b>/</b> Placement Audit</span><span className="demo-flag">{DEMO_LABEL}</span></div>
    <div className="workbench-layout">
      <aside className="workbench-queue"><h3>Evidence queue</h3>
        {fixture.cases.map((record,i)=><button key={record.case_id} type="button" aria-pressed={index===i} onClick={()=>selectCase(i)}>
          <span>{record.case_id} · {record.requirement.term_id}</span><strong>{i ? 'Halftime venue LED' : 'Opening replay overlay'}</strong><small>{i ? 'Open · evidence incomplete' : review[record.case_id]==='confirmed' ? 'Confirmed discrepancy' : review[record.case_id]==='open' ? 'Open · review pending' : 'Needs review'}</small>
        </button>)}
        {!preview && <a className="text-link" href="/demo/buyer-account">Open simulated buyer account</a>}
      </aside>
      <div className="workbench-media">
        <div className="artifact-rule"><strong>{isVenue ? 'Venue coverage' : 'Media review'}</strong><span>18 Oct 2026</span></div>
        {isVenue ? <div className="coverage-panel"><span className="status pending">Source needed</span><h3>Coverage ends before halftime.</h3><Timeline venue/><p>{item.unresolved_gap.needed}</p></div> : <>
          <div className="players"><Shot seconds={seconds}/><Shot vertical seconds={seconds}/></div>
          <div className="play-control"><button type="button" className="control" onClick={()=>{if(seconds>=5)setSeconds(0);setPlaying(!playing);}}><Icon name={playing ? 'pause' : 'play'}/> {playing?'Pause':'Play still sequence'}</button><label><span className="visually-hidden">Shared replay time</span><input type="range" min="0" max="5" step=".25" value={seconds} aria-valuetext={timecode} onChange={e=>{setPlaying(false);setSeconds(Number(e.target.value));}}/></label><output aria-live="off">{timecode}</output></div>
          <p className="small static-note">Fictional still sequence with a simulated exposure window.</p>
        </>}
        <button type="button" className="text-link source-toggle" aria-expanded={sourceTab} onClick={()=>{setSourceTab(!sourceTab);recordEvent('reviewer_interaction','inspect_source');}}>{sourceTab?'Hide source references':'Inspect source references'}</button>
        {sourceTab && <div className="source-list">{item.sources.map(src=><div key={src.id}><strong>{src.name || src.type}</strong><span>{src.id} · {src.version} · {src.date}</span><span>{src.available_range ? src.available_range.start + '–' + src.available_range.end : 'Approved artwork reference'}</span></div>)}</div>}
      </div>
      <div className="workbench-decision">
        <Clause venue={isVenue}/>
        <div className="decision-box"><strong>{isVenue?'Coverage finding':'AI-supported suggestion'}</strong><p>{item.proposed_finding.summary}</p><div className="artifact-rule"><span>{item.assigned_reviewer.name}</span><span>{item.assigned_reviewer.role}</span></div><div className={`status ${decision==='confirmed'?'discrepancy':'pending'}`} role="status">{state}</div>
          {decision && <p className="small">{decision==='confirmed' ? 'Reviewer confirmed the discrepancy. Commercial decides whether to review a make-good.' : 'Reviewer kept the item open for follow-up.'}</p>}
          {preview ? <a className="btn primary" href="/demo/placement-audit">Open the workbench<Icon name="arrow" className="action-icon"/></a> : <div className="decision-actions">
            {!isVenue && <button className="btn primary" type="button" onClick={()=>decide('confirmed')} disabled={decision==='confirmed'}><Icon name="check"/>Confirm discrepancy</button>}
            <button className="btn light" type="button" onClick={()=>decide('open')} disabled={decision==='open'}>Keep open</button>
            {decision && <button className="text-link" type="button" onClick={reset}>Reset decision</button>}
            <button className="text-link" type="button" onClick={download}><Icon name="download"/> Download case record</button>
          </div>}
          {!preview && <details className="history">
            <summary>Decision history</summary>
            <ol>
              <li>{isVenue ? 'Coverage gap identified' : 'Model suggested a possible discrepancy'} <span>· Simulated source check</span></li>
              {decision && <li>{decision==='confirmed' ? 'Discrepancy confirmed' : 'Item kept open'} <span>· Local reviewer action</span></li>}
              {decision==='confirmed' && <li>Commercial follow-up pending</li>}
            </ol>
          </details>}
        </div>
      </div>
    </div>
  </div>;
}
