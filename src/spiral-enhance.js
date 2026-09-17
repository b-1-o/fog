(() => {
  const CARDS = [
    { n: '01', label: 'PROJECTS', tag: 'WORK / SELECTED', image: './assets/bonsi.jpeg', position: '72% 42%', title: 'Projects', accent: 'Builds with a point of view.', text: 'Business websites, immersive interfaces and visual experiments built around clarity, rhythm and useful interaction.', items: ['Royal Touch — business website direction', 'FOG — this portfolio / visual experiment', 'Landing pages, responsive interfaces and redesigns'], meta: 'WEB · UI · RESPONSIVE' },
    { n: '02', label: 'TOOLS + CODE', tag: 'STACK / CURRENT', image: './assets/ssakura.jpg', position: '58% 28%', title: 'Tools + Code', accent: 'The machinery behind the image.', text: 'The frontend stack I use to turn a visual direction into a responsive, maintainable interface.', items: ['HTML · CSS · JavaScript', 'TypeScript · React · Next.js', 'Vite · Git · Linux · Framer Motion'], meta: 'FRONTEND · SYSTEMS · MOTION' },
    { n: '03', label: 'LEARNING', tag: 'LAB / NOW', image: './assets/bonsi.jpeg', position: '35% 25%', title: 'Learning', accent: 'Always one layer deeper.', text: 'Current study is focused on stronger architecture, better interactions and making every build lighter and more intentional.', items: ['Advanced React architecture', 'TypeScript depth and data flow', 'Interaction, motion and frontend performance'], meta: 'STUDY · TEST · REFINE' },
    { n: '04', label: 'ABOUT ME', tag: 'PROFILE / APPROACH', image: './assets/ssakura.jpg', position: '32% 58%', title: 'About Me', accent: 'Less noise. More intent.', text: 'I care about hierarchy, atmosphere and the small details that make a digital product feel considered rather than decorated.', items: ['Focus — web / UI', 'Style — minimal / immersive', 'Approach — design · build · refine'], meta: 'CLARITY · DETAIL · RESTRAINT' },
    { n: '05', label: 'SERVICES', tag: 'OFFER / WEB', image: './assets/bonsi.jpeg', position: '86% 67%', title: 'Services', accent: 'From first frame to final pass.', text: 'A practical set of services for small businesses and independent brands that need a polished web presence.', items: ['Custom websites', 'Landing pages and redesigns', 'Responsive UI · visual design · performance'], meta: 'BUILD · REDESIGN · DELIVERY' },
    { n: '06', label: 'EXPERIMENTS', tag: 'LAB / PLAY', image: './assets/ssakura.jpg', position: '78% 78%', title: 'Experiments', accent: 'Make the interface breathe.', text: 'Motion, glass, depth and tiny interactions built because the web becomes more interesting when it can feel cinematic.', items: ['Layered photography and depth', 'Canvas snowfall and atmosphere', 'Glass surfaces and scene transitions'], meta: 'MOTION · DEPTH · ATMOSPHERE' },
    { n: '07', label: 'DIRECTION', tag: 'VISUAL / MOOD', image: './assets/bonsi.jpeg', position: '56% 86%', title: 'Direction', accent: 'A quiet visual language.', text: 'Monochrome photography, restrained pink, glass surfaces and editorial typography form the visual language of this portfolio.', items: ['Monochrome imagery', 'Smoked glass surfaces', 'Editorial typography + restrained motion'], meta: 'IMAGE · TYPE · ATMOSPHERE' },
  ];

  const esc = (value) => String(value).replace(/[&<>\"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#039;' }[char]));

  const style = document.createElement('style');
  style.textContent = `
    .fog-carousel{position:relative;min-height:900px;padding:110px 0 135px;background:linear-gradient(180deg,#07070a 0%,#0a0a0d 52%,#07070a 100%);overflow:hidden;isolation:isolate;border-top:1px solid rgba(255,255,255,.045)}
    .fog-carousel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 56%,rgba(255,255,255,.075),transparent 24%),radial-gradient(circle at 18% 45%,rgba(217,160,179,.055),transparent 27%),radial-gradient(circle at 83% 60%,rgba(255,255,255,.035),transparent 23%);pointer-events:none}
    .fog-carousel:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,7,.6),transparent 18%,transparent 80%,rgba(5,5,7,.72));pointer-events:none;z-index:20}
    .fog-carousel-head{position:relative;z-index:25;display:grid;grid-template-columns:1.05fr .8fr;gap:7vw;padding:0 7vw}
    .fog-carousel-kicker{font:500 9px 'DM Mono';letter-spacing:.13em;color:#676870}
    .fog-carousel-title{margin:28px 0 24px;font-size:clamp(64px,8.5vw,132px);line-height:.84;letter-spacing:-.075em;font-weight:500;max-width:780px}
    .fog-carousel-title i{font-family:'Playfair Display',Georgia,serif;font-weight:400}
    .fog-carousel-intro{align-self:end;max-width:390px;padding-bottom:9px;color:#898a91;font-size:14px;line-height:1.75}
    .fog-carousel-stage{position:relative;z-index:10;height:590px;margin-top:76px;overflow:hidden;touch-action:pan-y;cursor:grab;user-select:none}
    .fog-carousel-stage.is-dragging{cursor:grabbing}
    .fog-carousel-glow{position:absolute;left:50%;top:50%;width:650px;height:400px;transform:translate(-50%,-42%);background:radial-gradient(ellipse,rgba(217,160,179,.09),rgba(255,255,255,.035) 32%,transparent 70%);filter:blur(35px);pointer-events:none}
    .fog-carousel-track{position:absolute;inset:0;transform-style:preserve-3d;perspective:1700px}
    .fog-carousel-card{--x:0px;--y:0px;--s:1;--r:0deg;--ry:0deg;--a:1;--blur:0px;position:absolute;left:50%;top:50%;width:320px;height:445px;margin:-222.5px 0 0 -160px;padding:7px;border:1px solid rgba(255,255,255,.14);border-radius:25px;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.02));box-shadow:0 40px 110px rgba(0,0,0,.55),inset 0 1px rgba(255,255,255,.17);backdrop-filter:blur(18px) saturate(135%);-webkit-backdrop-filter:blur(18px) saturate(135%);transform:translate3d(var(--x),var(--y),0) rotateZ(var(--r)) rotateY(var(--ry)) scale(var(--s));opacity:var(--a);filter:blur(var(--blur));will-change:transform,opacity,filter;transition:border-color .3s,box-shadow .35s;cursor:pointer;outline:none}
    .fog-carousel-card:before{content:"";position:absolute;inset:0;border-radius:25px;background:linear-gradient(140deg,rgba(255,255,255,.12),transparent 24%,transparent 68%,rgba(217,160,179,.06));pointer-events:none;z-index:4}
    .fog-carousel-card:after{content:"";position:absolute;inset:-1px;border-radius:26px;padding:1px;background:linear-gradient(125deg,rgba(255,255,255,.55),transparent 26%,transparent 66%,rgba(217,160,179,.18));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:8}
    .fog-carousel-card.is-center{border-color:rgba(239,196,209,.45);box-shadow:0 50px 130px rgba(0,0,0,.68),0 0 45px rgba(217,160,179,.08),inset 0 1px rgba(255,255,255,.25)}
    .fog-carousel-card-media{position:absolute;inset:7px;overflow:hidden;border-radius:18px;background:#0a0a0d}
    .fog-carousel-card-media img{display:block;width:100%;height:100%;object-fit:cover;opacity:.72;filter:grayscale(.62) contrast(1.12) brightness(.6) saturate(.55);transform:scale(1.04);transition:transform .9s cubic-bezier(.2,.72,.2,1),filter .6s,opacity .5s}
    .fog-carousel-card.is-center .fog-carousel-card-media img{opacity:.96;filter:grayscale(.18) contrast(1.1) brightness(.74) saturate(.68);transform:scale(1.02)}
    .fog-carousel-card:hover .fog-carousel-card-media img{transform:scale(1.075)}
    .fog-carousel-card-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,2,4,.02) 26%,rgba(2,2,4,.18) 48%,rgba(2,2,4,.94) 100%)}
    .fog-carousel-card-number{position:absolute;z-index:9;top:19px;right:19px;padding:6px 8px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(0,0,0,.3);font:500 8px 'DM Mono';color:#fff;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    .fog-carousel-card-copy{position:absolute;z-index:9;left:22px;right:22px;bottom:22px;display:flex;flex-direction:column;gap:7px;text-shadow:0 5px 25px #000}
    .fog-carousel-card-copy small{font:500 8px 'DM Mono';letter-spacing:.13em;color:rgba(255,255,255,.45)}
    .fog-carousel-card-copy strong{font-size:27px;line-height:.92;letter-spacing:-.06em;font-weight:500}
    .fog-carousel-card-copy em{font:500 7px 'DM Mono';letter-spacing:.1em;color:rgba(255,255,255,.4);font-style:normal}
    .fog-carousel-side{position:absolute;z-index:24;left:7vw;bottom:49px;display:flex;align-items:center;gap:10px;font:500 8px 'DM Mono';letter-spacing:.09em;color:#616269}
    .fog-carousel-side i{width:5px;height:5px;border-radius:50%;background:var(--pink,#d9a0b3);box-shadow:0 0 12px rgba(217,160,179,.75)}
    .fog-carousel-hud{position:absolute;z-index:24;right:7vw;bottom:40px;display:flex;align-items:center;gap:11px;padding:11px 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);font:500 8px 'DM Mono';letter-spacing:.08em;color:#66676e}
    .fog-carousel-hud b{color:#ececef;font-weight:500}.fog-carousel-hud em{font-style:normal;color:#44454a}
    .fog-carousel-open{position:absolute;z-index:50;inset:42px 7vw 42px;display:grid;grid-template-columns:minmax(300px,.88fr) minmax(340px,1.12fr);gap:22px;padding:15px;border:1px solid rgba(255,255,255,.16);border-radius:30px;background:linear-gradient(145deg,rgba(19,19,23,.86),rgba(7,7,10,.75));box-shadow:0 55px 170px rgba(0,0,0,.78),inset 0 1px rgba(255,255,255,.1);backdrop-filter:blur(30px) saturate(125%);-webkit-backdrop-filter:blur(30px) saturate(125%);opacity:0;pointer-events:none;transform:translateY(24px) scale(.965);transition:opacity .38s,transform .55s cubic-bezier(.2,.72,.2,1)}
    .fog-carousel-open.is-open{opacity:1;pointer-events:auto;transform:none}
    .fog-carousel-open-media{position:relative;overflow:hidden;border-radius:22px;background:#0a0a0d;min-height:100%}
    .fog-carousel-open-media img{width:100%;height:100%;display:block;object-fit:cover;filter:grayscale(.25) contrast(1.1) brightness(.69)}
    .fog-carousel-open-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(3,3,5,.78) 100%)}
    .fog-carousel-open-body{display:flex;flex-direction:column;justify-content:space-between;min-height:100%;padding:26px 28px 20px 8px}
    .fog-carousel-open-body>span{font:500 8px 'DM Mono';letter-spacing:.13em;color:#696a72}
    .fog-carousel-open-body h3{margin:23px 0 12px;font-size:clamp(48px,6.2vw,90px);line-height:.82;letter-spacing:-.075em;font-weight:500}
    .fog-carousel-open-body h3 i{font-family:'Playfair Display',Georgia,serif;font-weight:400}
    .fog-carousel-open-body .lead{max-width:600px;color:#c5c6cb;font-size:15px;line-height:1.75;margin:0}
    .fog-carousel-open-body .accent{margin-top:12px;color:var(--pink-soft,#efc4d1);font-size:13px}
    .fog-carousel-open-list{display:grid;gap:8px;margin-top:26px}
    .fog-carousel-open-list div{padding:13px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.025);font-size:12px;color:#c8c9cd}
    .fog-carousel-open-list div:before{content:'↗';margin-right:10px;color:var(--pink-soft,#efc4d1)}
    .fog-carousel-open-foot{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:25px;padding-top:15px;border-top:1px solid rgba(255,255,255,.08);font:500 8px 'DM Mono';letter-spacing:.11em;color:#55565d}
    .fog-carousel-close{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.04);border-radius:999px;padding:10px 13px;color:#bbbcc2;font:500 8px 'DM Mono';letter-spacing:.08em;cursor:pointer;transition:.25s}.fog-carousel-close:hover{border-color:rgba(239,196,209,.34);color:#fff;background:rgba(217,160,179,.08)}
    @media(max-width:1000px){.fog-carousel{min-height:840px}.fog-carousel-head{grid-template-columns:1fr;padding:0 6vw}.fog-carousel-intro{max-width:520px}.fog-carousel-stage{height:540px;margin-top:50px}.fog-carousel-card{width:290px;height:405px;margin:-202.5px 0 0 -145px}.fog-carousel-open{inset:35px 5vw 35px;grid-template-columns:1fr}.fog-carousel-open-media{min-height:270px}.fog-carousel-open-body{padding:24px}.fog-carousel-open-body h3{font-size:54px}.fog-carousel-side{left:6vw}.fog-carousel-hud{right:6vw}}
    @media(max-width:650px){.fog-carousel{min-height:760px;padding:78px 0 105px}.fog-carousel-head{padding:0 18px}.fog-carousel-title{font-size:clamp(56px,15vw,86px);margin:23px 0 20px}.fog-carousel-intro{font-size:13px}.fog-carousel-stage{height:500px;margin-top:34px}.fog-carousel-card{width:245px;height:345px;margin:-172.5px 0 0 -122.5px}.fog-carousel-card-copy{left:18px;right:18px;bottom:18px}.fog-carousel-card-copy strong{font-size:23px}.fog-carousel-side{left:18px;bottom:26px}.fog-carousel-hud{right:18px;bottom:24px;padding:10px 11px}.fog-carousel-open{inset:20px 18px 24px;padding:9px;grid-template-rows:40% 60%;grid-template-columns:1fr;border-radius:22px}.fog-carousel-open-media{min-height:0;border-radius:16px}.fog-carousel-open-body{padding:16px 13px 11px}.fog-carousel-open-body h3{font-size:42px;margin:14px 0 9px}.fog-carousel-open-body .lead{font-size:12px;line-height:1.55}.fog-carousel-open-body .accent{font-size:11px;margin-top:7px}.fog-carousel-open-list{display:none}.fog-carousel-open-foot{margin-top:12px;padding-top:10px}.fog-carousel-card-number{top:13px;right:13px}}
    @media(prefers-reduced-motion:reduce){.fog-carousel-card,.fog-carousel-open{transition:none}.fog-carousel-card-media img{transition:none}}
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
      <p class="fog-carousel-intro">Scroll inside the gallery to move through the images. Bring one to the center, then open it. A visual index for the work, tools, learning and ideas behind this site.</p>
    </div>
    <div class="fog-carousel-stage" aria-label="Image carousel">
      <div class="fog-carousel-glow"></div>
      <div class="fog-carousel-track"></div>
      <div class="fog-carousel-side"><i></i><span>DRAG · WHEEL · CLICK</span></div>
      <div class="fog-carousel-hud"><b>01</b><em>/</em><span>07</span></div>
    </div>
    <div class="fog-carousel-open" aria-hidden="true">
      <div class="fog-carousel-open-media"><img alt="" src="" /></div>
      <div class="fog-carousel-open-body">
        <div>
          <span></span>
          <h3></h3>
          <p class="lead"></p>
          <p class="accent"></p>
          <div class="fog-carousel-open-list"></div>
        </div>
        <div class="fog-carousel-open-foot"><span></span><button class="fog-carousel-close" type="button">CLOSE ×</button></div>
      </div>
    </div>
    <div class="fog-carousel-fade top"></div>
    <div class="fog-carousel-fade bottom"></div>
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
    if (!mount()) {
      requestAnimationFrame(boot);
      return;
    }

    const stage = section.querySelector('.fog-carousel-stage');
    const track = section.querySelector('.fog-carousel-track');
    const open = section.querySelector('.fog-carousel-open');
    const openImg = open.querySelector('img');
    const openKicker = open.querySelector('span');
    const openTitle = open.querySelector('h3');
    const openLead = open.querySelector('.lead');
    const openAccent = open.querySelector('.accent');
    const openList = open.querySelector('.fog-carousel-open-list');
    const openMeta = open.querySelector('.fog-carousel-open-foot span');
    const close = open.querySelector('.fog-carousel-close');
    const hud = section.querySelector('.fog-carousel-hud');
    let phase = 0;
    let target = 0;
    let raf = 0;
    let active = 0;
    let pointer = null;

    const wrap = (v, total) => ((v + total / 2) % total + total) % total - total / 2;
    const cards = CARDS.map((item, index) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'fog-carousel-card';
      el.setAttribute('aria-label', `Open ${item.title}`);
      el.innerHTML = `
        <span class="fog-carousel-number">${esc(item.n)}</span>
        <div class="fog-carousel-card-media"><img src="${esc(item.image)}" alt="" style="object-position:${esc(item.position)}" /></div>
        <div class="fog-carousel-card-copy"><small>${esc(item.label)}</small><strong>${esc(item.title)}</strong><em>${esc(item.tag)}</em></div>
      `;
      el.addEventListener('click', () => {
        const slot = wrap(index - phase, CARDS.length);
        if (Math.abs(slot) > 0.45) {
          target += slot;
          schedule();
          return;
        }
        active = index;
        openCard(item);
      });
      track.appendChild(el);
      return el;
    });

    function render() {
      const total = CARDS.length;
      phase += (target - phase) * 0.105;
      if (Math.abs(target - phase) < 0.00025) phase = target;
      let centerIndex = Math.round((((phase % total) + total) % total));
      if (centerIndex < 0) centerIndex += total;
      active = centerIndex;
      cards.forEach((card, index) => {
        const slot = wrap(index - phase, total);
        const abs = Math.abs(slot);
        const x = slot * 292 + (slot * Math.abs(slot) * 27);
        const y = Math.abs(slot) * Math.abs(slot) * 18;
        const scale = abs < 0.5 ? 1.08 : Math.max(.7, 1 - abs * .085);
        const rotate = slot * -3.5;
        const rotateY = slot * -9;
        const opacity = Math.max(0.08, 1 - Math.max(0, abs - 2.2) * .42);
        const blur = Math.max(0, abs - 2.5) * 2.3;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--s', scale);
        card.style.setProperty('--r', `${rotate}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--a', opacity);
        card.style.setProperty('--blur', `${blur}px`);
        card.style.zIndex = String(100 - Math.round(abs * 10));
        card.classList.toggle('is-center', abs < .5);
        card.tabIndex = abs < .5 ? 0 : -1;
      });
      hud.querySelector('b').textContent = String((centerIndex + 1)).padStart(2, '0');
      if (Math.abs(target - phase) > 0.00025) raf = requestAnimationFrame(render); else raf = 0;
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(render);
    }

    function rotate(amount) {
      target += amount;
      schedule();
    }

    function openCard(item) {
      openImg.src = item.image;
      openImg.alt = item.title;
      openKicker.textContent = `${item.n} / ${item.label}`;
      openTitle.textContent = item.title;
      openLead.textContent = item.text;
      openAccent.textContent = item.accent;
      openList.innerHTML = item.items.map((value) => `<div>${esc(value)}</div>`).join('');
      openMeta.textContent = item.meta;
      open.classList.add('is-open');
      open.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeCard() {
      open.classList.remove('is-open');
      open.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    stage.addEventListener('wheel', (event) => {
      if (open.classList.contains('is-open')) return;
      event.preventDefault();
      rotate(event.deltaY > 0 ? 0.45 : -0.45);
    }, { passive: false });

    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY, moved: false };
      stage.classList.add('is-dragging');
      stage.setPointerCapture?.(event.pointerId);
    });

    stage.addEventListener('pointermove', (event) => {
      if (!pointer || pointer.id !== event.pointerId || open.classList.contains('is-open')) return;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) pointer.moved = true;
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
    close.addEventListener('click', closeCard);
    open.addEventListener('click', (event) => { if (event.target === open) closeCard(); });
    window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeCard(); });

    render();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
