"use client"

import { Shuffle, Zap, TrendingUp, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCalculatorStore } from "@/lib/store"
import { crops, mutations } from "@/lib/data"

export function QuickActions() {
  const { setSelectedCrop, setGrowthMutation, setWeight, setQuantity, clearAll, resetCalculation } =
    useCalculatorStore()

  const handleRandomCrop = () => {
    const randomCrop = crops[Math.floor(Math.random() * crops.length)]
    setSelectedCrop(randomCrop)
    resetCalculation()
  }

  const handleRandomGoldCrop = () => {
    const goldMutation = mutations.find((m) => m.id === "gold")
    const highValueCrops = crops.filter((c) => c.baseValue > 10000)
    const randomCrop = highValueCrops[Math.floor(Math.random() * highValueCrops.length)]

    setSelectedCrop(randomCrop)
    if (goldMutation) setGrowthMutation(goldMutation)
    setWeight(2.5)
    setQuantity(1)
    resetCalculation()
  }

  const handleOptimalSetup = () => {
    // Select highest value crop - Grow a Garden Best Crop
    const boneBlossom = crops.find((c) => c.id === "bone-blossom")
    const rainbowMutation = mutations.find((m) => m.id === "rainbow")

    if (boneBlossom) setSelectedCrop(boneBlossom)
    if (rainbowMutation) setGrowthMutation(rainbowMutation)
    setWeight(3.0)
    setQuantity(1)
    resetCalculation()
  }

  const handleBeginnerSetup = () => {
    const carrot = crops.find((c) => c.id === "carrot")
    if (carrot) setSelectedCrop(carrot)
    setWeight(1.5)
    setQuantity(5)
    resetCalculation()
  }

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions - Grow a Garden Farming Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            onClick={handleRandomCrop}
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 border-blue-200 bg-transparent"
          >
            <Shuffle className="h-4 w-4" />
            Random Crop
          </Button>

          <Button
            onClick={handleBeginnerSetup}
            variant="outline"
            className="flex items-center gap-2 hover:bg-green-50 border-green-200 bg-transparent"
          >
            <TrendingUp className="h-4 w-4" />
            Beginner Setup
          </Button>

          <Button
            onClick={handleRandomGoldCrop}
            variant="outline"
            className="flex items-center gap-2 hover:bg-yellow-50 border-yellow-200 bg-transparent"
          >
            <Zap className="h-4 w-4" />
            Gold Combo
          </Button>

          <Button
            onClick={handleOptimalSetup}
            variant="outline"
            className="flex items-center gap-2 hover:bg-purple-50 border-purple-200 bg-transparent"
          >
            <TrendingUp className="h-4 w-4" />
            Grow a Garden Best Crop
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button
            onClick={clearAll}
            variant="outline"
            className="w-full flex items-center gap-2 hover:bg-red-50 border-red-200 text-red-600 bg-transparent"
          >
            <RotateCcw className="h-4 w-4" />
            Clear All Configuration
          </Button>
        </div>

        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <p>💡 Beginner Setup: Simple combination for new players</p>
          <p>⚡ Gold Combo: High-value crop + Gold mutation</p>
          <p>🚀 Grow a Garden Best Crop: Highest value perfect combination</p>
          <p>🎲 Random Crop: Try different crops from our Grow a Garden Price List</p>
        </div>
      </CardContent>
    </Card>
  )
}
