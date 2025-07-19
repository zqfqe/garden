import { Users, Target, Heart, Award, Code, Gamepad2, Mail, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            About Us
          </h1>
          <p className="text-lg text-gray-600">Learn about the team behind Grow a Garden Mutation Calculator</p>
        </div>

        <div className="space-y-8">
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                At growagardenmutationcalculator.pro, our mission is to provide the most accurate, comprehensive, and
                user-friendly Grow a Garden Mutation Calculator for the Roblox gaming community. We're dedicated to
                helping players maximize their crop profits, understand complex mutation mechanics, and make informed
                trading decisions in the record-breaking game that captivated 21.4 million concurrent players.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Born from the passion of dedicated Roblox Grow a Garden players, our calculator was created in response
                to the community's need for accurate crop value calculations. When "Grow a Garden" exploded in
                popularity, reaching unprecedented player counts, we recognized that players needed reliable tools to
                navigate the complex mutation system and optimize their farming strategies.
              </p>
              <p className="text-gray-600">
                What started as a simple calculation tool has evolved into the most comprehensive Grow a Garden Value
                Tool available, featuring authentic game data, real-time calculations, and advanced analysis features
                that help players succeed in this competitive farming environment.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Award className="h-5 w-5" />
                What Makes Us Different
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Code className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">100% Authentic Data</h3>
                      <p className="text-sm text-gray-600">
                        All 49 crop values and 42 mutation multipliers are extracted directly from the actual Roblox
                        Grow a Garden game code.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Gamepad2 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Player-Centric Design</h3>
                      <p className="text-sm text-gray-600">
                        Built by active players who understand the real challenges and needs of the Grow a Garden
                        community.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Continuous Updates</h3>
                      <p className="text-sm text-gray-600">
                        We monitor game updates daily and adjust our calculator to maintain 100% accuracy with the
                        latest changes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Heart className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Community Focused</h3>
                      <p className="text-sm text-gray-600">
                        Free to use, no registration required, and built with privacy and user experience as top
                        priorities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">Our Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">100%</div>
                  <div className="text-sm text-gray-600">Calculation Accuracy</div>
                  <Badge className="bg-emerald-600 text-white text-xs">Verified Daily</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">50K+</div>
                  <div className="text-sm text-gray-600">Monthly Users</div>
                  <Badge className="bg-blue-600 text-white text-xs">Growing Fast</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">1M+</div>
                  <div className="text-sm text-gray-600">Calculations Performed</div>
                  <Badge className="bg-purple-600 text-white text-xs">Community Trust</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-indigo-800">Our Commitment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">To Players</h3>
                  <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                    <li>Always free and accessible to everyone</li>
                    <li>Accurate calculations you can trust</li>
                    <li>Regular updates with new features</li>
                    <li>Responsive customer support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">To the Community</h3>
                  <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                    <li>Transparent development process</li>
                    <li>Open to feedback and suggestions</li>
                    <li>Supporting fair play and education</li>
                    <li>Promoting healthy gaming practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-teal-800">Technical Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our Grow a Garden Mutation Calculator is built with cutting-edge web technologies to ensure:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                  <li>Lightning-fast calculations</li>
                  <li>Mobile-responsive design</li>
                  <li>Offline functionality</li>
                  <li>Secure data handling</li>
                </ul>
                <ul className="text-gray-600 space-y-1 list-disc list-inside text-sm">
                  <li>Cross-browser compatibility</li>
                  <li>Accessibility compliance</li>
                  <li>SEO optimization</li>
                  <li>Regular security updates</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We love hearing from our community! Whether you have suggestions, found a bug, or just want to say
                hello, we're here to help.
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <p className="font-semibold text-gray-800">Contact Information</p>
                <p className="text-gray-600">Email: info@growagardenmutationcalculator.pro</p>
                <p className="text-gray-600">Website: growagardenmutationcalculator.pro</p>
                <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours during business days.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200 bg-rose-50">
            <CardHeader>
              <CardTitle className="text-rose-800">Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Grow a Garden Mutation Calculator (growagardenmutationcalculator.pro) is an independent fan-made tool
                and is not affiliated with, endorsed by, or connected to Roblox Corporation or the creators of "Grow a
                Garden." All game-related trademarks and content belong to their respective owners. Our calculator is
                provided for educational and entertainment purposes only.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
