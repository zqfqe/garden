"use client"

import { useState } from "react"
import { Search, Sparkles, Zap, Crown, Thermometer, Leaf, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mutations, mutationCategories, rarityColors, type Mutation } from "@/lib/data"
import { useCalculatorStore } from "@/lib/store"

export function MutationSelector() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all")
  const [selectedRarity, setSelectedRarity] = useState<string | null>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [showFilters, setShowFilters] = useState(false)

  const {
    hasCalculated,
    resetCalculation,
    selectedGrowthMutation,
    selectedEnvironmentalMutations,
    selectedTemperatureMutations,
    setGrowthMutation,
    toggleEnvironmentalMutation,
    toggleTemperatureMutation,
  } = useCalculatorStore()

  const filterMutations = (type: "growth" | "environmental" | "temperature") => {
    return mutations
      .filter((mutation) => {
        const matchesType = mutation.type === type
        const matchesSearch = mutation.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || mutation.categories.includes(selectedCategory)
        const matchesRarity = selectedRarity === "all" || mutation.rarity === selectedRarity
        return matchesType && matchesSearch && matchesCategory && matchesRarity
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "bonus":
            return b.bonus - a.bonus
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
  }

  const isGrowthMutationSelected = (mutation: Mutation) => {
    return selectedGrowthMutation?.id === mutation.id
  }

  const isEnvironmentalMutationSelected = (mutation: Mutation) => {
    return selectedEnvironmentalMutations.some((m) => m.id === mutation.id)
  }

  const isTemperatureMutationSelected = (mutation: Mutation) => {
    return selectedTemperatureMutations.some((m) => m.id === mutation.id)
  }

  const handleMutationClick = (mutation: Mutation) => {
    if (mutation.type === "growth") {
      if (isGrowthMutationSelected(mutation)) {
        setGrowthMutation(null)
      } else {
        setGrowthMutation(mutation)
      }
    } else if (mutation.type === "environmental") {
      toggleEnvironmentalMutation(mutation)
    } else if (mutation.type === "temperature") {
      toggleTemperatureMutation(mutation)
    }

    if (hasCalculated) {
      resetCalculation()
    }
  }

  const getEnvironmentalBonusSum = () => {
    const envBonus = selectedEnvironmentalMutations.reduce((sum, mutation) => sum + mutation.bonus, 0)
    const tempBonus = selectedTemperatureMutations.reduce((sum, mutation) => sum + mutation.bonus, 0)
    return envBonus + tempBonus
  }

  const getEnvironmentalMultiplier = () => {
    const bonusSum = getEnvironmentalBonusSum()
    const mutationCount = selectedEnvironmentalMutations.length + selectedTemperatureMutations.length
    return Math.max(1, 1 + bonusSum - mutationCount)
  }

  const clearAllMutations = () => {
    setGrowthMutation(null)
    selectedEnvironmentalMutations.forEach((mutation) => toggleEnvironmentalMutation(mutation))
    selectedTemperatureMutations.forEach((mutation) => toggleTemperatureMutation(mutation))
    if (hasCalculated) {
      resetCalculation()
    }
  }

  const MutationGrid = ({ mutations, type }: { mutations: Mutation[]; type: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {mutations.map((mutation) => {
        const isSelected =
          type === "growth"
            ? isGrowthMutationSelected(mutation)
            : type === "environmental"
              ? isEnvironmentalMutationSelected(mutation)
              : isTemperatureMutationSelected(mutation)

        return (
          <Button
            key={mutation.id}
            variant={isSelected ? "default" : "outline"}
            className={`h-auto p-4 text-left justify-start transition-all duration-200 ${
              isSelected
                ? type === "growth"
                  ? "bg-amber-600 hover:bg-amber-700 text-white shadow-lg scale-105"
                  : type === "environmental"
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105"
                : "hover:bg-gray-50 hover:border-gray-300 hover:scale-102"
            }`}
            onClick={() => handleMutationClick(mutation)}
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{mutation.name}</span>
                <Badge className={`${rarityColors[mutation.rarity]} text-xs`}>{mutation.rarity}</Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">
                  {type === "growth" ? `×${mutation.bonus}` : `+${mutation.bonus}`}
                </span>
                <span className="text-xs opacity-70">{type === "growth" ? "Multiplier" : "Bonus"}</span>
              </div>
              <p className="text-xs opacity-70 line-clamp-2">{mutation.description}</p>
            </div>
          </Button>
        )
      })}
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Configure Mutations
          </h2>
          <Button
            onClick={clearAllMutations}
            variant="outline"
            size="sm"
            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
          >
            Clear All
          </Button>
        </div>

        {/* Search and Filter Toggle - 移动端优化 */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mutations by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200 focus:border-purple-400 h-12 text-base"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-purple-200 hover:bg-purple-50 bg-transparent h-12 px-6"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200 animate-fade-in">
              <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mutationCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRarity} onValueChange={(value) => setSelectedRarity(value)}>
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Uncommon">Uncommon</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                  <SelectItem value="Mythical">Mythical</SelectItem>
                  <SelectItem value="Divine">Divine</SelectItem>
                  <SelectItem value="Prismatic">Prismatic</SelectItem>
                  <SelectItem value="Transcendent">Transcendent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-purple-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="bonus">Power</SelectItem>
                  <SelectItem value="rarity">Rarity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Selected Mutations Summary - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Growth Mutation */}
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-800 flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4" />
                Growth Mutation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedGrowthMutation ? (
                <div className="space-y-2">
                  <Badge
                    className="bg-amber-600 hover:bg-amber-700 cursor-pointer transition-colors w-full justify-center"
                    onClick={() => setGrowthMutation(null)}
                  >
                    {selectedGrowthMutation.name} (×{selectedGrowthMutation.bonus}) ✕
                  </Badge>
                  <p className="text-xs text-amber-700 text-center">
                    Multiplies final value by {selectedGrowthMutation.bonus}x
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Crown className="h-8 w-8 mx-auto mb-2 text-amber-300" />
                  <p className="text-gray-500 text-sm">No growth mutation</p>
                  <p className="text-xs text-gray-400">Only one allowed</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Environmental Mutations */}
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-800 flex items-center gap-2 text-sm">
                <Leaf className="h-4 w-4" />
                Environmental ({selectedEnvironmentalMutations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEnvironmentalMutations.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {selectedEnvironmentalMutations.slice(0, 2).map((mutation) => (
                      <Badge
                        key={mutation.id}
                        className="bg-green-600 hover:bg-green-700 cursor-pointer transition-colors text-xs"
                        onClick={() => toggleEnvironmentalMutation(mutation)}
                      >
                        {mutation.name} ✕
                      </Badge>
                    ))}
                    {selectedEnvironmentalMutations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedEnvironmentalMutations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-green-700 text-center">
                    +{selectedEnvironmentalMutations.reduce((sum, m) => sum + m.bonus, 0)} total bonus
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Leaf className="h-8 w-8 mx-auto mb-2 text-green-300" />
                  <p className="text-gray-500 text-sm">No environmental</p>
                  <p className="text-xs text-gray-400">Multiple allowed</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Temperature Mutations */}
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 flex items-center gap-2 text-sm">
                <Thermometer className="h-4 w-4" />
                Temperature ({selectedTemperatureMutations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTemperatureMutations.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {selectedTemperatureMutations.slice(0, 2).map((mutation) => (
                      <Badge
                        key={mutation.id}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors text-xs"
                        onClick={() => toggleTemperatureMutation(mutation)}
                      >
                        {mutation.name} ✕
                      </Badge>
                    ))}
                    {selectedTemperatureMutations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{selectedTemperatureMutations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-blue-700 text-center">
                    +{selectedTemperatureMutations.reduce((sum, m) => sum + m.bonus, 0)} total bonus
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Thermometer className="h-8 w-8 mx-auto mb-2 text-blue-300" />
                  <p className="text-gray-500 text-sm">No temperature</p>
                  <p className="text-xs text-gray-400">Multiple allowed</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Combined Environmental Summary */}
        {(selectedEnvironmentalMutations.length > 0 || selectedTemperatureMutations.length > 0) && (
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-800 flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" />
                Combined Environmental Effect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-700">+{getEnvironmentalBonusSum()}</div>
                  <div className="text-xs text-purple-600">Total Bonus</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-700">
                    -{selectedEnvironmentalMutations.length + selectedTemperatureMutations.length}
                  </div>
                  <div className="text-xs text-purple-600">Mutation Count</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-700">×{getEnvironmentalMultiplier()}</div>
                  <div className="text-xs text-purple-600">Final Multiplier</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mutation Tabs - Enhanced */}
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="growth" className="flex items-center gap-2 text-sm">
            <Crown className="h-4 w-4" />
            <div className="text-left">
              <div>Growth</div>
              <div className="text-xs opacity-70">{filterMutations("growth").length} available</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="environmental" className="flex items-center gap-2 text-sm">
            <Leaf className="h-4 w-4" />
            <div className="text-left">
              <div>Environmental</div>
              <div className="text-xs opacity-70">{filterMutations("environmental").length} available</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="temperature" className="flex items-center gap-2 text-sm">
            <Thermometer className="h-4 w-4" />
            <div className="text-left">
              <div>Temperature</div>
              <div className="text-xs opacity-70">{filterMutations("temperature").length} available</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="mt-6">
          <div className="mb-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h3 className="text-lg font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Growth Mutations - Powerful Multipliers
            </h3>
            <p className="text-sm text-amber-700 mb-2">
              Growth mutations are the most powerful type, providing massive multipliers to your crop value.
              <strong> You can only select ONE growth mutation at a time.</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-amber-600 text-white text-xs">Gold: ×20 (1% chance)</Badge>
              <Badge className="bg-pink-600 text-white text-xs">Rainbow: ×50 (0.1% chance)</Badge>
            </div>
          </div>
          <MutationGrid mutations={filterMutations("growth")} type="growth" />
          {filterMutations("growth").length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Crown className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No growth mutations found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="environmental" className="mt-6">
          <div className="mb-4 bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Environmental Mutations - Weather & Events
            </h3>
            <p className="text-sm text-green-700 mb-2">
              Environmental mutations come from weather events, pets, and special game events.
              <strong> You can stack multiple environmental mutations.</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-600 text-white text-xs">Wet: +1 (Rain)</Badge>
              <Badge className="bg-yellow-600 text-white text-xs">Shocked: +99 (Lightning)</Badge>
              <Badge className="bg-purple-600 text-white text-xs">Celestial: +119 (Meteor)</Badge>
            </div>
          </div>
          <MutationGrid mutations={filterMutations("environmental")} type="environmental" />
          {filterMutations("environmental").length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No environmental mutations found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="temperature" className="mt-6">
          <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Temperature Mutations - Heat & Cold Effects
            </h3>
            <p className="text-sm text-blue-700 mb-2">
              Temperature mutations are caused by extreme heat, cold, and cooking effects.
              <strong> These can be combined with environmental mutations.</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-600 text-white text-xs">Chilled: +1 (Frost)</Badge>
              <Badge className="bg-red-600 text-white text-xs">Cooked: +24 (Owl pets)</Badge>
              <Badge className="bg-orange-600 text-white text-xs">Sundried: +84 (Heat wave)</Badge>
            </div>
          </div>
          <MutationGrid mutations={filterMutations("temperature")} type="temperature" />
          {filterMutations("temperature").length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Thermometer className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No temperature mutations found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
