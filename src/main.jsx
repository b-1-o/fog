import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './sakura-carousel.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';
const BONSai_IMAGE = './assets/bonsi.jpeg';
const SAKURA_IMAGE = './assets/ssakura.jpg';

const pages = [
  ['home', 'HOME'],
  ['about', 'ABOUT'],
  ['contact', 'CONTACT'],
];

const RAW_MY = 'https://cdn.jsdelivr.net/gh/b-1-o/my@main/assets/';

const sakuraCards = [
  { number:'01', label:'WHAT I BUILD', title:'PROJECTS', image:RAW_MY+'09-tech-startup%20(1).png', position:'50% 50%', accent:'Builds with a point of view.', text:'A look at the work I actually build — from business websites to immersive interfaces and visual experiments.', items:['Royal Touch — business website direction','FOG — this portfolio and visual experiment','Landing pages, responsive interfaces and redesigns'], meta:'WEB · UI · RESPONSIVE' },
  { number:'02', label:'THE STACK', title:'TOOLS + CODE', image:RAW_MY+'08-architect%20(1).png', position:'50% 50%', accent:'The machinery behind the image.', text:'The frontend stack used to turn a visual direction into a responsive, maintainable interface.', items:['HTML · CSS · JavaScript','TypeScript · React · Next.js','Vite · Git · Linux · Framer Motion'], meta:'FRONTEND · SYSTEMS · MOTION' },
  { number:'03', label:'CURRENTLY EXPLORING', title:'LEARNING', image:RAW_MY+'01-graphic-designer%20(1).png', position:'50% 50%', accent:'Always one layer deeper.', text:'Current study is focused on stronger architecture, better interactions and lighter, more intentional builds.', items:['Advanced React architecture','TypeScript depth and data flow','Interaction, motion and frontend performance'], meta:'STUDY · TEST · REFINE' },
  { number:'04', label:'THE PERSON BEHIND IT', title:'ABOUT ME', image:RAW_MY+'04-photographer%20(1).png', position:'50% 50%', accent:'Less noise. More intent.', text:'I care about hierarchy, atmosphere and small details that make a digital product feel considered rather than decorated.', items:['Focus — web / UI','Style — minimal / immersive','Approach — design · build · refine'], meta:'CLARITY · DETAIL · RESTRAINT' },
  { number:'05', label:'FOR CLIENTS', title:'SERVICES', image:RAW_MY+'02-business-consultant%20(1).png', position:'50% 50%', accent:'From first frame to final pass.', text:'A practical set of services for small businesses and independent brands that need a polished web presence.', items:['Custom websites','Landing pages and redesigns','Responsive UI · visual design · performance'], meta:'BUILD · REDESIGN · DELIVERY' },
  { number:'06', label:'SIDE LAB', title:'EXPERIMENTS', image:RAW_MY+'07-restaurant%20(1).png', position:'50% 50%', accent:'Make the interface breathe.', text:'Motion, glass, depth and tiny interactions built because the web becomes more interesting when it can feel cinematic.', items:['Layered photography and depth','Canvas snowfall and atmosphere','Glass surfaces and scene transitions'], meta:'MOTION · DEPTH · ATMOSPHERE' },
  { number:'07', label:'VISUAL LANGUAGE', title:'DIRECTION', image:RAW_MY+'10-florist%20(1).png', position:'50% 50%', accent:'A quiet visual language.', text:'Monochrome imagery, restrained pink, smoked glass and editorial typography shape the visual language of this portfolio.', items:['Monochrome imagery','Smoked glass surfaces','Editorial typography + restrained motion'], meta:'IMAGE · TYPE · ATMOSPHERE' },
];

function routeFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  if (pages.some(([id]) => id === route)) return route;
  if (window.location.hash) window.history.replaceState(null, '', '#/home');
  return 'home';
}

function useRoute() {
  const [route, setRoute] = useState(routeFromHash());
  useEffect(() => {
    const onHash = () => setRoute(routeFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function useScrollDepth() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

function Snowfall() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!ctx) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, frame = 0, last = performance.now(), time = 0;
    const dots = [];
    const seed = () => ({ x: Math.random() * w, y: Math.random() * h, r: .45 + Math.random() * 2.4, v: 10 + Math.random() * 28, d: .25 + Math.random() * .95, a: .12 + Math.random() * .5, p: Math.random() * 6.28 });
    const resize = () => {
      w = innerWidth; h = innerHeight; dpr = Math.min(devicePixelRatio || 1, 1.1);
      canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); dots.length = 0;
      const count = w < 700 ? 32 : w < 1200 ? 52 : 72;
      for (let i = 0; i < count; i++) dots.push(seed());
    };
    const draw = (now) => {
      if (now - last < 22) { frame = requestAnimationFrame(draw); return; }
      const dt = Math.min(.04, (now - last) / 1000); last = now; time += dt; ctx.clearRect(0, 0, w, h);
      for (const s of dots) {
        if (!reduce) { s.y += s.v * s.d * dt; s.x += (Math.sin(time * .55 + s.p) * 5 + 2) * s.d * dt; }
        if (s.y > h + 12) { s.y = -10; s.x = Math.random() * w; }
        if (s.x > w + 12) s.x = -8;
        ctx.globalAlpha = s.a * (.55 + s.d * .3); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * s.d, 0, Math.PI * 2); ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize', resize, { passive: true }); frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}

function Nav({ route }) {
  return <header className="topbar glass"><a className="logo" href="#/home">B1O<span>/WEB</span></a><nav>{pages.map(([id, label]) => <a key={id} className={route === id ? 'active' : ''} href={`#/${id}`}>{label}</a>)}</nav><a className="top-cta" href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a></header>;
}

function GlassButton({ href, children, light = false }) { return <a className={`glass-button ${light ? 'light' : ''}`} href={href}>{children}</a>; }

function JumpToCarousel({ children }) {
  return <a className="glass-button light" href="#sakura-index" onClick={(event) => { event.preventDefault(); document.getElementById('sakura-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{children}</a>;
}

function SakuraCarousel() {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const phaseRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const pointerRef = useRef(null);
  const openRef = useRef(null);
  const activeRef = useRef(0);
  const pendingIndexRef = useRef(null);
  const lastCenterRef = useRef(-1);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  useEffect(() => { openRef.current = open; }, [open]);

  const wrap = (value, total) => ((value + total / 2) % total + total) % total - total / 2;

  const render = () => {
    const total = sakuraCards.length;
    const phase = phaseRef.current + (targetRef.current - phaseRef.current) * 0.12;
    phaseRef.current = Math.abs(targetRef.current - phase) < 0.00035 ? targetRef.current : phase;

    const settled = Math.abs(targetRef.current - phaseRef.current) < 0.00035;
    const centerIndex = ((Math.round(phaseRef.current) % total) + total) % total;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const slot = wrap(index - phaseRef.current, total);
      const abs = Math.abs(slot);
      const x = slot * 306 + slot * abs * 17;
      const y = abs * abs * 10;
      const scale = abs < 0.46 ? 1.06 : Math.max(0.72, 1 - abs * 0.078);
      const rotate = slot * -3.1;
      const rotateY = slot * -8.2;
      const opacity = Math.max(0.12, 1 - Math.max(0, abs - 2.25) * 0.42);

      card.style.setProperty('--x', String(x) + 'px');
      card.style.setProperty('--y', String(y) + 'px');
      card.style.setProperty('--s', scale.toFixed(4));
      card.style.setProperty('--r', String(rotate) + 'deg');
      card.style.setProperty('--ry', String(rotateY) + 'deg');
      card.style.setProperty('--a', opacity.toFixed(3));
      card.style.zIndex = String(100 - Math.round(abs * 10));
      card.classList.toggle('is-center', abs < 0.46);
      card.tabIndex = abs < 0.46 ? 0 : -1;
    });

    if (centerIndex !== lastCenterRef.current) {
      lastCenterRef.current = centerIndex;
      activeRef.current = centerIndex;
      setActive(centerIndex);
    }

    if (settled && pendingIndexRef.current !== null) {
      const index = pendingIndexRef.current;
      pendingIndexRef.current = null;
      requestAnimationFrame(() => {
        setOpen(index);
        openRef.current = index;
      });
    }

    if (!settled) {
      rafRef.current = requestAnimationFrame(render);
    } else {
      rafRef.current = 0;
    }
  };

  const setTarget = (value) => {
    targetRef.current = value;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const warm = (index) => {
      const item = sakuraCards[index];
      if (!item) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = item.image;
    };
    [0, 1, 2].forEach(warm);

    const onWheel = (event) => {
      if (openRef.current !== null) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      event.stopPropagation();
      const step = Math.max(-0.72, Math.min(0.72, delta * 0.0026));
      setTarget(targetRef.current + step);
    };

    const onPointerDown = (event) => {
      if (openRef.current !== null) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerRef.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lastX: event.clientX,
        moved: false,
      };
      stage.setPointerCapture?.(event.pointerId);
      stage.classList.add('is-dragging');
    };

    const onPointerMove = (event) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId || openRef.current !== null) return;

      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.y;
      if (Math.abs(event.clientX - pointer.x) + Math.abs(event.clientY - pointer.y) > 7) pointer.moved = true;

      if (Math.abs(dx) > Math.max(2, Math.abs(dy) * 0.35)) {
        event.preventDefault();
        setTarget(targetRef.current - dx * 0.0065);
        pointer.lastX = event.clientX;
      }
    };

    const releasePointer = (event) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      stage.releasePointerCapture?.(event.pointerId);
      stage.classList.remove('is-dragging');

      if (pointer.moved) {
        targetRef.current = Math.round(targetRef.current);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(render);
        stage.dataset.suppressClick = '1';
        window.setTimeout(() => { delete stage.dataset.suppressClick; }, 100);
      }
      pointerRef.current = null;
    };

    const onClick = (event) => {
      if (openRef.current !== null) return;
      if (stage.dataset.suppressClick === '1') return;

      const card = event.target.closest('.sakura-card');
      if (!card || !stage.contains(card)) return;

      const index = Number(card.dataset.index);
      const slot = wrap(index - phaseRef.current, sakuraCards.length);

      if (Math.abs(slot) > 0.46) {
        pendingIndexRef.current = index;
        setTarget(targetRef.current + slot);
        return;
      }

      setOpen((current) => {
        const next = current === index ? null : index;
        openRef.current = next;
        return next;
      });
    };

    const onKeyDown = (event) => {
      if (openRef.current !== null) {
        if (event.key === 'Escape') {
          event.preventDefault();
          setOpen(null);
          openRef.current = null;
        }
        return;
      }

      const current = activeRef.current;
      let next = current;
      if (event.key === 'ArrowLeft') next = Math.max(0, current - 1);
      if (event.key === 'ArrowRight') next = Math.min(sakuraCards.length - 1, current + 1);
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = sakuraCards.length - 1;

      if (next !== current) {
        event.preventDefault();
        setTarget(next);
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setOpen(current);
        openRef.current = current;
      }
    };

    stage.addEventListener('wheel', onWheel, { passive: false, capture: true });
    stage.addEventListener('pointerdown', onPointerDown, { capture: true });
    stage.addEventListener('pointermove', onPointerMove, { passive: false, capture: true });
    stage.addEventListener('pointerup', releasePointer, { capture: true });
    stage.addEventListener('pointercancel', releasePointer, { capture: true });
    stage.addEventListener('click', onClick, { capture: true });
    stage.addEventListener('keydown', onKeyDown, { capture: true });

    targetRef.current = 0;
    phaseRef.current = 0;
    lastCenterRef.current = -1;
    activeRef.current = 0;
    render();

    return () => {
      stage.removeEventListener('wheel', onWheel, true);
      stage.removeEventListener('pointerdown', onPointerDown, true);
      stage.removeEventListener('pointermove', onPointerMove, true);
      stage.removeEventListener('pointerup', releasePointer, true);
      stage.removeEventListener('pointercancel', releasePointer, true);
      stage.removeEventListener('click', onClick, true);
      stage.removeEventListener('keydown', onKeyDown, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
  }, []);

  useEffect(() => {
    if (open !== null) {
      const preload = new Image();
      preload.decoding = 'async';
      preload.src = sakuraCards[open].image;
    }
  }, [open]);

  const closeOpen = (event) => {
    event.stopPropagation();
    setOpen(null);
    openRef.current = null;
  };

  return (
    <section className="sakura-index" id="sakura-index" aria-label="Interactive visual index">
      <div className="sakura-index-head">
        <div>
          <span className="sakura-index-kicker">01 / VISUAL INDEX</span>
          <h2>Choose a <i>direction.</i></h2>
        </div>
        <p>Scroll inside the gallery to move through the images. Bring one to the center, then click it to reveal the story, tools or work behind the image.</p>
      </div>

      <div className={open !== null ? "sakura-stage is-open" : "sakura-stage"} ref={stageRef}>
        <div className="sakura-stage-glow" aria-hidden="true" />
        <div className="sakura-track">
          {sakuraCards.map((card, index) => (
            <article
              key={card.number}
              ref={(node) => { cardRefs.current[index] = node; }}
              data-index={index}
              className={active === index ? 'sakura-card is-center' : 'sakura-card'}
              role="button"
              tabIndex={active === index ? 0 : -1}
              aria-label={'Open ' + card.title}
            >
              <div className="sakura-card-media">
                <img
                  src={card.image}
                  alt=""
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ objectPosition: card.position }}
                />
              </div>
              <div className="sakura-card-sheen" aria-hidden="true" />
              <span className="sakura-card-number">{card.number}</span>
              <div className="sakura-card-copy">
                <small>{card.label}</small>
                <strong>{card.title}</strong>
                <em>{open === index ? 'OPEN' : active === index ? 'CLICK TO REVEAL' : 'BRING TO CENTER'}</em>
              </div>
            </article>
          ))}
        </div>

        <div className="sakura-stage-side">
          <span className="sakura-live-dot" aria-hidden="true" />
          <span>DRAG · WHEEL · CLICK</span>
        </div>
        <div className="sakura-stage-hud">
          <b>{String(active + 1).padStart(2, '0')}</b><em>/</em><span>{String(sakuraCards.length).padStart(2, '0')}</span>
        </div>

        <div className={open !== null ? 'sakura-open is-open' : 'sakura-open'} aria-hidden={open === null}>
          {open !== null && (
            <>
              <div className="sakura-open-media">
                <img src={sakuraCards[open].image} alt={sakuraCards[open].title} decoding="async" />
              </div>
              <div className="sakura-open-body">
                <div className="sakura-open-scroll">
                  <span>{sakuraCards[open].number} / {sakuraCards[open].label}</span>
                  <h3>{sakuraCards[open].title}</h3>
                  <p className="sakura-open-accent">{sakuraCards[open].accent}</p>
                  <p className="sakura-open-lead">{sakuraCards[open].text}</p>
                  <div className="sakura-open-list">
                    {sakuraCards[open].items.map((item) => <div key={item}>{item}</div>)}
                  </div>
                </div>
                <div className="sakura-open-foot">
                  <span>{sakuraCards[open].meta}</span>
                  <button type="button" onClick={closeOpen}>CLOSE ×</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="sakura-index-footer">
        <span><i /> DRAG · WHEEL · CLICK</span>
        <strong>{String(active + 1).padStart(2, '0')} <em>/</em> {String(sakuraCards.length).padStart(2, '0')}</strong>
      </div>
    </section>
  );
}
function Home() {
  return <main className="page home-page">
    <section className="home-hero depth-scene">
      <div className="depth-back" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} /><div className="depth-mid" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} /><div className="depth-light" /><div className="scene-vignette" />
      <div className="hero-copy"><span className="eyebrow glass-chip">WEB DEVELOPER · UNITED STATES</span><h1>Built with<br /><i>patience.</i></h1><p>Clean interfaces, responsive websites and digital experiences for small businesses and independent brands.</p><div className="button-row"><JumpToCarousel>EXPLORE INDEX <b>↘</b></JumpToCarousel><GlassButton href="#/contact">START A PROJECT <b>↗</b></GlassButton></div></div>
      <div className="hero-index glass"><span>SCROLL TO MOVE</span><strong>01 / 04</strong></div><div className="hero-note">ONE OBJECT · MANY LAYERS</div>
    </section>
    <SakuraCarousel />
    <section className="home-bridge"><div className="section-code">00 / ENTRY</div><div className="bridge-grid"><div><p className="mega">I make small businesses <i>look like they mean it.</i></p></div><div className="bridge-copy"><p>I design and build websites where typography, spacing, motion and hierarchy all point in the same direction.</p><p className="muted">Instead of adding more, I look for what can be removed.</p><GlassButton href="#/about">ABOUT THE APPROACH <b>↗</b></GlassButton></div></div></section>
    <section className="sakura-quote depth-scene"><div className="sakura-back" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} /><div className="sakura-front" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} /><div className="sakura-shine" /><div className="quote-content"><span>02 / PRINCIPLE</span><h2>GOOD DESIGN DOESN'T<br /><i>SHOUT.</i></h2><a href="#sakura-index" onClick={(event) => { event.preventDefault(); document.getElementById('sakura-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>OPEN THE INDEX ↗</a></div></section>
  </main>;
}

function About() {
  return <main className="page internal-page about-page"><section className="page-heading"><span>01 / ABOUT</span><h1>Less noise.<br /><i>More intent.</i></h1><p>A small digital practice focused on clean interfaces, strong hierarchy and details that reward attention.</p></section><section className="about-feature"><div className="feature-image depth-card" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} /><div className="feature-copy"><span>THE APPROACH</span><h2>Design first.<br /><i>Build carefully.</i></h2><p>Every choice has a job: typography gives rhythm, spacing gives calm, motion gives continuity, and technology stays behind the experience.</p><div className="mini-grid"><div><b>FOCUS</b><span>WEB / UI</span></div><div><b>BASED</b><span>UNITED STATES</span></div><div><b>STYLE</b><span>MINIMAL · IMMERSIVE</span></div><div><b>OUTPUT</b><span>RESPONSIVE · FAST</span></div></div></div></section><section className="principles"><div className="section-code">02 / PRINCIPLES</div><div className="principle-grid">{['REMOVE THE UNNECESSARY','MAKE THE IMPORTANT OBVIOUS','MOTION SHOULD HAVE A REASON','DETAILS CREATE MEMORY'].map((x, i) => <div className="principle" key={x}><span>0{i + 1}</span><h3>{x}</h3><i>✳</i></div>)}</div></section></main>;
}

function Contact() {
  return <main className="page contact-page depth-scene"><div className="contact-back" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} /><div className="contact-back-blur" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} /><div className="contact-shine" /><section className="contact-inner"><span>03 / CONTACT</span><h1>Let's make<br /><i>it clear.</i></h1><p>Have something worth building?</p><div className="button-row"><GlassButton href={FIVERR_URL} light>START A PROJECT ↗</GlassButton><GlassButton href="#/home">RETURN HOME ↗</GlassButton></div></section><div className="contact-footer"><span>DESIGN · BUILD · REFINE</span><span>© 2026</span></div></main>;
}

function Transition({ route }) { return <div key={route} className="route-wash"><span>{route.toUpperCase()}</span></div>; }

function App() {
  const route = useRoute();
  useScrollDepth();
  const [ready, setReady] = useState(false);
  useEffect(() => { document.documentElement.style.setProperty('--route-index', String(pages.findIndex(([id]) => id === route))); window.scrollTo(0, 0); setReady(true); }, [route]);
  const Page = route === 'home' ? Home : route === 'about' ? About : Contact;
  return <div className={`site ${ready ? 'is-ready' : ''}`}><Snowfall /><Nav route={route} /><Page /><Transition route={route} /></div>;
}

createRoot(document.getElementById('root')).render(<App />);
