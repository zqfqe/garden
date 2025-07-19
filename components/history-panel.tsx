"use client"

import { useState } from "react"
import { History, Trash2, Calendar, Leaf, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCalculatorStore } from "@/lib/store"
import { rarityColors } from "@/lib/data"

export function HistoryPanel() {
  const { history, clearHistory, setSelectedCrop, selectedMutations, toggleMutation } = useCalculatorStore()
  const [showAll, setShowAll] = useState(false)

  const displayedHistory = showAll ? history : history.slice(0, 5)

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const loadCalculation = (entry: any) => {
    // Clear current mutations
    selectedMutations.forEach((mutation) => toggleMutation(mutation))

    // Set crop
    setSelectedCrop(entry.crop)

    // Set mutations
    entry.mutations.forEach((mutation: any) => toggleMutation(mutation))
  }

  if (history.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <History className="h-5 w-5" />
            Calculation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No calculations saved yet</p>
            <p className="text-sm">Save your calculations to see them here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
            <History className="h-5 w-5" />
            Calculation History ({history.length})
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={clearHistory}
            className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayedHistory.map((entry) => (
            <div
              key={entry.id}
              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => loadCalculation(entry)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-emerald-600" />
                  <span className="font-semibold">{entry.crop.name}</span>
                  <Badge className={`${rarityColors[entry.crop.rarity]} text-xs`}>{entry.crop.rarity}</Badge>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600">{formatNumber(entry.finalValue)} Sheckles</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(entry.timestamp)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>Weight: {entry.weight}</span>
                  <span>Qty: {entry.quantity}</span>
                </div>
                {entry.mutations.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>{entry.mutations.length} mutations</span>
                  </div>
                )}
              </div>

              {entry.mutations.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {entry.mutations.slice(0, 3).map((mutation) => (
                    <Badge key={mutation.id} variant="outline" className="text-xs">
                      {mutation.name} (+{mutation.multiplier})
                    </Badge>
                  ))}
                  {entry.mutations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{entry.mutations.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {history.length > 5 && (
          <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `Show All (${history.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
