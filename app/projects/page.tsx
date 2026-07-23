'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Users, MapPin } from 'lucide-react'
import { PROJECTS } from '@/lib/mock-data'

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Pending': 'outline',
    'Ongoing': 'default',
    'Completed': 'secondary',
  }
  return variants[status] || 'default'
}

export default function ProjectsPage() {
  const ongoingCount = PROJECTS.filter(p => p.status === 'Ongoing').length
  const completedCount = PROJECTS.filter(p => p.status === 'Completed').length
  
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-2">View and manage all roofing projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{PROJECTS.length}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Projects</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{ongoingCount}</p>
                <p className="text-sm text-muted-foreground mt-1">Ongoing</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{completedCount}</p>
                <p className="text-sm text-muted-foreground mt-1">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <Badge variant={getStatusBadge(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.scope}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{project.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{project.client}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center gap-1">
                        <Avatar className="h-5 w-5 bg-primary/10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {project.supervisor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-foreground">{project.supervisor}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-xs text-muted-foreground">Material</p>
                      <p className="text-foreground font-medium">{project.material}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-xs text-muted-foreground">Timeline</p>
                      <p className="text-foreground font-medium">{project.startDate} to {project.endDate}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-bold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${project.progress}%` }}
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
