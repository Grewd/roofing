'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, MapPin } from 'lucide-react'

const STAFF_TASKS = [
  {
    id: 1,
    title: 'Roof Installation - Block A',
    project: 'Karen Residential Complex',
    location: 'Karen, Nairobi',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-05-25',
    assignedTo: 'James Otieno',
    progress: 70
  },
  {
    id: 2,
    title: 'Material Quality Inspection',
    project: 'Karen Residential Complex',
    location: 'Karen, Nairobi',
    status: 'Completed',
    priority: 'Medium',
    dueDate: '2024-05-15',
    assignedTo: 'Sarah Osei',
    progress: 100
  },
  {
    id: 3,
    title: 'Site Safety Audit',
    project: 'Westlands Office Building',
    location: 'Westlands, Nairobi',
    status: 'Pending',
    priority: 'High',
    dueDate: '2024-05-20',
    assignedTo: 'Mary Njoki',
    progress: 0
  },
  {
    id: 4,
    title: 'Roof Installation - Block B',
    project: 'Karen Residential Complex',
    location: 'Karen, Nairobi',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-06-05',
    assignedTo: 'James Otieno',
    progress: 45
  },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'In Progress': 'default',
    'Completed': 'secondary',
    'Pending': 'outline',
  }
  return variants[status] || 'outline'
}

const getPriorityColor = (priority: string) => {
  if (priority === 'High') return 'text-red-600'
  if (priority === 'Medium') return 'text-yellow-600'
  return 'text-green-600'
}

export default function StaffTasksPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground mt-2">View and manage your assigned tasks</p>
          </div>

          <div className="space-y-4">
            {STAFF_TASKS.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{task.title}</h3>
                          <Badge variant={getStatusBadge(task.status)}>
                            {task.status}
                          </Badge>
                          <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.project}</p>
                      </div>
                      {task.status === 'Completed' && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{task.location}</span>
                      </div>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-foreground font-medium">{task.dueDate}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Assigned To</p>
                        <p className="text-foreground font-medium">{task.assignedTo}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-bold text-foreground">{task.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${task.progress}%` }}
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
