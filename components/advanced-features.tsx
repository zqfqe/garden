"use client"

import { useState } from "react"
import { TrendingUp, Target, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCalculatorStore } from "@/lib/store"
import { crops, mutations } from "@/lib/data"

export function AdvancedFeatures() {
  const [targetValue, setTargetValue] = useState<number>(1000)
  const [showOptimizer, setShowOptimizer] = useState(false)
  const { selectedCrop, selectedGrowthMutation, selectedEnvironmentalMutations, weight, quantity, calculatedValue } =
    useCalculatorStore()

  const calculateProfitMargin = () => {
    if (!selectedCrop) return 0
    const baseCost = selectedCrop.baseValue * 0.1 // Assume 10% of base value as cost
    const profit = calculatedValue - baseCost
    return ((profit / calculatedValue) * 100).toFixed(1)
  }

  const findOptimalCombinations = () => {
    const combinations = []

    for (const crop of crops.slice(0, 10)) {
      // Limit for performance
      for (let i = 0; i < mutations.length; i++) {
        const mutation = mutations[i]
        if (mutation.type === "growth") {
          const baseValue = crop.baseValue
          const value = Math.round(baseValue * mutation.bonus * weight * weight * quantity)

          if (value >= targetValue * 0.8 && value <= targetValue * 1.2) {
            combinations.push({
              crop,
              mutation,
              value,
              efficiency: value / (crop.baseValue + mutation.bonus * 10),
            })
          }
        }
      }
    }

    return combinations.sort((a, b) => b.efficiency - a.efficiency).slice(0, 5)
  }

  const getValueTrend = () => {
    if (!selectedCrop) return []

    const trends = []
    const growthMultiplier = selectedGrowthMutation ? selectedGrowthMutation.bonus : 1
    const environmentalBonusSum = selectedEnvironmentalMutations.reduce((sum, mutation) => sum + mutation.bonus, 0)
    const mutationCount = selectedEnvironmentalMutations.length
    const environmentalMultiplier = Math.max(1, 1 + environmentalBonusSum - mutationCount)

    for (let w = 0.5; w <= 5; w += 0.5) {
      const value = selectedCrop.baseValue * (w * w) * growthMultiplier * environmentalMultiplier * quantity
      trends.push({ weight: w, value: Math.round(value) })
    }
    return trends
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <Zap className="h-6 w-6" />
        Advanced Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profit Calculator */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg text-green-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Profit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCrop ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Value:</span>
                  <span className="font-bold text-green-600">{calculatedValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estimated Cost:</span>
                  <span className="text-red-600">{Math.round(selectedCrop.baseValue * 0.1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Profit Margin:</span>
                  <Badge className="bg-green-600 text-white">{calculateProfitMargin()}%</Badge>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a crop to see profit analysis</p>
            )}
          </CardContent>
        </Card>

        {/* Value Optimizer */}
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Value Optimizer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="target" className="text-sm">
                  Target Value (Sheckles)
                </Label>
                <Input
                  id="target"
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value) || 1000)}
                  className="mt-1"
                />
              </div>
              <Button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                Find Optimal Combinations
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Crops:</span>
                <span className="font-semibold">{crops.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Mutations:</span>
                <span className="font-semibold">{mutations.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Growth Mutations:</span>
                <span className="font-semibold">{mutations.filter((m) => m.type === "growth").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Environmental:</span>
                <span className="font-semibold">{mutations.filter((m) => m.type === "environmental").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Growth Multiplier:</span>
                <span className="font-semibold text-purple-600">
                  {Math.max(...mutations.filter((m) => m.type === "growth").map((m) => m.bonus))}x
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimizer Results */}
      {showOptimizer && (
        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">
              Optimal Combinations for {targetValue.toLocaleString()} Sheckles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {findOptimalCombinations().map((combo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-semibold">{combo.crop.name}</span>
                    <span className="text-gray-500 mx-2">+</span>
                    <span className="text-purple-600">{combo.mutation.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{combo.value.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Efficiency: {combo.efficiency.toFixed(2)}</div>
                  </div>
                </div>
              ))}
              {findOptimalCombinations().length === 0 && (
                <p className="text-gray-500 text-center py-4">No combinations found for target value</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Value Trend Chart */}
      {selectedCrop && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">Value by Weight Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {getValueTrend().map((point, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Weight {point.weight}:</span>
                  <span className="font-mono font-semibold">{point.value.toLocaleString()} Sheckles</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
