"use client"
import { GitCompare, ArrowRight, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCalculatorStore } from "@/lib/store"
import { crops, mutations, rarityColors } from "@/lib/data"

export function ComparisonMode() {
  const { comparisonA, comparisonB, setComparisonA, setComparisonB, toggleComparisonMode } = useCalculatorStore()

  const formatNumber = (num: number) => num.toLocaleString()

  const getDifference = () => {
    const diff = comparisonB.value - comparisonA.value
    const percentage = comparisonA.value > 0 ? (diff / comparisonA.value) * 100 : 0
    return { diff, percentage }
  }

  const { diff, percentage } = getDifference()

  const ComparisonCard = ({
    title,
    data,
    setData,
    color,
  }: {
    title: string
    data: any
    setData: any
    color: string
  }) => (
    <Card className={`border-2 ${color}`}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Crop Selection */}
        <div>
          <Label className="text-sm font-medium">Crop</Label>
          <Select
            value={data.crop?.id || ""}
            onValueChange={(value) => {
              const crop = crops.find((c) => c.id === value)
              setData({ crop, mutations: [] })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.id} value={crop.id}>
                  {crop.name} ({crop.baseValue} base)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mutations */}
        <div>
          <Label className="text-sm font-medium">Mutations</Label>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {mutations.map((mutation) => {
              const isSelected = data.mutations.some((m: any) => m.id === mutation.id)
              return (
                <Button
                  key={mutation.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-auto p-2"
                  onClick={() => {
                    const newMutations = isSelected
                      ? data.mutations.filter((m: any) => m.id !== mutation.id)
                      : [...data.mutations, mutation]
                    setData({ mutations: newMutations })
                  }}
                >
                  {mutation.name} (+{mutation.multiplier})
                </Button>
              )
            })}
          </div>
        </div>

        {/* Parameters */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-sm">Weight</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={data.weight}
              onChange={(e) => setData({ weight: Number.parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div>
            <Label className="text-sm">Quantity</Label>
            <Input
              type="number"
              min="1"
              step="1"
              value={data.quantity}
              onChange={(e) => setData({ quantity: Number.parseInt(e.target.value) || 1 })}
            />
          </div>
        </div>

        {/* Result */}
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(data.value)}</div>
          <div className="text-sm text-gray-600">Sheckles</div>
          {data.crop && <Badge className={`${rarityColors[data.crop.rarity]} text-xs mt-2`}>{data.crop.rarity}</Badge>}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <GitCompare className="h-6 w-6" />
          Comparison Mode
        </h2>
        <Button
          variant="outline"
          onClick={toggleComparisonMode}
          className="border-blue-300 text-blue-700 bg-transparent"
        >
          Exit Comparison
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComparisonCard title="Configuration A" data={comparisonA} setData={setComparisonA} color="border-blue-300" />

        <ComparisonCard title="Configuration B" data={comparisonB} setData={setComparisonB} color="border-green-300" />
      </div>

      {/* Comparison Results */}
      <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-center text-amber-800 flex items-center justify-center gap-2">
            <Crown className="h-5 w-5" />
            Comparison Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 text-lg">
              <span className="font-bold text-blue-600">{formatNumber(comparisonA.value)}</span>
              <ArrowRight className="h-5 w-5 text-gray-400" />
              <span className="font-bold text-green-600">{formatNumber(comparisonB.value)}</span>
            </div>

            <div className="space-y-2">
              <div className={`text-2xl font-bold ${diff >= 0 ? "text-green-600" : "text-red-600"}`}>
                {diff >= 0 ? "+" : ""}
                {formatNumber(diff)} Sheckles
              </div>
              <div className={`text-lg ${percentage >= 0 ? "text-green-600" : "text-red-600"}`}>
                {percentage >= 0 ? "+" : ""}
                {percentage.toFixed(1)}% difference
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {diff > 0
                ? "Configuration B is more valuable"
                : diff < 0
                  ? "Configuration A is more valuable"
                  : "Both configurations have equal value"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
