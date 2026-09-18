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

const sakuraCards = [
  { number:'01', label:'WHAT I BUILD', title:'PROJECTS', image:'https://images.unsplash.com/photo-1555099855-9ecf5abc5cb2?auto=format&fit=crop&w=900&q=78', accent:'Builds with a point of view.', text:'A selection of the things I actually build — business websites, immersive interfaces and visual experiments.', items:['Royal Touch — business website direction','FOG — this portfolio and visual experiment','Landing pages, responsive interfaces and redesigns'], meta:'WEB · UI · RESPONSIVE' },
  { number:'02', label:'THE STACK', title:'TOOLS + CODE', image:'./assets/sakura-02.svg', accent:'The machinery behind the image.', text:'The technologies behind the interfaces: enough engineering to make the visual idea fast, responsive and maintainable.', items:['HTML · CSS · JavaScript','TypeScript · React · Next.js','Vite · Git · Linux · Framer Motion'], meta:'FRONTEND · SYSTEMS · MOTION' },
  { number:'03', label:'CURRENTLY EXPLORING', title:'LEARNING', image:'./assets/sakura-03.svg', accent:'Always one layer deeper.', text:'The current focus is on cleaner systems, richer interactions and lighter experiences.', items:['Advanced React architecture','TypeScript depth and data flow','Interaction, motion and frontend performance'], meta:'STUDY · TEST · REFINE' },
  { number:'04', label:'THE PERSON BEHIND IT', title:'ABOUT ME', image:'./assets/sakura-04.svg', accent:'Less noise. More intent.', text:'I care about hierarchy, atmosphere and the small details that make a digital product feel considered.', items:['Focus — web / UI','Style — minimal / immersive','Approach — design · build · refine'], meta:'CLARITY · DETAIL · RESTRAINT' },
  { number:'05', label:'FOR CLIENTS', title:'SERVICES', image:'./assets/sakura-05.svg', accent:'From first frame to final pass.', text:'A practical set of web services for small businesses and independent brands.', items:['Custom websites','Landing pages and redesigns','Responsive UI · visual design · performance'], meta:'BUILD · REDESIGN · DELIVERY' },
  { number:'06', label:'SIDE LAB', title:'EXPERIMENTS', image:'./assets/sakura-06.svg', accent:'Make the interface breathe.', text:'Motion, glass, depth and small interactions built because the web becomes more interesting when it can feel cinematic.', items:['Layered photography and depth','Canvas snowfall and atmosphere','Glass surfaces and scene transitions'], meta:'MOTION · DEPTH · ATMOSPHERE' },
  { number:'07', label:'VISUAL LANGUAGE', title:'DIRECTION', image:'./assets/sakura-07.svg', accent:'A quiet visual language.', text:'Pink sakura against black, smoked glass, editorial type and restrained motion define the visual direction.', items:['Pink sakura on black','Smoked glass surfaces','Editorial typography + restrained motion'], meta:'IMAGE · TYPE · ATMOSPHERE' },
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
  const cardsRef = useRef([]);
  const phaseRef = useRef(0);
  const targetRef = useRef(0);
  const frameRef = useRef(0);
  const activeRef = useRef(0);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef(0);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  const wrap = (value, total) => ((value + total / 2) % total + total) % total - total / 2;
  const modulo = (value, total) => ((value % total) + total) % total;

  const setActiveIndex = (index) => {
    const next = modulo(Math.round(index), sakuraCards.length);
    if (activeRef.current === next) return;
    activeRef.current = next;
    setActive(next);
  };

  const render = () => {
    const stage = stageRef.current;
    if (!stage) {
      frameRef.current = 0;
      return;
    }

    const next = phaseRef.current + (targetRef.current - phaseRef.current) * 0.14;
    phaseRef.current = Math.abs(targetRef.current - next) < 0.0005 ? targetRef.current : next;

    const center = Math.round(phaseRef.current);
    setActiveIndex(center);

    const width = stage.clientWidth;
    const step = width < 680 ? 255 : width < 1000 ? 300 : 330;
    const total = sakuraCards.length;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const slot = wrap(index - phaseRef.current, total);
      const abs = Math.abs(slot);
      const x = slot * step + slot * abs * 13;
      const y = abs * abs * 8;
      const scale = abs < 0.5 ? 1.06 : Math.max(0.72, 1 - abs * 0.078);
      const rotate = slot * -3.2;
      const rotateY = slot * -9;
      const opacity = Math.max(0.08, 1 - Math.max(0, abs - 2.1) * 0.48);

      card.style.transform =
        "translate3d(" + x + "px," + y + "px,0) rotateZ(" + rotate + "deg) rotateY(" + rotateY + "deg) scale(" + scale + ")";
      card.style.opacity = opacity;
      card.style.zIndex = String(100 - Math.round(abs * 12));
      card.classList.toggle("is-center", abs < 0.5);
      card.tabIndex = abs < 0.5 ? 0 : -1;
    });

    if (Math.abs(targetRef.current - phaseRef.current) > 0.0005) {
      frameRef.current = requestAnimationFrame(render);
    } else {
      frameRef.current = 0;
    }
  };

  const requestRender = () => {
    if (!frameRef.current) frameRef.current = requestAnimationFrame(render);
  };

  const animateTo = (value) => {
    targetRef.current = value;
    requestRender();
  };

  const nearestVirtualIndex = (index) => {
    const total = sakuraCards.length;
    const current = targetRef.current;
    const cycle = Math.round((current - index) / total);
    return index + cycle * total;
  };

  const moveBy = (direction) => {
    animateTo(Math.round(targetRef.current) + direction);
  };

  useEffect(() => {
    const preload = sakuraCards.map((card) => {
      const image = new Image();
      image.decoding = "async";
      image.loading = "eager";
      image.src = card.image;
      return image;
    });

    render();

    const stage = stageRef.current;
    if (!stage) return undefined;

    const onWheel = (event) => {
      if (open !== null) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;

      event.preventDefault();
      event.stopPropagation();

      const direction = delta > 0 ? 1 : -1;
      const current = Math.round(targetRef.current);
      if (current !== targetRef.current) {
        targetRef.current = current;
      }
      animateTo(current + direction);
    };

    const onPointerDown = (event) => {
      if (open !== null) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startTarget: targetRef.current,
        moved: false,
      };

      event.preventDefault();
    };

    const onPointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId || open !== null) return;

      const dx = event.clientX - drag.startX;
      if (Math.abs(dx) > 8) drag.moved = true;

      if (drag.moved) {
        event.preventDefault();
        targetRef.current = drag.startTarget - dx / 245;
        requestRender();
      }
    };

    const onPointerUp = (event) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      if (drag.moved) {
        event.preventDefault();
        targetRef.current = Math.round(targetRef.current);
        requestRender();

        suppressClickRef.current = true;
        window.clearTimeout(suppressTimerRef.current);
        suppressTimerRef.current = window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 260);
      }

      dragRef.current = null;
    };

    const onPointerCancel = (event) => {
      dragRef.current = null;
      suppressClickRef.current = false;
      window.clearTimeout(suppressTimerRef.current);
      if (event.cancelable) event.preventDefault();
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown, { passive: false });
    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUp, { passive: false });
    window.addEventListener("pointercancel", onPointerCancel, { passive: false });

    return () => {
      preload.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      window.clearTimeout(suppressTimerRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(null);
        return;
      }

      if (open !== null) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveBy(1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveBy(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    requestRender();
  }, []);

  const onCardClick = (index) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      window.clearTimeout(suppressTimerRef.current);
      return;
    }

    const slot = wrap(index - phaseRef.current, sakuraCards.length);

    if (Math.abs(slot) >= 0.5) {
      animateTo(nearestVirtualIndex(index));
      return;
    }

    setOpen((current) => current === index ? null : index);
  };

  const onCardKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onCardClick(index);
    }
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

      <div className={"sakura-stage" + (open !== null ? " is-open" : "")} ref={stageRef}>
        <div className="sakura-track">
          {sakuraCards.map((card, index) => (
            <button
              key={card.number}
              ref={(node) => { cardsRef.current[index] = node; }}
              className={"sakura-card" + (active === index ? " is-center" : "")}
              type="button"
              onClick={() => onCardClick(index)}
              onKeyDown={(event) => onCardKeyDown(event, index)}
              aria-label={"Open " + card.title}
              aria-pressed={open === index}
              tabIndex={active === index ? 0 : -1}
            >
              <div className="sakura-card-media">
                <img src={card.image} alt="" decoding="async" draggable="false" />
              </div>
              <div className="sakura-card-sheen" aria-hidden="true" />
              <span className="sakura-card-number">{card.number}</span>
              <div className="sakura-card-copy">
                <small>{card.label}</small>
                <strong>{card.title}</strong>
                <em>{active === index ? "CLICK TO REVEAL" : "BRING TO CENTER"}</em>
              </div>
            </button>
          ))}
        </div>

        <button type="button" className="sakura-nav sakura-nav-prev" onClick={() => moveBy(-1)} aria-label="Previous card">←</button>
        <button type="button" className="sakura-nav sakura-nav-next" onClick={() => moveBy(1)} aria-label="Next card">→</button>

        <div className="sakura-stage-side">
          <span className="sakura-live-dot" />
          <span>DRAG · WHEEL · CLICK</span>
        </div>

        <div className="sakura-stage-hud">
          <b>{String(active + 1).padStart(2, "0")}</b><em>/</em><span>07</span>
        </div>

        <div
          className={"sakura-open" + (open !== null ? " is-open" : "")}
          aria-hidden={open === null}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(null);
          }}
        >
          {open !== null && (
            <>
              <div className="sakura-open-media">
                <img src={sakuraCards[open].image} alt={sakuraCards[open].title} decoding="async" draggable="false" />
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
                  <button type="button" onClick={() => setOpen(null)}>CLOSE ×</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="sakura-index-footer">
        <span><i /> DRAG · WHEEL · CLICK</span>
        <strong aria-live="polite">{String(active + 1).padStart(2, "0")} <em>/</em> 07</strong>
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
