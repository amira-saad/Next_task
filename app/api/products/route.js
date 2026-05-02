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

// GET all products
export async function GET() {
  await connectDB()
  const products = await Product.find().sort({ createdAt: 1 })
  return NextResponse.json(products)
}

// POST new product
export async function POST(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  await connectDB()
  const body = await req.json()
  const product = await Product.create(body)
  return NextResponse.json(product, { status: 201 })
}