'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { CLIENT_PROJECT_DETAILS } from '@/lib/mock-data'

export default function ClientProjectsPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Your Projects</h1>
            <p className="text-muted-foreground mt-2">View and track all your roofing projects</p>
          </div>

          <div className="space-y-4">
            {CLIENT_PROJECT_DETAILS.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={project.status === 'Ongoing' ? 'default' : 'outline'}>
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="text-lg font-bold text-primary">{project.budget}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{project.location}</span>
                      </div>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Site Supervisor</p>
                        <p className="text-foreground font-medium">{project.supervisor}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Amount Spent</p>
                        <p className="text-foreground font-medium">{project.spent}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Timeline</p>
                        <p className="text-foreground text-xs">{project.startDate} to {project.endDate}</p>
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
