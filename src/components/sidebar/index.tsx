'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, X } from 'lucide-react'
import { NavItem, SidebarProps } from './types'

const LODI_THEME = {
    bg: 'bg-gradient-to-b from-[#00BCD4] to-[#0D47A1]',
    activeLink: 'bg-white/20 text-white',
    hoverLink: 'hover:bg-white/10 hover:text-[#EBFF00]',
    text: 'text-white',
    subText: 'text-white/80',
    icons: 'text-white/90',
    logout: 'text-[#EBFF00] hover:bg-[#EBFF00]/10'
  }

export default function Sidebar({
  navItems,
  logo,
  logoutAction,
  headerText = 'Dashboard',
  subText = 'Discover',
  mobileMenuOpen = false,
  onMobileMenuClose
}: SidebarProps) {
  const pathname = usePathname()
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isCollapsed = windowWidth < 1024
  const isMobile = windowWidth < 768

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = isActiveRoute(item.href)
    return (
      <Link
        href={item.href}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
          ${isActive 
            ? LODI_THEME.activeLink
            : `${LODI_THEME.text} ${LODI_THEME.hoverLink}`
          }`}
      >
        <item.icon className={`w-5 h-5 ${isActive ? 'text-violet-100' : LODI_THEME.icons}`} />
        <span className={isCollapsed ? 'hidden' : ''}>{item.label}</span>
      </Link>
    )
  }

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className={`text-2xl font-bold text-violet-100 ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? logo[0] : logo}
        </h1>
        <p className={`text-sm ${LODI_THEME.subText} ${isCollapsed ? 'hidden' : ''}`}>{subText}</p>
      </div>

      <div className="flex-1">
        <div className={`text-sm font-medium mb-4 ${LODI_THEME.subText} ${isCollapsed ? 'hidden' : ''}`}>
          {headerText}
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
      </div>

      <button 
        onClick={logoutAction}
        className={`flex items-center space-x-3 p-3 mt-auto rounded-lg w-full ${LODI_THEME.logout}`}
      >
        <LogOut className="w-5 h-5" />
        <span className={isCollapsed ? 'hidden' : ''}>Logout</span>
      </button>
    </div>
  )

  if (isMobile) {
    return (
      <div 
        className={`fixed inset-0 ${LODI_THEME.bg} z-50 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-6">
          <button 
            onClick={onMobileMenuClose}
            className="absolute top-4 right-4 text-violet-200"
          >
            <X className="w-6 h-6" />
          </button>
          {sidebarContent}
        </div>
      </div>
    )
  }

  return (
    <div className={`hidden md:block ${LODI_THEME.bg} p-6 transition-all duration-300 
      ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {sidebarContent}
    </div>
  )
}