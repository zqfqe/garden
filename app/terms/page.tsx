import { FileText, AlertTriangle, Shield, Gavel, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">Terms and conditions for using Grow a Garden Mutation Calculator</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: July 19, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using growagardenmutationcalculator.pro (the "Service"), you accept and agree to be
                bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Grow a Garden Mutation Calculator is a free web-based tool that provides:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Accurate crop value calculations for the Roblox game "Grow a Garden"</li>
                <li>Mutation multiplier calculations and analysis</li>
                <li>Crop comparison and optimization tools</li>
                <li>Historical calculation tracking</li>
                <li>Educational content about Grow a Garden gameplay</li>
              </ul>
              <p className="text-gray-600 font-semibold">
                This service is not affiliated with, endorsed by, or connected to Roblox Corporation or the creators of
                "Grow a Garden."
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800">User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">By using our service, you agree to:</p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>Use the Grow a Garden Calculator for lawful purposes only</li>
                <li>Not attempt to reverse engineer, hack, or exploit the service</li>
                <li>Not use automated tools to scrape or download content</li>
                <li>Not interfere with the proper functioning of the website</li>
                <li>Respect intellectual property rights</li>
                <li>Not use the service to violate any applicable laws or regulations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Our Content</h3>
                <p className="text-gray-600">
                  The design, code, and original content of growagardenmutationcalculator.pro are owned by us and
                  protected by copyright laws. You may not reproduce, distribute, or create derivative works without
                  permission.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Game Data</h3>
                <p className="text-gray-600">
                  Crop values, mutation data, and game mechanics referenced in our calculator are based on publicly
                  available information from the "Grow a Garden" Roblox game. We do not claim ownership of this game
                  data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Accuracy Disclaimer</h3>
                <p className="text-gray-600">
                  While we strive to provide accurate calculations based on current game data, we cannot guarantee 100%
                  accuracy. Game mechanics may change, and our calculations are provided "as is" without warranty.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Service Availability</h3>
                <p className="text-gray-600">
                  We do not guarantee uninterrupted access to the service. The website may be temporarily unavailable
                  due to maintenance, updates, or technical issues.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                <p className="text-gray-600">
                  In no event shall we be liable for any indirect, incidental, special, consequential, or punitive
                  damages arising from your use of the service.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle className="text-indigo-800 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy and Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your information. By using our service, you consent to the collection and use of information in
                accordance with our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-teal-800">Modifications to Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right to modify, suspend, or discontinue the Grow a Garden Mutation Calculator at any
                time without prior notice. We may also update these Terms of Service periodically. Continued use of the
                service constitutes acceptance of any changes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These Terms of Service shall be governed by and construed in accordance with applicable laws. Any
                disputes arising from the use of this service shall be resolved through appropriate legal channels.
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white p-4 rounded-lg border">
                <p className="font-semibold text-gray-800">Grow a Garden Mutation Calculator</p>
                <p className="text-gray-600">Email: info@growagardenmutationcalculator.pro</p>
                <p className="text-gray-600">Website: growagardenmutationcalculator.pro</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Effective Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These Terms of Service are effective as of July 19, 2025, and will remain in effect except with respect
                to any changes in its provisions in the future, which will be in effect immediately after being posted
                on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
