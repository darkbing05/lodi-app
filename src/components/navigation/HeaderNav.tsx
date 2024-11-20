import { useAuthStore } from '@/lib/store'

interface HeaderNavProps {
  logout: () => void
}

export default function HeaderNav({ logout }: HeaderNavProps) {
  const { user } = useAuthStore()

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Music Dashboard</h1>
          {user && (
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">Welcome, {user.name}!</p>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
