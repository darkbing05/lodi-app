'use client'
import { useState, useEffect } from 'react'
import { Home, Library, User, Settings, LogOut, Bell, Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const NavLinks = () => (
    <nav className="space-y-1">
      <Link href="/" className="flex items-center space-x-3 p-3 bg-[#2c2d31] rounded-lg">
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link href="/library" className="flex items-center space-x-3 p-3 hover:bg-[#2c2d31] rounded-lg">
        <Library className="w-5 h-5" />
        <span>Library</span>
      </Link>
      <Link href="/profile" className="flex items-center space-x-3 p-3 hover:bg-[#2c2d31] rounded-lg">
        <User className="w-5 h-5" />
        <span>Profile</span>
      </Link>
      <Link href="/settings" className="flex items-center space-x-3 p-3 hover:bg-[#2c2d31] rounded-lg">
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </Link>
    </nav>
  )

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className={`hidden md:block w-64 bg-[#1a1b1e] text-white p-6 transition-all duration-300 ${windowWidth < 1024 ? 'w-20' : 'w-64'}`}>
        <div className="mb-8">
          <h1 className={`text-2xl font-bold ${windowWidth < 1024 ? 'text-center' : ''}`}>
            {windowWidth < 1024 ? 'L' : 'LODI'}
          </h1>
          <p className={`text-sm text-gray-400 ${windowWidth < 1024 ? 'hidden' : ''}`}>Discover</p>
        </div>

        <div className="space-y-6">
          <div className={`text-gray-400 text-sm font-medium ${windowWidth < 1024 ? 'hidden' : ''}`}>Dashboard</div>
          <NavLinks />
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-500/10 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className={windowWidth < 1024 ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#1a1b1e] z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="p-6">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">LODI</h1>
            <p className="text-sm text-gray-400">Discover</p>
          </div>
          <div className="space-y-6 text-white">
            <NavLinks />
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-500/10 rounded-lg w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 bg-white border-b px-4 md:px-8 py-4 z-40">
          <div className="flex items-center justify-between gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <span className="hidden md:inline text-sm text-gray-600">Music Dashboard</span>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {/* Featured Categories */}
          <section className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Featured Categories</h2>
              <Link href="/categories" className="text-blue-600 hover:underline text-sm">View All</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {['All Music', 'Pop', 'Hip Hop', 'Rock', 'R&B/Soul', 'Country'].map((genre, index) => (
                <div 
                  key={genre}
                  className="relative group overflow-hidden rounded-xl aspect-square"
                >
                  <img 
                    src={`https://picsum.photos/400?random=${index}`}
                    alt={genre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-3 md:p-4">
                    <h3 className="text-white font-bold text-sm md:text-base">{genre}</h3>
                    <p className="text-gray-200 text-xs md:text-sm">Top 50</p>
                  </div>
                  <button className="absolute top-2 right-2 md:top-4 md:right-4 p-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Recently Played */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">Recently Played</h2>
              <Link href="/history" className="text-blue-600 hover:underline text-sm">See All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                  <div className="relative aspect-square">
                    <img 
                      src={`https://picsum.photos/400?random=${i + 10}`}
                      alt={`Song ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-3 bg-green-500 rounded-full">
                        Play
                      </div>
                    </button>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-medium text-sm md:text-base">Song Title {i + 1}</h3>
                    <p className="text-xs md:text-sm text-gray-500">Artist Name {i + 1}</p>
                    <div className="flex items-center justify-between mt-2 text-xs md:text-sm text-gray-500">
                      <span>Played {1234 * (i + 1)} times</span>
                      <button className="text-blue-600 hover:underline">Download</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}