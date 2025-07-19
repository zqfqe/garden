"use client"

import { useState } from "react"
import { Search, Clock, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { crops, cropCategories, rarityColors, rarityBorders, type Crop } from "@/lib/data"
import { useCalculatorStore } from "@/lib/store"

export function CropSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all")
  const [selectedRarity, setSelectedRarity] = useState<string | null>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const { selectedCrop, setSelectedCrop, hasCalculated, resetCalculation } = useCalculatorStore()

  const filteredAndSortedCrops = crops
    .filter((crop) => {
      const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || crop.categories.includes(selectedCategory)
      const matchesRarity = selectedRarity === "all" || crop.rarity === selectedRarity
      return matchesSearch && matchesCategory && matchesRarity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "value":
          return b.baseValue - a.baseValue
        case "rarity":
          const rarityOrder = {
            Common: 1,
            Uncommon: 2,
            Rare: 3,
            Legendary: 4,
            Mythical: 5,
            Divine: 6,
            Prismatic: 7,
            Transcendent: 8,
          }
          return rarityOrder[b.rarity] - rarityOrder[a.rarity]
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleCropSelect = (crop: Crop) => {
    if (selectedCrop?.id === crop.id) {
      setSelectedCrop(null)
    } else {
      setSelectedCrop(crop)
    }

    // 重置计算状态
    if (hasCalculated) {
      resetCalculation()
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "Transcendent":
        return "⭐⭐⭐⭐⭐⭐⭐⭐"
      case "Prismatic":
        return "⭐⭐⭐⭐⭐⭐⭐"
      case "Divine":
        return "⭐⭐⭐⭐⭐⭐"
      case "Mythical":
        return "⭐⭐⭐⭐⭐"
      case "Legendary":
        return "⭐⭐⭐⭐"
      case "Rare":
        return "⭐⭐⭐"
      case "Uncommon":
        return "⭐⭐"
      default:
        return "⭐"
    }
  }

  const formatValue = (value: number) => {
    return value.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
          <Leaf className="h-6 w-6" />
          Select Crop
        </h2>

        {/* Search Input - 移动端优化 */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-emerald-200 focus:border-emerald-400 h-12 text-base"
          />
        </div>

        {/* Filters - 移动端优化 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="border-emerald-200">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {cropCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRarity} onValueChange={(value) => setSelectedRarity(value)}>
            <SelectTrigger className="border-emerald-200">
              <SelectValue placeholder="All Rarities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="Common">Common ⭐</SelectItem>
              <SelectItem value="Uncommon">Uncommon ⭐⭐</SelectItem>
              <SelectItem value="Rare">Rare ⭐⭐⭐</SelectItem>
              <SelectItem value="Legendary">Legendary ⭐⭐⭐⭐</SelectItem>
              <SelectItem value="Mythical">Mythical ⭐⭐⭐⭐⭐</SelectItem>
              <SelectItem value="Divine">Divine ⭐⭐⭐⭐⭐⭐</SelectItem>
              <SelectItem value="Prismatic">Prismatic ⭐⭐⭐⭐⭐⭐⭐</SelectItem>
              <SelectItem value="Transcendent">Transcendent ⭐⭐⭐⭐⭐⭐⭐⭐</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="border-emerald-200">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Base Value</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Crop Grid - No Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedCrops.map((crop) => (
          <Card
            key={crop.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              selectedCrop?.id === crop.id
                ? "border-emerald-500 border-2 bg-emerald-50 shadow-lg"
                : `border-gray-200 hover:border-emerald-300 ${rarityBorders[crop.rarity]}`
            }`}
            onClick={() => handleCropSelect(crop)}
          >
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <h3 className="font-bold text-xl text-gray-800">{crop.name}</h3>

                <Badge className={`${rarityColors[crop.rarity]} text-sm font-medium`}>
                  {crop.rarity} {getRarityIcon(crop.rarity)}
                </Badge>

                <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{crop.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3 w-3" />
                      {crop.growthTime}
                    </span>
                    <span className="font-bold text-emerald-600 text-lg">{formatValue(crop.baseValue)} Sheckles</span>
                  </div>

                  {crop.season && (
                    <Badge variant="outline" className="text-xs">
                      {crop.season}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedCrops.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No crops found matching your criteria</p>
          <p className="text-sm">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}
