'use client';

import { useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { ThongTinBenhNhan } from '@/types/patient';

interface BHYTLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: ThongTinBenhNhan;
  onUpdateInsurance: (data: Partial<ThongTinBenhNhan>) => void;
}

type LookupStep = 'searching' | 'success' | 'not_found' | 'expired';

interface BHYTInfo {
  maThe: string;
  hoTen: string;
  ngaySinh: string;
  gioiTinh: string;
  diaChi: string;
  maCSKCBBanDau: string;
  tenCSKCBBanDau: string;
  gtTheTu: string;
  gtTheDen: string;
  maKV: string;
  ngayDu5Nam: string;
  maSoBHXH: string;
  trangThai: 'active' | 'expired' | 'not_found';
}

interface LichSuKCB {
  ngayKham: string;
  noiKham: string;
  chandoan: string;
  loaiKCB: string;
  tongChi: string;
  bhytChi: string;
}

// Mock BHYT data
const mockBHYTInfo: BHYTInfo = {
  maThe: 'DN495752667xxxx',
  hoTen: 'Trần Thị B',
  ngaySinh: '01/01/1999',
  gioiTinh: 'Nữ',
  diaChi: 'Khóm 07, Thành Phố Bạc Liêu, Bạc Liêu',
  maCSKCBBanDau: '79025',
  tenCSKCBBanDau: 'BVĐK TỈNH BẠC LIÊU',
  gtTheTu: '01/01/2024',
  gtTheDen: '31/12/2024',
  maKV: 'K1',
  ngayDu5Nam: '01/01/2019',
  maSoBHXH: '7912345678',
  trangThai: 'active',
};

const mockLichSuKCB: LichSuKCB[] = [
  {
    ngayKham: '15/12/2025',
    noiKham: 'BVĐK Tỉnh Bạc Liêu',
    chandoan: 'Viêm họng cấp (J02.9)',
    loaiKCB: 'Ngoại trú',
    tongChi: '450,000',
    bhytChi: '360,000',
  },
  {
    ngayKham: '20/10/2025',
    noiKham: 'BVĐK Tỉnh Bạc Liêu',
    chandoan: 'Đau dạ dày (K29.7)',
    loaiKCB: 'Ngoại trú',
    tongChi: '680,000',
    bhytChi: '544,000',
  },
  {
    ngayKham: '05/08/2025',
    noiKham: 'BV Chợ Rẫy',
    chandoan: 'Khám sức khỏe định kỳ',
    loaiKCB: 'Ngoại trú',
    tongChi: '350,000',
    bhytChi: '280,000',
  },
];

export default function BHYTLookupModal({ 
  isOpen, 
  onClose, 
  patientData,
  onUpdateInsurance 
}: BHYTLookupModalProps) {
  const [step, setStep] = useState<LookupStep>('searching');
  const [bhytInfo, setBhytInfo] = useState<BHYTInfo | null>(null);
  const [lichSuKCB] = useState<LichSuKCB[]>(mockLichSuKCB);
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');

  // Simulate lookup
  useState(() => {
    if (isOpen) {
      setStep('searching');
      const timer = setTimeout(() => {
        setBhytInfo(mockBHYTInfo);
        setStep('success');
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  const handleConfirm = () => {
    if (bhytInfo) {
      onUpdateInsurance({
        mabhyt: bhytInfo.maThe,
        tungaybhyt: bhytInfo.gtTheTu,
        denngaybhyt: bhytInfo.gtTheDen,
        noidangkykcbbd: bhytInfo.tenCSKCBBanDau,
        doituongbn_loai: 'BHYT',
      });
    }
    onClose();
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
      <div className="relative bg-[#1a1f2e] rounded-2xl w-full max-w-3xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Tra cứu thông tin BHYT</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'searching' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Đang tra cứu thông tin BHYT...
              </h3>
              <p className="text-gray-400 text-sm">
                Kết nối cổng BHXH Việt Nam
              </p>
            </div>
          )}

          {step === 'success' && bhytInfo && (
            <>
              {/* Status Badge */}
              <div className="flex items-center justify-center mb-6">
                {bhytInfo.trangThai === 'active' ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-green-500 font-medium">Thẻ BHYT còn hiệu lực</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                    <span className="text-red-500 font-medium">Thẻ BHYT hết hiệu lực</span>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === 'info'
                      ? 'bg-[#0ea5e9] text-white'
                      : 'bg-[#0f1419] text-gray-400 hover:text-white'
                  }`}
                >
                  Thông tin thẻ BHYT
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === 'history'
                      ? 'bg-[#0ea5e9] text-white'
                      : 'bg-[#0f1419] text-gray-400 hover:text-white'
                  }`}
                >
                  Lịch sử KCB ({lichSuKCB.length})
                </button>
              </div>

              {activeTab === 'info' && (
                <div className="bg-[#0f1419] rounded-xl p-5 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Mã thẻ BHYT</p>
                      <p className="text-white text-xl font-bold tracking-wider">{bhytInfo.maThe}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs uppercase tracking-wide">Mã số BHXH</p>
                      <p className="text-white text-lg font-medium">{bhytInfo.maSoBHXH}</p>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Họ và tên</p>
                      <p className="text-white font-medium">{bhytInfo.hoTen}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Ngày sinh</p>
                      <p className="text-white font-medium">{bhytInfo.ngaySinh}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Giới tính</p>
                      <p className="text-white font-medium">{bhytInfo.gioiTinh}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Mã khu vực</p>
                      <p className="text-white font-medium">{bhytInfo.maKV}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 text-xs uppercase">Địa chỉ</p>
                      <p className="text-white font-medium">{bhytInfo.diaChi}</p>
                    </div>
                  </div>

                  {/* CSKCB Info */}
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-gray-500 text-xs uppercase mb-2">Nơi đăng ký KCB ban đầu</p>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-[#0ea5e9]/20 text-[#0ea5e9] rounded text-sm font-medium">
                        {bhytInfo.maCSKCBBanDau}
                      </span>
                      <span className="text-white font-medium">{bhytInfo.tenCSKCBBanDau}</span>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Giá trị từ</p>
                        <p className="text-white font-medium">{bhytInfo.gtTheTu}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Giá trị đến</p>
                        <p className="text-white font-medium">{bhytInfo.gtTheDen}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase">Ngày đủ 5 năm</p>
                        <p className="text-white font-medium">{bhytInfo.ngayDu5Nam}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-3">
                  {lichSuKCB.map((kcb, index) => (
                    <div key={index} className="bg-[#0f1419] rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-gray-500" />
                          <span className="text-white font-medium">{kcb.ngayKham}</span>
                          <span className="px-2 py-0.5 bg-[#0ea5e9]/20 text-[#0ea5e9] rounded text-xs">
                            {kcb.loaiKCB}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{kcb.noiKham}</p>
                      <p className="text-white text-sm mb-3">{kcb.chandoan}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Tổng chi: </span>
                          <span className="text-white font-medium">{kcb.tongChi} đ</span>
                        </div>
                        <div>
                          <span className="text-gray-500">BHYT chi trả: </span>
                          <span className="text-green-500 font-medium">{kcb.bhytChi} đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'not_found' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <ExclamationCircleIcon className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Không tìm thấy thông tin BHYT
              </h3>
              <p className="text-gray-400 text-sm">
                Vui lòng kiểm tra lại số CCCD hoặc số thẻ BHYT
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'success' && (
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#0f1419] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
            >
              Đóng
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors font-medium"
            >
              Cập nhật thông tin BHYT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
