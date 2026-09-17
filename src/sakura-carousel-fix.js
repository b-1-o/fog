(() => {
  const init = () => {
    const gallery = document.querySelector('.sakura-gallery');
    if (!gallery || gallery.dataset.carouselFix === '1') return;

    gallery.dataset.carouselFix = '1';

    let active = 0;
    let open = null;
    let dragging = false;
    let moved = false;
    let pointerId = null;
    let startX = 0;
    let startScroll = 0;
    let syncQueued = false;
    let internalSync = false;

    const getCards = () => Array.from(gallery.querySelectorAll('.sakura-card'));
    const setAttr = (node, name, value) => {
      if (node.getAttribute(name) !== value) node.setAttribute(name, value);
    };
    const setText = (node, value) => {
      if (node.textContent !== value) node.textContent = value;
    };

    const centerCard = (index, behavior = 'smooth') => {
      const card = getCards()[index];
      if (!card) return;
      const max = Math.max(0, gallery.scrollWidth - gallery.clientWidth);
      const left = Math.min(
        max,
        Math.max(0, card.offsetLeft - (gallery.clientWidth - card.offsetWidth) / 2)
      );
      gallery.scrollTo({ left, behavior });
    };

    const setCoverHint = (card, index) => {
      const hint = card.querySelector('.sakura-card-cover em');
      if (!hint) return;
      setText(hint, open === index ? 'OPEN' : active === index ? 'CLICK TO REVEAL' : 'BRING TO CENTER');
    };

    const sync = () => {
      if (syncQueued) return;
      syncQueued = true;
      requestAnimationFrame(() => {
        syncQueued = false;
        const cards = getCards();
        if (!cards.length) return;
        internalSync = true;
        const hasOpen = open !== null;
        if (gallery.classList.contains('has-open') !== hasOpen) gallery.classList.toggle('has-open', hasOpen);

        cards.forEach((card, index) => {
          const isActive = index === active;
          const isOpen = index === open;
          if (card.classList.contains('is-active') !== isActive) card.classList.toggle('is-active', isActive);
          if (card.classList.contains('is-open') !== isOpen) card.classList.toggle('is-open', isOpen);
          setAttr(card, 'tabindex', isActive ? '0' : '-1');
          setAttr(card, 'aria-expanded', isOpen ? 'true' : 'false');
          setCoverHint(card, index);
        });

        const counter = gallery.parentElement?.querySelector('.sakura-index-footer strong');
        if (counter) {
          const value = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
          if (counter.dataset.carouselValue !== value) {
            counter.dataset.carouselValue = value;
            counter.innerHTML = `${String(active + 1).padStart(2, '0')} <em>/</em> ${String(cards.length).padStart(2, '0')}`;
          }
        }
        internalSync = false;
      });
    };

    const updateActiveFromCenter = () => {
      const cards = getCards();
      if (!cards.length) return;
      const center = gallery.getBoundingClientRect().left + gallery.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const d = Math.abs(box.left + box.width / 2 - center);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      if (best !== active) {
        active = best;
        sync();
      }
    };

    const onWheel = (event) => {
      if (internalSync) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      event.preventDefault();
      event.stopPropagation();
      gallery.scrollLeft += delta * 1.25;
    };

    const onPointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      if (event.target.closest('.sakura-card-close')) return;
      dragging = true;
      moved = false;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScroll = gallery.scrollLeft;
      gallery.setPointerCapture?.(pointerId);
      event.stopPropagation();
    };

    const onPointerMove = (event) => {
      if (!dragging || event.pointerId !== pointerId) return;
      const dx = event.clientX - startX;
      if (Math.abs(dx) > 7) moved = true;
      gallery.scrollLeft = startScroll - dx;
      event.preventDefault();
      event.stopPropagation();
    };

    const endDrag = (event) => {
      if (!dragging || event.pointerId !== pointerId) return;
      dragging = false;
      gallery.releasePointerCapture?.(pointerId);
      if (moved) {
        event.stopPropagation();
        requestAnimationFrame(updateActiveFromCenter);
      }
    };

    const onClick = (event) => {
      event.stopPropagation();
      const close = event.target.closest('.sakura-card-close');
      if (close) {
        event.preventDefault();
        open = null;
        sync();
        return;
      }
      if (moved) {
        moved = false;
        event.preventDefault();
        return;
      }
      const card = event.target.closest('.sakura-card');
      if (!card || !gallery.contains(card)) return;
      const cards = getCards();
      const index = cards.indexOf(card);
      if (index < 0) return;
      event.preventDefault();
      active = index;
      open = open === index ? null : index;
      sync();
      centerCard(index, 'smooth');
    };

    const onKeyDown = (event) => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' ', 'Escape'];
      if (!keys.includes(event.key)) return;
      const cards = getCards();
      if (!cards.length) return;

      if (event.key === 'Escape') {
        if (open !== null) {
          open = null;
          sync();
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        open = open === active ? null : active;
        sync();
        centerCard(active, 'smooth');
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      let next = active;
      if (event.key === 'ArrowLeft') next = Math.max(0, active - 1);
      if (event.key === 'ArrowRight') next = Math.min(cards.length - 1, active + 1);
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = cards.length - 1;
      active = next;
      open = null;
      sync();
      centerCard(next, 'smooth');
      event.preventDefault();
      event.stopPropagation();
    };

    gallery.addEventListener('wheel', onWheel, { passive: false, capture: true });
    gallery.addEventListener('pointerdown', onPointerDown, { capture: true });
    gallery.addEventListener('pointermove', onPointerMove, { passive: false, capture: true });
    gallery.addEventListener('pointerup', endDrag, { capture: true });
    gallery.addEventListener('pointercancel', endDrag, { capture: true });
    gallery.addEventListener('click', onClick, { capture: true });
    gallery.addEventListener('keydown', onKeyDown, { capture: true });
    gallery.addEventListener('scroll', updateActiveFromCenter, { passive: true });

    const observer = new MutationObserver(() => {
      if (!document.body.contains(gallery)) return;
      sync();
    });
    observer.observe(gallery, { attributes: true, childList: true, subtree: true });

    const cards = getCards();
    if (cards.length) {
      const center = gallery.getBoundingClientRect().left + gallery.clientWidth / 2;
      let best = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const box = card.getBoundingClientRect();
        const d = Math.abs(box.left + box.width / 2 - center);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      active = best;
      sync();
      requestAnimationFrame(() => centerCard(active, 'auto'));
    }
  };

  const observer = new MutationObserver(init);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  init();
})();
