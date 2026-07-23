'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar } from 'lucide-react'
import { STAFF_TASKS, ASSIGNED_PROJECTS, WEEKLY_SCHEDULE } from '@/lib/mock-data'

export default function StaffDashboard() {
  const completedTasks = STAFF_TASKS.filter(t => t.status === 'Completed').length
  const pendingTasks = STAFF_TASKS.filter(t => t.status === 'Pending').length
  const inProgressTasks = STAFF_TASKS.filter(t => t.status === 'In Progress').length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500/10 text-red-600'
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-600'
      case 'Low':
        return 'bg-green-500/10 text-green-600'
      default:
        return 'bg-muted text-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'Pending':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return null
    }
  }

  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your tasks and assigned projects</p>
          </div>

          {/* Task Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{inProgressTasks}</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold text-orange-600 mt-2">{pendingTasks}</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned Projects</p>
                    <p className="text-3xl font-bold text-primary mt-2">{ASSIGNED_PROJECTS.length}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>My Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {STAFF_TASKS.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="mt-1">
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground text-sm">{task.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.project}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Assigned Projects & Schedule */}
            <div className="space-y-6">
              {/* Assigned Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Assigned Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ASSIGNED_PROJECTS.map((project) => (
                    <div key={project.id} className="pb-4 border-b border-border last:border-0">
                      <h4 className="font-semibold text-foreground text-sm">{project.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{project.role}</p>
                      <div className="mt-2">
                        <div className="text-xs font-medium text-foreground mb-1">{project.progress}%</div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                      <div className="flex -space-x-2 mt-3">
                        {project.team.map((member, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-background bg-primary/20">
                            <AvatarFallback className="text-xs bg-primary text-primary-foreground font-bold">
                              {member.substring(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {WEEKLY_SCHEDULE.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.date}</p>
                        <p className="text-xs text-muted-foreground">{item.location}</p>
                      </div>
                      <Badge variant={item.status === 'Day Off' ? 'secondary' : 'default'} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </RouteGuard>
  )
}
