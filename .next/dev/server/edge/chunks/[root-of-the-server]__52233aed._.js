(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__52233aed._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/lib/mock-data.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Demo backend mock data for temporary API
// Shapes kept simple and self-contained; adjust as your UI evolves.
__turbopack_context__.s([
    "beneficiaries",
    ()=>beneficiaries,
    "cases",
    ()=>cases,
    "charges",
    ()=>charges,
    "evidences",
    ()=>evidences,
    "getBeneficiaryById",
    ()=>getBeneficiaryById,
    "getCaseById",
    ()=>getCaseById,
    "getChargesByCaseId",
    ()=>getChargesByCaseId,
    "getEvidencesByCaseId",
    ()=>getEvidencesByCaseId,
    "getStatementsByBeneficiaryId",
    ()=>getStatementsByBeneficiaryId,
    "statements",
    ()=>statements
]);
const beneficiaries = [
    {
        id: 'b-1001',
        name: 'Jane Doe',
        nationalId: 'A123456789',
        phone: '+233 555 0101',
        email: 'jane@example.com',
        status: 'verified'
    },
    {
        id: 'b-1002',
        name: 'John Mensah',
        nationalId: 'B987654321',
        phone: '+233 555 0202',
        email: 'john@example.com',
        status: 'pending'
    }
];
const cases = [
    {
        id: 'c-2001',
        beneficiaryId: 'b-1001',
        title: 'Estate Clearance - Accra',
        createdAt: '2025-11-01T10:00:00Z',
        status: 'in_review'
    },
    {
        id: 'c-2002',
        beneficiaryId: 'b-1002',
        title: 'Estate Clearance - Kumasi',
        createdAt: '2025-11-05T08:30:00Z',
        status: 'open'
    }
];
const charges = [
    {
        id: 'chg-3001',
        caseId: 'c-2001',
        description: 'Processing Fee',
        amount: 150,
        currency: 'GHS',
        paid: true
    },
    {
        id: 'chg-3002',
        caseId: 'c-2001',
        description: 'Verification Fee',
        amount: 80,
        currency: 'GHS',
        paid: false
    }
];
const evidences = [
    {
        id: 'ev-4001',
        caseId: 'c-2001',
        type: 'document',
        url: '/placeholder.pdf',
        uploadedAt: '2025-11-02T12:00:00Z'
    },
    {
        id: 'ev-4002',
        caseId: 'c-2001',
        type: 'note',
        content: 'Verified will and death certificate submitted.',
        uploadedAt: '2025-11-03T09:10:00Z'
    }
];
const statements = [
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
                type: 'debit'
            },
            {
                id: 'tx-2',
                date: '2025-10-20',
                description: 'Estate payout',
                amount: 280,
                type: 'credit'
            }
        ]
    }
];
const getBeneficiaryById = (id)=>beneficiaries.find((b)=>b.id === id);
const getCaseById = (id)=>cases.find((c)=>c.id === id);
const getChargesByCaseId = (caseId)=>charges.filter((ch)=>ch.caseId === caseId);
const getEvidencesByCaseId = (caseId)=>evidences.filter((ev)=>ev.caseId === caseId);
const getStatementsByBeneficiaryId = (beneficiaryId)=>statements.filter((st)=>st.beneficiaryId === beneficiaryId);
}),
"[project]/app/api/evidence/route.ts [app-edge-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [app-edge-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [app-edge-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-edge-route] (ecmascript)");
;
;
const runtime = 'edge';
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('caseId');
    if (caseId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["getEvidencesByCaseId"])(caseId));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["evidences"]);
}
async function POST(request) {
    const body = await request.json();
    const newItem = {
        ...body,
        id: body.id ?? `ev-${Math.floor(Math.random() * 9000) + 1000}`,
        uploadedAt: new Date().toISOString()
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["evidences"].push(newItem);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newItem, {
        status: 201
    });
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__52233aed._.js.map