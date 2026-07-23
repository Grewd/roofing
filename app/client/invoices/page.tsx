'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Eye } from 'lucide-react'
import { INVOICES } from '@/lib/mock-data'

export default function ClientInvoicesPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
            <p className="text-muted-foreground mt-2">View and manage your project invoices</p>
          </div>

          <div className="space-y-4">
            {INVOICES.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{invoice.id}</h3>
                          <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Pending' ? 'secondary' : 'outline'}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{invoice.project}</p>
                        <p className="text-xs text-muted-foreground mt-1">{invoice.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{invoice.amount}</p>
                        <p className="text-xs text-muted-foreground mt-1">Due: {invoice.dueDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <div className="text-sm">
                        <p className="text-xs text-muted-foreground">Invoice Date</p>
                        <p className="text-foreground font-medium">{invoice.date}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
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
