"use client"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
const ADMIN_EMAIL = "dramirasaad103@gmail.com"  
const empty = { name: "", description: "", price: "", image: "", stock: "" }

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)


 useEffect(() => {
    if (!isPending && (!session ||  session.user.email !== ADMIN_EMAIL )) {
      router.push("/")
    }
  }, [session, isPending, router])

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts)
  }, [])

async function handleSubmit(e) {
  e.preventDefault()
  const method = editingId ? "PUT" : "POST"
  const url = editingId ? `/api/products/${editingId}` : "/api/products"

  console.log("METHOD:", method)
  console.log("URL:", url)
  console.log("EDITING ID:", editingId)

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
  })

  console.log("RESPONSE STATUS:", res.status)
  const data = await res.json()
  console.log("RESPONSE DATA:", data)

  setForm(empty)
  setEditingId(null)
  const updated = await fetch("/api/products").then((r) => r.json())
  setProducts(updated)
}
  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return
    await fetch(`/api/products/${id}`, { method: "DELETE" })
    setProducts(products.filter((p) => p._id !== id))
  }

  function handleEdit(product) {
    setEditingId(product._id)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      stock: product.stock,
    })
  }

  if (isPending) return <p className="p-4">Loading...</p>

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🐝 Honey Products Dashboard</h2>

      {/* Form */}
      <div className="card p-4 mb-5 border-warning">
        <h5>{editingId ? "Edit Product" : "Add New Product"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="Name" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Price" type="number" required
                value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="col-md-3">
              <input className="form-control" placeholder="Stock" type="number"
                value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Image URL"
                value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="col-12">
              <textarea className="form-control" placeholder="Description" rows={2} required
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-warning fw-bold">
              {editingId ? "Update" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => { setForm(empty); setEditingId(null) }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

  
      <table className="table table-hover align-middle">
        <thead className="table-warning">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {p.image && <img src={p.image} width={50} height={50}
                  style={{ objectFit: "cover", borderRadius: 6 }} />}
              </td>
              <td className="fw-semibold">{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-sm btn-outline-warning me-2"
                  onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
