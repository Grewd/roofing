'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Phone, MapPin, Briefcase } from 'lucide-react'

const CLIENTS = [
  { id: 1, name: 'Apex Developments', type: 'Corporate', email: 'info@apex.ke', phone: '+254 20 2000 100', location: 'Karen, Nairobi', activeProjects: 2, totalValue: 'KES 5.7M', rating: 4.8 },
  { id: 2, name: 'Tech Hub Ltd', type: 'Corporate', email: 'projects@techhub.ke', phone: '+254 20 3500 200', location: 'Westlands, Nairobi', activeProjects: 1, totalValue: 'KES 3.2M', rating: 4.6 },
  { id: 3, name: 'Retail Group Kenya', type: 'Corporate', email: 'procurement@retail.ke', phone: '+254 57 2028 000', location: 'Kisumu', activeProjects: 1, totalValue: 'KES 1.8M', rating: 4.5 },
  { id: 4, name: 'Coastal Hotels', type: 'Hospitality', email: 'operations@coastal.ke', phone: '+254 41 2315 000', location: 'Mombasa', activeProjects: 0, totalValue: 'KES 2.8M', rating: 4.9 },
  { id: 5, name: 'Private Owner', type: 'Individual', email: 'owner@runda.ke', phone: '+254 722 555 666', location: 'Runda, Nairobi', activeProjects: 1, totalValue: 'KES 1.5M', rating: 5.0 },
  { id: 6, name: 'East Africa Builders', type: 'Corporate', email: 'contracts@eabuilders.ke', phone: '+254 20 4000 150', location: 'Nairobi', activeProjects: 0, totalValue: 'KES 4.2M', rating: 4.7 },
]

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
