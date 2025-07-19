"use client"

import { useState, useEffect } from "react"
import { Calculator, Zap, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCalculatorStore } from "@/lib/store"

export function CalculateButton() {
  const {
    selectedCrop,
    selectedGrowthMutation,
    selectedEnvironmentalMutations,
    selectedTemperatureMutations,
    weight,
    quantity,
    friendBoost,
    calculatedValue,
    isCalculating,
    hasCalculated,
    calculateValue,
    resetCalculation,
  } = useCalculatorStore()

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Validate input parameters
  useEffect(() => {
    const errors: string[] = []

    if (!selectedCrop) {
      errors.push("Please select a crop")
    }

    if (weight <= 0) {
      errors.push("Weight must be greater than 0")
    }

    if (quantity <= 0) {
      errors.push("Quantity must be greater than 0")
    }

    setValidationErrors(errors)
  }, [selectedCrop, weight, quantity])

  const canCalculate = validationErrors.length === 0 && !isCalculating

  const handleCalculate = () => {
    if (canCalculate) {
      calculateValue()
    }
  }

  const handleReset = () => {
    resetCalculation()
  }

  const getCalculationSummary = () => {
    if (!selectedCrop) return null

    return {
      crop: selectedCrop.name,
      growthMutation: selectedGrowthMutation?.name || "None",
      environmentalCount: selectedEnvironmentalMutations.length,
      temperatureCount: selectedTemperatureMutations.length,
      weight,
      quantity,
      friendBoost,
    }
  }

  const summary = getCalculationSummary()

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2 flex items-center justify-center gap-2">
              <Calculator className="h-6 w-6" />
              Calculate Value
            </h2>
            <p className="text-sm text-blue-600">Configure your parameters and click calculate to get results</p>
          </div>

          {/* Parameter Summary */}
          {summary && (
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Current Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Crop:</span>
                  <span className="font-semibold text-emerald-600">{summary.crop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Mutation:</span>
                  <span className="font-semibold text-amber-600">{summary.growthMutation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Environmental:</span>
                  <span className="font-semibold text-green-600">{summary.environmentalCount} mutations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temperature:</span>
                  <span className="font-semibold text-blue-600">{summary.temperatureCount} mutations</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold">{summary.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{summary.quantity}</span>
                </div>
              </div>
              {summary.friendBoost > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Friend Boost:</span>
                    <span className="font-semibold text-purple-600">{summary.friendBoost}%</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="font-semibold text-red-800">Please complete the following:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Calculation Result Preview */}
          {hasCalculated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-800">Calculation Complete</span>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 font-mono">{calculatedValue.toLocaleString()}</div>
                <div className="text-sm text-green-600">Sheckles</div>
              </div>
            </div>
          )}

          {/* Calculate Button - 优化用户体验 */}
          <div className="flex gap-3">
            <Button
              onClick={handleCalculate}
              disabled={!canCalculate}
              className={`flex-1 h-12 text-lg font-semibold transition-all duration-200 ${
                isCalculating
                  ? "bg-blue-400 cursor-not-allowed"
                  : canCalculate
                    ? "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg active:scale-95"
                    : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Value
                </>
              )}
            </Button>

            {hasCalculated && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 bg-transparent"
              >
                Reset
              </Button>
            )}
          </div>

          {/* Tips */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>💡 Tip: Weight is squared in the calculation, making it very impactful</p>
            <p>🎯 Suggestion: Configure all parameters before calculating for accurate results</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
