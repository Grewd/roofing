'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

const INSPECTIONS = [
  { id: 1, project: 'Karen Residential Complex', type: 'Material Inspection', date: '2024-05-10', inspector: 'Sarah Osei', status: 'Passed', score: 95, notes: 'All materials meet specifications' },
  { id: 2, project: 'Westlands Office Building', type: 'Quality Control', date: '2024-05-08', inspector: 'James Otieno', status: 'Passed', score: 92, notes: 'Minor alignment adjustments noted' },
  { id: 3, project: 'Kisumu Shopping Center', type: 'Pre-Installation', date: '2024-05-05', inspector: 'Mary Njoki', status: 'Passed', score: 98, notes: 'Roof structure verified and approved' },
  { id: 4, project: 'Runda Villa Upgrade', type: 'Final Inspection', date: '2024-05-01', inspector: 'Paul Kipchoge', status: 'Passed', score: 96, notes: 'Project ready for handover' },
  { id: 5, project: 'Karen Residential Complex', type: 'Safety Audit', date: '2024-04-28', inspector: 'Mary Njoki', status: 'In Progress', score: null, notes: 'Ongoing safety assessment' },
  { id: 6, project: 'Westlands Office Building', type: 'Material Inspection', date: '2024-04-25', inspector: 'Sarah Osei', status: 'Passed', score: 91, notes: 'All tiles verified and certified' },
]

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
