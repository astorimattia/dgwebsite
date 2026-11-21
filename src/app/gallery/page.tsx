'use client';

import { useEffect, useRef } from 'react';

const B = '/assets';

type Series = { name: string; place: string; year: string; slug: string | null; photos: string[] };

const SERIES: Series[] = [
  { name: 'Festa del Soccorso', place: 'San Severo, Italia', year: '2026', slug: 'c-vdim-au-fnel',
    photos: [`${B}/images/sansevero2.webp`, `${B}/images/sansevero5.webp`, `${B}/images/sansevero8.webp`] },
  { name: 'Si San Juanito Permite', place: 'San Juan de la Vega, Mexico', year: '2026', slug: 'si-san-juanito-permite',
    photos: [`${B}/images-optimized/sanjuan-analog.webp`, `${B}/images-optimized/sanjuan-analog3.webp`, `${B}/images-optimized/sanjuan-analog6.webp`] },
  { name: 'Tultepec', place: 'Tultepec, Mexico', year: '2025', slug: null,
    photos: [`${B}/images-optimized/tultepec-analog-lg.webp`, `${B}/images-optimized/tultepec-analog4-lg.webp`, `${B}/images-optimized/tultepec-analog8-lg.webp`] },
  { name: 'Maut Ka Kuan', place: 'India', year: '2025', slug: null,
    photos: [`${B}/images-optimized/mautkakuan-analog.webp`, `${B}/images-optimized/mautkakuan-analog5.webp`, `${B}/images-optimized/mautkakuan-analog8.webp`] },
  { name: 'Banni', place: 'India', year: '2025', slug: null,
    photos: [`${B}/images-optimized/banni-analog.webp`, `${B}/images-optimized/banni-analog3.webp`, `${B}/images-optimized/banni-analog7.webp`] },
];

type Item =
  | { kind: 'intro' }
  | { kind: 'title'; name: string; sub: string }
  | { kind: 'photo'; src: string; cap: string; year: string; slug: string | null }
  | { kind: 'end' };

const STEP = 12.8;

const CSS = `
  .gl-root, .gl-root * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  .gl-root { position: fixed; inset: 0; background: #f4f3f1; color: #171615;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; overflow: hidden; z-index: 40; }
  .gl-scene { position: absolute; inset: 0; perspective: 1500px; perspective-origin: 50% 46%;
    cursor: grab; touch-action: none; user-select: none; -webkit-user-select: none; }
  .gl-scene.dragging { cursor: grabbing; }
  .gl-wall { position: absolute; left: 50%; top: 50%; transform-style: preserve-3d; }
  .gl-floor { position: absolute; left: 50%; top: 50%; width: 12000px; height: 12000px; margin: -6000px;
    transform: rotateX(90deg) translateZ(300px);
    background: radial-gradient(closest-side, #efedea 0%, #e7e5e1 45%, #dfddd9 100%);
    backface-visibility: hidden; }
  .gl-panel { position: absolute; left: 0; top: 0; width: 300px; margin: 0 0 0 -150px;
    backface-visibility: hidden; }
  .gl-art { background: #fff; padding: 14px 14px 12px;
    box-shadow: 0 22px 45px rgba(40,36,30,.16), 0 2px 6px rgba(40,36,30,.10); }
  .gl-art img { display: block; width: 100%; height: auto; pointer-events: none; }
  .gl-cap { margin-top: 10px; font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: #8a8781; display: flex; justify-content: space-between; }
  .gl-title { width: 520px; margin-left: -260px; text-align: center; }
  .gl-title h2 { font-family: Georgia, "Times New Roman", serif; font-weight: 400;
    font-size: 44px; letter-spacing: .28em; margin: 0 0 14px; text-transform: uppercase; }
  .gl-title p { font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: #8a8781; margin: 0; }
  .gl-intro { width: 560px; margin-left: -280px; text-align: center; }
  .gl-intro h1 { font-family: Georgia, serif; font-weight: 400; font-size: 58px;
    letter-spacing: .18em; margin: 0 0 18px; text-transform: uppercase; }
  .gl-intro p { font-size: 12px; letter-spacing: .32em; text-transform: uppercase; color: #8a8781; margin: 0 0 26px; }
  .gl-intro .gl-sub { font-size: 11px; letter-spacing: .2em; color: #b5b2ab; }
  .gl-end { width: 460px; margin-left: -230px; text-align: center; }
  .gl-end p { font-family: Georgia, serif; font-size: 26px; letter-spacing: .12em; color: #8a8781; }
  .gl-topbar { position: fixed; top: 0; left: 0; right: 0; z-index: 60; display: flex;
    justify-content: space-between; align-items: center; padding: 26px 34px; pointer-events: none; }
  .gl-name { font-size: 15px; letter-spacing: .04em; pointer-events: auto; text-decoration: none; color: #171615; }
  .gl-topbar nav { pointer-events: auto; }
  .gl-topbar nav a { font-size: 13px; color: #171615; text-decoration: none; margin-left: 26px; letter-spacing: .03em; }
  .gl-topbar nav a.gl-on { color: #8a8781; }
  .gl-hint { position: fixed; bottom: 22px; left: 0; right: 0; text-align: center; z-index: 60;
    font-size: 10px; letter-spacing: .34em; text-transform: uppercase; color: #b5b2ab;
    pointer-events: none; transition: opacity 1s; }
  .gl-lb { position: fixed; inset: 0; z-index: 80; background: rgba(250,250,249,.97); display: none;
    align-items: center; justify-content: center; flex-direction: column; padding: 5vh 5vw; }
  .gl-lb.open { display: flex; }
  .gl-lb img { max-width: min(88vw, 1100px); max-height: 72vh; box-shadow: 0 30px 70px rgba(40,36,30,.25); }
  .gl-lb .gl-lbcap { margin-top: 22px; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: #8a8781; }
  .gl-lb .gl-story { margin-top: 14px; font-size: 13px; color: #171615; text-decoration: none;
    border-bottom: 1px solid #171615; padding-bottom: 2px; }
  .gl-x { position: fixed; top: 26px; right: 34px; font-size: 14px; letter-spacing: .2em;
    color: #8a8781; cursor: pointer; text-transform: uppercase; background: none; border: none; }
  @media (max-width: 640px) {
    .gl-panel { width: 220px; margin-left: -110px; }
    .gl-title { width: 340px; margin-left: -170px; }
    .gl-title h2 { font-size: 26px; }
    .gl-intro { width: 340px; margin-left: -170px; }
    .gl-intro h1 { font-size: 32px; }
    .gl-topbar { padding: 18px 20px; }
    .gl-topbar nav a { margin-left: 16px; font-size: 12px; }
    .gl-floor { transform: rotateX(90deg) translateZ(230px); }
  }
`;

export default function GalleryPage() {
  const wallRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const lbRef = useRef<HTMLDivElement>(null);
  const lbImgRef = useRef<HTMLImageElement>(null);
  const lbCapRef = useRef<HTMLDivElement>(null);
  const lbStoryRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const wall = wallRef.current!;
    const scene = sceneRef.current!;
    const panels = Array.from(wall.querySelectorAll<HTMLElement>('.gl-panel'));

    // vertical centering per panel (heights vary with image aspect)
    panels.forEach((p) => {
      const img = p.querySelector('img');
      const center = () => { p.style.marginTop = `${-(p.offsetHeight / 2)}px`; };
      if (img && !img.complete) img.addEventListener('load', center, { once: true });
      else if (!img) requestAnimationFrame(center);
      else center();
    });

    const R = () => (window.innerWidth < 640 ? 1500 : 2400);
    let pos = 0;
    let vel = 0;
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let raf: number | null = null;
    const total = panels.length ? parseFloat(panels[panels.length - 1].dataset.a || '0') : 0;

    const paint = () => {
      const r = R();
      wall.style.transform = `translateZ(${-r}px) rotateY(${-pos}deg)`;
    };
    const layout = () => {
      const r = R();
      panels.forEach((p) => {
        p.style.transform = `rotateY(${p.dataset.a}deg) translateZ(${r}px)`;
      });
      paint();
    };
    const tick = () => {
      if (!dragging) {
        pos += vel;
        vel *= 0.94;
        if (Math.abs(vel) > 0.001) raf = requestAnimationFrame(tick);
        else raf = null;
      }
      pos = Math.max(-2, Math.min(total + 2, pos));
      paint();
    };
    let hintHidden = false;
    const hideHint = () => {
      if (!hintHidden && hintRef.current) { hintHidden = true; hintRef.current.style.opacity = '0'; }
    };
    const hintTimer = window.setTimeout(hideHint, 9000);

    const onDown = (e: PointerEvent) => {
      dragging = true; moved = false; lastX = e.clientX; vel = 0;
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (Math.abs(dx) > 2 && !moved) {
        moved = true; hideHint(); scene.classList.add('dragging');
        try { scene.setPointerCapture(e.pointerId); } catch { /* noop */ }
      }
      const deg = -dx * (window.innerWidth < 640 ? 0.045 : 0.028);
      pos = Math.max(-2, Math.min(total + 2, pos + deg));
      vel = deg;
      paint();
    };
    const onUp = () => {
      dragging = false;
      scene.classList.remove('dragging');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      hideHint();
      pos = Math.max(-2, Math.min(total + 2, pos + (e.deltaY + e.deltaX) * 0.012));
      vel = (e.deltaY + e.deltaX) * 0.0012;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') lbRef.current?.classList.remove('open');
    };
    const onResize = () => layout();

    scene.addEventListener('pointerdown', onDown);
    scene.addEventListener('pointermove', onMove);
    scene.addEventListener('pointerup', onUp);
    scene.addEventListener('pointercancel', onUp);
    scene.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    layout();
    document.title = 'Mattia Astori — Gallery';

    return () => {
      window.clearTimeout(hintTimer);
      scene.removeEventListener('pointerdown', onDown);
      scene.removeEventListener('pointermove', onMove);
      scene.removeEventListener('pointerup', onUp);
      scene.removeEventListener('pointercancel', onUp);
      scene.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // build wall items with cumulative angles
  const items: Item[] = [{ kind: 'intro' }];
  SERIES.forEach((s) => {
    items.push({ kind: 'title', name: s.name, sub: `${s.place} · ${s.year}` });
    s.photos.forEach((p) => items.push({ kind: 'photo', src: p, cap: s.place, year: s.year, slug: s.slug }));
  });
  items.push({ kind: 'end' });

  const angles: number[] = [];
  {
    let a = 0;
    items.forEach((it, i) => {
      angles[i] = a;
      if (it.kind === 'intro') a += STEP * 1.4;
      else if (it.kind === 'title') a += STEP * 1.1;
      else if (it.kind === 'photo') a += STEP;
      if (it.kind === 'photo') {
        const next = items[i + 1];
        if (next && next.kind === 'title') a += STEP * 0.8;
      }
    });
  }

  const openLb = (src: string, cap: string, year: string, slug: string | null) => {
    if (!lbRef.current || !lbImgRef.current || !lbCapRef.current || !lbStoryRef.current) return;
    lbImgRef.current.src = src;
    lbCapRef.current.textContent = `${cap} — ${year}`;
    if (slug) {
      lbStoryRef.current.style.display = '';
      lbStoryRef.current.href = `/stories/${slug}`;
    } else {
      lbStoryRef.current.style.display = 'none';
    }
    lbRef.current.classList.add('open');
  };

  let idx = 0;
  const key = () => `p${idx++}`;

  return (
    <div className="gl-root">
      <style>{CSS}</style>
      <div className="gl-topbar">
        <a className="gl-name" href="/">Mattia Astori</a>
        <nav>
          <a href="/about">About</a>
          <a href="/stories">Stories</a>
          <a className="gl-on" href="/gallery">Gallery</a>
        </nav>
      </div>
      <div className="gl-scene" ref={sceneRef}>
        <div className="gl-wall" ref={wallRef}>
          <div className="gl-floor" />
          {items.map((it, i) => {
            if (it.kind === 'intro') {
              return (
                <div key={key()} className="gl-panel gl-intro" data-a={angles[i]}>
                  <h1>Mattia Astori</h1>
                  <p>Photographs of extreme rituals</p>
                  <p className="gl-sub">Walk in &nbsp;&rarr;</p>
                </div>
              );
            }
            if (it.kind === 'title') {
              return (
                <div key={key()} className="gl-panel gl-title" data-a={angles[i]}>
                  <h2>{it.name}</h2>
                  <p>{it.sub}</p>
                </div>
              );
            }
            if (it.kind === 'photo') {
              return (
                <div key={key()} className="gl-panel" data-a={angles[i]}>
                  <div className="gl-art" onClick={() => openLb(it.src, it.cap, it.year, it.slug)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img draggable={false} src={it.src} alt={it.cap} />
                  </div>
                  <div className="gl-cap"><span>{it.cap}</span><span>{it.year}</span></div>
                </div>
              );
            }
            return (
              <div key={key()} className="gl-panel gl-end" data-a={angles[i]}>
                <p>More soon.</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="gl-hint" ref={hintRef}>Drag or scroll to walk the gallery</div>
      <div className="gl-lb" ref={lbRef} onClick={(e) => { if (e.target === lbRef.current) lbRef.current.classList.remove('open'); }}>
        <button type="button" className="gl-x" onClick={() => lbRef.current?.classList.remove('open')}>Close</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={lbImgRef} alt="" />
        <div className="gl-lbcap" ref={lbCapRef} />
        <a className="gl-story" ref={lbStoryRef} href="#" style={{ display: 'none' }}>Read the story</a>
      </div>
    </div>
  );
}
