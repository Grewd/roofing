'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FolderOpen, Users, Package, Boxes, Users2, CheckSquare, Calculator, LogOut } from 'lucide-react'
import { useAuth } from './auth-context'

const NAVIGATION = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Product Catalog', href: '/catalog', icon: Package },
  { name: 'Inventory', href: '/inventory', icon: Boxes },
  { name: 'Staff & Tasks', href: '/staff', icon: Users2 },
  { name: 'Inspections', href: '/inspections', icon: CheckSquare },
  { name: 'Cost Estimator', href: '/estimator', icon: Calculator },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout()
    // Use a small delay to ensure state updates before redirect
    setTimeout(() => {
      router.push('/login')
    }, 100)
  }

  const getUserInitials = (email: string) => {
    return email.split('@')[0].substring(0, 2).toUpperCase()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">RX</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-sm text-sidebar-foreground truncate">REXE Smart</h1>
            <p className="text-xs text-muted-foreground">Roofing Mgmt</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-2">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer - User Info */}
      <div className="px-4 py-4 border-t border-sidebar-border space-y-3">
        {user ? (
          <>
            <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-sidebar-accent/50">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                {getUserInitials(user.email)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </aside>
  )
}
