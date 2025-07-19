"use client"

import { useState } from "react"
import { Copy, Check, RotateCcw, Save, TrendingUp, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCalculatorStore } from "@/lib/store"
import { rarityColors } from "@/lib/data"

export function ResultsDisplay() {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const {
    selectedCrop,
    selectedGrowthMutation,
    selectedEnvironmentalMutations,
    weight,
    quantity,
    friendBoost,
    calculatedValue,
    clearAll,
    saveToHistory,
    hasCalculated,
    isCalculating,
  } = useCalculatorStore()

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const copyToClipboard = async () => {
    const text = `${formatNumber(calculatedValue)} Sheckles`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleSaveToHistory = () => {
    saveToHistory()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const getDetailedFormulaBreakdown = () => {
    if (!selectedCrop) return "Please select a crop to start calculating"

    const cropConstant = selectedCrop.baseValue
    const weightSquared = weight * weight
    const growthMultiplier = selectedGrowthMutation ? selectedGrowthMutation.bonus : 1

    const environmentalBonusSum = selectedEnvironmentalMutations.reduce((sum, mutation) => sum + mutation.bonus, 0)
    const mutationCount = selectedEnvironmentalMutations.length
    const environmentalMultiplier = Math.max(1, 1 + environmentalBonusSum - mutationCount)

    const friendMultiplier = 1 + friendBoost / 100

    return {
      cropConstant,
      weightSquared,
      growthMultiplier,
      environmentalMultiplier,
      friendMultiplier,
      quantity,
      environmentalBonusSum,
      mutationCount,
    }
  }

  const getValueCategory = () => {
    if (calculatedValue < 1000) return { label: "Basic", color: "bg-gray-100 text-gray-700" }
    if (calculatedValue < 10000) return { label: "Good", color: "bg-green-100 text-green-700" }
    if (calculatedValue < 100000) return { label: "Great", color: "bg-blue-100 text-blue-700" }
    if (calculatedValue < 1000000) return { label: "Excellent", color: "bg-purple-100 text-purple-700" }
    if (calculatedValue < 10000000) return { label: "Epic", color: "bg-pink-100 text-pink-700" }
    return { label: "Legendary", color: "bg-yellow-100 text-yellow-700" }
  }

  const valueCategory = getValueCategory()
  const breakdown = getDetailedFormulaBreakdown()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
        <TrendingUp className="h-6 w-6" />
        Results
      </h2>

      {/* Final Value Display */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-amber-800">Final Value</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {selectedCrop && hasCalculated ? (
            <div className="space-y-4">
              <div>
                <div className="text-4xl md:text-6xl font-bold text-amber-700 mb-2 font-mono">
                  {formatNumber(calculatedValue)}
                </div>
                <div className="text-xl text-amber-600 font-semibold">Sheckles</div>
              </div>

              <Badge className={`${valueCategory.color} text-lg px-4 py-2 font-bold`}>
                {valueCategory.label} Value
              </Badge>

              <div className="text-sm text-amber-700">
                <span className="font-semibold">{selectedCrop.name}</span>
                {selectedGrowthMutation && <span> with {selectedGrowthMutation.name}</span>}
                {selectedEnvironmentalMutations.length > 0 && (
                  <span>
                    {" "}
                    + {selectedEnvironmentalMutations.length} environmental mutation
                    {selectedEnvironmentalMutations.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-xl text-gray-500 py-12 text-center">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              {selectedCrop ? (
                <div>
                  <p className="mb-2">Configuration complete, click calculate to get results</p>
                  <p className="text-sm text-gray-400">Current crop: {selectedCrop.name}</p>
                </div>
              ) : (
                <p>Select a crop and configure parameters to start calculating</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Formula Breakdown */}
      {selectedCrop && typeof breakdown === "object" && (
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Authentic Formula Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Formula Display */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="font-mono text-sm text-center">
                  <div className="font-bold text-purple-800 mb-2">
                    {breakdown.cropConstant} × {breakdown.weightSquared} × {breakdown.growthMultiplier} ×{" "}
                    {breakdown.environmentalMultiplier} × {breakdown.friendMultiplier} × {breakdown.quantity} ={" "}
                    {formatNumber(calculatedValue)}
                  </div>
                  <div className="text-xs text-purple-600">
                    Crop Constant × Weight² × Growth × Environmental × Friend × Quantity
                  </div>
                </div>
              </div>

              {/* Step by Step */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Crop Constant:</span>
                    <span className="font-mono">{breakdown.cropConstant}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Weight² ({weight}²):</span>
                    <span className="font-mono">{breakdown.weightSquared}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Growth Multiplier:</span>
                    <span className="font-mono">×{breakdown.growthMultiplier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Quantity:</span>
                    <span className="font-mono">{breakdown.quantity}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Environmental Bonus:</span>
                    <span className="font-mono">+{breakdown.environmentalBonusSum}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Mutation Count:</span>
                    <span className="font-mono">-{breakdown.mutationCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Environmental Multiplier:</span>
                    <span className="font-mono">×{breakdown.environmentalMultiplier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Friend Boost:</span>
                    <span className="font-mono">×{breakdown.friendMultiplier}</span>
                  </div>
                </div>
              </div>

              {/* Active Mutations */}
              {(selectedGrowthMutation || selectedEnvironmentalMutations.length > 0) && (
                <div className="border-t pt-3">
                  <span className="font-semibold text-gray-600 text-sm">Active Mutations:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedGrowthMutation && (
                      <Badge className="bg-amber-600 text-white text-xs">
                        {selectedGrowthMutation.name} (×{selectedGrowthMutation.bonus})
                      </Badge>
                    )}
                    {selectedEnvironmentalMutations.map((mutation) => (
                      <Badge key={mutation.id} className={`${rarityColors[mutation.rarity]} text-xs`}>
                        {mutation.name} (+{mutation.bonus})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Control Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button
          onClick={copyToClipboard}
          disabled={!selectedCrop || !hasCalculated}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Result
            </>
          )}
        </Button>

        <Button
          onClick={handleSaveToHistory}
          disabled={!selectedCrop || !hasCalculated}
          variant="outline"
          className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={clearAll}
          className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  )
}
