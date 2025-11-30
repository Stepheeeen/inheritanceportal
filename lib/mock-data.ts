// Demo backend mock data for temporary API
// Shapes kept simple and self-contained; adjust as your UI evolves.

export type Beneficiary = {
  id: string
  name: string
  nationalId: string
  phone?: string
  email?: string
  status: 'pending' | 'verified' | 'rejected'
}

export type Case = {
  id: string
  beneficiaryId: string
  title: string
  createdAt: string
  status: 'open' | 'in_review' | 'closed'
}

export type Charge = {
  id: string
  caseId: string
  description: string
  amount: number
  currency: string
  paid: boolean
}

export type Evidence = {
  id: string
  caseId: string
  type: 'document' | 'image' | 'note'
  url?: string
  content?: string
  uploadedAt: string
}

export type Statement = {
  id: string
  beneficiaryId: string
  period: string
  openingBalance: number
  closingBalance: number
  transactions: Array<{
    id: string
    date: string
    description: string
    amount: number
    type: 'debit' | 'credit'
  }>
}

export const beneficiaries: Beneficiary[] = [
  {
    id: 'b-1001',
    name: 'Jane Doe',
    nationalId: 'A123456789',
    phone: '+233 555 0101',
    email: 'jane@example.com',
    status: 'verified',
  },
  {
    id: 'b-1002',
    name: 'John Mensah',
    nationalId: 'B987654321',
    phone: '+233 555 0202',
    email: 'john@example.com',
    status: 'pending',
  },
]

export const cases: Case[] = [
  {
    id: 'c-2001',
    beneficiaryId: 'b-1001',
    title: 'Estate Clearance - Accra',
    createdAt: '2025-11-01T10:00:00Z',
    status: 'in_review',
  },
  {
    id: 'c-2002',
    beneficiaryId: 'b-1002',
    title: 'Estate Clearance - Kumasi',
    createdAt: '2025-11-05T08:30:00Z',
    status: 'open',
  },
]

export const charges: Charge[] = [
  {
    id: 'chg-3001',
    caseId: 'c-2001',
    description: 'Processing Fee',
    amount: 150,
    currency: 'GHS',
    paid: true,
  },
  {
    id: 'chg-3002',
    caseId: 'c-2001',
    description: 'Verification Fee',
    amount: 80,
    currency: 'GHS',
    paid: false,
  },
]

export const evidences: Evidence[] = [
  {
    id: 'ev-4001',
    caseId: 'c-2001',
    type: 'document',
    url: '/placeholder.pdf',
    uploadedAt: '2025-11-02T12:00:00Z',
  },
  {
    id: 'ev-4002',
    caseId: 'c-2001',
    type: 'note',
    content: 'Verified will and death certificate submitted.',
    uploadedAt: '2025-11-03T09:10:00Z',
  },
]

export const statements: Statement[] = [
  {
    id: 'st-5001',
    beneficiaryId: 'b-1001',
    period: '2025-10',
    openingBalance: 1000,
    closingBalance: 1200,
    transactions: [
      {
        id: 'tx-1',
        date: '2025-10-12',
        description: 'Verification fee',
        amount: 80,
        type: 'debit',
      },
      {
        id: 'tx-2',
        date: '2025-10-20',
        description: 'Estate payout',
        amount: 280,
        type: 'credit',
      },
    ],
  },
]

// Utility helpers for lookups
export const getBeneficiaryById = (id: string) => beneficiaries.find(b => b.id === id)
export const getCaseById = (id: string) => cases.find(c => c.id === id)
export const getChargesByCaseId = (caseId: string) => charges.filter(ch => ch.caseId === caseId)
export const getEvidencesByCaseId = (caseId: string) => evidences.filter(ev => ev.caseId === caseId)
export const getStatementsByBeneficiaryId = (beneficiaryId: string) => statements.filter(st => st.beneficiaryId === beneficiaryId)
