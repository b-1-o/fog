import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';
const BONSai_IMAGE = '/assets/bonsi.jpeg';

const projects = [
  { n: '01', name: 'ROYAL TOUCH', type: 'Mobile car wash website', tags: 'Brand · UI · Conversion', tone: 'silver' },
  { n: '02', name: 'B1O', type: 'Experimental digital interface', tags: 'Product · Motion · Software', tone: 'pink' },
  { n: '03', name: 'FOG', type: 'Immersive portfolio study', tags: 'WebGL · Atmosphere · Interaction', tone: 'dark' },
];

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

const toolkit = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Three.js', 'Framer Motion', 'Vite', 'Git', 'Linux', 'UI Design'];

function useSmoothScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(value);
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
    '--hero-progress': progress,
    '--mouse-x': `${mouse.x}`,
    '--mouse-y': `${mouse.y}`,
  }), [progress, mouse]);

  return (
    <section ref={sectionRef} className="hero-stage" id="home" style={style}>
      <div className="hero-sticky">
        <div className="hero-photo" aria-hidden="true">
          <img src={BONSai_IMAGE} alt="" />
        </div>
        <div className="hero-photo-glass" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <header className="nav glass-nav">
          <a className="brand" href="#home">B1O <span>/ WEB</span></a>
          <nav>
            <a href="#about">ABOUT</a>
            <a href="#work">WORK</a>
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

function SectionHead({ number, title, aside, dark = true }) {
  return (
    <div className={`section-head ${dark ? 'section-head-dark' : ''}`}>
      <span>{number} / {title}</span>
      <span>{aside}</span>
    </div>
  );
}

function App() {
  return (
    <div className="site">
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
          <div className="statement-image" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
          <div className="statement-overlay" />
          <p>GOOD DESIGN DOESN'T<br /><em>SHOUT.</em></p>
          <span>02 / PRINCIPLE</span>
        </section>

        <section className="content-section work-section" id="work">
          <SectionHead number="02" title="SELECTED WORK" aside="A FEW BUILDS" />
          <div className="work-grid">
            {projects.map((project, index) => (
              <article className={`work-card work-card-${project.tone} ${index === 0 ? 'work-card-large' : ''}`} key={project.name}>
                <div className="work-card-visual">
                  {project.name === 'FOG' ? <img src={BONSai_IMAGE} alt="" /> : <div className="visual-word">{project.name}</div>}
                  <span className="work-index">{project.n}</span>
                  <span className="work-arrow">↗</span>
                </div>
                <div className="work-info">
                  <div><h3>{project.name}</h3><p>{project.type}</p></div>
                  <span>{project.tags}</span>
                </div>
              </article>
            ))}
          </div>
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
          <div className="tool-marquee" aria-label="Toolkit">
            <div>{[...toolkit, ...toolkit].map((tool, index) => <span key={`${tool}-${index}`}>{tool}</span>)}</div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="contact-image" style={{ backgroundImage: `url(${BONSai_IMAGE})` }} />
          <div className="contact-darken" />
          <div className="contact-content">
            <SectionHead number="06" title="CONTACT" aside="LET'S MAKE IT CLEAR" />
            <div className="contact-lockup">
              <span>HAVE SOMETHING WORTH BUILDING?</span>
              <h2>Let's make<br /><em>it beautiful.</em></h2>
              <div className="contact-actions">
                <a href={FIVERR_URL} target="_blank" rel="noreferrer">START A PROJECT ↗</a>
                <a href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>B1O / WEB</span>
        <span>DESIGN · BUILD · REFINE</span>
        <span>© 2026</span>
      </footer>

      <div className="cursor-orb" aria-hidden="true" />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
