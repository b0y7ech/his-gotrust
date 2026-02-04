'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon, 
  DocumentChartBarIcon, 
  Cog6ToothIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { id: 'tong-quan', label: 'Tổng quan', icon: HomeIcon, href: '/tong-quan' },
  { id: 'tiep-don', label: 'Tiếp đón & Triage', icon: PlusIcon, href: '/tiep-don' },
  { id: 'benh-nhan', label: 'Danh sách bệnh nhân', icon: UserGroupIcon, href: '/benh-nhan' },
  { id: 'danh-sach-cho', label: 'Danh sách chờ', icon: ClipboardDocumentListIcon, href: '/danh-sach-cho' },
  { id: 'bao-cao', label: 'Báo cáo ca trực', icon: DocumentChartBarIcon, href: '/bao-cao' },
  { id: 'cau-hinh', label: 'Cấu hình', icon: Cog6ToothIcon, href: '/cau-hinh' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    // Determine active menu item based on pathname
    const currentItem = menuItems.find(item => 
      pathname === item.href || pathname.startsWith(item.href + '/')
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname]);

  return (
    <aside className="w-64 bg-[#1a1f2e] flex flex-col border-r border-gray-700 min-h-screen">
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
          <PlusIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg">Victoria Healthcare</h1>
          <p className="text-gray-400 text-xs">Phòng khám Victoria Healthcare</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">NV</span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">Nguyễn Văn A</p>
            <p className="text-gray-400 text-xs">Điều dưỡng trưởng</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
