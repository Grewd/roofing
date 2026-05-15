'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  email: string
  role: 'admin' | 'manager' | 'supervisor' | 'client' | 'staff'
  userType: 'internal' | 'client' | 'staff'
  name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USERS = [
  // Internal Staff
  { email: 'admin@rexe.ke', password: 'password123', role: 'admin' as const, userType: 'internal' as const, name: 'John Doe' },
  { email: 'manager@rexe.ke', password: 'password123', role: 'manager' as const, userType: 'internal' as const, name: 'David Okonkwo' },
  { email: 'supervisor@rexe.ke', password: 'password123', role: 'supervisor' as const, userType: 'internal' as const, name: 'Paul Kipchoge' },
  
  // Clients
  { email: 'apex@rexe.ke', password: 'password123', role: 'client' as const, userType: 'client' as const, name: 'Apex Developments' },
  { email: 'coastal@rexe.ke', password: 'password123', role: 'client' as const, userType: 'client' as const, name: 'Coastal Hotels' },
  
  // Staff/Technicians
  { email: 'james.otieno@rexe.ke', password: 'password123', role: 'staff' as const, userType: 'staff' as const, name: 'James Otieno' },
  { email: 'mary.njoki@rexe.ke', password: 'password123', role: 'staff' as const, userType: 'staff' as const, name: 'Mary Njoki' },
  { email: 'sarah.osei@rexe.ke', password: 'password123', role: 'staff' as const, userType: 'staff' as const, name: 'Sarah Osei' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('rexe_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('rexe_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password)
    if (!demoUser) {
      throw new Error('Invalid email or password')
    }
    
    const userData: User = {
      email: demoUser.email,
      role: demoUser.role,
      userType: demoUser.userType,
      name: demoUser.name,
    }
    
    setUser(userData)
    localStorage.setItem('rexe_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rexe_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
