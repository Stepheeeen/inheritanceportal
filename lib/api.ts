// Lightweight API client for the demo backend

type FetchOpts = {
  path: string
  search?: Record<string, string | number | boolean | undefined>
  init?: RequestInit
}

const buildUrl = ({ path, search }: FetchOpts) => {
  const url = new URL(path, typeof window === 'undefined' ? 'http://localhost' : window.location.origin)
  if (search) {
    Object.entries(search).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
    })
  }
  return url.toString()
}

export async function apiGet<T>(path: string, search?: FetchOpts['search']): Promise<T> {
  const res = await fetch(buildUrl({ path, search }), { cache: 'no-store' })
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
  return res.json()
}

export async function apiSend<T>(path: string, body: unknown, method: 'POST' | 'PATCH' = 'POST'): Promise<T> {
  const res = await fetch(buildUrl({ path }), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status}`)
  return res.json()
}

// Domain helpers
export const getHealth = () => apiGet<{ ok: boolean; status: string; timestamp: string }>('/api/health')
export const getBeneficiaries = () => apiGet<any[]>('/api/beneficiaries')
export const getBeneficiary = (id: string) => apiGet<any>('/api/beneficiaries', { id })
export const createBeneficiary = (payload: any) => apiSend<any>('/api/beneficiaries', payload, 'POST')
export const getCases = (beneficiaryId?: string) => apiGet<any[]>('/api/cases', beneficiaryId ? { beneficiaryId } : undefined)
export const getCase = (id: string) => apiGet<any>('/api/cases', { id })
export const createCase = (payload: any) => apiSend<any>('/api/cases', payload, 'POST')
export const getCharges = (caseId?: string) => apiGet<any[]>('/api/charges', caseId ? { caseId } : undefined)
export const patchCharge = (id: string, paid: boolean) => apiSend<any>('/api/charges', { id, paid }, 'PATCH')
export type EvidenceItem = {
  id: string;
  caseId: string;
  type: 'video' | 'image' | 'document';
  title: string;
  url: string; // can be /evidence1.mp4 or data URL
  createdAt: string;
};
export async function getEvidence(caseId?: string) {
  const url = caseId ? `/api/evidence?caseId=${encodeURIComponent(caseId)}` : `/api/evidence`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch evidence');
  return res.json() as Promise<{ items: EvidenceItem[] }>;
}
export const addEvidence = (payload: any) => apiSend<any>('/api/evidence', payload, 'POST')
export const getStatements = (beneficiaryId?: string) => apiGet<any[]>('/api/statements', beneficiaryId ? { beneficiaryId } : undefined)
