"use client"

import { useState } from "react"
import { Gamepad2, Users, Trophy, Calendar, ChevronDown, ChevronUp, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function GameIntroduction() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl p-8 mb-12 border border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">About Roblox Grow a Garden</h2>
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            The record-breaking Roblox Grow a Garden farming simulator that captivated{" "}
            <strong>21.4 million concurrent players</strong> and became the fastest game to reach 1 billion visits! Our
            Grow a Garden Mutation Calculator helps you maximize profits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Record Holder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-700">21.4M</div>
                <div className="text-sm text-blue-600">Peak concurrent players</div>
                <div className="text-xs text-gray-600">July 12, 2025 - All-time record</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-700">10B+</div>
                <div className="text-sm text-green-600">Total visits</div>
                <div className="text-xs text-gray-600">Fastest to 1 billion visits</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Released
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-700">2025</div>
                <div className="text-sm text-purple-600">March 26th</div>
                <div className="text-xs text-gray-600">Roblox Platform</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Learn More About Grow a Garden Farming Tips
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Roblox Grow a Garden Game Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Core Gameplay & Grow a Garden Farming Tips</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Plant seeds and harvest crops for Sheckles (¢)</li>
                    <li>• Crops grow offline - perfect for idle gameplay</li>
                    <li>• Unlock progressively rare Grow a Garden Prehistoric Crops</li>
                    <li>• Upgrade plots and purchase decorations</li>
                    <li>• Use our Grow a Garden Value Tool for best profits</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Social Features & Grow a Garden Money Guide</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Form teams to share resources</li>
                    <li>• Compete in seasonal leaderboards</li>
                    <li>• Visit friends' gardens</li>
                    <li>• Weekly limited-time events with Grow a Garden Celestial Mutation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Use Our Grow a Garden Calculator?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">
                    Maximize Your Profits with Grow a Garden Profit Calculator
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    In Roblox Grow a Garden, knowing exact Grow a Garden Crop Prices with mutations is crucial for:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Trading with other players using our Grow a Garden Price List</li>
                    <li>• Planning your garden layout for Grow a Garden Best Crop selection</li>
                    <li>• Optimizing Sheckle earnings with Grow a Garden Earning Calculator</li>
                    <li>• Making informed upgrade decisions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Authentic Game Data & Mutation Multiplier Roblox</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Our Grow a Garden Mutation Calculator uses the exact same formula as the game:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real crop base values from Roblox Grow a Garden</li>
                    <li>• Accurate Mutation Multiplier Roblox calculations</li>
                    <li>• Weight squared calculation system</li>
                    <li>• Friend boost mechanics integration</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4">Grow a Garden Money Guide - Currency System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Sheckles (¢) - Primary Currency</h4>
                  <p className="text-sm text-gray-600">
                    The primary currency earned by harvesting crops in Roblox Grow a Garden. Used to buy seeds,
                    decorations, and upgrades. Our Grow a Garden Mutation Calculator helps you maximize your Sheckle
                    earnings by showing exact crop values with Mutation Multiplier Roblox effects.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">
                    Premium Features & Grow a Garden Mutation Guide
                  </h4>
                  <p className="text-sm text-gray-600">
                    While Robux can accelerate growth and unlock premium items, smart farming with our Grow a Garden
                    Value Tool and following our Grow a Garden Mutation Guide can help you achieve great results as a
                    free-to-play player.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Ready to Optimize Your Garden with Grow a Garden Calculator?
              </h3>
              <p className="text-gray-600 mb-4">
                Use our comprehensive Grow a Garden Mutation Calculator to make informed decisions and maximize your
                crop profits in Roblox Grow a Garden!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-green-600 text-white">Free Grow a Garden Value Tool</Badge>
                <Badge className="bg-blue-600 text-white">Accurate Grow a Garden Price List</Badge>
                <Badge className="bg-purple-600 text-white">Real-time Grow a Garden Crop Prices</Badge>
                <Badge className="bg-amber-600 text-white">Player-Made Grow a Garden Earning Calculator</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
