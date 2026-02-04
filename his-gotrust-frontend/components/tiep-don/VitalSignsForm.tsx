'use client';

import { HeartIcon } from '@heroicons/react/24/outline';
import { ThongTinVaoVien, ThongTinTiepDon } from '@/types/patient';

interface VitalSignsFormProps {
  vaoVienData: ThongTinVaoVien;
  tiepDonData: ThongTinTiepDon;
  onChangeVaoVien: (data: ThongTinVaoVien) => void;
  onChangeTiepDon: (data: ThongTinTiepDon) => void;
}

const priorityOptions = [
  { value: 'Cấp cứu', color: 'bg-red-500', textColor: 'text-white', dotColor: 'bg-red-400', description: 'Nguy hiểm tính mạng' },
  { value: 'Ưu tiên', color: 'bg-orange-500', textColor: 'text-white', dotColor: 'bg-orange-400', description: 'Cần can thiệp sớm' },
  { value: 'Thường', color: 'bg-emerald-500', textColor: 'text-white', dotColor: 'bg-emerald-400', description: 'Khám theo thứ tự' },
];

export default function VitalSignsForm({ 
  vaoVienData, 
  tiepDonData,
  onChangeVaoVien,
  onChangeTiepDon 
}: VitalSignsFormProps) {
  
  const handleVaoVienChange = (field: keyof ThongTinVaoVien, value: string) => {
    onChangeVaoVien({ ...vaoVienData, [field]: value });
  };

  const handlePriorityChange = (value: 'Cấp cứu' | 'Ưu tiên' | 'Thường') => {
    onChangeTiepDon({ ...tiepDonData, mucDoUuTien: value });
  };

  const getPriorityStyle = (option: typeof priorityOptions[0], isSelected: boolean) => {
    if (isSelected) {
      return `${option.color} ${option.textColor}`;
    }
    return 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-gray-500';
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <span className="text-red-500 text-xl">❋</span>
        <h2 className="text-white font-semibold text-lg">Sinh hiệu & Phân loại bệnh (Triage)</h2>
      </div>

      {/* Vital Signs */}
      <div className="grid grid-cols-7 gap-3">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Mạch (BPM)
          </label>
          <input
            type="text"
            value={vaoVienData.mach}
            onChange={(e) => handleVaoVienChange('mach', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#2a3441] text-white rounded-lg border border-gray-600 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            HA Tâm thu
          </label>
          <input
            type="text"
            value={vaoVienData.huyetap_tamthu}
            onChange={(e) => handleVaoVienChange('huyetap_tamthu', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#2a3441] text-white rounded-lg border border-gray-600 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            HA Tâm trương
          </label>
          <input
            type="text"
            value={vaoVienData.huyetap_tamtruong}
            onChange={(e) => handleVaoVienChange('huyetap_tamtruong', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#2a3441] text-white rounded-lg border border-gray-600 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nhiệt độ (°C)
          </label>
          <input
            type="text"
            value={vaoVienData.nhietdo}
            onChange={(e) => handleVaoVienChange('nhietdo', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="36.5"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nhịp thở
          </label>
          <input
            type="text"
            value={vaoVienData.nhiptho}
            onChange={(e) => handleVaoVienChange('nhiptho', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            SpO2 (%)
          </label>
          <input
            type="text"
            value={vaoVienData.spo2 || ''}
            onChange={(e) => handleVaoVienChange('spo2', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="98"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Cân nặng (kg)
          </label>
          <input
            type="text"
            value={vaoVienData.cannang}
            onChange={(e) => handleVaoVienChange('cannang', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Chiều cao (cm)
          </label>
          <input
            type="text"
            value={vaoVienData.chieucao}
            onChange={(e) => handleVaoVienChange('chieucao', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm text-center"
            placeholder="--"
          />
        </div>
        <div className="col-span-6">
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Khám toàn thân
          </label>
          <input
            type="text"
            value={vaoVienData.khambenh_toanthan}
            onChange={(e) => handleVaoVienChange('khambenh_toanthan', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
            placeholder="VD: tỉnh táo, tiếp xúc tốt..."
          />
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-gray-400 text-xs mb-3 uppercase tracking-wide">
          Mức độ ưu tiên <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          {priorityOptions.map((option) => {
            const isSelected = tiepDonData.mucDoUuTien === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handlePriorityChange(option.value as 'Cấp cứu' | 'Ưu tiên' | 'Thường')}
                className={`flex-1 flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-lg font-medium transition-all ${getPriorityStyle(option, isSelected)}`}
              >
                <div className="flex items-center gap-2">
                  <span>{option.value}</span>
                  <span className={`w-3 h-3 rounded-full ${isSelected ? option.dotColor : 'bg-gray-600'}`}></span>
                </div>
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
