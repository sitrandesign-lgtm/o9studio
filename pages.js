import {
  studioIntro, homeIntro, connectCopy, projects, awards, publications,
  approach, processes, services, enquiryChoices, bareHan,
} from './content.js';

export const siteNav = [['Studio', '/studio'], ['Work', '/work'], ['Services', '/services'], ['Contact', '/contact']];
const img = (file, alt = '', attrs = '') => `<img src="/assets/${file}" alt="${alt}" ${attrs}>`;
const icon = (file, width, height) => img(file, '', `width="${width}" height="${height}"`);
const link = (text, href, extra = '') => `<a class="text-link" href="${href}" ${extra}>${text}</a>`;
const paragraphs = list => list.map(p => `<p>${p}</p>`).join('');
const address = '(+84) 90 666 84 09<br>info@o9studio.com<br>19 Hoang Sa, Dakao Ward,<br>District 1, HCMC, Vietnam';
const langs = `<div class="languages" aria-label="Language">
  <button class="text-link" type="button" data-language="vi" aria-pressed="false">VI</button>
  <button class="text-link" type="button" data-language="en" aria-pressed="true">EN</button>
</div>`;

function navigation(current, className) {
  return `<nav class="${className}" aria-label="${className === 'menu-nav' ? 'Main navigation' : 'Footer navigation'}">
    ${siteNav.map(([text, href]) => link(text, href, current === href ? 'aria-current="page"' : '')).join('')}
  </nav>`;
}
function header({ inverse = false, sticky = false } = {}) {
  return `<header class="site-header${inverse ? ' header-inverse' : ''}${sticky ? ' header-sticky' : ''}" ${sticky ? 'inert aria-hidden="true"' : ''}>
    <div class="header-inner">
      <a class="wordmark" href="/" aria-label="oNine home">${inverse ? icon('b45c8.svg', 400.749, 120) : icon('58332.svg', 118, 35.3339)}</a>
      <div class="header-actions">${langs}${link('Get in touch', '/contact')}
        <button class="menu-toggle icon-button" type="button" aria-label="Open menu" aria-controls="site-menu" aria-expanded="false">
          ${inverse ? icon('8a969.svg', 32.4344, 15.51) : icon('bfe3e.svg', 32.4344, 15.51)}
        </button>
      </div>
    </div>
  </header>`;
}
function footer(current) {
  return `<footer class="site-footer container">
    <div class="footer-grid">
      <a class="footer-logo" href="/" aria-label="oNine home">${icon('64036.svg', 132, 39.526)}</a>
      <address>${address}</address>
      <div class="footer-social"><span>Find us on</span><div><span class="text-link">Instagram</span><span class="text-link">Facebook</span><span class="text-link">Youtube</span><span class="text-link">LinkedIn</span></div></div>
      ${navigation(current, 'footer-nav')}
    </div>
    <div class="footer-base"><p>© 2027 o9 Design Studio <span>All rights reserved.</span></p>${link('Back to top', '#top')}</div>
  </footer>`;
}
function drawer(current) {
  return `<dialog class="menu-dialog" id="site-menu" aria-label="Site menu">
    <div class="menu-top">${langs}${link('Get in touch', '/contact')}<button class="icon-button" type="button" data-close aria-label="Close menu">${icon('799d1.svg', 24.3488, 24.3558)}</button></div>
    ${navigation(current, 'menu-nav')}
    <div class="menu-base"><span>© 2027 o9 Design Studio</span><span>All rights reserved.</span></div>
  </dialog>`;
}
function connect() {
  return `<section class="connect container two-columns"><h2 class="display">Connect with us</h2>
    <div class="connect-copy"><p>${connectCopy}</p>${link('Contact Us', '/contact')}</div>
  </section>`;
}
function awardList() {
  return `<ul class="award-list">${awards.map(([year, title, description]) => `<li><span>${year}</span><span>${title}</span><span>${description}</span></li>`).join('')}</ul>`;
}
function accordion(title, intro, rows, id) {
  return `<section class="editorial-section container two-columns" aria-labelledby="${id}">
    <div><h2 id="${id}" class="display">${title}</h2><p class="section-intro">${intro}</p></div>
    <div class="accordion">${rows.map(([label, copy], i) => `<details ${i === 0 ? 'open' : ''}>
      <summary><span>${label}</span><span class="accordion-icon">${icon('f2ddb.svg', 24, 24)}${icon('41d4c.svg', 24, 24)}</span></summary>
      <div class="accordion-body"><p>${copy}</p></div>
    </details>`).join('')}</div>
  </section>`;
}
function carousel(images, label, variant = 'dots') {
  return `<div class="carousel carousel-${variant}" aria-label="${label}" data-carousel ${variant === 'hero' ? 'data-autoplay' : ''}>
    ${images.map((file, i) => img(file, `${label}, image ${i + 1}`, `class="carousel-photo${i === 0 ? ' is-active' : ''}" ${i === 0 ? '' : 'aria-hidden="true"'} ${variant === 'hero' && i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}`)).join('')}
    ${variant === 'detail' ? `${images.length > 1 ? `<button class="carousel-prev icon-button" type="button" aria-label="Previous image" data-step="-1">${icon('78102.svg', 32.6472, 31.1127)}</button>
      <button class="carousel-next icon-button" type="button" aria-label="Next image" data-step="1">${icon('4bc3a.svg', 32.6472, 31.1127)}</button>` : ''}
      <button class="carousel-enlarge icon-button" type="button" aria-label="Enlarge image" data-enlarge>${icon('dcad5.svg', 30.9902, 30.9902)}</button>` : ''}
    ${variant !== 'detail' && images.length > 1 ? `<div class="carousel-pagination" aria-label="Choose image">
      ${variant === 'hero' ? '<button type="button" class="carousel-pause" aria-label="Pause slideshow" aria-pressed="false" data-pause>Ⅱ</button>' : ''}
      ${images.map((_, i) => `<button type="button" class="carousel-dot" aria-label="Show image ${i + 1}" aria-current="${i === 0}" data-slide="${i}"><span></span></button>`).join('')}
    </div>` : ''}
  </div>`;
}
function projectCard(project, { tile = '', gallery = false } = {}) {
  const { id, name, type, image, location } = project;
  const href = `/work/${id}`;
  const photo = gallery ? carousel(bareHan.photos, name) : img(image, name, 'loading="lazy"');
  return `<article class="project-card${tile ? ` project-tile ${tile}` : ''}" data-category="${type.toLowerCase()}">
    <div class="project-photo">
      ${photo}
      <a class="tile-target" href="${href}" aria-label="View ${name}">${icon('dcad5.svg', 30.9902, 30.9902)}</a>
    </div>
    <div class="project-caption">
      ${link(name, href)}
      ${location ? `<small>Location</small><span>${location}</span>` : ''}
    </div>
  </article>`;
}
function projectCards(context) {
  return projects.map((project, index) => projectCard(project, {
    tile: `tile-${index + 1}`,
    gallery: context === 'work' && project.id === 'bare-han',
  })).join('');
}

function home() {
  return `<section class="hero home-hero">
    ${carousel(['c53ff.jpg', '6888c.jpg', 'd5609.jpg', '4974e.jpg', '93c23.jpg'], 'o9 Studio interiors', 'hero')}
    <div class="hero-scrim"></div><div class="hero-caption container"><h1>Interior Architecture Studio</h1></div>
  </section>
  <div class="home-intro container"><p>${homeIntro}</p>${link('Read more about us', '/studio')}</div>
  <section class="selected-work container">
    <h2 class="display">Selected Works</h2><div class="project-grid home-project-grid">${projectCards('home')}</div>
    <div class="see-projects">${link('See All Projects', '/work')}</div>
  </section>
  <section class="recognition container">
    <div><h2 class="display">Featured</h2><div class="publications">
      ${publications.map(group => `<ul>${group.map(name => `<li>${name}</li>`).join('')}</ul>`).join('')}
    </div></div>
    <div><h2 class="display">Awards</h2>${awardList()}</div>
  </section>
  <section class="home-services container">
    <h2 class="display">What we do</h2>
    <div class="home-services-intro"><p>We design places to stay and spaces to call home. Working across architecture and interiors, we bring together thoughtful layouts, natural light and material detail to shape spaces around people.</p>
      ${link('Our Services', '/services')}<button type="button" class="text-link" data-profile>Our Company Profile</button>
    </div>
    <div class="two-columns">
      ${services.map(s => `<article class="service-preview">
        <div class="service-preview-photo">${img(s.image, s.title, 'loading="lazy"')}
          <div class="service-overlay"><p>${s.caption}</p>${link('Read More', `/services#${s.title.toLowerCase()}`)}</div>
        </div><h3>${s.title}</h3>
      </article>`).join('')}
    </div>
  </section>
  ${connect()}`;
}
function studio() {
  return `<section class="hero studio-hero" aria-label="Studio at work">${img('1fa56.jpg', 'Drawing an interior plan by hand', 'fetchpriority="high"')}<div class="hero-scrim"></div></section>
    <section class="studio-about container"><h1 class="display">About us</h1><div>${paragraphs(studioIntro)}</div></section>
    ${accordion('Our Approach', 'Taking inspiration from contemporary life, o9 Design studio creates designs that respond to the context and narrative of each project.', approach, 'studio-approach')}
    <section class="founder container two-columns">
      ${img('e6067.jpg', 'Long Tran, founder of o9 Studio', 'loading="lazy"')}
      <figure><blockquote>“${homeIntro}”</blockquote><figcaption>Long Tran &nbsp;|&nbsp; Founder o9studio</figcaption></figure>
    </section>
    <section class="studio-awards container"><h2 class="display">Awards</h2>${awardList()}</section>`;
}
function work() {
  return `<section class="work-page">
    <h1 class="sr-only">Work</h1>
    <div class="container"><p class="work-intro">Our work spans hospitality and residential interiors.<br>Stay brings together hotels, resorts and serviced apartments, while Live focuses on private homes.</p></div>
    <div class="work-filter-bar">
      <div class="container">
        <div class="work-filters" role="group" aria-label="Filter projects">
          ${[['All', 'All projects'], ['Stay', 'Hospitality projects'], ['Live', 'Residential projects']].map(([title, label]) => `<button type="button" data-filter="${title.toLowerCase()}" aria-label="${label}" aria-pressed="${title === 'All'}">${title}</button>`).join('')}
        </div>
      </div>
    </div>
    <div class="container"><div class="project-grid work-project-grid">${projectCards('work')}</div></div>
  </section>`;
}
function servicePage() {
  const servicePhotos = [
    ['d5609.jpg', 'b5cf1.jpg', '6888c.jpg', '451c0.jpg', 'e3dae.jpg'],
    ['9df62.jpg', 'bed8c.jpg', '6e9c4.jpg'],
  ];
  return `<div class="services-page">
    <h1 class="sr-only">Services</h1>
    <div class="service-rows container">
      ${services.map((s, i) => `<section class="service-row" id="${s.title.toLowerCase()}"><h2 class="display">${s.title}</h2>
        <div class="service-copy"><div>${paragraphs(s.paragraphs)}</div>${link(`View ${s.type} projects`, `/work?category=${s.title.toLowerCase()}`)}</div>
        ${carousel(servicePhotos[i], `${s.title} interiors`)}
      </section>`).join('')}
    </div>
    ${processes.map((p, i) => accordion(p.title, p.copy, p.steps, `process-${i}`)).join('')}
    ${connect()}
  </div>`;
}
function field(label, name, type, required = false) {
  return `<label class="form-field"><span class="sr-only">${label}</span><input type="${type}" name="${name}" placeholder="${label}" ${required ? 'required' : ''} ${name === 'name' || name === 'email' || name === 'phone' ? `autocomplete="${name === 'phone' ? 'tel' : name}"` : ''}></label>`;
}
function selectField(name, label, options) {
  return `<details class="form-select" data-enquiry-select>
    <summary><span class="select-label">${label}</span><span class="select-value"></span>${icon('15e73.svg', 16, 16)}</summary>
    <fieldset class="select-options"><legend class="sr-only">${label}</legend>
      ${options.map(option => `<label><input type="radio" name="${name}" value="${option}"><span>${option}</span></label>`).join('')}
    </fieldset>
  </details>`;
}
function enquiryForm(join = false) {
  const id = join ? 'join' : 'enquiry';
  return `<form class="enquiry-form" data-contact-form="${id}">
    <div class="form-intro">
      <h2>${join ? 'We look forward to your talent and passion' : 'New project enquiries'}</h2>
      <p>${join ? 'Share your interests, experience and portfolio with our studio.' : 'We’d love to hear what you’re planning. Use the form below to tell us about your project, where it’s based, and what you’d like to achieve.'}</p>
    </div>
    <div class="form-grid">
      ${field('Full Name', 'name', 'text', true)}${field('Email Address', 'email', 'email', true)}
      ${field('Phone Number', 'phone', 'tel')}${field(join ? 'Position of interest' : 'Project Location', join ? 'position' : 'location', 'text')}
    </div>
    ${join ? '' : `<div class="form-grid enquiry-selects">${enquiryChoices.map(([name, label, options]) => selectField(name, label, options)).join('')}</div>`}
    <label class="form-field"><span class="sr-only">Message</span><textarea name="message" rows="4" placeholder="${join ? 'Tell us about yourself' : 'Tell us a little more about your project'}"></textarea></label>
    <div class="attachments">
      <p>${join ? 'Attachments - CV and portfolio' : 'Attachments - Please upload the design information'}</p>
      <div class="dropzone" data-dropzone><span>Drop files here or browse</span><label class="text-link" for="${id}-files">Browse</label><input id="${id}-files" class="sr-only" type="file" multiple aria-describedby="${id}-limits"></div>
      <p id="${id}-limits">Up to 5 files, 25 MB in total.</p><ul class="file-list" aria-label="Attached files"></ul><p class="form-error" role="alert" hidden></p>
    </div>
    <div class="form-submit"><button class="solid-button" type="submit">${join ? 'Send application' : 'Send enquiry'}</button><p class="form-status" role="status"></p></div>
  </form>`;
}
function contact() {
  return `<div class="contact-page container">
    <div class="contact-address"><h1 class="display">Contact</h1><address>${address}</address></div>
    <div class="contact-form">
      <div class="contact-tabs" role="tablist" aria-label="Contact options">
        <button type="button" role="tab" id="tab-enquiry" aria-selected="true" aria-controls="contact-enquiry">Work with us</button>
        <button type="button" role="tab" id="tab-join" aria-selected="false" aria-controls="contact-join" tabindex="-1">Join us</button>
      </div>
      <section id="contact-enquiry" role="tabpanel" aria-labelledby="tab-enquiry">${enquiryForm()}</section>
      <section id="contact-join" role="tabpanel" aria-labelledby="tab-join" hidden>${enquiryForm(true)}</section>
    </div>
  </div>`;
}
function workDetail(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return missing();
  const featured = id === 'bare-han';
  const photos = featured ? bareHan.photos : projects.filter(p => p.id === id).map(p => p.image);
  const related = [projects[3], projects[5], projects[4]].filter(p => p.id !== id);
  return `<article class="project-detail container" data-detail>
    <div class="detail-overview">
      <div class="detail-information">
        <div><span>Project</span><h1>${project.name}</h1></div>
        <dl class="detail-facts">
          ${featured ? '<div><dt>Year</dt><dd>2021</dd></div>' : ''}<div><dt>Category</dt><dd>${project.type}</dd></div>
          ${featured ? '<div><dt>Size</dt><dd>270 m²</dd></div><div><dt>Scope</dt><dd>Architecture &amp; interior design</dd></div>' : ''}
        </dl>
        <div class="detail-count"><span data-photo-count>${String(1).padStart(2, '0')} of ${String(photos.length).padStart(2, '0')}</span>
          <div class="detail-track">${icon('19d4e.svg', 453, 1)}${icon('a70cc.svg', 13, 1)}</div>
        </div>
      </div>
      ${carousel(photos, project.name, 'detail')}
    </div>
    ${featured ? `<section class="detail-story"><h2>${bareHan.tagline}</h2><div>${paragraphs(bareHan.description)}
      <dl class="detail-credits">${bareHan.credits.map(([name, value]) => `<div><dt>${name}</dt><dd>${value}</dd></div>`).join('')}</dl></div>
    </section>` : ''}
    <section class="more-projects"><div class="more-heading"><h2 class="display">More projects</h2>${link('View all projects', '/work')}</div>
      <div class="related-projects">${related.map(project => projectCard(project)).join('')}</div>
    </section>
  </article>${connect()}`;
}
function missing() {
  return `<section class="missing container"><h1 class="display">Page not found</h1>${link('Back to Home', '/')}</section>`;
}

export function renderPage(path) {
  const normalized = path.replace(/\/$/, '') || '/';
  const map = {
    '/': ['Home', home],
    '/studio': ['Studio', studio],
    '/work': ['Work', work],
    '/services': ['Services', servicePage],
    '/contact': ['Contact', contact],
  };
  const id = normalized.match(/^\/work\/([a-z-]+)$/)?.[1];
  const project = projects.find(p => p.id === id);
  const [name, render] = map[normalized] ?? (project ? [project.name, () => workDetail(id)] : ['Page not found', missing]);
  const current = project ? '/work' : normalized;
  const overlayHeader = current === '/' || current === '/studio';
  return {
    title: name === 'Home' ? 'o9 Studio — Interior Architecture Studio' : `${name} — o9 Studio`,
    page: name === 'Home' ? 'home' : project ? 'project' : name.toLowerCase().replaceAll(' ', '-'),
    html: `${header({ inverse: overlayHeader })}${header({ sticky: true })}
      <main id="main">${render()}</main>${footer(current)}${drawer(current)}
      <dialog id="image-dialog" class="image-dialog" aria-label="Project photograph">
        <div class="lightbox-stage">
          <img class="lightbox-image" alt="">
          <button type="button" class="carousel-prev icon-button" aria-label="Previous image" data-lightbox-step="-1">${icon('78102.svg', 32.6472, 31.1127)}</button>
          <button type="button" class="carousel-next icon-button" aria-label="Next image" data-lightbox-step="1">${icon('4bc3a.svg', 32.6472, 31.1127)}</button>
          <button type="button" class="carousel-enlarge icon-button lightbox-close" aria-label="Close image" data-close>${icon('dcad5.svg', 30.9902, 30.9902)}</button>
        </div>
      </dialog>
      <dialog id="profile-dialog" class="profile-dialog" aria-labelledby="profile-title"><button type="button" class="icon-button" aria-label="Close company profile" data-close>${icon('799d1.svg', 24.3488, 24.3558)}</button><h2 id="profile-title" class="display">Company profile</h2>${paragraphs(studioIntro)}${link('Read more about us', '/studio')}</dialog>`,
  };
}
