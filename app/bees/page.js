

import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container text-center mb-5">
        <h1 className="display-3 fw-bold text-warning">
          🐝 About Bees
        </h1>

        <p className="lead text-muted mt-3">
          Bees are tiny heroes of nature. They help plants grow,
          create honey, and support ecosystems worldwide.
        </p>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 text-center">
              <div className="fs-1 mb-3"></div>
              <h4>Pollination</h4>
              <p className="text-muted">
                Bees pollinate flowers and crops, helping food production.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 text-center">
              <div className="fs-1 mb-3"></div>
              <h4>Honey Making</h4>
              <p className="text-muted">
                Bees collect nectar and turn it into delicious honey.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 p-4 text-center">
              <div className="fs-1 mb-3"></div>
              <h4>Environment</h4>
              <p className="text-muted">
                Healthy bee populations are vital for biodiversity.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <Link
            href="/bees/types"
            className="btn btn-warning text-white px-4 py-2 rounded-pill"
          >
            Explore Bee Types
          </Link>
        </div>
      </div>
    </div>
  );
}