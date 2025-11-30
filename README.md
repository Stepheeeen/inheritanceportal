# Beneficiary Clearance Portal – Demo Backend & Frontend Wiring

This project includes a temporary demo backend implemented with Next.js App Router API routes under `app/api/*`. It serves mock JSON and supports simple in-memory mutations suitable for prototyping. Key frontend components are wired to consume these endpoints via a small client in `lib/api.ts`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (Next.js selects an available port if 3000 is busy):

```bash
npm run dev
```

3. Optional: quick health check (only if running on port 3000):

```bash
npm run smoke
```

If another port is used (e.g., 3002), open `http://localhost:3002/api/health` in your browser.

## Frontend integration

- `components/case-overview.tsx`
	- Loads the first case via `/api/cases` and displays its status and created date.
	- Loads evidence via `/api/evidence?caseId=<id>` and shows items; falls back to placeholders when empty.

- `components/clearance-charges.tsx`
	- Loads charges via `/api/charges?caseId=c-2001` and computes totals dynamically; graceful fallback when absent.

- `components/beneficiary-verification.tsx`
	- Submits a minimal beneficiary payload to `POST /api/beneficiaries` on form submit before showing the success state.

Client helpers in `lib/api.ts` centralize fetch calls and keep components light.

## API endpoints

- `GET /api/health` — Health check.
- `GET /api/beneficiaries` — List beneficiaries.
- `GET /api/beneficiaries?id=b-1001` — Get beneficiary.
- `POST /api/beneficiaries` — Create (echo) beneficiary.
- `GET /api/cases` — List cases.
- `GET /api/cases?beneficiaryId=b-1001` — Filter cases.
- `GET /api/cases?id=c-2001` — Get case.
- `POST /api/cases` — Create (echo) case.
- `GET /api/charges` — List charges.
- `GET /api/charges?caseId=c-2001` — Filter charges.
- `PATCH /api/charges` — Toggle paid state.
- `GET /api/evidence` — List evidence.
- `GET /api/evidence?caseId=c-2001` — Filter evidence.
- `POST /api/evidence` — Add evidence.
- `GET /api/statements` — List statements.
- `GET /api/statements?beneficiaryId=b-1001` — Filter statements.

## Example requests

```bash
# Health
curl -s http://localhost:3000/api/health | jq

# Beneficiaries
curl -s http://localhost:3000/api/beneficiaries | jq
curl -s "http://localhost:3000/api/beneficiaries?id=b-1001" | jq
curl -s -X POST http://localhost:3000/api/beneficiaries \
	-H 'Content-Type: application/json' \
	-d '{"name":"Alice","nationalId":"X000","phone":"+233...","email":"alice@example.com"}' | jq

# Cases
curl -s http://localhost:3000/api/cases | jq
curl -s "http://localhost:3000/api/cases?beneficiaryId=b-1001" | jq

# Charges
curl -s "http://localhost:3000/api/charges?caseId=c-2001" | jq
curl -s -X PATCH http://localhost:3000/api/charges \
	-H 'Content-Type: application/json' \
	-d '{"id":"chg-3002","paid":true}' | jq

# Evidence
curl -s "http://localhost:3000/api/evidence?caseId=c-2001" | jq
curl -s -X POST http://localhost:3000/api/evidence \
	-H 'Content-Type: application/json' \
	-d '{"caseId":"c-2001","type":"note","content":"New note"}' | jq

# Statements
curl -s "http://localhost:3000/api/statements?beneficiaryId=b-1001" | jq
```

> Note: Replace `3000` with the actual port shown in the dev server output.

## Mock data and types

See `lib/mock-data.ts` for the in-memory store and types:
- `Beneficiary`, `Case`, `Charge`, `Evidence`, `Statement`

## Notes

- Demo-only backend: data resets on server restart.
- Routes run on the Edge runtime.
- Fallbacks are present in components so the UI remains stable if an endpoint is empty or temporarily unreachable.
- To align further, we can add proper loading states, toasts, and route-aware case selection.
