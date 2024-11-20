import React from 'react'

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 w-64 h-full">
      <h2 className="text-lg font-bold mb-4">Dashboard Sidebar</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">Home</a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">Library</a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">Profile</a>
        </li>
        <li>
          <a href="#" className="text-gray-800 hover:text-gray-600">Settings</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
