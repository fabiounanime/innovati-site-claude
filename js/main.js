const navEl = document.getElementById('siteNav');
const onScroll = () => {
  if (window.scrollY > 12) { navEl.classList.add('scrolled'); }
  else { navEl.classList.remove('scrolled'); }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
