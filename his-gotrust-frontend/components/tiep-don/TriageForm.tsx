'use client';

import { HeartIcon } from '@heroicons/react/24/outline';

interface TriageData {
  mach: string;
  huyetAp: string;
  nhietDo: string;
  spo2: string;
  mucDoUuTien: string;
}

interface TriageFormProps {
  data: TriageData;
  onChange: (data: TriageData) => void;
}

const priorityOptions = [
  { value: 'Cấp cứu', color: 'bg-red-500', textColor: 'text-white', dotColor: 'bg-red-400' },
  { value: 'Ưu tiên', color: 'bg-orange-500', textColor: 'text-white', dotColor: 'bg-orange-400' },
  { value: 'Thường', color: 'bg-emerald-500', textColor: 'text-white', dotColor: 'bg-emerald-400' },
];

export default function TriageForm({ data, onChange }: TriageFormProps) {
  const handleChange = (field: keyof TriageData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const getPriorityStyle = (option: typeof priorityOptions[0], isSelected: boolean) => {
    if (isSelected) {
      return `${option.color} ${option.textColor}`;
    }
    return 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-gray-500';
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-red-500 text-xl">❋</span>
        <h2 className="text-white font-semibold text-lg">Phân loại bệnh (Triage)</h2>
      </div>

      {/* Vital Signs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Mạch */}
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Mạch (BPM)
          </label>
          <input
            type="text"
            placeholder="--"
            value={data.mach}
            onChange={(e) => handleChange('mach', e.target.value)}
            className="w-full px-4 py-3 bg-[#2a3441] text-white rounded-lg border border-gray-600 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-center"
          />
        </div>

        {/* Huyết áp */}
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Huyết áp (MMHG)
          </label>
          <input
            type="text"
            placeholder="--/--"
            value={data.huyetAp}
            onChange={(e) => handleChange('huyetAp', e.target.value)}
            className="w-full px-4 py-3 bg-[#2a3441] text-white rounded-lg border border-gray-600 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-center"
          />
        </div>

        {/* Nhiệt độ */}
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Nhiệt độ (°C)
          </label>
          <input
            type="text"
            placeholder="36.5"
            value={data.nhietDo}
            onChange={(e) => handleChange('nhietDo', e.target.value)}
            className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-center"
          />
        </div>

        {/* SpO2 */}
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            SpO2 (%)
          </label>
          <input
            type="text"
            placeholder="98"
            value={data.spo2}
            onChange={(e) => handleChange('spo2', e.target.value)}
            className="w-full px-4 py-3 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-center"
          />
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-gray-400 text-xs mb-3 uppercase tracking-wide">
          Mức độ ưu tiên
        </label>
        <div className="flex gap-4">
          {priorityOptions.map((option) => {
            const isSelected = data.mucDoUuTien === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleChange('mucDoUuTien', option.value)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${getPriorityStyle(option, isSelected)}`}
              >
                <span>{option.value}</span>
                <span className={`w-3 h-3 rounded-full ${isSelected ? option.dotColor : 'bg-gray-600'}`}></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
