import { NextResponse } from 'next/server'
import { statements, getStatementsByBeneficiaryId } from '@/lib/mock-data'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const beneficiaryId = searchParams.get('beneficiaryId')
  if (beneficiaryId) {
    return NextResponse.json(getStatementsByBeneficiaryId(beneficiaryId))
  }
  return NextResponse.json(statements)
}
