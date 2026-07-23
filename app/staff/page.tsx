'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle, Phone, Mail } from 'lucide-react'
import { STAFF } from '@/lib/mock-data'

const getTaskProgressColor = (completed: number, total: number) => {
  const percentage = (completed / total) * 100
  if (percentage >= 90) return 'text-green-600'
  if (percentage >= 70) return 'text-yellow-600'
  return 'text-orange-600'
}

export default function StaffPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Staff & Tasks</h1>
          <p className="text-muted-foreground mt-2">Manage staff members and their assignments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {STAFF.map((staff) => (
            <Card key={staff.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{staff.name}</h3>
                        <p className="text-sm text-muted-foreground">{staff.role}</p>
                        <p className="text-xs text-primary mt-1">{staff.experience}</p>
                      </div>
                    </div>
                    <Badge variant={staff.status === 'On-Site' ? 'default' : 'secondary'}>
                      {staff.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{staff.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground">Current Tasks</p>
                    <div className="space-y-2">
                      {staff.tasks.map((task, idx) => (
                        <div key={idx} className="text-sm text-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Task Completion</span>
                      <span className={`text-sm font-bold ${getTaskProgressColor(staff.tasksCompleted, staff.tasksTotal)}`}>
                        {staff.tasksCompleted}/{staff.tasksTotal}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(staff.tasksCompleted / staff.tasksTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
    </RouteGuard>
  )
}
