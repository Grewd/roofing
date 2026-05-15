'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Calendar } from 'lucide-react'

const ASSIGNED_PROJECTS = [
  { id: 1, name: 'Karen Residential Complex', location: 'Karen', client: 'Apex Developments', role: 'Lead Technician', startDate: '2024-01-15', deadline: '2024-08-30', progress: 65 },
  { id: 2, name: 'Westlands Office Building', location: 'Westlands', client: 'Tech Hub Ltd', role: 'Support Technician', startDate: '2024-02-20', deadline: '2024-09-15', progress: 45 },
  { id: 3, name: 'Runda Villa Upgrade', location: 'Runda', client: 'Private Owner', role: 'Lead Technician', startDate: '2024-03-10', deadline: '2024-07-20', progress: 80 },
]

export default function StaffProjectsPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Assigned Projects</h1>
            <p className="text-muted-foreground mt-2">Projects you are working on</p>
          </div>

          <div className="space-y-4">
            {ASSIGNED_PROJECTS.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.client}</p>
                      </div>
                      <Badge variant="default">{project.role}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">Deadline: {project.deadline}</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Progress</p>
                        <p className="text-sm font-bold text-primary">{project.progress}%</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
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
