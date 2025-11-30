import { NextResponse } from 'next/server'
import { getChargesByCaseId, charges } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const caseId = searchParams.get('caseId')
  if (caseId) {
    return NextResponse.json(getChargesByCaseId(caseId))
  }
  return NextResponse.json(charges)
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id, paid } = body
  const charge = charges.find(c => c.id === id)
  if (!charge) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (typeof paid === 'boolean') charge.paid = paid
  return NextResponse.json(charge)
}
