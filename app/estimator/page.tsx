'use client'

import { useState } from 'react'
import DynamicSidebar from '@/components/dynamic-sidebar'
import { RouteGuard } from '@/components/route-guard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { DollarSign } from 'lucide-react'

const MATERIALS = [
  { id: 'cambridge', name: 'Cambridge Shingles', pricePerSqm: 850 },
  { id: 'stone-coated', name: 'Stone-Coated Tiles', pricePerSqm: 1200 },
  { id: 'corrugated', name: 'Corrugated Sheets', pricePerSqm: 450 },
]

const PITCH_MULTIPLIERS: Record<string, number> = {
  'low': 1.0,
  'medium': 1.15,
  'high': 1.35,
}

export default function CostEstimatorPage() {
  const [area, setArea] = useState('')
  const [material, setMaterial] = useState('cambridge')
  const [pitch, setPitch] = useState('medium')
  const [labourPercentage, setLabourPercentage] = useState(25)

  const selectedMaterial = MATERIALS.find(m => m.id === material)
  
  const roofArea = parseFloat(area) || 0
  const materialCost = roofArea * (selectedMaterial?.pricePerSqm || 0) * (PITCH_MULTIPLIERS[pitch] || 1)
  const labourCost = (materialCost * labourPercentage) / 100
  const totalCost = materialCost + labourCost

  return (
    <RouteGuard>
      <div className="flex bg-background">
        <DynamicSidebar />
        
        <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Cost Estimator</h1>
          <p className="text-muted-foreground mt-2">Calculate project costs for roofing projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Roof Area */}
                <div className="space-y-2">
                  <Label htmlFor="area" className="text-sm font-medium">Roof Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter roof area in square meters"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="border-border"
                  />
                  <p className="text-xs text-muted-foreground">For irregular shapes, use the total projected area</p>
                </div>

                {/* Material Type */}
                <div className="space-y-2">
                  <Label htmlFor="material" className="text-sm font-medium">Material Type</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material" className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MATERIALS.map(m => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} - KES {m.pricePerSqm}/m²
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Roof Pitch */}
                <div className="space-y-2">
                  <Label htmlFor="pitch" className="text-sm font-medium">Roof Pitch</Label>
                  <Select value={pitch} onValueChange={setPitch}>
                    <SelectTrigger id="pitch" className="border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Pitch (≤ 20°)</SelectItem>
                      <SelectItem value="medium">Medium Pitch (20° - 45°)</SelectItem>
                      <SelectItem value="high">High Pitch ({'>'}45°)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Higher pitches require more material and labour</p>
                </div>

                {/* Labour Percentage */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="labour" className="text-sm font-medium">Labour Cost %</Label>
                    <span className="text-lg font-semibold text-primary">{labourPercentage}%</span>
                  </div>
                  <Slider
                    id="labour"
                    min={10}
                    max={50}
                    step={1}
                    value={[labourPercentage]}
                    onValueChange={(value) => setLabourPercentage(value[0])}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Typical range: 20-35% of material cost</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary */}
          <div className="space-y-4">
            <Card className="border-2 border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Cost Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {/* Material Cost */}
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Material Cost</span>
                    <span className="text-lg font-semibold text-foreground">
                      KES {materialCost.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  {/* Labour Cost */}
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Labour Cost ({labourPercentage}%)</span>
                    <span className="text-lg font-semibold text-foreground">
                      KES {labourCost.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  {/* Total Cost */}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-base font-bold text-foreground">Total Estimated Cost</span>
                    <span className="text-3xl font-bold text-primary">
                      KES {totalCost.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-secondary/50 rounded-lg p-3 space-y-2 mt-4">
                  <div className="text-xs space-y-1">
                    <p><span className="font-medium">Area:</span> {roofArea} m²</p>
                    <p><span className="font-medium">Material:</span> {selectedMaterial?.name}</p>
                    <p><span className="font-medium">Pitch Factor:</span> {PITCH_MULTIPLIERS[pitch]}x</p>
                  </div>
                </div>

                {/* Note */}
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  This is an estimate. Final cost may vary based on site conditions, accessibility, and additional requirements.
                </p>
              </CardContent>
            </Card>

            {/* Material Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Material Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="font-medium text-foreground">Cambridge Shingles</p>
                  <p className="text-xs text-muted-foreground">Premium quality, 25+ year lifespan</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Stone-Coated Tiles</p>
                  <p className="text-xs text-muted-foreground">Durable, fire-resistant, excellent finish</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Corrugated Sheets</p>
                  <p className="text-xs text-muted-foreground">Cost-effective, quick installation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
    </RouteGuard>
  )
}
