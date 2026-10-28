(() => {
  const layers = [...document.querySelectorAll('.layer[data-speed]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;

  function paintParallax() {
    const scroll = window.scrollY;
    for (const layer of layers) {
      const speed = Number(layer.dataset.speed);
      layer.style.transform = 'translate3d(0,' + (-scroll * speed * 0.07) + 'px,0)';
    }
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const dusk = Math.min(1, Math.max(0, scroll / maxScroll));
    document.documentElement.style.setProperty('--dusk-progress', (dusk * 0.84).toFixed(3));
    queued = false;
  }

  function onScroll() {
    if (reduceMotion.matches || queued) return;
    queued = true;
    requestAnimationFrame(paintParallax);
  }

  if (!reduceMotion.matches) {
    addEventListener('scroll', onScroll, { passive: true });
    paintParallax();
  }
})();
