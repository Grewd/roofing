'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

const INVENTORY = [
  { id: 1, name: 'Cambridge Shingles', quantity: 12, unit: 'bundles', threshold: 20, status: 'Low', supplier: 'CertainTeed', lastRestocked: '2024-04-15', cost: 'KES 850/bundle', trend: -15 },
  { id: 2, name: 'Stone-Coated Tiles', quantity: 8, unit: 'boxes', threshold: 15, status: 'Low', supplier: 'Decra', lastRestocked: '2024-04-10', cost: 'KES 2,400/box', trend: -20 },
  { id: 3, name: 'Corrugated Sheets', quantity: 5, unit: 'pieces', threshold: 10, status: 'Low', supplier: 'Local Steel', lastRestocked: '2024-04-20', cost: 'KES 2,700/piece', trend: -25 },
  { id: 4, name: 'Roofing Nails', quantity: 50, unit: 'kg', threshold: 25, status: 'Adequate', supplier: 'Industrial Fasteners', lastRestocked: '2024-05-01', cost: 'KES 180/kg', trend: 5 },
  { id: 5, name: 'Flashing Materials', quantity: 30, unit: 'meters', threshold: 20, status: 'Adequate', supplier: 'Industrial Group', lastRestocked: '2024-04-28', cost: 'KES 450/meter', trend: 8 },
  { id: 6, name: 'Underlayment', quantity: 45, unit: 'rolls', threshold: 30, status: 'Adequate', supplier: 'Synthetics Ltd', lastRestocked: '2024-05-03', cost: 'KES 3,600/roll', trend: 10 },
  { id: 7, name: 'Roof Sealant', quantity: 15, unit: 'drums', threshold: 10, status: 'Adequate', supplier: 'Sika', lastRestocked: '2024-04-25', cost: 'KES 8,500/drum', trend: 0 },
  { id: 8, name: 'Asphalt Shingles', quantity: 22, unit: 'bundles', threshold: 25, status: 'Low', supplier: 'GAF', lastRestocked: '2024-04-18', cost: 'KES 950/bundle', trend: -18 },
]

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
