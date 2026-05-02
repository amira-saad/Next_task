export default function Home() {
  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container text-center py-5">
     
        <div className="mb-4 fs-1">🐝🍯</div>

    
        <h1 className="display-3 fw-bold text-warning">
          Welcome to BeeHoney
        </h1>

   
        <p className="lead text-muted mt-3 mx-auto" style={{ maxWidth: "700px" }}>
          Pure natural honey directly from trusted farms.  
          Discover premium honey products made with love from nature.
        </p>

    
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-warning text-white px-4 py-2 fw-semibold">
            Shop Now
          </button>

          <button className="btn btn-outline-dark px-4 py-2">
            Learn About Bees
          </button>
        </div>

   
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5>🍯 100% Pure Honey</h5>
              <p className="text-muted small">
                Fresh natural honey with no additives.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5>🐝 Healthy Bees</h5>
              <p className="text-muted small">
                Sustainably sourced from healthy bee farms.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5>🚚 Fast Delivery</h5>
              <p className="text-muted small">
                Delivered fresh to your door quickly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}