"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // 监控页面加载性能
    if (typeof window !== "undefined" && "performance" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming
            console.log("Page Load Time:", navEntry.loadEventEnd - navEntry.fetchStart, "ms")
          }

          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime, "ms")
          }

          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime, "ms")
          }
        }
      })

      observer.observe({ entryTypes: ["navigation", "largest-contentful-paint", "first-input"] })

      return () => observer.disconnect()
    }
  }, [])

  return null
}
