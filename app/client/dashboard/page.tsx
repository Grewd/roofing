'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, FolderOpen, AlertCircle, TrendingUp } from 'lucide-react'
import { CLIENT_PROJECTS, INVOICES, PAYMENT_CHART } from '@/lib/mock-data'

export default function ClientDashboard() {
  const totalSpent = INVOICES.filter(i => i.status === 'Paid').reduce((sum, i) => {
    const amount = parseInt(i.amount.replace(/[^0-9]/g, ''))
    return sum + amount
  }, 0)

  const pendingAmount = INVOICES.filter(i => i.status === 'Pending').reduce((sum, i) => {
    const amount = parseInt(i.amount.replace(/[^0-9]/g, ''))
    return sum + amount
  }, 0)

  const activeProjects = CLIENT_PROJECTS.filter(p => p.status === 'In Progress').length

  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Monitor your projects and payments</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{activeProjects}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="text-2xl font-bold text-foreground mt-2">KES {(totalSpent / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Invoices</p>
                    <p className="text-2xl font-bold text-foreground mt-2">KES {(pendingAmount / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{CLIENT_PROJECTS.length}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Trend Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payment Trend (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={PAYMENT_CHART}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value) => [`KES ${value.toLocaleString()}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Active Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Your Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {CLIENT_PROJECTS.map((project) => (
                    <div key={project.id} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-sm font-bold text-foreground">{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <Badge variant={project.status === 'Completed' ? 'secondary' : project.status === 'In Progress' ? 'default' : 'outline'}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Invoices */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {INVOICES.map((invoice) => (
                  <div key={invoice.id} className="flex items-start justify-between text-sm border-b border-border pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{invoice.amount}</p>
                      <p className="text-xs text-muted-foreground">{invoice.project}</p>
                      <p className="text-xs text-muted-foreground mt-1">Due: {invoice.dueDate}</p>
                    </div>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : 'outline'} className="text-xs">
                      {invoice.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </RouteGuard>
  )
}
