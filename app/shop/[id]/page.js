export default async function Page({ params }) {
  const { id } = await params;

  // MongoDB IDs are 24 char hex strings, MockAPI IDs are short numbers
  const isMongoId = /^[a-f\d]{24}$/i.test(id)

  let product = null

  if (isMongoId) {
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/products/${id}`,
      { next: { revalidate: 10 } }
    )
    const data = await res.json()
    product = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
    }
  } else {
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APIURL}/${id}`,
      { next: { revalidate: 10 } }
    )
    const data = await res.json()
    product = {
      name: data.name,
      description: data.desc,
      price: data.price,
      image: data.image || null,
    }
  }

  if (!product) {
    return <div className="container py-5 text-center"><h2>Product not found</h2></div>
  }

  return (
    <div className="container text-center py-5">
      <h1 className="text-warning">🍯 Product Details</h1>

       <div style={{ fontSize: "80px" }}>🍯</div>

      <h2 className="fw-bold mt-3">{product.name}</h2>
      <p className="text-muted">{product.description}</p>
      <h3 className="text-warning">${product.price}</h3>
    </div>
  )
}