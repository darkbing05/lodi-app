'use client'

import { useAuthStore } from '@/lib/store'

export default function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header className="bg-secondary shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-primary">LODI</div>
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
              Discover
            </button>
            <div className="absolute hidden bg-white shadow-lg rounded-b-lg w-48">
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 1</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 2</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Option 3</a>
            </div>
          </div>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <img src="/public/file.svg" alt="Profile" className="w-10 h-10 rounded-full" />
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
