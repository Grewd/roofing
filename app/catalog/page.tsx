'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PRODUCTS } from '@/lib/mock-data'

const getCategoryColor = (category: string) => {
  const colors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    'Shingles': 'default',
    'Tiles': 'secondary',
    'Metal': 'outline',
    'Accessories': 'destructive',
  }
  return colors[category] || 'default'
}

export default function CatalogPage() {
  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground mt-2">Browse roofing materials and accessories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className={`hover:shadow-lg transition-shadow ${!product.inStock ? 'opacity-75' : ''}`}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={getCategoryColor(product.category)} className="text-xs">
                          {product.category}
                        </Badge>
                        {!product.inStock && (
                          <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{product.pricePerUnit}</p>
                      <p className="text-xs text-muted-foreground mt-1">⭐ {product.rating}/5</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Color</p>
                        <p className="text-sm font-medium text-foreground">{product.color}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lifespan</p>
                        <p className="text-sm font-medium text-foreground">{product.lifespan}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Supplier</p>
                      <p className="text-sm font-medium text-foreground">{product.supplier}</p>
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
