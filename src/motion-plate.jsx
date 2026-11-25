import { useEffect, useRef, useState } from 'react';

export function MotionPlate({ src, poster, motion, mode, className }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const loop = mode === 'loop';

  useEffect(() => {
    if (!motion) return;
    const video = ref.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (navigator.connection?.saveData) return;

    let inRange = false;
    function update() {
      const enabled = !preference.matches && inRange && !document.hidden;
      if (!enabled) {
        video.pause();
        return;
      }
      if (!video.hasAttribute('src')) video.src = src;
      if (loop && video.paused) {
        video.muted = true;
        video.play().catch(() => {});
      }
    }
    function unload() {
      video.pause();
      if (video.hasAttribute('src')) {
        video.removeAttribute('src');
        video.load();
      }
      setReady(false);
    }
    function onPreference() {
      if (preference.matches) unload();
      else update();
    }
    const observer = new IntersectionObserver(([entry]) => {
      inRange = entry.isIntersecting;
      update();
    }, { rootMargin: loop ? '0px' : '300px 0px' });
    observer.observe(video);
    preference.addEventListener('change', onPreference);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', onPreference);
      document.removeEventListener('visibilitychange', update);
      unload();
    };
  }, [src, motion, loop]);

  return <div className={'motion-plate ' + className} aria-hidden="true">
    <img className={loop ? 'cinema-image' : ''} src={poster} alt="" width="1774" height="887" loading={loop ? 'eager' : 'lazy'} fetchPriority={loop ? 'high' : 'auto'}/>
    <video ref={ref} muted playsInline loop={loop} preload={loop ? 'metadata' : 'auto'} tabIndex={-1}
      data-scroll-video={loop ? undefined : ''}
      data-ready={motion && ready}
      onLoadedData={() => setReady(true)}
      onError={() => setReady(false)}
    />
  </div>;
}
