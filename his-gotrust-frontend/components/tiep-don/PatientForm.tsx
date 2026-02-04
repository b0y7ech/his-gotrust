'use client';

import { UserIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface PatientData {
  hoTen: string;
  soCCCD: string;
  ngaySinh: string;
  gioiTinh: string;
  diaChi: string;
}

interface PatientFormProps {
  data: PatientData;
  onChange: (data: PatientData) => void;
}

export default function PatientForm({ data, onChange }: PatientFormProps) {
  const handleChange = (field: keyof PatientData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserIcon className="w-5 h-5 text-[#0ea5e9]" />
        <h2 className="text-white font-semibold text-lg">Thông tin hành chính</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Họ và tên */}
        <div>
          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
            Họ và tên
          </label>
          <input
            type="text"
            placeholder="Nhập họ tên đầy đủ"
            value={data.hoTen}
            onChange={(e) => handleChange('hoTen', e.target.value)}
            className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500"
          />
        </div>

        {/* Số CCCD */}
        <div>
          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
            Số CCCD
          </label>
          <input
            type="text"
            placeholder="12 số"
            value={data.soCCCD}
            onChange={(e) => handleChange('soCCCD', e.target.value)}
            className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500"
          />
        </div>

        {/* Ngày sinh */}
        <div>
          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
            Ngày sinh
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={data.ngaySinh}
              onChange={(e) => handleChange('ngaySinh', e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Giới tính */}
        <div>
          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
            Giới tính
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleChange('gioiTinh', 'Nam')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                data.gioiTinh === 'Nam'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              Nam
            </button>
            <button
              onClick={() => handleChange('gioiTinh', 'Nữ')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                data.gioiTinh === 'Nữ'
                  ? 'bg-[#0ea5e9] text-white'
                  : 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-gray-500'
              }`}
            >
              Nữ
            </button>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="col-span-2">
          <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">
            Địa chỉ
          </label>
          <input
            type="text"
            placeholder="Số nhà, đường, phường/xã, quận/huyện"
            value={data.diaChi}
            onChange={(e) => handleChange('diaChi', e.target.value)}
            className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
