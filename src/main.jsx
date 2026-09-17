import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';
const BONSai_IMAGE = './assets/bonsi.jpeg';
const SAKURA_IMAGE = './assets/ssakura.jpg';

const pages = [
  ['home', 'HOME'],
  ['about', 'ABOUT'],
  ['contact', 'CONTACT'],
];

const sakuraCards = [
  {
    number: '01',
    label: 'WHAT I BUILD',
    title: 'PROJECTS',
    image: SAKURA_IMAGE,
    position: '62% 42%',
    accent: 'Builds with a point of view.',
    text: 'A selection of the things I actually build — business websites, immersive interfaces and visual experiments where the design has a job to do.',
    items: ['Royal Touch — business website direction', 'FOG — this portfolio and visual experiment', 'Landing pages, responsive interfaces and redesigns'],
    meta: 'WEB · UI · RESPONSIVE',
  },
  {
    number: '02',
    label: 'THE STACK',
    title: 'TOOLS + CODE',
    image: 'https://images.unsplash.com/photo-1744298907138-7f9a265c3af4?auto=format&fit=crop&w=1400&q=80',
    position: '50% 56%',
    accent: 'The machinery behind the image.',
    text: 'The technologies behind the interfaces: enough engineering to make the visual idea fast, responsive and maintainable without becoming the visual itself.',
    items: ['HTML · CSS · JavaScript', 'TypeScript · React · Next.js', 'Vite · Git · Linux · Framer Motion'],
    meta: 'FRONTEND · SYSTEMS · MOTION',
  },
  {
    number: '03',
    label: 'CURRENTLY EXPLORING',
    title: 'LEARNING',
    image: 'https://images.unsplash.com/photo-1742759534698-f64fff0d8c3b?auto=format&fit=crop&w=1400&q=80',
    position: '50% 38%',
    accent: 'Always one layer deeper.',
    text: 'The current focus is on building cleaner systems, richer interactions and lighter experiences — learning by making real things instead of collecting tutorials.',
    items: ['Advanced React architecture', 'TypeScript depth and data flow', 'Interaction, motion and frontend performance'],
    meta: 'STUDY · TEST · REFINE',
  },
  {
    number: '04',
    label: 'THE PERSON BEHIND IT',
    title: 'ABOUT ME',
    image: 'https://images.unsplash.com/photo-1775799900931-faa7a553e158?auto=format&fit=crop&w=1400&q=80',
    position: '52% 48%',
    accent: 'Less noise. More intent.',
    text: 'I care about hierarchy, atmosphere and the small details that make a digital product feel considered rather than decorated.',
    items: ['Focus — web / UI', 'Style — minimal / immersive', 'Approach — design · build · refine'],
    meta: 'CLARITY · DETAIL · RESTRAINT',
  },
  {
    number: '05',
    label: 'FOR CLIENTS',
    title: 'SERVICES',
    image: 'https://images.unsplash.com/photo-1775453584154-0e2440583ed2?auto=format&fit=crop&w=1400&q=80',
    position: '50% 48%',
    accent: 'From first frame to final pass.',
    text: 'A practical set of web services for small businesses and independent brands that need a polished online presence without unnecessary complexity.',
    items: ['Custom websites', 'Landing pages and redesigns', 'Responsive UI · visual design · performance'],
    meta: 'BUILD · REDESIGN · DELIVERY',
  },
  {
    number: '06',
    label: 'SIDE LAB',
    title: 'EXPERIMENTS',
    image: 'https://images.unsplash.com/photo-1768058294485-7547a03068ca?auto=format&fit=crop&w=1400&q=80',
    position: '50% 50%',
    accent: 'Make the interface breathe.',
    text: 'Motion, glass, depth, snowfall and strange little interactions built simply because the web becomes more interesting when it can feel cinematic.',
    items: ['Layered photography and depth', 'Canvas snowfall and atmosphere', 'Glass surfaces and scene transitions'],
    meta: 'MOTION · DEPTH · ATMOSPHERE',
  },
  {
    number: '07',
    label: 'VISUAL LANGUAGE',
    title: 'DIRECTION',
    image: 'https://images.unsplash.com/photo-1777750496287-98501c4deeb4?auto=format&fit=crop&w=1400&q=80',
    position: '52% 44%',
    accent: 'A quiet visual language.',
    text: 'The visual direction of this portfolio is deliberately restrained: pink sakura against black, smoked glass, editorial type and motion that never competes with the content.',
    items: ['Pink sakura on black', 'Smoked glass surfaces', 'Editorial typography + restrained motion'],
    meta: 'IMAGE · TYPE · ATMOSPHERE',
  },
];

function routeFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return pages.some(([id]) => id === route) ? route : 'home';
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
      w = innerWidth;
      h = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 1.35);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      const count = w < 700 ? 58 : w < 1200 ? 86 : 112;
      for (let i = 0; i < count; i++) dots.push(seed());
    };
    const draw = (now) => {
      const dt = Math.min(.035, (now - last) / 1000);
      last = now;
      time += dt;
      ctx.clearRect(0, 0, w, h);
      for (const s of dots) {
        if (!reduce) {
          s.y += s.v * s.d * dt;
          s.x += (Math.sin(time * .55 + s.p) * 5 + 2) * s.d * dt;
        }
        if (s.y > h + 12) { s.y = -10; s.x = Math.random() * w; }
        if (s.x > w + 12) s.x = -8;
        ctx.globalAlpha = s.a * (.55 + s.d * .3);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.d, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    resize();
    addEventListener('resize', resize, { passive: true });
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}

function Nav({ route }) {
  return (
    <header className="topbar glass">
      <a className="logo" href="#/home">B1O<span>/WEB</span></a>
      <nav>{pages.map(([id, label]) => <a key={id} className={route === id ? 'active' : ''} href={`#/${id}`}>{label}</a>)}</nav>
      <a className="top-cta" href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
    </header>
  );
}

function GlassButton({ href, children, light = false, onClick }) {
  return <a className={`glass-button ${light ? 'light' : ''}`} href={href} onClick={onClick}>{children}</a>;
}

function JumpToCarousel({ children }) {
  return (
    <a
      className="glass-button light"
      href="#sakura-index"
      onClick={(event) => {
        event.preventDefault();
        document.getElementById('sakura-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children}
    </a>
  );
}

function SakuraCarousel() {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const dragRef = useRef({ active: false, id: null, startX: 0, scrollLeft: 0, moved: false });
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  const centerCard = (index, behavior = 'smooth') => {
    const card = cardRefs.current[index];
    card?.scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
  };

  useEffect(() => {
    centerCard(active, 'auto');
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let raf = 0;
    const updateActive = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let best = 0;
      let bestDistance = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const box = card.getBoundingClientRect();
        const distance = Math.abs((box.left + box.width / 2) - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActive);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', updateActive, { passive: true });
    updateActive();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll);
      removeEventListener('resize', updateActive);
    };
  }, []);

  const onWheel = (event) => {
    if (open !== null) return;
    const track = trackRef.current;
    if (!track) return;
    event.preventDefault();
    track.scrollLeft += event.deltaY + event.deltaX;
  };

  const onPointerDown = (event) => {
    const track = trackRef.current;
    if (!track || open !== null) return;
    dragRef.current = { active: true, id: event.pointerId, startX: event.clientX, scrollLeft: track.scrollLeft, moved: false };
    track.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag.active || drag.id !== event.pointerId || open !== null) return;
    const dx = event.clientX - drag.startX;
    if (Math.abs(dx) > 5) drag.moved = true;
    track.scrollLeft = drag.scrollLeft - dx;
  };

  const onPointerUp = (event) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!drag.active || drag.id !== event.pointerId) return;
    track?.releasePointerCapture?.(event.pointerId);
    drag.active = false;
  };

  const onCardClick = (index) => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    if (index !== active) {
      setOpen(null);
      setActive(index);
      requestAnimationFrame(() => centerCard(index));
      return;
    }
    setOpen((current) => current === index ? null : index);
    requestAnimationFrame(() => centerCard(index));
  };

  const closeOpen = (event) => {
    event.stopPropagation();
    setOpen(null);
    requestAnimationFrame(() => centerCard(active));
  };

  return (
    <section className="sakura-index" id="sakura-index" aria-label="Interactive sakura portfolio gallery">
      <div className="sakura-index-head">
        <div>
          <span className="sakura-index-kicker">01 / VISUAL INDEX</span>
          <h2>Choose a <i>direction.</i></h2>
        </div>
        <p>Scroll inside the gallery to move through the images. Bring one to the center, then click it to reveal the story, tools or work behind the image.</p>
      </div>

      <div
        className={`sakura-gallery ${open !== null ? 'has-open' : ''}`}
        ref={trackRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={(event) => { if (dragRef.current.active) onPointerUp(event); }}
      >
        {sakuraCards.map((card, index) => {
          const isActive = active === index;
          const isOpen = open === index;
          return (
            <article
              key={card.number}
              ref={(node) => { cardRefs.current[index] = node; }}
              className={`sakura-card ${isActive ? 'is-active' : ''} ${isOpen ? 'is-open' : ''}`}
              tabIndex={isActive ? 0 : -1}
              role="button"
              aria-expanded={isOpen}
              onClick={() => onCardClick(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onCardClick(index);
                }
              }}
            >
              <div className="sakura-card-media">
                <img
                  src={card.image}
                  alt="Pink sakura against a dark background"
                  style={{ objectPosition: card.position }}
                  onError={(event) => {
                    if (event.currentTarget.src.endsWith('ssakura.jpg')) return;
                    event.currentTarget.src = SAKURA_IMAGE;
                  }}
                />
              </div>
              <div className="sakura-card-cover">
                <span>{card.number}</span>
                <small>{card.label}</small>
                <strong>{card.title}</strong>
                <em>{isActive ? (isOpen ? 'OPEN' : 'CLICK TO REVEAL') : 'BRING TO CENTER'}</em>
              </div>
              <div className="sakura-card-reveal">
                <div className="sakura-card-reveal-inner">
                  <span>{card.number} / {card.label}</span>
                  <h3>{card.title}</h3>
                  <p className="sakura-card-accent">{card.accent}</p>
                  <p className="sakura-card-text">{card.text}</p>
                  <div className="sakura-card-items">
                    {card.items.map((item) => <div key={item}>{item}</div>)}
                  </div>
                  <div className="sakura-card-meta">{card.meta}</div>
                </div>
                <button type="button" className="sakura-card-close" onClick={closeOpen}>CLOSE ×</button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sakura-index-footer">
        <span><i></i> DRAG · WHEEL · CLICK</span>
        <strong>{String(active + 1).padStart(2, '0')} <em>/</em> {String(sakuraCards.length).padStart(2, '0')}</strong>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="page home-page">
      <section className="home-hero depth-scene">
        <div className="depth-back" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
        <div className="depth-mid" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
        <div className="depth-light" />
        <div className="scene-vignette" />
        <div className="hero-copy">
          <span className="eyebrow glass-chip">WEB DEVELOPER · UNITED STATES</span>
          <h1>Built with<br /><i>patience.</i></h1>
          <p>Clean interfaces, responsive websites and digital experiences for small businesses and independent brands.</p>
          <div className="button-row">
            <JumpToCarousel>EXPLORE INDEX <b>↘</b></JumpToCarousel>
            <GlassButton href="#/contact">START A PROJECT <b>↗</b></GlassButton>
          </div>
        </div>
        <div className="hero-index glass"><span>SCROLL TO MOVE</span><strong>01 / 04</strong></div>
        <div className="hero-note">ONE OBJECT · MANY LAYERS</div>
      </section>

      <SakuraCarousel />

      <section className="home-bridge">
        <div className="section-code">00 / ENTRY</div>
        <div className="bridge-grid">
          <div><p className="mega">I make small businesses <i>look like they mean it.</i></p></div>
          <div className="bridge-copy">
            <p>I design and build websites where typography, spacing, motion and hierarchy all point in the same direction.</p>
            <p className="muted">Instead of adding more, I look for what can be removed.</p>
            <GlassButton href="#/about">ABOUT THE APPROACH <b>↗</b></GlassButton>
          </div>
        </div>
      </section>

      <section className="sakura-quote depth-scene">
        <div className="sakura-back" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} />
        <div className="sakura-front" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} />
        <div className="sakura-shine" />
        <div className="quote-content">
          <span>02 / PRINCIPLE</span>
          <h2>GOOD DESIGN DOESN'T<br /><i>SHOUT.</i></h2>
          <a href="#sakura-index" onClick={(event) => { event.preventDefault(); document.getElementById('sakura-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>OPEN THE INDEX ↗</a>
        </div>
      </section>
    </main>
  );
}

function About() {
  return (
    <main className="page internal-page about-page">
      <section className="page-heading"><span>01 / ABOUT</span><h1>Less noise.<br /><i>More intent.</i></h1><p>A small digital practice focused on clean interfaces, strong hierarchy and details that reward attention.</p></section>
      <section className="about-feature">
        <div className="feature-image depth-card" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
        <div className="feature-copy">
          <span>THE APPROACH</span>
          <h2>Design first.<br /><i>Build carefully.</i></h2>
          <p>Every choice has a job: typography gives rhythm, spacing gives calm, motion gives continuity, and technology stays behind the experience.</p>
          <div className="mini-grid">
            <div><b>FOCUS</b><span>WEB / UI</span></div>
            <div><b>BASED</b><span>UNITED STATES</span></div>
            <div><b>STYLE</b><span>MINIMAL · IMMERSIVE</span></div>
            <div><b>OUTPUT</b><span>RESPONSIVE · FAST</span></div>
          </div>
        </div>
      </section>
      <section className="principles">
        <div className="section-code">02 / PRINCIPLES</div>
        <div className="principle-grid">{['REMOVE THE UNNECESSARY','MAKE THE IMPORTANT OBVIOUS','MOTION SHOULD HAVE A REASON','DETAILS CREATE MEMORY'].map((x, i) => <div className="principle" key={x}><span>0{i + 1}</span><h3>{x}</h3><i>✳</i></div>)}</div>
      </section>
    </main>
  );
}

function Contact() {
  return (
    <main className="page contact-page depth-scene">
      <div className="contact-back" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
      <div className="contact-back-blur" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
      <div className="contact-shine" />
      <section className="contact-inner">
        <span>03 / CONTACT</span>
        <h1>Let's make<br /><i>it clear.</i></h1>
        <p>Have something worth building?</p>
        <div className="button-row">
          <GlassButton href={FIVERR_URL} light>START A PROJECT ↗</GlassButton>
          <a className="glass-button" href="#/home">RETURN HOME ↗</a>
        </div>
      </section>
      <div className="contact-footer"><span>DESIGN · BUILD · REFINE</span><span>© 2026</span></div>
    </main>
  );
}

function Transition({ route }) {
  return <div key={route} className="route-wash"><span>{route.toUpperCase()}</span></div>;
}

function App() {
  const route = useRoute();
  useScrollDepth();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    document.documentElement.style.setProperty('--route-index', String(pages.findIndex(([id]) => id === route)));
    window.scrollTo(0, 0);
    setReady(true);
  }, [route]);
  const Page = route === 'home' ? Home : route === 'about' ? About : Contact;
  return <div className={`site ${ready ? 'is-ready' : ''}`}><Snowfall /><Nav route={route} /><Page /><Transition route={route} /></div>;
}

createRoot(document.getElementById('root')).render(<App />);
