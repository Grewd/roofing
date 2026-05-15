'use client'

import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, Package } from 'lucide-react'

const PRODUCTS = [
  { id: 1, name: 'Cambridge Shingles', category: 'Shingles', pricePerUnit: 'KES 850/m²', supplier: 'CertainTeed', lifespan: '25-30 years', color: 'Charcoal Gray', rating: 4.7, inStock: true },
  { id: 2, name: 'Stone-Coated Tiles', category: 'Tiles', pricePerUnit: 'KES 1,200/m²', supplier: 'Decra', lifespan: '40+ years', color: 'Red/Brown', rating: 4.9, inStock: true },
  { id: 3, name: 'Corrugated Sheets', category: 'Metal', pricePerUnit: 'KES 450/m²', supplier: 'Local Steel', lifespan: '15-20 years', color: 'Galvanized', rating: 4.3, inStock: true },
  { id: 4, name: 'Asphalt Shingles Premium', category: 'Shingles', pricePerUnit: 'KES 950/m²', supplier: 'GAF', lifespan: '20-25 years', color: 'Black', rating: 4.6, inStock: true },
  { id: 5, name: 'Concrete Tiles', category: 'Tiles', pricePerUnit: 'KES 1,400/m²', supplier: 'Monier', lifespan: '50+ years', color: 'Terracotta', rating: 4.8, inStock: false },
  { id: 6, name: 'Aluminum Coil', category: 'Metal', pricePerUnit: 'KES 2,200/roll', supplier: 'Hydro', lifespan: '30-40 years', color: 'Silver', rating: 4.5, inStock: true },
  { id: 7, name: 'Underlay Membrane', category: 'Accessories', pricePerUnit: 'KES 180/m²', supplier: 'Synthetics Ltd', lifespan: 'N/A', color: 'Black', rating: 4.4, inStock: true },
  { id: 8, name: 'Roof Flashing Kits', category: 'Accessories', pricePerUnit: 'KES 3,500/kit', supplier: 'Industrial Group', lifespan: '20-30 years', color: 'Zinc', rating: 4.6, inStock: true },
]

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
