'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  CalendarDaysIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Mock data for patients
const mockPatients = [
  { id: 'BN001', mabn: '123456789', hoten: 'Trần Minh Tuấn', tuoi: 45, gioitinh: 'Nam', diachi: 'Quận 1, TP.HCM', sodienthoai: '0901234567', bhyt: 'DN4567890123456', trangthai: 'Đang khám', phongkham: 'Phòng khám Nội 01', ngaytiepdon: '05/02/2026 08:30' },
  { id: 'BN002', mabn: '123456790', hoten: 'Nguyễn Thị Hương', tuoi: 32, gioitinh: 'Nữ', diachi: 'TP. Đà Nẵng', sodienthoai: '0912345678', bhyt: 'DN4567890123457', trangthai: 'Chờ khám', phongkham: 'Phòng khám Sản', ngaytiepdon: '05/02/2026 08:45' },
  { id: 'BN003', mabn: '123456791', hoten: 'Lê Văn Hùng', tuoi: 58, gioitinh: 'Nam', diachi: 'Quảng Trị', sodienthoai: '0923456789', bhyt: 'DN4567890123458', trangthai: 'Hoàn tất', phongkham: 'Phòng khám Ngoại', ngaytiepdon: '05/02/2026 07:30' },
  { id: 'BN004', mabn: '123456792', hoten: 'Phạm Thị Mai', tuoi: 28, gioitinh: 'Nữ', diachi: 'Quận 3, TP.HCM', sodienthoai: '0934567890', bhyt: '', trangthai: 'Đang khám', phongkham: 'Phòng khám Nhi', ngaytiepdon: '05/02/2026 09:00' },
  { id: 'BN005', mabn: '123456793', hoten: 'Võ Quốc Thắng', tuoi: 67, gioitinh: 'Nam', diachi: 'Quận 2, TP.HCM', sodienthoai: '0945678901', bhyt: 'DN4567890123460', trangthai: 'Cấp cứu', phongkham: 'Phòng Cấp cứu', ngaytiepdon: '05/02/2026 09:15' },
  { id: 'BN006', mabn: '123456794', hoten: 'Đỗ Thị Lan', tuoi: 41, gioitinh: 'Nữ', diachi: 'Quảng Bình', sodienthoai: '0956789012', bhyt: 'DN4567890123461', trangthai: 'Chờ khám', phongkham: 'Phòng khám Nội 02', ngaytiepdon: '05/02/2026 09:30' },
  { id: 'BN007', mabn: '123456795', hoten: 'Hoàng Đức Nam', tuoi: 52, gioitinh: 'Nam', diachi: 'Quảng Nam', sodienthoai: '0967890123', bhyt: 'DN4567890123462', trangthai: 'Hoàn tất', phongkham: 'Phòng khám Tim mạch', ngaytiepdon: '05/02/2026 08:00' },
  { id: 'BN008', mabn: '123456796', hoten: 'Bùi Thị Thu', tuoi: 35, gioitinh: 'Nữ', diachi: 'Quận 7, TP.HCM', sodienthoai: '0978901234', bhyt: '', trangthai: 'Đang khám', phongkham: 'Phòng khám Da liễu', ngaytiepdon: '05/02/2026 09:45' },
  { id: 'BN009', mabn: '123456797', hoten: 'Phan Văn Tài', tuoi: 73, gioitinh: 'Nam', diachi: 'Hà Tĩnh', sodienthoai: '0989012345', bhyt: 'DN4567890123464', trangthai: 'Chờ khám', phongkham: 'Phòng khám Nội 01', ngaytiepdon: '05/02/2026 10:00' },
  { id: 'BN010', mabn: '123456798', hoten: 'Ngô Thị Nhung', tuoi: 29, gioitinh: 'Nữ', diachi: 'Quận 10, TP.HCM', sodienthoai: '0990123456', bhyt: 'DN4567890123465', trangthai: 'Hoàn tất', phongkham: 'Phòng khám Mắt', ngaytiepdon: '05/02/2026 07:45' },
  { id: 'BN011', mabn: '123456799', hoten: 'Đinh Văn Long', tuoi: 48, gioitinh: 'Nam', diachi: 'Nghệ An', sodienthoai: '0901234568', bhyt: 'DN4567890123466', trangthai: 'Đang khám', phongkham: 'Phòng khám Ngoại', ngaytiepdon: '05/02/2026 10:15' },
  { id: 'BN012', mabn: '123456800', hoten: 'Dương Thị Hà', tuoi: 55, gioitinh: 'Nữ', diachi: 'TP. Đà Nẵng', sodienthoai: '0912345679', bhyt: 'DN4567890123467', trangthai: 'Chờ khám', phongkham: 'Phòng khám Nội 02', ngaytiepdon: '05/02/2026 10:30' },
];

const phongKhamOptions = [
  'Tất cả phòng khám',
  'Phòng khám Nội 01',
  'Phòng khám Nội 02',
  'Phòng khám Ngoại',
  'Phòng khám Sản',
  'Phòng khám Nhi',
  'Phòng Cấp cứu',
  'Phòng khám Tim mạch',
  'Phòng khám Da liễu',
  'Phòng khám Mắt',
];

const trangThaiOptions = [
  'Tất cả trạng thái',
  'Chờ khám',
  'Đang khám',
  'Hoàn tất',
  'Cấp cứu',
];

export default function BenhNhanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhongKham, setFilterPhongKham] = useState('Tất cả phòng khám');
  const [filterTrangThai, setFilterTrangThai] = useState('Tất cả trạng thái');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterNgayTu, setFilterNgayTu] = useState('');
  const [filterNgayDen, setFilterNgayDen] = useState('');
  const [filterBHYT, setFilterBHYT] = useState('Tất cả');
  const itemsPerPage = 10;

  // Dashboard stats
  const stats = {
    tongBenhNhan: 1245,
    tongBenhNhanHomNay: 142,
    dangKham: 28,
    choKham: 45,
    hoanTat: 65,
    capCuu: 4,
    tangSoVoiHomQua: 12,
    tyLeBHYT: 78,
  };

  // Filter patients
  const filteredPatients = mockPatients.filter(patient => {
    const matchSearch = 
      patient.hoten.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mabn.includes(searchTerm) ||
      patient.sodienthoai.includes(searchTerm);
    
    const matchPhongKham = filterPhongKham === 'Tất cả phòng khám' || patient.phongkham === filterPhongKham;
    const matchTrangThai = filterTrangThai === 'Tất cả trạng thái' || patient.trangthai === filterTrangThai;
    const matchBHYT = filterBHYT === 'Tất cả' || 
      (filterBHYT === 'Có BHYT' && patient.bhyt) || 
      (filterBHYT === 'Không BHYT' && !patient.bhyt);

    return matchSearch && matchPhongKham && matchTrangThai && matchBHYT;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cấp cứu': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Đang khám': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Chờ khám': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hoàn tất': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterPhongKham('Tất cả phòng khám');
    setFilterTrangThai('Tất cả trạng thái');
    setFilterNgayTu('');
    setFilterNgayDen('');
    setFilterBHYT('Tất cả');
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen bg-[#0f1419]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#1a1f2e] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Danh sách bệnh nhân</h1>
              <p className="text-gray-400 text-sm mt-1">Quản lý và theo dõi thông tin bệnh nhân</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-400 text-sm">Hôm nay</p>
                <p className="text-white font-medium">05/02/2026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            {/* Total Patients Card */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <UserGroupIcon className="w-8 h-8 text-cyan-400" />
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <ArrowTrendingUpIcon className="w-3 h-3" />
                  +{stats.tangSoVoiHomQua}%
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.tongBenhNhanHomNay}</p>
              <p className="text-gray-400 text-sm">Bệnh nhân hôm nay</p>
            </div>

            {/* Waiting Patients */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <ClockIcon className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.choKham}</p>
              <p className="text-gray-400 text-sm">Đang chờ khám</p>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.dangKham}</p>
              <p className="text-gray-400 text-sm">Đang khám</p>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <CheckCircleIcon className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.hoanTat}</p>
              <p className="text-gray-400 text-sm">Hoàn tất khám</p>
            </div>

            {/* Emergency */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-red-500/30">
              <div className="flex items-center justify-between mb-2">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-white">{stats.capCuu}</p>
              <p className="text-gray-400 text-sm">Cấp cứu</p>
            </div>

            {/* BHYT Rate */}
            <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-xl p-4 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <span className="text-cyan-400 text-xs font-bold">%</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{stats.tyLeBHYT}%</p>
              <p className="text-gray-400 text-sm">Tỷ lệ BHYT</p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-[#1a1f2e] rounded-xl p-4 mb-6 border border-gray-700/50">
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, mã BN, số điện thoại..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Quick Filters */}
              <select
                value={filterTrangThai}
                onChange={(e) => { setFilterTrangThai(e.target.value); setCurrentPage(1); }}
                className="bg-[#0f1419] border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 min-w-[160px]"
              >
                {trangThaiOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              <select
                value={filterPhongKham}
                onChange={(e) => { setFilterPhongKham(e.target.value); setCurrentPage(1); }}
                className="bg-[#0f1419] border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 min-w-[180px]"
              >
                {phongKhamOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* Advanced Filter Button */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
                  showFilterPanel 
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                    : 'bg-[#0f1419] border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <FunnelIcon className="w-5 h-5" />
                <span>Bộ lọc</span>
              </button>

              {/* Reset Filters */}
              {(searchTerm || filterPhongKham !== 'Tất cả phòng khám' || filterTrangThai !== 'Tất cả trạng thái' || filterBHYT !== 'Tất cả') && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-2.5 text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                  <span>Xóa lọc</span>
                </button>
              )}
            </div>

            {/* Advanced Filter Panel */}
            {showFilterPanel && (
              <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Từ ngày</label>
                  <input
                    type="date"
                    value={filterNgayTu}
                    onChange={(e) => setFilterNgayTu(e.target.value)}
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Đến ngày</label>
                  <input
                    type="date"
                    value={filterNgayDen}
                    onChange={(e) => setFilterNgayDen(e.target.value)}
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Bảo hiểm y tế</label>
                  <select
                    value={filterBHYT}
                    onChange={(e) => { setFilterBHYT(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Có BHYT">Có BHYT</option>
                    <option value="Không BHYT">Không BHYT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Độ tuổi</label>
                  <select
                    className="w-full bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Tất cả độ tuổi</option>
                    <option value="0-18">0 - 18 tuổi</option>
                    <option value="19-40">19 - 40 tuổi</option>
                    <option value="41-60">41 - 60 tuổi</option>
                    <option value="60+">Trên 60 tuổi</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400">
              Hiển thị <span className="text-white font-medium">{startIndex + 1}</span> - <span className="text-white font-medium">{Math.min(startIndex + itemsPerPage, filteredPatients.length)}</span> trong tổng số <span className="text-white font-medium">{filteredPatients.length}</span> bệnh nhân
            </p>
          </div>

          {/* Patient Table */}
          <div className="bg-[#1a1f2e] rounded-xl border border-gray-700/50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0f1419]">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Mã BN</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Họ và tên</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Tuổi/Giới</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">SĐT</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">BHYT</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Phòng khám</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Thời gian</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium text-sm">Trạng thái</th>
                  <th className="text-center px-4 py-3 text-gray-400 font-medium text-sm">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {paginatedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-[#0f1419]/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-cyan-400 font-medium">{patient.mabn}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white font-medium">{patient.hoten}</p>
                        <p className="text-gray-500 text-sm">{patient.diachi}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-300">{patient.tuoi} tuổi - {patient.gioitinh}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-300">{patient.sodienthoai}</span>
                    </td>
                    <td className="px-4 py-3">
                      {patient.bhyt ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                          Có BHYT
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400 border border-gray-500/30">
                          Không
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-300">{patient.phongkham}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-400 text-sm">{patient.ngaytiepdon}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.trangthai)}`}>
                        {patient.trangthai}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/benh-nhan/${patient.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
                      >
                        <EyeIcon className="w-4 h-4" />
                        <span>Chi tiết</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Hiển thị</span>
              <select
                className="bg-[#1a1f2e] border border-gray-600 rounded px-2 py-1 text-white text-sm focus:outline-none"
                defaultValue={10}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-gray-400 text-sm">dòng/trang</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-[#1a1f2e] border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-cyan-500 text-white'
                        : 'bg-[#1a1f2e] border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-[#1a1f2e] border border-gray-600 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
