import { Shield, Eye, Database, Lock, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">Your privacy is important to us at Grow a Garden Mutation Calculator</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: July 19, 2025</p>
        </div>

        <div className="space-y-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited on growagardenmutationcalculator.pro</li>
                  <li>Time and date of visits</li>
                  <li>Referring website information</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Local Storage Data</h3>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  <li>Grow a Garden Calculator settings and preferences</li>
                  <li>Calculation history (stored locally in your browser)</li>
                  <li>Crop and mutation selections</li>
                  <li>No personal information is stored on our servers</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Database className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">We use the collected information for the following purposes:</p>
              <ul className="text-gray-600 space-y-2 list-disc list-inside">
                <li>To provide and maintain our Grow a Garden Mutation Calculator service</li>
                <li>To improve user experience and website functionality</li>
                <li>To analyze website usage patterns and optimize performance</li>
                <li>To detect and prevent technical issues</li>
                <li>To comply with legal obligations</li>
                <li>We do NOT sell, trade, or rent your information to third parties</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security & Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Local Storage</h3>
                <p className="text-gray-600">
                  Your Grow a Garden Calculator data is stored locally in your browser using HTML5 localStorage. This
                  means your calculation history and preferences never leave your device and are not transmitted to our
                  servers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Security Measures</h3>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  <li>SSL/TLS encryption for all data transmission</li>
                  <li>Regular security audits and updates</li>
                  <li>No sensitive personal data collection</li>
                  <li>Secure hosting infrastructure</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600">
                    We use essential cookies to ensure proper functionality of the Grow a Garden Mutation Calculator.
                    These cookies are necessary for the website to work correctly.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Analytics</h3>
                  <p className="text-gray-600">
                    We may use Google Analytics to understand how users interact with our Grow a Garden Calculator. This
                    helps us improve the service. You can opt-out of Google Analytics tracking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">You have the right to:</p>
              <ul className="text-gray-600 space-y-1 list-disc list-inside">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information (clear browser storage)</li>
                <li>Restrict processing of your information</li>
                <li>Data portability (export your calculation history)</li>
                <li>Object to processing</li>
              </ul>
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
                If you have any questions about this Privacy Policy or our data practices, please contact us:
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
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date. Changes are effective immediately
                upon posting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
