'use client';

import { UserIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan } from '@/types/patient';

interface PatientInfoFormProps {
  data: ThongTinBenhNhan;
  onChange: (data: ThongTinBenhNhan) => void;
}

const gioiTinhOptions = ['Nam', 'Nữ'];
const danTocOptions = [
  { ma: '25', ten: 'Kinh' },
  { ma: '01', ten: 'Tày' },
  { ma: '02', ten: 'Thái' },
  { ma: '03', ten: 'Mường' },
  { ma: '04', ten: 'Khmer' },
  { ma: '05', ten: 'Hoa' },
  { ma: '06', ten: 'Nùng' },
  { ma: '07', ten: 'HMông' },
];

const ngheNghiepOptions = [
  { ma: '01', ten: 'Cán bộ, công chức, viên chức' },
  { ma: '02', ten: 'Công nhân' },
  { ma: '03', ten: 'Nông dân' },
  { ma: '04', ten: 'Công nhân, thợ thủ công' },
  { ma: '05', ten: 'Học sinh, sinh viên' },
  { ma: '06', ten: 'Lao động tự do' },
  { ma: '07', ten: 'Hưu trí' },
  { ma: '08', ten: 'Khác' },
];

const nhomMauOptions = ['A', 'B', 'AB', 'O', 'Chưa xác định'];
const rhOptions = ['+', '-', 'Chưa xác định'];

export default function PatientInfoForm({ data, onChange }: PatientInfoFormProps) {
  const handleChange = (field: keyof ThongTinBenhNhan, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <UserIcon className="w-5 h-5 text-[#0ea5e9]" />
        <h2 className="text-white font-semibold text-lg">Thông tin hành chính</h2>
      </div>

      {/* Row 1: Basic Info */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Mã bệnh nhân
          </label>
          <input
            type="text"
            value={data.mabenhnhan}
            onChange={(e) => handleChange('mabenhnhan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Tự động tạo"
            readOnly
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.hoten}
            onChange={(e) => handleChange('hoten', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Nhập họ tên đầy đủ"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số CCCD <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.cccd_so}
            onChange={(e) => handleChange('cccd_so', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="12 số"
            maxLength={12}
          />
        </div>
      </div>

      {/* Row 2: DOB, Gender, Ethnicity */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Ngày sinh <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.ngaysinh}
              onChange={(e) => handleChange('ngaysinh', e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm pr-10"
              placeholder="dd/mm/yyyy"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Tuổi
          </label>
          <input
            type="text"
            value={data.tuoi}
            onChange={(e) => handleChange('tuoi', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Tự tính"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Giới tính <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {gioiTinhOptions.map((gt) => (
              <button
                key={gt}
                onClick={() => handleChange('gioitinh', gt)}
                className={`flex-1 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  data.gioitinh === gt
                    ? 'bg-[#0ea5e9] text-white'
                    : 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-gray-500'
                }`}
              >
                {gt}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Dân tộc
          </label>
          <select
            value={data.dantoc}
            onChange={(e) => {
              const selected = danTocOptions.find(d => d.ten === e.target.value);
              handleChange('dantoc', e.target.value);
              if (selected) handleChange('dantoc_ma', selected.ma);
            }}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn dân tộc</option>
            {danTocOptions.map((dt) => (
              <option key={dt.ma} value={dt.ten}>{dt.ten}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Occupation, Nationality */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nghề nghiệp
          </label>
          <select
            value={data.nghenghiep}
            onChange={(e) => {
              const selected = ngheNghiepOptions.find(n => n.ten === e.target.value);
              handleChange('nghenghiep', e.target.value);
              if (selected) handleChange('nghenghiep_ma', selected.ma);
            }}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn nghề nghiệp</option>
            {ngheNghiepOptions.map((nn) => (
              <option key={nn.ma} value={nn.ten}>{nn.ten}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Quốc tịch
          </label>
          <input
            type="text"
            value={data.ngoaikieu}
            onChange={(e) => handleChange('ngoaikieu', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="VN"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số điện thoại
          </label>
          <input
            type="text"
            value={data.sodienthoai}
            onChange={(e) => handleChange('sodienthoai', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Nhập SĐT"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số hộ chiếu
          </label>
          <input
            type="text"
            value={data.hochieu_so}
            onChange={(e) => handleChange('hochieu_so', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Nếu có"
          />
        </div>
      </div>

      {/* Row 4: Address */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Tỉnh/Thành phố
          </label>
          <input
            type="text"
            value={data.tinhthanh}
            onChange={(e) => handleChange('tinhthanh', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Tỉnh/Thành phố"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Quận/Huyện
          </label>
          <input
            type="text"
            value={data.quanhuyen}
            onChange={(e) => handleChange('quanhuyen', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Quận/Huyện"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Phường/Xã
          </label>
          <input
            type="text"
            value={data.xaphuong}
            onChange={(e) => handleChange('xaphuong', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Phường/Xã"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số nhà, đường
          </label>
          <input
            type="text"
            value={data.sonha}
            onChange={(e) => handleChange('sonha', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Số nhà, tên đường"
          />
        </div>
      </div>

      {/* Row 5: Blood type */}
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nhóm máu
          </label>
          <select
            value={data.nhommau}
            onChange={(e) => handleChange('nhommau', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn nhóm máu</option>
            {nhomMauOptions.map((nm) => (
              <option key={nm} value={nm}>{nm}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Yếu tố Rh
          </label>
          <select
            value={data.yeutorh}
            onChange={(e) => handleChange('yeutorh', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn Rh</option>
            {rhOptions.map((rh) => (
              <option key={rh} value={rh}>{rh}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Địa chỉ đầy đủ
          </label>
          <input
            type="text"
            value={data.diachi}
            onChange={(e) => handleChange('diachi', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Địa chỉ đầy đủ"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
