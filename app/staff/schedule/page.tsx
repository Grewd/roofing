'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users } from 'lucide-react'

const SCHEDULES = [
  {
    id: 1,
    date: '2024-05-16',
    day: 'Thursday',
    location: 'Karen, Nairobi',
    project: 'Karen Residential Complex',
    activity: 'Roof Installation - Block A',
    team: ['James Otieno', 'Michael Mwangi', 'Joseph Kipchoge'],
    time: '08:00 AM - 05:00 PM',
    type: 'Installation'
  },
  {
    id: 2,
    date: '2024-05-17',
    day: 'Friday',
    location: 'Westlands, Nairobi',
    project: 'Westlands Office Building',
    activity: 'Site Safety Inspection',
    team: ['Mary Njoki', 'Sarah Osei'],
    time: '09:00 AM - 03:00 PM',
    type: 'Inspection'
  },
  {
    id: 3,
    date: '2024-05-20',
    day: 'Monday',
    location: 'Karen, Nairobi',
    project: 'Karen Residential Complex',
    activity: 'Material Delivery & Inspection',
    team: ['James Otieno', 'Michael Mwangi', 'Paul Kipchoge'],
    time: '08:00 AM - 12:00 PM',
    type: 'Delivery'
  },
  {
    id: 4,
    date: '2024-05-21',
    day: 'Tuesday',
    location: 'Karen, Nairobi',
    project: 'Karen Residential Complex',
    activity: 'Roof Installation - Block B',
    team: ['James Otieno', 'Michael Mwangi', 'Joseph Kipchoge'],
    time: '08:00 AM - 05:00 PM',
    type: 'Installation'
  },
]

const getActivityTypeColor = (type: string) => {
  const colors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Installation': 'default',
    'Inspection': 'secondary',
    'Delivery': 'outline',
  }
  return colors[type] || 'default'
}

export default function StaffSchedulePage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Work Schedule</h1>
            <p className="text-muted-foreground mt-2">View your upcoming work schedule and assignments</p>
          </div>

          <div className="space-y-4">
            {SCHEDULES.map((schedule) => (
              <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{schedule.activity}</h3>
                          <Badge variant={getActivityTypeColor(schedule.type)}>
                            {schedule.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{schedule.project}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-foreground font-medium">{schedule.day}, {schedule.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Time</p>
                          <p className="text-foreground font-medium">{schedule.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-foreground font-medium">{schedule.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-xs text-muted-foreground">Team</p>
                          <p className="text-foreground font-medium text-xs">{schedule.team.join(', ')}</p>
                        </div>
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
