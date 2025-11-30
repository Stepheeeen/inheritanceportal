import { NextResponse } from 'next/server'
import { evidences, getEvidencesByCaseId } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const caseId = searchParams.get('caseId')
  if (caseId) {
    return NextResponse.json(getEvidencesByCaseId(caseId))
  }
  return NextResponse.json(evidences)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newItem = {
    ...body,
    id: body.id ?? `ev-${Math.floor(Math.random() * 9000) + 1000}`,
    uploadedAt: new Date().toISOString(),
  }
  evidences.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}
