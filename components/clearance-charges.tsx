"use client"

import { AlertCircle, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { getCharges } from "@/lib/api"

export default function ClearanceCharges({ caseId = 'c-2001' }: { caseId?: string }) {
  const [charges, setCharges] = useState<Array<{ id: string; description: string; amount: number }>>([])
  useEffect(() => {
    // Load charges for provided case id (or fallback)
    getCharges(caseId).then((chs) => setCharges(chs ?? [])).catch(() => setCharges([]))
  }, [caseId])

  const parcels = Math.max(charges.length, 6)
  const chargePerParcel = charges.length > 0 ? Math.round(charges.reduce((acc, c) => acc + c.amount, 0) / parcels) : 1000
  const totalCharge = parcels * chargePerParcel

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Clearance Charges & Settlement</h1>
          <p className="text-gray-300 mt-2">Review your inheritance clearance fees and payment instructions.</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Charge Breakdown */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Clearance Charge Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#ECECEC]">
                <p className="text-gray-600">Number of Parcels</p>
                <p className="font-bold text-[#0C1B33]">{parcels} Parcels</p>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-[#ECECEC]">
                <p className="text-gray-600">Charge Per Parcel</p>
                <p className="font-bold text-[#0C1B33]">${chargePerParcel.toLocaleString()} USD</p>
              </div>
              <div className="flex items-center justify-between py-4 bg-[#FAFAFA] px-4 rounded">
                <p className="text-lg font-bold text-[#0C1B33]">Total Clearance Charge</p>
                <p className="text-2xl font-bold text-[#CDAA4A]">${totalCharge.toLocaleString()} USD</p>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">What's Included in Clearance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Feature text="Complete legal documentation review" />
              <Feature text="Estate asset verification and appraisal" />
              <Feature text="Compliance and tax clearance" />
              <Feature text="Beneficiary identity verification" />
              <Feature text="Secure fund transfer processing" />
              <Feature text="Attorney final sign-off and release" />
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Payment Instructions</h2>
            <div className="bg-[#F5F3ED] border-l-4 border-[#CDAA4A] p-6 rounded mb-6">
              <div className="flex gap-3 items-start">
                <Mail className="w-6 h-6 text-[#CDAA4A] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#0C1B33] mb-2">Send Payment Via Email</p>
                  <p className="text-sm text-gray-700 mb-3">
                    To proceed with your inheritance clearance, please contact our finance team with your claim
                    reference and payment details.
                  </p>
                  <a
                    href="mailto:payments@inheritanceclearance.com?subject=Clearance Payment - ICP-2025-087654"
                    className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#1a2a47] text-white px-6 py-3 rounded font-semibold transition"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Payments Team
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-[#ECECEC] p-4 rounded">
                <p className="text-sm font-mono text-[#0C1B33] break-all">
                  Email: <span className="font-bold">payments@inheritanceclearance.com</span>
                </p>
              </div>
              <div className="bg-white border border-[#ECECEC] p-4 rounded">
                <p className="text-sm font-mono text-[#0C1B33]">
                  Reference: <span className="font-bold">ICP-2025-087654</span>
                </p>
              </div>
              <div className="bg-white border border-[#ECECEC] p-4 rounded">
                <p className="text-sm font-mono text-[#0C1B33]">
                  Amount: <span className="font-bold">${totalCharge.toLocaleString()} USD</span>
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <p className="font-bold text-red-900 mb-2">Important Notice</p>
                <p className="text-sm text-red-800 mb-3">
                  Payments are NOT processed through this portal. Your inheritance claim will be finalized only after
                  payment is received and verified by our finance team.
                </p>
                <p className="text-sm text-red-800">
                  Upon payment receipt, your funds will be transferred to your verified banking details within 5-7
                  business days.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Expected Timeline</h2>
            <div className="space-y-4">
              <TimelineItem step={1} title="Payment Submitted" description="Send clearance charge via email" />
              <TimelineItem step={2} title="Payment Verification" description="1-2 business days" />
              <TimelineItem step={3} title="Final Clearance" description="Attorney approval and sign-off" />
              <TimelineItem
                step={4}
                title="Fund Transfer"
                description="Inheritance released to your account (5-7 days)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#ECECEC] bg-white px-6 py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Inheritance Clearance Portal. All rights reserved. Confidential communications.</p>
        </div>
      </footer>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[#CDAA4A] font-bold text-lg">✓</span>
      <p className="text-gray-700">{text}</p>
    </div>
  )
}

function TimelineItem({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex gap-4">
  <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#CDAA4A] text-[#0C1B33] font-bold flex items-center justify-center">
          {step}
        </div>
      </div>
      <div>
        <p className="font-bold text-[#0C1B33]">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
