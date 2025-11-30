import { NextResponse } from 'next/server'
import { cases, getCaseById } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const beneficiaryId = searchParams.get('beneficiaryId')
  if (id) {
    const c = getCaseById(id)
    if (!c) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(c)
  }
  if (beneficiaryId) {
    return NextResponse.json(cases.filter(c => c.beneficiaryId === beneficiaryId))
  }
  return NextResponse.json(cases)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newItem = { ...body, id: body.id ?? `c-${Math.floor(Math.random() * 9000) + 1000}`, createdAt: new Date().toISOString(), status: body.status ?? 'open' }
  cases.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}
