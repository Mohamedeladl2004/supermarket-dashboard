import { type NextRequest, NextResponse } from "next/server"

const JSON_SERVER_URL = "http://localhost:3001/products"

// GET /api/products/:id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/${params.id}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// PUT /api/products/:id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const res = await fetch(`${JSON_SERVER_URL}/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, id: params.id }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to update product" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE /api/products/:id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${JSON_SERVER_URL}/${params.id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
