import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Crop, Mutation } from "./data"

interface CalculationHistory {
  id: string
  timestamp: Date
  crop: Crop
  growthMutation: Mutation | null
  environmentalMutations: Mutation[]
  temperatureMutations: Mutation[]
  weight: number
  quantity: number
  friendBoost: number
  finalValue: number
}

interface CalculatorState {
  selectedCrop: Crop | null
  selectedGrowthMutation: Mutation | null
  selectedEnvironmentalMutations: Mutation[]
  selectedTemperatureMutations: Mutation[]
  weight: number
  quantity: number
  friendBoost: number
  calculatedValue: number
  history: CalculationHistory[]
  comparisonMode: boolean
  comparisonA: {
    crop: Crop | null
    growthMutation: Mutation | null
    environmentalMutations: Mutation[]
    temperatureMutations: Mutation[]
    weight: number
    quantity: number
    friendBoost: number
    value: number
  }
  comparisonB: {
    crop: Crop | null
    growthMutation: Mutation | null
    environmentalMutations: Mutation[]
    temperatureMutations: Mutation[]
    weight: number
    quantity: number
    friendBoost: number
    value: number
  }
  isCalculating: boolean
  hasCalculated: boolean
  undoStack: any[]
  redoStack: any[]
  canUndo: boolean
  canRedo: boolean

  // Actions
  setSelectedCrop: (crop: Crop | null) => void
  setGrowthMutation: (mutation: Mutation | null) => void
  toggleEnvironmentalMutation: (mutation: Mutation) => void
  toggleTemperatureMutation: (mutation: Mutation) => void
  setWeight: (weight: number) => void
  setQuantity: (quantity: number) => void
  setFriendBoost: (boost: number) => void
  clearAll: () => void
  calculateValue: () => void
  saveToHistory: () => void
  clearHistory: () => void
  toggleComparisonMode: () => void
  setComparisonA: (data: Partial<CalculatorState["comparisonA"]>) => void
  setComparisonB: (data: Partial<CalculatorState["comparisonB"]>) => void
  resetCalculation: () => void
  undo: () => void
  redo: () => void
  saveStateToHistory: () => void
}

// Authentic Grow a Garden calculation formula
const calculateCropValue = (
  crop: Crop | null,
  growthMutation: Mutation | null,
  environmentalMutations: Mutation[],
  temperatureMutations: Mutation[],
  weight: number,
  quantity: number,
  friendBoost: number,
): number => {
  if (!crop) return 0

  // Step 1: Crop Constant
  const cropConstant = crop.baseValue

  // Step 2: Weight Squared
  const weightSquared = weight * weight

  // Step 3: Growth Mutation (multiplier, only one allowed)
  const growthMultiplier = growthMutation ? growthMutation.bonus : 1

  // Step 4: Environmental + Temperature Mutations (1 + Σ bonuses - mutation count)
  const allEnvironmentalMutations = [...environmentalMutations, ...temperatureMutations]
  const environmentalBonusSum = allEnvironmentalMutations.reduce((sum, mutation) => sum + mutation.bonus, 0)
  const mutationCount = allEnvironmentalMutations.length
  const environmentalMultiplier = Math.max(1, 1 + environmentalBonusSum - mutationCount)

  // Step 5: Friend Boost (1 + boost percentage)
  const friendMultiplier = 1 + friendBoost / 100

  // Final Formula: Crop Constant × Weight² × Growth Mutation × Environmental Multiplier × Friend Boost × Quantity
  const finalValue =
    cropConstant * weightSquared * growthMultiplier * environmentalMultiplier * friendMultiplier * quantity

  return Math.round(finalValue)
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set, get) => ({
      selectedCrop: null,
      selectedGrowthMutation: null,
      selectedEnvironmentalMutations: [],
      selectedTemperatureMutations: [],
      weight: 1.0,
      quantity: 1,
      friendBoost: 0,
      calculatedValue: 0,
      history: [],
      comparisonMode: false,
      comparisonA: {
        crop: null,
        growthMutation: null,
        environmentalMutations: [],
        temperatureMutations: [],
        weight: 1.0,
        quantity: 1,
        friendBoost: 0,
        value: 0,
      },
      comparisonB: {
        crop: null,
        growthMutation: null,
        environmentalMutations: [],
        temperatureMutations: [],
        weight: 1.0,
        quantity: 1,
        friendBoost: 0,
        value: 0,
      },
      isCalculating: false,
      hasCalculated: false,
      undoStack: [],
      redoStack: [],
      canUndo: false,
      canRedo: false,

      setSelectedCrop: (crop) => {
        get().saveStateToHistory()
        set({ selectedCrop: crop })
      },

      setGrowthMutation: (mutation) => {
        get().saveStateToHistory()
        set({ selectedGrowthMutation: mutation })
      },

      toggleEnvironmentalMutation: (mutation) => {
        get().saveStateToHistory()
        const { selectedEnvironmentalMutations } = get()
        const isSelected = selectedEnvironmentalMutations.some((m) => m.id === mutation.id)

        if (isSelected) {
          set({ selectedEnvironmentalMutations: selectedEnvironmentalMutations.filter((m) => m.id !== mutation.id) })
        } else {
          set({ selectedEnvironmentalMutations: [...selectedEnvironmentalMutations, mutation] })
        }
      },

      toggleTemperatureMutation: (mutation) => {
        get().saveStateToHistory()
        const { selectedTemperatureMutations } = get()
        const isSelected = selectedTemperatureMutations.some((m) => m.id === mutation.id)

        if (isSelected) {
          set({ selectedTemperatureMutations: selectedTemperatureMutations.filter((m) => m.id !== mutation.id) })
        } else {
          set({ selectedTemperatureMutations: [...selectedTemperatureMutations, mutation] })
        }
      },

      setWeight: (weight) => {
        get().saveStateToHistory()
        set({ weight })
      },

      setQuantity: (quantity) => {
        get().saveStateToHistory()
        set({ quantity })
      },

      setFriendBoost: (boost) => {
        get().saveStateToHistory()
        set({ friendBoost: Math.min(100, Math.max(0, boost)) }) // Clamp between 0-100%
      },

      clearAll: () => {
        set({
          selectedCrop: null,
          selectedGrowthMutation: null,
          selectedEnvironmentalMutations: [],
          selectedTemperatureMutations: [],
          weight: 1.0,
          quantity: 1,
          friendBoost: 0,
          calculatedValue: 0,
        })
      },

      calculateValue: () => {
        set({ isCalculating: true })

        // Add short delay to simulate calculation process
        setTimeout(() => {
          const {
            selectedCrop,
            selectedGrowthMutation,
            selectedEnvironmentalMutations,
            selectedTemperatureMutations,
            weight,
            quantity,
            friendBoost,
          } = get()

          const value = calculateCropValue(
            selectedCrop,
            selectedGrowthMutation,
            selectedEnvironmentalMutations,
            selectedTemperatureMutations,
            weight,
            quantity,
            friendBoost,
          )

          set({
            calculatedValue: value,
            isCalculating: false,
            hasCalculated: true,
          })
        }, 500)
      },

      saveToHistory: () => {
        const {
          selectedCrop,
          selectedGrowthMutation,
          selectedEnvironmentalMutations,
          selectedTemperatureMutations,
          weight,
          quantity,
          friendBoost,
          calculatedValue,
          history,
        } = get()

        if (!selectedCrop) return

        const newEntry: CalculationHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          crop: selectedCrop,
          growthMutation: selectedGrowthMutation,
          environmentalMutations: [...selectedEnvironmentalMutations],
          temperatureMutations: [...selectedTemperatureMutations],
          weight,
          quantity,
          friendBoost,
          finalValue: calculatedValue,
        }

        set({ history: [newEntry, ...history.slice(0, 19)] }) // Keep last 20 entries
      },

      clearHistory: () => {
        set({ history: [] })
      },

      toggleComparisonMode: () => {
        set({ comparisonMode: !get().comparisonMode })
      },

      setComparisonA: (data) => {
        const current = get().comparisonA
        const updated = { ...current, ...data }

        const value = calculateCropValue(
          updated.crop,
          updated.growthMutation,
          updated.environmentalMutations,
          updated.temperatureMutations,
          updated.weight,
          updated.quantity,
          updated.friendBoost,
        )

        updated.value = value
        set({ comparisonA: updated })
      },

      setComparisonB: (data) => {
        const current = get().comparisonB
        const updated = { ...current, ...data }

        const value = calculateCropValue(
          updated.crop,
          updated.growthMutation,
          updated.environmentalMutations,
          updated.temperatureMutations,
          updated.weight,
          updated.quantity,
          updated.friendBoost,
        )

        updated.value = value
        set({ comparisonB: updated })
      },
      resetCalculation: () => {
        set({
          calculatedValue: 0,
          hasCalculated: false,
          isCalculating: false,
        })
      },
      saveStateToHistory: () => {
        const currentState = {
          selectedCrop: get().selectedCrop,
          selectedGrowthMutation: get().selectedGrowthMutation,
          selectedEnvironmentalMutations: get().selectedEnvironmentalMutations,
          selectedTemperatureMutations: get().selectedTemperatureMutations,
          weight: get().weight,
          quantity: get().quantity,
          friendBoost: get().friendBoost,
        }

        const { undoStack } = get()
        const newUndoStack = [...undoStack, currentState].slice(-10) // Keep last 10 states

        set({
          undoStack: newUndoStack,
          redoStack: [], // Clear redo stack when new action is performed
          canUndo: newUndoStack.length > 0,
          canRedo: false,
        })
      },

      undo: () => {
        const { undoStack, redoStack } = get()
        if (undoStack.length === 0) return

        const currentState = {
          selectedCrop: get().selectedCrop,
          selectedGrowthMutation: get().selectedGrowthMutation,
          selectedEnvironmentalMutations: get().selectedEnvironmentalMutations,
          selectedTemperatureMutations: get().selectedTemperatureMutations,
          weight: get().weight,
          quantity: get().quantity,
          friendBoost: get().friendBoost,
        }

        const previousState = undoStack[undoStack.length - 1]
        const newUndoStack = undoStack.slice(0, -1)
        const newRedoStack = [...redoStack, currentState]

        set({
          ...previousState,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
          canUndo: newUndoStack.length > 0,
          canRedo: true,
          calculatedValue: 0,
          hasCalculated: false,
        })
      },

      redo: () => {
        const { redoStack, undoStack } = get()
        if (redoStack.length === 0) return

        const currentState = {
          selectedCrop: get().selectedCrop,
          selectedGrowthMutation: get().selectedGrowthMutation,
          selectedEnvironmentalMutations: get().selectedEnvironmentalMutations,
          selectedTemperatureMutations: get().selectedTemperatureMutations,
          weight: get().weight,
          quantity: get().quantity,
          friendBoost: get().friendBoost,
        }

        const nextState = redoStack[redoStack.length - 1]
        const newRedoStack = redoStack.slice(0, -1)
        const newUndoStack = [...undoStack, currentState]

        set({
          ...nextState,
          undoStack: newUndoStack,
          redoStack: newRedoStack,
          canUndo: true,
          canRedo: newRedoStack.length > 0,
          calculatedValue: 0,
          hasCalculated: false,
        })
      },
    }),
    {
      name: "garden-calculator-storage",
      partialize: (state) => ({
        history: state.history,
        comparisonA: state.comparisonA,
        comparisonB: state.comparisonB,
      }),
    },
  ),
)
