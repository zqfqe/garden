"use client"

import { useEffect } from "react"

export function SEOOptimization() {
  useEffect(() => {
    // 添加结构化数据 - 更全面的Schema.org标记
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://growagardenmutationcalculator.pro/#webapp",
          name: "Grow a Garden Mutation Calculator",
          alternateName: "Garden Calculator",
          description:
            "Calculate exact crop values in Roblox Grow a Garden with mutations, weight, and quantity support. Features all 49 crops and 42 mutations with authentic game formula.",
          url: "https://growagardenmutationcalculator.pro",
          applicationCategory: "GameApplication",
          operatingSystem: "Web Browser",
          browserRequirements: "Requires JavaScript. Requires HTML5.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          creator: {
            "@type": "Organization",
            name: "Grow a Garden Calculator Team",
            url: "https://growagardenmutationcalculator.pro/about",
          },
          keywords: "Roblox, Grow a Garden, Calculator, Mutations, Crops, Gaming Tool, Price List, Farming Guide",
          inLanguage: "en-US",
          isAccessibleForFree: true,
          screenshot: "https://growagardenmutationcalculator.pro/android-chrome-512x512.png",
        },
        {
          "@type": "Organization",
          "@id": "https://growagardenmutationcalculator.pro/#organization",
          name: "Grow a Garden Calculator Team",
          url: "https://growagardenmutationcalculator.pro",
          logo: {
            "@type": "ImageObject",
            url: "https://growagardenmutationcalculator.pro/android-chrome-512x512.png",
            width: 512,
            height: 512,
          },
          contactPoint: {
            "@type": "ContactPoint",
            email: "info@growagardenmutationcalculator.pro",
            contactType: "customer service",
          },
          sameAs: [
            "https://growagardenmutationcalculator.pro/about",
            "https://growagardenmutationcalculator.pro/contact",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://growagardenmutationcalculator.pro/#website",
          url: "https://growagardenmutationcalculator.pro",
          name: "Grow a Garden Mutation Calculator",
          description:
            "The ultimate Roblox Grow a Garden calculator with authentic crop values and mutation multipliers",
          publisher: {
            "@id": "https://growagardenmutationcalculator.pro/#organization",
          },
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://growagardenmutationcalculator.pro/?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://growagardenmutationcalculator.pro/#breadcrumb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://growagardenmutationcalculator.pro",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Calculator",
              item: "https://growagardenmutationcalculator.pro/#calculator",
            },
          ],
        },
        {
          "@type": "FAQPage",
          "@id": "https://growagardenmutationcalculator.pro/#faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "How accurate is the Grow a Garden Mutation Calculator?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our calculator uses the exact formula from Roblox Grow a Garden with 100% accurate crop values and mutation multipliers taken directly from the game data.",
              },
            },
            {
              "@type": "Question",
              name: "What crops are supported in the calculator?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We support all 49 crops from Roblox Grow a Garden, from Common crops like Carrot to Transcendent crops like Bone Blossom.",
              },
            },
            {
              "@type": "Question",
              name: "How do mutations work in Grow a Garden?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Mutations are special effects that modify crop values. Growth mutations like Gold (×20) and Rainbow (×50) are multipliers, while environmental mutations add bonuses that are calculated as (1 + Σ bonuses - mutation count).",
              },
            },
          ],
        },
      ],
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return null
}
