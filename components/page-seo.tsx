"use client"

import Head from "next/head"

interface PageSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  noindex?: boolean
}

export function PageSEO({ title, description, keywords = [], canonical, noindex = false }: PageSEOProps) {
  const defaultTitle = "Grow a Garden Mutation Calculator - Roblox Crop Value Calculator"
  const defaultDescription =
    "Calculate exact crop values in Roblox Grow a Garden with our authentic mutation calculator. Features all 49 crops, 42 mutations, weight squared formula, and friend boost system."

  const pageTitle = title ? `${title} | Grow a Garden Calculator` : defaultTitle
  const pageDescription = description || defaultDescription

  const defaultKeywords = [
    "Grow a Garden Calculator",
    "Roblox Grow a Garden",
    "Mutation Calculator",
    "Crop Value Calculator",
  ]

  const allKeywords = [...defaultKeywords, ...keywords].join(", ")

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={allKeywords} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
    </Head>
  )
}
