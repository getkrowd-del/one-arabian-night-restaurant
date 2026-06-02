function switchTab(tab, btn) {
  ['starters','mains','grills','desserts'].forEach(function(t) {
    var el = document.getElementById('tab-'+t);
    if (el) el.style.display = (t===tab) ? 'grid' : 'none';
  });
  document.querySelectorAll('.tab').forEach(function(b){ b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
}