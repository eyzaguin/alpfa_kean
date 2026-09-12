// This external script is deferred until the page's navigation exists.
const toggle = document.getElementById('navigationToggle');
const overlay = document.getElementById('navigationOverlay');
const desktopLinks = document.getElementById('navigationLinks');

if (toggle && overlay && desktopLinks) {
  // Keep mobile destinations and labels in sync with this page's desktop menu.
  const list = overlay.querySelector('.navigation-mobile-list');
  list.replaceChildren(...Array.from(desktopLinks.querySelectorAll('a'), (link) => {
    const item = document.createElement('li');
    item.className = 'navigation-mobile-item';
    const mobileLink = link.cloneNode(true);
    mobileLink.className = link.querySelector('.navigation-cta')
      ? 'navigation-mobile-cta btn btn-primary'
      : 'navigation-mobile-link';
    mobileLink.textContent = link.textContent.trim();
    item.append(mobileLink);
    return item;
  }));
  list.removeAttribute('role');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('navigation-mobile-active', open);
    overlay.inert = !open;
  }

  setOpen(false);
  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  overlay.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!toggle.contains(event.target) && !overlay.contains(event.target)) setOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) setOpen(false);
  });
}
