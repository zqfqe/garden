import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Grow a Garden Mutation Calculator - Roblox Crop Value Calculator",
    template: "%s | Grow a Garden Calculator",
  },
  description:
    "Calculate exact crop values in Roblox Grow a Garden with our authentic mutation calculator. Features all 49 crops, 42 mutations, weight squared formula, and friend boost system. Free Grow a Garden price list and farming guide.",
  keywords: [
    "Grow a Garden Calculator",
    "Roblox Grow a Garden",
    "Mutation Calculator",
    "Crop Value Calculator",
    "Grow a Garden Mutations",
    "Roblox Calculator",
    "Garden Calculator",
    "Crop Pricing Tool",
    "Grow a Garden Price List",
    "Mutation Multiplier Roblox",
    "Grow a Garden Value Tool",
    "Grow a Garden Profit Calculator",
    "Grow a Garden Best Crop",
    "Grow a Garden Farming Tips",
    "Grow a Garden Money Guide",
    "Grow a Garden Earning Calculator",
    "Grow a Garden Celestial Mutation",
    "Grow a Garden Prehistoric Crops",
    "Grow a Garden Crop Prices",
    "Grow a Garden Mutation Guide",
  ],
  authors: [{ name: "Grow a Garden Calculator Team", url: "https://growagardenmutationcalculator.pro" }],
  creator: "Grow a Garden Calculator Team",
  publisher: "Grow a Garden Calculator",
  category: "Gaming Tools",
  classification: "Gaming Calculator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://growagardenmutationcalculator.pro",
    title: "Grow a Garden Mutation Calculator - Roblox Crop Value Calculator",
    description:
      "Calculate exact crop values in Roblox Grow a Garden with our authentic mutation calculator. Features all 49 crops, 42 mutations, weight squared formula, and friend boost system.",
    siteName: "Grow a Garden Mutation Calculator",
    images: [
      {
        url: "https://growagardenmutationcalculator.pro/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Grow a Garden Mutation Calculator - Calculate crop values with mutations",
        type: "image/png",
      },
      {
        url: "https://growagardenmutationcalculator.pro/android-chrome-192x192.png",
        width: 192,
        height: 192,
        alt: "Grow a Garden Calculator Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GrowGardenCalc",
    creator: "@GrowGardenCalc",
    title: "Grow a Garden Mutation Calculator - Roblox Crop Value Calculator",
    description:
      "Calculate exact crop values in Roblox Grow a Garden with our authentic mutation calculator. Features all 49 crops, 42 mutations, weight squared formula, and friend boost system.",
    images: ["https://growagardenmutationcalculator.pro/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/android-chrome-192x192.png",
        color: "#10b981",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://growagardenmutationcalculator.pro",
  },
  verification: {
    google: "your-google-verification-code", // 需要添加实际的验证码
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  other: {
    "application-name": "Grow a Garden Calculator",
    "apple-mobile-web-app-title": "Garden Calculator",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#10b981",
    "msapplication-TileImage": "/android-chrome-192x192.png",
    "msapplication-tap-highlight": "no",
    "theme-color": "#10b981",
    "apple-touch-fullscreen": "yes",
    "apple-mobile-web-app-orientations": "portrait",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/android-chrome-192x192.png" color="#10b981" />
        <link rel="canonical" href="https://growagardenmutationcalculator.pro" />
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Garden Calculator" />
        <meta name="application-name" content="Grow a Garden Calculator" />

        {/* 预加载关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS预解析 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
