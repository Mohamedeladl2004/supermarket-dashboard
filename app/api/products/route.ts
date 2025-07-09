import { type NextRequest, NextResponse } from "next/server"

const JSON_SERVER_URL = "http://localhost:3001/products"

// GET /api/products  →  fetch from JSON-Server
export async function GET() {
  const res = await fetch(JSON_SERVER_URL, { cache: "no-store" })
  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

// POST /api/products  →  forward body to JSON-Server
export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await fetch(JSON_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
