'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HeaderNew from '@/components/tiep-don/HeaderNew';
import PatientInfoForm from '@/components/tiep-don/PatientInfoForm';
import InsuranceForm from '@/components/tiep-don/InsuranceForm';
import RelativeInfoForm from '@/components/tiep-don/RelativeInfoForm';
import ReceptionInfoForm from '@/components/tiep-don/ReceptionInfoForm';
import VitalSignsForm from '@/components/tiep-don/VitalSignsForm';
import MedicalHistoryForm from '@/components/tiep-don/MedicalHistoryForm';
import WaitingList from '@/components/tiep-don/WaitingList';
import CCCDVerificationModal from '@/components/tiep-don/CCCDVerificationModal';
import BHYTLookupModal from '@/components/tiep-don/BHYTLookupModal';
import RegistrationCompleteModal from '@/components/tiep-don/RegistrationCompleteModal';
import { ThongTinBenhNhan, ThongTinVaoVien, ThongTinTiepDon, CCCDData } from '@/types/patient';

// Helper function to generate patient ID
const generatePatientId = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `BN.${year}${month}${day}${random}`;
};

// Helper function to generate admission number
const generateSoVaoVien = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `${year}.${month}.${day}.${random}`;
};

// Helper function to calculate age
const calculateAge = (birthDate: string): string => {
  if (!birthDate) return '';
  const parts = birthDate.split('/');
  if (parts.length !== 3) return '';
  
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const year = parseInt(parts[2]);
  
  const birth = new Date(year, month, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age.toString();
};

// Helper function to get current datetime
const getCurrentDateTime = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const initialPatientData: ThongTinBenhNhan = {
  mabenhnhan: generatePatientId(),
  hoten: '',
  ngaysinh: '',
  tuoi: '',
  gioitinh: 'Nam',
  cccd_so: '',
  hochieu_so: '',
  sodienthoai: '',
  diachi: '',
  sonha: '',
  thonpho: '',
  xaphuong: '',
  quanhuyen: '',
  quanhuyen_ma: '',
  tinhthanh: '',
  tinhthanh_ma: '',
  nghenghiep: '',
  nghenghiep_ma: '',
  dantoc: 'Kinh',
  dantoc_ma: '25',
  ngoaikieu: 'VN',
  ngoaikieu_ma: '',
  mabhyt: '',
  tungaybhyt: '',
  denngaybhyt: '',
  noidangkykcbbd: '',
  doituongbn_loai: '',
  nhommau: '',
  yeutorh: '',
  hotennguoithan: '',
  diachinguoithan: '',
  sodienthoainguoithan: '',
  tiensubenhtatcuabanthan: [],
  tiensubenhtatcuagiadinh: '',
};

const initialVaoVienData: ThongTinVaoVien = {
  sovaovien: generateSoVaoVien(),
  sophieu: '',
  phongkham: '',
  maphongkham: '',
  bacsikhambenh: '',
  mabacsikhambenh: '',
  lydovaovien: '',
  quatrinhbenhly: '',
  chandoancuanoigioithieu: '',
  chandoansobo: '',
  chandoanvaovien: '',
  khambenh_chandoanvaovienmaicd: '',
  mach: '',
  nhietdo: '37.0',
  nhiptho: '',
  huyetap_tamthu: '',
  huyetap_tamtruong: '',
  cannang: '',
  chieucao: '',
  spo2: '98',
  khambenh_toanthan: '',
  denkhambenhluc: getCurrentDateTime(),
  dieutritaikhoa: '',
  madieutritaikhoa: '',
};

const initialTiepDonData: ThongTinTiepDon = {
  loaiba: '01/BV1',
  sovaovien: generateSoVaoVien(),
  soba: '',
  soluutru: '',
  makhoa: '01',
  tenkhoa: 'Khoa khám bệnh',
  thoigianvaovien: getCurrentDateTime(),
  buong: '',
  giuong: '',
  lydotiepnhan: 'Khám bệnh',
  noigioithieu_loai: 'Tự đến',
  mucDoUuTien: 'Thường',
};

export default function TiepDonPage() {
  const [patientData, setPatientData] = useState<ThongTinBenhNhan>(initialPatientData);
  const [vaoVienData, setVaoVienData] = useState<ThongTinVaoVien>(initialVaoVienData);
  const [tiepDonData, setTiepDonData] = useState<ThongTinTiepDon>(initialTiepDonData);
  
  const [isCCCDModalOpen, setIsCCCDModalOpen] = useState(false);
  const [isBHYTModalOpen, setIsBHYTModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const [stats] = useState({
    daTiepNhan: 142,
    dangChoKham: 28,
  });

  const [waitingPatients] = useState([
    { id: 'BN29381', name: 'Lê Văn Hùng', priority: 'Cấp cứu', department: 'P. Cấp cứu 01' },
    { id: 'BN29382', name: 'Trần Thị Bích', priority: 'Ưu tiên', department: 'Nội soi tiêu hoá' },
    { id: 'BN29383', name: 'Nguyễn Minh Quân', priority: 'Thường', department: 'Khám Nội 02' },
    { id: 'BN29384', name: 'Phạm Thành Nam', priority: 'Thường', department: 'Khám Ngoại 01' },
    { id: 'BN29385', name: 'Hoàng Diệu Thu', priority: 'Thường', department: 'Khám Sản' },
  ]);

  // Handle CCCD verification callback
  const handleCCCDVerified = (cccdData: CCCDData) => {
    // Auto-fill patient data from CCCD
    const age = calculateAge(cccdData.ngaysinh);
    const fullAddress = `${cccdData.xaphuong}, ${cccdData.quanhuyen}, ${cccdData.tinhthanh}`;
    
    setPatientData(prev => ({
      ...prev,
      cccd_so: cccdData.cccd_so,
      hoten: cccdData.hoten,
      ngaysinh: cccdData.ngaysinh,
      tuoi: age,
      gioitinh: cccdData.gioitinh,
      tinhthanh: cccdData.tinhthanh,
      quanhuyen: cccdData.quanhuyen,
      xaphuong: cccdData.xaphuong,
      diachi: fullAddress,
    }));
  };

  // Handle patient data change with auto-calculate age
  const handlePatientDataChange = (data: ThongTinBenhNhan) => {
    const age = calculateAge(data.ngaysinh);
    const fullAddress = data.sonha 
      ? `${data.sonha}, ${data.xaphuong}, ${data.quanhuyen}, ${data.tinhthanh}`
      : `${data.xaphuong}, ${data.quanhuyen}, ${data.tinhthanh}`;
    
    setPatientData({
      ...data,
      tuoi: age,
      diachi: fullAddress.replace(/^, |, $/g, '').replace(/, ,/g, ','),
    });
  };

  const handleSubmit = () => {
    console.log('=== THÔNG TIN TIẾP ĐÓN ===');
    console.log('Thông tin bệnh nhân:', patientData);
    console.log('Thông tin vào viện:', vaoVienData);
    console.log('Thông tin tiếp đón:', tiepDonData);
    
    // Mở modal hoàn tất đăng ký
    setIsRegistrationModalOpen(true);
  };

  const handleBHYTLookup = () => {
    setIsBHYTModalOpen(true);
  };

  const handleUpdateInsurance = (insuranceData: Partial<ThongTinBenhNhan>) => {
    setPatientData(prev => ({ ...prev, ...insuranceData }));
  };

  const handleCancel = () => {
    setPatientData({
      ...initialPatientData,
      mabenhnhan: generatePatientId(),
    });
    setVaoVienData({
      ...initialVaoVienData,
      sovaovien: generateSoVaoVien(),
      denkhambenhluc: getCurrentDateTime(),
    });
    setTiepDonData({
      ...initialTiepDonData,
      sovaovien: generateSoVaoVien(),
      thoigianvaovien: getCurrentDateTime(),
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0f1419]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <HeaderNew 
          stats={stats} 
          onVerifyCCCD={() => setIsCCCDModalOpen(true)}
        />

        <div className="flex flex-1 p-6 gap-6 overflow-hidden">
          {/* Form Section - Scrollable */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {/* Row 1: Patient Info */}
            <PatientInfoForm 
              data={patientData} 
              onChange={handlePatientDataChange} 
            />

            {/* Row 2: Insurance & Relative Info */}
            <div className="grid grid-cols-2 gap-4">
              <InsuranceForm 
                data={patientData} 
                onChange={setPatientData}
                onLookupBHYT={handleBHYTLookup}
              />
              <RelativeInfoForm 
                data={patientData} 
                onChange={setPatientData} 
              />
            </div>

            {/* Row 3: Reception Info */}
            <ReceptionInfoForm 
              tiepDonData={tiepDonData}
              vaoVienData={vaoVienData}
              onChangeTiepDon={setTiepDonData}
              onChangeVaoVien={setVaoVienData}
            />

            {/* Row 4: Vital Signs & Triage */}
            <VitalSignsForm 
              vaoVienData={vaoVienData}
              tiepDonData={tiepDonData}
              onChangeVaoVien={setVaoVienData}
              onChangeTiepDon={setTiepDonData}
            />

            {/* Row 5: Medical History */}
            <MedicalHistoryForm 
              data={patientData} 
              onChange={setPatientData} 
            />

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 py-4 sticky bottom-0 bg-[#0f1419]">
              <button
                onClick={handleCancel}
                className="px-8 py-3 bg-[#1e2530] text-white rounded-lg hover:bg-[#2a3441] transition-colors border border-gray-600 font-medium"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4] text-white rounded-lg hover:from-[#0284c7] hover:to-[#0891b2] transition-all font-medium shadow-lg shadow-cyan-500/25"
              >
                Hoàn tất đăng ký &amp; Phân khoa
              </button>
            </div>
          </div>

          {/* Waiting List - Fixed */}
          <WaitingList patients={waitingPatients} />
        </div>
      </div>

      {/* CCCD Verification Modal */}
      <CCCDVerificationModal
        isOpen={isCCCDModalOpen}
        onClose={() => setIsCCCDModalOpen(false)}
        onVerified={handleCCCDVerified}
      />

      {/* BHYT Lookup Modal */}
      <BHYTLookupModal
        isOpen={isBHYTModalOpen}
        onClose={() => setIsBHYTModalOpen(false)}
        patientData={patientData}
        onUpdateInsurance={handleUpdateInsurance}
      />

      {/* Registration Complete Modal */}
      <RegistrationCompleteModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        patientData={patientData}
        vaoVienData={vaoVienData}
        tiepDonData={tiepDonData}
        onConfirm={() => {
          // Reset form sau khi đóng modal
          handleCancel();
        }}
      />
    </div>
  );
}
