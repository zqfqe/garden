"use client"

import { useEffect } from "react"
import { useCalculatorStore } from "@/lib/store"

export function KeyboardShortcuts() {
  const { calculateValue, clearAll, undo, redo, canUndo, canRedo, selectedCrop, hasCalculated, saveToHistory } =
    useCalculatorStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key
      const isModifierPressed = event.ctrlKey || event.metaKey
      const shiftKey = event.shiftKey

      // Prevent shortcuts when user is typing in input fields
      const activeElement = document.activeElement
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.contentEditable === "true")
      ) {
        return
      }

      // Ctrl/Cmd + Enter: Calculate
      if (isModifierPressed && key === "Enter") {
        event.preventDefault()
        if (selectedCrop) {
          calculateValue()
        }
        return
      }

      // Ctrl/Cmd + S: Save to history
      if (isModifierPressed && key === "s") {
        event.preventDefault()
        if (hasCalculated) {
          saveToHistory()
        }
        return
      }

      // Escape key to clear all
      if (key === "Escape") {
        event.preventDefault()
        clearAll()
        return
      }

      // Ctrl/Cmd + Z: Undo
      if (isModifierPressed && key === "z" && !shiftKey) {
        event.preventDefault()
        if (canUndo) {
          undo()
        }
        return
      }

      // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
      if (isModifierPressed && ((key === "z" && shiftKey) || key === "y")) {
        event.preventDefault()
        if (canRedo) {
          redo()
        }
        return
      }

      // Enter key for calculation (when not in input)
      if (key === "Enter") {
        event.preventDefault()
        if (selectedCrop) {
          calculateValue()
        }
        return
      }

      // C key to clear all
      if (key === "c" && !isModifierPressed) {
        event.preventDefault()
        clearAll()
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [calculateValue, clearAll, undo, redo, canUndo, canRedo, selectedCrop, hasCalculated, saveToHistory])

  return null // This component doesn't render anything
}
