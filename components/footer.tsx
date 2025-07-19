"use client"

import Link from "next/link"
import { Mail, Shield, Calculator, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Grow a Garden Calculator</h3>
                <p className="text-emerald-600 text-sm font-medium">Mutation Calculator</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              The ultimate Grow a Garden Mutation Calculator for Roblox's record-breaking game. Calculate exact crop
              values with our authentic formula and comprehensive mutation database.
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <span className="text-sm">info@growagardenmutationcalculator.pro</span>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Support & Legal
            </h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="block text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="text-sm">© 2025 Grow a Garden Mutation Calculator</span>
              <span>•</span>
              <span className="text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm">for the Roblox community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
