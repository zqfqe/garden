"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TutorialStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  action?: string
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "Welcome to Grow a Garden Calculator! 🌱",
    description: "Let's take a quick tour to help you calculate crop values like a pro. This will only take 2 minutes!",
    target: "body",
    position: "top",
  },
  {
    id: "crop-selection",
    title: "Step 1: Choose Your Crop",
    description:
      "Start by selecting any crop from our complete list of 49 authentic Roblox Grow a Garden crops. Try searching or filtering by rarity!",
    target: "[data-tutorial='crop-selector']",
    position: "right",
    action: "Select any crop to continue",
  },
  {
    id: "mutations",
    title: "Step 2: Add Mutations",
    description:
      "Mutations dramatically increase crop value! Growth mutations like Gold (×20) are multipliers, while environmental mutations add bonuses.",
    target: "[data-tutorial='mutation-selector']",
    position: "left",
    action: "Try adding a Gold or Rainbow mutation",
  },
  {
    id: "parameters",
    title: "Step 3: Set Parameters",
    description:
      "Weight is SQUARED in the formula - so heavier crops are exponentially more valuable! Also set quantity and friend boost.",
    target: "[data-tutorial='parameters']",
    position: "top",
    action: "Adjust weight and quantity",
  },
  {
    id: "calculate",
    title: "Step 4: Calculate Value",
    description: "Hit the calculate button to see your exact Sheckle value using the authentic Roblox formula!",
    target: "[data-tutorial='calculate-button']",
    position: "top",
    action: "Click Calculate Value",
  },
  {
    id: "results",
    title: "View Your Results",
    description:
      "See the detailed breakdown, copy the value, or save to history for future reference. You can also compare different combinations!",
    target: "[data-tutorial='results']",
    position: "left",
  },
  {
    id: "complete",
    title: "You're All Set! 🎉",
    description: "You now know how to use the most accurate Grow a Garden calculator. Happy farming and trading!",
    target: "body",
    position: "top",
  },
]

export function TutorialOverlay() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false)

  useEffect(() => {
    // Check if user has seen tutorial before
    const seen = localStorage.getItem("garden-calculator-tutorial-seen")
    if (!seen) {
      setTimeout(() => setIsActive(true), 2000) // Show after 2 seconds
    } else {
      setHasSeenTutorial(true)
    }
  }, [])

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTutorial = () => {
    completeTutorial()
  }

  const completeTutorial = () => {
    setIsActive(false)
    localStorage.setItem("garden-calculator-tutorial-seen", "true")
    setHasSeenTutorial(true)
  }

  const restartTutorial = () => {
    setCurrentStep(0)
    setIsActive(true)
  }

  const currentStepData = tutorialSteps[currentStep]

  if (!isActive && hasSeenTutorial) {
    return (
      <Button
        onClick={restartTutorial}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
      >
        <Play className="h-4 w-4 mr-2" />
        Tutorial
      </Button>
    )
  }

  if (!isActive) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in" />

      {/* Tutorial Card */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg border-2 border-blue-300 shadow-2xl animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-600 text-white">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </Badge>
                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={skipTutorial} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">{currentStepData.title}</h3>

              <p className="text-gray-600 leading-relaxed">{currentStepData.description}</p>

              {currentStepData.action && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium">👉 {currentStepData.action}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button onClick={prevStep} disabled={currentStep === 0} variant="outline" className="bg-transparent">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {currentStep === tutorialSteps.length - 1 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Finish
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button onClick={skipTutorial} className="text-sm text-gray-500 hover:text-gray-700 underline">
                  Skip tutorial
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
