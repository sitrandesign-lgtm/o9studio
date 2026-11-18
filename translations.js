import { homeIntro, studioIntro, connectCopy, services, approach, processes, bareHan, pResidence } from './content.js';

const vi = new Map([
  ['Home', 'Trang chủ'], ['Studio', 'Về studio'], ['Work', 'Dự án'], ['Services', 'Dịch vụ'], ['Contact', 'Liên hệ'],
  ['Interior Architecture Studio', 'Studio Kiến trúc Nội thất'], ['Get in touch', 'Liên hệ'], ['About us', 'Về chúng tôi'],
  ['Read more about us', 'Tìm hiểu về studio'], ['Selected Works', 'Dự án tiêu biểu'], ['See All Projects', 'Xem tất cả dự án'],
  ['Featured', 'Báo chí'], ['Awards', 'Giải thưởng'], ['Find us on', 'Theo dõi chúng tôi'], ['All rights reserved.', 'Bảo lưu mọi quyền.'],
  ['Back to top', 'Về đầu trang'], ['Our Approach', 'Phương pháp thiết kế'], ['What we do', 'Lĩnh vực hoạt động'],
  ['Our Services', 'Dịch vụ của chúng tôi'], ['Our Company Profile', 'Hồ sơ năng lực'], ['Company profile', 'Hồ sơ năng lực'],
  ['Read More', 'Tìm hiểu thêm'], ['Connect with us', 'Kết nối với chúng tôi'], ['Contact Us', 'Liên hệ với chúng tôi'],
  ['All', 'Tất cả'], ['Stay', 'Lưu trú'], ['Live', 'Nhà ở'],
  ['Hospitality', 'Lưu trú'], ['Residential', 'Nhà ở'], ['View hospitality projects', 'Xem dự án lưu trú'], ['View residential projects', 'Xem dự án nhà ở'],
  ['Our work spans hospitality and residential interiors.', 'Chúng tôi thiết kế nội thất cho công trình lưu trú và nhà ở.'],
  ['Stay brings together hotels, resorts and serviced apartments, while Live focuses on private homes.', 'Stay gồm khách sạn, khu nghỉ dưỡng và căn hộ dịch vụ. Live tập trung vào nhà ở.'],
  ['Taking inspiration from contemporary life, o9 Design studio creates designs that respond to the context and narrative of each project.', 'Lấy cảm hứng từ đời sống đương đại, o9 Studio phát triển thiết kế phù hợp với bối cảnh và câu chuyện của từng dự án.'],
  ['We design places to stay and spaces to call home. Working across architecture and interiors, we bring together thoughtful layouts, natural light and material detail to shape spaces around people.', 'Chúng tôi thiết kế công trình lưu trú và nhà ở. Bố cục, ánh sáng tự nhiên và vật liệu được cân nhắc cùng nhau để đáp ứng cách con người sử dụng không gian.'],
  [homeIntro, 'Tại o9 Studio, mỗi dự án bắt đầu từ việc tìm hiểu bối cảnh và cách không gian sẽ được sử dụng. Những quan sát đó định hướng các quyết định thiết kế, từ ý tưởng đến chi tiết.'],
  [`“${homeIntro}”`, '“Tại o9 Studio, mỗi dự án bắt đầu từ việc tìm hiểu bối cảnh và cách không gian sẽ được sử dụng. Những quan sát đó định hướng các quyết định thiết kế, từ ý tưởng đến chi tiết.”'],
  [studioIntro[0], 'o9 Studio thiết kế nội thất cho nhà ở và công trình lưu trú. Mỗi dự án bắt đầu bằng việc khảo sát hiện trạng, tìm hiểu yêu cầu của khách hàng và quan sát cách con người sẽ sử dụng không gian.'],
  [studioIntro[1], 'Từ những quan sát đó, chúng tôi quyết định cách kết nối các phòng, đưa ánh sáng vào không gian và chọn vật liệu phù hợp với sinh hoạt. Khi phát triển thiết kế, chúng tôi xem xét đồng thời lớp hoàn thiện, hệ chiếu sáng và đồ nội thất đóng liền để giữ được ý đồ ban đầu đến từng chi tiết.'],
  [connectCopy, 'Mỗi dự án bắt đầu bằng một cuộc trò chuyện. Nếu bạn đang lên kế hoạch cải tạo, muốn trao đổi về một ý tưởng hoặc quan tâm đến việc gia nhập studio, hãy chia sẻ với chúng tôi.'],
  [services[0].caption, 'Khách sạn, khu nghỉ dưỡng và căn hộ dịch vụ được thiết kế để tạo cảm giác thoải mái và gắn kết với nơi chốn.'],
  [services[1].caption, 'Không gian sống được tổ chức theo thói quen hằng ngày, cân bằng giữa sinh hoạt chung và sự riêng tư.'],
  [services[0].paragraphs[0], 'Chúng tôi thiết kế khách sạn boutique, khu nghỉ dưỡng và căn hộ dịch vụ, chú ý đến trải nghiệm của khách từ khi đến nơi đến lúc nghỉ ngơi.'],
  [services[0].paragraphs[1], 'Từ ấn tượng đầu tiên đến những góc riêng tư, kiến trúc, nội thất và chi tiết vật liệu cùng tạo nên nét riêng của mỗi nơi.'],
  [services[1].paragraphs[0], 'Chúng tôi thiết kế nội thất nhà ở dựa trên nhịp sống của gia chủ, cân bằng giữa sinh hoạt chung và không gian riêng tư.'],
  [services[1].paragraphs[1], 'Bố cục, ánh sáng tự nhiên và vật liệu tạo nên những căn phòng thoải mái và mang dấu ấn của người sống trong đó.'],
  ...approach.flatMap(([heading, copy], i) => [
    [heading, ['Định hướng', 'Bố cục', 'Chế tác', 'Cảm xúc', 'Trải nghiệm'][i]],
    [copy, [
      'Chúng tôi bắt đầu từ con người, nơi chốn và mục đích sử dụng để xác định hướng đi cho mỗi dự án.',
      'Tỷ lệ, lối di chuyển và ánh sáng giúp kết nối khu vực sinh hoạt chung với những góc riêng tư.',
      'Vật liệu, mối nối và bề mặt hoàn thiện được phát triển cùng nhau, chú trọng độ chính xác và cảm giác khi sử dụng.',
      'Màu sắc, ánh sáng và bề mặt vật liệu tạo nên cảm giác ấm áp và gần gũi trong không gian.',
      'Chúng tôi xem xét trải nghiệm từ lúc bước vào đến các sinh hoạt hằng ngày để tạo sự thoải mái trong sử dụng.',
    ][i]],
  ]),
  [processes[0].title, 'Quy trình thiết kế'], [processes[1].title, 'Quy trình triển khai'],
  [processes[0].copy, 'Chúng tôi trao đổi về nhu cầu và bối cảnh, phát triển ý tưởng không gian, sau đó hoàn thiện bố cục, vật liệu và chi tiết.'],
  [processes[1].copy, 'Chúng tôi triển khai ý đồ thiết kế qua bản vẽ, lựa chọn vật liệu và trao đổi với các bên tại công trình.'],
  ...processes[0].steps.flatMap(([heading, copy], i) => [
    [heading, ['Tìm hiểu yêu cầu', 'Xác định ý tưởng', 'Tổ chức không gian', 'Phát triển vật liệu và ánh sáng', 'Hoàn thiện chi tiết'][i]],
    [copy, [
      'Chúng tôi trao đổi về mong muốn, thói quen và ưu tiên của bạn, sau đó khảo sát hiện trạng và xem xét các giới hạn về ngân sách.',
      'Chúng tôi phát triển ý tưởng chủ đạo qua hình ảnh tham khảo và phác thảo, dựa trên bối cảnh của công trình.',
      'Chúng tôi thử nghiệm bố cục, lối đi và tỷ lệ để đáp ứng nhu cầu sử dụng, tận dụng ánh sáng và diện tích.',
      'Chúng tôi phối hợp màu sắc, ánh sáng và vật liệu để tạo cảm nhận phù hợp cho từng không gian.',
      'Chúng tôi hoàn thiện các mối nối, đồ nội thất đóng liền và thiết bị để chuẩn bị cho bước triển khai.',
    ][i]],
  ]),
  ...processes[1].steps.flatMap(([heading, copy], i) => [
    [heading, ['Triển khai bản vẽ kỹ thuật', 'Phối hợp các bên', 'Duyệt vật liệu và mẫu', 'Theo dõi tại công trình', 'Rà soát và bàn giao'][i]],
    [copy, [
      'Chúng tôi lập bản vẽ và bảng thống kê thể hiện kích thước, vật liệu và chi tiết thi công theo phạm vi đã thống nhất.',
      'Chúng tôi trao đổi với tư vấn, nhà thầu và nhà cung cấp để làm rõ yêu cầu thiết kế và trách nhiệm của từng bên.',
      'Chúng tôi rà soát mẫu hoàn thiện và mẫu thử theo ý đồ thiết kế, cân nhắc chất lượng và mức độ phù hợp.',
      'Khi phạm vi công việc bao gồm hỗ trợ tại công trình, chúng tôi rà soát các mốc chính và trao đổi về những điều chỉnh cần thiết.',
      'Chúng tôi rà soát không gian đã hoàn thiện, ghi nhận các hạng mục cần xử lý và hỗ trợ bàn giao theo thỏa thuận.',
    ][i]],
  ]),
  ['Work with us', 'Hợp tác với chúng tôi'], ['Join us', 'Gia nhập studio'],
  ['New project enquiries', 'Trao đổi về dự án mới'], ['We look forward to your talent and passion', 'Cơ hội tại o9 Studio'],
  ['Share your interests, experience and portfolio with our studio.', 'Hãy chia sẻ với chúng tôi về chuyên môn, kinh nghiệm và hồ sơ thiết kế của bạn.'],
  ['We’d love to hear what you’re planning. Use the form below to tell us about your project, where it’s based, and what you’d like to achieve.', 'Hãy cho chúng tôi biết về dự án, địa điểm và những gì bạn muốn thực hiện qua biểu mẫu dưới đây.'],
  ['Full Name', 'Họ và tên'], ['Email Address', 'Email'], ['Phone Number', 'Số điện thoại'], ['Project Location', 'Địa điểm dự án'], ['Position of interest', 'Vị trí quan tâm'],
  ['How did you hear about us?', 'Bạn biết đến chúng tôi qua đâu?'], ['Which type of services are required?', 'Bạn cần dịch vụ nào?'],
  ['Which type of project are you looking at?', 'Dự án thuộc loại hình nào?'], ['Which of the following best describes your project?', 'Phạm vi dự án của bạn là gì?'],
  ['Property size', 'Diện tích công trình'], ['Do you have a project budget?', 'Ngân sách dự kiến của bạn là bao nhiêu?'],
  ['Google search', 'Tìm kiếm Google'], ['Social Network', 'Mạng xã hội'], ['Referral - friends or family', 'Bạn bè hoặc gia đình giới thiệu'], ['Publication or press', 'Ấn phẩm hoặc báo chí'],
  ['Architecture', 'Kiến trúc'], ['Interior Design', 'Thiết kế nội thất'], ['Architecture & Interior design', 'Kiến trúc và nội thất'],
  ['New Build', 'Xây mới'], ['Renovation of existing', 'Cải tạo'], ['Renovation and extension to existing', 'Cải tạo và mở rộng'],
  ['Under 200 SQM', 'Dưới 200 m²'], ['200 - 500 SQM', '200–500 m²'], ['500 - 1000 SQM', '500–1.000 m²'], ['Above 1000 SQM', 'Trên 1.000 m²'],
  ['Less than $100K', 'Dưới $100K'], ['Over $500K', 'Trên $500K'], ['Message', 'Lời nhắn'],
  ['Tell us about yourself', 'Giới thiệu về bạn'], ['Tell us a little more about your project', 'Chia sẻ thêm về dự án của bạn'],
  ['Attachments - CV and portfolio', 'Tệp đính kèm – CV và portfolio'], ['Attachments - Please upload the design information', 'Tệp đính kèm – Thông tin dự án'],
  ['Drop files here or browse', 'Kéo thả hoặc chọn tệp'], ['Browse', 'Chọn tệp'], ['Up to 5 files, 25 MB in total.', 'Tối đa 5 tệp, tổng dung lượng 25 MB.'],
  ['Send enquiry', 'Gửi thông tin dự án'], ['Send application', 'Gửi hồ sơ'], ['Remove', 'Xoá'],
  ['Attach up to 5 files, 25 MB in total.', 'Chỉ đính kèm tối đa 5 tệp với tổng dung lượng 25 MB.'],
  ['Saved on this device. No email was sent.', 'Đã lưu trên thiết bị này. Chưa gửi email.'],
  ['Could not save on this device. Please try again.', 'Không thể lưu trên thiết bị này. Vui lòng thử lại.'],
  ['Location', 'Địa điểm'], ['Project', 'Dự án'], ['Year', 'Năm'], ['Category', 'Loại hình'], ['Scope', 'Phạm vi'], ['Size', 'Diện tích'],
  ['Design team', 'Nhóm thiết kế'], ['Collaborators', 'Đối tác'], ['Photography', 'Nhiếp ảnh'], ['Media', 'Báo chí'],
  ['More projects', 'Dự án khác'], ['View all projects', 'Xem tất cả dự án'],
  [bareHan.tagline, 'Không gian lưu trú cho những tâm hồn tự do.'],
  [bareHan.description[0], 'Bare Han tiếp nối định hướng của Bare Boutique Stays về sự yên tĩnh và riêng tư. Khách có thể tự nhận và trả phòng. Mỗi căn studio được bố trí trên một tầng riêng.'],
  [bareHan.description[1], 'Gỗ, đá và kim loại tạo nên mặt đứng công trình. Mặt tiền mở đưa ánh sáng tự nhiên vào bên trong. Ba dải đứng nhấn mạnh chiều cao của tòa nhà.'],
  ['Live — Residential', 'Live — Nhà ở'],
  ['Interior design', 'Thiết kế nội thất'],
  ['Status', 'Trạng thái'], ['Completed', 'Đã hoàn thành'],
  [pResidence.tagline, 'Ngôi nhà theo nhịp sống hằng ngày.'],
  [pResidence.description[0], 'P Residence là căn hộ rộng 75 m² tại Thành phố Hồ Chí Minh, được thiết kế theo thói quen sinh hoạt của gia chủ. Nằm ở góc đông nam của tòa nhà, căn hộ đón ánh sáng tự nhiên và có tầm nhìn hướng về thành phố.'],
  [pResidence.description[1], 'Bố cục kết nối phòng khách, bếp và khu vực ăn uống, đồng thời giữ sự riêng tư cho các phòng ngủ. Bàn ăn rộng cùng ghế ngồi đóng liền tạo không gian gặp gỡ gia đình và bạn bè. Phòng ngủ thứ hai được sử dụng linh hoạt cho việc đọc sách, tập luyện và nghỉ ngơi, với chỗ ngồi bên cửa sổ nhìn ra thành phố.'],
  [pResidence.description[2], 'Gỗ óc chó, hệ tủ tích hợp và đồ nội thất đơn giản tạo sự liền mạch cho không gian. Mỗi yếu tố đáp ứng một nhu cầu thực tế, dành chỗ cho sinh hoạt chung và những khoảng thời gian riêng.'],
  ['Open menu', 'Mở menu'], ['Close menu', 'Đóng menu'], ['Close image', 'Đóng ảnh'], ['Language', 'Ngôn ngữ'],
  ['Next image', 'Ảnh tiếp theo'], ['Previous image', 'Ảnh trước'], ['Enlarge image', 'Phóng to ảnh'],
  ['Play slideshow', 'Chạy trình chiếu'], ['Pause slideshow', 'Dừng trình chiếu'],
  ['Filter projects', 'Lọc dự án'], ['All projects', 'Tất cả dự án'], ['Hospitality projects', 'Dự án lưu trú'], ['Residential projects', 'Dự án nhà ở'],
  ['Skip to content', 'Chuyển đến nội dung'], ['Page not found', 'Không tìm thấy trang'], ['Back to Home', 'Về trang chủ'],
]);

export function translate(text, language) {
  return language === 'vi' ? vi.get(text) ?? text : text;
}

const originals = new WeakMap();
export function localize(root, language) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!originals.has(node)) originals.set(node, node.data);
    const original = originals.get(node);
    const source = original.trim();
    if (source) node.data = original.replace(source, translate(source, language));
  }

  for (const node of root.querySelectorAll('[aria-label], [placeholder]')) {
    if (!originals.has(node)) {
      originals.set(node, ['aria-label', 'placeholder'].map(attr => [attr, node.getAttribute(attr)]).filter(([, value]) => value));
    }
    for (const [attr, original] of originals.get(node)) node.setAttribute(attr, translate(original, language));
  }
}
