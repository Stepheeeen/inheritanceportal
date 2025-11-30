import { NextResponse } from 'next/server'
import { beneficiaries, getBeneficiaryById } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id) {
    const b = getBeneficiaryById(id)
    if (!b) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(b)
  }
  return NextResponse.json(beneficiaries)
}

export async function POST(request: Request) {
  // Echo-style create for demo purposes; in-memory push
  const body = await request.json()
  const newItem = { ...body, id: body.id ?? `b-${Math.floor(Math.random() * 9000) + 1000}`, status: body.status ?? 'pending' }
  beneficiaries.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}
