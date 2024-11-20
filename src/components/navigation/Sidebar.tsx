'use client'

import { useAuthStore } from '@/lib/store'

export default function Sidebar() {
  const { user, logout } = useAuthStore()

  return (
    <aside className="bg-secondary h-screen w-64 fixed top-0 left-0 shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="text-3xl font-bold text-primary">LODI</div>
        </div>
        <nav className="space-y-4">
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Home</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Search</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Likes</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Playlists</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Albums</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Following</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Settings</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded">Subscription <span className="bg-red-500 text-white px-2 py-1 rounded">Pro</span></a>
          {user && (
            <button
              onClick={logout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </aside>
  )
}
