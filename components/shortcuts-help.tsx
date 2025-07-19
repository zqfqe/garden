"use client"

import type React from "react"

import { useState } from "react"
import { Keyboard, X, Zap, Save, RotateCcw, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Shortcut {
  keys: string[]
  description: string
  icon?: React.ReactNode
}

interface ShortcutCategory {
  title: string
  shortcuts: Shortcut[]
}

const shortcuts: ShortcutCategory[] = [
  {
    title: "Calculator Actions",
    shortcuts: [
      {
        keys: ["Ctrl", "Enter"],
        description: "Calculate crop value",
        icon: <Calculator className="h-4 w-4" />,
      },
      {
        keys: ["Enter"],
        description: "Calculate (when not typing)",
        icon: <Zap className="h-4 w-4" />,
      },
      {
        keys: ["Ctrl", "S"],
        description: "Save calculation to history",
        icon: <Save className="h-4 w-4" />,
      },
      {
        keys: ["Escape"],
        description: "Clear all selections",
        icon: <RotateCcw className="h-4 w-4" />,
      },
      {
        keys: ["C"],
        description: "Clear all (when not typing)",
        icon: <RotateCcw className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Undo/Redo",
    shortcuts: [
      { keys: ["Ctrl", "Z"], description: "Undo last action" },
      { keys: ["Ctrl", "Shift", "Z"], description: "Redo last action" },
      { keys: ["Ctrl", "Y"], description: "Redo last action (alternative)" },
    ],
  },
  {
    title: "Navigation Tips",
    shortcuts: [
      { keys: ["Tab"], description: "Navigate between form fields" },
      { keys: ["Shift", "Tab"], description: "Navigate backwards" },
      { keys: ["Space"], description: "Toggle buttons and checkboxes" },
    ],
  },
]

export function ShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50 bg-white border-gray-300 hover:bg-gray-50"
      >
        <Keyboard className="h-4 w-4 mr-2" />
        Shortcuts
      </Button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-blue-300 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Keyboard className="h-5 w-5" />
                    Keyboard Shortcuts
                  </CardTitle>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {shortcuts.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{category.title}</h3>
                    <div className="space-y-2">
                      {category.shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            {shortcut.icon}
                            <span className="text-gray-700">{shortcut.description}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {shortcut.keys.map((key, keyIndex) => (
                              <div key={keyIndex} className="flex items-center gap-1">
                                <Badge variant="outline" className="bg-white text-gray-700 font-mono text-xs px-2 py-1">
                                  {key}
                                </Badge>
                                {keyIndex < shortcut.keys.length - 1 && (
                                  <span className="text-gray-400 text-sm">+</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Shortcuts work when you're not typing in input fields</li>
                    <li>• Use Ctrl+Enter for quick calculations</li>
                    <li>• Press Escape to quickly clear everything</li>
                    <li>• Undo/Redo helps you experiment safely</li>
                  </ul>
                </div>

                <div className="text-center">
                  <Button onClick={() => setIsOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Got it!
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
