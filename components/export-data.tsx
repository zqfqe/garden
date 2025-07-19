"use client"

import { useState } from "react"
import { Download, FileText, ImageIcon, Database, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCalculatorStore } from "@/lib/store"
import html2canvas from "html2canvas"

type ExportFormat = "csv" | "json" | "txt" | "image"

export function ExportData() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<ExportFormat>("csv")
  const [exported, setExported] = useState(false)

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
    hasCalculated,
  } = useCalculatorStore()

  const getCurrentCalculation = () => {
    if (!selectedCrop || !hasCalculated) return null

    return {
      timestamp: new Date().toISOString(),
      crop: {
        name: selectedCrop.name,
        baseValue: selectedCrop.baseValue,
        rarity: selectedCrop.rarity,
      },
      mutations: {
        growth: selectedGrowthMutation
          ? {
              name: selectedGrowthMutation.name,
              multiplier: selectedGrowthMutation.bonus,
            }
          : null,
        environmental: selectedEnvironmentalMutations.map((m) => ({
          name: m.name,
          bonus: m.bonus,
        })),
        temperature: selectedTemperatureMutations.map((m) => ({
          name: m.name,
          bonus: m.bonus,
        })),
      },
      parameters: {
        weight,
        quantity,
        friendBoost,
      },
      result: {
        finalValue: calculatedValue,
        formula: `${selectedCrop.baseValue} × ${weight}² × ${selectedGrowthMutation?.bonus || 1} × Environmental × ${1 + friendBoost / 100} × ${quantity}`,
      },
    }
  }

  const exportAsCSV = (data: any) => {
    const headers = [
      "Timestamp",
      "Crop",
      "Base Value",
      "Weight",
      "Quantity",
      "Friend Boost",
      "Growth Mutation",
      "Environmental Count",
      "Final Value",
    ]
    const rows = [headers]

    if (data) {
      rows.push([
        data.timestamp,
        data.crop.name,
        data.crop.baseValue.toString(),
        data.parameters.weight.toString(),
        data.parameters.quantity.toString(),
        data.parameters.friendBoost.toString(),
        data.mutations.growth?.name || "None",
        data.mutations.environmental.length.toString(),
        data.result.finalValue.toString(),
      ])
    }

    // Add history data
    history.forEach((entry) => {
      rows.push([
        entry.timestamp.toISOString(),
        entry.crop.name,
        entry.crop.baseValue.toString(),
        entry.weight.toString(),
        entry.quantity.toString(),
        entry.friendBoost.toString(),
        entry.growthMutation?.name || "None",
        entry.environmentalMutations.length.toString(),
        entry.finalValue.toString(),
      ])
    })

    const csvContent = rows.map((row) => row.join(",")).join("\n")
    return csvContent
  }

  const exportAsJSON = (data: any) => {
    const exportData = {
      currentCalculation: data,
      history: history.map((entry) => ({
        timestamp: entry.timestamp,
        crop: entry.crop,
        mutations: {
          growth: entry.growthMutation,
          environmental: entry.environmentalMutations,
          temperature: entry.temperatureMutations,
        },
        parameters: {
          weight: entry.weight,
          quantity: entry.quantity,
          friendBoost: entry.friendBoost,
        },
        result: {
          finalValue: entry.finalValue,
        },
      })),
      exportedAt: new Date().toISOString(),
      version: "1.0",
    }

    return JSON.stringify(exportData, null, 2)
  }

  const exportAsText = (data: any) => {
    let content = "=== GROW A GARDEN CALCULATION REPORT ===\n\n"

    if (data) {
      content += `Current Calculation (${new Date().toLocaleDateString()}):\n`
      content += `Crop: ${data.crop.name} (${data.crop.rarity})\n`
      content += `Base Value: ${data.crop.baseValue.toLocaleString()} Sheckles\n`
      content += `Weight: ${data.parameters.weight} kg\n`
      content += `Quantity: ${data.parameters.quantity}\n`
      content += `Friend Boost: ${data.parameters.friendBoost}%\n`

      if (data.mutations.growth) {
        content += `Growth Mutation: ${data.mutations.growth.name} (×${data.mutations.growth.multiplier})\n`
      }

      if (data.mutations.environmental.length > 0) {
        content += `Environmental Mutations: ${data.mutations.environmental.map((m) => `${m.name} (+${m.bonus})`).join(", ")}\n`
      }

      if (data.mutations.temperature.length > 0) {
        content += `Temperature Mutations: ${data.mutations.temperature.map((m) => `${m.name} (+${m.bonus})`).join(", ")}\n`
      }

      content += `\nFINAL VALUE: ${data.result.finalValue.toLocaleString()} Sheckles\n`
      content += `Formula: ${data.result.formula}\n\n`
    }

    if (history.length > 0) {
      content += "=== CALCULATION HISTORY ===\n\n"
      history.forEach((entry, index) => {
        content += `${index + 1}. ${entry.crop.name} - ${entry.finalValue.toLocaleString()} Sheckles\n`
        content += `   Date: ${entry.timestamp.toLocaleDateString()}\n`
        content += `   Weight: ${entry.weight}, Quantity: ${entry.quantity}\n\n`
      })
    }

    content += `Generated by Grow a Garden Mutation Calculator\n`
    content += `https://growagardenmutationcalculator.pro\n`

    return content
  }

  const exportAsImage = async () => {
    const element = document.querySelector('[data-tutorial="results"]') as HTMLElement
    if (!element) return null

    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      logging: false,
    })

    return canvas.toDataURL("image/png")
  }

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const currentData = getCurrentCalculation()
      const timestamp = new Date().toISOString().split("T")[0]

      switch (exportFormat) {
        case "csv":
          const csvContent = exportAsCSV(currentData)
          downloadFile(csvContent, `grow-garden-calculations-${timestamp}.csv`, "text/csv")
          break

        case "json":
          const jsonContent = exportAsJSON(currentData)
          downloadFile(jsonContent, `grow-garden-calculations-${timestamp}.json`, "application/json")
          break

        case "txt":
          const textContent = exportAsText(currentData)
          downloadFile(textContent, `grow-garden-report-${timestamp}.txt`, "text/plain")
          break

        case "image":
          const imageData = await exportAsImage()
          if (imageData) {
            downloadImage(imageData, `grow-garden-calculation-${timestamp}.png`)
          }
          break
      }

      setExported(true)
      setTimeout(() => setExported(false), 2000)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case "csv":
      case "txt":
        return <FileText className="h-4 w-4" />
      case "json":
        return <Database className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const getFormatDescription = (format: ExportFormat) => {
    switch (format) {
      case "csv":
        return "Spreadsheet format for Excel/Google Sheets"
      case "json":
        return "Structured data format for developers"
      case "txt":
        return "Human-readable text report"
      case "image":
        return "PNG image of your calculation results"
    }
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Export Format</label>
          <Select value={exportFormat} onValueChange={(value: ExportFormat) => setExportFormat(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  CSV (Spreadsheet)
                </div>
              </SelectItem>
              <SelectItem value="json">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  JSON (Data)
                </div>
              </SelectItem>
              <SelectItem value="txt">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text Report
                </div>
              </SelectItem>
              <SelectItem value="image">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  PNG Image
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">{getFormatDescription(exportFormat)}</p>
        </div>

        <div className="bg-white p-3 rounded-lg border border-green-200">
          <h4 className="font-medium text-gray-800 mb-2">Export Includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {hasCalculated && <li>✓ Current calculation results</li>}
            {history.length > 0 && <li>✓ Calculation history ({history.length} entries)</li>}
            <li>✓ Detailed formula breakdown</li>
            <li>✓ Timestamp and metadata</li>
          </ul>
        </div>

        <Button
          onClick={handleExport}
          disabled={isExporting || (!hasCalculated && history.length === 0)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Exporting...
            </>
          ) : exported ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Exported!
            </>
          ) : (
            <>
              {getFormatIcon(exportFormat)}
              <span className="ml-2">Export {exportFormat.toUpperCase()}</span>
            </>
          )}
        </Button>

        {!hasCalculated && history.length === 0 && (
          <p className="text-xs text-gray-500 text-center">Complete a calculation or have history to export data</p>
        )}
      </CardContent>
    </Card>
  )
}
