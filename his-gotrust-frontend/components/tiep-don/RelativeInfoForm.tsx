'use client';

import { UsersIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan } from '@/types/patient';

interface RelativeInfoFormProps {
  data: ThongTinBenhNhan;
  onChange: (data: ThongTinBenhNhan) => void;
}

export default function RelativeInfoForm({ data, onChange }: RelativeInfoFormProps) {
  const handleChange = (field: keyof ThongTinBenhNhan, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <UsersIcon className="w-5 h-5 text-purple-500" />
        <h2 className="text-white font-semibold text-lg">Thông tin người thân</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Họ tên người thân
          </label>
          <input
            type="text"
            value={data.hotennguoithan}
            onChange={(e) => handleChange('hotennguoithan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="VD: Chồng: Nguyễn Văn A"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số điện thoại
          </label>
          <input
            type="text"
            value={data.sodienthoainguoithan}
            onChange={(e) => handleChange('sodienthoainguoithan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="SĐT người thân"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Địa chỉ người thân
          </label>
          <input
            type="text"
            value={data.diachinguoithan}
            onChange={(e) => handleChange('diachinguoithan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Địa chỉ người thân"
          />
        </div>
      </div>
    </div>
  );
}
