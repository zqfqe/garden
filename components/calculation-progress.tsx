"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Calculator } from "lucide-react"
import { useCalculatorStore } from "@/lib/store"

export function CalculationProgress() {
  const { isCalculating, selectedCrop } = useCalculatorStore()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const steps = [
    { label: "验证参数", duration: 100 },
    { label: "计算重量平方", duration: 100 },
    { label: "处理生长变异", duration: 100 },
    { label: "计算环境变异", duration: 100 },
    { label: "应用好友加成", duration: 100 },
    { label: "生成最终结果", duration: 100 },
  ]

  useEffect(() => {
    if (isCalculating) {
      setProgress(0)
      let currentProgress = 0
      let stepIndex = 0

      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setCurrentStep(steps[stepIndex].label)
          currentProgress += 100 / steps.length
          setProgress(currentProgress)
          stepIndex++
        } else {
          clearInterval(interval)
        }
      }, steps[0].duration)

      return () => clearInterval(interval)
    } else {
      setProgress(0)
      setCurrentStep("")
    }
  }, [isCalculating])

  if (!isCalculating) return null

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-blue-800">
            <div className="animate-spin">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="font-semibold">正在计算 {selectedCrop?.name} 的价值...</span>
          </div>

          <Progress value={progress} className="h-3" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {currentStep}
            </span>
            <span className="text-blue-500">{Math.round(progress)}%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {steps.slice(0, 3).map((step, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  progress > (index + 1) * (100 / steps.length)
                    ? "bg-green-100 text-green-700"
                    : progress > index * (100 / steps.length)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {steps.slice(3).map((step, index) => (
              <div
                key={index + 3}
                className={`p-2 rounded ${
                  progress > (index + 4) * (100 / steps.length)
                    ? "bg-green-100 text-green-700"
                    : progress > (index + 3) * (100 / steps.length)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
