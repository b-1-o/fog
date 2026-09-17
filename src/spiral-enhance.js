(() => {
  const CARDS = [
    {
      n: '01', label: 'PROJECTS', tag: 'WORK / SELECTED',
      image: 'https://images.unsplash.com/photo-1770944109292-91fa50f68ad7?auto=format&fit=crop&w=1800&q=86',
      position: '58% 42%',
      title: 'Projects', accent: 'What I actually build.',
      text: 'A small archive of the work behind the portfolio — from business websites to immersive interfaces and visual experiments.',
      items: ['Royal Touch — business website direction', 'FOG — this portfolio / visual experiment', 'Landing pages, responsive interfaces and redesigns'],
      meta: 'WEB · UI · RESPONSIVE'
    },
    {
      n: '02', label: 'TOOLS + CODE', tag: 'STACK / CURRENT',
      image: 'https://images.unsplash.com/photo-1775799900931-faa7a553e158?auto=format&fit=crop&w=1800&q=86',
      position: '52% 50%',
      title: 'Tools + Code', accent: 'The machinery behind the image.',
      text: 'The stack used to turn a visual direction into a responsive interface, with motion and structure kept deliberate.',
      items: ['HTML · CSS · JavaScript', 'TypeScript · React · Next.js', 'Vite · Git · Linux · Framer Motion'],
      meta: 'FRONTEND · SYSTEMS · MOTION'
    },
    {
      n: '03', label: 'LEARNING', tag: 'LAB / NOW',
      image: 'https://images.unsplash.com/photo-1768058294485-7547a03068ca?auto=format&fit=crop&w=1800&q=86',
      position: '48% 50%',
      title: 'Learning', accent: 'Always one layer deeper.',
      text: 'Current focus is on stronger architecture, richer interactions and making every build lighter and more intentional.',
      items: ['Advanced React architecture', 'TypeScript depth and data flow', 'Interaction, motion and frontend performance'],
      meta: 'STUDY · TEST · REFINE'
    },
    {
      n: '04', label: 'ABOUT ME', tag: 'PROFILE / APPROACH',
      image: 'https://images.unsplash.com/photo-1774258161371-d5ad244af3d5?auto=format&fit=crop&w=1800&q=86',
      position: '50% 48%',
      title: 'About Me', accent: 'Less noise. More intent.',
      text: 'I care about hierarchy, atmosphere and the small details that make a digital product feel considered instead of decorated.',
      items: ['Focus — web / UI', 'Style — minimal / immersive', 'Approach — design · build · refine'],
      meta: 'CLARITY · DETAIL · RESTRAINT'
    },
    {
      n: '05', label: 'SERVICES', tag: 'OFFER / WEB',
      image: 'https://images.unsplash.com/photo-1744259161147-682a03d3eed0?auto=format&fit=crop&w=1800&q=86',
      position: '52% 52%',
      title: 'Services', accent: 'From first frame to final pass.',
      text: 'A practical set of services for small businesses and independent brands that need a polished web presence.',
      items: ['Custom websites', 'Landing pages and redesigns', 'Responsive UI · visual design · performance'],
      meta: 'BUILD · REDESIGN · DELIVERY'
    },
    {
      n: '06', label: 'EXPERIMENTS', tag: 'LAB / PLAY',
      image: 'https://images.unsplash.com/photo-1777750496287-98501c4deeb4?auto=format&fit=crop&w=1800&q=86',
      position: '54% 46%',
      title: 'Experiments', accent: 'Make the interface breathe.',
      text: 'Motion, glass, depth and atmospheric effects built to explore how a website can feel cinematic without becoming heavy.',
      items: ['Layered photography and depth', 'Canvas snowfall and atmosphere', 'Glass surfaces and scene transitions'],
      meta: 'MOTION · DEPTH · ATMOSPHERE'
    },
    {
      n: '07', label: 'DIRECTION', tag: 'VISUAL / MOOD',
      image: 'https://images.unsplash.com/photo-1742759534698-f64fff0d8c3b?auto=format&fit=crop&w=1800&q=86',
      position: '50% 58%',
      title: 'Direction', accent: 'The visual language of FOG.',
      text: 'Pink sakura against black, editorial type, smoked glass and restrained movement — one visual world across the entire experience.',
      items: ['Pink sakura on black', 'Smoked glass surfaces', 'Editorial typography + restrained motion'],
      meta: 'IMAGE · TYPE · ATMOSPHERE'
    }
  ];

  const esc = (value) => String(value).replace(/[&<>\"']/g, (c) => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#039;'
  }[c]));

  const style = document.createElement('style');
  style.textContent = `
    .fog-carousel{position:relative;min-height:930px;padding:110px 0 125px;background:linear-gradient(180deg,#060608 0%,#0a090c 50%,#050507 100%);overflow:hidden;isolation:isolate;border-top:1px solid rgba(255,255,255,.045)}
    .fog-carousel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 59%,rgba(238,157,184,.10),transparent 24%),radial-gradient(circle at 50% 60%,rgba(255,255,255,.035),transparent 42%);pointer-events:none}
    .fog-carousel:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,3,5,.6),transparent 17%,transparent 82%,rgba(3,3,5,.88));pointer-events:none;z-index:20}
    .fog-carousel-head{position:relative;z-index:25;display:grid;grid-template-columns:1.05fr .8fr;gap:7vw;padding:0 7vw}
    .fog-carousel-kicker{font:500 9px 'DM Mono';letter-spacing:.13em;color:#676870}
    .fog-carousel-title{margin:27px 0 22px;font-size:clamp(64px,8.4vw,132px);line-height:.84;letter-spacing:-.075em;font-weight:500;max-width:780px}
    .fog-carousel-title i{font-family:'Playfair Display',Georgia,serif;font-weight:400}
    .fog-carousel-intro{align-self:end;max-width:390px;padding-bottom:9px;color:#898a91;font-size:14px;line-height:1.75}

    .fog-carousel-stage{position:relative;z-index:10;height:600px;margin-top:66px;overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
    .fog-carousel-stage.is-dragging{cursor:grabbing}
    .fog-carousel-glow{position:absolute;left:50%;top:55%;width:760px;height:420px;transform:translate(-50%,-50%);background:radial-gradient(ellipse,rgba(236,156,185,.13),rgba(255,255,255,.025) 38%,transparent 72%);filter:blur(42px);pointer-events:none}
    .fog-carousel-track{position:absolute;inset:0;transform-style:preserve-3d;perspective:1500px}

    .fog-carousel-card{--x:0px;--s:1;--r:0deg;--ry:0deg;--a:1;--blur:0px;position:absolute;left:50%;top:50%;width:300px;height:420px;margin:-210px 0 0 -150px;padding:7px;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.018));box-shadow:0 38px 105px rgba(0,0,0,.58),inset 0 1px rgba(255,255,255,.17);backdrop-filter:blur(18px) saturate(130%);-webkit-backdrop-filter:blur(18px) saturate(130%);transform:translate3d(var(--x),0,0) rotateZ(var(--r)) rotateY(var(--ry)) scale(var(--s));opacity:var(--a);filter:blur(var(--blur));will-change:transform,opacity,filter,width,height,left,top,margin;transition:width .65s cubic-bezier(.2,.72,.2,1),height .65s cubic-bezier(.2,.72,.2,1),left .65s cubic-bezier(.2,.72,.2,1),top .65s cubic-bezier(.2,.72,.2,1),margin .65s cubic-bezier(.2,.72,.2,1),transform .65s cubic-bezier(.2,.72,.2,1),opacity .45s,filter .45s,border-color .35s,box-shadow .45s;cursor:pointer;outline:none;overflow:hidden}
    .fog-carousel-card:before{content:"";position:absolute;inset:0;border-radius:24px;background:linear-gradient(140deg,rgba(255,255,255,.12),transparent 25%,transparent 67%,rgba(230,139,170,.08));pointer-events:none;z-index:5}
    .fog-carousel-card:after{content:"";position:absolute;inset:-1px;border-radius:25px;padding:1px;background:linear-gradient(125deg,rgba(255,255,255,.55),transparent 26%,transparent 66%,rgba(228,136,168,.25));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:12}
    .fog-carousel-card.is-dimmed{opacity:.14!important;filter:blur(5px)!important;pointer-events:none}
    .fog-carousel-card.is-center{border-color:rgba(239,196,209,.5);box-shadow:0 52px 135px rgba(0,0,0,.7),0 0 45px rgba(217,160,179,.10),inset 0 1px rgba(255,255,255,.26)}

    .fog-carousel-card-media{position:absolute;inset:7px;height:calc(100% - 14px);overflow:hidden;border-radius:17px;background:#050507;transition:height .65s cubic-bezier(.2,.72,.2,1)}
    .fog-carousel-card-media img{display:block;width:100%;height:100%;object-fit:cover;opacity:.84;filter:grayscale(.05) sepia(.16) saturate(1.35) hue-rotate(315deg) contrast(1.12) brightness(.62);transform:scale(1.035);transition:transform 1s cubic-bezier(.2,.72,.2,1),filter .7s,opacity .45s}
    .fog-carousel-card.is-center .fog-carousel-card-media img{opacity:.98;filter:grayscale(0) sepia(.18) saturate(1.5) hue-rotate(315deg) contrast(1.12) brightness(.72);transform:scale(1.01)}
    .fog-carousel-card:hover .fog-carousel-card-media img{transform:scale(1.075)}
    .fog-carousel-card-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,2,4,.05) 20%,rgba(2,2,4,.08) 42%,rgba(2,2,4,.92) 100%);transition:background .5s}

    .fog-carousel-card-number{position:absolute;z-index:14;top:18px;right:18px;padding:6px 8px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(0,0,0,.34);font:500 8px 'DM Mono';color:#fff;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);transition:opacity .3s}
    .fog-carousel-card-copy{position:absolute;z-index:14;left:21px;right:21px;bottom:21px;display:flex;flex-direction:column;gap:6px;text-shadow:0 5px 25px #000;transition:opacity .25s,transform .35s}
    .fog-carousel-card-copy small{font:500 8px 'DM Mono';letter-spacing:.13em;color:rgba(255,255,255,.48)}
    .fog-carousel-card-copy strong{font-size:27px;line-height:.92;letter-spacing:-.06em;font-weight:500}
    .fog-carousel-card-copy em{font:500 7px 'DM Mono';letter-spacing:.1em;color:rgba(255,255,255,.4);font-style:normal}

    .fog-carousel-card-reveal{position:absolute;left:0;right:0;bottom:0;z-index:15;padding:30px 30px 24px;background:linear-gradient(180deg,rgba(7,7,10,.42),rgba(7,7,10,.97) 22%);opacity:0;transform:translateY(22px);pointer-events:none;transition:opacity .42s .12s,transform .5s cubic-bezier(.2,.72,.2,1) .12s}
    .fog-carousel-card.is-expanded{width:min(720px,78vw);height:570px;left:50%;top:50%;margin:-285px 0 0 min(-360px,-39vw);transform:translate3d(0,0,0) scale(1);z-index:200!important;opacity:1!important;filter:none!important;border-color:rgba(239,196,209,.58);box-shadow:0 55px 170px rgba(0,0,0,.78),0 0 70px rgba(217,160,179,.12),inset 0 1px rgba(255,255,255,.3);cursor:default}
    .fog-carousel-card.is-expanded .fog-carousel-card-media{height:54%}
    .fog-carousel-card.is-expanded .fog-carousel-card-media:after{background:linear-gradient(180deg,rgba(2,2,4,.03) 20%,rgba(2,2,4,.16) 48%,rgba(2,2,4,.94) 100%)}
    .fog-carousel-card.is-expanded .fog-carousel-card-copy{bottom:auto;top:calc(54% + 18px);transform:translateY(0);opacity:1}
    .fog-carousel-card.is-expanded .fog-carousel-card-copy small{color:#66676f}
    .fog-carousel-card.is-expanded .fog-carousel-card-copy strong{font-size:34px;color:#f5f4f3}
    .fog-carousel-card.is-expanded .fog-carousel-card-copy em{color:#686970}
    .fog-carousel-card.is-expanded .fog-carousel-card-reveal{opacity:1;transform:none;pointer-events:auto}
    .fog-carousel-card-reveal h4{margin:0 0 9px;font-size:15px;font-weight:500;letter-spacing:-.02em;color:#efc4d1}
    .fog-carousel-card-reveal p{margin:0;color:#b3b4ba;font-size:13px;line-height:1.65;max-width:620px}
    .fog-carousel-card-reveal ul{list-style:none;padding:0;margin:17px 0 0;display:grid;grid-template-columns:repeat(2,1fr);gap:7px}
    .fog-carousel-card-reveal li{padding:10px 11px;border:1px solid rgba(255,255,255,.08);border-radius:11px;background:rgba(255,255,255,.025);font-size:11px;line-height:1.45;color:#d0d0d4}
    .fog-carousel-card-reveal li:before{content:'↗';color:#efc4d1;margin-right:7px}
    .fog-carousel-card-reveal-foot{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:17px;padding-top:13px;border-top:1px solid rgba(255,255,255,.08);font:500 8px 'DM Mono';letter-spacing:.11em;color:#54555c}
    .fog-carousel-card-close{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.035);border-radius:999px;padding:8px 11px;color:#aaaab1;font:500 8px 'DM Mono';letter-spacing:.08em;cursor:pointer}
    .fog-carousel-card-close:hover{color:#fff;border-color:rgba(239,196,209,.38);background:rgba(217,160,179,.08)}

    .fog-carousel-side{position:absolute;z-index:24;left:7vw;bottom:38px;display:flex;align-items:center;gap:10px;font:500 8px 'DM Mono';letter-spacing:.09em;color:#616269}
    .fog-carousel-side i{width:5px;height:5px;border-radius:50%;background:#ef9fbd;box-shadow:0 0 12px rgba(239,159,189,.75)}
    .fog-carousel-hud{position:absolute;z-index:24;right:7vw;bottom:30px;display:flex;align-items:center;gap:11px;padding:11px 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);font:500 8px 'DM Mono';letter-spacing:.08em;color:#66676e}
    .fog-carousel-hud b{color:#f0eef0;font-weight:500}.fog-carousel-hud em{font-style:normal;color:#44454a}

    @media(max-width:1000px){
      .fog-carousel{min-height:850px}.fog-carousel-head{grid-template-columns:1fr;padding:0 6vw}.fog-carousel-intro{max-width:540px}.fog-carousel-stage{height:545px;margin-top:48px}.fog-carousel-card{width:280px;height:390px;margin:-195px 0 0 -140px}.fog-carousel-card.is-expanded{width:min(700px,86vw);height:540px;margin:-270px 0 0 -43vw}.fog-carousel-card-reveal ul{grid-template-columns:1fr}.fog-carousel-side{left:6vw}.fog-carousel-hud{right:6vw}
    }
    @media(max-width:650px){
      .fog-carousel{min-height:790px;padding:80px 0 98px}.fog-carousel-head{padding:0 18px}.fog-carousel-title{font-size:clamp(56px,15vw,86px);margin:22px 0 18px}.fog-carousel-intro{font-size:13px}.fog-carousel-stage{height:510px;margin-top:34px}.fog-carousel-card{width:245px;height:345px;margin:-172.5px 0 0 -122.5px}.fog-carousel-card-copy{left:18px;right:18px;bottom:18px}.fog-carousel-card-copy strong{font-size:23px}.fog-carousel-card.is-expanded{width:calc(100vw - 28px);height:555px;margin:-277.5px 0 0 calc(-50vw + 14px);border-radius:21px}.fog-carousel-card.is-expanded .fog-carousel-card-media{height:48%}.fog-carousel-card.is-expanded .fog-carousel-card-copy{top:calc(48% + 16px);left:18px;right:18px}.fog-carousel-card.is-expanded .fog-carousel-card-copy strong{font-size:28px}.fog-carousel-card-reveal{padding:24px 18px 16px}.fog-carousel-card-reveal p{font-size:12px}.fog-carousel-card-reveal li{font-size:10px}.fog-carousel-side{left:18px;bottom:23px}.fog-carousel-hud{right:18px;bottom:21px;padding:10px 11px}
    }
    @media(prefers-reduced-motion:reduce){.fog-carousel-card,.fog-carousel-card-reveal,.fog-carousel-card-media,.fog-carousel-card-copy{transition:none}.fog-carousel-card-media img{transition:none}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'fog-carousel';
  section.setAttribute('aria-label', 'Interactive portfolio index');
  section.innerHTML = `
    <div class="fog-carousel-head">
      <div>
        <span class="fog-carousel-kicker">01 / VISUAL INDEX</span>
        <h2 class="fog-carousel-title">Choose a <i>direction.</i></h2>
      </div>
      <p class="fog-carousel-intro">Scroll inside the gallery to move through the images. Bring one to the center, then click it to reveal the story, tools or work behind the image.</p>
    </div>
    <div class="fog-carousel-stage" aria-label="Sakura image carousel">
      <div class="fog-carousel-glow"></div>
      <div class="fog-carousel-track"></div>
      <div class="fog-carousel-side"><i></i><span>DRAG · WHEEL · CLICK</span></div>
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
    let expandedIndex = -1;
    let pointer = null;

    const wrap = (v, total) => ((v + total / 2) % total + total) % total - total / 2;

    const cards = CARDS.map((item, index) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'fog-carousel-card';
      el.setAttribute('aria-label', `${item.title}. Click to reveal details.`);
      el.innerHTML = `
        <span class="fog-carousel-card-number">${esc(item.n)}</span>
        <div class="fog-carousel-card-media"><img src="${esc(item.image)}" alt="Pink sakura on a black background" style="object-position:${esc(item.position)}" /></div>
        <div class="fog-carousel-card-copy">
          <small>${esc(item.label)}</small>
          <strong>${esc(item.title)}</strong>
          <em>${esc(item.tag)}</em>
        </div>
        <div class="fog-carousel-card-reveal">
          <h4>${esc(item.accent)}</h4>
          <p>${esc(item.text)}</p>
          <ul>${item.items.map((value) => `<li>${esc(value)}</li>`).join('')}</ul>
          <div class="fog-carousel-card-reveal-foot"><span>${esc(item.meta)}</span><button class="fog-carousel-card-close" type="button">CLOSE ×</button></div>
        </div>
      `;

      const close = el.querySelector('.fog-carousel-card-close');
      close.addEventListener('pointerdown', (event) => event.stopPropagation());
      close.addEventListener('click', (event) => {
        event.stopPropagation();
        expandedIndex = -1;
        render();
      });

      el.addEventListener('click', () => {
        if (expandedIndex === index) return;
        const slot = wrap(index - phase, CARDS.length);
        if (Math.abs(slot) > 0.42) {
          target += slot;
          schedule(() => { expandedIndex = index; });
          return;
        }
        expandedIndex = index;
        render();
      });

      track.appendChild(el);
      return el;
    });

    function schedule(after) {
      if (after) schedule.after = after;
      if (!raf) raf = requestAnimationFrame(render);
    }
    schedule.after = null;

    function render() {
      phase += (target - phase) * 0.105;
      if (Math.abs(target - phase) < 0.00025) {
        phase = target;
        if (schedule.after) {
          const fn = schedule.after;
          schedule.after = null;
          fn();
        }
      }

      let centerIndex = Math.round((((phase % CARDS.length) + CARDS.length) % CARDS.length));
      if (centerIndex < 0) centerIndex += CARDS.length;

      cards.forEach((card, index) => {
        const slot = wrap(index - phase, CARDS.length);
        const abs = Math.abs(slot);
        const isExpanded = expandedIndex === index;

        if (isExpanded) {
          card.classList.add('is-expanded');
          card.classList.remove('is-dimmed');
          card.classList.add('is-center');
          card.style.zIndex = '300';
          card.tabIndex = 0;
          return;
        }

        card.classList.remove('is-expanded');
        if (expandedIndex >= 0) card.classList.add('is-dimmed');
        else card.classList.remove('is-dimmed');

        const x = slot * 290 + (slot * Math.abs(slot) * 28);
        const scale = abs < 0.5 ? 1.08 : Math.max(.69, 1 - abs * .085);
        const rotate = slot * -3.5;
        const rotateY = slot * -9;
        const opacity = Math.max(0.08, 1 - Math.max(0, abs - 2.15) * .44);
        const blur = Math.max(0, abs - 2.55) * 2.5;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--s', scale);
        card.style.setProperty('--r', `${rotate}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--a', opacity);
        card.style.setProperty('--blur', `${blur}px`);
        card.style.zIndex = String(100 - Math.round(abs * 10));
        card.classList.toggle('is-center', abs < 0.5);
        card.tabIndex = abs < 0.5 ? 0 : -1;
      });

      hud.querySelector('b').textContent = String((centerIndex + 1)).padStart(2, '0');

      if (Math.abs(target - phase) > 0.00025) raf = requestAnimationFrame(render);
      else raf = 0;
    }

    function rotate(amount) {
      if (expandedIndex >= 0) return;
      target += amount;
      schedule();
    }

    stage.addEventListener('wheel', (event) => {
      if (expandedIndex >= 0) return;
      event.preventDefault();
      rotate(event.deltaY > 0 ? 0.45 : -0.45);
    }, { passive: false });

    stage.addEventListener('pointerdown', (event) => {
      if (expandedIndex >= 0) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointer = { id: event.pointerId, lastX: event.clientX, lastY: event.clientY };
      stage.classList.add('is-dragging');
      stage.setPointerCapture?.(event.pointerId);
    });

    stage.addEventListener('pointermove', (event) => {
      if (!pointer || pointer.id !== event.pointerId || expandedIndex >= 0) return;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      if (Math.abs(dx) > Math.abs(dy) * .35) rotate(-dx * .0125);
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    });

    const release = (event) => {
      if (!pointer || pointer.id !== event.pointerId) return;
      stage.classList.remove('is-dragging');
      stage.releasePointerCapture?.(event.pointerId);
      pointer = null;
    };

    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && expandedIndex >= 0) {
        expandedIndex = -1;
        render();
      }
    });

    render();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
