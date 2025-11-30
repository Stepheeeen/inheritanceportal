"use client"

import { Download, Play } from "lucide-react"

export default function EstateEvidence() {
  const videos = [
    { src: "/evidence1.mp4", title: "Asset Verification Segment 1" },
    { src: "/evidence2.mp4", title: "Asset Verification Segment 2" },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Estate Evidence & Clearance Status</h1>
          <p className="text-gray-300 mt-2">Authenticated evidence and clearance verification</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Estate Documents */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Estate Documents</h2>
            <div className="space-y-4">
              <DocumentRow title="Executor Documentation" status="Verified" />
              <DocumentRow title="Policy Reference" status="Verified" />
              <DocumentRow title="Estate Inventory" status="Verified" />
            </div>
          </div>

          {/* Asset Evidence */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Asset Evidence</h2>
            <p className="text-sm text-gray-600 mb-4">Total Estate Assets: $6,000,000 USD</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AssetCard
                title="Financial Assets ($4,000,000)"
                items={[
                  "Bank Accounts: $2,500,000",
                  "Investment Accounts: $1,200,000",
                  "Bonds & Securities: $300,000",
                ]}
              />
              <AssetCard
                title="Physical Assets ($2,000,000)"
                items={[
                  "Real Estate: $1,600,000",
                  "Art & Collectibles: $250,000",
                  "Vehicles & Equipment: $150,000",
                ]}
              />
            </div>
          </div>

          {/* Video Evidence */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Asset Verification Video</h2>
            <p className="text-gray-600 mb-6">Detailed asset verification and evidence documentation</p>
            <div className="space-y-8">
              {videos.map((v, i) => (
                <div key={v.src} className="space-y-3">
                  <p className="text-sm font-semibold text-[#0C1B33]">{v.title}</p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    <video
                      src={v.src}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                      aria-label={v.title}
                    />
                    <div className="absolute top-2 left-2 bg-[#0C1B33]/70 text-white text-xs px-2 py-1 rounded">
                      Segment {i + 1}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={v.src}
                      download
                      className="text-[#0C1B33] text-sm font-semibold hover:text-[#1a2a47] flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clearance Status */}
          <div className="bg-white border-2 border-[#CDAA4A] rounded-lg p-8 bg-gradient-to-r from-white to-[#F5F3ED]">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Clearance Status</h2>
            <div className="space-y-4">
              <StatusItem title="Beneficiary Verification" status="Complete" />
              <StatusItem title="Compliance Review" status="Complete" />
              <StatusItem title="Attorney Approval" status="Pending Payment" />
            </div>
            <div className="mt-8 pt-6 border-t border-[#ECECEC]">
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold text-[#0C1B33]">Next Step:</span> Complete clearance charges payment to
                finalize your inheritance release.
              </p>
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

function DocumentRow({ title, status }: { title: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-4 border border-[#ECECEC] rounded-lg hover:bg-[#FAFAFA] transition">
      <div className="flex-1">
        <p className="font-semibold text-[#0C1B33]">{title}</p>
        <p className="text-xs text-gray-500">Authenticated & Encrypted</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-block bg-[#E8D9B5] text-[#0C1B33] px-3 py-1 rounded text-xs font-semibold">
          {status}
        </span>
      </div>
    </div>
  )
}

interface AssetCardProps {
  title: string
  items: string[]
}

function AssetCard({ title, items }: AssetCardProps) {
  return (
    <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-6">
      <h3 className="text-lg font-bold text-[#0C1B33] mb-4 pb-3 border-b border-[#ECECEC]">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm">
            <span className="text-[#CDAA4A] font-bold">✓</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatusItem({ title, status }: { title: string; status: string }) {
  const statusColors: Record<string, string> = {
    Complete: "bg-green-100 text-green-800",
    "In Progress": "bg-[#E8D9B5] text-[#0C1B33]",
    "Pending Payment": "bg-yellow-100 text-yellow-800",
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-[#ECECEC] rounded-lg">
      <p className="font-semibold text-[#0C1B33]">{title}</p>
      <span className={`px-4 py-2 rounded font-semibold text-sm ${statusColors[status] || "bg-gray-100"}`}>
        {status}
      </span>
    </div>
  )
}
