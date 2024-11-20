import React from 'react';
import LogoutButton from '@/components/dashboard/LogoutButton';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-6 w-64 h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <ul className="space-y-4 flex-1">
        <li>
          <a href="#" className="text-white hover:text-gray-300 flex items-center">
            <span className="mr-2">🏠</span> Home
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-300 flex items-center">
            <span className="mr-2">📚</span> Library
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-300 flex items-center">
            <span className="mr-2">👤</span> Profile
          </a>
        </li>
        <li>
          <a href="#" className="text-white hover:text-gray-300 flex items-center">
            <span className="mr-2">⚙️</span> Settings
          </a>
        </li>
      </ul>
      <div className="mt-auto">
        <LogoutButton className="w-full bg-red-600 hover:bg-red-700" />
      </div>
    </div>
  );
};

export default Sidebar;
