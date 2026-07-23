'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, AlertTriangle, Users, Briefcase, DollarSign, Star } from 'lucide-react'
import { PROJECTS, STAFF_ON_SITE, LOW_STOCK_ITEMS, REVENUE_DATA } from '@/lib/mock-data'

const DASHBOARD_STATS = [
  { label: 'Total Projects', value: String(PROJECTS.length), icon: Briefcase, color: 'text-primary' },
  { label: 'Active Jobs', value: String(PROJECTS.filter(p => p.status === 'Ongoing').length), icon: TrendingUp, color: 'text-orange-500' },
  { label: 'Revenue (KES)', value: '4.2M', icon: DollarSign, color: 'text-green-600' },
  { label: 'Client Rating', value: '4.8/5', icon: Star, color: 'text-yellow-500' },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Pending': 'outline',
    'Ongoing': 'default',
    'Completed': 'secondary',
  }
  return variants[status] || 'default'
}

export default function Dashboard() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      
      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to REXE Smart Roofing Management System</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {DASHBOARD_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.label === 'Total Projects' && '+3 this quarter'}
                    {stat.label === 'Active Jobs' && '+2 this week'}
                    {stat.label === 'Revenue (KES)' && '+15% vs last month'}
                    {stat.label === 'Client Rating' && 'Excellent feedback'}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {PROJECTS.map((project) => (
                    <div key={project.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{project.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">{project.location}</p>
                            <Badge variant={getStatusBadge(project.status)} className="text-xs">
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{project.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">{project.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Staff On Site */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Staff On-Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {STAFF_ON_SITE.map((staff) => (
                    <div key={staff.id} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                        <p className="text-xs text-primary">{staff.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {LOW_STOCK_ITEMS.map((item) => (
                    <div key={item.name} className="pb-3 last:pb-0 border-b border-border/50 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-foreground">{item.name}</p>
                        <Badge variant="destructive" className="text-xs">Low</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.stock} {item.unit} in stock (Threshold: {item.threshold} {item.unit})
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue Chart */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>6-Month Revenue Trend (KES)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  formatter={(value) => `KES ${value}K`}
                  labelStyle={{ color: 'var(--foreground)' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[8, 8, 0, 0]} name="Revenue (KES Thousands)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
    </RouteGuard>
  )
}
