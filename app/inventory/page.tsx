'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'
import { INVENTORY } from '@/lib/mock-data'

const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
  if (trend < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
  return null
}

export default function InventoryPage() {
  const lowStockCount = INVENTORY.filter(item => item.status === 'Low').length
  
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Inventory</h1>
          <p className="text-muted-foreground mt-2">Manage stock levels of roofing materials</p>
        </div>

        {lowStockCount > 0 && (
          <Card className="mb-6 border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-semibold text-foreground">{lowStockCount} items require restocking</p>
                  <p className="text-sm text-muted-foreground">Consider placing orders for low stock items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {INVENTORY.map((item) => (
            <Card key={item.id} className={item.status === 'Low' ? 'border-destructive/30' : ''}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.supplier}</p>
                    </div>
                    <Badge variant={item.status === 'Low' ? 'destructive' : 'default'}>
                      {item.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Stock Level</span>
                      <span className="text-lg font-bold text-foreground">{item.quantity} {item.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Threshold</span>
                      <span className="text-sm font-medium text-foreground">{item.threshold} {item.unit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Unit Cost</span>
                      <span className="text-sm font-medium text-primary">{item.cost}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Last Restocked</p>
                      <p className="text-sm font-medium text-foreground">{item.lastRestocked}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Trend</p>
                        <p className={`text-sm font-medium ${item.trend > 0 ? 'text-green-600' : item.trend < 0 ? 'text-red-600' : 'text-foreground'}`}>
                          {item.trend > 0 ? '+' : ''}{item.trend}%
                        </p>
                      </div>
                      <div>{getTrendIcon(item.trend)}</div>
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
