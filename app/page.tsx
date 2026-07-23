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
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-2">Welcome to REXE Smart Roofing Management System</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {DASHBOARD_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="hover:shadow-lg hover:border-primary/50 transition-all duration-200 overflow-hidden group">
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs md:text-sm font-semibold text-muted-foreground">{stat.label}</CardTitle>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color} opacity-80`} />
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.label === 'Total Projects' && '↑ +3 this quarter'}
                    {stat.label === 'Active Jobs' && '↑ +2 this week'}
                    {stat.label === 'Revenue (KES)' && '↑ +15% vs last month'}
                    {stat.label === 'Client Rating' && '⭐ Excellent feedback'}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg md:text-xl">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {PROJECTS.map((project) => (
                    <div key={project.id} className="border-b border-border/60 pb-4 last:border-0 last:pb-0 group hover:bg-card/50 -mx-4 px-4 py-2 rounded-lg transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">{project.name}</h3>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <p className="text-xs md:text-sm text-muted-foreground">{project.location}</p>
                            <Badge variant={getStatusBadge(project.status)} className="text-xs font-medium">
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5">{project.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-foreground w-12 text-right">{project.progress}%</span>
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
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Staff On-Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {STAFF_ON_SITE.map((staff) => (
                    <div key={staff.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                      <Avatar className="h-9 w-9 bg-gradient-to-br from-primary to-accent">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xs font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{staff.name}</p>
                        <p className="text-xs text-muted-foreground">{staff.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <p className="text-xs text-primary font-medium">{staff.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-orange-200/50 dark:border-orange-900/30 bg-gradient-to-br from-orange-50/50 to-orange-50/30 dark:from-orange-950/20 dark:to-orange-950/10 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                  <span>Inventory Alert</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {LOW_STOCK_ITEMS.map((item) => (
                    <div key={item.name} className="pb-3 last:pb-0 border-b border-border/30 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-sm text-foreground">{item.name}</p>
                        <Badge className="text-xs font-semibold bg-orange-600 text-white hover:bg-orange-700">⚠️ Low Stock</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">{item.stock}</span> / {item.threshold} {item.unit}
                        </p>
                        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-orange-600 transition-all" 
                            style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Revenue Chart */}
        <Card className="mt-6 md:mt-8 overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg md:text-xl">6-Month Revenue Trend</CardTitle>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-lg font-bold text-primary">KES 6.8M</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', border: '2px solid var(--primary)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  formatter={(value) => [`KES ${value}K`, 'Revenue']}
                  labelStyle={{ color: 'var(--foreground)' }}
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} name="Revenue (KES Thousands)" animationDuration={800} />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
    </RouteGuard>
  )
}
