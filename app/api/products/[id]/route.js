import { connectDB } from "@/lib/mongodb"
import { Product } from "@/lib/models/Product"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = "dramirasaad103@gmail.com"

async function isAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.email === ADMIN_EMAIL
}
// GET single product
export async function GET(req, { params }) {
  await connectDB()
  const { id } = await params
  const product = await Product.findById(id)
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(product)
}
// PUT update product
export async function PUT(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await connectDB()
  
  const { id } = await params  
  const body = await req.json()
  const product = await Product.findByIdAndUpdate(id, body, { new: true })
  return NextResponse.json(product)
}

// DELETE product
export async function DELETE(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await connectDB()
  
  const { id } = await params 
  
  await Product.findByIdAndDelete(id)
  return NextResponse.json({ message: "Deleted" })
}
