'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { INSPECTIONS } from '@/lib/mock-data'

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Passed': 'default',
    'In Progress': 'secondary',
    'Failed': 'destructive',
  }
  return variants[status] || 'outline'
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Passed':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'In Progress':
      return <Clock className="w-5 h-5 text-yellow-600" />
    case 'Failed':
      return <AlertCircle className="w-5 h-5 text-red-600" />
    default:
      return null
  }
}

export default function InspectionsPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Inspections</h1>
          <p className="text-muted-foreground mt-2">Track quality inspections and certifications</p>
        </div>

        <div className="space-y-4">
          {INSPECTIONS.map((inspection) => (
            <Card key={inspection.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{inspection.project}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{inspection.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(inspection.status)}
                      <Badge variant={getStatusBadge(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Inspector</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Avatar className="h-6 w-6 bg-primary/10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {inspection.inspector.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{inspection.inspector}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium text-foreground mt-1">{inspection.date}</p>
                    </div>
                    {inspection.score !== null && (
                      <div>
                        <p className="text-xs text-muted-foreground">Score</p>
                        <p className="text-sm font-bold text-primary mt-1">{inspection.score}/100</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Notes</p>
                      <p className="text-sm text-foreground mt-1 line-clamp-2">{inspection.notes}</p>
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
