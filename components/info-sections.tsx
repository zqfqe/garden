"use client"

import { Calculator, Users, Shield, Zap, HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function InfoSections() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How accurate is the Grow a Garden Mutation Calculator?",
      answer:
        "Our Grow a Garden Calculator uses the exact formula from Roblox Grow a Garden: BaseValue × (1 + Σ MutationMultipliers) × Weight × Quantity. All Grow a Garden Crop Prices and Mutation Multiplier Roblox values are taken directly from the game's current data and updated regularly for maximum accuracy.",
      category: "accuracy",
      keywords: ["accuracy", "formula", "calculation", "precise"],
    },
    {
      question: "What's the difference between mutation rarities in Grow a Garden Mutation Guide?",
      answer:
        "Mutations in our Grow a Garden Price List range from Common (2x multipliers) to Legendary (150x multipliers). Common mutations like Wet (2x) occur frequently, while Legendary mutations like Dawnbound (150x) and Grow a Garden Celestial Mutation are extremely rare admin-exclusive events with massive Mutation Multiplier Roblox effects.",
      category: "mutations",
      keywords: ["mutations", "rarity", "multiplier", "legendary", "common"],
    },
    {
      question: "How do I get Gold and Rainbow mutations using Grow a Garden Farming Tips?",
      answer:
        "According to our Grow a Garden Mutation Guide, Gold mutation has a 1% random chance when harvesting any crop, giving a 20x multiplier. Rainbow mutation is much rarer at 0.1% chance but provides a massive 50x Mutation Multiplier Roblox boost. Our Grow a Garden Value Tool helps calculate these rare mutation values.",
      category: "mutations",
      keywords: ["gold", "rainbow", "rare", "chance", "farming"],
    },
    {
      question: "Can I stack multiple mutations with Grow a Garden Calculator?",
      answer:
        "Yes! Multiple mutations can stack on a single crop in Roblox Grow a Garden. For example, using our Grow a Garden Profit Calculator, a crop with Gold (20x) + Rainbow (50x) + Shocked (100x) would have a total multiplier of 170x added to the base calculation, significantly increasing your Grow a Garden Crop Prices.",
      category: "mutations",
      keywords: ["stacking", "multiple", "combine", "mutations"],
    },
    {
      question: "What are the highest value crops in Grow a Garden Best Crop rankings?",
      answer:
        "According to our Grow a Garden Price List, the highest base value crop is Bone Blossom (Transcendent) at 157,938 Sheckles, followed by Sunflower (Divine) at 144,400 Sheckles and Mushroom (Divine) at 136,278 Sheckles. These Grow a Garden Prehistoric Crops offer the best returns when calculated with our Grow a Garden Earning Calculator.",
      category: "crops",
      keywords: ["highest", "value", "best", "crops", "transcendent", "divine"],
    },
    {
      question: "How do weather events affect crops in Grow a Garden Money Guide?",
      answer:
        "Weather events can add mutations according to our Grow a Garden Mutation Guide: Rain gives Wet (2x), frost gives Chilled (2x), thunderstorms can give Shocked (100x), and sandstorms give Sandy (3x). Some mutations combine, like Wet + Frozen = 10x. Our Grow a Garden Value Tool calculates all these combinations accurately.",
      category: "weather",
      keywords: ["weather", "rain", "frost", "storm", "events"],
    },
    {
      question: "What are admin-exclusive mutations in Grow a Garden Celestial Mutation system?",
      answer:
        "Admin-exclusive mutations like Disco (125x), Voidtouched (135x), and Dawnbound (150x) are special events triggered by game administrators. These provide some of the highest Mutation Multiplier Roblox values in the game. Our Grow a Garden Calculator includes all these rare mutations for complete accuracy.",
      category: "mutations",
      keywords: ["admin", "exclusive", "celestial", "rare", "special"],
    },
    {
      question: "How do I maximize profits using Grow a Garden Farming Tips?",
      answer:
        "Focus on high-rarity crops with powerful mutations using our Grow a Garden Best Crop recommendations. Use our Grow a Garden Profit Calculator comparison mode to evaluate different combinations. Weather events and pet abilities can add valuable mutations to increase your Sheckles significantly. Follow our comprehensive Grow a Garden Money Guide for optimal results.",
      category: "strategy",
      keywords: ["maximize", "profits", "strategy", "tips", "optimization"],
    },
    {
      question: "Is the Grow a Garden Calculator free to use?",
      answer:
        "Yes! Our Grow a Garden Mutation Calculator is completely free to use with no registration required. All features including the Grow a Garden Value Tool, Grow a Garden Profit Calculator, and comprehensive Grow a Garden Price List are available at no cost. Your data is stored locally for privacy.",
      category: "general",
      keywords: ["free", "cost", "registration", "privacy"],
    },
    {
      question: "How often is the Grow a Garden Calculator updated?",
      answer:
        "We monitor Roblox Grow a Garden for updates daily and adjust our calculator immediately when changes are detected. Our team ensures that all Grow a Garden Crop Prices, Mutation Multiplier Roblox values, and game mechanics remain 100% accurate with the latest game version.",
      category: "updates",
      keywords: ["updates", "frequency", "accuracy", "monitoring"],
    },
    {
      question: "Can I use the calculator on mobile devices?",
      answer:
        "Our Grow a Garden Mutation Calculator is fully responsive and optimized for all devices including smartphones and tablets. The mobile version includes all features of the desktop version, ensuring you can calculate Grow a Garden Crop Prices anywhere.",
      category: "technical",
      keywords: ["mobile", "responsive", "devices", "smartphone", "tablet"],
    },
    {
      question: "What browsers are supported by the Grow a Garden Calculator?",
      answer:
        "Our Grow a Garden Value Tool works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest browser version for the best experience with our Grow a Garden Profit Calculator and all advanced features.",
      category: "technical",
      keywords: ["browsers", "compatibility", "chrome", "firefox", "safari"],
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const categories = [
    { id: "all", name: "All Questions", count: faqs.length },
    { id: "accuracy", name: "Accuracy & Formula", count: faqs.filter((f) => f.category === "accuracy").length },
    { id: "mutations", name: "Mutations", count: faqs.filter((f) => f.category === "mutations").length },
    { id: "crops", name: "Crops & Values", count: faqs.filter((f) => f.category === "crops").length },
    { id: "strategy", name: "Strategy & Tips", count: faqs.filter((f) => f.category === "strategy").length },
    { id: "technical", name: "Technical", count: faqs.filter((f) => f.category === "technical").length },
  ]

  const [selectedCategory, setSelectedCategory] = useState("all")

  const categoryFilteredFaqs = filteredFaqs.filter(
    (faq) => selectedCategory === "all" || faq.category === selectedCategory,
  )

  return (
    <div className="space-y-12 mt-16">
      {/* What We Do */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Grow a Garden Mutation Calculator Does</h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          We provide the most accurate and comprehensive Grow a Garden Calculator for Roblox Grow a Garden players.
          Calculate exact Sheckle values for any crop and mutation combination using real game data with our advanced
          Grow a Garden Value Tool featuring 49 crops and 42 mutations with precise Mutation Multiplier Roblox
          calculations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardHeader>
              <Calculator className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <CardTitle className="text-emerald-800">Precise Grow a Garden Crop Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Calculate exact crop values using the official Roblox Grow a Garden formula with real-time updates and
                authentic Mutation Multiplier Roblox values from the actual game. Our Grow a Garden Earning Calculator
                provides the most accurate results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-purple-800">Complete Grow a Garden Price List Database</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access all 49 crops from Common Carrot to Transcendent Bone Blossom, plus 42 mutations including rare
                admin-exclusive Grow a Garden Celestial Mutation events with accurate multipliers in our comprehensive
                Grow a Garden Mutation Guide.
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-blue-800">Player-Focused Grow a Garden Value Tool</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built by active Roblox Grow a Garden players for the community. We continuously update our Grow a Garden
                Calculator database with the latest game changes and player feedback, ensuring our Grow a Garden Profit
                Calculator remains accurate.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How to Use */}
      <section className="bg-gray-50 rounded-2xl p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">How to Use the Grow a Garden Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-emerald-600">1</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Select Your Crop from Grow a Garden Price List</h3>
            <p className="text-gray-600 text-sm">
              Choose from 49 authentic Roblox Grow a Garden crops, from Common Strawberry (14 Sheckles) to Transcendent
              Bone Blossom (157,938 Sheckles). Use our Grow a Garden Best Crop recommendations for optimal selection.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Add Mutations with Grow a Garden Mutation Guide</h3>
            <p className="text-gray-600 text-sm">
              Select any mutations your crop has using our comprehensive Grow a Garden Mutation Calculator. Stack
              multiple mutations like Gold (20x) + Rainbow (50x) for massive value increases with accurate Mutation
              Multiplier Roblox calculations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Enter Weight & Quantity in Grow a Garden Value Tool</h3>
            <p className="text-gray-600 text-sm">
              Input your crop's exact weight (supports decimals) and quantity. Our Grow a Garden Earning Calculator
              updates instantly as you type, providing real-time Grow a Garden Crop Prices calculations.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-amber-600">4</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Get Exact Value with Grow a Garden Profit Calculator</h3>
            <p className="text-gray-600 text-sm">
              View your crop's precise Sheckle value, detailed formula breakdown, and save calculations for future
              trading reference using our comprehensive Grow a Garden Money Guide system.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Badge className="bg-green-600 text-white text-lg px-6 py-2">
            Grow a Garden Formula: BaseValue × (1 + Σ MutationMultipliers) × Weight × Quantity
          </Badge>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Why Choose Our Grow a Garden Mutation Calculator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">100% Authentic Roblox Grow a Garden Data</h3>
                <p className="text-gray-600">
                  All 49 Grow a Garden Crop Prices and 42 Mutation Multiplier Roblox values are taken directly from
                  Roblox Grow a Garden. We monitor game updates and adjust our Grow a Garden Calculator database to
                  match exactly, ensuring our Grow a Garden Price List remains current.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Zap className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Complete Grow a Garden Mutation Guide Database</h3>
                <p className="text-gray-600">
                  From common weather mutations like Wet (2x) to legendary admin events like Dawnbound (150x) and Grow a
                  Garden Celestial Mutation, we have every mutation with accurate multipliers and descriptions in our
                  comprehensive Grow a Garden Value Tool.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calculator className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Advanced Grow a Garden Farming Tips & Trading Tools</h3>
                <p className="text-gray-600">
                  Compare crop configurations, analyze profit potential with our Grow a Garden Profit Calculator, track
                  calculation history, and optimize your trading decisions with professional-grade tools following our
                  proven Grow a Garden Money Guide strategies.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Built by Roblox Grow a Garden Players</h3>
                <p className="text-gray-600">
                  Created by active Roblox Grow a Garden community members who understand the game mechanics, trading
                  strategies, and what players need for successful farming. Our Grow a Garden Earning Calculator
                  reflects real player needs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HelpCircle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Grow a Garden Best Crop Updates</h3>
                <p className="text-gray-600">
                  Get instant calculations as you make selections with our Grow a Garden Calculator. No delays, no
                  waiting - see your crop values update immediately with every change you make using our advanced Grow a
                  Garden Value Tool.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Free & Private Grow a Garden Mutation Calculator</h3>
                <p className="text-gray-600">
                  Completely free to use with no registration required. Your calculations are stored locally in your
                  browser for privacy and offline access. Our Grow a Garden Profit Calculator is always available when
                  you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section className="bg-gray-50 rounded-2xl p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Frequently Asked Questions - Grow a Garden Calculator
        </h2>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FAQ questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-blue-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-300"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {categoryFilteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No questions found matching your search.</p>
              <p className="text-sm text-gray-400 mt-2">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            categoryFilteredFaqs.map((faq, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-gray-800 text-left">{faq.question}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {faq.category}
                      </Badge>
                      {openFaq === index ? (
                        <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Have more questions about our Grow a Garden Mutation Calculator? Our tool is designed to be intuitive and
            accurate for all your Roblox Grow a Garden trading needs, providing the most comprehensive Grow a Garden
            Money Guide available.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge className="bg-emerald-600 text-white">Free Support</Badge>
            <Badge className="bg-blue-600 text-white">24/7 Available</Badge>
            <Badge className="bg-purple-600 text-white">Community Driven</Badge>
          </div>
        </div>
      </section>
    </div>
  )
}
