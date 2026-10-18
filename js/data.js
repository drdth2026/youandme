/**
 * YOU & ME - DR. TEA CLINIC (BS. PHAM TAN TRA)
 * DATA & STATE MODULE
 */

const ARTICLES_STORAGE_KEY = 'youandme_drteaclinic_articles_v2';
const SITE_CONFIG_STORAGE_KEY = 'youandme_drteaclinic_sitecfg_v2';
const CONSULT_STORAGE_KEY = 'youandme_drteaclinic_consults_v1';
const CHAT_STORAGE_KEY = 'youandme_drteaclinic_chat_v1';
const ADMIN_AUTH_KEY = 'youandme_drteaclinic_auth_admin';

const CATEGORY_LABELS = {
  oncology: '🎗️ Ung bướu & Tầm soát',
  internal: '❤️ Nội khoa – Huyết áp – Thận',
  myth: '💡 Giải mã Hiểu lầm Y khoa',
  derma: '🧴 Da liễu & Chăm sóc giảm nhẹ'
};

const DEFAULT_SITE_CONFIG = {
  docName: 'BS. Phạm Tấn Trà (Dr. Tea)',
  docPhone: '0383 926 649',
  docBank: 'Vietcombank 1017531782 (Chủ TK: PHẠM TẤN TRÀ)',
  docEmail: 'drdth2026@gmail.com',
  docCchn: '009120/QNA-CCHN',
  docAddress: 'Tư vấn Y khoa Trực tuyến Toàn quốc 1:1 & Khám tại TP. Hồ Chí Minh',
  announcement: 'youandme.drteaclinic.vn — Phòng Khám & Tư Vấn Y Khoa Trực Tuyến 1:1 cùng BS. Phạm Tấn Trà (Nội khoa & Ung bướu)',
  heroDesc: 'Chào mừng bạn đến với You & Me (youandme.drteaclinic.vn) — nền tảng Tư vấn Y khoa Trực tuyến (Telemedicine) chuyên sâu Nội khoa & Ung bướu của BS. Phạm Tấn Trà (Dr. Tea). Bạn có thể tự sàng lọc nguy cơ, tải trực tiếp hình ảnh xét nghiệm, đơn thuốc, file Word, Excel, PDF vào Chat Box để được bác sĩ phân tích và định hướng điều trị an toàn ngay tại nhà.',
  // Server Web App endpoint is managed by server backend, not exposed in UI
  googleSheetUrl: ''
};

const DEFAULT_MEDICAL_ARTICLES = [
  {
    id: 'art-dense-breast',
    category: 'oncology',
    catLabel: '🎗️ Ung bướu & Tầm soát',
    title: 'Mô vú đặc ở phụ nữ Việt Nam: Vì sao cần kết hợp cả Siêu âm và Nhũ ảnh 3D?',
    summary: 'Đa số phụ nữ Việt Nam và Á Đông có mô tuyến vú nhỏ nhưng mật độ sợi tuyến rất đặc (BI-RADS C, D) và đỉnh tuổi mắc ung thư vú sớm (40–50 tuổi). Hiểu đúng để không bỏ sót tổn thương.',
    content: `
      <p><strong>1. Mô vú đặc (Dense Breasts) là gì?</strong><br/>Tuyến vú của phụ nữ gồm mô mỡ và mô sợi tuyến. Khi chụp nhũ ảnh (X-quang tuyến vú), mô mỡ có màu đen trong suốt, còn <strong>mô sợi tuyến đặc và khối u đều có màu trắng</strong>. Do đó, trên nền mô vú đặc (phân loại ACR BI-RADS C hoặc D), khối u nhỏ rất dễ bị "ngụy trang" giống như tìm một quả bóng tuyết trong bão tuyết.</p>
      <p><strong>2. Điểm khác biệt của phụ nữ Việt Nam &amp; Á Đông:</strong><br/>Theo <em>China Anti-Cancer Association Guideline</em> và dữ liệu dịch tễ Việt Nam, phụ nữ Á Đông có mật độ mô vú đặc cao hơn hẳn phụ nữ phương Tây, đồng thời độ tuổi đỉnh mắc ung thư vú rơi vào khoảng <strong>40 – 50 tuổi</strong> (sớm hơn phương Tây 5 – 10 năm).</p>
      <p><strong>3. Khuyến nghị chuẩn từ NCCN v1.2026 &amp; BS. Trà:</strong><br/>• <strong>Nhũ ảnh 3D (Tomosynthesis):</strong> Là phương tiện duy nhất phát hiện tốt các đám <em>vi vôi hóa (microcalcifications)</em> gợi ý ung thư biểu mô tại chỗ (DCIS) giai đoạn cực sớm.<br/>• <strong>Siêu âm tuyến vú bổ trợ (BUS):</strong> Giúp nhìn xuyên qua lớp mô sợi tuyến đặc để phát hiện các khối u đặc kín đáo mà nhũ ảnh bị che khuất (tăng độ nhạy phát hiện từ 50% lên gần 78%).<br/>• <strong>MRI vú có thuốc đối quang từ:</strong> Được NCCN v1.2026 khuyến cáo mức Category 1 bổ trợ cho phụ nữ có mô vú cực kỳ đặc (BI-RADS D) hoặc nhóm nguy cơ cao di truyền.</p>
    `
  },
  {
    id: 'art-tumor-markers',
    category: 'myth',
    catLabel: '💡 Giải mã Hiểu lầm Y khoa',
    title: 'Đừng mất tiền oan và hoang mang vì "Xét nghiệm máu tầm soát 10 loại ung thư"',
    summary: 'Nhiều người lo sợ đến mất ăn mất ngủ khi thấy chỉ số CEA, CA 19-9, CA 15-3 hay CA 125 tăng nhẹ trong gói khám sức khỏe. Sự thật y khoa đằng sau các dấu ấn này là gì?',
    content: `
      <p><strong>1. Dấu ấn ung thư (Tumor Markers) thực chất dùng để làm gì?</strong><br/>Trong chuyên ngành Ung bướu, các chất chỉ điểm khối u như <code>CA 15-3</code> (vú), <code>CA 19-9</code> (tụy/đường mật), <code>CEA</code> (đại trực tràng/phổi), <code>CA 125</code> (buồng trứng) chủ yếu dùng để <strong>theo dõi đáp ứng điều trị và phát hiện tái phát ở người ĐÃ ĐƯỢC CHẨN ĐOÁN ung thư</strong>.</p>
      <p><strong>2. Vì sao KHÔNG dùng đơn độc để tầm soát ở người khỏe mạnh?</strong><br/>• <strong>Độ nhạy thấp ở giai đoạn sớm:</strong> Khi khối u còn nhỏ (giai đoạn 1), các chỉ số này thường hoàn toàn bình thường (âm tính giả).<br/>• <strong>Dương tính giả rất cao:</strong> Chỉ cần bạn bị viêm dạ dày, viêm đại tràng, hút thuốc lá, gan nhiễm mỡ, nang buồng trứng lành tính hoặc đang trong kỳ kinh nguyệt, các chỉ số này cũng có thể tăng nhẹ khiến bạn hoảng loạn không đáng có.</p>
      <p><strong>3. Hai ngoại lệ có giá trị trong tầm soát (Khi dùng đúng chỉ định):</strong><br/>• <strong>AFP (kết hợp Siêu âm bụng mỗi 6 tháng):</strong> Dành cho người có <em>Viêm gan B mạn tính</em> hoặc <em>Xơ gan</em> để tầm soát ung thư biểu mô tế bào gan (HCC).<br/>• <strong>PSA máu:</strong> Trao đổi cùng bác sĩ để tầm soát ung thư tuyến tiền liệt ở nam giới từ 45–50 tuổi (hoặc từ 40 tuổi nếu mang đột biến gen <code>BRCA2</code> / <code>ATM</code> theo ESMO).</p>
    `
  },
  {
    id: 'art-hbv-decoder',
    category: 'internal',
    catLabel: '❤️ Nội khoa – Huyết áp – Thận',
    title: 'Đọc hiểu kết quả Viêm gan B (HBsAg, Anti-HBs, Anti-HBc) trong 2 phút',
    summary: 'Làm sao biết mình đã có kháng thể bảo vệ, đang nhiễm mạn tính hay nhiễm Viêm gan B thể ẩn trước khi hóa trị ung thư?',
    content: `
      <p><strong>Cách đối chiếu nhanh 3 chỉ số huyết thanh Viêm gan B:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>HBsAg (-), Anti-HBs (-), Anti-HBc (-):</strong> Chưa từng nhiễm và chưa có kháng thể → Cần đi tiêm vắc-xin phòng Viêm gan B ngay.</li>
        <li><strong>HBsAg (-), Anti-HBs (+), Anti-HBc (-):</strong> Đã có miễn dịch bảo vệ nhờ tiêm vắc-xin (nồng độ Anti-HBs &gt; 10 mIU/mL là đạt ngưỡng bảo vệ).</li>
        <li><strong>HBsAg (-), Anti-HBs (+), Anti-HBc (+):</strong> Đã từng nhiễm virus Viêm gan B tự nhiên trong quá khứ và cơ thể đã tự đào thải khỏi bệnh.</li>
        <li><strong>HBsAg (+), Anti-HBc (+):</strong> Đang nhiễm virus Viêm gan B. Cần khám chuyên khoa đánh giá men gan (AST/ALT), tải lượng HBV-DNA, độ đàn hồi gan (FibroScan) và <strong>tính điểm PAGE-B</strong> để tầm soát u gan định kỳ mỗi 6 tháng.</li>
      </ul>
      <p><strong>Lưu ý đặc biệt cho bệnh nhân Ung bướu:</strong> Mọi bệnh nhân trước khi bước vào <em>hóa trị, liệu pháp miễn dịch hoặc thuốc nhắm trúng đích</em> đều bắt buộc phải xét nghiệm đủ cả 3 chỉ số này để phòng ngừa nguy cơ <strong>bùng phát Viêm gan B cấp</strong>.</p>
    `
  },
  {
    id: 'art-safety-pregnancy-renal',
    category: 'oncology',
    catLabel: '🎗️ Ung bướu & Tầm soát',
    title: 'Tầm soát vú khi đang mang thai, cho con bú hoặc suy thận: Nguyên tắc an toàn sống còn',
    summary: 'Tổng hợp từ NCCN v1.2026 (BSCR-B): Khi nào chống chỉ định tiêm thuốc đối quang từ Gadolinium? Đang cho con bú đi chụp nhũ ảnh và MRI có phải vắt bỏ sữa không?',
    content: `
      <p><strong>1. Phụ nữ đang mang thai:</strong><br/>• <strong>Tuyệt đối KHÔNG chụp MRI vú có tiêm thuốc đối quang từ (Gadolinium)</strong> vì Gadolinium đi qua nhau thai vào tuần hoàn thai nhi.<br/>• <strong>Siêu âm tuyến vú</strong> là phương tiện đầu tay an toàn nhất khi có khối u hoặc triệu chứng vú trong thai kỳ.<br/>• <strong>Nhũ ảnh (Mammography) có che chắn bụng:</strong> Liều tia X đến thai nhi của 4 phim nhũ ảnh chỉ <strong>&lt; 0,03 mGy</strong> (thấp hơn 1.600 lần ngưỡng gây hại thai nhi 50 mGy), nên vẫn thực hiện được khi bác sĩ nghi ngờ tổn thương ác tính.</p>
      <p><strong>2. Phụ nữ đang cho con bú:</strong><br/>• Hãy <strong>cho bé bú hoặc hút cạn sữa ngay trước khi vào phòng chụp</strong> (Siêu âm/Nhũ ảnh/MRI) để mô vú bớt căng đặc, giúp bác sĩ nhìn rõ tổn thương hơn.<br/>• Nếu cần tiêm thuốc đối quang từ Gadolinium để chụp MRI vú, lượng thuốc qua sữa mẹ trong 24 giờ đầu chỉ <strong>&lt; 1%</strong> liều cho phép ở trẻ sơ sinh, nên <strong>mẹ hoàn toàn tiếp tục cho bé bú bình thường mà không cần vắt bỏ sữa</strong> (NCCN v1.2026 MS-31).</p>
      <p><strong>3. Người bệnh suy thận (eGFR &lt; 30 mL/phút/1.73m²):</strong><br/>• Tránh tiêm Gadolinium (nguy cơ xơ hóa hệ thống nguồn gốc thận - NSF) và tránh tiêm thuốc cản quang chứa Iod (nguy cơ suy thận cấp do thuốc cản quang).</p>
    `
  },
  {
    id: 'art-pancreas-gi-redflags',
    category: 'oncology',
    catLabel: '🎗️ Ung bướu & Tầm soát',
    title: '6 dấu hiệu "Cờ đỏ" của bệnh lý Tiêu hóa – Gan Mật Tụy không được phép chủ quan',
    summary: 'Đau âm ỉ thượng vị lan ra sau lưng, sụt cân nhanh không rõ nguyên nhân hay khởi phát đái tháo đường mới ở tuổi trên 50 có thể là tín hiệu sớm cần khảo sát hình ảnh học.',
    content: `
      <p><strong>Khi nào bạn không nên tự mua thuốc dạ dày uống mà cần gặp Bác sĩ ngay?</strong></p>
      <ul class="list-disc pl-5 space-y-1.5">
        <li><strong>Sụt cân nhanh không chủ ý:</strong> Giảm &gt; 5% trọng lượng cơ thể trong vòng 3 – 6 tháng (ví dụ sụt 4–6 kg) kèm chán ăn, mệt mỏi.</li>
        <li><strong>Đau tức vùng thượng vị lan xuyên ra sau lưng:</strong> Đặc biệt đau tăng khi nằm ngửa và đỡ hơn khi ngồi cúi người ra trước (gợi ý bệnh lý vùng thân – đuôi tụy).</li>
        <li><strong>Vàng da, vàng mắt, nước tiểu sẫm màu như nước trà đặc</strong> hoặc phân bạc màu (gợi ý tắc mật).</li>
        <li><strong>Khởi phát Đái tháo đường mới đột ngột ở người &gt; 50 tuổi</strong> không có tiền sử béo phì hay gia đình tiểu đường, hoặc đường huyết đang ổn định bỗng nhiên mất kiểm soát.</li>
        <li><strong>Nuốt nghẹn tăng dần, nôn ra máu hoặc đi ngoài phân đen / phân lẫn máu nhầy mũi.</strong></li>
        <li><strong>Tiền sử gia đình có người mắc Ung thư tụy, Ung thư vú/buồng trứng (đột biến BRCA1/2, PALB2, ATM, STK11):</strong> Theo ESMO, nhóm này cần được tư vấn tầm soát tụy bằng siêu âm nội soi (EUS) hoặc MRI từ tuổi 35–50.</li>
      </ul>
    `
  }
];

let MEDICAL_ARTICLES = [];
let SITE_CONFIG = { ...DEFAULT_SITE_CONFIG };

function getConsultRecords() {
  try {
    const raw = localStorage.getItem(CONSULT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Lỗi khi đọc danh sách hồ sơ tư vấn:', e);
  }
  return [];
}

function saveConsultRecords(list) {
  try {
    localStorage.setItem(CONSULT_STORAGE_KEY, JSON.stringify(list));
    const badge = document.getElementById('cmsSheetRecordCount');
    if (badge) badge.textContent = list.length;
    const homeBadge = document.getElementById('consultCountBadge');
    if (homeBadge) homeBadge.textContent = list.length;
  } catch (e) {
    console.error('Lỗi khi lưu danh sách hồ sơ tư vấn:', e);
  }
}
