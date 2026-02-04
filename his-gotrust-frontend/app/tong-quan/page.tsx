'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import {
  BuildingOffice2Icon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ArrowPathIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  change, 
  isPositive 
}: { 
  title: string; 
  value: string; 
  change: string; 
  isPositive: boolean;
}) {
  return (
    <div className="bg-[#1a1f2e] rounded-xl p-5">
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className={`text-sm flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
          {change}
        </span>
      </div>
    </div>
  );
}

// Circular Progress Component
function CircularProgress({ 
  percentage, 
  size = 60, 
  strokeWidth = 6,
  color = '#0ea5e9'
}: { 
  percentage: number; 
  size?: number; 
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xs font-bold">{percentage}%</span>
      </div>
    </div>
  );
}

// Bed Capacity Card
function BedCapacityCard({ 
  department, 
  used, 
  total, 
  percentage,
  color 
}: { 
  department: string; 
  used: number; 
  total: number; 
  percentage: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <CircularProgress percentage={percentage} color={color} />
      <div>
        <p className="text-gray-400 text-xs uppercase">{department}</p>
        <p className="text-white font-bold">
          {used}/{total}
          <span className="text-gray-400 text-xs font-normal ml-1">Giường</span>
        </p>
      </div>
    </div>
  );
}

// Alert Item Component
function AlertItem({ 
  type, 
  title, 
  description, 
  time,
  actions
}: { 
  type: 'urgent' | 'reminder' | 'system'; 
  title: string; 
  description: string; 
  time: string;
  actions?: { label: string; primary?: boolean }[];
}) {
  const typeStyles = {
    urgent: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'KHẨN CẤP' },
    reminder: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'NHẮC NHỞ' },
    system: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'HỆ THỐNG' },
  };

  const style = typeStyles[type];

  return (
    <div className="bg-[#0f1419] rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-0.5 ${style.bg} ${style.text} text-xs font-medium rounded`}>
          {style.label}
        </span>
        <span className="text-gray-500 text-xs">{time}</span>
      </div>
      <h4 className="text-white font-medium text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs mb-3">{description}</p>
      {actions && (
        <div className="flex gap-2">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                action.primary
                  ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                  : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Revenue Chart Component
function RevenueChart() {
  const data = [
    { day: 'Thứ 2', bhyt: 320, vienPhi: 180 },
    { day: 'Thứ 3', bhyt: 280, vienPhi: 150 },
    { day: 'Thứ 4', bhyt: 350, vienPhi: 200 },
    { day: 'Hôm nay', bhyt: 420, vienPhi: 180 },
    { day: 'Thứ 6', bhyt: 180, vienPhi: 80 },
    { day: 'Thứ 7', bhyt: 120, vienPhi: 60 },
  ];

  const maxValue = Math.max(...data.map(d => d.bhyt + d.vienPhi));

  return (
    <div className="bg-[#1a1f2e] rounded-xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <h3 className="text-white font-medium">Doanh thu thực tế (VND)</h3>
        </div>
        <select className="bg-[#0f1419] border border-gray-600 rounded-lg px-3 py-1.5 text-gray-300 text-sm">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>Tháng này</option>
        </select>
      </div>

      {/* Chart */}
      <div className="flex items-end gap-4 h-48 mb-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col gap-1" style={{ height: '180px' }}>
              <div className="flex-1 flex flex-col justify-end gap-1">
                <div 
                  className="w-full bg-cyan-500 rounded-t"
                  style={{ height: `${(item.bhyt / maxValue) * 100}%` }}
                />
                <div 
                  className="w-full bg-cyan-700 rounded-b"
                  style={{ height: `${(item.vienPhi / maxValue) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-gray-400 text-xs mt-2">{item.day}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-gray-400 text-xs">Bảo hiểm y tế (BHYT)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-700" />
          <span className="text-gray-400 text-xs">Viện phí tự nguyện</span>
        </div>
      </div>
    </div>
  );
}

// Emergency Activity Component
function EmergencyActivity() {
  return (
    <div className="bg-[#1a1f2e] rounded-xl p-5">
      <h3 className="text-white font-medium mb-4">Hoạt động Cấp cứu</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-300">Đang chờ khám:</span>
          </div>
          <span className="text-3xl font-bold text-cyan-400">12</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TruckIcon className="w-5 h-5 text-red-400" />
            <span className="text-gray-300">Xe cấp cứu đang đến:</span>
          </div>
          <span className="text-3xl font-bold text-cyan-400">02</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-[#0f1419]">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-[#1a1f2e] border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-lg font-medium">Bảng điều hành Executive</h1>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm dữ liệu..."
                  className="bg-[#0f1419] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white text-sm w-64 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Help */}
              <button className="p-2 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-600">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">Giám đốc BV</p>
                  <p className="text-gray-400 text-xs">Admin Panel</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Page Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Tổng quan bệnh viện</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Dữ liệu thời gian thực cập nhật lúc {formattedDate}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
                <FunnelIcon className="w-4 h-4" />
                <span className="text-sm">Bộ lọc nâng cao</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                <ArrowPathIcon className="w-4 h-4" />
                <span className="text-sm">Làm mới</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatsCard title="Tổng lượt khám" value="1,250" change="+12%" isPositive={true} />
            <StatsCard title="Bệnh nhân nội trú" value="842" change="-5%" isPositive={false} />
            <StatsCard title="Đã xuất viện" value="156" change="+8%" isPositive={true} />
            <StatsCard title="Chờ khám" value="45" change="+2%" isPositive={true} />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - 2/3 */}
            <div className="col-span-2 space-y-6">
              {/* Bed Capacity */}
              <div className="bg-[#1a1f2e] rounded-xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-white font-medium">Công suất giường bệnh</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-cyan-500" />
                      <span className="text-gray-400">Trống</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-red-500" />
                      <span className="text-gray-400">Đầy</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <BedCapacityCard department="KHOA NỘI" used={180} total={200} percentage={90} color="#0ea5e9" />
                  <BedCapacityCard department="KHOA NGOẠI" used={147} total={150} percentage={98} color="#ef4444" />
                  <BedCapacityCard department="KHOA SẢN" used={52} total={80} percentage={65} color="#22c55e" />
                  <BedCapacityCard department="KHOA NHI" used={102} total={125} percentage={82} color="#f59e0b" />
                </div>
              </div>

              {/* Revenue Chart */}
              <RevenueChart />
            </div>

            {/* Right Column - 1/3 */}
            <div className="space-y-6">
              {/* Clinical Alerts */}
              <div className="bg-[#1a1f2e] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-white font-medium">Cảnh báo lâm sàng</h3>
                </div>

                <div className="space-y-3">
                  <AlertItem
                    type="urgent"
                    title="Chỉ số xét nghiệm bất thường"
                    description="Bệnh nhân Nguyễn Văn A (Khoa Nội) có chỉ số Creatinine máu tăng vọt (450 µmol/L)."
                    time="08:15"
                    actions={[
                      { label: 'Xem EMR', primary: true },
                      { label: 'Bỏ qua' },
                    ]}
                  />
                  <AlertItem
                    type="reminder"
                    title="Hoàn thiện Hồ sơ bệnh án"
                    description="Khoa Ngoại còn 12 bệnh án chưa hoàn thiện ký số sau khi xuất viện."
                    time="07:45"
                  />
                  <AlertItem
                    type="system"
                    title="Đồng bộ EMR quốc gia"
                    description="Dữ liệu bảo hiểm 24h qua đã được đồng bộ thành công lên Cổng giám định."
                    time="08:00"
                  />
                </div>

                <button className="w-full mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  Xem tất cả thông báo
                </button>
              </div>

              {/* Emergency Activity */}
              <EmergencyActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
