import Link from "next/link";

const Page = async () => {
  async function getData() {
    // Fetch from both sources at the same time
    const [mockRes, dbRes] = await Promise.all([
      fetch(process.env.NEXT_PUBLIC_APIURL, { next: { revalidate: 10 } }),
      fetch(`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/products`, { next: { revalidate: 10 } }),
    ]);

    const mockData = await mockRes.json();
    const dbData = await dbRes.json();

    const normalizedMock = mockData.map((d) => ({
      _id: d.id,
      name: d.name,
      description: d.desc,
      price: d.price,
      image: d.image || null,
    }))

    // Merge both arrays
    return [...normalizedMock, ...dbData]
  }

  const myData = await getData();

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-warning">🍯 BeeHoney Shop</h1>
        <p className="text-muted">Fresh natural honey products</p>
      </div>
      <div className="container">
        <div className="row g-4">
          {myData.map((d) => (
            <div className="col-md-4" key={d._id}>
              <div
                className="card shadow-sm border-0 rounded-4 h-100 d-flex flex-column"
                style={{ minHeight: "380px" }}
              >
                <div
                  className="bg-warning bg-opacity-25 d-flex align-items-center justify-content-center"
                  style={{ height: "160px" }}
                >

                 <span style={{ fontSize: "70px" }}>🍯</span>
                </div>
                <div className="card-body d-flex flex-column text-center">
                  <h5 className="fw-bold">{d.name}</h5>
                  <p
                    className="text-muted small flex-grow-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {d.description}
                  </p>
                  <h5 className="text-warning fw-bold">${d.price}</h5>
                  <Link
                    href={`/shop/${d._id}`}
                    className="btn btn-warning text-white w-100 mt-2 rounded-pill"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {myData.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted fs-5">No products yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;