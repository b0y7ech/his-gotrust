'use client';

import { 
  MagnifyingGlassIcon, 
  QrCodeIcon,
  ClockIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface HeaderProps {
  stats: {
    daTiepNhan: number;
    dangChoKham: number;
  };
}

export default function Header({ stats }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#0f1419] p-6 border-b border-gray-800">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tiếp đón bệnh nhân</h1>
          <p className="text-gray-400 text-sm mt-1">
            Quản lý tiếp nhận và phân loại bệnh nhân thời gian thực
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1e2530] text-gray-300 rounded-lg hover:bg-[#2a3441] transition-colors border border-gray-700">
            <ClockIcon className="w-5 h-5" />
            <span>Lịch sử tiếp đón</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors">
            <PrinterIcon className="w-5 h-5" />
            <span>In phiếu khám</span>
          </button>
        </div>
      </div>

      {/* Search and Stats Row */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 max-w-lg">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân (Mã BN, Tên, Số CCCD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1e2530] text-white rounded-lg border border-gray-700 focus:border-[#0ea5e9] focus:outline-none placeholder-gray-500"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#0ea5e9] text-white rounded-lg hover:bg-[#0284c7] transition-colors">
            <QrCodeIcon className="w-5 h-5" />
            <span className="font-medium">Quét mã CCCD</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Đã tiếp nhận</p>
            <p className="text-3xl font-bold text-white">{stats.daTiepNhan}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-xs uppercase tracking-wide">Đang chờ khám</p>
            <p className="text-3xl font-bold text-[#0ea5e9]">{stats.dangChoKham}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
