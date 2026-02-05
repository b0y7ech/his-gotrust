'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BeakerIcon,
  PhotoIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  PrinterIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  ClockIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  DocumentArrowDownIcon,
  PencilSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

// ==================== MOCK DATA FROM EMR 365 ====================
const mockPatientDetail = {
  // ThongTinBenhNhan
  mabenhnhan: 'BN.240101999999',
  hoten: 'Trần Thị B',
  ngaysinh: '01/01/1999',
  tuoi: 31,
  gioitinh: 'Nữ',
  cccd_so: '079199012345',
  nghenghiep: 'Công nhân, thợ thủ công',
  dantoc: 'Kinh',
  diachi: 'Khóm 07, Thành Phố Bạc Liêu, Bạc Liêu',
  sodienthoai: '0901234567',
  nhommau: 'O',
  yeutorh: '+',
  
  // BHYT
  mabhyt: 'DN495752667xxxx',
  tungaybhyt: '01/01/2019',
  denngaybhyt: '31/12/2019',
  noidangkykcbbd: 'BVĐK TỈNH XYZ',
  doituongbn_loai: 'BHYT',
  
  // Người thân
  hotennguoithan: 'Chồng: Nguyễn Văn A',
  sodienthoainguoithan: '0912345678',
  
  // Tags
  tags: [
    { type: 'diung', label: 'Dị ứng' },
    { type: 'tiensu', label: 'Tiền sử: Tăng huyết áp' },
  ],
};

// ThongTinVaoVien
const thongTinVaoVien = {
  sovaovien: '24.05.06.046537',
  sophieu: 'PVV.05046537',
  phongkham: 'PK Cấp Cứu',
  bacsikhambenh: 'Võ Văn B',
  denkhambenhluc: '31/12/2023 23:04:11',
  lydovaovien: 'Đau bụng',
  quatrinhbenhly: 'Đau bụng kèm nôn ói nên vào viện',
  chandoansobo: 'Đau bụng không xác định và đau bụng khác',
  chandoanvaovien: 'Đau bụng không xác định và đau bụng khác',
  khambenh_chandoanvaovienmaicd: 'R10.4',
  dieutritaikhoa: 'Khoa Ngoại tổng hợp',
  
  // Sinh hiệu
  mach: 100,
  nhietdo: 37.0,
  nhiptho: 20,
  huyetap_tamthu: 120,
  huyetap_tamtruong: 80,
  cannang: 40,
  chieucao: 130,
  
  // Khám toàn thân
  khambenh_toanthan: 'Tỉnh táo, tiếp xúc tốt.',
  
  // Khám các cơ quan
  khambenh_caccoquan: {
    tuanhoan: { dauchung: 'Tiếng tim bình thường', ghichu: 'Nghe cả hai thì' },
    hohap: { dauchung: 'Ran nổ 2 phổi', ghichu: 'Nghe thì hít vào' },
    tieuhoa: [
      { dauchung: 'Đau thượng vị', ghichu: 'Đau quặn' },
      { dauchung: 'Nôn ói', ghichu: 'Số lượng nhiều' },
    ],
    thantietnieu: { dauchung: 'Bình thường', ghichu: '' },
    thankinh: { dauchung: 'Bình thường', ghichu: '' },
    coxuongkhop: { dauchung: 'Bình thường', ghichu: '' },
    taimuihong: { dauchung: 'Bình thường', ghichu: '' },
    ranghammat: { dauchung: 'Bình thường', ghichu: '' },
    mat: { 
      matphai: { dauchung: 'Bình thường' },
      mattrai: { dauchung: 'Bình thường' }
    },
  },
};

// ThongTinDieuTri
const thongTinDieuTri = {
  bacsidieutri: 'BS A',
  khoadieutri: 'Khám bệnh',
  khoavaovien: 'Cấp cứu',
  giuong: '102',
  ngaynhapkhoa: '15/09/2019 15:20:11',
  songaydieutri: 2,
  
  // Danh sách chuyển khoa
  danhsachchuyenkhoa: [
    { khoa: 'Khoa khám bệnh', tungay: '19/09/2019 15:20', denngay: '20/09/2019 15:20' },
    { khoa: 'Khoa khám bệnh', tungay: '21/09/2019 15:20', denngay: '22/09/2019 15:20' },
  ],
  
  // Danh sách sinh hiệu
  danhsachsinhhieu: [
    { thoidiem: '18/09/2019 15:20', mach: 80, nhietdo: 37.0, huyetap: '120/80', nhiptho: 20, cannang: 52 },
    { thoidiem: '19/09/2019 15:20', mach: 78, nhietdo: 36.8, huyetap: '118/78', nhiptho: 18, cannang: 52 },
  ],
  
  // Tình trạng ra viện
  tinhtrangravien: {
    ketquadieutri: 'Đỡ, giảm',
    loidanbacsi: 'Uống thuốc theo đơn, tái khám sau 1 tuần',
    ngayravien: '22/09/2019',
  },
};

// Tiền sử bệnh
const tienSuBenh = {
  banthan: [
    { noidung: 'Dị ứng', giatri: 'Có', ghichu: '2 năm' },
    { noidung: 'Ma túy', giatri: 'Không', ghichu: '' },
    { noidung: 'Tăng huyết áp', giatri: 'Có', ghichu: '5 năm, đang điều trị' },
    { noidung: 'Đái tháo đường', giatri: 'Không', ghichu: '' },
  ],
  giadinh: 'Bố mẹ có tiền sử tăng huyết áp',
  sanphukhoa: {
    tuoibatdaukinh: '14',
    chukykinhnguyet: '28',
    songaythaykinh: '5',
    luongkinh: 'Nhiều',
    daubungkinh: 'Có, trước kỳ kinh',
    laychongnam: '20',
  },
  sankhoa: {
    PARA: '2002',
    ghichu: '2 lần sinh thường, 0 lần sảy, 0 lần phá, 2 con sống',
  },
};

// Y lệnh thuốc vật tư
const yLenhThuocVatTu = [
  {
    sophieu: 'PH.129685',
    bacsichidinh: 'Kinh Văn Vũ',
    ngay: '31/12/2023',
    chandoansobo: 'Đau đầu; Rối loạn chức năng tiền đình',
    doituongbn: 'Viện phí',
    danhsach: [
      { tenthuoc: 'Methyl prednisolon (Solu-Medrol) 125mg', cachdung: 'Tiêm tĩnh mạch', soluong: 1, donvi: 'Lọ', nhom: 'Thuốc' },
      { tenthuoc: 'Bơm tiêm nhựa 5cc', cachdung: '', soluong: 1, donvi: 'Cái', nhom: 'VTYT' },
    ],
  },
  {
    sophieu: 'PH.129686',
    bacsichidinh: 'Kinh Văn Vũ',
    ngay: '31/12/2023',
    chandoansobo: 'Đau đầu; Rối loạn chức năng tiền đình',
    doituongbn: 'Viện phí',
    danhsach: [
      { tenthuoc: 'Amlodipin 5mg', cachdung: 'Uống sau ăn sáng', soluong: 30, donvi: 'Viên', nhom: 'Thuốc' },
      { tenthuoc: 'Omeprazol 20mg', cachdung: 'Uống trước ăn 30 phút', soluong: 14, donvi: 'Viên', nhom: 'Thuốc' },
    ],
  },
];

// Phiếu chỉ định
const phieuChiDinh = [
  {
    sophieu: '20.XNHH.055186',
    bacsichidinh: 'Kinh Văn Vũ',
    ngay: '12/07/2023',
    chandoansobo: 'Đau đầu; Rối loạn chức năng tiền đình; TD Đột quị',
    noichidinh: 'PK Cấp Cứu',
    khoadieutri: 'Khoa Nội thần kinh',
    mucdochidinh: 'Thường',
    tongcong: '80,800',
    danhsach: [
      { tenchidinh: 'Tổng phân tích tế bào máu ngoại vi (bằng máy đếm tổng trở)', loai: 'XN Huyết Học', soluong: 1, dongia: '40,400', thanhtien: '40,400', trangthai: 'Có kết quả' },
      { tenchidinh: 'Glucose máu', loai: 'XN Sinh hóa', soluong: 1, dongia: '25,000', thanhtien: '25,000', trangthai: 'Có kết quả' },
    ],
  },
  {
    sophieu: '20.CDHA.055187',
    bacsichidinh: 'Kinh Văn Vũ',
    ngay: '12/07/2023',
    chandoansobo: 'Đau bụng không xác định',
    noichidinh: 'PK Cấp Cứu',
    khoadieutri: 'Khoa Ngoại tổng hợp',
    mucdochidinh: 'Cấp cứu',
    tongcong: '250,000',
    danhsach: [
      { tenchidinh: 'Chụp X-quang bụng đứng', loai: 'CĐHA', soluong: 1, dongia: '80,000', thanhtien: '80,000', trangthai: 'Có kết quả' },
      { tenchidinh: 'Siêu âm bụng tổng quát', loai: 'CĐHA', soluong: 1, dongia: '170,000', thanhtien: '170,000', trangthai: 'Có kết quả' },
    ],
  },
];

// Kết quả xét nghiệm
const ketQuaXetNghiem = [
  {
    sophieu: '20.XQHH.054448',
    bacsichidinh: 'Lê Thanh Hiếu',
    nguoithuchien: 'Nguyễn Đăng Mạnh',
    ngayketqua: '31/12/2023 23:04',
    giolaymau: '31/12/2023 12:04',
    chandoan: 'Viêm hạch bạch huyết mạc treo không đặc hiệu',
    doituongbn: 'BHYT 1 (100%)',
    nhom: 'Tổng phân tích tế bào máu ngoại vi',
    danhsach: [
      { tenxetnghiem: 'Hồng cầu (RBC)', ketqua: '5.43', donvi: 'T/L', thamchieu: '4 - 5.8', batthuong: false },
      { tenxetnghiem: 'HGB (Hemoglobin)', ketqua: '86', donvi: 'g/L', thamchieu: '140 - 160', batthuong: true },
      { tenxetnghiem: 'Bạch cầu (WBC)', ketqua: '12.5', donvi: 'G/L', thamchieu: '4 - 10', batthuong: true },
      { tenxetnghiem: 'Tiểu cầu (PLT)', ketqua: '250', donvi: 'G/L', thamchieu: '150 - 400', batthuong: false },
      { tenxetnghiem: 'Hematocrit (HCT)', ketqua: '38', donvi: '%', thamchieu: '36 - 48', batthuong: false },
    ],
  },
  {
    sophieu: '20.XQSH.054449',
    bacsichidinh: 'Lê Thanh Hiếu',
    nguoithuchien: 'Trần Văn Minh',
    ngayketqua: '31/12/2023 23:30',
    giolaymau: '31/12/2023 12:04',
    chandoan: 'Viêm hạch bạch huyết mạc treo không đặc hiệu',
    doituongbn: 'BHYT 1 (100%)',
    nhom: 'Sinh hóa máu',
    danhsach: [
      { tenxetnghiem: 'Glucose', ketqua: '5.8', donvi: 'mmol/L', thamchieu: '3.9 - 6.4', batthuong: false },
      { tenxetnghiem: 'Creatinin', ketqua: '85', donvi: 'µmol/L', thamchieu: '62 - 106', batthuong: false },
      { tenxetnghiem: 'AST (SGOT)', ketqua: '45', donvi: 'U/L', thamchieu: '< 40', batthuong: true },
      { tenxetnghiem: 'ALT (SGPT)', ketqua: '38', donvi: 'U/L', thamchieu: '< 41', batthuong: false },
    ],
  },
];

// Kết quả CĐHA
const ketQuaCDHA = [
  {
    sophieu: '20.XNHH.054448',
    bacsichidinh: 'Lương Văn Nghĩa',
    bacsithuchien: 'Hồ Văn Hảo',
    ngayketqua: '31/12/2023 23:04',
    chandoan: 'Viêm dạ dày-ruột và viêm đại tràng khác không rõ nguyên nhân',
    loai: 'X-Quang',
    tenchidinh: 'X-Quang bụng đứng',
    mota: 'Chụp X-quang bụng đứng 1 phim',
    ketluan: '- Không thấy hơi tự do ổ bụng.\n- Không thấy mức hơi dịch bất thường.',
    denghi: 'Theo dõi thêm',
    linkpacs: 'http://abc.vn/clinicalstudio/integration/viewer?m',
    hinhanh: ['/images/xray-1.jpg', '/images/xray-2.jpg'],
  },
  {
    sophieu: '20.XNHH.054449',
    bacsichidinh: 'Lương Văn Nghĩa',
    bacsithuchien: 'Hồ Văn Hảo',
    ngayketqua: '31/12/2023 20:04',
    chandoan: 'Viêm dạ dày-ruột và viêm đại tràng khác không rõ nguyên nhân',
    loai: 'Siêu âm',
    tenchidinh: 'Siêu âm bụng tổng quát',
    mota: 'Siêu âm bụng tổng quát',
    ketluan: '- Gan, lách, thận bình thường.\n- Không thấy dịch ổ bụng.\n- Ruột thừa không viêm.',
    denghi: '',
    linkpacs: 'http://abc.vn/clinicalstudio/integration/viewer?m2',
    hinhanh: [],
  },
];

// Cảnh báo tương tác thuốc
const drugInteractions = [
  {
    level: 'high',
    title: 'CẢNH BÁO ĐỎ (MỨC ĐỘ 1)',
    drugs: 'Amlodipin + Nước bưởi chùm',
    description: 'Làm tăng nồng độ thuốc trong máu, nguy cơ hạ huyết áp quá mức.',
  },
  {
    level: 'medium',
    title: 'CẢNH BÁO VÀNG (MỨC ĐỘ 2)',
    drugs: 'Dị ứng Penicillin',
    description: 'Bệnh nhân có tiền sử dị ứng chéo với một số nhóm Cephalosporin thế hệ 1.',
  },
];

type TabType = 'kham-dieu-tri' | 'tien-su-benh' | 'chi-dinh-cls' | 'chi-dinh-ke-don' | 'ket-qua-lis-pacs';
type SideMenuType = 'ho-so' | 'lich-hen' | 'xet-nghiem' | 'cdha' | 'y-lenh';

// State management for created CLS orders
let createdPhieuChiDinh: typeof phieuChiDinh = [];

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('kham-dieu-tri');
  const [activeSideMenu, setActiveSideMenu] = useState<SideMenuType>('ho-so');
  const [expandedSections, setExpandedSections] = useState<string[]>(['vitals', 'exam-general', 'diagnosis']);
  const [selectedPhieu, setSelectedPhieu] = useState<string | null>(null);
  
  // Modal states
  const [showToKhamModal, setShowToKhamModal] = useState(false);
  const [showHoanTatKhamModal, setShowHoanTatKhamModal] = useState(false);
  const [showHoanTatSuccessModal, setShowHoanTatSuccessModal] = useState(false);

  const patient = mockPatientDetail;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const sideMenuItems = [
    { id: 'ho-so', label: 'Hồ sơ bệnh nhân', icon: UserCircleIcon },
    { id: 'lich-hen', label: 'Lịch hẹn', icon: CalendarDaysIcon },
    { id: 'xet-nghiem', label: 'Xét nghiệm (LIS)', icon: BeakerIcon },
    { id: 'cdha', label: 'CĐHA (PACS)', icon: PhotoIcon },
    { id: 'y-lenh', label: 'Y lệnh gần đây', icon: ClipboardDocumentListIcon, subItems: ['Đơn thuốc ngoại trú - 12/10', 'Xét nghiệm máu - 11/10'] },
  ];

  const tabs = [
    { id: 'kham-dieu-tri', label: 'Khám & Điều trị' },
    { id: 'tien-su-benh', label: 'Tiền sử bệnh' },
    { id: 'chi-dinh-ke-don', label: 'Chỉ định & Kê đơn' },
    { id: 'chi-dinh-cls', label: 'Chỉ định CLS' },
    { id: 'ket-qua-lis-pacs', label: 'Kết quả LIS/PACS' },
  ];

  // Render Tab Content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'kham-dieu-tri':
        return <KhamDieuTriTab />;
      case 'tien-su-benh':
        return <TienSuBenhTab />;
      case 'chi-dinh-ke-don':
        return <ChiDinhKeDonTab patientInfo={patient} />;
      case 'chi-dinh-cls':
        return <ChiDinhCLSTab />;
      case 'ket-qua-lis-pacs':
        return <KetQuaLISPACSTab />;
      default:
        return null;
    }
  };

  const handleHoanTatKham = () => {
    setShowHoanTatKhamModal(false);
    setShowHoanTatSuccessModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#0f1419]">
      <Sidebar />

      {/* Tờ khám Modal */}
      <ToKhamModal 
        isOpen={showToKhamModal} 
        onClose={() => setShowToKhamModal(false)}
        patientInfo={patient}
      />

      {/* Hoàn tất khám Confirmation Modal */}
      <HoanTatKhamModal
        isOpen={showHoanTatKhamModal}
        onClose={() => setShowHoanTatKhamModal(false)}
        onConfirm={handleHoanTatKham}
        patientInfo={patient}
      />

      {/* Hoàn tất khám Success Modal */}
      <HoanTatKhamSuccessModal
        isOpen={showHoanTatSuccessModal}
        onClose={() => setShowHoanTatSuccessModal(false)}
        patientInfo={patient}
      />

      {/* Patient Side Menu */}
      <div className="w-56 bg-[#1a1f2e] border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Link 
            href="/benh-nhan"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Quay lại danh sách</span>
          </Link>
        </div>

        <nav className="flex-1 p-2">
          {sideMenuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => setActiveSideMenu(item.id as SideMenuType)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeSideMenu === item.id
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
              {item.subItems && activeSideMenu === item.id && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Patient Header */}
        <div className="bg-[#1a1f2e] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Patient Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">TB</span>
              </div>

              {/* Patient Info */}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-white">{patient.hoten}</h1>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
                    {patient.doituongbn_loai}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  Mã BN: {patient.mabenhnhan} | {patient.tuoi} tuổi - {patient.gioitinh} | {patient.dantoc} | Địa chỉ: {patient.diachi}
                </p>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 ml-4">
                {patient.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 text-xs rounded-full border ${
                      tag.type === 'diung' 
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}
                  >
                    {tag.type === 'diung' ? '🔴' : '⚠️'} {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowToKhamModal(true)}
                className="px-4 py-2 bg-[#0f1419] border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <DocumentTextIcon className="w-4 h-4" />
                <span>Tờ khám</span>
              </button>
              <button 
                onClick={() => setShowHoanTatKhamModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center gap-2"
              >
                <CheckCircleIcon className="w-4 h-4" />
                <span>Hoàn tất khám</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#0f1419] text-cyan-400 border-t border-l border-r border-gray-700'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {renderTabContent()}
        </div>

        {/* Status Bar */}
        <div className="bg-[#1a1f2e] border-t border-gray-700 px-6 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Hệ thống Online
            </span>
            <span className="text-gray-400">PACS Connection: OK</span>
            <span className="text-gray-400">LIS Sync: 2 phút trước</span>
          </div>
          <div className="text-gray-400">
            Phiên bản 3.4.2 - Phòng khám Victoria Healthcare
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MODAL COMPONENTS ====================

// Modal: Tờ khám
function ToKhamModal({ isOpen, onClose, patientInfo }: { isOpen: boolean; onClose: () => void; patientInfo: typeof mockPatientDetail }) {
  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Tờ khám bệnh</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
              <PrinterIcon className="w-4 h-4" />
              <span>In tờ khám</span>
            </button>
            <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2">
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>Xuất PDF</span>
            </button>
            <button onClick={onClose} className="text-white/80 hover:text-white ml-2">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            {/* Hospital Header */}
            <div className="text-center mb-6 border-b pb-4">
              <h1 className="text-xl font-bold text-gray-800">PHÒNG KHÁM VICTORIA HEALTHCARE</h1>
              <p className="text-gray-600 text-sm">Địa chỉ: Tầng 3, Tòa nhà Vincom Center, Đường Lê Thánh Tôn, TP.HCM - ĐT: 028.3822.3456</p>
              <h2 className="text-lg font-bold text-cyan-600 mt-4">TỜ KHÁM BỆNH</h2>
              <p className="text-gray-500 text-sm">Ngày khám: {currentDate}</p>
            </div>

            {/* Patient Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <UserCircleIcon className="w-5 h-5 text-cyan-600" />
                I. THÔNG TIN BỆNH NHÂN
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Họ và tên:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.hoten}</span>
                </div>
                <div>
                  <span className="text-gray-500">Mã BN:</span>
                  <span className="font-medium text-cyan-600 ml-2">{patientInfo.mabenhnhan}</span>
                </div>
                <div>
                  <span className="text-gray-500">Giới tính:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.gioitinh}</span>
                </div>
                <div>
                  <span className="text-gray-500">Tuổi:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.tuoi} tuổi</span>
                </div>
                <div>
                  <span className="text-gray-500">Ngày sinh:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.ngaysinh}</span>
                </div>
                <div>
                  <span className="text-gray-500">CCCD:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.cccd_so}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Địa chỉ:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.diachi}</span>
                </div>
                <div>
                  <span className="text-gray-500">Số BHYT:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.mabhyt}</span>
                </div>
                <div>
                  <span className="text-gray-500">Điện thoại:</span>
                  <span className="font-medium text-gray-800 ml-2">{patientInfo.sodienthoai}</span>
                </div>
              </div>
            </div>

            {/* Visit Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-5 h-5 text-cyan-600" />
                II. THÔNG TIN KHÁM BỆNH
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Lý do vào viện:</span>
                  <span className="font-medium text-gray-800 ml-2">{thongTinVaoVien.lydovaovien}</span>
                </div>
                <div>
                  <span className="text-gray-500">Quá trình bệnh lý:</span>
                  <p className="font-medium text-gray-800 mt-1 bg-white p-2 rounded border">{thongTinVaoVien.quatrinhbenhly}</p>
                </div>
                <div>
                  <span className="text-gray-500">Phòng khám:</span>
                  <span className="font-medium text-gray-800 ml-2">{thongTinVaoVien.phongkham}</span>
                </div>
                <div>
                  <span className="text-gray-500">Bác sĩ khám:</span>
                  <span className="font-medium text-gray-800 ml-2">{thongTinVaoVien.bacsikhambenh}</span>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-red-500" />
                III. DẤU HIỆU SINH TỒN
              </h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Mạch</p>
                  <p className="text-2xl font-bold text-cyan-600">{thongTinVaoVien.mach}</p>
                  <p className="text-gray-400 text-xs">lần/phút</p>
                </div>
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Nhiệt độ</p>
                  <p className="text-2xl font-bold text-orange-500">{thongTinVaoVien.nhietdo}</p>
                  <p className="text-gray-400 text-xs">°C</p>
                </div>
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Huyết áp</p>
                  <p className="text-2xl font-bold text-red-500">{thongTinVaoVien.huyetap_tamthu}/{thongTinVaoVien.huyetap_tamtruong}</p>
                  <p className="text-gray-400 text-xs">mmHg</p>
                </div>
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Nhịp thở</p>
                  <p className="text-2xl font-bold text-blue-500">{thongTinVaoVien.nhiptho}</p>
                  <p className="text-gray-400 text-xs">lần/phút</p>
                </div>
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Cân nặng</p>
                  <p className="text-2xl font-bold text-green-600">{thongTinVaoVien.cannang}</p>
                  <p className="text-gray-400 text-xs">kg</p>
                </div>
                <div className="bg-white p-3 rounded-lg border text-center">
                  <p className="text-gray-500 text-xs">Chiều cao</p>
                  <p className="text-2xl font-bold text-purple-500">{thongTinVaoVien.chieucao}</p>
                  <p className="text-gray-400 text-xs">cm</p>
                </div>
              </div>
            </div>

            {/* Physical Examination */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <EyeIcon className="w-5 h-5 text-cyan-600" />
                IV. KHÁM LÂM SÀNG
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Toàn thân:</span>
                  <p className="font-medium text-gray-800 mt-1 bg-white p-2 rounded border">{thongTinVaoVien.khambenh_toanthan}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-500">Tuần hoàn:</span>
                    <p className="font-medium text-gray-800 mt-1 bg-white p-2 rounded border text-xs">{thongTinVaoVien.khambenh_caccoquan.tuanhoan.dauchung}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Hô hấp:</span>
                    <p className="font-medium text-gray-800 mt-1 bg-white p-2 rounded border text-xs">{thongTinVaoVien.khambenh_caccoquan.hohap.dauchung}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Tiêu hóa:</span>
                  <div className="bg-white p-2 rounded border mt-1">
                    {thongTinVaoVien.khambenh_caccoquan.tieuhoa.map((item, idx) => (
                      <p key={idx} className="text-gray-800 text-xs">• {item.dauchung} {item.ghichu && `(${item.ghichu})`}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <DocumentTextIcon className="w-5 h-5 text-cyan-600" />
                V. CHẨN ĐOÁN
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Chẩn đoán sơ bộ:</span>
                  <p className="font-bold text-cyan-700 mt-1">{thongTinVaoVien.chandoansobo}</p>
                </div>
                <div>
                  <span className="text-gray-500">Mã ICD:</span>
                  <span className="font-medium text-gray-800 ml-2 bg-cyan-100 px-2 py-0.5 rounded">{thongTinVaoVien.khambenh_chandoanvaovienmaicd}</span>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="grid grid-cols-2 gap-8 mt-8 pt-4 border-t">
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-16">Bệnh nhân</p>
                <p className="font-medium text-gray-800">{patientInfo.hoten}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-16">Bác sĩ khám bệnh</p>
                <p className="font-medium text-gray-800">{thongTinVaoVien.bacsikhambenh}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal: Xác nhận hoàn tất khám
function HoanTatKhamModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  patientInfo 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  patientInfo: typeof mockPatientDetail 
}) {
  const [ketQuaDieuTri, setKetQuaDieuTri] = useState('Đỡ, giảm');
  const [loiDan, setLoiDan] = useState('Uống thuốc theo đơn, tái khám sau 1 tuần nếu có triệu chứng bất thường.');
  const [ngayTaiKham, setNgayTaiKham] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Hoàn tất khám bệnh</h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Patient Summary */}
          <div className="bg-[#0f1419] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">TB</span>
              </div>
              <div>
                <h3 className="text-white font-medium">{patientInfo.hoten}</h3>
                <p className="text-gray-400 text-sm">{patientInfo.mabenhnhan} | {patientInfo.tuoi} tuổi - {patientInfo.gioitinh}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-gray-400 text-xs">Chẩn đoán</p>
                <p className="text-cyan-400 font-medium">{thongTinVaoVien.chandoansobo}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Kết quả điều trị <span className="text-red-400">*</span></label>
              <select
                value={ketQuaDieuTri}
                onChange={(e) => setKetQuaDieuTri(e.target.value)}
                className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              >
                <option value="Đỡ, giảm">Đỡ, giảm</option>
                <option value="Khỏi">Khỏi</option>
                <option value="Không thay đổi">Không thay đổi</option>
                <option value="Nặng hơn">Nặng hơn</option>
                <option value="Chuyển viện">Chuyển viện</option>
                <option value="Nhập viện">Nhập viện điều trị nội trú</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Lời dặn bác sĩ</label>
              <textarea
                value={loiDan}
                onChange={(e) => setLoiDan(e.target.value)}
                rows={3}
                className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                placeholder="Nhập lời dặn cho bệnh nhân..."
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Ngày tái khám</label>
              <input
                type="date"
                value={ngayTaiKham}
                onChange={(e) => setNgayTaiKham(e.target.value)}
                className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {/* Checklist */}
            <div className="bg-[#0f1419] rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Checklist hoàn tất</h4>
              <div className="space-y-2">
                {[
                  { label: 'Đã nhập đầy đủ sinh hiệu', checked: true },
                  { label: 'Đã ghi nhận kết quả khám', checked: true },
                  { label: 'Đã có chẩn đoán xác định', checked: true },
                  { label: 'Đã kê đơn thuốc (nếu có)', checked: true },
                  { label: 'Đã chỉ định cận lâm sàng (nếu có)', checked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircleSolidIcon className={`w-5 h-5 ${item.checked ? 'text-green-400' : 'text-gray-600'}`} />
                    <span className={item.checked ? 'text-gray-300' : 'text-gray-500'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0f1419] border-t border-gray-700 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors flex items-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Xác nhận hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal: Hoàn tất khám thành công
function HoanTatKhamSuccessModal({ 
  isOpen, 
  onClose, 
  patientInfo 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  patientInfo: typeof mockPatientDetail 
}) {
  const router = useRouter();
  
  if (!isOpen) return null;

  const handleViewList = () => {
    onClose();
    router.push('/benh-nhan');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] rounded-2xl w-full max-w-md overflow-hidden text-center">
        {/* Success Animation */}
        <div className="pt-8 pb-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-bounce">
            <CheckCircleSolidIcon className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Hoàn tất khám thành công!</h2>
          <p className="text-gray-400 mb-6">
            Đã hoàn tất khám cho bệnh nhân <span className="text-cyan-400 font-medium">{patientInfo.hoten}</span>
          </p>

          {/* Summary Card */}
          <div className="bg-[#0f1419] rounded-xl p-4 mb-6 text-left">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Mã bệnh nhân</p>
                <p className="text-cyan-400 font-medium">{patientInfo.mabenhnhan}</p>
              </div>
              <div>
                <p className="text-gray-500">Số phiếu</p>
                <p className="text-white font-medium">{thongTinVaoVien.sophieu}</p>
              </div>
              <div>
                <p className="text-gray-500">Chẩn đoán</p>
                <p className="text-white font-medium">{thongTinVaoVien.chandoansobo}</p>
              </div>
              <div>
                <p className="text-gray-500">Kết quả</p>
                <p className="text-green-400 font-medium">Đỡ, giảm</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-[#0f1419] border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={handleViewList}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
            >
              Về danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TAB COMPONENTS ====================

// Tab 1: Khám & Điều trị
function KhamDieuTriTab() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['vitals', 'exam-general', 'diagnosis', 'prescription']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Panel - Vitals & Timeline */}
      <div className="w-72 bg-[#0f1419] p-4 overflow-y-auto border-r border-gray-700/50">
        {/* Sinh hiệu nhập viện */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">CHỈ SỐ SINH TỒN</h3>
            <span className="text-xs text-gray-500">{thongTinVaoVien.denkhambenhluc}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Huyết áp</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.huyetap_tamthu}/{thongTinVaoVien.huyetap_tamtruong} <span className="text-xs text-gray-400">mmHg</span></p>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Mạch</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.mach} <span className="text-xs text-gray-400">bpm</span></p>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Nhiệt độ</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.nhietdo} <span className="text-xs text-gray-400">°C</span></p>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Nhịp thở</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.nhiptho} <span className="text-xs text-gray-400">l/p</span></p>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Cân nặng</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.cannang} <span className="text-xs text-gray-400">kg</span></p>
            </div>
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">Chiều cao</p>
              <p className="text-white text-lg font-bold">{thongTinVaoVien.chieucao} <span className="text-xs text-gray-400">cm</span></p>
            </div>
          </div>
        </div>

        {/* Lịch sử sinh hiệu */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">LỊCH SỬ SINH HIỆU</h3>
          <div className="space-y-2">
            {thongTinDieuTri.danhsachsinhhieu.map((sh, idx) => (
              <div key={idx} className="bg-[#1a1f2e] rounded-lg p-3 text-xs">
                <p className="text-cyan-400 mb-2">{sh.thoidiem}</p>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  <span>HA: {sh.huyetap}</span>
                  <span>Mạch: {sh.mach}</span>
                  <span>T°: {sh.nhietdo}</span>
                  <span>NT: {sh.nhiptho}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline điều trị */}
        <div>
          <h3 className="text-white font-medium mb-3">QUÁ TRÌNH ĐIỀU TRỊ</h3>
          <div className="space-y-3">
            {thongTinDieuTri.danhsachchuyenkhoa.map((ck, idx) => (
              <div key={idx} className="bg-[#1a1f2e] rounded-lg p-3 border-l-2 border-cyan-500">
                <p className="text-white text-sm font-medium">{ck.khoa}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {ck.tungay} → {ck.denngay}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel - Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Thông tin khám */}
        <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DocumentTextIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-medium">Thông tin khám bệnh</h3>
            </div>
            <div className="text-sm text-gray-400">
              Số phiếu: <span className="text-cyan-400">{thongTinVaoVien.sophieu}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-xs">Số vào viện</label>
              <p className="text-white">{thongTinVaoVien.sovaovien}</p>
            </div>
            <div>
              <label className="text-gray-400 text-xs">Phòng khám</label>
              <p className="text-white">{thongTinVaoVien.phongkham}</p>
            </div>
            <div>
              <label className="text-gray-400 text-xs">Bác sĩ khám</label>
              <p className="text-white">{thongTinVaoVien.bacsikhambenh}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs">LÝ DO VÀO VIỆN</label>
              <div className="mt-1 p-3 bg-[#0f1419] rounded-lg text-white">{thongTinVaoVien.lydovaovien}</div>
            </div>
            <div>
              <label className="text-gray-400 text-xs">QUÁ TRÌNH BỆNH LÝ</label>
              <div className="mt-1 p-3 bg-[#0f1419] rounded-lg text-white">{thongTinVaoVien.quatrinhbenhly}</div>
            </div>
          </div>
        </div>

        {/* Khám toàn thân */}
        <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
          <button 
            onClick={() => toggleSection('exam-general')}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-medium">Khám lâm sàng</h3>
            </div>
            <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${expandedSections.includes('exam-general') ? 'rotate-180' : ''}`} />
          </button>

          {expandedSections.includes('exam-general') && (
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs">KHÁM TOÀN THÂN</label>
                <div className="mt-1 p-3 bg-[#0f1419] rounded-lg text-white">{thongTinVaoVien.khambenh_toanthan}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Tuần hoàn</p>
                  <p className="text-white text-sm">{thongTinVaoVien.khambenh_caccoquan.tuanhoan.dauchung}</p>
                  {thongTinVaoVien.khambenh_caccoquan.tuanhoan.ghichu && (
                    <p className="text-gray-400 text-xs mt-1">Ghi chú: {thongTinVaoVien.khambenh_caccoquan.tuanhoan.ghichu}</p>
                  )}
                </div>
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Hô hấp</p>
                  <p className="text-white text-sm">{thongTinVaoVien.khambenh_caccoquan.hohap.dauchung}</p>
                  {thongTinVaoVien.khambenh_caccoquan.hohap.ghichu && (
                    <p className="text-gray-400 text-xs mt-1">Ghi chú: {thongTinVaoVien.khambenh_caccoquan.hohap.ghichu}</p>
                  )}
                </div>
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Tiêu hóa</p>
                  {thongTinVaoVien.khambenh_caccoquan.tieuhoa.map((th, idx) => (
                    <div key={idx} className="mb-2">
                      <p className="text-white text-sm">{th.dauchung}</p>
                      {th.ghichu && <p className="text-gray-400 text-xs">Ghi chú: {th.ghichu}</p>}
                    </div>
                  ))}
                </div>
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Thận - Tiết niệu</p>
                  <p className="text-white text-sm">{thongTinVaoVien.khambenh_caccoquan.thantietnieu.dauchung}</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Thần kinh</p>
                  <p className="text-white text-sm">{thongTinVaoVien.khambenh_caccoquan.thankinh.dauchung}</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-3">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Cơ - Xương - Khớp</p>
                  <p className="text-white text-sm">{thongTinVaoVien.khambenh_caccoquan.coxuongkhop.dauchung}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chẩn đoán */}
        <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardDocumentListIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-medium">Chẩn đoán</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 bg-[#0f1419] rounded-lg">
              <div className="flex-1">
                <label className="text-gray-400 text-xs">CHẨN ĐOÁN SƠ BỘ</label>
                <p className="text-white mt-1">{thongTinVaoVien.chandoansobo}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <div className="flex-1">
                <label className="text-cyan-400 text-xs font-medium">CHẨN ĐOÁN VÀO VIỆN</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded">{thongTinVaoVien.khambenh_chandoanvaovienmaicd}</span>
                  <p className="text-white">{thongTinVaoVien.chandoanvaovien}</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-[#0f1419] rounded-lg">
              <label className="text-gray-400 text-xs">ĐIỀU TRỊ TẠI KHOA</label>
              <p className="text-white mt-1">{thongTinVaoVien.dieutritaikhoa}</p>
            </div>
          </div>
        </div>

        {/* Y lệnh thuốc */}
        <div className="bg-[#1a1f2e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BeakerIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-medium">Y lệnh thuốc & Vật tư</h3>
            </div>
            <button className="text-cyan-400 text-sm hover:text-cyan-300">+ Thêm y lệnh</button>
          </div>

          <div className="space-y-4">
            {yLenhThuocVatTu.map((yl, idx) => (
              <div key={idx} className="bg-[#0f1419] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-cyan-400 font-medium">{yl.sophieu}</span>
                    <span className="text-gray-400 text-sm ml-3">{yl.ngay}</span>
                  </div>
                  <span className="text-gray-400 text-sm">BS: {yl.bacsichidinh}</span>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-700">
                      <th className="text-left py-2">Tên thuốc/Vật tư</th>
                      <th className="text-left py-2">Cách dùng</th>
                      <th className="text-center py-2">SL</th>
                      <th className="text-left py-2">Nhóm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yl.danhsach.map((item, i) => (
                      <tr key={i} className="border-b border-gray-700/50">
                        <td className="py-2 text-white">{item.tenthuoc}</td>
                        <td className="py-2 text-gray-300">{item.cachdung || '-'}</td>
                        <td className="py-2 text-center text-white">{item.soluong} {item.donvi}</td>
                        <td className="py-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${item.nhom === 'Thuốc' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                            {item.nhom}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Warnings & Summary */}
      <div className="w-72 bg-[#0f1419] p-4 overflow-y-auto border-l border-gray-700/50">
        {/* Drug Interaction Warnings */}
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Cảnh báo tương tác thuốc</h3>
          <div className="space-y-3">
            {drugInteractions.map((warning, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-3 border-l-4 ${
                  warning.level === 'high'
                    ? 'bg-red-500/10 border-red-500'
                    : 'bg-yellow-500/10 border-yellow-500'
                }`}
              >
                <p className={`text-xs font-bold mb-1 ${
                  warning.level === 'high' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {warning.title}
                </p>
                <p className="text-white text-sm font-medium mb-1">{warning.drugs}</p>
                <p className="text-gray-400 text-xs">{warning.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tình trạng ra viện */}
        <div className="bg-[#1a1f2e] rounded-xl p-4 mb-4">
          <h3 className="text-white font-medium mb-3">TÌNH TRẠNG ĐIỀU TRỊ</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-400">BS điều trị:</span>
              <span className="text-white ml-2">{thongTinDieuTri.bacsidieutri}</span>
            </div>
            <div>
              <span className="text-gray-400">Khoa:</span>
              <span className="text-white ml-2">{thongTinDieuTri.khoadieutri}</span>
            </div>
            <div>
              <span className="text-gray-400">Giường:</span>
              <span className="text-white ml-2">{thongTinDieuTri.giuong}</span>
            </div>
            <div>
              <span className="text-gray-400">Số ngày:</span>
              <span className="text-white ml-2">{thongTinDieuTri.songaydieutri} ngày</span>
            </div>
          </div>
        </div>

        {/* Lời dặn bác sĩ */}
        <div className="bg-[#1a1f2e] rounded-xl p-4">
          <h3 className="text-white font-medium mb-3">LỜI DẶN BÁC SĨ</h3>
          <p className="text-gray-300 text-sm">{thongTinDieuTri.tinhtrangravien.loidanbacsi}</p>
        </div>

        {/* Submit Button */}
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors">
          Gửi duyệt BHYT
        </button>
      </div>
    </div>
  );
}

// Tab 2: Tiền sử bệnh
function TienSuBenhTab() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Tiền sử bản thân */}
        <div className="bg-[#1a1f2e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <UserCircleIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-medium">Tiền sử bệnh tật của bản thân</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {tienSuBenh.banthan.map((ts, idx) => (
              <div key={idx} className="bg-[#0f1419] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{ts.noidung}</p>
                  {ts.ghichu && <p className="text-gray-400 text-sm mt-1">{ts.ghichu}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  ts.giatri === 'Có' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {ts.giatri}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tiền sử gia đình */}
        <div className="bg-[#1a1f2e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <UserCircleIcon className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-medium">Tiền sử bệnh tật của gia đình</h3>
          </div>
          <div className="bg-[#0f1419] rounded-lg p-4">
            <p className="text-white">{tienSuBenh.giadinh || 'Chưa ghi nhận'}</p>
          </div>
        </div>

        {/* Tiền sử sản phụ khoa (hiển thị nếu là nữ) */}
        {mockPatientDetail.gioitinh === 'Nữ' && (
          <>
            <div className="bg-[#1a1f2e] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <HeartIcon className="w-5 h-5 text-pink-400" />
                <h3 className="text-white font-medium">Tiền sử sản phụ khoa</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Tuổi bắt đầu kinh</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.tuoibatdaukinh || '-'} tuổi</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Chu kỳ kinh nguyệt</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.chukykinhnguyet} ngày</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Số ngày thấy kinh</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.songaythaykinh} ngày</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Lượng kinh</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.luongkinh}</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Đau bụng kinh</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.daubungkinh}</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Lấy chồng năm</p>
                  <p className="text-white font-medium">{tienSuBenh.sanphukhoa.laychongnam} tuổi</p>
                </div>
              </div>
            </div>

            {/* Tiền sử sản khoa */}
            <div className="bg-[#1a1f2e] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <HeartIcon className="w-5 h-5 text-pink-400" />
                <h3 className="text-white font-medium">Tiền sử sản khoa</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Chỉ số PARA</p>
                  <p className="text-white text-2xl font-bold text-cyan-400">{tienSuBenh.sankhoa.PARA}</p>
                </div>
                <div className="bg-[#0f1419] rounded-lg p-4">
                  <p className="text-gray-400 text-xs mb-1">Ghi chú</p>
                  <p className="text-white">{tienSuBenh.sankhoa.ghichu}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Danh mục dịch vụ CLS mẫu
const danhMucDichVuCLS = {
  xetNghiem: {
    huyetHoc: [
      { ma: 'XN001', ten: 'Tổng phân tích tế bào máu ngoại vi (bằng máy đếm tổng trở)', dongia: 40400 },
      { ma: 'XN002', ten: 'Tốc độ máu lắng', dongia: 25000 },
      { ma: 'XN003', ten: 'Nhóm máu ABO và Rh(D)', dongia: 35000 },
      { ma: 'XN004', ten: 'Thời gian máu chảy, máu đông', dongia: 30000 },
      { ma: 'XN005', ten: 'PT (Prothrombin Time)', dongia: 55000 },
      { ma: 'XN006', ten: 'APTT', dongia: 55000 },
      { ma: 'XN007', ten: 'Fibrinogen', dongia: 65000 },
      { ma: 'XN008', ten: 'D-Dimer', dongia: 180000 },
    ],
    sinhHoa: [
      { ma: 'SH001', ten: 'Glucose máu', dongia: 25000 },
      { ma: 'SH002', ten: 'HbA1c', dongia: 120000 },
      { ma: 'SH003', ten: 'Ure máu', dongia: 25000 },
      { ma: 'SH004', ten: 'Creatinin máu', dongia: 30000 },
      { ma: 'SH005', ten: 'AST (SGOT)', dongia: 30000 },
      { ma: 'SH006', ten: 'ALT (SGPT)', dongia: 30000 },
      { ma: 'SH007', ten: 'GGT', dongia: 35000 },
      { ma: 'SH008', ten: 'Bilirubin toàn phần', dongia: 30000 },
      { ma: 'SH009', ten: 'Bilirubin trực tiếp', dongia: 30000 },
      { ma: 'SH010', ten: 'Protein toàn phần', dongia: 30000 },
      { ma: 'SH011', ten: 'Albumin', dongia: 35000 },
      { ma: 'SH012', ten: 'Cholesterol toàn phần', dongia: 30000 },
      { ma: 'SH013', ten: 'Triglyceride', dongia: 35000 },
      { ma: 'SH014', ten: 'HDL-Cholesterol', dongia: 40000 },
      { ma: 'SH015', ten: 'LDL-Cholesterol', dongia: 40000 },
      { ma: 'SH016', ten: 'Acid Uric', dongia: 30000 },
      { ma: 'SH017', ten: 'CRP (C-Reactive Protein)', dongia: 65000 },
      { ma: 'SH018', ten: 'Procalcitonin', dongia: 350000 },
    ],
    nuocTieu: [
      { ma: 'NT001', ten: 'Tổng phân tích nước tiểu (10 thông số)', dongia: 35000 },
      { ma: 'NT002', ten: 'Cặn lắng nước tiểu', dongia: 25000 },
      { ma: 'NT003', ten: 'Protein niệu 24h', dongia: 45000 },
      { ma: 'NT004', ten: 'Microalbumin niệu', dongia: 85000 },
    ],
    viSinh: [
      { ma: 'VS001', ten: 'Cấy máu', dongia: 150000 },
      { ma: 'VS002', ten: 'Cấy nước tiểu', dongia: 100000 },
      { ma: 'VS003', ten: 'Cấy phân', dongia: 100000 },
      { ma: 'VS004', ten: 'Nhuộm Gram', dongia: 35000 },
      { ma: 'VS005', ten: 'AFB (trực tiếp)', dongia: 40000 },
    ],
    mienDich: [
      { ma: 'MD001', ten: 'HBsAg (Viêm gan B)', dongia: 80000 },
      { ma: 'MD002', ten: 'Anti-HBs', dongia: 85000 },
      { ma: 'MD003', ten: 'Anti-HCV', dongia: 100000 },
      { ma: 'MD004', ten: 'Anti-HIV', dongia: 80000 },
      { ma: 'MD005', ten: 'PSA toàn phần', dongia: 150000 },
      { ma: 'MD006', ten: 'Free PSA', dongia: 180000 },
      { ma: 'MD007', ten: 'AFP', dongia: 120000 },
      { ma: 'MD008', ten: 'CEA', dongia: 120000 },
      { ma: 'MD009', ten: 'CA 125', dongia: 180000 },
      { ma: 'MD010', ten: 'CA 19-9', dongia: 180000 },
      { ma: 'MD011', ten: 'TSH', dongia: 100000 },
      { ma: 'MD012', ten: 'FT4', dongia: 100000 },
      { ma: 'MD013', ten: 'FT3', dongia: 100000 },
      { ma: 'MD014', ten: 'Troponin I', dongia: 200000 },
      { ma: 'MD015', ten: 'NT-proBNP', dongia: 450000 },
    ],
  },
  chanDoanHinhAnh: {
    xQuang: [
      { ma: 'XQ001', ten: 'X-Quang ngực thẳng', dongia: 60000 },
      { ma: 'XQ002', ten: 'X-Quang ngực nghiêng', dongia: 60000 },
      { ma: 'XQ003', ten: 'X-Quang bụng đứng', dongia: 80000 },
      { ma: 'XQ004', ten: 'X-Quang bụng nằm', dongia: 80000 },
      { ma: 'XQ005', ten: 'X-Quang cột sống cổ', dongia: 100000 },
      { ma: 'XQ006', ten: 'X-Quang cột sống thắt lưng', dongia: 120000 },
      { ma: 'XQ007', ten: 'X-Quang khớp gối', dongia: 80000 },
      { ma: 'XQ008', ten: 'X-Quang khớp háng', dongia: 100000 },
      { ma: 'XQ009', ten: 'X-Quang xương chậu', dongia: 100000 },
      { ma: 'XQ010', ten: 'X-Quang sọ', dongia: 80000 },
    ],
    sieuAm: [
      { ma: 'SA001', ten: 'Siêu âm bụng tổng quát', dongia: 170000 },
      { ma: 'SA002', ten: 'Siêu âm gan mật', dongia: 120000 },
      { ma: 'SA003', ten: 'Siêu âm thận-tiết niệu', dongia: 120000 },
      { ma: 'SA004', ten: 'Siêu âm tuyến giáp', dongia: 150000 },
      { ma: 'SA005', ten: 'Siêu âm tim', dongia: 350000 },
      { ma: 'SA006', ten: 'Siêu âm Doppler mạch máu chi dưới', dongia: 400000 },
      { ma: 'SA007', ten: 'Siêu âm Doppler mạch cảnh', dongia: 350000 },
      { ma: 'SA008', ten: 'Siêu âm vú', dongia: 200000 },
      { ma: 'SA009', ten: 'Siêu âm phần mềm', dongia: 150000 },
      { ma: 'SA010', ten: 'Siêu âm thai (3 tháng đầu)', dongia: 200000 },
      { ma: 'SA011', ten: 'Siêu âm thai (3 tháng giữa)', dongia: 250000 },
      { ma: 'SA012', ten: 'Siêu âm 4D', dongia: 500000 },
    ],
    ctScan: [
      { ma: 'CT001', ten: 'CT Scanner sọ não không tiêm', dongia: 800000 },
      { ma: 'CT002', ten: 'CT Scanner sọ não có tiêm', dongia: 1200000 },
      { ma: 'CT003', ten: 'CT Scanner ngực không tiêm', dongia: 900000 },
      { ma: 'CT004', ten: 'CT Scanner ngực có tiêm', dongia: 1400000 },
      { ma: 'CT005', ten: 'CT Scanner bụng không tiêm', dongia: 1000000 },
      { ma: 'CT006', ten: 'CT Scanner bụng có tiêm', dongia: 1500000 },
      { ma: 'CT007', ten: 'CT Scanner cột sống', dongia: 900000 },
      { ma: 'CT008', ten: 'CT 128 dãy mạch vành', dongia: 3500000 },
    ],
    mri: [
      { ma: 'MRI001', ten: 'MRI sọ não không tiêm', dongia: 2000000 },
      { ma: 'MRI002', ten: 'MRI sọ não có tiêm', dongia: 2800000 },
      { ma: 'MRI003', ten: 'MRI cột sống cổ', dongia: 1800000 },
      { ma: 'MRI004', ten: 'MRI cột sống thắt lưng', dongia: 1800000 },
      { ma: 'MRI005', ten: 'MRI khớp gối', dongia: 1500000 },
      { ma: 'MRI006', ten: 'MRI vai', dongia: 1500000 },
      { ma: 'MRI007', ten: 'MRI bụng', dongia: 2500000 },
      { ma: 'MRI008', ten: 'MRI tim', dongia: 3500000 },
    ],
  },
  thamDoChucNang: [
    { ma: 'TD001', ten: 'Điện tim (ECG) 12 chuyển đạo', dongia: 50000 },
    { ma: 'TD002', ten: 'Điện tim gắng sức', dongia: 350000 },
    { ma: 'TD003', ten: 'Holter ECG 24h', dongia: 500000 },
    { ma: 'TD004', ten: 'Holter huyết áp 24h', dongia: 400000 },
    { ma: 'TD005', ten: 'Đo hô hấp ký (Spirometry)', dongia: 150000 },
    { ma: 'TD006', ten: 'Điện não đồ (EEG)', dongia: 300000 },
    { ma: 'TD007', ten: 'Điện cơ (EMG)', dongia: 400000 },
    { ma: 'TD008', ten: 'Nội soi dạ dày', dongia: 500000 },
    { ma: 'TD009', ten: 'Nội soi đại tràng', dongia: 800000 },
    { ma: 'TD010', ten: 'Nội soi tai mũi họng', dongia: 150000 },
  ],
};

const danhSachPhongKham = [
  'PK Nội tổng hợp',
  'PK Ngoại tổng hợp',
  'PK Cấp Cứu',
  'PK Tim mạch',
  'PK Hô hấp',
  'PK Tiêu hóa',
  'PK Thần kinh',
  'PK Nội tiết',
  'PK Cơ xương khớp',
  'PK Sản phụ khoa',
  'PK Nhi',
  'PK Tai mũi họng',
  'PK Mắt',
  'PK Da liễu',
];

const danhSachKhoa = [
  'Khoa Nội tổng hợp',
  'Khoa Ngoại tổng hợp',
  'Khoa Cấp cứu',
  'Khoa Tim mạch',
  'Khoa Hô hấp',
  'Khoa Tiêu hóa',
  'Khoa Nội thần kinh',
  'Khoa Nội tiết',
  'Khoa Cơ xương khớp',
  'Khoa Sản',
  'Khoa Nhi',
  'Khoa HSTC-CĐ',
  'Khoa Ung bướu',
];

const danhSachBacSi = [
  'Nguyễn Văn An',
  'Trần Thị Bình',
  'Lê Minh Châu',
  'Phạm Đức Dũng',
  'Hoàng Văn Em',
  'Võ Thị Hương',
  'Kinh Văn Vũ',
  'Lê Thanh Hiếu',
];

// Modal Tạo chỉ định CLS
function TaoChiDinhCLSModal({ 
  isOpen, 
  onClose, 
  patientInfo,
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  patientInfo: typeof mockPatientDetail;
  onSuccess: (newPhieu: typeof phieuChiDinh[0]) => void;
}) {
  const [formData, setFormData] = useState({
    bacsichidinh: 'Kinh Văn Vũ',
    noichidinh: 'PK Cấp Cứu',
    khoadieutri: 'Khoa Nội tổng hợp',
    mucdochidinh: 'Thường' as 'Thường' | 'Cấp cứu',
    chandoansobo: '',
    ghichulamsang: '',
    doituongbn: 'BHYT' as 'BHYT' | 'Viện phí' | 'Yêu cầu',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('xetNghiem.huyetHoc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<Array<{
    ma: string;
    ten: string;
    dongia: number;
    soluong: number;
    loai: string;
    ghichu: string;
  }>>([]);

  const [activeServiceTab, setActiveServiceTab] = useState<'xetNghiem' | 'chanDoanHinhAnh' | 'thamDoChucNang'>('xetNghiem');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdPhieuSo, setCreatedPhieuSo] = useState('');

  // Get current service list based on category
  const getCurrentServiceList = () => {
    const parts = selectedCategory.split('.');
    if (parts.length === 2) {
      const [main, sub] = parts;
      if (main === 'xetNghiem' && sub in danhMucDichVuCLS.xetNghiem) {
        return danhMucDichVuCLS.xetNghiem[sub as keyof typeof danhMucDichVuCLS.xetNghiem];
      }
      if (main === 'chanDoanHinhAnh' && sub in danhMucDichVuCLS.chanDoanHinhAnh) {
        return danhMucDichVuCLS.chanDoanHinhAnh[sub as keyof typeof danhMucDichVuCLS.chanDoanHinhAnh];
      }
    }
    if (selectedCategory === 'thamDoChucNang') {
      return danhMucDichVuCLS.thamDoChucNang;
    }
    return [];
  };

  const filteredServices = getCurrentServiceList().filter(s => 
    s.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.ma.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addService = (service: { ma: string; ten: string; dongia: number }) => {
    if (selectedServices.find(s => s.ma === service.ma)) return;
    
    let loai = '';
    if (selectedCategory.startsWith('xetNghiem')) {
      const subCat = selectedCategory.split('.')[1];
      const loaiMap: Record<string, string> = {
        huyetHoc: 'XN Huyết học',
        sinhHoa: 'XN Sinh hóa',
        nuocTieu: 'XN Nước tiểu',
        viSinh: 'XN Vi sinh',
        mienDich: 'XN Miễn dịch',
      };
      loai = loaiMap[subCat] || 'Xét nghiệm';
    } else if (selectedCategory.startsWith('chanDoanHinhAnh')) {
      const subCat = selectedCategory.split('.')[1];
      const loaiMap: Record<string, string> = {
        xQuang: 'X-Quang',
        sieuAm: 'Siêu âm',
        ctScan: 'CT Scanner',
        mri: 'MRI',
      };
      loai = loaiMap[subCat] || 'CĐHA';
    } else {
      loai = 'Thăm dò CN';
    }

    setSelectedServices([...selectedServices, {
      ...service,
      soluong: 1,
      loai,
      ghichu: '',
    }]);
  };

  const removeService = (ma: string) => {
    setSelectedServices(selectedServices.filter(s => s.ma !== ma));
  };

  const updateServiceQuantity = (ma: string, quantity: number) => {
    setSelectedServices(selectedServices.map(s => 
      s.ma === ma ? { ...s, soluong: Math.max(1, quantity) } : s
    ));
  };

  const updateServiceNote = (ma: string, ghichu: string) => {
    setSelectedServices(selectedServices.map(s => 
      s.ma === ma ? { ...s, ghichu } : s
    ));
  };

  const totalAmount = selectedServices.reduce((sum, s) => sum + (s.dongia * s.soluong), 0);

  // Generate unique order number
  const generateSoPhieu = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    
    // Determine prefix based on selected services
    const hasXN = selectedServices.some(s => s.loai.startsWith('XN'));
    const hasCDHA = selectedServices.some(s => ['X-Quang', 'Siêu âm', 'CT Scanner', 'MRI'].includes(s.loai));
    const hasTDCN = selectedServices.some(s => s.loai === 'Thăm dò CN');
    
    if (hasXN && !hasCDHA && !hasTDCN) return `${year}.XNHH.${random}`;
    if (hasCDHA && !hasXN && !hasTDCN) return `${year}.CDHA.${random}`;
    if (hasTDCN && !hasXN && !hasCDHA) return `${year}.TDCN.${random}`;
    return `${year}.CLS.${random}`;
  };

  const handleSubmit = () => {
    const soPhieu = generateSoPhieu();
    const now = new Date();
    const ngay = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    
    // Create new order
    const newPhieu = {
      sophieu: soPhieu,
      bacsichidinh: formData.bacsichidinh,
      ngay,
      chandoansobo: formData.chandoansobo,
      noichidinh: formData.noichidinh,
      khoadieutri: formData.khoadieutri,
      mucdochidinh: formData.mucdochidinh,
      tongcong: totalAmount.toLocaleString(),
      danhsach: selectedServices.map(s => ({
        tenchidinh: s.ten,
        loai: s.loai,
        soluong: s.soluong,
        dongia: s.dongia.toLocaleString(),
        thanhtien: (s.dongia * s.soluong).toLocaleString(),
        trangthai: 'Chờ thực hiện'
      }))
    };
    
    setCreatedPhieuSo(soPhieu);
    onSuccess(newPhieu);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setSelectedServices([]);
    setFormData({
      ...formData,
      chandoansobo: '',
      ghichulamsang: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Tạo phiếu chỉ định cận lâm sàng</h2>
            <p className="text-cyan-100 text-sm mt-1">Bệnh nhân: {patientInfo.hoten} - {patientInfo.mabenhnhan}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left - Form thông tin */}
          <div className="w-80 bg-[#0f1419] p-4 overflow-y-auto border-r border-gray-700">
            <h3 className="text-white font-medium mb-4">Thông tin chỉ định</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs mb-1">Bác sĩ chỉ định <span className="text-red-400">*</span></label>
                <select 
                  value={formData.bacsichidinh}
                  onChange={e => setFormData({...formData, bacsichidinh: e.target.value})}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {danhSachBacSi.map(bs => (
                    <option key={bs} value={bs}>{bs}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Nơi chỉ định <span className="text-red-400">*</span></label>
                <select 
                  value={formData.noichidinh}
                  onChange={e => setFormData({...formData, noichidinh: e.target.value})}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {danhSachPhongKham.map(pk => (
                    <option key={pk} value={pk}>{pk}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Khoa điều trị <span className="text-red-400">*</span></label>
                <select 
                  value={formData.khoadieutri}
                  onChange={e => setFormData({...formData, khoadieutri: e.target.value})}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {danhSachKhoa.map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Mức độ chỉ định</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="mucdo" 
                      checked={formData.mucdochidinh === 'Thường'}
                      onChange={() => setFormData({...formData, mucdochidinh: 'Thường'})}
                      className="w-4 h-4 text-cyan-500"
                    />
                    <span className="text-white text-sm">Thường</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="mucdo" 
                      checked={formData.mucdochidinh === 'Cấp cứu'}
                      onChange={() => setFormData({...formData, mucdochidinh: 'Cấp cứu'})}
                      className="w-4 h-4 text-red-500"
                    />
                    <span className="text-red-400 text-sm">Cấp cứu</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Đối tượng bệnh nhân</label>
                <select 
                  value={formData.doituongbn}
                  onChange={e => setFormData({...formData, doituongbn: e.target.value as 'BHYT' | 'Viện phí' | 'Yêu cầu'})}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  <option value="BHYT">BHYT</option>
                  <option value="Viện phí">Viện phí</option>
                  <option value="Yêu cầu">Dịch vụ yêu cầu</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Chẩn đoán sơ bộ <span className="text-red-400">*</span></label>
                <textarea 
                  value={formData.chandoansobo}
                  onChange={e => setFormData({...formData, chandoansobo: e.target.value})}
                  placeholder="Nhập chẩn đoán sơ bộ..."
                  rows={3}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Ghi chú lâm sàng</label>
                <textarea 
                  value={formData.ghichulamsang}
                  onChange={e => setFormData({...formData, ghichulamsang: e.target.value})}
                  placeholder="Triệu chứng, yêu cầu đặc biệt..."
                  rows={3}
                  className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Center - Danh mục dịch vụ */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Service Type Tabs */}
            <div className="bg-[#0f1419] border-b border-gray-700 px-4 py-2">
              <div className="flex gap-2">
                <button
                  onClick={() => { setActiveServiceTab('xetNghiem'); setSelectedCategory('xetNghiem.huyetHoc'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeServiceTab === 'xetNghiem' ? 'bg-cyan-500 text-white' : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
                  }`}
                >
                  <BeakerIcon className="w-4 h-4 inline mr-2" />
                  Xét nghiệm
                </button>
                <button
                  onClick={() => { setActiveServiceTab('chanDoanHinhAnh'); setSelectedCategory('chanDoanHinhAnh.xQuang'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeServiceTab === 'chanDoanHinhAnh' ? 'bg-cyan-500 text-white' : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
                  }`}
                >
                  <PhotoIcon className="w-4 h-4 inline mr-2" />
                  Chẩn đoán hình ảnh
                </button>
                <button
                  onClick={() => { setActiveServiceTab('thamDoChucNang'); setSelectedCategory('thamDoChucNang'); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeServiceTab === 'thamDoChucNang' ? 'bg-cyan-500 text-white' : 'bg-[#1a1f2e] text-gray-400 hover:text-white'
                  }`}
                >
                  <ClipboardDocumentListIcon className="w-4 h-4 inline mr-2" />
                  Thăm dò chức năng
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sub-categories */}
              <div className="w-48 bg-[#0f1419] border-r border-gray-700 overflow-y-auto">
                {activeServiceTab === 'xetNghiem' && (
                  <div className="p-2 space-y-1">
                    {[
                      { key: 'xetNghiem.huyetHoc', label: 'Huyết học' },
                      { key: 'xetNghiem.sinhHoa', label: 'Sinh hóa' },
                      { key: 'xetNghiem.nuocTieu', label: 'Nước tiểu' },
                      { key: 'xetNghiem.viSinh', label: 'Vi sinh' },
                      { key: 'xetNghiem.mienDich', label: 'Miễn dịch' },
                    ].map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.key
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                            : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
                {activeServiceTab === 'chanDoanHinhAnh' && (
                  <div className="p-2 space-y-1">
                    {[
                      { key: 'chanDoanHinhAnh.xQuang', label: 'X-Quang' },
                      { key: 'chanDoanHinhAnh.sieuAm', label: 'Siêu âm' },
                      { key: 'chanDoanHinhAnh.ctScan', label: 'CT Scanner' },
                      { key: 'chanDoanHinhAnh.mri', label: 'MRI' },
                    ].map(cat => (
                      <button
                        key={cat.key}
                        onClick={() => setSelectedCategory(cat.key)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat.key
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                            : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
                {activeServiceTab === 'thamDoChucNang' && (
                  <div className="p-2">
                    <div className="px-3 py-2 text-cyan-400 text-sm">
                      Tất cả dịch vụ
                    </div>
                  </div>
                )}
              </div>

              {/* Service List */}
              <div className="flex-1 flex flex-col overflow-hidden p-4">
                {/* Search */}
                <div className="relative mb-4">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm dịch vụ..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1a1f2e] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                {/* Services */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  {filteredServices.map(service => {
                    const isSelected = selectedServices.some(s => s.ma === service.ma);
                    return (
                      <div
                        key={service.ma}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-500/50'
                            : 'bg-[#1a1f2e] border-gray-700 hover:border-cyan-500/30'
                        }`}
                        onClick={() => !isSelected && addService(service)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 text-xs">{service.ma}</span>
                              <span className="text-white text-sm">{service.ten}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-cyan-400 font-medium">{service.dongia.toLocaleString()}đ</span>
                            {isSelected ? (
                              <CheckCircleIcon className="w-5 h-5 text-cyan-400" />
                            ) : (
                              <PlusIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Selected Services */}
          <div className="w-96 bg-[#0f1419] p-4 overflow-y-auto border-l border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Dịch vụ đã chọn</h3>
              <span className="text-cyan-400 text-sm">{selectedServices.length} dịch vụ</span>
            </div>

            {selectedServices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ClipboardDocumentListIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chưa có dịch vụ nào được chọn</p>
                <p className="text-xs mt-1">Nhấn vào dịch vụ bên trái để thêm</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedServices.map(service => (
                  <div key={service.ma} className="bg-[#1a1f2e] rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">{service.loai}</span>
                        <p className="text-white text-sm mt-1">{service.ten}</p>
                      </div>
                      <button 
                        onClick={() => removeService(service.ma)}
                        className="text-gray-400 hover:text-red-400 ml-2"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">SL:</span>
                        <input
                          type="number"
                          min="1"
                          value={service.soluong}
                          onChange={e => updateServiceQuantity(service.ma, parseInt(e.target.value) || 1)}
                          className="w-16 bg-[#0f1419] border border-gray-600 rounded px-2 py-1 text-white text-sm text-center"
                        />
                      </div>
                      <span className="text-gray-400 text-xs">x</span>
                      <span className="text-gray-300 text-sm">{service.dongia.toLocaleString()}đ</span>
                      <span className="text-gray-400 text-xs">=</span>
                      <span className="text-cyan-400 font-medium">{(service.dongia * service.soluong).toLocaleString()}đ</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Ghi chú..."
                      value={service.ghichu}
                      onChange={e => updateServiceNote(service.ma, e.target.value)}
                      className="w-full bg-[#0f1419] border border-gray-600 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Total & Submit */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Tổng cộng:</span>
                <span className="text-2xl font-bold text-cyan-400">{totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={selectedServices.length === 0 || !formData.chandoansobo}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Tạo phiếu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
          <div className="bg-[#1a1f2e] rounded-2xl w-full max-w-md overflow-hidden text-center animate-scale-up">
            {/* Success Icon */}
            <div className="pt-8 pb-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <CheckCircleSolidIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <h2 className="text-xl font-bold text-white mb-2">Tạo phiếu thành công!</h2>
              <p className="text-gray-400 mb-4">
                Phiếu chỉ định đã được ghi nhận vào hệ thống
              </p>

              {/* Order Info Card */}
              <div className="bg-[#0f1419] rounded-xl p-4 mb-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Số phiếu:</span>
                    <span className="text-cyan-400 font-bold">{createdPhieuSo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Số dịch vụ:</span>
                    <span className="text-white font-medium">{selectedServices.length} dịch vụ</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Tổng tiền:</span>
                    <span className="text-green-400 font-bold text-lg">{totalAmount.toLocaleString()}đ</span>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <span className="text-gray-400 text-sm">Trạng thái:</span>
                    <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">Chờ thực hiện</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCloseSuccess}
                  className="flex-1 px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    // Keep modal open for new order
                    setSelectedServices([]);
                    setFormData({
                      ...formData,
                      chandoansobo: '',
                      ghichulamsang: '',
                    });
                  }}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="w-5 h-5" />
                  Tạo phiếu mới
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== TAB: CHỈ ĐỊNH & KÊ ĐƠN ====================

// Danh mục mẫu chỉ định
const mauChiDinh = [
  { id: 'noi-khoa', label: 'Chỉ định nội khoa', icon: '🏥' },
  { id: 'ngoai-khoa', label: 'Mẫu ngoại khoa', icon: '🔪' },
  { id: 'kham-tong-quat', label: 'Gói khám tổng quát', icon: '📋' },
  { id: 'tieu-duong', label: 'Tiểu đường Type 2', icon: '💉' },
  { id: 'tang-huyet-ap', label: 'Tăng huyết áp', icon: '❤️' },
  { id: 'nhi-khoa', label: 'Sơ sinh/Nhi khoa', icon: '👶' },
];

// Danh mục thuốc mẫu (theo cấu trúc EMR 365 - YLenhThuocVatTu)
const danhMucThuoc = [
  { ma: 'TH001', maBYT: '40.001', ten: 'Amlodipine Besylate', hamLuong: '5mg', donVi: 'Viên', donGia: 2500, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sau ăn, tránh nước bưởi, chuối', tonKho: 520 },
  { ma: 'TH002', maBYT: '40.002', ten: 'Paracetamol', hamLuong: '500mg', donVi: 'Viên', donGia: 1000, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống khi đau đầu hoặc sốt > 38.5', tonKho: 1200 },
  { ma: 'TH003', maBYT: '40.003', ten: 'Omeprazole', hamLuong: '20mg', donVi: 'Viên', donGia: 3500, nhom: 'Thuoc', loaithuoc: 'Viên nang', duongDung: 'Đường uống', huongDan: 'Uống trước ăn 30 phút', tonKho: 340 },
  { ma: 'TH004', maBYT: '40.004', ten: 'Metformin', hamLuong: '500mg', donVi: 'Viên', donGia: 1500, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sau ăn', tonKho: 680 },
  { ma: 'TH005', maBYT: '40.005', ten: 'Atorvastatin', hamLuong: '10mg', donVi: 'Viên', donGia: 4000, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống buổi tối', tonKho: 450 },
  { ma: 'TH006', maBYT: '40.006', ten: 'Aspirin', hamLuong: '81mg', donVi: 'Viên', donGia: 800, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sau ăn sáng', tonKho: 900 },
  { ma: 'TH007', maBYT: '40.007', ten: 'Lisinopril', hamLuong: '10mg', donVi: 'Viên', donGia: 3000, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sáng', tonKho: 280 },
  { ma: 'TH008', maBYT: '40.008', ten: 'Simvastatin', hamLuong: '20mg', donVi: 'Viên', donGia: 3500, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống buổi tối', tonKho: 320 },
  { ma: 'TH009', maBYT: '40.009', ten: 'Clopidogrel', hamLuong: '75mg', donVi: 'Viên', donGia: 5000, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sáng', tonKho: 150 },
  { ma: 'TH010', maBYT: '40.010', ten: 'Losartan', hamLuong: '50mg', donVi: 'Viên', donGia: 3200, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sáng', tonKho: 410 },
  { ma: 'TH011', maBYT: '40.775', ten: 'Methyl Prednisolon (Solu-Medrol)', hamLuong: '125mg', donVi: 'Lọ', donGia: 85000, nhom: 'Thuoc', loaithuoc: 'Ống lọ chích', duongDung: 'Tiêm tĩnh mạch', huongDan: 'Tiêm TM chậm', tonKho: 50 },
  { ma: 'TH012', maBYT: '40.120', ten: 'Amoxicillin', hamLuong: '500mg', donVi: 'Viên', donGia: 2000, nhom: 'Thuoc', loaithuoc: 'Viên nang', duongDung: 'Đường uống', huongDan: 'Uống sau ăn, cách 8 giờ', tonKho: 800 },
  { ma: 'TH013', maBYT: '40.150', ten: 'Ciprofloxacin', hamLuong: '500mg', donVi: 'Viên', donGia: 4500, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống xa bữa ăn 2 giờ', tonKho: 200 },
  { ma: 'TH014', maBYT: '40.200', ten: 'Diazepam', hamLuong: '5mg', donVi: 'Viên', donGia: 1500, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống trước ngủ', tonKho: 100 },
  { ma: 'TH015', maBYT: '40.250', ten: 'Furosemide', hamLuong: '40mg', donVi: 'Viên', donGia: 1200, nhom: 'Thuoc', loaithuoc: 'Viên nén', duongDung: 'Đường uống', huongDan: 'Uống sáng sớm', tonKho: 350 },
];

// Danh mục vật tư y tế (theo cấu trúc EMR 365 - YLenhThuocVatTu với nhom = VTYT)
const danhMucVatTu = [
  { ma: 'VT001', maBYT: '1108.52', ten: 'Bơm tiêm nhựa 5cc', donVi: 'Cái', donGia: 3500, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Bơm tiêm dùng một lần các loại, các cỡ', tonKho: 2000 },
  { ma: 'VT002', maBYT: '1108.53', ten: 'Bơm tiêm nhựa 10cc', donVi: 'Cái', donGia: 4500, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Bơm tiêm dùng một lần', tonKho: 1500 },
  { ma: 'VT003', maBYT: '1108.54', ten: 'Bơm tiêm nhựa 20cc', donVi: 'Cái', donGia: 6000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Bơm tiêm dùng một lần', tonKho: 800 },
  { ma: 'VT004', maBYT: '1110.01', ten: 'Kim lấy thuốc 18G', donVi: 'Cái', donGia: 1500, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Kim lấy thuốc vô khuẩn', tonKho: 3000 },
  { ma: 'VT005', maBYT: '1110.02', ten: 'Kim tiêm 25G x 1"', donVi: 'Cái', donGia: 1200, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Kim tiêm dưới da', tonKho: 5000 },
  { ma: 'VT006', maBYT: '1112.01', ten: 'Dây truyền dịch người lớn', donVi: 'Bộ', donGia: 15000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Dây truyền dịch vô khuẩn', tonKho: 600 },
  { ma: 'VT007', maBYT: '1114.01', ten: 'Băng dính y tế 2.5cm x 5m', donVi: 'Cuộn', donGia: 25000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Băng dính y tế', tonKho: 200 },
  { ma: 'VT008', maBYT: '1116.01', ten: 'Gạc vô khuẩn 10x10cm', donVi: 'Miếng', donGia: 2000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Gạc không dính', tonKho: 3500 },
  { ma: 'VT009', maBYT: '1118.01', ten: 'Găng tay khám bệnh size M', donVi: 'Đôi', donGia: 3000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Găng tay không bột', tonKho: 5000 },
  { ma: 'VT010', maBYT: '1120.01', ten: 'Bông cồn sát khuẩn', donVi: 'Miếng', donGia: 500, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Bông tẩm cồn 70%', tonKho: 10000 },
  { ma: 'VT011', maBYT: '1122.01', ten: 'Catheter tĩnh mạch 22G', donVi: 'Cái', donGia: 18000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Kim luồn tĩnh mạch', tonKho: 400 },
  { ma: 'VT012', maBYT: '1124.01', ten: 'Ống nghiệm máu EDTA 3ml', donVi: 'Ống', donGia: 5000, nhom: 'VTYT', loai: 'Vật tư y tế tiêu hao', ghiChu: 'Ống lấy máu xét nghiệm', tonKho: 1200 },
];

// Danh mục phí dịch vụ (theo cấu trúc EMR 365 - PhieuChiDinh)
const danhMucPhiDichVu = [
  { ma: 'DV001', ten: 'Phí khám bệnh', loai: 'Khám bệnh', donGia: 150000, donVi: 'Lần' },
  { ma: 'DV002', ten: 'Phí khám chuyên khoa', loai: 'Khám bệnh', donGia: 200000, donVi: 'Lần' },
  { ma: 'DV003', ten: 'Phí khám cấp cứu', loai: 'Khám bệnh', donGia: 300000, donVi: 'Lần' },
  { ma: 'DV004', ten: 'Phí giường bệnh thường (ngày)', loai: 'Nội trú', donGia: 350000, donVi: 'Ngày' },
  { ma: 'DV005', ten: 'Phí giường bệnh điều hòa (ngày)', loai: 'Nội trú', donGia: 500000, donVi: 'Ngày' },
  { ma: 'DV006', ten: 'Phí giường ICU (ngày)', loai: 'Nội trú', donGia: 1500000, donVi: 'Ngày' },
  { ma: 'DV007', ten: 'Tiêm truyền tĩnh mạch', loai: 'Thủ thuật', donGia: 50000, donVi: 'Lần' },
  { ma: 'DV008', ten: 'Tiêm bắp', loai: 'Thủ thuật', donGia: 30000, donVi: 'Lần' },
  { ma: 'DV009', ten: 'Thay băng vết thương nhỏ', loai: 'Thủ thuật', donGia: 80000, donVi: 'Lần' },
  { ma: 'DV010', ten: 'Thay băng vết thương lớn', loai: 'Thủ thuật', donGia: 150000, donVi: 'Lần' },
  { ma: 'DV011', ten: 'Đo điện tim (ECG)', loai: 'Thăm dò', donGia: 100000, donVi: 'Lần' },
  { ma: 'DV012', ten: 'Đo huyết áp liên tục 24h', loai: 'Thăm dò', donGia: 500000, donVi: 'Lần' },
];

// Cảnh báo tương tác thuốc
const drugInteractionWarnings = [
  {
    level: 'high',
    drugs: ['Amlodipine', 'Simvastatin'],
    message: 'Amlodipine tương tác với Simvastatin làm tăng nồng độ Simvastatin trong máu. Cân nhắc giảm liều Simvastatin xuống tối đa 20mg/ngày.',
  },
  {
    level: 'medium',
    drugs: ['Aspirin', 'Clopidogrel'],
    message: 'Kết hợp có thể tăng nguy cơ chảy máu. Cần theo dõi chặt chẽ.',
  },
];

// Tab: Chỉ định & Kê đơn
function ChiDinhKeDonTab({ patientInfo }: { patientInfo: typeof mockPatientDetail }) {
  const [activeSubTab, setActiveSubTab] = useState<'cls' | 'thuoc' | 'vattu'>('cls');
  const [selectedMau, setSelectedMau] = useState<string | null>(null);
  const [searchCLS, setSearchCLS] = useState('');
  const [searchThuoc, setSearchThuoc] = useState('');
  const [searchVatTu, setSearchVatTu] = useState('');
  const [soNgay, setSoNgay] = useState(7);
  const [uuTienCapCuu, setUuTienCapCuu] = useState(false);
  const [vatTuSubTab, setVatTuSubTab] = useState<'vattu' | 'dichvu'>('vattu');
  
  // Giỏ hàng chỉ định
  const [gioHangCLS, setGioHangCLS] = useState<Array<{
    ma: string;
    ten: string;
    soLuong: number;
    donGia: number;
  }>>([]);

  // Đơn thuốc (theo cấu trúc EMR 365)
  const [donThuoc, setDonThuoc] = useState<Array<{
    ma: string;
    maBYT: string;
    ten: string;
    hamLuong: string;
    sang: number;
    trua: number;
    chieu: number;
    toi: number;
    duongDung: string;
    loaiThuoc: string;
    soLuong: number;
    huongDan: string;
    donGia: number;
    ghiChu: string;
  }>>([]);

  // Giỏ vật tư y tế (theo cấu trúc EMR 365 - YLenhThuocVatTu với nhom = VTYT)
  const [gioHangVatTu, setGioHangVatTu] = useState<Array<{
    ma: string;
    maBYT: string;
    ten: string;
    soLuong: number;
    donGia: number;
    donVi: string;
    ghiChu: string;
  }>>([]);

  // Giỏ phí dịch vụ
  const [gioHangDichVu, setGioHangDichVu] = useState<Array<{
    ma: string;
    ten: string;
    soLuong: number;
    donGia: number;
    donVi: string;
  }>>([]);

  // Thêm dịch vụ CLS vào giỏ
  const addCLSToCart = (service: { ma: string; ten: string; dongia: number }) => {
    const existing = gioHangCLS.find(item => item.ma === service.ma);
    if (existing) {
      setGioHangCLS(prev => prev.map(item => 
        item.ma === service.ma ? { ...item, soLuong: item.soLuong + 1 } : item
      ));
    } else {
      setGioHangCLS(prev => [...prev, { ma: service.ma, ten: service.ten, soLuong: 1, donGia: service.dongia }]);
    }
  };

  // Xóa dịch vụ CLS
  const removeCLSFromCart = (ma: string) => {
    setGioHangCLS(prev => prev.filter(item => item.ma !== ma));
  };

  // Thêm thuốc vào đơn (theo cấu trúc EMR 365)
  const addThuocToDon = (thuoc: typeof danhMucThuoc[0]) => {
    const existing = donThuoc.find(item => item.ma === thuoc.ma);
    if (!existing) {
      setDonThuoc(prev => [...prev, {
        ma: thuoc.ma,
        maBYT: thuoc.maBYT,
        ten: thuoc.ten,
        hamLuong: thuoc.hamLuong,
        sang: 1,
        trua: 0,
        chieu: 0,
        toi: 0,
        duongDung: thuoc.duongDung,
        loaiThuoc: thuoc.loaithuoc,
        soLuong: soNgay,
        huongDan: thuoc.huongDan,
        donGia: thuoc.donGia,
        ghiChu: '',
      }]);
    }
  };

  // Xóa thuốc khỏi đơn
  const removeThuocFromDon = (ma: string) => {
    setDonThuoc(prev => prev.filter(item => item.ma !== ma));
  };

  // Cập nhật liều thuốc
  const updateThuocDose = (ma: string, field: 'sang' | 'trua' | 'chieu' | 'toi', value: number) => {
    setDonThuoc(prev => prev.map(item => 
      item.ma === ma ? { ...item, [field]: Math.max(0, value) } : item
    ));
  };

  // Cập nhật ghi chú thuốc
  const updateThuocGhiChu = (ma: string, ghiChu: string) => {
    setDonThuoc(prev => prev.map(item => 
      item.ma === ma ? { ...item, ghiChu } : item
    ));
  };

  // Thêm vật tư vào giỏ
  const addVatTuToCart = (vatTu: typeof danhMucVatTu[0]) => {
    const existing = gioHangVatTu.find(item => item.ma === vatTu.ma);
    if (existing) {
      setGioHangVatTu(prev => prev.map(item => 
        item.ma === vatTu.ma ? { ...item, soLuong: item.soLuong + 1 } : item
      ));
    } else {
      setGioHangVatTu(prev => [...prev, {
        ma: vatTu.ma,
        maBYT: vatTu.maBYT,
        ten: vatTu.ten,
        soLuong: 1,
        donGia: vatTu.donGia,
        donVi: vatTu.donVi,
        ghiChu: vatTu.ghiChu,
      }]);
    }
  };

  // Xóa vật tư khỏi giỏ
  const removeVatTuFromCart = (ma: string) => {
    setGioHangVatTu(prev => prev.filter(item => item.ma !== ma));
  };

  // Thêm dịch vụ vào giỏ
  const addDichVuToCart = (dichVu: typeof danhMucPhiDichVu[0]) => {
    const existing = gioHangDichVu.find(item => item.ma === dichVu.ma);
    if (existing) {
      setGioHangDichVu(prev => prev.map(item => 
        item.ma === dichVu.ma ? { ...item, soLuong: item.soLuong + 1 } : item
      ));
    } else {
      setGioHangDichVu(prev => [...prev, {
        ma: dichVu.ma,
        ten: dichVu.ten,
        soLuong: 1,
        donGia: dichVu.donGia,
        donVi: dichVu.donVi,
      }]);
    }
  };

  // Xóa dịch vụ khỏi giỏ
  const removeDichVuFromCart = (ma: string) => {
    setGioHangDichVu(prev => prev.filter(item => item.ma !== ma));
  };

  // Tính tổng tiền CLS
  const tongTienCLS = gioHangCLS.reduce((sum, item) => sum + (item.donGia * item.soLuong), 0);

  // Tính tổng tiền thuốc
  const tongTienThuoc = donThuoc.reduce((sum, thuoc) => {
    const soLuongTong = (thuoc.sang + thuoc.trua + thuoc.chieu + thuoc.toi) * soNgay;
    return sum + (thuoc.donGia * soLuongTong);
  }, 0);

  // Tính tổng tiền vật tư
  const tongTienVatTu = gioHangVatTu.reduce((sum, item) => sum + (item.donGia * item.soLuong), 0);

  // Tính tổng tiền dịch vụ
  const tongTienDichVu = gioHangDichVu.reduce((sum, item) => sum + (item.donGia * item.soLuong), 0);

  // Tổng tất cả
  const tongTatCa = tongTienCLS + tongTienThuoc + tongTienVatTu + tongTienDichVu;

  // Kiểm tra tương tác thuốc
  const checkDrugInteractions = () => {
    const drugNames = donThuoc.map(d => d.ten);
    return drugInteractionWarnings.filter(warning => 
      warning.drugs.every(drug => drugNames.some(name => name.toLowerCase().includes(drug.toLowerCase())))
    );
  };

  const interactions = checkDrugInteractions();

  // Danh sách dịch vụ CLS có thể thêm
  const filteredCLSServices = [
    ...danhMucDichVuCLS.xetNghiem.huyetHoc,
    ...danhMucDichVuCLS.xetNghiem.sinhHoa,
    ...danhMucDichVuCLS.chanDoanHinhAnh.xQuang,
    ...danhMucDichVuCLS.chanDoanHinhAnh.sieuAm,
  ].filter(s => 
    s.ten.toLowerCase().includes(searchCLS.toLowerCase()) ||
    s.ma.toLowerCase().includes(searchCLS.toLowerCase())
  );

  // Lọc thuốc
  const filteredThuoc = danhMucThuoc.filter(t =>
    t.ten.toLowerCase().includes(searchThuoc.toLowerCase()) ||
    t.ma.toLowerCase().includes(searchThuoc.toLowerCase())
  );

  // Lọc vật tư
  const filteredVatTu = danhMucVatTu.filter(v =>
    v.ten.toLowerCase().includes(searchVatTu.toLowerCase()) ||
    v.ma.toLowerCase().includes(searchVatTu.toLowerCase())
  );

  // Lọc dịch vụ
  const filteredDichVu = danhMucPhiDichVu.filter(d =>
    d.ten.toLowerCase().includes(searchVatTu.toLowerCase()) ||
    d.loai.toLowerCase().includes(searchVatTu.toLowerCase())
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Mẫu chỉ định */}
      <div className="w-52 bg-[#0f1419] border-r border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-white font-medium text-sm">MẪU CHỈ ĐỊNH</h3>
        </div>
        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {mauChiDinh.map((mau) => (
            <button
              key={mau.id}
              onClick={() => setSelectedMau(mau.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                selectedMau === mau.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
              }`}
            >
              <span>{mau.icon}</span>
              <span>{mau.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Patient Info Bar */}
        <div className="bg-[#1a1f2e] border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded font-medium">EMR ACTIVE</span>
              <span className="text-white font-medium">{patientInfo.hoten}</span>
              <span className="text-gray-400 text-sm">| {patientInfo.tuoi} tuổi | {patientInfo.gioitinh}</span>
              <span className="text-gray-400 text-sm">Mã BN: <span className="text-cyan-400">{patientInfo.mabenhnhan.slice(-9)}</span></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">Chẩn đoán: <span className="text-yellow-400">H0 - Tăng huyết áp vô căn</span></span>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[#0f1419] border border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm">
                <ClockIcon className="w-4 h-4" />
                Lịch sử khám
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm">
                <DocumentArrowDownIcon className="w-4 h-4" />
                Lưu nháp
              </button>
            </div>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="bg-[#1a1f2e] border-b border-gray-700 px-4">
          <div className="flex items-center">
            <button
              onClick={() => setActiveSubTab('cls')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSubTab === 'cls'
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Chỉ định Cận lâm sàng
            </button>
            <button
              onClick={() => setActiveSubTab('thuoc')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSubTab === 'thuoc'
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Kê đơn thuốc
            </button>
            <button
              onClick={() => setActiveSubTab('vattu')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeSubTab === 'vattu'
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              Vật tư & Phí dịch vụ
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSubTab === 'cls' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BeakerIcon className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-medium">Danh mục xét nghiệm & Chẩn đoán hình ảnh</h3>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uuTienCapCuu}
                    onChange={(e) => setUuTienCapCuu(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#0f1419] text-red-500 focus:ring-red-500"
                  />
                  <span className="text-red-400 text-sm">Ưu tiên cấp cứu</span>
                </label>
              </div>

              {/* Search & Add */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm nhanh dịch vụ (Tên, Mã, Viết tắt)..."
                    value={searchCLS}
                    onChange={(e) => setSearchCLS(e.target.value)}
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-cyan-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1f2e] border border-gray-600 rounded-lg text-cyan-400 hover:bg-cyan-500/10 text-sm">
                  <PlusIcon className="w-4 h-4" />
                  Thêm mới
                </button>
              </div>

              {/* Services Table */}
              <div className="bg-[#1a1f2e] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-700 bg-[#0f1419]">
                      <th className="text-left py-3 px-4">Mã</th>
                      <th className="text-left py-3 px-4">Tên dịch vụ</th>
                      <th className="text-center py-3 px-4 w-24">Số lượng</th>
                      <th className="text-right py-3 px-4">Đơn giá (VNĐ)</th>
                      <th className="text-center py-3 px-4 w-20">Tác vụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCLSServices.slice(0, 10).map((service) => {
                      const inCart = gioHangCLS.find(item => item.ma === service.ma);
                      return (
                        <tr key={service.ma} className="border-b border-gray-700/50 hover:bg-[#0f1419]/50">
                          <td className="py-3 px-4 text-cyan-400 text-sm">{service.ma}</td>
                          <td className="py-3 px-4 text-white text-sm">{service.ten}</td>
                          <td className="py-3 px-4 text-center">
                            {inCart ? (
                              <input
                                type="number"
                                min="1"
                                value={inCart.soLuong}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value) || 1;
                                  setGioHangCLS(prev => prev.map(item =>
                                    item.ma === service.ma ? { ...item, soLuong: val } : item
                                  ));
                                }}
                                className="w-16 bg-[#0f1419] border border-gray-600 rounded px-2 py-1 text-white text-sm text-center"
                              />
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-300 text-sm">{service.dongia.toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">
                            {inCart ? (
                              <button
                                onClick={() => removeCLSFromCart(service.ma)}
                                className="p-1.5 text-red-400 hover:bg-red-500/20 rounded"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={() => addCLSToCart(service)}
                                className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded"
                              >
                                <PlusIcon className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === 'thuoc' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-white font-medium">Kê đơn thuốc điện tử</h3>
                  <span className="text-gray-400 text-sm">(Theo chuẩn EMR 365)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/50">
                    KHO THUỐC: CÒN HÀNG
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/50">
                    {donThuoc.length} thuốc | {soNgay} ngày
                  </span>
                </div>
              </div>

              {/* Search & Add */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span>Tên thuốc / Mã BYT:</span>
                </div>
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm thuốc: Amlodipine, Paracetamol, 40.001..."
                    value={searchThuoc}
                    onChange={(e) => setSearchThuoc(e.target.value)}
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-cyan-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Số ngày:</span>
                  <input
                    type="number"
                    min="1"
                    value={soNgay}
                    onChange={(e) => setSoNgay(parseInt(e.target.value) || 7)}
                    className="w-16 bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm text-center"
                  />
                </div>
                <button 
                  onClick={() => {
                    if (searchThuoc && filteredThuoc.length > 0) {
                      addThuocToDon(filteredThuoc[0]);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm"
                >
                  Thêm vào đơn
                </button>
              </div>

              {/* Drug Interaction Warning */}
              {interactions.length > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-orange-400 font-medium text-sm">CẢNH BÁO TƯƠNG TÁC THUỐC (MỨC ĐỘ: CAO)</h4>
                      {interactions.map((warning, idx) => (
                        <p key={idx} className="text-orange-300 text-sm mt-1">{warning.message}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Prescription Table - Enhanced with EMR 365 fields */}
              <div className="bg-[#1a1f2e] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-xs border-b border-gray-700 bg-[#0f1419]">
                      <th className="text-center py-3 px-2 w-10">#</th>
                      <th className="text-left py-3 px-3 w-20">Mã BYT</th>
                      <th className="text-left py-3 px-3">Tên thuốc & Hàm lượng</th>
                      <th className="text-center py-3 px-2 w-20">Loại</th>
                      <th className="text-center py-3 px-1 w-12">S</th>
                      <th className="text-center py-3 px-1 w-12">T</th>
                      <th className="text-center py-3 px-1 w-12">C</th>
                      <th className="text-center py-3 px-1 w-12">T</th>
                      <th className="text-center py-3 px-2 w-20">Đường dùng</th>
                      <th className="text-center py-3 px-2 w-14">SL</th>
                      <th className="text-right py-3 px-2 w-24">Thành tiền</th>
                      <th className="text-center py-3 px-2 w-10">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donThuoc.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <DocumentTextIcon className="w-10 h-10 opacity-50" />
                            <p>Chưa có thuốc trong đơn</p>
                            <p className="text-xs">Tìm kiếm và thêm thuốc ở trên</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      donThuoc.map((thuoc, idx) => {
                        const tongSoLuong = (thuoc.sang + thuoc.trua + thuoc.chieu + thuoc.toi) * soNgay;
                        const thanhTien = thuoc.donGia * tongSoLuong;
                        return (
                          <tr key={thuoc.ma} className="border-b border-gray-700/50 hover:bg-[#0f1419]/30">
                            <td className="py-3 px-2 text-center text-cyan-400 font-medium text-sm">{String(idx + 1).padStart(2, '0')}</td>
                            <td className="py-3 px-3 text-cyan-400 text-xs font-mono">{thuoc.maBYT}</td>
                            <td className="py-3 px-3">
                              <div>
                                <p className="text-white font-medium text-sm">{thuoc.ten}</p>
                                <p className="text-cyan-400 text-xs">{thuoc.hamLuong}</p>
                                <p className="text-gray-500 text-xs mt-0.5">{thuoc.huongDan}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">{thuoc.loaiThuoc}</span>
                            </td>
                            <td className="py-3 px-1 text-center">
                              <input
                                type="number"
                                min="0"
                                value={thuoc.sang}
                                onChange={(e) => updateThuocDose(thuoc.ma, 'sang', parseInt(e.target.value) || 0)}
                                className="w-10 bg-[#0f1419] border border-gray-600 rounded px-1 py-1 text-white text-xs text-center"
                              />
                            </td>
                            <td className="py-3 px-1 text-center">
                              <input
                                type="number"
                                min="0"
                                value={thuoc.trua}
                                onChange={(e) => updateThuocDose(thuoc.ma, 'trua', parseInt(e.target.value) || 0)}
                                className="w-10 bg-[#0f1419] border border-gray-600 rounded px-1 py-1 text-white text-xs text-center"
                              />
                            </td>
                            <td className="py-3 px-1 text-center">
                              <input
                                type="number"
                                min="0"
                                value={thuoc.chieu}
                                onChange={(e) => updateThuocDose(thuoc.ma, 'chieu', parseInt(e.target.value) || 0)}
                                className="w-10 bg-[#0f1419] border border-gray-600 rounded px-1 py-1 text-white text-xs text-center"
                              />
                            </td>
                            <td className="py-3 px-1 text-center">
                              <input
                                type="number"
                                min="0"
                                value={thuoc.toi}
                                onChange={(e) => updateThuocDose(thuoc.ma, 'toi', parseInt(e.target.value) || 0)}
                                className="w-10 bg-[#0f1419] border border-gray-600 rounded px-1 py-1 text-white text-xs text-center"
                              />
                            </td>
                            <td className="py-3 px-2 text-center">
                              <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">{thuoc.duongDung.replace('Đường ', '')}</span>
                            </td>
                            <td className="py-3 px-2 text-center text-white font-medium text-sm">
                              {tongSoLuong}
                            </td>
                            <td className="py-3 px-2 text-right text-cyan-400 text-sm font-medium">
                              {thanhTien.toLocaleString()}đ
                            </td>
                            <td className="py-3 px-2 text-center">
                              <button
                                onClick={() => removeThuocFromDon(thuoc.ma)}
                                className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  {donThuoc.length > 0 && (
                    <tfoot>
                      <tr className="bg-[#0f1419] border-t border-gray-700">
                        <td colSpan={10} className="py-3 px-4 text-right text-gray-400 font-medium">
                          Tổng cộng ({donThuoc.length} thuốc, {soNgay} ngày):
                        </td>
                        <td className="py-3 px-2 text-right text-cyan-400 font-bold text-lg">
                          {tongTienThuoc.toLocaleString()}đ
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>

              {/* Quick Add Drugs - Enhanced */}
              {searchThuoc && filteredThuoc.length > 0 && (
                <div className="bg-[#1a1f2e] rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-2">Kết quả tìm kiếm ({filteredThuoc.length} thuốc):</p>
                  <div className="space-y-2">
                    {filteredThuoc.slice(0, 6).map(thuoc => (
                      <div 
                        key={thuoc.ma}
                        onClick={() => addThuocToDon(thuoc)}
                        className="flex items-center justify-between px-3 py-2 bg-[#0f1419] border border-gray-600 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 text-xs font-mono">{thuoc.maBYT}</span>
                          <div>
                            <p className="text-white text-sm">{thuoc.ten} <span className="text-cyan-400">{thuoc.hamLuong}</span></p>
                            <p className="text-gray-500 text-xs">{thuoc.loaithuoc} | {thuoc.duongDung}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 text-xs rounded ${thuoc.tonKho > 100 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            Tồn: {thuoc.tonKho}
                          </span>
                          <span className="text-gray-400 text-sm">{thuoc.donGia.toLocaleString()}đ/{thuoc.donVi}</span>
                          <PlusIcon className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'vattu' && (
            <div className="space-y-4">
              {/* Sub-tabs for Vật tư và Dịch vụ */}
              <div className="flex items-center gap-4 border-b border-gray-700 pb-3">
                <button
                  onClick={() => setVatTuSubTab('vattu')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    vatTuSubTab === 'vattu'
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
                  }`}
                >
                  Vật tư y tế (VTYT)
                </button>
                <button
                  onClick={() => setVatTuSubTab('dichvu')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    vatTuSubTab === 'dichvu'
                      ? 'bg-cyan-500 text-white'
                      : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
                  }`}
                >
                  Phí dịch vụ
                </button>
              </div>

              {vatTuSubTab === 'vattu' && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardDocumentListIcon className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-medium">Danh mục Vật tư y tế tiêu hao</h3>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/50">
                      KHO VẬT TƯ: CÒN HÀNG
                    </span>
                  </div>

                  {/* Search */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Tìm vật tư: Bơm tiêm, Kim tiêm, Dây truyền..."
                        value={searchVatTu}
                        onChange={(e) => setSearchVatTu(e.target.value)}
                        className="w-full bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-cyan-500"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1f2e] border border-gray-600 rounded-lg text-cyan-400 hover:bg-cyan-500/10 text-sm">
                      <PlusIcon className="w-4 h-4" />
                      Thêm mới
                    </button>
                  </div>

                  {/* Vật tư Table */}
                  <div className="bg-[#1a1f2e] rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="text-gray-400 text-xs border-b border-gray-700 bg-[#0f1419]">
                          <th className="text-left py-3 px-4">Mã BYT</th>
                          <th className="text-left py-3 px-4">Tên vật tư</th>
                          <th className="text-center py-3 px-4 w-20">Đơn vị</th>
                          <th className="text-center py-3 px-4 w-24">Tồn kho</th>
                          <th className="text-center py-3 px-4 w-24">Số lượng</th>
                          <th className="text-right py-3 px-4">Đơn giá (VNĐ)</th>
                          <th className="text-center py-3 px-4 w-20">Tác vụ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVatTu.map((vatTu) => {
                          const inCart = gioHangVatTu.find(item => item.ma === vatTu.ma);
                          return (
                            <tr key={vatTu.ma} className="border-b border-gray-700/50 hover:bg-[#0f1419]/50">
                              <td className="py-3 px-4 text-cyan-400 text-sm">{vatTu.maBYT}</td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className="text-white text-sm">{vatTu.ten}</p>
                                  <p className="text-gray-500 text-xs">{vatTu.ghiChu}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-center text-gray-300 text-sm">{vatTu.donVi}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`px-2 py-0.5 text-xs rounded ${vatTu.tonKho > 100 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                  {vatTu.tonKho}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {inCart ? (
                                  <input
                                    type="number"
                                    min="1"
                                    value={inCart.soLuong}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 1;
                                      setGioHangVatTu(prev => prev.map(item =>
                                        item.ma === vatTu.ma ? { ...item, soLuong: val } : item
                                      ));
                                    }}
                                    className="w-16 bg-[#0f1419] border border-gray-600 rounded px-2 py-1 text-white text-sm text-center"
                                  />
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-300 text-sm">{vatTu.donGia.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">
                                {inCart ? (
                                  <button
                                    onClick={() => removeVatTuFromCart(vatTu.ma)}
                                    className="p-1.5 text-red-400 hover:bg-red-500/20 rounded"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addVatTuToCart(vatTu)}
                                    className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded"
                                  >
                                    <PlusIcon className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Giỏ vật tư đã chọn */}
                  {gioHangVatTu.length > 0 && (
                    <div className="bg-[#1a1f2e] rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        Vật tư đã chọn ({gioHangVatTu.length} mục)
                      </h4>
                      <div className="space-y-2">
                        {gioHangVatTu.map((item) => (
                          <div key={item.ma} className="flex items-center justify-between bg-[#0f1419] rounded-lg px-3 py-2">
                            <div className="flex items-center gap-3">
                              <span className="text-cyan-400 text-sm">{item.maBYT}</span>
                              <span className="text-white text-sm">{item.ten}</span>
                              <span className="text-gray-400 text-sm">x{item.soLuong} {item.donVi}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-cyan-400 font-medium">{(item.donGia * item.soLuong).toLocaleString()}đ</span>
                              <button
                                onClick={() => removeVatTuFromCart(item.ma)}
                                className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-700">
                          <span className="text-gray-400">Tổng tiền vật tư:</span>
                          <span className="text-cyan-400 font-bold">{tongTienVatTu.toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {vatTuSubTab === 'dichvu' && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-medium">Phí dịch vụ & Thủ thuật</h3>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Tìm dịch vụ: Khám bệnh, Giường bệnh, Tiêm truyền..."
                        value={searchVatTu}
                        onChange={(e) => setSearchVatTu(e.target.value)}
                        className="w-full bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Dịch vụ theo loại */}
                  {['Khám bệnh', 'Nội trú', 'Thủ thuật', 'Thăm dò'].map((loai) => {
                    const dichVuTheoLoai = filteredDichVu.filter(d => d.loai === loai);
                    if (dichVuTheoLoai.length === 0) return null;
                    
                    return (
                      <div key={loai} className="bg-[#1a1f2e] rounded-xl overflow-hidden">
                        <div className="bg-[#0f1419] px-4 py-2 border-b border-gray-700">
                          <h4 className="text-cyan-400 font-medium text-sm">{loai.toUpperCase()}</h4>
                        </div>
                        <table className="w-full">
                          <tbody>
                            {dichVuTheoLoai.map((dichVu) => {
                              const inCart = gioHangDichVu.find(item => item.ma === dichVu.ma);
                              return (
                                <tr key={dichVu.ma} className="border-b border-gray-700/50 hover:bg-[#0f1419]/50">
                                  <td className="py-3 px-4 text-cyan-400 text-sm w-24">{dichVu.ma}</td>
                                  <td className="py-3 px-4 text-white text-sm">{dichVu.ten}</td>
                                  <td className="py-3 px-4 text-center text-gray-300 text-sm w-20">{dichVu.donVi}</td>
                                  <td className="py-3 px-4 text-center w-24">
                                    {inCart ? (
                                      <input
                                        type="number"
                                        min="1"
                                        value={inCart.soLuong}
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value) || 1;
                                          setGioHangDichVu(prev => prev.map(item =>
                                            item.ma === dichVu.ma ? { ...item, soLuong: val } : item
                                          ));
                                        }}
                                        className="w-16 bg-[#0f1419] border border-gray-600 rounded px-2 py-1 text-white text-sm text-center"
                                      />
                                    ) : (
                                      <span className="text-gray-500">-</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-4 text-right text-gray-300 text-sm w-32">{dichVu.donGia.toLocaleString()}</td>
                                  <td className="py-3 px-4 text-center w-20">
                                    {inCart ? (
                                      <button
                                        onClick={() => removeDichVuFromCart(dichVu.ma)}
                                        className="p-1.5 text-red-400 hover:bg-red-500/20 rounded"
                                      >
                                        <TrashIcon className="w-4 h-4" />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => addDichVuToCart(dichVu)}
                                        className="p-1.5 text-cyan-400 hover:bg-cyan-500/20 rounded"
                                      >
                                        <PlusIcon className="w-4 h-4" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}

                  {/* Giỏ dịch vụ đã chọn */}
                  {gioHangDichVu.length > 0 && (
                    <div className="bg-[#1a1f2e] rounded-xl p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-green-400" />
                        Dịch vụ đã chọn ({gioHangDichVu.length} mục)
                      </h4>
                      <div className="space-y-2">
                        {gioHangDichVu.map((item) => (
                          <div key={item.ma} className="flex items-center justify-between bg-[#0f1419] rounded-lg px-3 py-2">
                            <div className="flex items-center gap-3">
                              <span className="text-cyan-400 text-sm">{item.ma}</span>
                              <span className="text-white text-sm">{item.ten}</span>
                              <span className="text-gray-400 text-sm">x{item.soLuong} {item.donVi}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-cyan-400 font-medium">{(item.donGia * item.soLuong).toLocaleString()}đ</span>
                              <button
                                onClick={() => removeDichVuFromCart(item.ma)}
                                className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-700">
                          <span className="text-gray-400">Tổng tiền dịch vụ:</span>
                          <span className="text-cyan-400 font-bold">{tongTienDichVu.toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-[#1a1f2e] border-t border-gray-700 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-xs">LƯU Ý LÂM SÀNG</span>
                <span className="text-yellow-300 text-xs">BN có tiền sử dị ứng Penicillin. Kiểm tra kỹ trước khi kê đơn.</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-[#0f1419] rounded">F1 Mẫu nội</span>
              <span className="px-2 py-1 bg-[#0f1419] rounded">F2 Mẫu ngoại</span>
              <span className="px-2 py-1 bg-[#0f1419] rounded">F9 Hoàn tất</span>
              <span className="px-2 py-1 bg-[#0f1419] rounded">Alt + S Lưu nháp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Giỏ hàng chỉ định */}
      <div className="w-72 bg-[#0f1419] border-l border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <h3 className="text-white font-medium text-sm">Giỏ hàng chỉ định</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* CLS Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">CẬN LÂM SÀNG ({gioHangCLS.length.toString().padStart(2, '0')})</span>
              <span className="text-cyan-400 text-sm font-medium">{tongTienCLS.toLocaleString()}đ</span>
            </div>
            {gioHangCLS.length > 0 ? (
              <div className="space-y-2">
                {gioHangCLS.map((item, idx) => (
                  <div key={item.ma} className="text-gray-300 text-xs flex justify-between">
                    <span>{idx + 1}. {item.ten.length > 25 ? item.ten.substring(0, 25) + '...' : item.ten}</span>
                    <span className="text-cyan-400">{(item.donGia * item.soLuong).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Chưa có chỉ định CLS</p>
            )}
          </div>

          {/* Prescription Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">ĐƠN THUỐC ({donThuoc.length.toString().padStart(2, '0')})</span>
              <span className="text-cyan-400 text-sm font-medium">{tongTienThuoc.toLocaleString()}đ</span>
            </div>
            {donThuoc.length > 0 ? (
              <div className="space-y-2">
                {donThuoc.map((thuoc) => (
                  <div key={thuoc.ma} className="bg-[#1a1f2e] rounded-lg p-2">
                    <p className="text-white text-sm font-medium">{thuoc.ten} {thuoc.hamLuong}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-xs">
                        S{thuoc.sang}, T{thuoc.trua}, C{thuoc.chieu}, T{thuoc.toi} | {soNgay} ngày
                      </p>
                      <span className="text-cyan-400 text-xs">
                        {(thuoc.donGia * (thuoc.sang + thuoc.trua + thuoc.chieu + thuoc.toi) * soNgay).toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Chưa có đơn thuốc</p>
            )}
          </div>

          {/* Vật tư Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">VẬT TƯ Y TẾ ({gioHangVatTu.length.toString().padStart(2, '0')})</span>
              <span className="text-cyan-400 text-sm font-medium">{tongTienVatTu.toLocaleString()}đ</span>
            </div>
            {gioHangVatTu.length > 0 ? (
              <div className="space-y-2">
                {gioHangVatTu.map((item, idx) => (
                  <div key={item.ma} className="text-gray-300 text-xs flex justify-between">
                    <span>{idx + 1}. {item.ten.length > 22 ? item.ten.substring(0, 22) + '...' : item.ten} x{item.soLuong}</span>
                    <span className="text-cyan-400">{(item.donGia * item.soLuong).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Chưa có vật tư</p>
            )}
          </div>

          {/* Dịch vụ Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs">PHÍ DỊCH VỤ ({gioHangDichVu.length.toString().padStart(2, '0')})</span>
              <span className="text-cyan-400 text-sm font-medium">{tongTienDichVu.toLocaleString()}đ</span>
            </div>
            {gioHangDichVu.length > 0 ? (
              <div className="space-y-2">
                {gioHangDichVu.map((item, idx) => (
                  <div key={item.ma} className="text-gray-300 text-xs flex justify-between">
                    <span>{idx + 1}. {item.ten.length > 22 ? item.ten.substring(0, 22) + '...' : item.ten} x{item.soLuong}</span>
                    <span className="text-cyan-400">{(item.donGia * item.soLuong).toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Chưa có phí dịch vụ</p>
            )}
          </div>

          {/* AI Suggestion */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 text-xs font-medium">🤖 GỢI Ý AI DỰA TRÊN ICD-10:</span>
            </div>
            <p className="text-purple-300 text-xs">
              Phát hiện nguy cơ tim mạch. Gợi ý bổ sung xét nghiệm Cholesterol toàn phần & LDL.
            </p>
            <button className="w-full mt-2 px-3 py-1.5 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600">
              + Thêm xét nghiệm
            </button>
          </div>
        </div>

        {/* Total & Actions */}
        <div className="p-3 border-t border-gray-700 space-y-3">
          {/* Chi tiết tổng */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>CLS:</span>
              <span>{tongTienCLS.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Thuốc:</span>
              <span>{tongTienThuoc.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Vật tư:</span>
              <span>{tongTienVatTu.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Dịch vụ:</span>
              <span>{tongTienDichVu.toLocaleString()}đ</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <span className="text-gray-400">Tổng tạm tính:</span>
            <span className="text-2xl font-bold text-cyan-400">{tongTatCa.toLocaleString()}đ</span>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-medium">
            <CheckCircleIcon className="w-5 h-5" />
            HOÀN TẤT & IN (F9)
          </button>

          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-[#1a1f2e] border border-gray-600 text-gray-300 rounded-lg hover:text-white text-sm">
              In phiếu CLS
            </button>
            <button className="flex-1 px-3 py-2 bg-[#1a1f2e] border border-gray-600 text-gray-300 rounded-lg hover:text-white text-sm">
              In đơn thuốc
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-[#1a1f2e] border border-gray-600 text-gray-300 rounded-lg hover:text-white text-sm">
              In phiếu vật tư
            </button>
            <button className="flex-1 px-3 py-2 bg-[#1a1f2e] border border-gray-600 text-gray-300 rounded-lg hover:text-white text-sm">
              In phí dịch vụ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab 3: Chỉ định cận lâm sàng
function ChiDinhCLSTab() {
  const [selectedPhieu, setSelectedPhieu] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [localPhieuList, setLocalPhieuList] = useState([...phieuChiDinh]);

  const handleNewPhieuCreated = (newPhieu: typeof phieuChiDinh[0]) => {
    setLocalPhieuList(prev => [newPhieu, ...prev]);
    setSelectedPhieu(newPhieu.sophieu);
  };

  const allPhieu = localPhieuList;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Modal tạo chỉ định */}
      <TaoChiDinhCLSModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        patientInfo={mockPatientDetail}
        onSuccess={handleNewPhieuCreated}
      />

      {/* Left - Danh sách phiếu */}
      <div className="w-80 bg-[#0f1419] p-4 overflow-y-auto border-r border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium">Danh sách phiếu chỉ định</h3>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="text-sm">Tạo mới</span>
          </button>
        </div>
        <div className="space-y-2">
          {allPhieu.map((phieu) => (
            <button
              key={phieu.sophieu}
              onClick={() => setSelectedPhieu(phieu.sophieu)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedPhieu === phieu.sophieu
                  ? 'bg-cyan-500/20 border border-cyan-500/50'
                  : 'bg-[#1a1f2e] hover:bg-[#252d3d]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-cyan-400 font-medium text-sm">{phieu.sophieu}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  phieu.mucdochidinh === 'Cấp cứu' 
                    ? 'bg-red-500/20 text-red-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {phieu.mucdochidinh}
                </span>
              </div>
              <p className="text-white text-sm">{phieu.ngay}</p>
              <p className="text-gray-400 text-xs mt-1 truncate">{phieu.chandoansobo}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-500 text-xs">{phieu.danhsach.length} chỉ định</span>
                <span className="text-cyan-400 text-sm font-medium">{phieu.tongcong}đ</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right - Chi tiết phiếu */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedPhieu ? (
          (() => {
            const phieu = allPhieu.find(p => p.sophieu === selectedPhieu);
            if (!phieu) return null;
            return (
              <div className="max-w-4xl">
                {/* New Order Badge */}
                {!phieuChiDinh.find(p => p.sophieu === phieu.sophieu) && (
                  <div className="mb-4 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
                    <CheckCircleSolidIcon className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Phiếu mới tạo - Đang chờ thực hiện</span>
                  </div>
                )}
                
                <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium text-lg">Phiếu chỉ định: {phieu.sophieu}</h3>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-[#0f1419] rounded-lg text-gray-400 hover:text-white">
                        <PrinterIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-[#0f1419] rounded-lg text-gray-400 hover:text-white">
                        <DocumentDuplicateIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-gray-400 text-xs">Bác sĩ chỉ định</p>
                      <p className="text-white">{phieu.bacsichidinh}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Nơi chỉ định</p>
                      <p className="text-white">{phieu.noichidinh}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Khoa điều trị</p>
                      <p className="text-white">{phieu.khoadieutri}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-xs mb-1">Chẩn đoán sơ bộ</p>
                    <p className="text-white bg-[#0f1419] p-3 rounded-lg">{phieu.chandoansobo}</p>
                  </div>
                </div>

                {/* Danh sách chỉ định */}
                <div className="bg-[#1a1f2e] rounded-xl p-5">
                  <h4 className="text-white font-medium mb-4">Danh sách chỉ định</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-400 text-xs border-b border-gray-700">
                        <th className="text-left py-3">Tên chỉ định</th>
                        <th className="text-left py-3">Loại</th>
                        <th className="text-center py-3">SL</th>
                        <th className="text-right py-3">Đơn giá</th>
                        <th className="text-right py-3">Thành tiền</th>
                        <th className="text-center py-3">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phieu.danhsach.map((cd, idx) => (
                        <tr key={idx} className="border-b border-gray-700/50">
                          <td className="py-3 text-white">{cd.tenchidinh}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">{cd.loai}</span>
                          </td>
                          <td className="py-3 text-center text-white">{cd.soluong}</td>
                          <td className="py-3 text-right text-gray-300">{cd.dongia}đ</td>
                          <td className="py-3 text-right text-white font-medium">{cd.thanhtien}đ</td>
                          <td className="py-3 text-center">
                            <span className={`px-2 py-0.5 text-xs rounded ${
                              cd.trangthai === 'Có kết quả' 
                                ? 'bg-green-500/20 text-green-400'
                                : cd.trangthai === 'Chờ thực hiện'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}>{cd.trangthai}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-gray-600">
                        <td colSpan={4} className="py-3 text-right text-gray-400">Tổng cộng:</td>
                        <td className="py-3 text-right text-cyan-400 font-bold text-lg">{phieu.tongcong}đ</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            );
          })()
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <ClipboardDocumentListIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Chọn một phiếu chỉ định để xem chi tiết</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Tab 4: Kết quả LIS/PACS
function KetQuaLISPACSTab() {
  const [activeSubTab, setActiveSubTab] = useState<'lis' | 'pacs'>('lis');
  const [selectedResult, setSelectedResult] = useState<string | null>(ketQuaXetNghiem[0]?.sophieu || null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sub Tabs */}
      <div className="bg-[#1a1f2e] border-b border-gray-700 px-6 py-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => { setActiveSubTab('lis'); setSelectedResult(ketQuaXetNghiem[0]?.sophieu || null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubTab === 'lis'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <BeakerIcon className="w-4 h-4 inline mr-2" />
            Kết quả Xét nghiệm (LIS)
          </button>
          <button
            onClick={() => { setActiveSubTab('pacs'); setSelectedResult(ketQuaCDHA[0]?.sophieu || null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSubTab === 'pacs'
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <PhotoIcon className="w-4 h-4 inline mr-2" />
            Kết quả CĐHA (PACS)
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {activeSubTab === 'lis' ? (
          <>
            {/* LIS Results List */}
            <div className="w-80 bg-[#0f1419] p-4 overflow-y-auto border-r border-gray-700/50">
              <h3 className="text-white font-medium mb-4">Danh sách phiếu xét nghiệm</h3>
              <div className="space-y-2">
                {ketQuaXetNghiem.map((kq) => (
                  <button
                    key={kq.sophieu}
                    onClick={() => setSelectedResult(kq.sophieu)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedResult === kq.sophieu
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-[#1a1f2e] hover:bg-[#252d3d]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-cyan-400 font-medium text-sm">{kq.sophieu}</span>
                      <span className="text-gray-500 text-xs">{kq.ngayketqua}</span>
                    </div>
                    <p className="text-white text-sm">{kq.nhom}</p>
                    <p className="text-gray-400 text-xs mt-1">{kq.nguoithuchien}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* LIS Results Detail */}
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedResult && (() => {
                const kq = ketQuaXetNghiem.find(k => k.sophieu === selectedResult);
                if (!kq) return null;
                return (
                  <div className="max-w-4xl">
                    <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium text-lg">{kq.nhom}</h3>
                        <button className="p-2 bg-[#0f1419] rounded-lg text-gray-400 hover:text-white">
                          <PrinterIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">Số phiếu</p>
                          <p className="text-cyan-400">{kq.sophieu}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">BS chỉ định</p>
                          <p className="text-white">{kq.bacsichidinh}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Người thực hiện</p>
                          <p className="text-white">{kq.nguoithuchien}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Ngày kết quả</p>
                          <p className="text-white">{kq.ngayketqua}</p>
                        </div>
                      </div>
                    </div>

                    {/* Results Table */}
                    <div className="bg-[#1a1f2e] rounded-xl p-5">
                      <table className="w-full">
                        <thead>
                          <tr className="text-gray-400 text-xs border-b border-gray-700">
                            <th className="text-left py-3">Tên xét nghiệm</th>
                            <th className="text-center py-3">Kết quả</th>
                            <th className="text-center py-3">Đơn vị</th>
                            <th className="text-center py-3">Tham chiếu</th>
                            <th className="text-center py-3">Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {kq.danhsach.map((xn, idx) => (
                            <tr key={idx} className="border-b border-gray-700/50">
                              <td className="py-3 text-white">{xn.tenxetnghiem}</td>
                              <td className={`py-3 text-center font-bold ${xn.batthuong ? 'text-red-400' : 'text-green-400'}`}>
                                {xn.ketqua}
                                {xn.batthuong && <ExclamationCircleIcon className="w-4 h-4 inline ml-1" />}
                              </td>
                              <td className="py-3 text-center text-gray-300">{xn.donvi}</td>
                              <td className="py-3 text-center text-gray-400">{xn.thamchieu}</td>
                              <td className="py-3 text-center">
                                {xn.batthuong ? (
                                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">Bất thường</span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">Bình thường</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        ) : (
          <>
            {/* PACS Results List */}
            <div className="w-80 bg-[#0f1419] p-4 overflow-y-auto border-r border-gray-700/50">
              <h3 className="text-white font-medium mb-4">Danh sách kết quả CĐHA</h3>
              <div className="space-y-2">
                {ketQuaCDHA.map((kq) => (
                  <button
                    key={kq.sophieu}
                    onClick={() => setSelectedResult(kq.sophieu)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedResult === kq.sophieu
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-[#1a1f2e] hover:bg-[#252d3d]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">{kq.loai}</span>
                      <span className="text-gray-500 text-xs">{kq.ngayketqua}</span>
                    </div>
                    <p className="text-white text-sm mt-2">{kq.tenchidinh}</p>
                    <p className="text-gray-400 text-xs mt-1">BS: {kq.bacsithuchien}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* PACS Results Detail */}
            <div className="flex-1 p-6 overflow-y-auto">
              {selectedResult && (() => {
                const kq = ketQuaCDHA.find(k => k.sophieu === selectedResult);
                if (!kq) return null;
                return (
                  <div className="max-w-4xl">
                    <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded mr-2">{kq.loai}</span>
                          <h3 className="text-white font-medium text-lg inline">{kq.tenchidinh}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <a 
                            href={kq.linkpacs} 
                            target="_blank" 
                            className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/30 flex items-center gap-1"
                          >
                            <EyeIcon className="w-4 h-4" />
                            Xem PACS
                          </a>
                          <button className="p-2 bg-[#0f1419] rounded-lg text-gray-400 hover:text-white">
                            <PrinterIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">Số phiếu</p>
                          <p className="text-cyan-400">{kq.sophieu}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">BS chỉ định</p>
                          <p className="text-white">{kq.bacsichidinh}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">BS thực hiện</p>
                          <p className="text-white">{kq.bacsithuchien}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Ngày kết quả</p>
                          <p className="text-white">{kq.ngayketqua}</p>
                        </div>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className="bg-[#1a1f2e] rounded-xl p-5 mb-4">
                      <h4 className="text-white font-medium mb-4">Hình ảnh</h4>
                      <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <PhotoIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                          <p>Click "Xem PACS" để xem hình ảnh đầy đủ</p>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="bg-[#1a1f2e] rounded-xl p-5">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-gray-400 text-xs mb-2">MÔ TẢ</h4>
                          <p className="text-white bg-[#0f1419] p-3 rounded-lg">{kq.mota}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-400 text-xs mb-2">KẾT LUẬN</h4>
                          <p className="text-white bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-lg whitespace-pre-line">{kq.ketluan}</p>
                        </div>
                        {kq.denghi && (
                          <div>
                            <h4 className="text-gray-400 text-xs mb-2">ĐỀ NGHỊ</h4>
                            <p className="text-white bg-[#0f1419] p-3 rounded-lg">{kq.denghi}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
