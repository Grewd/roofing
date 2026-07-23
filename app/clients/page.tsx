'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone, MapPin } from 'lucide-react'
import { CLIENTS } from '@/lib/mock-data'

const getClientTypeColor = (type: string) => {
  const colors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Corporate': 'default',
    'Hospitality': 'secondary',
    'Individual': 'outline',
  }
  return colors[type] || 'default'
}

export default function ClientsPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Clients</h1>
          <p className="text-muted-foreground mt-2">Manage client relationships and information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CLIENTS.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-primary/10">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                          {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{client.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getClientTypeColor(client.type)} className="text-xs">
                            {client.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">⭐ {client.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{client.totalValue}</p>
                      <p className="text-xs text-muted-foreground">{client.activeProjects} active</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{client.location}</span>
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
