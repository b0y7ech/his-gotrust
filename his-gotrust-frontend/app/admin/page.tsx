'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import {
  UserGroupIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ClockIcon,
  DocumentTextIcon,
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'Trần Ngọc Bách', email: 'bach.tran@gotrust.vn', role: 'Giám đốc BV', department: 'Ban Giám đốc', status: 'active', lastLogin: '05/02/2026 08:30' },
  { id: 2, name: 'Nguyễn Thị Hương', email: 'huong.nguyen@gotrust.vn', role: 'Bác sĩ', department: 'Phòng khám Nội', status: 'active', lastLogin: '05/02/2026 07:45' },
  { id: 3, name: 'Lê Văn Minh', email: 'minh.le@gotrust.vn', role: 'Điều dưỡng', department: 'Phòng khám Ngoại', status: 'active', lastLogin: '05/02/2026 08:00' },
  { id: 4, name: 'Phạm Thị Mai', email: 'mai.pham@gotrust.vn', role: 'Tiếp đón', department: 'Tiếp đón', status: 'active', lastLogin: '05/02/2026 07:30' },
  { id: 5, name: 'Võ Quốc Hùng', email: 'hung.vo@gotrust.vn', role: 'Bác sĩ', department: 'Phòng khám Tim mạch', status: 'inactive', lastLogin: '01/02/2026 16:00' },
  { id: 6, name: 'Đỗ Thị Lan', email: 'lan.do@gotrust.vn', role: 'Kế toán', department: 'Phòng Tài chính', status: 'active', lastLogin: '05/02/2026 08:15' },
];

// Mock data for activity logs
const mockActivityLogs = [
  { id: 1, user: 'Trần Ngọc Bách', action: 'Đăng nhập hệ thống', time: '08:30', type: 'login' },
  { id: 2, user: 'Nguyễn Thị Hương', action: 'Tạo bệnh án mới cho BN001', time: '08:25', type: 'create' },
  { id: 3, user: 'Lê Văn Minh', action: 'Cập nhật dấu hiệu sinh tồn BN003', time: '08:20', type: 'update' },
  { id: 4, user: 'Phạm Thị Mai', action: 'Tiếp đón bệnh nhân mới', time: '08:15', type: 'create' },
  { id: 5, user: 'Đỗ Thị Lan', action: 'Xác nhận thanh toán BN002', time: '08:10', type: 'confirm' },
  { id: 6, user: 'Hệ thống', action: 'Backup dữ liệu tự động', time: '08:00', type: 'system' },
];

// Stats cards data
const statsCards = [
  { label: 'Tổng người dùng', value: '24', icon: UserGroupIcon, color: 'from-blue-500 to-blue-600', change: '+2 tuần này' },
  { label: 'Đang hoạt động', value: '18', icon: CheckCircleIcon, color: 'from-green-500 to-green-600', change: '75%' },
  { label: 'Phiên đăng nhập', value: '156', icon: ClockIcon, color: 'from-purple-500 to-purple-600', change: 'Hôm nay' },
  { label: 'Cảnh báo bảo mật', value: '0', icon: ShieldCheckIcon, color: 'from-cyan-500 to-cyan-600', change: 'Tất cả an toàn' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'users', label: 'Quản lý người dùng', icon: UserGroupIcon },
    { id: 'roles', label: 'Phân quyền', icon: ShieldCheckIcon },
    { id: 'logs', label: 'Nhật ký hoạt động', icon: DocumentTextIcon },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: Cog6ToothIcon },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#0f1117]">
      <Sidebar />
      
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                Admin Panel
              </h1>
              <p className="text-gray-400 mt-1">Quản lý hệ thống và người dùng</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 bg-gray-800 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700 transition-colors relative">
                <BellIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">TB</span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Trần Ngọc Bách</p>
                  <p className="text-gray-400 text-xs">Giám đốc BV</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-lg">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden">
          {/* Tab Header */}
          <div className="flex border-b border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gray-800/50'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                {/* Search & Actions */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative flex-1 max-w-md">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm người dùng..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors">
                    <PlusIcon className="w-5 h-5" />
                    Thêm người dùng
                  </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Người dùng</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Vai trò</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Phòng ban</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Trạng thái</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Đăng nhập cuối</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                  {user.name.split(' ').slice(-2).map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                              user.role === 'Giám đốc BV' 
                                ? 'bg-purple-500/20 text-purple-400'
                                : user.role === 'Bác sĩ'
                                ? 'bg-blue-500/20 text-blue-400'
                                : user.role === 'Điều dưỡng'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{user.department}</td>
                          <td className="py-4 px-4">
                            <span className={`flex items-center gap-1.5 text-sm ${
                              user.status === 'active' ? 'text-green-400' : 'text-gray-500'
                            }`}>
                              <span className={`w-2 h-2 rounded-full ${
                                user.status === 'active' ? 'bg-green-400' : 'bg-gray-500'
                              }`}></span>
                              {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">{user.lastLogin}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-700 rounded-lg transition-colors">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Role Cards */}
                {[
                  { name: 'Giám đốc BV', users: 1, permissions: 'Toàn quyền', color: 'from-purple-500 to-pink-500' },
                  { name: 'Bác sĩ', users: 8, permissions: 'Khám bệnh, EMR, Kê đơn', color: 'from-blue-500 to-cyan-500' },
                  { name: 'Điều dưỡng', users: 12, permissions: 'Hỗ trợ khám, Dấu hiệu sinh tồn', color: 'from-green-500 to-teal-500' },
                  { name: 'Tiếp đón', users: 4, permissions: 'Đăng ký, Triage', color: 'from-yellow-500 to-orange-500' },
                  { name: 'Kế toán', users: 2, permissions: 'Thanh toán, Báo cáo tài chính', color: 'from-red-500 to-pink-500' },
                  { name: 'IT Admin', users: 1, permissions: 'Quản trị hệ thống', color: 'from-gray-500 to-gray-600' },
                ].map((role, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-cyan-500/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center`}>
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{role.name}</h3>
                        <p className="text-gray-400 text-sm">{role.users} người dùng</p>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">Quyền: {role.permissions}</p>
                    <button className="w-full py-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg text-sm font-medium transition-colors">
                      Chỉnh sửa quyền
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-3">
                {mockActivityLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      log.type === 'login' ? 'bg-blue-500/20 text-blue-400' :
                      log.type === 'create' ? 'bg-green-500/20 text-green-400' :
                      log.type === 'update' ? 'bg-yellow-500/20 text-yellow-400' :
                      log.type === 'confirm' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      <ClockIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{log.user}</span>
                        <span className="text-gray-400"> - {log.action}</span>
                      </p>
                    </div>
                    <span className="text-gray-500 text-sm">{log.time}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <BuildingOffice2Icon className="w-5 h-5 text-cyan-400" />
                    Thông tin phòng khám
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Tên phòng khám</label>
                      <input type="text" defaultValue="Victoria Healthcare" className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Địa chỉ</label>
                      <input type="text" defaultValue="Tầng 3, Tòa nhà Vincom Center, TP.HCM" className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Điện thoại</label>
                      <input type="text" defaultValue="028.3822.3456" className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    Bảo mật
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="text-white text-sm font-medium">Xác thực 2 yếu tố</p>
                        <p className="text-gray-500 text-xs">Bảo vệ tài khoản bằng OTP</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="text-white text-sm font-medium">Tự động khóa phiên</p>
                        <p className="text-gray-500 text-xs">Sau 30 phút không hoạt động</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                      <div>
                        <p className="text-white text-sm font-medium">Ghi nhật ký hoạt động</p>
                        <p className="text-gray-500 text-xs">Lưu lại mọi thao tác</p>
                      </div>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
