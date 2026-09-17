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

const capabilities = [
  { n:'01', title:'CUSTOM WEBSITES', eyebrow:'DESIGN + BUILD', copy:'Distinct digital spaces shaped around the business, its audience and the feeling it should leave behind.', tools:['HTML','CSS','JavaScript','React'], output:'Responsive production-ready website' },
  { n:'02', title:'LANDING PAGES', eyebrow:'CLARITY + CONVERSION', copy:'High-clarity pages that make the important thing obvious without turning the experience into a template.', tools:['TypeScript','React','Vite'], output:'Fast focused campaign page' },
  { n:'03', title:'REDESIGN', eyebrow:'SYSTEM + DIRECTION', copy:'A stronger visual language, cleaner hierarchy and more intentional interaction for an existing site.', tools:['UI Design','CSS','React'], output:'New visual system + interface' },
  { n:'04', title:'RESPONSIVE UI', eyebrow:'EVERY SCREEN', copy:'Layouts that remain composed and readable from wide desktop screens to compact phones.', tools:['CSS','React','TypeScript'], output:'Adaptive responsive interface' },
  { n:'05', title:'UI / VISUAL DESIGN', eyebrow:'DETAIL + MOTION', copy:'Typography, spacing, surfaces, motion and composition treated as one system.', tools:['Figma mindset','CSS','Framer Motion'], output:'Reusable visual language' },
  { n:'06', title:'PERFORMANCE', eyebrow:'POLISH + SPEED', copy:'Lean builds, restrained assets and deliberate animation so the polish still feels fast.', tools:['Vite','Git','Linux'], output:'Optimized production build' },
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
      <div className="sakura-back" style={{backgroundImage:`url(${SAKURA_IMAGE})`}}/><div className="sakura-front" style={{backgroundImage:`url(${SAKURA_IMAGE})`}}/><div className="sakura-shine"/><div className="quote-content"><span>02 / PRINCIPLE</span><h2>GOOD DESIGN DOESN'T<br/><i>SHOUT.</i></h2><a href="#/select">SEE HOW IT IS BUILT ↗</a></div>
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

function Select() {
  const [open,setOpen]=useState('01');
  return <main className="page internal-page select-page"><section className="page-heading"><span>02 / SELECT</span><h1>Pick a layer.<br/><i>Open it.</i></h1><p>Services, tools and the way I think about building digital experiences — organized as a set of expandable glass cards.</p></section><section className="select-grid">{capabilities.map(card=>{const isOpen=open===card.n;return <article className={`select-card glass ${isOpen?'open':''}`} key={card.n}><button onClick={()=>setOpen(isOpen?'':card.n)}><span>{card.n}</span><div><small>{card.eyebrow}</small><h2>{card.title}</h2></div><b>{isOpen?'−':'+'}</b></button><div className="select-body"><p>{card.copy}</p><div className="select-meta"><div><small>BUILT WITH</small><div className="chips">{card.tools.map(t=><span key={t}>{t}</span>)}</div></div><div><small>DELIVERS</small><strong>{card.output}</strong></div></div></div></article>})}</section><section className="tool-wall"><div className="section-code">03 / TOOLKIT</div><div className="tool-cloud">{tools.map((tool,i)=><span key={tool} style={{'--i':i}}>{tool}</span>)}</div></section></main>;
}

function Contact() {
  return <main className="page contact-page depth-scene"><div className="contact-back" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/><div className="contact-back-blur" style={{backgroundImage:`url(${BONSai_IMAGE})`}}/><div className="contact-shine"/><section className="contact-inner"><span>03 / CONTACT</span><h1>Let's make<br/><i>it clear.</i></h1><p>Have something worth building?</p><div className="button-row"><GlassButton href={FIVERR_URL} light>START A PROJECT ↗</GlassButton><GlassButton href="#/select">EXPLORE SERVICES ↗</GlassButton></div></section><div className="contact-footer"><span>DESIGN · BUILD · REFINE</span><span>© 2026</span></div></main>;
}

function Transition({route}) { return <div key={route} className="route-wash"><span>{route.toUpperCase()}</span></div>; }

function App(){
  const route=useRoute(); useScrollDepth(); const [ready,setReady]=useState(false);
  useEffect(()=>{document.documentElement.style.setProperty('--route-index',String(pages.findIndex(([id])=>id===route))); window.scrollTo(0,0); setReady(true);},[route]);
  const Page=route==='home'?Home:route==='about'?About:route==='select'?Select:Contact;
  return <div className={`site ${ready?'is-ready':''}`}><Snowfall/><Nav route={route}/><Page/><Transition route={route}/></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
