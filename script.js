(() => {
 const layers=[...document.querySelectorAll('.layer[data-speed]')];
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let queued=false;
 // Far layers drift less; nearer silhouettes move more to create depth.
 function paintParallax(){
  const scroll=window.scrollY;
  for(const layer of layers){layer.style.transform='translate3d(0,'+(-scroll*Number(layer.dataset.speed))+'px,0)';}
  queued=false;
 }
 function onScroll(){if(reduceMotion.matches||queued)return;queued=true;requestAnimationFrame(paintParallax);}
 if(!reduceMotion.matches)addEventListener('scroll',onScroll,{passive:true});
})();
