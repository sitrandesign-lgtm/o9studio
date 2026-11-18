import { renderPage } from './pages.js';
import { translate, localize } from './translations.js';

const page = renderPage(location.pathname);
const site = document.querySelector('#site');
document.title = page.title;
document.body.classList.add(page.page);
site.innerHTML = page.html;

function preferredLanguage() {
  try { return localStorage.getItem('o9-language') === 'vi' ? 'vi' : 'en'; }
  catch { return 'en'; }
}

function setLanguage(language) {
  document.documentElement.lang = language;
  localize(document.body, language);
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  document.title = page.title.split(' — ').map(part => translate(part, language)).join(' — ');
  document.dispatchEvent(new Event('languagechange'));
  try { localStorage.setItem('o9-language', language); } catch {}
}

const t = text => translate(text, document.documentElement.lang);
document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

const menu = document.querySelector('#site-menu');
const menuOpeners = [...document.querySelectorAll('.menu-toggle')];
const profile = document.querySelector('#profile-dialog');
const lightbox = document.querySelector('#image-dialog');
const lightboxImage = lightbox.querySelector('.lightbox-image');
let activeGallery;
lightbox.querySelectorAll('[data-lightbox-step]').forEach(button => {
  button.addEventListener('click', () => activeGallery?.step(Number(button.dataset.lightboxStep)));
});
lightbox.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  activeGallery?.step(event.key === 'ArrowLeft' ? -1 : 1);
});
lightbox.addEventListener('close', () => { activeGallery = undefined; });

menuOpeners.forEach(button => {
  button.addEventListener('click', () => {
    menu.showModal();
    menuOpeners.forEach(opener => opener.setAttribute('aria-expanded', 'true'));
    document.dispatchEvent(new Event('menuvisibility'));
  });
});
menu.addEventListener('close', () => {
  menuOpeners.forEach(opener => opener.setAttribute('aria-expanded', 'false'));
  document.dispatchEvent(new Event('menuvisibility'));
});
document.querySelectorAll('[data-profile]').forEach(button => {
  button.addEventListener('click', () => profile.showModal());
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
});

const sticky = document.querySelector('.header-sticky');
const hero = document.querySelector('.hero');
let lastScroll = Math.max(0, scrollY);
let direction = 0;
let distance = 0;
let queued = false;
function updateHeader() {
  queued = false;
  const currentY = Math.max(0, scrollY);
  const delta = currentY - lastScroll;
  const nextDirection = Math.sign(delta);
  if (nextDirection && nextDirection !== direction) {
    direction = nextDirection;
    distance = 0;
  }
  distance += Math.abs(delta);
  const beyondHeader = hero ? hero.getBoundingClientRect().bottom <= 0 : currentY > sticky.offsetHeight;
  let visible = sticky.classList.contains('is-visible');
  if (!beyondHeader || (direction === 1 && distance >= 6)) visible = false;
  else if (direction === -1 && distance >= 8) visible = true;
  sticky.classList.toggle('is-visible', visible);
  sticky.inert = !visible;
  sticky.setAttribute('aria-hidden', String(!visible));
  lastScroll = currentY;
}
function scheduleHeader() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(updateHeader);
  }
}
window.addEventListener('scroll', scheduleHeader, { passive: true });
window.addEventListener('resize', scheduleHeader);

function toggleGroup(elements) {
  for (const element of elements) {
    element.addEventListener('toggle', () => {
      if (element.open) elements.forEach(peer => { if (peer !== element) peer.open = false; });
    });
  }
}

document.querySelectorAll('.accordion').forEach(group => toggleGroup(group.querySelectorAll('details')));

const filters = [...document.querySelectorAll('[data-filter]')];
const workGrid = document.querySelector('.work-project-grid');
function applyFilter(category, updateUrl = false) {
  const selected = filters.some(button => button.dataset.filter === category) ? category : 'all';
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
  workGrid.classList.toggle('is-filtered', selected !== 'all');
  workGrid.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
  });
  if (updateUrl) {
    const url = new URL(location.href);
    if (selected === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', selected);
    history.replaceState(null, '', url);
  }
}
if (workGrid) {
  applyFilter(new URL(location.href).searchParams.get('category'));
  filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter, true)));
}

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('dissolve-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.project-tile').forEach(card => reveal.observe(card));
}

for (const carousel of document.querySelectorAll('[data-carousel]')) {
  const photos = [...carousel.querySelectorAll('.carousel-photo')];
  const dots = [...carousel.querySelectorAll('[data-slide]')];
  const pause = carousel.querySelector('[data-pause]');
  const count = carousel.closest('[data-detail]')?.querySelector('[data-photo-count]');
  let current = 0;
  let paused = reducedMotion.matches;
  let inView = true;
  let progress;
  let transition;
  if (photos.length < 2 && !carousel.querySelector('[data-enlarge]')) continue;

  function syncLightbox() {
    lightboxImage.src = photos[current].currentSrc || photos[current].src;
    lightboxImage.alt = photos[current].alt;
  }

  function showPhoto(index) {
    const next = (index + photos.length) % photos.length;
    if (next === current) return;
    clearTimeout(transition);
    const outgoing = photos[current];
    photos.forEach(photo => photo.classList.remove('is-previous'));
    outgoing.classList.add('is-previous');
    outgoing.classList.remove('is-active');
    outgoing.setAttribute('aria-hidden', 'true');
    current = next;
    photos[current].classList.add('is-active');
    photos[current].removeAttribute('aria-hidden');
    if (activeGallery?.carousel === carousel) syncLightbox();
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
    if (count) {
      const format = n => String(n).padStart(2, '0');
      count.textContent = `${format(current + 1)} of ${format(photos.length)}`;
      const detail = count.closest('.detail-count');
      detail?.style.setProperty('--progress', `${photos.length > 1 ? current / (photos.length - 1) * 100 : 0}%`);
    }
    transition = setTimeout(() => outgoing.classList.remove('is-previous'), 950);
  }

  function syncPlayback() {
    if (!pause) return;
    const allowed = inView && !document.hidden && !menu.open && !paused;
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', t(paused ? 'Play slideshow' : 'Pause slideshow'));
    pause.textContent = paused ? '▶' : 'Ⅱ';
    if (allowed && !progress) {
      progress = dots[current].firstElementChild.animate(
        [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
        { duration: 5000, fill: 'forwards' },
      );
      progress.onfinish = () => selectSlide(current + 1);
    }
    if (allowed) progress?.play();
    else progress?.pause();
  }

  function selectSlide(index) {
    progress?.cancel();
    progress = undefined;
    showPhoto(index);
    syncPlayback();
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => selectSlide(i)));
  carousel.querySelectorAll('[data-step]').forEach(button => {
    button.addEventListener('click', () => selectSlide(current + Number(button.dataset.step)));
  });
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    selectSlide(current + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  carousel.querySelector('[data-enlarge]')?.addEventListener('click', () => {
    activeGallery = { carousel, step: delta => selectSlide(current + delta) };
    syncLightbox();
    lightbox.querySelectorAll('[data-lightbox-step]').forEach(button => { button.hidden = photos.length < 2; });
    lightbox.showModal();
  });
  if (pause) {
    pause.addEventListener('click', () => {
      paused = !paused;
      syncPlayback();
    });
    document.addEventListener('visibilitychange', syncPlayback);
    document.addEventListener('menuvisibility', syncPlayback);
    document.addEventListener('languagechange', syncPlayback);
    reducedMotion.addEventListener('change', event => {
      if (event.matches) paused = true;
      syncPlayback();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      }, { threshold: 0.1 }).observe(carousel);
    }
    syncPlayback();
  }
}

const tabs = [...document.querySelectorAll('.contact-tabs [role=tab]')];
function activateTab(index) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = i !== index;
  });
  document.querySelectorAll('[data-enquiry-select][open]').forEach(field => { field.open = false; });
}
if (tabs.length) {
  activateTab(Number(new URL(location.href).searchParams.get('tab') === 'join'));
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
    tab.addEventListener('keydown', event => {
      const destinations = { ArrowLeft: 1 - i, ArrowRight: 1 - i, Home: 0, End: tabs.length - 1 };
      const next = destinations[event.key];
      if (next === undefined) return;
      event.preventDefault();
      activateTab(next);
      tabs[next].focus();
    });
  });
}

function saveSubmission(submission) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open('o9-studio-local', 1);
    open.onupgradeneeded = () => open.result.createObjectStore('submissions', { autoIncrement: true });
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const database = open.result;
      const transaction = database.transaction('submissions', 'readwrite');
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onabort = () => { database.close(); reject(transaction.error); };
      transaction.objectStore('submissions').add(submission);
    };
  });
}

for (const form of document.querySelectorAll('[data-contact-form]')) {
  const selects = [...form.querySelectorAll('[data-enquiry-select]')];
  toggleGroup(selects);
  for (const select of selects) {
    const summary = select.querySelector('summary');
    const output = select.querySelector('.select-value');
    const syncValue = () => { output.textContent = t(select.querySelector('input:checked')?.value || ''); };
    select.addEventListener('change', () => {
      syncValue();
      select.open = false;
      summary.focus({ preventScroll: true });
    });
    select.addEventListener('keydown', event => {
      if (event.key === 'Escape' && select.open) {
        select.open = false;
        summary.focus({ preventScroll: true });
      }
    });
    document.addEventListener('languagechange', syncValue);
  }
  document.addEventListener('click', event => {
    selects.forEach(select => { if (!select.contains(event.target)) select.open = false; });
  });

  const zone = form.querySelector('[data-dropzone]');
  const picker = zone.querySelector('input');
  const fileList = form.querySelector('.file-list');
  const error = form.querySelector('.form-error');
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('[type=submit]');
  let files = [];
  let errorMessage = '';
  let statusMessage = '';

  function renderFiles() {
    fileList.replaceChildren();
    files.forEach((file, index) => {
      const row = document.createElement('li');
      const name = document.createElement('span');
      name.textContent = file.name;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = t('Remove');
      remove.setAttribute('aria-label', `${t('Remove')} ${file.name}`);
      remove.addEventListener('click', () => {
        files = files.filter((_, i) => i !== index);
        errorMessage = '';
        renderFiles();
      });
      row.append(name, remove);
      fileList.append(row);
    });
    error.textContent = t(errorMessage);
    error.hidden = !errorMessage;
    status.textContent = t(statusMessage);
  }

  function addFiles(incoming) {
    const combined = [...files];
    for (const file of incoming) {
      if (!combined.some(item => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified)) {
        combined.push(file);
      }
    }
    if (combined.length > 5 || combined.reduce((size, file) => size + file.size, 0) > 25_000_000) {
      errorMessage = 'Attach up to 5 files, 25 MB in total.';
    } else {
      files = combined;
      errorMessage = '';
    }
    renderFiles();
  }

  picker.addEventListener('change', () => {
    addFiles(picker.files);
    picker.value = '';
  });
  zone.addEventListener('dragover', event => {
    event.preventDefault();
    zone.classList.add('is-dragging');
  });
  zone.addEventListener('dragleave', event => {
    if (!zone.contains(event.relatedTarget)) zone.classList.remove('is-dragging');
  });
  zone.addEventListener('drop', event => {
    event.preventDefault();
    zone.classList.remove('is-dragging');
    addFiles(event.dataTransfer.files);
  });
  document.addEventListener('languagechange', renderFiles);
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled || errorMessage) return;
    submit.disabled = true;
    statusMessage = '';
    renderFiles();
    try {
      const fields = Object.fromEntries(new FormData(form));
      await saveSubmission({ kind: form.dataset.contactForm, fields, files, createdAt: new Date().toISOString() });
      form.reset();
      files = [];
      selects.forEach(select => { select.querySelector('.select-value').textContent = ''; });
      statusMessage = 'Saved on this device. No email was sent.';
    } catch {
      statusMessage = 'Could not save on this device. Please try again.';
    } finally {
      submit.disabled = false;
      renderFiles();
    }
  });
}
setLanguage(preferredLanguage());

if (location.hash) {
  requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }));
}
