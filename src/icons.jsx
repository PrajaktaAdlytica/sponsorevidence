const paths = {
  arrow: 'M4 10h11m-4-4 4 4-4 4',
  left: 'M16 10H5m4-4-4 4 4 4',
  down: 'M10 4v11m-4-4 4 4 4-4',
  chevron: 'm5 8 5 5 5-5',
  play: 'M7 4.5 15.5 10 7 15.5z',
  pause: 'M7 5v10m6-10v10',
  download: 'M10 3v9m-3-3 3 3 3-3m-9 4.5V17h12v-3.5',
  asset: 'M4 4h12v12H4zm3 8 2.2-3.5 2 3L13 10l3 4M7 7h.01',
  chart: 'M4 4v12h12m-9-3V9m4 4V6m4 7v-3',
  clause: 'M11 3H5v14h10V7zm0 0v4h4M7.5 12l1.7 1.7 3.1-3.1',
  report: 'M6 3h7l3 3v11H6zm7 0v4h3M8.5 10h5m-5 3h5M3 6v14h10',
  map: 'm3 5 5-2 4 2 5-2v12l-5 2-4-2-5 2zm5-2v12m4-10v12',
  compare: 'M3 5h6v10H3zm9 0h5v10h-5z',
  grid: 'M4 4h5v5H4zm7 0h5v5h-5zm-7 7h5v5H4zm7 0h5v5h-5z',
  review: 'M3 10s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5zm9 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  shield: 'M10 3 4 5.5v4.2c0 3.7 2.3 5.8 6 7.3 3.7-1.5 6-3.6 6-7.3V5.5zm-2.5 7 1.7 1.7 3.3-3.4',
  feedback: 'M4 4h12v9H9l-4 3v-3H4zm3 4h6m-6 2h4',
  check: 'm5 10 3 3 7-7',
};

export function Icon({ name, className }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className ? `ui-icon ${className}` : 'ui-icon'} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
}
