const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const site = $('.site');
new ResizeObserver(() => site.style.setProperty('--design-scale', site.clientWidth / 1440)).observe(site);

const menu = $('#site-menu');
const modal = $('#content-dialog');
const content = $('#dialog-content');
const menuToggle = $('.menu-toggle');
let previousFocus;
let language = 'en';
let toastTimer;

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove('is-visible'), 2800);
}
function syncDialogState() {
  document.body.style.overflow = menu.open || modal.open ? 'hidden' : '';
  $$('.menu-toggle').forEach(button => button.setAttribute('aria-expanded', String(menu.open)));
}
function closeDialog(dialog) { dialog.close(); syncDialogState(); }
function openContent(markup) {
  if (!modal.open) previousFocus = menu.open ? menuToggle : document.activeElement;
  if (menu.open) closeDialog(menu);
  content.innerHTML = markup;
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  syncDialogState();
  decorateUnderlines();
}
$$('.menu-toggle').forEach(button => button.addEventListener('click', () => { menu.showModal(); syncDialogState(); }));
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog).addEventListener('click', () => closeDialog(dialog));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    syncDialogState();
    if (dialog === modal) { previousFocus?.focus({ preventScroll: true }); }
  });
});
$$('a[href^="#"]').forEach(link => link.addEventListener('click', () => { if (menu.open) closeDialog(menu); }));

// The Home preview keeps gallery clicks on the page, without a detail overlay.
$('[data-all-projects]').onclick = () => $('#work').scrollIntoView({ behavior: 'smooth' });

// Information controls remain hover-only in this Home preview.
$$('[data-info]').forEach(button => button.onclick = () => {});
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(language === 'vi' ? 'Đã sao chép: ' + text : 'Copied: ' + text);
  } catch { toast(text); }
}
$$('[data-contact]').forEach(button => button.onclick = () => {});
$$('[data-copy]').forEach(button => button.onclick = () => copy(button.dataset.copy));
$$('[data-social]').forEach(button => button.onclick = () => toast(`${button.dataset.social} — ${language === 'vi' ? 'bản xem trước local không mở liên kết ngoài.' : 'external navigation is disabled in this local preview.'}`));
$$('.service-image').forEach(card => card.addEventListener('pointerup', event => {
  if (event.pointerType !== 'mouse' && !event.target.closest('button')) card.classList.toggle('is-revealed');
}));

// Figma 117:1109: the five supplied photographs in canvas order.
const slides = [
  ['c53ff.jpg', 'Warm walnut kitchen and living space'],
  ['6888c.jpg', 'Circular timber screen at The Nắng Suites'],
  ['d5609.jpg', 'Bare Han studio with teal and yellow joinery'],
  ['4974e.jpg', 'Sunlit living room with timber details'],
  ['93c23.jpg', 'Bright apartment living room with a grey sofa']
];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const slideDuration = 5000;
const hero = $('.hero');
const pagination = $('.hero-pagination');
const firstPhoto = $('.hero-photo');
const photos = [];
const bullets = [];
let currentSlide = 0;
let progress;
let heroVisible = true;
let userPaused = false;
let ready = false;
let switching = false;

const pauseButton = document.createElement('button');
pauseButton.className = 'hero-pause';
pauseButton.setAttribute('aria-label', 'Pause slideshow');
pauseButton.setAttribute('aria-pressed', 'false');
pauseButton.innerHTML = '<span aria-hidden="true">Ⅱ</span>';
pagination.append(pauseButton);
slides.forEach(([source, alt], index) => {
  const frame = document.createElement('div');
  frame.className = 'hero-slide' + (index === 0 ? ' is-active' : '') + (index === 4 ? ' hero-slide-crop' : '');
  frame.setAttribute('aria-hidden', String(index !== 0));
  const photo = index === 0 ? firstPhoto : document.createElement('img');
  photo.className = 'hero-photo';
  photo.src = `assets/${source}`;
  photo.alt = alt;
  frame.append(photo);
  hero.insertBefore(frame, $('.hero-scrim'));
  photos.push(frame);
  const bullet = document.createElement('button');
  bullet.className = 'hero-bullet';
  bullet.setAttribute('aria-label', `Featured image ${index + 1}`);
  bullet.setAttribute('aria-current', String(index === 0));
  const fill = document.createElement('span');
  fill.className = 'bullet-progress';
  bullet.append(fill);
  bullet.onclick = () => selectSlide(index);
  bullets.push(bullet);
  pagination.append(bullet);
});
function playbackAllowed() {
  return ready && heroVisible && !document.hidden && !menu.open && !userPaused && !reducedMotion.matches;
}
function syncPlayback() {
  if (!progress) return;
  if (playbackAllowed()) progress.play(); else progress.pause();
}
function startProgress() {
  progress?.cancel();
  if (reducedMotion.matches || !ready) return;
  progress = $('.bullet-progress', bullets[currentSlide]).animate(
    [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
    { duration: slideDuration, easing: 'linear', fill: 'forwards' }
  );
  progress.onfinish = () => selectSlide((currentSlide + 1) % slides.length);
  syncPlayback();
}
function selectSlide(index) {
  if (switching) return;
  // Every image is decoded before autoplay begins; manual clicks also wait for load.
  const photo = $('img', photos[index]);
  if (!photo.complete || !photo.naturalWidth) {
    switching = true;
    photo.decode().then(() => { switching = false; selectSlide(index); }).catch(() => { switching = false; });
    return;
  }
  currentSlide = index;
  photos.forEach((frame, position) => {
    frame.classList.toggle('is-active', position === index);
    frame.setAttribute('aria-hidden', String(position !== index));
  });
  bullets.forEach((bullet, position) => bullet.setAttribute('aria-current', String(position === index)));
  startProgress();
}
pauseButton.onclick = () => {
  userPaused = !userPaused;
  pauseButton.setAttribute('aria-pressed', String(userPaused));
  pauseButton.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
  pauseButton.firstElementChild.textContent = userPaused ? '▷' : 'Ⅱ';
  syncPlayback();
};
Promise.all(photos.map(frame => $('img', frame).decode().catch(() => {}))).then(() => {
  ready = true;
  startProgress();
});
new IntersectionObserver(entries => {
  heroVisible = entries[0].isIntersecting;
  syncPlayback();
}, { threshold: 0 }).observe(hero);
new MutationObserver(syncPlayback).observe(menu, { attributes: true, attributeFilter: ['open'] });
document.addEventListener('visibilitychange', syncPlayback);
reducedMotion.addEventListener('change', () => { progress?.cancel(); startProgress(); });

// A gentle opacity-only entrance, once per image as it enters the viewport.
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    reveal.unobserve(entry.target);
  }), { threshold: 0.08 });
  $$('.project').forEach((image, index) => {
    image.classList.add('dissolve-in');
    image.style.setProperty('--reveal-delay', `${index % 2 * 100}ms`);
    reveal.observe(image);
  });
}

const english = Object.fromEntries($$('[data-i18n]').map(element => [element.dataset.i18n, element.textContent]));
const vietnamese = {
  getInTouch: 'Kết nối với chúng tôi', heroIntro: 'Lấy cảm hứng từ cuộc sống đương đại, o9 Design Studio tạo nên những thiết kế gắn với bối cảnh và câu chuyện riêng của từng dự án. Chúng tôi kết hợp thẩm mỹ không gian và trải nghiệm sử dụng để mang đến những cảm nhận trọn vẹn.',
  allProjects: 'Xem tất cả dự án', whatWeDo: 'Chúng tôi làm gì', servicesIntro: 'Chúng tôi thiết kế những nơi để lưu trú và những không gian để gọi là nhà. Từ kiến trúc đến nội thất, bố cục, ánh sáng tự nhiên và chi tiết vật liệu được cân nhắc để tạo nên không gian xoay quanh con người. Mỗi dự án gắn với bối cảnh và nhịp sống riêng.',
  aboutUs: 'Về chúng tôi', profile: 'Hồ sơ công ty', stayCaption: 'Khách sạn, khu nghỉ dưỡng và căn hộ dịch vụ với bản sắc riêng, mang đến sự thoải mái và cảm giác thân thuộc.', liveCaption: 'Không gian sống dành cho những thói quen thường ngày, cân bằng sự gắn kết, riêng tư và dấu ấn cá nhân.', readMore: 'Xem thêm', stay: 'Lưu trú', live: 'Không gian sống', awards: 'Giải thưởng', connect: 'Kết nối với chúng tôi', opportunities: 'Dự án, hợp tác & cơ hội', connectCopy: 'Mỗi dự án bắt đầu từ một cuộc trò chuyện. Dù bạn đang muốn làm mới không gian, khám phá một ý tưởng hay gia nhập đội ngũ, chúng tôi luôn sẵn lòng lắng nghe. Hãy chia sẻ điều bạn đang ấp ủ để cùng tạo nên những không gian ý nghĩa.', contactUs: 'Liên hệ', reach: 'Liên hệ với chúng tôi', findUs: 'Theo dõi chúng tôi', studio: 'Studio', work: 'Dự án', services: 'Dịch vụ', contact: 'Liên hệ', backTop: 'Về đầu trang'
};
$$('[data-language]').forEach(button => button.onclick = () => {
  language = button.dataset.language;
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach(element => element.textContent = (language === 'vi' ? vietnamese : english)[element.dataset.i18n] || english[element.dataset.i18n]);
  $$('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.language === language)));
  decorateUnderlines();
});

// Keep the underline attached to the text, including right-aligned Read More labels.
function decorateUnderlines() {
  $$('.text-link, .read-more, .back-top, .menu-links a, .menu-links button').forEach(element => {
    if ($('.underline-label', element)) return;
    const label = document.createElement('span');
    label.className = 'underline-label';
    label.textContent = element.textContent;
    element.replaceChildren(label);
  });
}
decorateUnderlines();

// Menu destinations are hover-only placeholders in this Home preview.
// Capture before existing anchor/contact handlers so clicks do not close or scroll.
menu.addEventListener('click', event => {
  if (!event.target.closest('.menu-links a, .menu-links button, [data-contact]')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

// Show the white navigation only beyond the hero, in response to upward scrolling.
const whiteHeader = $('.white-header');
let lastScrollY = Math.max(0, window.scrollY);
let scrollDirection = 0;
let directionDistance = 0;
let scrollQueued = false;
function setWhiteHeader(visible) {
  whiteHeader.classList.toggle('is-visible', visible);
  whiteHeader.setAttribute('aria-hidden', String(!visible));
  whiteHeader.inert = !visible;
}
function updateWhiteHeader() {
  scrollQueued = false;
  const y = Math.max(0, window.scrollY);
  const delta = y - lastScrollY;
  const direction = Math.sign(delta);
  if (direction && direction !== scrollDirection) directionDistance = 0;
  if (direction) scrollDirection = direction;
  directionDistance += Math.abs(delta);
  if (hero.getBoundingClientRect().bottom > 0) {
    setWhiteHeader(false);
  } else if (!menu.open && directionDistance >= 8) {
    setWhiteHeader(scrollDirection < 0);
  }
  lastScrollY = y;
}
window.addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(updateWhiteHeader);
}, { passive: true });
window.addEventListener('resize', updateWhiteHeader);
whiteHeader.addEventListener('focusin', () => {
  if (hero.getBoundingClientRect().bottom <= 0) setWhiteHeader(true);
});
updateWhiteHeader();

function syncViewportWidth() {
  site.style.setProperty('--viewport-width', `${document.documentElement.clientWidth}px`);
}
window.addEventListener('resize', syncViewportWidth);
syncViewportWidth();

// Footer labels are visual-only, except the Back to top control.
$('.footer').addEventListener('click', event => {
  if (event.target.closest('.back-top')) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    return;
  }
  if (!event.target.closest('button, a')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);
