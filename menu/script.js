var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ 
    if(e.isIntersecting){ 
      e.target.style.opacity='1'; 
      e.target.style.transform='translateY(0)'; 
    } 
  });
}, {threshold:0.1});

// Animate the individual columns of BOTH menus fading in!
document.querySelectorAll('.menu-container .column').forEach(function(el){
  el.style.opacity='0'; 
  el.style.transform='translateY(16px)'; 
  el.style.transition='opacity 0.7s ease, transform 0.7s ease';
  io.observe(el);
});