(function(){
  "use strict";
  var head=document.querySelector('.site-head');
  function onScroll(){ if(!head) return; if(window.scrollY>20) head.classList.add('scrolled'); else head.classList.remove('scrolled'); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var burger=document.querySelector('.burger'), mnav=document.querySelector('.mobile-nav');
  if(burger&&mnav){
    burger.addEventListener('click',function(){mnav.classList.add('open');document.body.style.overflow='hidden';});
    mnav.querySelectorAll('a,.close').forEach(function(el){el.addEventListener('click',function(){mnav.classList.remove('open');document.body.style.overflow='';});});
  }

  var rev=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14,rootMargin:'0px 0px -40px'});
    rev.forEach(function(el){io.observe(el);});
  } else { rev.forEach(function(el){el.classList.add('in');}); }

  function count(el){
    var t=parseFloat(el.getAttribute('data-count')),s=null,dur=1400;
    function step(ts){if(!s)s=ts;var p=Math.min((ts-s)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e).toLocaleString();if(p<1)requestAnimationFrame(step);else el.textContent=t.toLocaleString();}
    requestAnimationFrame(step);
  }
  var cs=document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window){
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);io2.unobserve(e.target);}});},{threshold:.6});
    cs.forEach(function(el){io2.observe(el);});
  } else { cs.forEach(count); }

  var yr=document.querySelector('[data-year]'); if(yr) yr.textContent=new Date().getFullYear();
})();
