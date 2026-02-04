'use client';

import { UserGroupIcon } from '@heroicons/react/24/outline';

interface Patient {
  id: string;
  name: string;
  priority: string;
  department: string;
}

interface WaitingListProps {
  patients: Patient[];
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'Cấp cứu':
      return 'bg-red-500 text-white';
    case 'Ưu tiên':
      return 'bg-orange-500 text-white';
    case 'Thường':
      return 'bg-emerald-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'Cấp cứu':
      return 'border-l-red-500';
    case 'Ưu tiên':
      return 'border-l-orange-500';
    case 'Thường':
      return 'border-l-emerald-500';
    default:
      return 'border-l-gray-500';
  }
};

export default function WaitingList({ patients }: WaitingListProps) {
  return (
    <div className="w-80 bg-[#1a1f2e] rounded-xl p-4 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-5 h-5 text-[#0ea5e9]" />
          <h2 className="text-white font-semibold">Danh sách chờ</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-green-500 text-sm">Live</span>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`bg-[#0f1419] rounded-lg p-3 border-l-4 ${getPriorityBorder(patient.priority)} cursor-pointer hover:bg-[#1e2530] transition-colors`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">{patient.name}</h3>
                <p className="text-gray-400 text-sm">Mã: {patient.id}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(patient.priority)}`}>
                {patient.priority === 'Cấp cứu' ? 'CẤP CỨU' : patient.priority === 'Ưu tiên' ? 'ƯU TIÊN' : 'THƯỜNG'}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{patient.department}</p>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-4 text-center">
        <a
          href="/danh-sach-cho"
          className="text-[#0ea5e9] text-sm hover:underline"
        >
          Xem tất cả hàng đợi
        </a>
      </div>
    </div>
  );
}
