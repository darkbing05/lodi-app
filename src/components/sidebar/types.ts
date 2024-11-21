import { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface SidebarProps {
  navItems: NavItem[]
  logo: string
  logoutAction: () => void
  headerText?: string
  subText?: string
  mobileMenuOpen?: boolean
  onMobileMenuClose?: () => void
  className?: string
}