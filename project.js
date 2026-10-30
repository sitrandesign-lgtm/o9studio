const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const site = $('.site');
new ResizeObserver(() => site.style.setProperty('--design-scale', site.clientWidth / 1440)).observe(site);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('#site-menu');
const menuToggle = $('.menu-toggle');
menuToggle.addEventListener('click', () => menu.showModal());
$('[data-close]', menu).addEventListener('click', () => menu.close());
menu.addEventListener('close', () => menuToggle.setAttribute('aria-expanded', 'false'));
new MutationObserver(() => menuToggle.setAttribute('aria-expanded', String(menu.open))).observe(menu, { attributes: true, attributeFilter: ['open'] });
menu.addEventListener('click', event => {
  if (event.target.closest('a')) menu.close();
  if (event.target !== menu) return;
  const rect = menu.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right) menu.close();
});
$('.back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' }));
$('a[href="#project-info"]').addEventListener('click', () => $('#project-info').focus({ preventScroll: true }));

// Only the three photographs supplied for this project are used. No fabricated slides.
const photographs = [
  { src: 'assets/b5cf1.jpg', alt: 'Bare Han studio with curved yellow and teal joinery' },
  { src: 'assets/bare-han-facade.jpg', alt: "Bare Han's narrow facade, with green and yellow windows and planted balconies" },
  { src: 'assets/bare-han-interior.jpg', alt: 'A sunlit Bare Han studio with a bed, curved doors and soft green walls' }
];
const galleryInstances = new Map();
$$('[data-gallery]').forEach(gallery => {
  let index = gallery.dataset.gallery === 'facade' ? 1 : gallery.dataset.gallery === 'interior' ? 2 : 0;
  let transition;
  const image = $('img', gallery);
  const dots = $('.gallery-dots', gallery);
  const buttons = [];
  if (dots) photographs.forEach((photo, photoIndex) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', `Photograph ${photoIndex + 1}`);
    button.setAttribute('aria-current', String(photoIndex === index));
    button.addEventListener('click', () => select(photoIndex));
    buttons.push(button);
    dots.append(button);
  });
  function select(next) {
    index = (next + photographs.length) % photographs.length;
    transition?.cancel();
    image.src = photographs[index].src;
    image.alt = photographs[index].alt;
    buttons.forEach((button, buttonIndex) => button.setAttribute('aria-current', String(buttonIndex === index)));
    if (!reducedMotion.matches) transition = image.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 400, easing: 'ease-out' });
    if (gallery.dataset.gallery === 'hero') {
      $('.gallery-count span').textContent = `${String(index + 1).padStart(2, '0')} of ${String(photographs.length).padStart(2, '0')}`;
      $('.gallery-progress span').style.width = `${(index + 1) / photographs.length * 100}%`;
    }
  }
  $$('[data-direction]', gallery).forEach(button => button.addEventListener('click', () => select(index + Number(button.dataset.direction))));
  gallery.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    select(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let pointerStart;
  gallery.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse') pointerStart = { x: event.clientX, y: event.clientY }; });
  gallery.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const delta = event.clientX - pointerStart.x;
    if (Math.abs(delta) > 45 && Math.abs(delta) > Math.abs(event.clientY - pointerStart.y)) select(index + (delta < 0 ? 1 : -1));
    pointerStart = undefined;
  });
  gallery.addEventListener('pointercancel', () => { pointerStart = undefined; });
  galleryInstances.set(gallery.dataset.gallery, { next: () => select(index + 1) });
});
$('.gallery-count').addEventListener('click', () => galleryInstances.get('hero').next());

const english = Object.fromEntries($$('[data-i18n]').map(element => [element.dataset.i18n, element.innerHTML]));
const vietnamese = {
  getInTouch: 'Kết nối với chúng tôi', project: 'Dự án', year: 'Năm', location: 'Địa điểm', city: 'Đà Nẵng, Việt Nam', moreInfo: 'Thông tin thêm',
  title: 'Chốn dừng chân<br>cho tâm hồn tự do.',
  intro1: 'Đối diện nhà thờ mang phong cách Gothic được xây dựng từ thời Pháp thuộc giữa thành phố Đà Nẵng sôi động, một khách sạn boutique ấm cúng đã ra đời. Nằm trong con hẻm yên tĩnh, Bare Han thuộc thương hiệu Bare Boutique Stays, mang đến một trải nghiệm lưu trú đặc biệt.',
  intro2: 'Vị trí và kiến trúc cùng tạo nên một không gian an toàn, thân thuộc như ở nhà giữa một thành phố xa lạ. Tại mỗi địa điểm mới, Bare Boutique Stays tạo ra những không gian tiện nghi và riêng tư để du khách tìm lại sự bình yên sau hành trình khám phá.',
  intro3: 'Tràn đầy năng lượng trẻ trung nhưng vẫn trân trọng quá khứ, công trình thể hiện một ngôn ngữ thiết kế đương đại thanh lịch.',
  intro4: 'Bare Boutique Stays luôn hướng đến sự yên tĩnh và riêng tư cho khách lưu trú. Bare Han tiếp tục sử dụng hệ thống tự nhận và trả phòng của thương hiệu. Mỗi căn studio được bố trí trên một tầng riêng để tăng tính riêng tư.',
  intro5: 'Gỗ, đá và kim loại ở mặt đứng kết hợp hài hòa để tạo nên vẻ thanh lịch của khách sạn. Khu đất hẹp đặt ra yêu cầu về một mặt đứng thông thoáng, đưa ánh sáng vào sâu bên trong. Ba nhịp đứng với đường nét giản dị nhấn mạnh chiều cao của công trình.',
  materials1: 'Không gian nội thất mang lại cảm giác ấm cúng và thanh bình. Mỗi căn studio có bảng màu và nội thất riêng, tạo ra những bầu không khí vui tươi để thư giãn. Lấy cảm hứng từ nhà thờ Gothic gần đó, các kiến trúc sư đưa những đường vòm vào thiết kế, kết nối nét cổ điển với tinh thần đương đại một cách sinh động.',
  materials2: 'Gỗ tần bì với sắc độ sáng là vật liệu chủ đạo, kết hợp cùng kim loại sơn màu và đá marble làm điểm nhấn ở cửa và đồ nội thất. Ánh sáng tự nhiên từ cửa sổ lớn và ánh sáng nhân tạo được bố trí cẩn thận giúp mỗi căn phòng trở nên dịu dàng, thư thái.',
  outro1: 'Bố cục mỗi phòng chú trọng công năng và hiệu quả sử dụng diện tích. Các chức năng cần thiết cho một kỳ nghỉ trọn vẹn được sắp xếp linh hoạt và thông minh. Tìm ra phương án bố trí hiệu quả nhất luôn là mục tiêu của đội ngũ thiết kế.',
  outro2: 'Hành lang và cầu thang bên ngoài tràn ngập ánh sáng tự nhiên từ giếng trời và tường gạch thông gió. Khoảng đệm thoáng đãng đưa du khách từ nhịp sống sôi động của thành phố vào sự yên bình của căn phòng. Trên tầng cao nhất, sân thượng với cây xanh và giàn che là không gian chung lý tưởng để nghỉ ngơi sau một ngày khám phá.',
  outro3: 'Với thiết kế thanh lịch và nội thất được lựa chọn kỹ lưỡng, Bare Han mang lại trải nghiệm nghỉ ngơi thư thái tại Đà Nẵng. Những chi tiết sinh động và bảng màu kết hợp ký ức thiết kế với xu hướng đương đại, tạo nên một không gian ấm cúng dành cho những tâm hồn tự do.',
  category: 'Loại hình', stay: 'Lưu trú', size: 'Diện tích', scope: 'Phạm vi', scopeValue: 'Thiết kế kiến trúc & nội thất', team: 'Thiết kế', collaborators: 'Cộng tác', photography: 'Nhiếp ảnh', awards: 'Giải thưởng', media: 'Báo chí',
  moreProjects: 'Dự án khác', viewAll: 'Xem tất cả dự án', indochineCaption: 'Lưu trú boutique · TP. Hồ Chí Minh', nangCaption: 'Căn hộ dịch vụ · Đà Nẵng', chibuCaption: 'Khu nghỉ dưỡng ven sông · Việt Nam',
  connect: 'Kết nối với chúng tôi', opportunities: 'Dự án, hợp tác & cơ hội', connectCopy: 'Mỗi dự án bắt đầu từ một cuộc trò chuyện. Dù bạn đang muốn làm mới không gian, khám phá một ý tưởng hay gia nhập đội ngũ, chúng tôi luôn sẵn lòng lắng nghe. Hãy chia sẻ điều bạn đang ấp ủ để cùng tạo nên những không gian ý nghĩa.',
  contactUs: 'Liên hệ', reach: 'Liên hệ với chúng tôi', findUs: 'Theo dõi chúng tôi', studio: 'Studio', work: 'Dự án', services: 'Dịch vụ', contact: 'Liên hệ', backTop: 'Về đầu trang'
};
function decorateUnderlines() {
  $$('.text-link, .back-top, .menu-links a').forEach(element => {
    if ($('.underline-label', element)) return;
    const span = document.createElement('span');
    span.className = 'underline-label';
    span.textContent = element.textContent;
    element.replaceChildren(span);
  });
}
$$('[data-language]').forEach(button => button.addEventListener('click', () => {
  const language = button.dataset.language;
  document.documentElement.lang = language;
  $$('[data-i18n]').forEach(element => { element.innerHTML = (language === 'vi' ? vietnamese : english)[element.dataset.i18n] || english[element.dataset.i18n]; });
  $$('[data-language]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.language === language)));
  decorateUnderlines();
}));
decorateUnderlines();
