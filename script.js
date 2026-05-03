function switchTab(tab, btn) {
  ['starters','mains','grills','desserts'].forEach(function(t) {
    var el = document.getElementById('tab-'+t);
    if (el) el.style.display = (t===tab) ? 'grid' : 'none';
  });
  document.querySelectorAll('.tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
}
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
}, {threshold:0.1});
document.querySelectorAll('.dish').forEach(function(el){
  el.style.opacity='0'; el.style.transform='translateY(16px)'; el.style.transition='opacity 0.5s ease, transform 0.5s ease';
  io.observe(el);
});