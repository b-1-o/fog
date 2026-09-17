(() => {
  const CARDS = [
    {
      number: '01',
      eyebrow: 'WHAT I BUILD',
      title: 'PROJECTS',
      tag: 'WORK / SELECTED',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/09-tech-startup%20(1).png',
      intro: 'A look at the things I actually build — from business websites to immersive interfaces and visual experiments.',
      details: ['Royal Touch — business website direction', 'FOG — this portfolio / visual experiment', 'Landing pages, responsive interfaces and redesigns'],
      meta: 'WEB · UI · RESPONSIVE',
    },
    {
      number: '02',
      eyebrow: 'THE STACK',
      title: 'TOOLS + CODE',
      tag: 'STACK / CURRENT',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/08-architect%20(1).png',
      intro: 'The languages, frameworks and tools used to turn a visual idea into a real interface.',
      details: ['HTML · CSS · JavaScript', 'TypeScript · React · Next.js', 'Vite · Git · Linux · Framer Motion'],
      meta: 'FRONTEND · SYSTEMS · MOTION',
    },
    {
      number: '03',
      eyebrow: 'CURRENTLY EXPLORING',
      title: 'LEARNING',
      tag: 'LAB / NOW',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/01-graphic-designer%20(1).png',
      intro: 'What is getting deliberate attention right now: cleaner architecture, richer interactions and lighter builds.',
      details: ['Advanced React architecture', 'TypeScript depth and data flow', 'Interaction, motion and frontend performance'],
      meta: 'STUDY · TEST · REFINE',
    },
    {
      number: '04',
      eyebrow: 'THE PERSON BEHIND IT',
      title: 'ABOUT ME',
      tag: 'PROFILE / APPROACH',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/04-photographer%20(1).png',
      intro: 'I care about hierarchy, atmosphere and the small details that make a digital product feel deliberate.',
      details: ['Focus — web / UI', 'Style — minimal / immersive', 'Approach — design · build · refine'],
      meta: 'CLARITY · DETAIL · RESTRAINT',
    },
    {
      number: '05',
      eyebrow: 'FOR CLIENTS',
      title: 'SERVICES',
      tag: 'OFFER / WEB',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/05-law-firm%20(1).png',
      intro: 'From a first layout to a polished responsive delivery, the goal stays simple: make the important thing obvious.',
      details: ['Custom websites', 'Landing pages and redesigns', 'Responsive UI · visual design · performance'],
      meta: 'BUILD · REDESIGN · DELIVERY',
    },
    {
      number: '06',
      eyebrow: 'SIDE LAB',
      title: 'EXPERIMENTS',
      tag: 'LAB / PLAY',
      image: 'https://raw.githubusercontent.com/b-1-o/my/main/assets/10-florist%20(1).png',
      intro: 'Motion, glass, depth and small interactions built because interesting interfaces are worth exploring.',
      details: ['Layered photography and depth', 'Canvas snowfall and atmosphere', 'Glass surfaces and scene transitions'],
      meta: 'MOTION · DEPTH · ATMOSPHERE',
    },
  ];

  const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));

  const css = `
    .fog-spiral-wrap{position:relative;min-height:980px;background:linear-gradient(180deg,#08080b 0%,#050507 52%,#07070a 100%);border-top:1px solid rgba(255,255,255,.06);overflow:hidden;isolation:isolate}
    .fog-spiral-wrap:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 72% 43%,rgba(255,255,255,.085),transparent 17%),radial-gradient(circle at 35% 66%,rgba(217,160,179,.055),transparent 25%);pointer-events:none}
    .fog-spiral-wrap:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,3,5,.95) 0%,rgba(3,3,5,.68) 25%,transparent 55%,rgba(3,3,5,.5) 100%);pointer-events:none;z-index:2}
    .fog-spiral-copy{position:absolute;z-index:8;left:7vw;top:110px;width:min(360px,30vw)}
    .fog-spiral-copy>span,.fog-spiral-detail>span,.fog-spiral-card-copy small{font:500 8px 'DM Mono',monospace;letter-spacing:.13em;color:rgba(255,255,255,.43)}
    .fog-spiral-copy h2{margin:28px 0 24px;font-size:clamp(48px,6vw,92px);line-height:.87;letter-spacing:-.07em;font-weight:500}
    .fog-spiral-copy h2 i{font-family:'Playfair Display',Georgia,serif;font-weight:400}
    .fog-spiral-copy p{margin:0;max-width:335px;color:#85868d;font-size:14px;line-height:1.75}
    .fog-spiral-copy .hint{display:inline-flex;align-items:center;gap:10px;margin-top:34px;padding:10px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.03);font:500 8px 'DM Mono';letter-spacing:.1em;color:#72737a;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
    .fog-spiral-copy .hint i{width:5px;height:5px;border-radius:50%;background:var(--pink,#d9a0b3);box-shadow:0 0 12px rgba(217,160,179,.8)}
    .fog-spiral-stage{position:absolute;z-index:5;left:67%;top:50%;width:910px;height:910px;transform:translate(-50%,-50%) rotateX(-4deg) rotateY(-8deg);transform-style:preserve-3d;perspective:1800px}
    .fog-spiral-scene{position:absolute;inset:0;cursor:ns-resize;touch-action:pan-y;user-select:none;overflow:hidden}
    .fog-spiral-axis{position:absolute;left:50%;top:6%;width:1px;height:88%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.06) 16%,rgba(255,255,255,.17) 50%,rgba(255,255,255,.06) 84%,transparent);box-shadow:0 0 34px rgba(255,255,255,.1);opacity:.7;pointer-events:none}
    .fog-spiral-ring{position:absolute;left:50%;top:50%;width:530px;height:660px;margin:-330px 0 0 -265px;border:1px solid rgba(255,255,255,.045);border-radius:50%;transform:rotateX(76deg) rotateZ(24deg);box-shadow:0 0 90px rgba(255,255,255,.025);pointer-events:none}
    .fog-spiral-card{--angle:0deg;--lift:0px;--radius:310px;--scale:1;--alpha:1;--blur:0px;--tilt:0deg;position:absolute;left:50%;top:50%;width:292px;height:184px;margin:-92px 0 0 -146px;padding:7px;border:1px solid rgba(255,255,255,.22);border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.035));box-shadow:0 34px 100px rgba(0,0,0,.58),inset 0 1px 0 rgba(255,255,255,.22);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);transform-style:preserve-3d;transform:rotateY(var(--angle)) translateZ(var(--radius)) translateY(var(--lift)) rotateY(calc(var(--angle) * -1)) rotateZ(var(--tilt)) scale(var(--scale));opacity:var(--alpha);filter:blur(var(--blur));will-change:transform,opacity,filter;transition:border-color .3s,box-shadow .3s;cursor:pointer;outline:0}
    .fog-spiral-card:before{content:"";position:absolute;inset:0;border-radius:20px;background:linear-gradient(125deg,rgba(255,255,255,.14),transparent 24%,transparent 72%,rgba(217,160,179,.05));pointer-events:none;z-index:3}
    .fog-spiral-card:after{content:"";position:absolute;inset:-1px;border-radius:21px;padding:1px;background:linear-gradient(125deg,rgba(255,255,255,.58),transparent 26%,transparent 70%,rgba(217,160,179,.18));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:6}
    .fog-spiral-card.is-center{border-color:rgba(239,196,209,.52);box-shadow:0 42px 118px rgba(0,0,0,.64),0 0 44px rgba(217,160,179,.08),inset 0 1px 0 rgba(255,255,255,.28)}
    .fog-spiral-image{position:absolute;inset:7px;overflow:hidden;border-radius:13px;background:#0b0b0e}
    .fog-spiral-image img{display:block;width:100%;height:100%;object-fit:cover;opacity:.78;filter:grayscale(.38) contrast(1.08) brightness(.68);transition:transform .8s cubic-bezier(.2,.7,.2,1),filter .5s,opacity .4s}
    .fog-spiral-card.is-center .fog-spiral-image img{opacity:.98;filter:grayscale(.12) contrast(1.08) brightness(.78)}
    .fog-spiral-card:hover .fog-spiral-image img{transform:scale(1.06)}
    .fog-spiral-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(3,3,6,.03) 30%,rgba(3,3,6,.9) 100%)}
    .fog-spiral-number{position:absolute;z-index:7;top:15px;right:15px;padding:5px 7px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(0,0,0,.32);font:500 8px 'DM Mono';color:#fff;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    .fog-spiral-card-copy{position:absolute;z-index:7;left:20px;right:20px;bottom:17px;display:flex;flex-direction:column;gap:4px;text-shadow:0 4px 18px #000}
    .fog-spiral-card-copy strong{font-size:22px;font-weight:500;letter-spacing:-.06em;line-height:.95}
    .fog-spiral-card-copy em{font:500 7px 'DM Mono';letter-spacing:.11em;color:rgba(255,255,255,.43);font-style:normal}
    .fog-spiral-hud{position:absolute;z-index:9;right:4vw;bottom:42px;display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);font:500 8px 'DM Mono';letter-spacing:.08em;color:#6d6e75}
    .fog-spiral-hud b{color:#e7e7ea;font-weight:500}.fog-spiral-hud em{font-style:normal;color:#45464c}.fog-spiral-hud i{width:5px;height:5px;border-radius:50%;background:var(--pink,#d9a0b3);box-shadow:0 0 10px rgba(217,160,179,.8)}
    .fog-spiral-fade{position:absolute;z-index:7;left:0;right:0;height:22%;pointer-events:none}.fog-spiral-fade.top{top:0;background:linear-gradient(to bottom,#07070a 2%,rgba(7,7,10,.74) 35%,transparent 100%)}.fog-spiral-fade.bottom{bottom:0;background:linear-gradient(to top,#07070a 2%,rgba(7,7,10,.74) 35%,transparent 100%)}
    .fog-spiral-detail{position:absolute;z-index:30;inset:54px 7vw 54px 7vw;display:grid;grid-template-columns:minmax(260px,.82fr) minmax(360px,1.18fr);gap:28px;padding:16px;border:1px solid rgba(255,255,255,.16);border-radius:30px;background:linear-gradient(145deg,rgba(20,20,24,.82),rgba(8,8,11,.68));box-shadow:0 45px 150px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.1);backdrop-filter:blur(28px) saturate(125%);-webkit-backdrop-filter:blur(28px) saturate(125%);opacity:0;pointer-events:none;transform:translateY(26px) scale(.97);transition:opacity .4s,transform .55s cubic-bezier(.2,.72,.2,1)}
    .fog-spiral-detail.open{opacity:1;pointer-events:auto;transform:none}
    .fog-spiral-detail-media{position:relative;min-height:100%;overflow:hidden;border-radius:21px;background:#0b0b0e}.fog-spiral-detail-media img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.28) contrast(1.08) brightness(.72)}.fog-spiral-detail-media:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 42%,rgba(3,3,5,.72) 100%)}
    .fog-spiral-detail-body{display:flex;flex-direction:column;justify-content:space-between;padding:22px 24px 20px 8px;min-height:100%}.fog-spiral-detail-body h3{font-size:clamp(44px,6vw,92px);line-height:.82;letter-spacing:-.075em;font-weight:500;margin:24px 0}.fog-spiral-detail-body h3 i{font-family:'Playfair Display',Georgia,serif;font-weight:400}.fog-spiral-detail-body>p{max-width:610px;color:#9a9ba2;font-size:15px;line-height:1.75;margin:0}.fog-spiral-detail-list{display:grid;grid-template-columns:1fr;gap:8px;margin-top:28px}.fog-spiral-detail-list div{padding:13px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.025);font-size:12px;color:#cbccd0}.fog-spiral-detail-list div:before{content:'↗';display:inline-block;margin-right:9px;color:var(--pink-soft,#efc4d1)}.fog-spiral-detail-foot{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:30px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08);font:500 8px 'DM Mono';letter-spacing:.12em;color:#55565d}.fog-spiral-detail-close{appearance:none;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.05);padding:10px 14px;color:#d4d5d9;font:500 8px 'DM Mono';letter-spacing:.1em;cursor:pointer;transition:.25s}.fog-spiral-detail-close:hover{background:rgba(217,160,179,.08);border-color:rgba(217,160,179,.3);color:#efc4d1}
    .fog-spiral-wrap.detail-open .fog-spiral-card{opacity:.08!important;filter:blur(9px)!important;pointer-events:none}.fog-spiral-wrap.detail-open .fog-spiral-fade,.fog-spiral-wrap.detail-open .fog-spiral-hud{opacity:0;pointer-events:none}
    @media(max-width:1100px){.fog-spiral-copy{left:5vw;width:285px}.fog-spiral-stage{left:69%;transform:translate(-50%,-50%) rotateX(-3deg) rotateY(-7deg) scale(.86)}.fog-spiral-detail{inset:48px 4vw}.fog-spiral-detail-body{padding-right:16px}}
    @media(max-width:760px){.fog-spiral-wrap{min-height:1180px}.fog-spiral-copy{position:absolute;left:18px;right:18px;top:55px;width:auto}.fog-spiral-copy h2{font-size:56px;margin:22px 0 16px}.fog-spiral-copy p{max-width:450px;font-size:13px}.fog-spiral-copy .hint{margin-top:22px}.fog-spiral-stage{left:50%;top:62%;width:720px;height:720px;transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-3deg) scale(.62)}.fog-spiral-ring{display:none}.fog-spiral-axis{top:32%;height:57%}.fog-spiral-hud{left:50%;right:auto;bottom:24px;transform:translateX(-50%);white-space:nowrap}.fog-spiral-detail{inset:18px;display:flex;flex-direction:column;gap:12px;padding:10px;border-radius:24px}.fog-spiral-detail-media{min-height:37%;max-height:38%}.fog-spiral-detail-body{padding:10px 12px 12px}.fog-spiral-detail-body h3{font-size:58px;margin:12px 0}.fog-spiral-detail-body>p{font-size:13px;line-height:1.6}.fog-spiral-detail-foot{margin-top:17px}.fog-spiral-detail-list{margin-top:17px}.fog-spiral-detail-list div{padding:10px 11px;font-size:11px}}
    @media(prefers-reduced-motion:reduce){.fog-spiral-detail{transition:none}.fog-spiral-card{transition:none}}
  `;

  const style = document.createElement('style');
  style.dataset.fogSpiral = 'true';
  style.textContent = css;
  document.head.appendChild(style);

  let phaseTarget = 0;
  let phaseCurrent = 0;
  let raf = 0;
  let pointer = { active: false, axis: null, lastX: 0, lastY: 0 };
  let selected = 0;

  const wrap = (value, total) => ((value + total / 2) % total + total) % total - total / 2;

  function build() {
    const bridge = document.querySelector('.home-bridge');
    if (!bridge || document.querySelector('.fog-spiral-wrap')) return;

    const section = document.createElement('section');
    section.className = 'fog-spiral-wrap';
    section.setAttribute('aria-label', 'Selected work and profile index');
    section.innerHTML = `
      <div class="fog-spiral-copy">
        <span>03 / ORBIT INDEX</span>
        <h2>Choose a<br/><i>direction.</i></h2>
        <p>Scroll inside the gallery to move through the cards. Bring one to the center, then open it.</p>
        <div class="hint"><i></i> WHEEL / DRAG TO ROTATE</div>
      </div>
      <div class="fog-spiral-scene">
        <div class="fog-spiral-stage">
          <div class="fog-spiral-axis"></div>
          <div class="fog-spiral-ring"></div>
          <div class="fog-spiral-track"></div>
        </div>
        <div class="fog-spiral-fade top"></div>
        <div class="fog-spiral-fade bottom"></div>
      </div>
      <div class="fog-spiral-hud"><i></i><b class="fog-spiral-current">01 / 06</b><em>SCROLL TO MOVE</em></div>
      <div class="fog-spiral-detail" role="dialog" aria-modal="false" aria-hidden="true"></div>
    `;

    bridge.insertAdjacentElement('afterend', section);
    const track = section.querySelector('.fog-spiral-track');
    const scene = section.querySelector('.fog-spiral-scene');
    const current = section.querySelector('.fog-spiral-current');
    const detail = section.querySelector('.fog-spiral-detail');
    const cards = [];

    CARDS.forEach((card, index) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'fog-spiral-card';
      el.setAttribute('aria-label', `Open ${card.title}`);
      el.innerHTML = `
        <div class="fog-spiral-image"><img src="${card.image}" alt="${esc(card.title)}" draggable="false" /></div>
        <span class="fog-spiral-number">${esc(card.number)}</span>
        <div class="fog-spiral-card-copy"><small>${esc(card.eyebrow)}</small><strong>${esc(card.title)}</strong><em>${esc(card.tag)}</em></div>
      `;
      track.appendChild(el);
      cards.push(el);
      el.addEventListener('click', () => {
        const slot = wrap(index - phaseCurrent, CARDS.length);
        if (Math.abs(slot) > 0.35) {
          phaseTarget += index - Math.round(phaseCurrent);
          schedule();
          return;
        }
        openDetail(index);
      });
    });

    function render() {
      const total = CARDS.length;
      const phase = phaseCurrent;
      let nearest = 0;
      let nearestAbs = Infinity;

      cards.forEach((card, index) => {
        const slot = wrap(index - phase, total);
        const abs = Math.abs(slot);
        if (abs < nearestAbs) { nearestAbs = abs; nearest = index; }

        const angle = -16 + slot * 38;
        const lift = slot * 88;
        const radius = 308 + Math.cos(slot * 0.92) * 26;
        const scale = 1 - Math.min(abs * 0.038, 0.24);
        const opacity = Math.max(0, 1 - Math.max(0, abs - 2.05) * 0.34);
        const blur = Math.max(0, abs - 2.25) * 2.8;
        const tilt = slot * -1.35;

        card.style.setProperty('--angle', `${angle}deg`);
        card.style.setProperty('--lift', `${lift}px`);
        card.style.setProperty('--radius', `${radius}px`);
        card.style.setProperty('--scale', `${scale}`);
        card.style.setProperty('--alpha', `${opacity}`);
        card.style.setProperty('--blur', `${blur}px`);
        card.style.setProperty('--tilt', `${tilt}deg`);
        card.classList.toggle('is-center', abs < 0.42);
      });

      selected = nearest;
      current.textContent = `${String(nearest + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }

    function animate() {
      raf = 0;
      const delta = phaseTarget - phaseCurrent;
      phaseCurrent += delta * 0.115;
      render();
      if (Math.abs(delta) > 0.00035) raf = requestAnimationFrame(animate);
      else phaseCurrent = phaseTarget;
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(animate);
    }

    function addPhase(amount) {
      phaseTarget += amount;
      schedule();
    }

    function openDetail(index) {
      const card = CARDS[index];
      detail.innerHTML = `
        <div class="fog-spiral-detail-media"><img src="${card.image}" alt="${esc(card.title)}" /></div>
        <div class="fog-spiral-detail-body">
          <div>
            <span>${esc(card.number)} / ${esc(card.eyebrow)}</span>
            <h3>${esc(card.title.split(' ')[0])}${card.title.includes(' ') ? `<br/><i>${esc(card.title.split(' ').slice(1).join(' '))}</i>` : ''}</h3>
            <p>${esc(card.intro)}</p>
            <div class="fog-spiral-detail-list">
              ${card.details.map((item) => `<div>${esc(item)}</div>`).join('')}
            </div>
          </div>
          <div class="fog-spiral-detail-foot"><span>${esc(card.meta)}</span><button class="fog-spiral-detail-close" type="button">CLOSE ×</button></div>
        </div>
      `;
      section.classList.add('detail-open');
      detail.classList.add('open');
      detail.setAttribute('aria-hidden', 'false');
      detail.querySelector('.fog-spiral-detail-close')?.addEventListener('click', closeDetail);
    }

    function closeDetail() {
      section.classList.remove('detail-open');
      detail.classList.remove('open');
      detail.setAttribute('aria-hidden', 'true');
    }

    const onWheel = (event) => {
      if (detail.classList.contains('open')) return;
      event.preventDefault();
      addPhase(event.deltaY * 0.012);
    };

    const onPointerDown = (event) => {
      if (detail.classList.contains('open')) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointer.active = true;
      pointer.axis = null;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      if (event.pointerType !== 'touch') {
        event.preventDefault();
        scene.setPointerCapture?.(event.pointerId);
      }
    };

    const onPointerMove = (event) => {
      if (!pointer.active || detail.classList.contains('open')) return;
      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;
      if (!pointer.axis) {
        if (Math.hypot(dx, dy) < 8) return;
        pointer.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        if (event.pointerType === 'touch' && pointer.axis === 'y') {
          pointer.active = false;
          scene.style.touchAction = 'pan-y';
          return;
        }
        if (event.pointerType === 'touch') {
          scene.style.touchAction = 'none';
          scene.setPointerCapture?.(event.pointerId);
        }
      }
      if (event.pointerType === 'touch' && pointer.axis !== 'x') return;
      event.preventDefault();
      addPhase(event.pointerType === 'touch' ? -dx * 0.018 : -dy * 0.018);
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };

    const stopPointer = (event) => {
      pointer.active = false;
      pointer.axis = null;
      scene.style.touchAction = 'pan-y';
      if (scene.hasPointerCapture?.(event.pointerId)) scene.releasePointerCapture(event.pointerId);
    };

    scene.addEventListener('wheel', onWheel, { passive: false });
    scene.addEventListener('pointerdown', onPointerDown);
    scene.addEventListener('pointermove', onPointerMove, { passive: false });
    scene.addEventListener('pointerup', stopPointer);
    scene.addEventListener('pointercancel', stopPointer);
    scene.style.touchAction = 'pan-y';
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDetail(); });
    render();
    schedule();
  }

  const observer = new MutationObserver(() => build());
  observer.observe(document.body, { childList: true, subtree: true });
  const boot = () => { build(); if (!document.querySelector('.fog-spiral-wrap')) window.setTimeout(boot, 150); };
  boot();
})();
