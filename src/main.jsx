import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  { n: '01', name: 'ROYAL TOUCH', type: 'Mobile car wash website.', tags: 'Brand identity · Service presentation · Conversion', className: 'project-wash' },
  { n: '02', name: 'FOREST', type: 'Experimental immersive portfolio.', tags: '3D environment · Atmosphere · Interaction', className: 'project-forest' },
  { n: '03', name: 'B1O', type: 'Experimental digital interface.', tags: 'UI · Motion · Software', className: 'project-bio' },
];

const services = [
  ['01', 'CUSTOM WEBSITES', 'Purpose-built websites designed around a business instead of a template.'],
  ['02', 'LANDING PAGES', 'Focused pages designed to communicate quickly and guide visitors toward action.'],
  ['03', 'WEBSITE REDESIGN', 'Modernize an outdated website while preserving what already works.'],
  ['04', 'RESPONSIVE UI', 'Interfaces that feel intentional across desktop, tablet and mobile.'],
  ['05', 'UI / VISUAL DESIGN', 'Typography, spacing, hierarchy, composition and visual systems.'],
  ['06', 'PERFORMANCE', 'Fast-loading, lightweight experiences with attention to technical quality.'],
];
const process = [
  ['01', 'DISCOVER', 'Understand the business, audience, goals and problems.'],
  ['02', 'SHAPE', 'Turn the information into a clear structure and visual direction.'],
  ['03', 'BUILD', 'Develop the experience with responsive layouts and modern technologies.'],
  ['04', 'LAUNCH', 'Polish, test and prepare the website for real visitors.'],
];
const toolkit = ['HTML','CSS','JavaScript','TypeScript','React','Next.js','Three.js','Framer Motion','Vite','Git','Linux','UI Design'];

function Forest({ progress }) {
  const canvas = useRef(null);
  const state = useRef({ p: 0, t: 0 });
  useEffect(() => {
    const c = canvas.current, ctx = c.getContext('2d');
    let raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => { c.width = innerWidth * DPR; c.height = innerHeight * DPR; ctx.setTransform(DPR,0,0,DPR,0,0); };
    resize(); addEventListener('resize', resize);
    const rand = (seed) => { const x = Math.sin(seed * 999.13) * 43758.5453; return x - Math.floor(x); };
    const drawTree = (x, base, h, w, alpha, layer, drift) => {
      ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x + drift, base); 
      const trunk = Math.max(3, w * .10); ctx.fillStyle = layer === 0 ? '#101b16' : '#18261f';
      ctx.beginPath(); ctx.moveTo(-trunk,0); ctx.lineTo(-trunk*.55,-h*.72); ctx.lineTo(trunk*.55,-h*.72); ctx.lineTo(trunk,0); ctx.fill();
      const levels = layer === 0 ? 7 : 5;
      for(let j=0;j<levels;j++) { const yy=-h*(.25+j*.105), ww=w*(1-j*.075); ctx.fillStyle = layer===0?'#102019':'#172820'; ctx.beginPath(); ctx.moveTo(0,yy-h*.27); ctx.lineTo(-ww,yy+h*.04); ctx.lineTo(ww,yy+h*.04); ctx.closePath(); ctx.fill(); }
      ctx.restore();
    };
    const frame = (now) => {
      state.current.t = now*.001; state.current.p += (progress-state.current.p)*.045; const p=state.current.p;
      const W=innerWidth,H=innerHeight,t=state.current.t;
      const mobile=W<700;
      ctx.clearRect(0,0,W,H);
      const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#07110e'); sky.addColorStop(.5,'#12211b'); sky.addColorStop(1,'#26342d'); ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
      // atmospheric glow / clearing
      const glow=ctx.createRadialGradient(W*.52,H*.55,0,W*.52,H*.55,Math.max(W,H)*.62); glow.addColorStop(0,`rgba(184,204,191,${.12+.18*p})`);glow.addColorStop(1,'rgba(5,12,10,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
      // distant forest
      const count=mobile?42:72;
      for(let i=0;i<count;i++){ const x=(rand(i*2.1)*1.4-.2)*W; const h=H*(.18+rand(i*4.2)*.28); const y=H*.79; drawTree(x,y,h,W*.035+rand(i)*W*.025,.24,2,Math.sin(t*.12+i)*2+p*W*.015*(rand(i)-.5)); }
      // midground parallax
      for(let i=0;i<(mobile?25:42);i++){ const x=(rand(i*8.4)*1.35-.18)*W; const h=H*(.27+rand(i*1.7)*.28); drawTree(x,H*.9,h,W*.065,.48,1,Math.sin(t*.18+i)*3+p*W*.035*(rand(i)-.5)); }
      // foreground trunks, move with journey
      for(let i=0;i<(mobile?12:22);i++){ let x=(rand(i*12.7)*1.5-.25)*W; const travel=p*W*(.42+rand(i)*.3); x=((x-travel+W*1.5)%(W*1.5))-W*.25; drawTree(x,H*.99,H*(.5+rand(i*3)*.42),W*(.11+rand(i)*.09),.82,0,Math.sin(t*.22+i)*4); }
      // floor
      const floor=ctx.createLinearGradient(0,H*.72,0,H);floor.addColorStop(0,'rgba(18,31,25,0)');floor.addColorStop(1,'rgba(5,10,8,.78)');ctx.fillStyle=floor;ctx.fillRect(0,H*.68,W,H*.32);
      // mist ribbons
      for(let j=0;j<(mobile?5:8);j++){ const y=H*(.38+j*.085)+Math.sin(t*.09+j)*H*.018; const x=(Math.sin(t*(.035+j*.006)+j)*W*.22)-W*.08; const g=ctx.createRadialGradient(W*.52+x,y,0,W*.52+x,y,W*(.35+j*.035));g.addColorStop(0,`rgba(205,219,211,${.055+.025*(1-p)})`);g.addColorStop(1,'rgba(170,190,181,0)');ctx.fillStyle=g;ctx.fillRect(0,y-H*.14,W,H*.28); }
      // particles
      ctx.fillStyle='rgba(220,230,224,.32)'; for(let i=0;i<(mobile?18:42);i++){ const x=(rand(i*4.8)*W+t*(4+rand(i)*7))%W; const y=(rand(i*9.1)*H+t*(1+rand(i)*2))%H*.82; const r=.5+rand(i*3)*1.2;ctx.globalAlpha=.15+rand(i)*.3;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill(); }ctx.globalAlpha=1;
      // vignette
      const vig=ctx.createRadialGradient(W/2,H*.48,Math.min(W,H)*.22,W/2,H*.5,Math.max(W,H)*.72);vig.addColorStop(0,'rgba(0,0,0,0)');vig.addColorStop(1,'rgba(0,0,0,.6)');ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
      raf=requestAnimationFrame(frame);
    }; raf=requestAnimationFrame(frame); return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize)};
  },[progress]);
  return <canvas ref={canvas} className="forest-canvas" aria-hidden="true"/>;
}

function App(){
  const [scroll,setScroll]=useState(0); const forestProgress=Math.min(scroll/Math.max(1,innerHeight*2.5),1);
  useEffect(()=>{let ticking=false; const on=()=>{if(!ticking){requestAnimationFrame(()=>{setScroll(window.scrollY);ticking=false});ticking=true}};addEventListener('scroll',on,{passive:true});on();return()=>removeEventListener('scroll',on)},[]);
  const heroOpacity=Math.max(0,1-forestProgress*1.35); const navDark=forestProgress>.92;
  return <div className="site">
    <section className="forest-section" id="top"><Forest progress={forestProgress}/><div className="forest-fade" style={{opacity:Math.max(0,(forestProgress-.72)*3.5)}}/>
      <header className={`nav ${navDark?'nav-dark':''}`}><a className="brand" href="#top">ERIK <span>/ WEB</span></a><nav><a href="#about">ABOUT</a><a href="#work">WORK</a><a href="#services">SERVICES</a><a href="#contact">CONTACT</a><a href="https://www.fiverr.com/s/432lpeR" target="_blank" rel="noreferrer">FIVERR ↗</a></nav></header>
      <div className="hero" style={{opacity:heroOpacity,transform:`translateY(${-forestProgress*35}px)`}}><p className="eyebrow">WEB DEVELOPER · UNITED STATES</p><h1>Into the quiet.<br/><em>Out with clarity.</em></h1><p className="hero-copy">I design and build clean, responsive websites for small businesses and independent brands — focused on clarity, performance and turning attention into action.</p><div className="hero-actions"><a href="#about">EXPLORE ↓</a><a href="#contact">START A PROJECT ↗</a></div></div>
      <div className="status"><div><small>FOCUS</small><strong>WEB / UI</strong></div><div><small>STATUS</small><strong>AVAILABLE</strong></div><div><small>APPROACH</small><strong>DESIGN · BUILD · POLISH</strong></div></div><div className="scroll-mark">SCROLL TO TRAVEL <span>↓</span></div>
    </section>
    <main>
      <section className="section about" id="about"><div className="section-top"><span>01 / ABOUT</span><a href="https://www.fiverr.com/s/432lpeR" target="_blank" rel="noreferrer">START ON FIVERR ↗</a></div><div className="split"><h2>I make small businesses <em>look like they mean it.</em></h2><div><p className="lead">Hi, I’m Erik. Web developer based in the United States. I focus on clean interfaces, responsive layouts and sites that are easy to understand, fast to use, and ready to help a business grow.</p><div className="meta"><span>FOCUS <b>WEB / UI</b></span><span>STATUS <b>AVAILABLE</b></span><span>APPROACH <b>DESIGN · BUILD · POLISH</b></span></div></div></div></section>
      <section className="section work" id="work"><div className="section-top"><span>02 / SELECTED WORK</span><span>BUILT WITH INTENT</span></div><div className="projects">{projects.map((p,i)=><article className="project" key={p.name}><div className={`project-art ${p.className}`}><div className="art-glow"/><span>{p.n}</span><div className="art-label">{i===0?'ROYAL TOUCH':i===1?'FOG / 03':'B1O / INTERFACE'}</div></div><div className="project-info"><span>{p.n}</span><div><h3>{p.name}</h3><p>{p.type}</p><small>{p.tags}</small></div><b>↗</b></div></article>)}</div></section>
      <section className="section services" id="services"><div className="section-top"><span>03 / SERVICES</span><span>WHAT I BUILD</span></div><div className="service-list">{services.map(([n,t,d])=><div className="service" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>↗</i></div>)}</div></section>
      <section className="section process"><div className="section-top"><span>04 / PROCESS</span><span>FROM IDEA TO LAUNCH</span></div><div className="process-grid">{process.map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
      <section className="section toolkit"><div className="section-top"><span>05 / TOOLKIT</span><span>THE MATERIALS</span></div><div className="tools">{toolkit.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></div>)}</div></section>
      <section className="contact" id="contact"><div className="contact-orb"/><div className="section-top"><span>06 / CONTACT</span><span>LET'S MAKE IT CLEAR</span></div><div className="contact-inner"><p>HAVE SOMETHING WORTH BUILDING?</p><h2>Let's make<br/><em>it clear.</em></h2><div className="contact-links"><a href="mailto:hello@example.com">START A PROJECT ↗</a><a href="https://www.fiverr.com/s/432lpeR" target="_blank" rel="noreferrer">FIVERR ↗</a></div></div></section>
    </main><footer><span>ERIK / WEB</span><span>DESIGN · BUILD · POLISH</span><span>© 2026</span></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
