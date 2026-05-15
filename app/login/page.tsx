'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-context'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertCircle, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('password123')
    setError('')
    setIsLoading(true)

    try {
      await login(demoEmail, 'password123')
      // Route based on user type after login
      const user = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 100)
      })
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = {
    internal: [
      { email: 'admin@rexe.ke', label: 'Admin - John Doe' },
      { email: 'manager@rexe.ke', label: 'Manager - David Okonkwo' },
      { email: 'supervisor@rexe.ke', label: 'Supervisor - Paul Kipchoge' },
    ],
    client: [
      { email: 'apex@rexe.ke', label: 'Client - Apex Developments' },
      { email: 'coastal@rexe.ke', label: 'Client - Coastal Hotels' },
    ],
    staff: [
      { email: 'james.otieno@rexe.ke', label: 'Technician - James Otieno' },
      { email: 'mary.njoki@rexe.ke', label: 'Safety Officer - Mary Njoki' },
      { email: 'sarah.osei@rexe.ke', label: 'Inspector - Sarah Osei' },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">RX</span>
            </div>
            <div>
              <h1 className="font-bold text-2xl text-foreground">REXE Smart</h1>
              <p className="text-xs text-muted-foreground">Roofing Management</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your roofing management dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-background"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
              </div>
            </div>

            {/* Demo Login Buttons - Grouped by User Type */}
            <div className="space-y-4">
              {/* Internal Staff */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Internal Staff</p>
                <div className="space-y-1">
                  {demoAccounts.internal.map((account) => (
                    <Button
                      key={account.email}
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={isLoading}
                      className="w-full text-xs justify-start"
                    >
                      {account.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clients */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Clients</p>
                <div className="space-y-1">
                  {demoAccounts.client.map((account) => (
                    <Button
                      key={account.email}
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={isLoading}
                      className="w-full text-xs justify-start"
                    >
                      {account.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Staff/Technicians */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Staff & Technicians</p>
                <div className="space-y-1">
                  {demoAccounts.staff.map((account) => (
                    <Button
                      key={account.email}
                      type="button"
                      variant="outline"
                      onClick={() => handleDemoLogin(account.email)}
                      disabled={isLoading}
                      className="w-full text-xs justify-start"
                    >
                      {account.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Text */}
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo Password:</strong> password123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          REXE Smart Roofing Management System • Kenyan Roofing Solutions
        </p>
      </div>
    </div>
  )
}
