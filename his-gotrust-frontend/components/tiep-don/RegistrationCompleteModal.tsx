'use client';

import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon, PrinterIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan, ThongTinVaoVien, ThongTinTiepDon } from '@/types/patient';

interface RegistrationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientData: ThongTinBenhNhan;
  vaoVienData: ThongTinVaoVien;
  tiepDonData: ThongTinTiepDon;
}

interface PhongKhamOption {
  ma: string;
  ten: string;
  viTri: string;
  soThuTu: number;
  thoiGianCho: string;
}

const phongKhamOptions: PhongKhamOption[] = [
  { ma: 'PK01', ten: 'Phòng khám Nội 01', viTri: 'Tầng 1 - Khu A', soThuTu: 15, thoiGianCho: '~20 phút' },
  { ma: 'PK02', ten: 'Phòng khám Nội 02', viTri: 'Tầng 1 - Khu A', soThuTu: 8, thoiGianCho: '~10 phút' },
  { ma: 'PK03', ten: 'Phòng khám Ngoại', viTri: 'Tầng 1 - Khu B', soThuTu: 12, thoiGianCho: '~15 phút' },
  { ma: 'PK04', ten: 'Phòng khám Sản', viTri: 'Tầng 2 - Khu C', soThuTu: 5, thoiGianCho: '~8 phút' },
  { ma: 'PK05', ten: 'Phòng khám Nhi', viTri: 'Tầng 2 - Khu D', soThuTu: 20, thoiGianCho: '~25 phút' },
  { ma: 'PKCC', ten: 'Phòng Cấp cứu', viTri: 'Tầng 1 - Khu Cấp cứu', soThuTu: 0, thoiGianCho: 'Ưu tiên' },
];

export default function RegistrationCompleteModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  patientData,
  vaoVienData,
  tiepDonData
}: RegistrationCompleteModalProps) {
  const [step, setStep] = useState<'review' | 'select_room' | 'success'>('review');
  const [selectedRoom, setSelectedRoom] = useState<PhongKhamOption | null>(null);
  const [queueNumber, setQueueNumber] = useState<string>('');

  const handleSelectRoom = (room: PhongKhamOption) => {
    setSelectedRoom(room);
  };

  const handleConfirmRoom = () => {
    if (selectedRoom) {
      // Generate queue number
      const prefix = tiepDonData.mucDoUuTien === 'Cấp cứu' ? 'CC' : 
                     tiepDonData.mucDoUuTien === 'Ưu tiên' ? 'UT' : 'TH';
      const num = (selectedRoom.soThuTu + 1).toString().padStart(3, '0');
      setQueueNumber(`${prefix}-${num}`);
      setStep('success');
    }
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    alert('In phiếu khám...');
  };

  const handleComplete = () => {
    onConfirm();
    onClose();
    setStep('review');
    setSelectedRoom(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cấp cứu': return 'text-red-500 bg-red-500/20';
      case 'Ưu tiên': return 'text-orange-500 bg-orange-500/20';
      default: return 'text-green-500 bg-green-500/20';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1a1f2e] rounded-2xl w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {step === 'review' && 'Xác nhận thông tin đăng ký'}
            {step === 'select_room' && 'Chọn phòng khám'}
            {step === 'success' && 'Đăng ký thành công'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'review' && (
            <div className="space-y-4">
              {/* Patient Summary */}
              <div className="bg-[#0f1419] rounded-xl p-4">
                <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Thông tin bệnh nhân</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Mã BN:</span>
                    <span className="text-white ml-2 font-medium">{patientData.mabenhnhan}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Họ tên:</span>
                    <span className="text-white ml-2 font-medium">{patientData.hoten || '---'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày sinh:</span>
                    <span className="text-white ml-2">{patientData.ngaysinh || '---'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Giới tính:</span>
                    <span className="text-white ml-2">{patientData.gioitinh}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Số CCCD:</span>
                    <span className="text-white ml-2">{patientData.cccd_so || '---'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SĐT:</span>
                    <span className="text-white ml-2">{patientData.sodienthoai || '---'}</span>
                  </div>
                </div>
              </div>

              {/* Reception Info */}
              <div className="bg-[#0f1419] rounded-xl p-4">
                <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Thông tin tiếp nhận</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Số vào viện:</span>
                    <span className="text-white ml-2 font-medium">{tiepDonData.sovaovien}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Thời gian:</span>
                    <span className="text-white ml-2">{tiepDonData.thoigianvaovien}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Lý do khám:</span>
                    <span className="text-white ml-2">{vaoVienData.lydovaovien || '---'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Đối tượng:</span>
                    <span className="text-white ml-2">{patientData.doituongbn_loai || 'Viện phí'}</span>
                  </div>
                </div>
              </div>

              {/* Vital Signs & Triage */}
              <div className="bg-[#0f1419] rounded-xl p-4">
                <h3 className="text-gray-400 text-xs uppercase tracking-wide mb-3">Sinh hiệu & Phân loại</h3>
                <div className="grid grid-cols-4 gap-3 text-sm mb-3">
                  <div className="text-center p-2 bg-[#1a1f2e] rounded-lg">
                    <p className="text-gray-500 text-xs">Mạch</p>
                    <p className="text-white font-medium">{vaoVienData.mach || '--'} bpm</p>
                  </div>
                  <div className="text-center p-2 bg-[#1a1f2e] rounded-lg">
                    <p className="text-gray-500 text-xs">Huyết áp</p>
                    <p className="text-white font-medium">
                      {vaoVienData.huyetap_tamthu || '--'}/{vaoVienData.huyetap_tamtruong || '--'}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-[#1a1f2e] rounded-lg">
                    <p className="text-gray-500 text-xs">Nhiệt độ</p>
                    <p className="text-white font-medium">{vaoVienData.nhietdo || '--'}°C</p>
                  </div>
                  <div className="text-center p-2 bg-[#1a1f2e] rounded-lg">
                    <p className="text-gray-500 text-xs">SpO2</p>
                    <p className="text-white font-medium">{vaoVienData.spo2 || '--'}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(tiepDonData.mucDoUuTien)}`}>
                    Mức độ: {tiepDonData.mucDoUuTien}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 'select_room' && (
            <div className="space-y-3">
              <p className="text-gray-400 text-sm mb-4">
                Chọn phòng khám phù hợp cho bệnh nhân:
              </p>
              {phongKhamOptions.map((room) => (
                <button
                  key={room.ma}
                  onClick={() => handleSelectRoom(room)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedRoom?.ma === room.ma
                      ? 'bg-[#0ea5e9]/20 border-2 border-[#0ea5e9]'
                      : 'bg-[#0f1419] border-2 border-transparent hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{room.ten}</h4>
                      <p className="text-gray-500 text-sm">{room.viTri}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Số thứ tự hiện tại</p>
                      <p className="text-2xl font-bold text-white">{room.soThuTu}</p>
                      <p className="text-gray-500 text-xs">{room.thoiGianCho}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Đăng ký tiếp đón thành công!
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Bệnh nhân đã được thêm vào danh sách chờ khám
              </p>

              {/* Queue Ticket Preview */}
              <div className="bg-gradient-to-br from-[#0ea5e9] to-[#06b6d4] rounded-2xl p-6 mx-auto max-w-xs">
                <p className="text-white/80 text-sm mb-1">Số thứ tự</p>
                <p className="text-white text-5xl font-bold mb-4">{queueNumber}</p>
                <div className="border-t border-white/30 pt-4 space-y-2 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Bệnh nhân:</span>
                    <span className="text-white font-medium">{patientData.hoten || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Phòng khám:</span>
                    <span className="text-white font-medium">{selectedRoom?.ten}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Vị trí:</span>
                    <span className="text-white font-medium">{selectedRoom?.viTri}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700">
          {step === 'review' && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#0f1419] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                onClick={() => setStep('select_room')}
                className="flex items-center gap-2 px-6 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors font-medium"
              >
                Tiếp tục
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'select_room' && (
            <>
              <button
                onClick={() => setStep('review')}
                className="px-4 py-2 bg-[#0f1419] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
              >
                Quay lại
              </button>
              <button
                onClick={handleConfirmRoom}
                disabled={!selectedRoom}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedRoom
                    ? 'bg-[#0ea5e9] text-white hover:bg-[#0284c7]'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Xác nhận phòng khám
                <CheckCircleIcon className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'success' && (
            <>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-[#0f1419] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
              >
                <PrinterIcon className="w-4 h-4" />
                In phiếu khám
              </button>
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors font-medium"
              >
                Hoàn tất
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
