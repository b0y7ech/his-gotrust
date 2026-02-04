'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan } from '@/types/patient';

interface InsuranceFormProps {
  data: ThongTinBenhNhan;
  onChange: (data: ThongTinBenhNhan) => void;
  onLookupBHYT: () => void;
}

const doiTuongOptions = [
  'BHYT',
  'Viện phí',
  'Miễn phí',
  'Bảo hiểm khác',
];

export default function InsuranceForm({ data, onChange, onLookupBHYT }: InsuranceFormProps) {
  const handleChange = (field: keyof ThongTinBenhNhan, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // Determine insurance status based on data
  const getInsuranceStatus = () => {
    if (!data.mabhyt) {
      return { color: 'bg-gray-500', textColor: 'text-gray-400', text: 'Chưa có thông tin' };
    }
    if (data.denngaybhyt) {
      const parts = data.denngaybhyt.split('/');
      if (parts.length === 3) {
        const expDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        if (expDate > new Date()) {
          return { color: 'bg-green-500', textColor: 'text-green-500', text: 'Còn hiệu lực' };
        } else {
          return { color: 'bg-red-500', textColor: 'text-red-500', text: 'Hết hiệu lực' };
        }
      }
    }
    return { color: 'bg-yellow-500', textColor: 'text-yellow-500', text: 'Chưa xác thực' };
  };

  const status = getInsuranceStatus();

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <ShieldCheckIcon className="w-5 h-5 text-green-500" />
        <h2 className="text-white font-semibold text-lg">Thông tin BHYT</h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Đối tượng BN
          </label>
          <select
            value={data.doituongbn_loai}
            onChange={(e) => handleChange('doituongbn_loai', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none text-sm"
          >
            <option value="">Chọn đối tượng</option>
            {doiTuongOptions.map((dt) => (
              <option key={dt} value={dt}>{dt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Số thẻ BHYT
          </label>
          <input
            type="text"
            value={data.mabhyt}
            onChange={(e) => handleChange('mabhyt', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Nhập số thẻ BHYT"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Từ ngày
          </label>
          <input
            type="text"
            value={data.tungaybhyt}
            onChange={(e) => handleChange('tungaybhyt', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Đến ngày
          </label>
          <input
            type="text"
            value={data.denngaybhyt}
            onChange={(e) => handleChange('denngaybhyt', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="dd/mm/yyyy"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nơi đăng ký KCB ban đầu
          </label>
          <input
            type="text"
            value={data.noidangkykcbbd}
            onChange={(e) => handleChange('noidangkykcbbd', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="Nhập nơi ĐKKC ban đầu"
          />
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
              Trạng thái BHYT
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#0f1419] rounded-lg border border-gray-700">
              <span className={`w-2 h-2 rounded-full ${status.color}`}></span>
              <span className={`${status.textColor} text-sm`}>{status.text}</span>
            </div>
          </div>
          <button 
            onClick={onLookupBHYT}
            className="px-4 py-2.5 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors text-sm font-medium"
          >
            Tra cứu BHYT
          </button>
        </div>
      </div>
    </div>
  );
}
