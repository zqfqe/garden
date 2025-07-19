import { CropSelector } from "@/components/crop-selector"
import { MutationSelector } from "@/components/mutation-selector"
import { ParameterInputs } from "@/components/parameter-inputs"
import { CalculateButton } from "@/components/calculate-button"
import { CalculationProgress } from "@/components/calculation-progress"
import { ResultsDisplay } from "@/components/results-display"
import { HistoryPanel } from "@/components/history-panel"
import { CalculatorControls } from "@/components/calculator-controls"
import { AdvancedFeatures } from "@/components/advanced-features"
import { InfoSections } from "@/components/info-sections"
import { QuickActions } from "@/components/quick-actions"
import { GameIntroduction } from "@/components/game-introduction"
import { ErrorBoundary } from "@/components/error-boundary"
import { SEOOptimization } from "@/components/seo-optimization"
import { TutorialOverlay } from "@/components/tutorial-overlay"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ShortcutsHelp } from "@/components/shortcuts-help"
import { ExportData } from "@/components/export-data"

export default function Home() {
  return (
    <ErrorBoundary>
      <SEOOptimization />
      <TutorialOverlay />
      <KeyboardShortcuts />
      <ShortcutsHelp />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Header - 优化移动端 */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 px-2">
              Grow a Garden Mutation Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-6 px-4">
              The ultimate Grow a Garden Calculator for the record-breaking Roblox game. Calculate exact Sheckle values
              using the <strong>authentic game formula</strong> with our comprehensive Grow a Garden Value Tool
              featuring weight squared calculation, mutations, and friend boost system. Get accurate Grow a Garden Crop
              Prices with our advanced Grow a Garden Profit Calculator.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center max-w-2xl mx-auto px-4">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-emerald-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-600">49</div>
                <div className="text-xs sm:text-sm text-gray-500">Authentic Crops</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-purple-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">42</div>
                <div className="text-xs sm:text-sm text-gray-500">Real Mutations</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-amber-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600">100%</div>
                <div className="text-xs sm:text-sm text-gray-500">Accurate Formula</div>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">21.4M</div>
                <div className="text-xs sm:text-sm text-gray-500">Peak Players</div>
              </div>
            </div>
          </div>

          {/* Game Introduction */}
          <GameIntroduction />

          {/* Formula Display */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-6 max-w-4xl mx-auto mb-6 md:mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Authentic Roblox Grow a Garden Formula</h3>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 md:p-4 rounded-lg border">
              <div className="font-mono text-sm md:text-lg font-bold text-purple-800 text-center break-words">
                Total Value = Crop Constant × Weight² × Growth Mutation × Environmental Multiplier × Friend Boost ×
                Quantity
              </div>
              <div className="text-xs md:text-sm text-gray-600 text-center mt-2">
                Environmental Multiplier = (1 + Σ Environmental Bonuses - Mutation Count)
              </div>
            </div>
            <div className="mt-4 text-xs md:text-sm text-gray-600 text-center">
              <p>
                This is the exact same formula used in Roblox Grow a Garden - no approximations or guesswork! Our Grow a
                Garden Mutation Calculator provides 100% accurate results.
              </p>
            </div>
          </div>

          {/* Calculator Controls */}
          <CalculatorControls />

          {/* Main Calculator - Mobile Optimized Layout */}
          <div className="max-w-6xl mx-auto mt-6 md:mt-8 space-y-6 md:space-y-8">
            {/* Step 1: Crop Selection */}
            <div
              className="bg-white rounded-xl shadow-lg border border-emerald-100 p-4 md:p-6"
              data-tutorial="crop-selector"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-emerald-800">
                    Select Your Crop from Grow a Garden Price List
                  </h2>
                </div>
                <div className="text-sm text-gray-500 sm:ml-auto">Choose from 49 authentic crops</div>
              </div>
              <CropSelector />
            </div>

            {/* Step 2: Mutation Selection */}
            <div
              className="bg-white rounded-xl shadow-lg border border-purple-100 p-4 md:p-6"
              data-tutorial="mutation-selector"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-purple-800">
                    Configure Mutations with Grow a Garden Mutation Guide
                  </h2>
                </div>
                <div className="text-sm text-gray-500 sm:ml-auto">42 real game mutations</div>
              </div>
              <MutationSelector />
            </div>

            {/* Step 3: Parameters */}
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 md:p-6" data-tutorial="parameters">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-blue-800">
                    Set Parameters for Grow a Garden Earning Calculator
                  </h2>
                </div>
                <div className="text-sm text-gray-500 sm:ml-auto">Weight, quantity & friend boost</div>
              </div>
              <ParameterInputs />
            </div>

            {/* Step 4: Calculate */}
            <div className="max-w-2xl mx-auto space-y-4" data-tutorial="calculate-button">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center mb-4">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-amber-800">
                    Calculate Value with Grow a Garden Value Tool
                  </h2>
                </div>
                <div className="text-sm text-gray-500 text-center sm:text-left">Get exact Sheckle value</div>
              </div>
              <CalculateButton />
              <CalculationProgress />
            </div>

            {/* Results and Additional Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Results */}
              <div className="lg:col-span-2" data-tutorial="results">
                <div className="bg-white rounded-xl shadow-lg border border-amber-100 p-4 md:p-6">
                  <ResultsDisplay />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6">
                  <QuickActions />
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6">
                  <ExportData />
                </div>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-6">
              <HistoryPanel />
            </div>
          </div>

          {/* Advanced Features */}
          <div className="mt-12 md:mt-16 bg-white rounded-xl shadow-lg border border-gray-100 p-4 md:p-8">
            <AdvancedFeatures />
          </div>

          {/* Information Sections */}
          <InfoSections />
        </div>
      </div>
    </ErrorBoundary>
  )
}
