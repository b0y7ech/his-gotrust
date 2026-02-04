'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CCCDData } from '@/types/patient';

interface CCCDVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: (data: CCCDData) => void;
}

type VerificationStep = 'scanning' | 'verifying' | 'success' | 'error';

// Mock CCCD data for demo
const mockCCCDData: CCCDData = {
  cccd_so: '079099012345',
  hoten: 'Trần Thị B',
  ngaysinh: '01/01/1999',
  gioitinh: 'Nữ',
  diachi: 'Khóm 07, Thành Phố Bạc Liêu, Bạc Liêu',
  tinhthanh: 'Bạc Liêu',
  quanhuyen: 'Thành Phố Bạc Liêu',
  xaphuong: 'Phường 7',
};

export default function CCCDVerificationModal({ 
  isOpen, 
  onClose, 
  onVerified 
}: CCCDVerificationModalProps) {
  const [step, setStep] = useState<VerificationStep>('scanning');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setStep('scanning');
      setProgress(0);
      return;
    }

    // Simulate scanning process
    const scanTimer = setTimeout(() => {
      setStep('verifying');
    }, 2000);

    // Simulate verification process
    const verifyTimer = setTimeout(() => {
      setStep('success');
    }, 4000);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 80);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(verifyTimer);
      clearInterval(progressInterval);
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onVerified(mockCCCDData);
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
      <div className="relative bg-[#1a1f2e] rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Content based on step */}
        <div className="text-center">
          {step === 'scanning' && (
            <>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#0ea5e9] border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Đang quét CCCD...
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Vui lòng đặt CCCD vào đầu đọc
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-[#0ea5e9] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 50)}%` }}
                />
              </div>
            </>
          )}

          {step === 'verifying' && (
            <>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Đang xác thực...
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Kết nối cơ sở dữ liệu quốc gia
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Xác thực thành công!
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Thông tin CCCD đã được xác thực
              </p>

              {/* Display extracted data */}
              <div className="bg-[#0f1419] rounded-lg p-4 text-left mb-6">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Số CCCD:</span>
                    <p className="text-white font-medium">{mockCCCDData.cccd_so}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Họ và tên:</span>
                    <p className="text-white font-medium">{mockCCCDData.hoten}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày sinh:</span>
                    <p className="text-white font-medium">{mockCCCDData.ngaysinh}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Giới tính:</span>
                    <p className="text-white font-medium">{mockCCCDData.gioitinh}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Địa chỉ:</span>
                    <p className="text-white font-medium">{mockCCCDData.diachi}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-[#0f1419] text-gray-300 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-4 py-2.5 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors font-medium"
                >
                  Xác nhận điền thông tin
                </button>
              </div>
            </>
          )}

          {step === 'error' && (
            <>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <ExclamationCircleIcon className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Xác thực thất bại
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Không thể đọc thông tin CCCD. Vui lòng thử lại.
              </p>
              <button
                onClick={() => setStep('scanning')}
                className="px-6 py-2.5 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors"
              >
                Thử lại
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
