'use client';

import { ClipboardDocumentCheckIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { ThongTinTiepDon, ThongTinVaoVien } from '@/types/patient';

interface ReceptionInfoFormProps {
  tiepDonData: ThongTinTiepDon;
  vaoVienData: ThongTinVaoVien;
  onChangeTiepDon: (data: ThongTinTiepDon) => void;
  onChangeVaoVien: (data: ThongTinVaoVien) => void;
}

const loaiBaOptions = [
  { ma: '01/BV1', ten: 'Bệnh án ngoại trú' },
  { ma: '02/BV1', ten: 'Bệnh án nội trú' },
  { ma: '03/BV1', ten: 'Bệnh án cấp cứu' },
];

const lydoTiepNhanOptions = [
  'Khám bệnh',
  'Cấp cứu',
  'Chuyển viện',
  'Tái khám',
  'Điều trị ngoại trú',
];

const noiGioiThieuOptions = [
  'Tự đến',
  'Chuyển tuyến',
  'Cấp cứu 115',
  'Khác',
];

const phongKhamOptions = [
  { ma: 'PK Cấp Cứu', ten: 'PK Cấp Cứu' },
  { ma: 'PK Nội', ten: 'PK Nội tổng quát' },
  { ma: 'PK Ngoại', ten: 'PK Ngoại tổng hợp' },
  { ma: 'PK Sản', ten: 'PK Sản phụ khoa' },
  { ma: 'PK Nhi', ten: 'PK Nhi' },
  { ma: 'PK TMH', ten: 'PK Tai Mũi Họng' },
  { ma: 'PK Mat', ten: 'PK Mắt' },
  { ma: 'PK RHM', ten: 'PK Răng Hàm Mặt' },
];

export default function ReceptionInfoForm({ 
  tiepDonData, 
  vaoVienData, 
  onChangeTiepDon, 
  onChangeVaoVien 
}: ReceptionInfoFormProps) {
  
  const handleTiepDonChange = (field: keyof ThongTinTiepDon, value: string) => {
    onChangeTiepDon({ ...tiepDonData, [field]: value } as ThongTinTiepDon);
  };

  const handleVaoVienChange = (field: keyof ThongTinVaoVien, value: string) => {
    onChangeVaoVien({ ...vaoVienData, [field]: value });
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <ClipboardDocumentCheckIcon className="w-5 h-5 text-orange-500" />
        <h2 className="text-white font-semibold text-lg">Thông tin tiếp nhận</h2>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Loại bệnh án
          </label>
          <select
            value={tiepDonData.loaiba}
            onChange={(e) => handleTiepDonChange('loaiba', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn loại BA</option>
            {loaiBaOptions.map((lb) => (
              <option key={lb.ma} value={lb.ma}>{lb.ten}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số vào viện
          </label>
          <input
            type="text"
            value={tiepDonData.sovaovien}
            readOnly
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Tự động tạo"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Thời gian vào viện
          </label>
          <div className="relative">
            <input
              type="text"
              value={tiepDonData.thoigianvaovien}
              onChange={(e) => handleTiepDonChange('thoigianvaovien', e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm pr-10"
              placeholder="dd/mm/yyyy HH:mm"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Khoa tiếp nhận
          </label>
          <input
            type="text"
            value={tiepDonData.tenkhoa}
            onChange={(e) => handleTiepDonChange('tenkhoa', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Khoa khám bệnh"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Lý do tiếp nhận <span className="text-red-500">*</span>
          </label>
          <select
            value={tiepDonData.lydotiepnhan}
            onChange={(e) => handleTiepDonChange('lydotiepnhan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn lý do</option>
            {lydoTiepNhanOptions.map((ld) => (
              <option key={ld} value={ld}>{ld}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nơi giới thiệu
          </label>
          <select
            value={tiepDonData.noigioithieu_loai}
            onChange={(e) => handleTiepDonChange('noigioithieu_loai', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn nơi giới thiệu</option>
            {noiGioiThieuOptions.map((ngt) => (
              <option key={ngt} value={ngt}>{ngt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Phòng khám <span className="text-red-500">*</span>
          </label>
          <select
            value={vaoVienData.maphongkham}
            onChange={(e) => {
              const selected = phongKhamOptions.find(pk => pk.ma === e.target.value);
              if (selected) {
                handleVaoVienChange('maphongkham', selected.ma);
                handleVaoVienChange('phongkham', selected.ten);
              }
            }}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn phòng khám</option>
            {phongKhamOptions.map((pk) => (
              <option key={pk.ma} value={pk.ma}>{pk.ten}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Buồng / Giường
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tiepDonData.buong}
              onChange={(e) => handleTiepDonChange('buong', e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
              placeholder="Buồng"
            />
            <input
              type="text"
              value={tiepDonData.giuong}
              onChange={(e) => handleTiepDonChange('giuong', e.target.value)}
              className="w-1/2 px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
              placeholder="Giường"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Chief Complaint */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Lý do vào viện <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={vaoVienData.lydovaovien}
            onChange={(e) => handleVaoVienChange('lydovaovien', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="VD: đau bụng, sốt, ho..."
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Chẩn đoán sơ bộ
          </label>
          <input
            type="text"
            value={vaoVienData.chandoansobo}
            onChange={(e) => handleVaoVienChange('chandoansobo', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Chẩn đoán ban đầu"
          />
        </div>
      </div>

      {/* Row 4: History */}
      <div>
        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
          Quá trình bệnh lý
        </label>
        <textarea
          value={vaoVienData.quatrinhbenhly}
          onChange={(e) => handleVaoVienChange('quatrinhbenhly', e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm resize-none"
          placeholder="Mô tả quá trình bệnh lý..."
        />
      </div>
    </div>
  );
}
