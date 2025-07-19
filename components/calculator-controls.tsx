"use client"

import { useState } from "react"
import { GitCompare, Calculator, History, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCalculatorStore } from "@/lib/store"
import { ComparisonMode } from "./comparison-mode"

export function CalculatorControls() {
  const { comparisonMode, toggleComparisonMode, history } = useCalculatorStore()
  const [showSettings, setShowSettings] = useState(false)

  if (comparisonMode) {
    return <ComparisonMode />
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-800">Calculator Mode</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <History className="h-4 w-4" />
                <span>{history.length} saved calculations</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={toggleComparisonMode}
              className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Mode
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Display Options</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Show rarity indicators</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Show crop descriptions</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Calculation</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Auto-save calculations</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Show formula breakdown</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Performance</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Real-time updates</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Reduced animations</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
