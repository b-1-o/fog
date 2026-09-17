import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FIVERR_URL = 'https://www.fiverr.com/s/432lpeR';
const BONSai_IMAGE = './assets/bonsi.jpeg';
const SAKURA_IMAGE = './assets/ssakura.jpg';

const pages = [
  ['home', 'HOME'],
  ['about', 'ABOUT'],
  ['select', 'SELECT'],
  ['contact', 'CONTACT'],
];

const infoCards = [
  {
    id: 'projects',
    number: '01',
    eyebrow: 'WHAT I BUILD',
    title: 'PROJECTS',
    summary: 'A look at the things I actually build — from business websites to immersive interfaces and visual experiments.',
    tone: 'sakura',
  },
  {
    id: 'tools',
    number: '02',
    eyebrow: 'THE STACK',
    title: 'TOOLS + CODE',
    summary: 'The languages, frameworks and tools behind the interfaces — organized by what they are used for.',
    tone: 'silver',
  },
  {
    id: 'learning',
    number: '03',
    eyebrow: 'CURRENTLY EXPLORING',
    title: 'LEARNING',
    summary: 'What I am actively studying and experimenting with to make the next build better than the last one.',
    tone: 'pink',
  },
  {
    id: 'about',
    number: '04',
    eyebrow: 'THE PERSON BEHIND IT',
    title: 'ABOUT ME',
    summary: 'A little more context about how I think, what I care about and the kind of work I want to create.',
    tone: 'dark',
  },
  {
    id: 'services',
    number: '05',
    eyebrow: 'FOR CLIENTS',
    title: 'SERVICES',
    summary: 'A compact view of the work I can take from first idea to polished, responsive delivery.',
    tone: 'silver',
  },
  {
    id: 'experiments',
    number: '06',
    eyebrow: 'SIDE LAB',
    title: 'EXPERIMENTS',
    summary: 'Motion, glass, depth, canvas effects and strange little interactions built simply because they are interesting.',
    tone: 'sakura',
  },
];

const tools = ['HTML','CSS','JavaScript','TypeScript','React','Next.js','Framer Motion','Vite','Git','Linux','UI Design'];

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
    window.addEventListener('scroll', onScroll, { passive:true });
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
    const ctx = canvas?.getContext('2d', { alpha:true });
    if (!ctx) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w=0,h=0,dpr=1,frame=0,last=performance.now(),time=0;
    const dots=[];
    const seed=()=>({x:Math.random()*w,y:Math.random()*h,r:.45+Math.random()*2.4,v:10+Math.random()*28,d:.25+Math.random()*.95,a:.12+Math.random()*.5,p:Math.random()*6.28});
    const resize=()=>{ w=innerWidth; h=innerHeight; dpr=Math.min(devicePixelRatio||1,1.35); canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); dots.length=0; const count=w<700?58:w<1200?86:112; for(let i=0;i<count;i++) dots.push(seed()); };
    const draw=(now)=>{
      const dt=Math.min(.035,(now-last)/1000); last=now; time+=dt; ctx.clearRect(0,0,w,h);
      for(const s of dots){
        if(!reduce){s.y+=s.v*s.d*dt;s.x+=(Math.sin(time*.55+s.p)*5+2)*s.d*dt;}
        if(s.y>h+12){s.y=-10;s.x=Math.random()*w;}
        if(s.x>w+12)s.x=-8;
        ctx.globalAlpha=s.a*(.55+s.d*.3);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(s.x,s.y,s.r*s.d,0,Math.PI*2);ctx.fill();
      }
      frame=requestAnimationFrame(draw);
    };
    resize(); addEventListener('resize',resize,{passive:true}); frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);removeEventListener('resize',resize);};
  },[]);
  return <canvas ref={ref} className="snow" aria-hidden="true"/>;
}

function Nav({route}) {
  return <header className="topbar glass"><a className="logo" href="#/home">B1O<span>/WEB</span></a><nav>{pages.map(([id,label])=><a key={id} className={route===id?'active':''} href={`#/${id}`}>{label}</a>)}</nav><a className="top-cta" href={FIVERR_URL} target="_blank" rel="noreferrer">FIVERR ↗</a></header>;
}

function GlassButton({href,children,light=false}) { return <a className={`glass-button ${light?'light':''}`} href={href}>{children}</a>; }

function Home() {
  return <main className="page home-page">
    <section className="home-hero depth-scene">
      <div className="depth-back" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/>
      <div className="depth-mid" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/>
      <div className="depth-light"/>
      <div className="scene-vignette"/>
      <div className="hero-copy">
        <span className="eyebrow glass-chip">WEB DEVELOPER · UNITED STATES</span>
        <h1>Built with<br/><i>patience.</i></h1>
        <p>Clean interfaces, responsive websites and digital experiences for small businesses and independent brands.</p>
        <div className="button-row"><GlassButton href="#/select" light>OPEN SELECT <b>↗</b></GlassButton><GlassButton href="#/contact">START A PROJECT <b>↗</b></GlassButton></div>
      </div>
      <div className="hero-index glass"><span>SCROLL TO MOVE</span><strong>01 / 04</strong></div>
      <div className="hero-note">ONE OBJECT · MANY LAYERS</div>
    </section>
    <section className="home-bridge">
      <div className="section-code">00 / ENTRY</div>
      <div className="bridge-grid"><div><p className="mega">I make small businesses <i>look like they mean it.</i></p></div><div className="bridge-copy"><p>I design and build websites where typography, spacing, motion and hierarchy all point in the same direction.</p><p className="muted">Instead of adding more, I look for what can be removed.</p><GlassButton href="#/about">ABOUT THE APPROACH <b>↗</b></GlassButton></div></div>
    </section>
    <section className="sakura-quote depth-scene">
      <div className="sakura-back" style={{backgroundImage:`url(${SAKURA_IMAGE})`}}/><div className="sakura-front" style={{backgroundImage:`url(${SAKURA_IMAGE})`}}/><div className="sakura-shine"/><div className="quote-content"><span>02 / PRINCIPLE</span><h2>GOOD DESIGN DOESN'T<br/><i>SHOUT.</i></h2><a href="#/select">OPEN THE INDEX ↗</a></div>
    </section>
  </main>;
}

function About() {
  return <main className="page internal-page about-page">
    <section className="page-heading"><span>01 / ABOUT</span><h1>Less noise.<br/><i>More intent.</i></h1><p>A small digital practice focused on clean interfaces, strong hierarchy and details that reward attention.</p></section>
    <section className="about-feature"><div className="feature-image depth-card" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/><div className="feature-copy"><span>THE APPROACH</span><h2>Design first.<br/><i>Build carefully.</i></h2><p>Every choice has a job: typography gives rhythm, spacing gives calm, motion gives continuity, and technology stays behind the experience.</p><div className="mini-grid"><div><b>FOCUS</b><span>WEB / UI</span></div><div><b>BASED</b><span>UNITED STATES</span></div><div><b>STYLE</b><span>MINIMAL · IMMERSIVE</span></div><div><b>OUTPUT</b><span>RESPONSIVE · FAST</span></div></div></div></section>
    <section className="principles"><div className="section-code">02 / PRINCIPLES</div><div className="principle-grid">{['REMOVE THE UNNECESSARY','MAKE THE IMPORTANT OBVIOUS','MOTION SHOULD HAVE A REASON','DETAILS CREATE MEMORY'].map((x,i)=><div className="principle" key={x}><span>0{i+1}</span><h3>{x}</h3><i>✳</i></div>)}</div></section>
  </main>;
}

function CardContent({id}) {
  if (id === 'projects') return <div className="expanded-block"><div className="expanded-lead">A small archive of real builds and visual systems.</div><div className="project-items"><article><span>01 / CLIENT SITE</span><h3>ROYAL TOUCH</h3><p>Mobile wash website direction with a dark blue / gold visual system, service presentation and conversion-focused structure.</p><div className="tag-row"><span>HTML</span><span>CSS</span><span>FORMSPREE</span><span>RESPONSIVE UI</span></div></article><article><span>02 / PORTFOLIO</span><h3>FOG</h3><p>This portfolio itself: cinematic imagery, glass UI, page transitions, snow ambience and layered depth built to stay lightweight.</p><div className="tag-row"><span>REACT</span><span>VITE</span><span>CSS</span><span>GITHUB PAGES</span></div></article></div></div>;
  if (id === 'tools') return <div className="expanded-block"><div className="expanded-lead">A compact map of the stack behind the work.</div><div className="tool-groups"><div><span>STRUCTURE</span><strong>HTML · CSS · JavaScript</strong><p>The foundation for semantic structure, responsive layout and interaction.</p></div><div><span>APPLICATION</span><strong>TypeScript · React · Next.js</strong><p>For component systems, state, routing and larger interface builds.</p></div><div><span>MOTION</span><strong>Framer Motion · CSS</strong><p>Used for transitions, depth, micro-interactions and quiet movement.</p></div><div><span>WORKFLOW</span><strong>Vite · Git · Linux</strong><p>Fast local development, version control and a Linux-first workflow.</p></div></div></div>;
  if (id === 'learning') return <div className="expanded-block"><div className="expanded-lead">The things getting deliberate time right now.</div><div className="learning-list"><div><span>01</span><strong>Advanced React architecture</strong><em>COMPONENT SYSTEMS</em></div><div><span>02</span><strong>TypeScript depth</strong><em>TYPES · DATA FLOW</em></div><div><span>03</span><strong>Interaction + motion</strong><em>TRANSITIONS · DEPTH</em></div><div><span>04</span><strong>Performance craft</strong><em>LIGHTER BUILDS</em></div><div><span>05</span><strong>Modern frontend patterns</strong><em>ACCESSIBILITY · RESPONSIVE UI</em></div></div></div>;
  if (id === 'about') return <div className="expanded-block"><div className="about-card-grid"><div><span>FOCUS</span><strong>WEB / UI</strong><p>Interfaces that feel deliberate without becoming over-designed.</p></div><div><span>APPROACH</span><strong>DESIGN · BUILD · REFINE</strong><p>Start with the hierarchy, then make the code serve the idea.</p></div><div><span>STYLE</span><strong>MINIMAL · IMMERSIVE</strong><p>Dark surfaces, typography, glass, depth and controlled motion.</p></div><div><span>GOAL</span><strong>MAKE IT CLEAR</strong><p>Give every important thing enough space to be understood.</p></div></div></div>;
  if (id === 'services') return <div className="expanded-block"><div className="service-pills">{['CUSTOM WEBSITES','LANDING PAGES','REDESIGN','RESPONSIVE UI','UI / VISUAL DESIGN','PERFORMANCE'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div><p className="expanded-note">From a first layout to the final responsive pass, the goal is the same: make the important thing obvious.</p></div>;
  return <div className="expanded-block"><div className="experiment-grid"><div><span>DEPTH</span><strong>LAYERED PHOTOGRAPHY</strong><p>Multiple image planes, blur and scale create depth without WebGL.</p></div><div><span>SNOW</span><strong>CANVAS ATMOSPHERE</strong><p>One lightweight canvas gives the entire site a shared seasonal layer.</p></div><div><span>GLASS</span><strong>SMOKED SURFACES</strong><p>Blur, transparency, highlights and subtle borders create the interface material.</p></div><div><span>TRANSITIONS</span><strong>ROUTE WASH</strong><p>Hash-page changes use a full-screen transition to make navigation feel like a scene change.</p></div></div></div>;
}

function Select() {
  const [open,setOpen]=useState('projects');
  return <main className="page internal-page select-page">
    <section className="page-heading"><span>02 / SELECT</span><h1>A set of<br/><i>things about me.</i></h1><p>Not a list. A collection of cards. Open one to see projects, tools, learning, services, experiments and the thinking behind the work.</p></section>
    <section className="info-card-grid">
      {infoCards.map(card=>{
        const isOpen=open===card.id;
        return <article key={card.id} className={`info-card ${isOpen?'is-open':''} tone-${card.tone}`}>
          <button className="info-card-head" onClick={()=>setOpen(isOpen?'':card.id)} aria-expanded={isOpen}>
            <span className="info-card-number">{card.number}</span>
            <span className="info-card-title"><small>{card.eyebrow}</small><strong>{card.title}</strong><em>{card.summary}</em></span>
            <span className="info-card-plus">{isOpen?'−':'+'}</span>
          </button>
          <div className="info-card-reveal"><CardContent id={card.id}/></div>
        </article>;
      })}
    </section>
    <section className="tool-wall"><div className="section-code">07 / QUICK TOOLKIT</div><div className="tool-cloud">{tools.map(tool=><span key={tool}>{tool}</span>)}</div></section>
  </main>;
}

function Contact() {
  return <main className="page contact-page depth-scene"><div className="contact-back" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/><div className="contact-back-blur" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/><div className="contact-shine"/><section className="contact-inner"><span>03 / CONTACT</span><h1>Let's make<br/><i>it clear.</i></h1><p>Have something worth building?</p><div className="button-row"><GlassButton href={FIVERR_URL} light>START A PROJECT ↗</GlassButton><GlassButton href="#/select">OPEN SELECT ↗</GlassButton></div></section><div className="contact-footer"><span>DESIGN · BUILD · REFINE</span><span>© 2026</span></div></main>;
}

function Transition({route}) { return <div key={route} className="route-wash"><span>{route.toUpperCase()}</span></div>; }

function App(){
  const route=useRoute(); useScrollDepth(); const [ready,setReady]=useState(false);
  useEffect(()=>{document.documentElement.style.setProperty('--route-index',String(pages.findIndex(([id])=>id===route))); window.scrollTo(0,0); setReady(true);},[route]);
  const Page=route==='home'?Home:route==='about'?About:route==='select'?Select:Contact;
  return <div className={`site ${ready?'is-ready':''}`}><Snowfall/><Nav route={route}/><Page/><Transition route={route}/></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
