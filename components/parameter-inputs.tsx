"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calculator } from "lucide-react"
import { useCalculatorStore } from "@/lib/store"

export function ParameterInputs() {
  const {
    weight,
    quantity,
    friendBoost,
    setWeight,
    setQuantity,
    setFriendBoost,
    selectedCrop,
    hasCalculated,
    resetCalculation,
  } = useCalculatorStore()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Calculator className="h-5 w-5" />
        Parameters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Parameters */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-lg">Basic Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (Squared in Formula)</Label>
              <Input
                id="weight"
                type="number"
                min="0"
                step="0.01"
                value={weight}
                onChange={(e) => {
                  setWeight(Number.parseFloat(e.target.value) || 0)
                  if (hasCalculated) resetCalculation()
                }}
                placeholder="Enter weight"
                className="border-blue-200"
              />
              <div className="space-y-1">
                <p className="text-xs text-blue-600">
                  Weight is squared: {weight}² = {(weight * weight).toFixed(2)}
                </p>
                {weight > 0 && selectedCrop && (
                  <p className="text-xs text-emerald-600">
                    基础价值: {selectedCrop.baseValue} × {(weight * weight).toFixed(2)} ={" "}
                    {(selectedCrop.baseValue * weight * weight).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(Number.parseInt(e.target.value) || 1)
                  if (hasCalculated) resetCalculation()
                }}
                placeholder="Enter quantity"
                className="border-blue-200"
              />
              <p className="text-xs text-blue-600">Whole numbers only</p>
            </div>
          </CardContent>
        </Card>

        {/* Friend Boost */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 text-lg flex items-center gap-2">
              <Users className="h-4 w-4" />
              Friend Boost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="friendBoost">Friend Boost (%)</Label>
              <Input
                id="friendBoost"
                type="number"
                min="0"
                max="100"
                step="10"
                value={friendBoost}
                onChange={(e) => {
                  setFriendBoost(Number.parseInt(e.target.value) || 0)
                  if (hasCalculated) resetCalculation()
                }}
                placeholder="Enter friend boost %"
                className="border-green-200"
              />
              <p className="text-xs text-green-600">10% per online friend (max 100%)</p>
              <p className="text-xs text-green-700 font-medium">Multiplier: ×{(1 + friendBoost / 100).toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formula Explanation */}
      <Card className="border-gray-200 bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-800 text-lg">Authentic Formula</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-4 rounded-lg border font-mono text-sm">
            <div className="text-center font-bold text-lg mb-2 text-purple-600">
              Total Value = Crop Constant × Weight² × Growth Mutation × Environmental Multiplier × Friend Boost ×
              Quantity
            </div>
            <div className="text-center text-sm text-gray-600">
              Environmental Multiplier = (1 + Σ Environmental Bonuses - Mutation Count)
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>
              • <strong>Weight is squared</strong> - heavier crops have exponential value increase
            </p>
            <p>
              • <strong>Growth mutations</strong> are multipliers (Gold ×20, Rainbow ×50)
            </p>
            <p>
              • <strong>Environmental mutations</strong> use additive bonuses minus mutation count
            </p>
            <p>
              • <strong>Friend boost</strong> adds 10% per online friend (max 100%)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
