'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MessageSquare } from 'lucide-react'

const SUPPORT_TICKETS = [
  { id: 1, subject: 'Roof Inspection Query', status: 'Resolved', date: '2024-05-10', response: '2 hours' },
  { id: 2, subject: 'Invoice Clarification', status: 'In Progress', date: '2024-05-12', response: 'Awaiting reply' },
  { id: 3, subject: 'Project Timeline Update', status: 'Resolved', date: '2024-05-08', response: '4 hours' },
]

export default function ClientSupportPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Support</h1>
            <p className="text-muted-foreground mt-2">Get help and track your support requests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email Support</p>
                    <p className="text-sm font-medium">support@rexe.ke</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Support</p>
                    <p className="text-sm font-medium">+254 20 2000 100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                    <p className="text-sm font-medium">2-4 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SUPPORT_TICKETS.map((ticket) => (
                  <div key={ticket.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">Submitted: {ticket.date}</p>
                      </div>
                      <Badge variant={ticket.status === 'Resolved' ? 'secondary' : 'default'}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Response: {ticket.response}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </RouteGuard>
  )
}
