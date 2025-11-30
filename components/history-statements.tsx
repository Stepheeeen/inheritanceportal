"use client"

import { FileText, Download, Calendar, AlertTriangle, CheckCircle2, Info, DollarSign, Truck, ShieldCheck } from "lucide-react"
import { useMemo, type ReactElement } from "react"

type MessageCategory =
  | "Payment"
  | "Confirmation"
  | "Fee"
  | "Compliance"
  | "Update"
  | "Logistics"

type MessageStatus =
  | "Completed"
  | "Awaiting Confirmation"
  | "Awaiting Payment"
  | "In Review"
  | "Pending Approval"
  | "In Transit"

interface HistoryMessage {
  id: number
  date: string
  subject: string
  author: string
  category: MessageCategory
  status: MessageStatus
  body: string
  feeAmount?: number
  feeCurrency?: string
  locations?: string[]
  notes?: string[]
}

export default function HistoryStatements() {
  const messages: HistoryMessage[] = [
      {
      id: 1,
      date: "Nov 28, 2025",
      subject: "Account Details Confirmed",
      author: "Attorney Charolette",
      category: "Confirmation",
      status: "Completed",
      body:
        "Dear , Eric Birckhead\n\nThank you for confirming your account details. I have reviewed the information provided, and everything appears to be in order. I will proceed with the next step of the process before finalizing the payment.\n\nShould any additional confirmation or documentation be required, I will notify you promptly.\n\nKind regards,\nAttorney Charolette",
    },
    // {
    //   id: 2,
    //   date: "Nov 28, 2025",
    //   subject: "Payment Confirmation Request",
    //   author: "Attorney Charolette",
    //   category: "Payment",
    //   status: "Awaiting Confirmation",
    //   body:
    //     "Dear Mr Eric Birckhead\n\nI am preparing to initiate your payment and would like to reconfirm your account details to ensure accuracy before proceeding. Kindly review and confirm the following information:\n• Account Name: [Insert Name]\n• Bank Name: [Insert Bank]\n• Account Number: [Insert Number]\n\nPlease confirm that all details are correct at your earliest convenience so I can finalize the transaction without delay.\n\nKind regards,\nAttorney Charolette",
    // },
    {
      id: 3,
      date: "Nov 28, 2025",
      subject: "Administrative Fee Required Before Disbursement",
      author: "Attorney Charolette",
      category: "Fee",
      status: "Awaiting Payment",
      feeAmount: 1000,
      feeCurrency: "USD",
      body:
        "Dear Mr Eric Birckhead\n\nI’m pleased to inform you that the funds are available and ready for disbursement. However, before the payment can be processed, the outstanding law firm administrative fee of $1,000 must be settled.\n\nThis fee is separate from the other payments previously made and is required to finalize the release of funds. Kindly ensure the payment is completed within 24 hours, after which the transfer will be initiated and sent out today upon confirmation.\n\nPlease acknowledge receipt of this message and confirm once the fee has been settled so we can proceed without delay.\n\nKind regards,\nAttorney Charolette.",
    },
    {
      id: 4,
      date: "Nov 28, 2025",
      subject: "Fee Requirement Reaffirmed",
      author: "Attorney Charolette",
      category: "Fee",
      status: "Awaiting Payment",
      feeAmount: 1000,
      feeCurrency: "USD",
      body:
        "Dear Mr Eric Birckhead\n\nThank you for your message and for sharing your situation with me. I truly understand and respect the challenges you’ve mentioned, and I want to assure you that I’ll do everything possible to ensure this process goes smoothly for you.\n\nThat said, the $1,000 administrative fee remains a firm requirement before the release of any funds. This fee is essential for completing the final authorization process and granting full access to your payment.\n\nPlease make arrangements to have the fee settled within the next 24 hours so that we can proceed with releasing the funds today as planned. Once payment is confirmed, I’ll move forward immediately to finalize the transaction.\n\nI sincerely appreciate your patience and cooperation.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 5,
      date: "Nov 28, 2025",
      subject: "Compliance Policy Reminder",
      author: "Attorney Charolette",
      category: "Compliance",
      status: "Pending Approval",
      body:
        "Dear Mr Eric Birckhead\n\nPlease be advised that the firm cannot proceed with the release of any documents or finalize the transaction until all required administrative procedures have been completed, including the outstanding fee. These steps are part of our compliance policy and must be satisfied before the funds can be released.\n\nOnce all requirements have been fulfilled, the process will continue without further delay. Kindly confirm once this has been addressed so we can proceed accordingly.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 6,
      date: "Nov 28, 2025",
      subject: "No Additional Charges",
      author: "Attorney Charolette",
      category: "Compliance",
      status: "Completed",
      body:
        "Dear Mr Eric Birckhead\n\nAt this point, there are no additional or undisclosed charges. All required administrative costs have been clearly outlined, and we will continue to handle the matter in a transparent and lawful manner.\n\nOnce the necessary formalities are completed, we’ll proceed with the next step in accordance with firm procedures.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 7,
      date: "Nov 28, 2025",
      subject: "Final Fee Confirmation",
      author: "Attorney Charolette",
      category: "Fee",
      status: "Awaiting Payment",
      feeAmount: 1000,
      feeCurrency: "USD",
      body:
        "Dear Mr Eric Birckhead\n\nYes, this is the final fee required. Once the $1,000 administrative payment is completed, the process will be finalized and the funds will be released in accordance with firm procedures.\n\nPlease confirm once payment has been made so we can proceed without delay.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 8,
      date: "Nov 28, 2025",
      subject: "Payment Received, Disbursement Timeline",
      author: "Attorney Charolette",
      category: "Confirmation",
      status: "Completed",
      body:
        "Dear Mr Eric Birckhead ,\n\nThank you for confirming the payment. I’ve verified receipt on our end. Please note that processing and final disbursement of the funds will take approximately five (5) business days to complete.\n\nOnce the transfer has been finalized, I’ll provide you with confirmation and all relevant details.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 9,
      date: "Nov 28, 2025",
      subject: "Update on Disbursement and Asset Handling",
      author: "Attorney Charolette",
      category: "Update",
      status: "In Review",
      locations: ["Miami, FL", "Texas", "Accra, Ghana"],
      notes: [
        "Awaiting approvals in Miami and Texas per will requirements.",
        "Gold stored in Accra, Ghana in two secured boxes.",
        "Beneficiary documentation may be required before release.",
      ],
      body:
        "Dear Mr Eric Birckhead\n\nI am writing to provide an update on the status of Ms. Sharon Wills’ matter.\n\nAt present, final disbursement cannot proceed because the firms handling approvals in Miami and Texas have not yet completed their review in accordance with Mr. Will’s will. The will expressly requires that all paperwork and related formalities be completed before any funds are released. Out of respect for the testator’s expressed wishes, we must await those remaining approvals before moving forward.\n\nOnce the Miami and Texas firms confirm their approvals, the funds will be disbursed to the authorized recipient(s) named in the estate documents (in this case, the spouse). We will notify you immediately when that authorization is received and provide the expected timing for transfer.\n\nRegarding the physical assets, the gold referenced in the will is currently located in Accra, Ghana, stored in two secured boxes. I am actively coordinating the necessary steps for secure handling and transfer of those assets and will provide you with a further update on logistics and timing as progress is made.\n\nPlease note, as part of our standard due diligence and to ensure compliance with the will’s terms, we may require confirmation of beneficiary status or other supporting documentation before release. If any such documentation is needed, we will request it promptly and explain exactly what is required.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 10,
      date: "Nov 28, 2025",
      subject: "Reassurance on Approvals Timeline",
      author: "Attorney Charolette",
      category: "Update",
      status: "In Review",
      body:
        "Dear Mr Eric Birckhead\n\nI understand how worried you are, and I truly appreciate the care you’re showing for Sharon. Please rest assured, it shouldn’t take long. As soon as the remaining approvals come through, I will notify you immediately so we can move forward without delay.\n\nThank you for your patience and understanding—we’re almost there.\n\nKind regards,\nAttorney Charolette",
    },
    {
      id: 11,
      date: "Nov 28, 2025",
      subject: "Miami Approval Complete; Awaiting Texas",
      author: "Attorney Charolette",
      category: "Update",
      status: "Pending Approval",
      body:
        "Dear Mr Eric Birckhead\n\nThis message is to update you on the status of Ms. Sharon Wills’ estate. The approval process in Miami has been completed, and we are now awaiting final confirmation from the Texas office. Once that authorization is issued, the estate funds will be deposited directly into your account, and you will be notified immediately.\n\nThe gold bars associated with the estate have been transferred from Ghana and are currently in customs custody. The listed clearance fee for the release of the gold shipment is $765.05. After clearance is completed, the gold will be forwarded to Omaha, Nebraska through a secure carrier, and a tracking number will be provided once dispatch is confirmed.\n\nPlease let me know how you wish to proceed, and I will continue to provide updates as soon as additional approvals are finalized.\n\nKind regards,\nAttorney Charolette",
      feeAmount: 765.05,
      feeCurrency: "USD",
      locations: ["Ghana", "Customs", "Omaha, NE"],
      notes: ["Gold in customs; clearance fee required before release.", "Tracking number to be provided after dispatch."],
    },
  ]

  const categoryStyles: Record<MessageCategory, string> = {
    Payment: "bg-blue-100 text-blue-800",
    Confirmation: "bg-green-100 text-green-800",
    Fee: "bg-orange-100 text-orange-800",
    Compliance: "bg-purple-100 text-purple-800",
    Update: "bg-indigo-100 text-indigo-800",
    Logistics: "bg-teal-100 text-teal-800",
  }

  const statusIcon = (status: MessageStatus) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />
      case "Awaiting Confirmation":
        return <Info className="w-4 h-4 text-blue-600" />
      case "Awaiting Payment":
        return <DollarSign className="w-4 h-4 text-orange-600" />
      case "In Review":
        return <ShieldCheck className="w-4 h-4 text-purple-600" />
      case "Pending Approval":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "In Transit":
        return <Truck className="w-4 h-4 text-teal-600" />
      default:
        return <Info className="w-4 h-4 text-gray-600" />
    }
  }

  const hasAnyFees = useMemo(() => messages.some(m => m.feeAmount && m.feeAmount > 0), [messages])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#0C1B33] text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">History & Attorney Communications</h1>
          <p className="text-gray-300 mt-2">
            Complete record of payment confirmations, compliance updates, fees, approvals, and logistics.
          </p>
          {hasAnyFees && (
            <div className="mt-4 bg-orange-600/20 text-orange-100 border border-orange-400 rounded px-4 py-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">Action Required:</span>
                <span className="text-sm">Outstanding fees present in the timeline</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <MessageCard key={msg.id} message={msg} categoryStyles={categoryStyles} statusIcon={statusIcon} />
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No communications available yet.</p>
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

function MessageCard({
  message,
  categoryStyles,
  statusIcon,
}: {
  message: HistoryMessage
  categoryStyles: Record<MessageCategory, string>
  statusIcon: (status: MessageStatus) => ReactElement
}) {
  const { date, subject, author, category, status, body, feeAmount, feeCurrency, locations, notes } = message

  return (
    <div className="bg-white border-2 border-[#ECECEC] rounded-lg p-6 hover:border-[#CDAA4A] transition">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-[#CDAA4A]" />
            <span className="text-sm text-gray-600 font-mono">{date}</span>
            <span className={`px-3 py-1 rounded text-xs font-semibold ${categoryStyles[category]}`}>
              {category}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              {statusIcon(status)}
              <span>{status}</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#0C1B33] mb-1">{subject}</h3>
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-semibold">From:</span> {author}
          </p>

          {feeAmount && (
            <div className="mb-3 flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">
                Outstanding fee: {feeCurrency ?? "USD"} {feeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}

          {locations && locations.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {locations.map((loc, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded">
                  {loc}
                </span>
              ))}
            </div>
          )}

          <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded p-4">
            {body}
          </pre>

          {notes && notes.length > 0 && (
            <div className="mt-3 space-y-1">
              {notes.map((n, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <Info className="w-4 h-4 text-gray-500 mt-[2px]" />
                  <span>{n}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
