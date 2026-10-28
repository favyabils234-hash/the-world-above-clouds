(() => {
  const layers = [...document.querySelectorAll('.layer[data-speed]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;

  // A small multiplier keeps the layers in frame throughout the long page.
  function paintParallax() {
    const scroll = window.scrollY;
    for (const layer of layers) {
      const speed = Number(layer.dataset.speed);
      layer.style.transform = 'translate3d(0,' + (-scroll * speed * 0.035) + 'px,0)';
    }
    queued = false;
  }

  function onScroll() {
    if (reduceMotion.matches || queued) return;
    queued = true;
    requestAnimationFrame(paintParallax);
  }

  if (!reduceMotion.matches) addEventListener('scroll', onScroll, { passive: true });
})();
