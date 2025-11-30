"use client"

import { useState } from "react"
import InitialForm from "@/components/initial-form"
import Navigation from "@/components/navigation"
import CaseOverview from "@/components/case-overview"
import BeneficiaryVerification from "@/components/beneficiary-verification"
import EstateEvidence from "@/components/estate-evidence"
import HistoryStatements from "@/components/history-statements"
import ClearanceCharges from "@/components/clearance-charges"
import { createBeneficiary, createCase } from "@/lib/api"

type PageType = "form" | "dashboard" | "verification" | "evidence" | "history" | "charges"

interface BeneficiaryData {
  fullName: string
  dateOfBirth: string
  email: string
  phone: string
  address: string
  proofOfRelationship: string
  nationalId: string
  will: string
  lawyerName: string
  bankName: string
  accountNumber: string
  accountHolder: string
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("form")
  const [isFormCompleted, setIsFormCompleted] = useState(false)
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryData | null>(null)
  const [beneficiaryId, setBeneficiaryId] = useState<string | null>(null)
  const [caseId, setCaseId] = useState<string | null>(null)

  const handleFormSubmit = async (data: BeneficiaryData) => {
    setBeneficiaryData(data)
    // Create beneficiary then a case tied to it
    try {
      const b = await createBeneficiary({
        name: data.fullName,
        nationalId: data.nationalId || "A123456789",
        phone: data.phone,
        email: data.email,
        status: 'pending',
      })
      setBeneficiaryId(b.id)
      const c = await createCase({
        beneficiaryId: b.id,
        title: `Inheritance Claim for ${data.fullName}`,
        status: 'open',
      })
      setCaseId(c.id)
    } catch {
      // silent failure: UI will use fallbacks
    }
    setIsFormCompleted(true)
    setCurrentPage("dashboard")
  }

  const renderPage = () => {
    if (!isFormCompleted) {
      return <InitialForm onSubmit={handleFormSubmit} />
    }

    switch (currentPage) {
      case "dashboard":
        return <CaseOverview caseId={caseId ?? undefined} />
      case "verification":
        return <BeneficiaryVerification onNext={() => setCurrentPage("evidence")} />
      case "evidence":
        return <EstateEvidence />
      case "history":
        return <HistoryStatements />
      case "charges":
        return <ClearanceCharges caseId={caseId ?? undefined} />
      default:
        return <CaseOverview />
    }
  }

  return (
    <main className="portal-container min-h-screen bg-white">
      {isFormCompleted && <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />}
      {renderPage()}
    </main>
  )
}
