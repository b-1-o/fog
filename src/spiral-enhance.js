(() => {
  const CARDS = [
    { n:'01', label:'PROJECTS', tag:'WORK / SELECTED', image:'./assets/bonsi.jpeg', position:'72% 42%', title:'Projects', accent:'Builds with a point of view.', text:'A look at the work I actually build — business websites, immersive interfaces and visual experiments where structure and atmosphere work together.', items:['Royal Touch — business website direction','FOG — this portfolio / visual experiment','Landing pages, responsive interfaces and redesigns'], meta:'WEB · UI · RESPONSIVE' },
    { n:'02', label:'TOOLS + CODE', tag:'STACK / CURRENT', image:'https://images.unsplash.com/photo-1777750496287-98501c4deeb4?auto=format&fit=crop&w=1400&q=82', position:'50% 45%', title:'Tools + Code', accent:'The machinery behind the image.', text:'The frontend tools behind the visual layer: semantic structure, component systems, motion, version control and a Linux-first workflow.', items:['HTML · CSS · JavaScript','TypeScript · React · Next.js','Vite · Git · Linux · Framer Motion'], meta:'FRONTEND · SYSTEMS · MOTION' },
    { n:'03', label:'LEARNING', tag:'LAB / NOW', image:'https://images.unsplash.com/photo-1767491512042-2161ff1de453?auto=format&fit=crop&w=1400&q=82', position:'50% 50%', title:'Learning', accent:'Always one layer deeper.', text:'Current study is about making interfaces more intentional: stronger architecture, better interactions and less unnecessary code.', items:['Advanced React architecture','TypeScript depth and data flow','Interaction, motion and frontend performance'], meta:'STUDY · TEST · REFINE' },
    { n:'04', label:'ABOUT ME', tag:'PROFILE / APPROACH', image:'https://images.unsplash.com/photo-1688273049303-19189b44efb9?auto=format&fit=crop&w=1400&q=82', position:'55% 55%', title:'About Me', accent:'Less noise. More intent.', text:'I like interfaces that feel calm, cinematic and deliberate. Typography, spacing and motion should support the idea instead of competing with it.', items:['Focus — web / UI','Style — minimal / immersive','Approach — design · build · refine'], meta:'CLARITY · DETAIL · RESTRAINT' },
    { n:'05', label:'SERVICES', tag:'OFFER / WEB', image:'https://images.unsplash.com/photo-1653860727675-aea0e0331792?auto=format&fit=crop&w=1400&q=82', position:'52% 42%', title:'Services', accent:'From first frame to final pass.', text:'A practical set of services for small businesses and independent brands that need a polished, responsive digital presence.', items:['Custom websites','Landing pages and redesigns','Responsive UI · visual design · performance'], meta:'BUILD · REDESIGN · DELIVERY' },
    { n:'06', label:'EXPERIMENTS', tag:'LAB / PLAY', image:'https://images.unsplash.com/photo-1742759534268-c9a17bc158f7?auto=format&fit=crop&w=1400&q=82', position:'52% 45%', title:'Experiments', accent:'Make the interface breathe.', text:'Motion, glass, depth, canvas atmosphere and small interactions are the place where I test ideas before they become part of a real build.', items:['Layered photography and depth','Canvas snowfall and atmosphere','Glass surfaces and scene transitions'], meta:'MOTION · DEPTH · ATMOSPHERE' },
    { n:'07', label:'DIRECTION', tag:'VISUAL / MOOD', image:'https://images.unsplash.com/photo-1760954078900-d3636f7e7ae0?auto=format&fit=crop&w=1400&q=82', position:'50% 42%', title:'Direction', accent:'A quiet visual language.', text:'The visual direction of this portfolio: monochrome photography, soft sakura pink, smoked glass, editorial typography and controlled movement.', items:['Monochrome imagery','Smoked glass surfaces','Editorial typography + restrained motion'], meta:'IMAGE · TYPE · ATMOSPHERE' },
  ];

  const esc = (value) => String(value).replace(/[&<>\"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#039;' }[c]));

  const style = document.createElement('style');
  style.textContent = `
    .fog-carousel{position:relative;min-height:940px;padding:112px 0 132px;background:linear-gradient(180deg,#07070a,#0a0a0d 53%,#07070a);overflow:hidden;isolation:isolate;border-top:1px solid rgba(255,255,255,.045)}
    .fog-carousel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 58%,rgba(255,255,255,.08),transparent 24%),radial-gradient(circle at 18% 46%,rgba(217,160,179,.07),transparent 26%),radial-gradient(circle at 82% 56%,rgba(255,255,255,.04),transparent 22%);pointer-events:none}
    .fog-carousel:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,7,.58),transparent 17%,transparent 83%,rgba(5,5,7,.86));pointer-events:none;z-index:20}
    .fog-carousel-head{position:relative;z-index:25;display:grid;grid-template-columns:1.05fr .78fr;gap:7vw;padding:0 7vw}
    .fog-carousel-kicker{font:500 9px 'DM Mono';letter-spacing:.13em;color:#676870}
    .fog-carousel-title{margin:26px 0 22px;font-size:clamp(64px,8.4vw,132px);line-height:.84;letter-spacing:-.075em;font-weight:500}
    .fog-carousel-title i{font-family:'Playfair Display',Georgia,serif;font-weight:400}
    .fog-carousel-intro{align-self:end;max-width:410px;padding-bottom:8px;color:#898a91;font-size:14px;line-height:1.75}
    .fog-carousel-stage{position:relative;z-index:10;height:600px;margin-top:68px;overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
    .fog-carousel-stage.is-dragging{cursor:grabbing}
    .fog-carousel-stage.is-expanded{cursor:default}
    .fog-carousel-glow{position:absolute;left:50%;top:51%;width:720px;height:420px;transform:translate(-50%,-42%);background:radial-gradient(ellipse,rgba(217,160,179,.11),rgba(255,255,255,.035) 32%,transparent 70%);filter:blur(40px);pointer-events:none}
    .fog-carousel-track{position:absolute;inset:0;transform-style:preserve-3d;perspective:1500px}
    .fog-carousel-card{--x:0px;--s:1;--r:0deg;--ry:0deg;--a:1;--blur:0px;position:absolute;left:50%;top:50%;width:300px;height:420px;margin:-210px 0 0 -150px;padding:7px;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.02));box-shadow:0 38px 105px rgba(0,0,0,.54),inset 0 1px rgba(255,255,255,.17);backdrop-filter:blur(18px) saturate(135%);-webkit-backdrop-filter:blur(18px) saturate(135%);transform:translate3d(var(--x),0,0) rotateZ(var(--r)) rotateY(var(--ry)) scale(var(--s));opacity:var(--a);filter:blur(var(--blur));will-change:transform,opacity,filter;transition:border-color .3s,box-shadow .35s,width .55s,height .55s,opacity .4s;cursor:pointer;outline:none;color:#fff;text-align:left}
    .fog-carousel-card:before{content:"";position:absolute;inset:0;border-radius:24px;background:linear-gradient(140deg,rgba(255,255,255,.12),transparent 25%,transparent 67%,rgba(217,160,179,.07));pointer-events:none;z-index:4}
    .fog-carousel-card:after{content:"";position:absolute;inset:-1px;border-radius:25px;padding:1px;background:linear-gradient(125deg,rgba(255,255,255,.55),transparent 26%,transparent 66%,rgba(217,160,179,.18));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:8}
    .fog-carousel-card.is-center{border-color:rgba(239,196,209,.5);box-shadow:0 52px 135px rgba(0,0,0,.7),0 0 45px rgba(217,160,179,.1),inset 0 1px rgba(255,255,255,.26)}
    .fog-carousel-card.is-dim{opacity:.09!important;filter:blur(6px)!important;pointer-events:none}
    .fog-carousel-card.is-open{left:50%;top:50%;width:min(700px,82vw);height:min(590px,72vh);margin:0;transform:translate(-50%,-50%) scale(1)!important;opacity:1!important;filter:none!important;z-index:200!important;border-color:rgba(239,196,209,.58);box-shadow:0 60px 180px rgba(0,0,0,.82),0 0 70px rgba(217,160,179,.1),inset 0 1px rgba(255,255,255,.28);cursor:default}
    .fog-carousel-card-media{position:absolute;left:7px;right:7px;top:7px;height:53%;overflow:hidden;border-radius:17px;background:#0a0a0d;transition:height .55s cubic-bezier(.2,.72,.2,1)}
    .fog-carousel-card.is-open .fog-carousel-card-media{height:54%}
    .fog-carousel-card-media img{display:block;width:100%;height:100%;object-fit:cover;opacity:.76;filter:grayscale(.58) contrast(1.1) brightness(.58) saturate(.58);transform:scale(1.035);transition:transform .9s cubic-bezier(.2,.72,.2,1),filter .6s,opacity .45s}
    .fog-carousel-card.is-center .fog-carousel-card-media img{opacity:.98;filter:grayscale(.18) contrast(1.08) brightness(.75) saturate(.72);transform:scale(1.01)}
    .fog-carousel-card:hover .fog-carousel-card-media img{transform:scale(1.075)}
    .fog-carousel-card-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,2,4,.02) 22%,rgba(2,2,4,.22) 56%,rgba(2,2,4,.94) 100%)}
    .fog-carousel-card-number{position:absolute;z-index:9;top:18px;right:18px;padding:6px 8px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(0,0,0,.3);font:500 8px 'DM Mono';color:#fff;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    .fog-carousel-card-copy{position:absolute;z-index:9;left:21px;right:21px;bottom:20px;display:flex;flex-direction:column;gap:6px;text-shadow:0 5px 25px #000;transition:all .4s}
    .fog-carousel-card-copy small{font:500 8px 'DM Mono';letter-spacing:.13em;color:rgba(255,255,255,.46)}
    .fog-carousel-card-copy strong{font-size:27px;line-height:.92;letter-spacing:-.06em;font-weight:500}
    .fog-carousel-card-copy em{font:500 7px 'DM Mono';letter-spacing:.1em;color:rgba(255,255,255,.4);font-style:normal}
    .fog-carousel-card.is-open .fog-carousel-card-copy{left:28px;right:64px;bottom:auto;top:calc(54% + 22px);text-shadow:none}
    .fog-carousel-card.is-open .fog-carousel-card-copy strong{font-size:clamp(32px,4.4vw,54px);line-height:.9}
    .fog-carousel-card.is-open .fog-carousel-card-copy small{color:#707178}
    .fog-carousel-card.is-open .fog-carousel-card-copy em{color:#66676e}
    .fog-carousel-content{position:absolute;left:28px;right:28px;top:calc(54% + 92px);bottom:22px;overflow:auto;padding-right:5px;opacity:0;transform:translateY(12px);transition:opacity .45s .12s,transform .45s .12s}
    .fog-carousel-card.is-open .fog-carousel-content{opacity:1;transform:none}
    .fog-carousel-content p{margin:0;color:#a1a2a9;font-size:13px;line-height:1.62;max-width:610px}
    .fog-carousel-content .accent{margin:9px 0 13px;color:#efc4d1;font-size:12px}
    .fog-carousel-list{display:grid;gap:7px}
    .fog-carousel-list div{padding:9px 11px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:rgba(255,255,255,.025);color:#cfd0d4;font-size:11px}
    .fog-carousel-list div:before{content:'↗';margin-right:8px;color:#efc4d1}
    .fog-carousel-meta{margin-top:13px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08);font:500 8px 'DM Mono';letter-spacing:.11em;color:#55565d}
    .fog-carousel-close{position:absolute;z-index:15;right:22px;top:22px;width:34px;height:34px;border:1px solid rgba(255,255,255,.15);border-radius:50%;background:rgba(5,5,8,.35);color:#c5c6cb;font:500 14px 'DM Mono';cursor:pointer;display:grid;place-items:center;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:.25s}
    .fog-carousel-close:hover{border-color:rgba(239,196,209,.4);background:rgba(217,160,179,.1);color:#fff}
    .fog-carousel-side{position:absolute;z-index:24;left:7vw;bottom:43px;display:flex;align-items:center;gap:10px;font:500 8px 'DM Mono';letter-spacing:.09em;color:#616269}
    .fog-carousel-side i{width:5px;height:5px;border-radius:50%;background:var(--pink,#d9a0b3);box-shadow:0 0 12px rgba(217,160,179,.75)}
    .fog-carousel-hud{position:absolute;z-index:24;right:7vw;bottom:34px;display:flex;align-items:center;gap:11px;padding:11px 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);font:500 8px 'DM Mono';letter-spacing:.08em;color:#66676e}
    .fog-carousel-hud b{color:#ececef;font-weight:500}.fog-carousel-hud em{font-style:normal;color:#44454a}
    @media(max-width:900px){.fog-carousel{min-height:860px}.fog-carousel-head{grid-template-columns:1fr;padding:0 6vw}.fog-carousel-intro{max-width:540px}.fog-carousel-stage{height:555px;margin-top:52px}.fog-carousel-card{width:275px;height:390px;margin:-195px 0 0 -137.5px}.fog-carousel-card.is-open{width:82vw;height:650px;max-height:75vh}.fog-carousel-side{left:6vw}.fog-carousel-hud{right:6vw}}
    @media(max-width:650px){.fog-carousel{min-height:790px;padding:78px 0 105px}.fog-carousel-head{padding:0 18px}.fog-carousel-title{font-size:clamp(56px,15vw,88px);margin:22px 0 19px}.fog-carousel-intro{font-size:13px}.fog-carousel-stage{height:500px;margin-top:34px}.fog-carousel-card{width:240px;height:340px;margin:-170px 0 0 -120px}.fog-carousel-card.is-open{width:88vw;height:650px;max-height:78vh}.fog-carousel-card.is-open .fog-carousel-card-copy{left:20px;right:55px;top:calc(54% + 18px)}.fog-carousel-card.is-open .fog-carousel-content{left:20px;right:20px;top:calc(54% + 87px)}.fog-carousel-close{top:15px;right:15px;width:32px;height:32px}.fog-carousel-card.is-open .fog-carousel-card-copy strong{font-size:32px}.fog-carousel-side{left:18px;bottom:26px}.fog-carousel-hud{right:18px;bottom:24px;padding:10px 11px}}
    @media(prefers-reduced-motion:reduce){.fog-carousel-card,.fog-carousel-content,.fog-carousel-card-media{transition:none}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'fog-carousel';
  section.setAttribute('aria-label','Interactive portfolio image carousel');
  section.innerHTML = `
    <div class="fog-carousel-head">
      <div><span class="fog-carousel-kicker">01 / VISUAL INDEX</span><h2 class="fog-carousel-title">Choose a <i>direction.</i></h2></div>
      <p class="fog-carousel-intro">Scroll inside the gallery to move through the images. Bring one to the center, then click it to reveal the story, tools or work behind the image.</p>
    </div>
    <div class="fog-carousel-stage" aria-label="Interactive image carousel">
      <div class="fog-carousel-glow"></div>
      <div class="fog-carousel-track"></div>
      <div class="fog-carousel-side"><i></i><span>DRAG · WHEEL · CLICK TO OPEN</span></div>
      <div class="fog-carousel-hud"><b>01</b><em>/</em><span>07</span></div>
    </div>
  `;

  const mount = () => {
    const home = document.querySelector('.home-page');
    if (!home || document.querySelector('.fog-carousel')) return false;
    const bridge = home.querySelector('.home-bridge');
    if (bridge) home.insertBefore(section, bridge);
    else home.appendChild(section);
    return true;
  };

  const boot = () => {
    if (!mount()) { requestAnimationFrame(boot); return; }

    const stage = section.querySelector('.fog-carousel-stage');
    const track = section.querySelector('.fog-carousel-track');
    const hud = section.querySelector('.fog-carousel-hud');
    let phase = 0;
    let target = 0;
    let raf = 0;
    let pointer = null;
    let openIndex = -1;

    const wrap = (v,total) => ((v + total / 2) % total + total) % total - total / 2;

    const cards = CARDS.map((item,index) => {
      const card = document.createElement('article');
      card.className = 'fog-carousel-card';
      card.tabIndex = 0;
      card.setAttribute('aria-label',`Open ${item.title}`);
      card.innerHTML = `
        <span class="fog-carousel-number">${esc(item.n)}</span>
        <div class="fog-carousel-card-media"><img src="${esc(item.image)}" alt="${esc(item.title)}" style="object-position:${esc(item.position)}"></div>
        <div class="fog-carousel-card-copy"><small>${esc(item.label)}</small><strong>${esc(item.title)}</strong><em>${esc(item.tag)}</em></div>
        <div class="fog-carousel-content"><p>${esc(item.text)}</p><p class="accent">${esc(item.accent)}</p><div class="fog-carousel-list">${item.items.map(x=>`<div>${esc(x)}</div>`).join('')}</div><div class="fog-carousel-meta">${esc(item.meta)}</div></div>
        <button class="fog-carousel-close" type="button" aria-label="Close">×</button>
      `;
      const close = card.querySelector('.fog-carousel-close');
      close.addEventListener('click',(event)=>{ event.stopPropagation(); closeCard(); });
      card.addEventListener('click',()=>{
        if (openIndex !== -1) return;
        const slot = wrap(index-phase,CARDS.length);
        if (Math.abs(slot) > .45) {
          target += slot;
          schedule();
          window.setTimeout(()=>openCard(index),480);
        } else openCard(index);
      });
      card.addEventListener('keydown',(event)=>{ if((event.key==='Enter'||event.key===' ') && openIndex===-1){ event.preventDefault(); card.click(); } });
      track.appendChild(card);
      return card;
    });

    function openCard(index){
      openIndex=index;
      target = Math.round(target + wrap(index-phase,CARDS.length));
      section.classList.add('is-expanded');
      cards.forEach((card,i)=>{
        card.classList.toggle('is-open',i===index);
        card.classList.toggle('is-dim',i!==index);
      });
      schedule();
      cards[index].focus({preventScroll:true});
    }

    function closeCard(){
      if(openIndex===-1) return;
      openIndex=-1;
      section.classList.remove('is-expanded');
      cards.forEach(card=>{card.classList.remove('is-open','is-dim');});
      schedule();
    }

    function render(){
      phase += (target-phase)*.11;
      if(Math.abs(target-phase)<.00025) phase=target;
      const total=CARDS.length;
      let centerIndex=Math.round((((phase%total)+total)%total));
      if(centerIndex<0) centerIndex+=total;
      cards.forEach((card,index)=>{
        const slot=wrap(index-phase,total);
        const abs=Math.abs(slot);
        const x=slot*278 + slot*Math.abs(slot)*20;
        const scale=abs<.5?1.08:Math.max(.72,1-abs*.09);
        const rotate=slot*-3.2;
        const rotateY=slot*-9;
        const opacity=Math.max(.08,1-Math.max(0,abs-2.25)*.45);
        const blur=Math.max(0,abs-2.55)*2.4;
        if(openIndex===-1){
          card.style.setProperty('--x',`${x}px`);
          card.style.setProperty('--s',scale);
          card.style.setProperty('--r',`${rotate}deg`);
          card.style.setProperty('--ry',`${rotateY}deg`);
          card.style.setProperty('--a',opacity);
          card.style.setProperty('--blur',`${blur}px`);
          card.style.zIndex=String(100-Math.round(abs*10));
          card.classList.toggle('is-center',abs<.5);
        } else {
          card.style.setProperty('--a',i===openIndex?1:.08);
          card.style.zIndex=i===openIndex?'200':String(10-Math.round(abs));
        }
      });
      hud.querySelector('b').textContent=String(centerIndex+1).padStart(2,'0');
      if(Math.abs(target-phase)>.00025) raf=requestAnimationFrame(render); else raf=0;
    }

    function schedule(){ if(!raf) raf=requestAnimationFrame(render); }
    function rotate(amount){ if(openIndex!==-1) return; target+=amount; schedule(); }

    stage.addEventListener('wheel',(event)=>{ if(openIndex!==-1) return; event.preventDefault(); rotate(event.deltaY>0?.5:-.5); },{passive:false});
    stage.addEventListener('pointerdown',(event)=>{
      if(openIndex!==-1 || (event.pointerType==='mouse' && event.button!==0)) return;
      pointer={id:event.pointerId,lastX:event.clientX,lastY:event.clientY};
      stage.classList.add('is-dragging');
      stage.setPointerCapture?.(event.pointerId);
    });
    stage.addEventListener('pointermove',(event)=>{
      if(!pointer || pointer.id!==event.pointerId || openIndex!==-1) return;
      const dx=event.clientX-pointer.lastX;
      if(Math.abs(dx)>1) rotate(-dx*.013);
      pointer.lastX=event.clientX;
      pointer.lastY=event.clientY;
    });
    const release=(event)=>{ if(!pointer || pointer.id!==event.pointerId) return; stage.classList.remove('is-dragging'); stage.releasePointerCapture?.(event.pointerId); pointer=null; };
    stage.addEventListener('pointerup',release);
    stage.addEventListener('pointercancel',release);
    window.addEventListener('keydown',(event)=>{ if(event.key==='Escape') closeCard(); });

    render();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
