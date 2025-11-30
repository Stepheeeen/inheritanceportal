"use client"

import { FileText, Download, Calendar } from "lucide-react"

export default function HistoryStatements() {
  const statements = [
    {
      id: 1,
      date: "Nov 28, 2025",
      title: "Estate Appraisal Report",
      attorney: "John Richardson, Esq.",
      status: "Completed",
      type: "Appraisal",
    },
    {
      id: 2,
      date: "Nov 25, 2025",
      title: "Legal Documentation Review",
      attorney: "Sarah Mitchell, Esq.",
      status: "Completed",
      type: "Legal",
    },
    {
      id: 3,
      date: "Nov 20, 2025",
      title: "Beneficiary Verification Completed",
      attorney: "John Richardson, Esq.",
      status: "Completed",
      type: "Verification",
    },
    {
      id: 4,
      date: "Nov 15, 2025",
      title: "Initial Estate Assessment",
      attorney: "David Chen, Esq.",
      status: "Completed",
      type: "Assessment",
    },
    {
      id: 5,
      date: "Nov 10, 2025",
      title: "Inheritance Claim Received",
      attorney: "John Richardson, Esq.",
      status: "Completed",
      type: "Submission",
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">History & Attorney Statements</h1>
          <p className="text-gray-300 mt-2">
            Complete record of your inheritance claim processing and attorney communications.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {statements.map((statement) => (
              <StatementCard key={statement.id} statement={statement} />
            ))}
          </div>

          {statements.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No statements available yet.</p>
            </div>
          )}
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

interface Statement {
  id: number
  date: string
  title: string
  attorney: string
  status: string
  type: string
}

function StatementCard({ statement }: { statement: Statement }) {
  const typeColors: Record<string, string> = {
    Appraisal: "bg-blue-100 text-blue-800",
    Legal: "bg-purple-100 text-purple-800",
    Verification: "bg-green-100 text-green-800",
    Assessment: "bg-orange-100 text-orange-800",
    Submission: "bg-indigo-100 text-indigo-800",
  }

  return (
    <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-6 hover:border-[#CDAA4A] transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-[#CDAA4A]" />
            <span className="text-sm text-gray-600 font-mono">{statement.date}</span>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${typeColors[statement.type] || "bg-gray-100"}`}>
              {statement.type}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#0C1B33] mb-2">{statement.title}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Attorney:</span> {statement.attorney}
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="flex items-center gap-2 bg-[#0C1B33] hover:bg-[#1a2a47] text-white px-4 py-2 rounded transition">
            <Download className="w-4 h-4" />
            <span className="text-sm">Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}
