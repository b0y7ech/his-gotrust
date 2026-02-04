'use client';

import { DocumentTextIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan, TienSuBenh } from '@/types/patient';

interface MedicalHistoryFormProps {
  data: ThongTinBenhNhan;
  onChange: (data: ThongTinBenhNhan) => void;
}

const commonConditions = [
  'Dị ứng thuốc',
  'Dị ứng thức ăn',
  'Tiểu đường',
  'Cao huyết áp',
  'Tim mạch',
  'Hen suyễn',
  'Viêm gan',
  'HIV/AIDS',
  'Lao phổi',
  'Ung thư',
  'Ma túy',
  'Rượu bia',
  'Thuốc lá',
];

export default function MedicalHistoryForm({ data, onChange }: MedicalHistoryFormProps) {
  const handleAddCondition = (condition: string) => {
    const exists = data.tiensubenhtatcuabanthan.some(
      t => t.thongtin_noidung === condition
    );
    
    if (!exists) {
      const newCondition: TienSuBenh = {
        thongtin_ma: Date.now().toString(),
        thongtin_noidung: condition,
        thongtin_giatri: '1',
        thongtin_ghichu: '',
      };
      onChange({
        ...data,
        tiensubenhtatcuabanthan: [...data.tiensubenhtatcuabanthan, newCondition],
      });
    }
  };

  const handleRemoveCondition = (ma: string) => {
    onChange({
      ...data,
      tiensubenhtatcuabanthan: data.tiensubenhtatcuabanthan.filter(
        t => t.thongtin_ma !== ma
      ),
    });
  };

  const handleUpdateNote = (ma: string, note: string) => {
    onChange({
      ...data,
      tiensubenhtatcuabanthan: data.tiensubenhtatcuabanthan.map(t =>
        t.thongtin_ma === ma ? { ...t, thongtin_ghichu: note } : t
      ),
    });
  };

  const handleFamilyHistoryChange = (value: string) => {
    onChange({ ...data, tiensubenhtatcuagiadinh: value });
  };

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 pb-4">
        <DocumentTextIcon className="w-5 h-5 text-yellow-500" />
        <h2 className="text-white font-semibold text-lg">Tiền sử bệnh</h2>
      </div>

      {/* Quick Add Conditions */}
      <div>
        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
          Tiền sử bệnh bản thân (chọn nhanh)
        </label>
        <div className="flex flex-wrap gap-2">
          {commonConditions.map((condition) => {
            const isSelected = data.tiensubenhtatcuabanthan.some(
              t => t.thongtin_noidung === condition
            );
            return (
              <button
                key={condition}
                onClick={() => handleAddCondition(condition)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#0ea5e9] text-white'
                    : 'bg-[#0f1419] text-gray-400 border border-gray-700 hover:border-[#0ea5e9] hover:text-[#0ea5e9]'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}{condition}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Conditions with Notes */}
      {data.tiensubenhtatcuabanthan.length > 0 && (
        <div>
          <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
            Tiền sử đã chọn
          </label>
          <div className="space-y-2">
            {data.tiensubenhtatcuabanthan.map((condition) => (
              <div
                key={condition.thongtin_ma}
                className="flex items-center gap-3 bg-[#0f1419] rounded-lg p-3"
              >
                <span className="text-white text-sm font-medium min-w-[120px]">
                  {condition.thongtin_noidung}
                </span>
                <input
                  type="text"
                  value={condition.thongtin_ghichu}
                  onChange={(e) => handleUpdateNote(condition.thongtin_ma, e.target.value)}
                  placeholder="Ghi chú (thời gian, mức độ...)"
                  className="flex-1 px-3 py-1.5 bg-[#1a1f2e] text-white rounded border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm"
                />
                <button
                  onClick={() => handleRemoveCondition(condition.thongtin_ma)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Family History */}
      <div>
        <label className="block text-gray-400 text-xs mb-2 uppercase tracking-wide">
          Tiền sử bệnh gia đình
        </label>
        <textarea
          value={data.tiensubenhtatcuagiadinh}
          onChange={(e) => handleFamilyHistoryChange(e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 bg-[#0f1419] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500 text-sm resize-none"
          placeholder="Gia đình có ai mắc bệnh gì đặc biệt không? (tiểu đường, cao huyết áp, ung thư...)"
        />
      </div>
    </div>
  );
}
