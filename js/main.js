(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const dialog = document.querySelector('[data-contact-dialog]');
  const leadForm = document.querySelector('#lead-form');
  const remoteDownloadDialog = document.querySelector('[data-remote-download-dialog]');
  const phoneInput = leadForm?.querySelector('input[name="telefone"]');
  const whatsappNumber = '5521993076319';

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
    nav?.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });

  const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const logoTrack = document.querySelector('[data-logo-track]');
  if (logoTrack && !logoTrack.dataset.cloned) {
    [...logoTrack.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach((image) => image.setAttribute('alt', ''));
      logoTrack.appendChild(clone);
    });
    logoTrack.dataset.cloned = 'true';
  }

  const openDialog = () => {
    closeMenu();
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    window.setTimeout(() => dialog.querySelector('input')?.focus(), 80);
  };

  const closeDialog = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  document.querySelectorAll('[data-open-contact]').forEach((button) => button.addEventListener('click', openDialog));
  document.querySelector('[data-close-contact]')?.addEventListener('click', closeDialog);

  const openRemoteDownloadDialog = () => {
    if (!remoteDownloadDialog) return;
    if (typeof remoteDownloadDialog.showModal === 'function') remoteDownloadDialog.showModal();
    else remoteDownloadDialog.setAttribute('open', '');
  };

  const closeRemoteDownloadDialog = () => {
    if (!remoteDownloadDialog) return;
    if (typeof remoteDownloadDialog.close === 'function') remoteDownloadDialog.close();
    else remoteDownloadDialog.removeAttribute('open');
  };

  document.querySelector('[data-open-remote-download]')?.addEventListener('click', openRemoteDownloadDialog);
  document.querySelector('[data-close-remote-download]')?.addEventListener('click', closeRemoteDownloadDialog);

  remoteDownloadDialog?.addEventListener('click', (event) => {
    if (event.target === remoteDownloadDialog) closeRemoteDownloadDialog();
  });

  dialog?.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (clickedOutside) closeDialog();
  });

  phoneInput?.addEventListener('input', () => {
    const numbers = phoneInput.value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 2) phoneInput.value = numbers ? `(${numbers}` : '';
    else if (numbers.length <= 7) phoneInput.value = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    else if (numbers.length <= 10) phoneInput.value = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    else phoneInput.value = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  });

  leadForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!leadForm.reportValidity()) return;

    const data = new FormData(leadForm);
    const message = [
      'Olá, equipe da *Innovati Automação*!',
      '',
      'Gostaria de falar com um especialista.',
      '',
      '*DADOS PARA CONTATO*',
      `• *Nome:* ${data.get('nome')}`,
      `• *E-mail:* ${data.get('email')}`,
      `• *Telefone:* ${data.get('telefone')}`,
      `• *Setor:* ${data.get('setor')}`,
      '',
      '*MENSAGEM*',
      String(data.get('mensagem')).trim()
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });

  const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach((link) => link.removeAttribute('aria-current'));
        document.querySelector(`.main-nav a[href="#${entry.target.id}"]`)?.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeRemoteDownloadDialog();
    }
  });
})();
