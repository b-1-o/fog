import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';
const BONSai_IMAGE = './assets/bonsi.jpeg';
const SAKURA_IMAGE = './assets/ssakura.jpg';

const services = [
  ['01', 'CUSTOM WEBSITES', 'Distinct digital spaces shaped around the business, its audience and the feeling it should leave behind.'],
  ['02', 'LANDING PAGES', 'High-clarity pages that make the important thing obvious without turning the experience into a template.'],
  ['03', 'REDESIGN', 'A stronger visual language, cleaner hierarchy and more intentional interaction for an existing site.'],
  ['04', 'RESPONSIVE UI', 'Layouts that remain composed and readable from wide desktop screens to compact phones.'],
  ['05', 'UI / VISUAL DESIGN', 'Typography, spacing, surfaces, motion and composition treated as one system.'],
  ['06', 'PERFORMANCE', 'Lean builds, restrained assets and deliberate animation so the polish still feels fast.'],
];

const process = [
  ['01', 'OBSERVE', 'Find the signal: what matters, who it is for and what needs to change.'],
  ['02', 'SHAPE', 'Build the visual direction, information hierarchy and interaction language.'],
  ['03', 'BUILD', 'Translate the idea into a responsive, polished interface with real attention to detail.'],
  ['04', 'REFINE', 'Remove friction, sharpen the final pass and leave only what earns its place.'],
];

const toolkit = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Framer Motion', 'Vite', 'Git', 'Linux', 'UI Design'];

function useSmoothScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const rect = el.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, -rect.top / total)));
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionRef]);

  return progress;
}

function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = [];
    let width = 0;
    let height = 0;
    let ratio = 1;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;

    const makeParticle = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : -14 - Math.random() * 80,
      size: 0.7 + Math.random() * 2.5,
      speed: 11 + Math.random() * 26,
      drift: 4 + Math.random() * 12,
      depth: 0.35 + Math.random() * 1.05,
      opacity: 0.16 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI,
    });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const density = width < 700 ? 62 : width < 1200 ? 92 : 118;
      particles.length = 0;
      for (let i = 0; i < density; i += 1) particles.push(makeParticle(true));
    };

    const draw = (now) => {
      const delta = Math.min(0.035, (now - last) / 1000);
      last = now;
      elapsed += delta;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        const depth = particle.depth;
        if (!reduceMotion) {
          particle.y += particle.speed * depth * delta;
          particle.x += (Math.sin(elapsed * 0.55 + particle.phase) * particle.drift + 2.5) * depth * delta;
        }

        if (particle.y > height + 16 || particle.x > width + 18) {
          Object.assign(particle, makeParticle(false), { x: Math.random() * width });
        }
        if (particle.x < -18) particle.x = width + 16;

        const size = particle.size * depth;
        context.save();
        context.translate(particle.x, particle.y);
        context.globalAlpha = particle.opacity * (0.62 + depth * 0.26);
        context.fillStyle = '#ffffff';
        context.shadowColor = 'rgba(255,255,255,.38)';
        context.shadowBlur = depth > 0.82 ? 5 : 2;

        if (size < 1.65) {
          context.beginPath();
          context.arc(0, 0, size, 0, Math.PI * 2);
          context.fill();
        } else {
          context.rotate(particle.rotation + Math.sin(elapsed + particle.phase) * 0.15);
          context.fillRect(-size * 0.5, -size * 0.14, size, size * 0.28);
          context.fillRect(-size * 0.14, -size * 0.5, size * 0.28, size);
        }
        context.restore();
      });

      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="snow-canvas" aria-hidden="true" />;
}

function BonsaiHero() {
  const sectionRef = useRef(null);
  const progress = useSmoothScrollProgress(sectionRef);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    let nextX = 0;
    let nextY = 0;
    const onMove = (event) => {
      nextX = event.clientX / window.innerWidth - 0.5;
      nextY = event.clientY / window.innerHeight - 0.5;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setMouse({ x: nextX, y: nextY });
          raf = 0;
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const style = useMemo(() => ({
    '--mouse-x': `${mouse.x * -24}px`,
    '--mouse-y': `${mouse.y * -16}px`,
    '--mouse-x-back': `${mouse.x * -42}px`,
    '--mouse-y-back': `${mouse.y * -28}px`,
    '--image-scale': String(1.018 + progress * 0.1),
    '--depth-shift': `${progress * -14}px`,
  }), [progress, mouse]);

  return (
    <section ref={sectionRef} className="hero-stage" id="home">
      <div className="hero-sticky">
        <div className="hero-depth-back" style={style} aria-hidden="true">
          <img src={BONSai_IMAGE} alt="" />
        </div>
        <div className="hero-photo" style={style} aria-hidden="true">
          <img src={BONSai_IMAGE} alt="" />
        </div>
        <div className="hero-depth-fog" aria-hidden="true" />
        <div className="hero-photo-glass" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <header className="nav glass-nav">
          <a className="brand" href="#home">B1O <span>/ WEB</span></a>
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <a href="#contact">CONTACT</a>
          </nav>
          <a className="nav-cta" href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
        </header>

        <div className="hero-copy-wrap">
          <div className="hero-kicker glass-pill">WEB DEVELOPER · UNITED STATES</div>
          <h1 className="hero-title">Built with<br /><em>patience.</em></h1>
          <p className="hero-description">Clean interfaces, responsive websites and digital experiences for small businesses and independent brands.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#about">EXPLORE <span>↓</span></a>
            <a className="secondary-action" href="#contact">START A PROJECT <span>↗</span></a>
          </div>
        </div>

        <div className="hero-meta glass-panel">
          <div><span>FOCUS</span><strong>WEB / UI</strong></div>
          <div><span>STATUS</span><strong>AVAILABLE</strong></div>
          <div><span>APPROACH</span><strong>DESIGN · BUILD · REFINE</strong></div>
        </div>

        <div className="hero-caption">A QUIET INTERFACE / ONE INTENTIONAL OBJECT</div>
        <div className="hero-scroll">SCROLL <span>↓</span></div>
        <div className="hero-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </section>
  );
}

function SectionHead({ number, title, aside }) {
  return (
    <div className="section-head">
      <span>{number} / {title}</span>
      <span>{aside}</span>
    </div>
  );
}

function App() {
  return (
    <div className="site">
      <Snowfall />
      <BonsaiHero />

      <main>
        <section className="content-section about-section" id="about">
          <SectionHead number="01" title="ABOUT" aside="SHAPED WITH RESTRAINT" />
          <div className="about-grid">
            <h2>I make small businesses <em>look like they mean it.</em></h2>
            <div className="about-copy">
              <p className="lead">I design and build websites where typography, spacing, motion and hierarchy all point in the same direction.</p>
              <p>Instead of adding more, I look for what can be removed. The result is a site that feels calm, clear and deliberate — but still has enough character to be remembered.</p>
              <div className="about-specs">
                <span>WEB / UI <b>FOCUS</b></span>
                <span>DESIGN · BUILD · REFINE <b>APPROACH</b></span>
                <span>UNITED STATES <b>BASED</b></span>
              </div>
              <a className="text-link" href={FIVERR_URL} target="_blank" rel="noreferrer">START ON FIVERR ↗</a>
            </div>
          </div>
        </section>

        <section className="statement-band">
          <div className="statement-image-back" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} aria-hidden="true" />
          <div className="statement-image" style={{ backgroundImage: `url(${SAKURA_IMAGE})` }} aria-hidden="true" />
          <div className="statement-glass" aria-hidden="true" />
          <div className="statement-overlay" aria-hidden="true" />
          <p>GOOD DESIGN DOESN'T<br /><em>SHOUT.</em></p>
          <span>02 / PRINCIPLE</span>
        </section>

        <section className="content-section services-section" id="services">
          <SectionHead number="03" title="SERVICES" aside="WHAT I BUILD" />
          <div className="service-list">
            {services.map(([n, title, copy]) => (
              <a href="#contact" className="service-row" key={n}>
                <span className="service-no">{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="service-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="content-section process-section">
          <SectionHead number="04" title="PROCESS" aside="LESS NOISE · MORE INTENT" />
          <div className="process-grid">
            {process.map(([n, title, copy]) => (
              <div className="process-card" key={n}>
                <span>{n}</span>
                <div className="process-line" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section toolkit-section">
          <SectionHead number="05" title="TOOLKIT" aside="THE MATERIALS" />
          <div className="toolkit-marquee" aria-hidden="true">
            <div className="toolkit-track">
              {[...toolkit, ...toolkit].map((tool, index) => <span key={`${tool}-${index}`}>{tool} <i>✳</i></span>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-depth-back" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} aria-hidden="true" />
          <div className="contact-photo" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} aria-hidden="true" />
          <div className="contact-overlay" aria-hidden="true" />
          <SectionHead number="06" title="CONTACT" aside="LET'S BUILD SOMETHING QUIETLY DISTINCT" />
          <div className="contact-content">
            <p className="contact-kicker">HAVE SOMETHING WORTH BUILDING?</p>
            <h2>Let's make<br /><em>it clear.</em></h2>
            <div className="contact-actions">
              <a href={FIVERR_URL} target="_blank" rel="noreferrer">START A PROJECT ↗</a>
              <a href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>B1O / WEB</span>
        <span>DESIGN · BUILD · REFINE</span>
        <span>© 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
