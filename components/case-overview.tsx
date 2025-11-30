"use client"

import { FileText, Download, Play } from "lucide-react"
import { useEffect, useState } from "react"
import { getCases, getEvidence } from "@/lib/api"

export default function CaseOverview({ caseId }: { caseId?: string }) {
  const [summary, setSummary] = useState<{ id: string; title: string; status: string; createdAt: string } | null>(null)
  const [evidence, setEvidence] = useState<any[]>([])
  const videos = [
    { src: "/evidence1.mp4", title: "Estate Walkthrough Segment 1" },
    { src: "/evidence2.mp4", title: "Asset Appraisal Segment 2" },
  ]

  useEffect(() => {
    // Load a specific case if provided, else fallback to the first.
    const load = async () => {
      try {
        if (caseId) {
          const cs = await getCases()
          const c = cs?.find((x: any) => x.id === caseId)
          if (c) {
            setSummary({ id: c.id, title: c.title, status: c.status, createdAt: c.createdAt })
            const evs: any = await getEvidence(c.id)
            setEvidence(evs)
          }
          return
        }
        const cs = await getCases()
        const first = cs?.[0]
        if (first) {
          setSummary({ id: first.id, title: first.title, status: first.status, createdAt: first.createdAt })
          const evs: any = await getEvidence(first.id)
          setEvidence(evs)
        }
      } catch {
        // silent fallback
      }
    }
    load()
  }, [caseId])

  const submissionDate = summary?.createdAt ? new Date(summary.createdAt).toLocaleDateString() : "Nov 29, 2025"
  const statusLabel =
    summary?.status === "in_review"
      ? "Under Review"
      : summary?.status === "open"
        ? "Open"
        : summary?.status === "closed"
          ? "Closed"
          : "Under Review"

  return (
    <div className="portal-container min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="portal-header bg-[#0C1B33] text-white py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Your Inheritance Claim</h1>
          <p className="text-lg text-gray-200">
            Status update and authenticated estate information for your clearance process.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 md:px-12 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Claim Summary */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Claim Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="pb-6 border-b md:border-b-0 md:border-r border-[#ECECEC]">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Claim ID</p>
                <p className="text-lg font-mono text-[#0C1B33]">{summary?.id ?? "ICP-2025-087654"}</p>
              </div>
              <div className="pb-6 border-b md:border-b-0 md:border-r border-[#ECECEC]">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Status</p>
                <div className="inline-block bg-[#E8D9B5] text-[#0C1B33] px-4 py-2 rounded font-semibold text-sm">
                  {statusLabel}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-2">Submission Date</p>
                <p className="text-lg font-semibold text-[#0C1B33]">{submissionDate}</p>
              </div>
            </div>
          </div>

          {/* Estate Information */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Estate Information</h2>
            <div className="space-y-4">
              <InfoRow label="Total Claimed Amount" value="$6,000,000 USD" />
              <InfoRow label="Number of Parcels" value="6 Parcels" />
              <InfoRow label="Processing Status" value="Documentation Verification" />
              <InfoRow label="Expected Timeline" value="5-7 Business Days" />
            </div>
          </div>

          {/* Submitted Documentation */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Submitted Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidence.length > 0 ? (
                evidence.slice(0, 4).map((ev) => (
                  <DocumentPlaceholder
                    key={ev.id}
                    title={ev.type === "note" ? "Note" : ev.label || "Evidence"}
                    status={ev.type === "note" ? "Received" : "Verified"}
                  />
                ))
              ) : (
                <>
                  <DocumentPlaceholder title="Proof of Relationship" status="Verified" />
                  <DocumentPlaceholder title="National ID / Passport" status="Verified" />
                  <DocumentPlaceholder title="Will (if provided)" status="Received" />
                  <DocumentPlaceholder title="Legal Documentation" status="Under Review" />
                </>
              )}
            </div>
          </div>

          {/* Attorney Information */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-4">Attorney Details</h2>
            <div className="bg-[#FAFAFA] p-6 rounded border border-[#ECECEC]">
              <p className="text-[#0C1B33] font-semibold mb-2">John Richardson, Esq.</p>
              <p className="text-gray-600 text-sm">Legal counsel handling your inheritance matter</p>
            </div>
          </div>

          {/* Video Evidence */}
          <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0C1B33] mb-6">Estate Evidence Verification</h2>
            <p className="text-gray-600 mb-6">Authenticated estate documentation and asset verification</p>
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

function DocumentPlaceholder({ title, status }: { title: string; status: string }) {
  const statusColor =
    status === "Verified"
      ? "bg-green-100 text-green-800"
      : status === "Under Review"
        ? "bg-[#E8D9B5] text-[#0C1B33]"
        : "bg-blue-100 text-blue-800"

  return (
    <div className="border-2 border-[#ECECEC] rounded-lg p-6 hover:border-[#CDAA4A] transition bg-[#FAFAFA]">
      <div className="flex items-start justify-between mb-3">
        <FileText className="w-8 h-8 text-[#CDAA4A]" />
        <span className={`px-3 py-1 rounded text-xs font-semibold ${statusColor}`}>{status}</span>
      </div>
      <p className="font-semibold text-[#0C1B33] mb-2">{title}</p>
      <p className="text-xs text-gray-500 mb-4">Authenticated Document</p>
      {/* <button className="text-[#0C1B33] text-sm font-semibold hover:text-[#1a2a47] flex items-center gap-1">
        <Download className="w-4 h-4" />
        Download / View
      </button> */}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#ECECEC] last:border-b-0">
      <p className="text-gray-600 font-medium">{label}</p>
      <p className="font-bold text-[#0C1B33]">{value}</p>
    </div>
  )
}
