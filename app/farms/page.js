import Link from "next/link";

const Page = async () => {
  async function getFarms() {
    const res = await fetch(process.env.NEXT_PUBLIC_FARMS_APIURL, {
      next: { revalidate: 10 },
    });

    return res.json();
  }

  const farms = await getFarms();

  return (
    <div className="bg-light min-vh-100 py-5">

     
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">
          🌾 Bee Farms
        </h1>
        <p className="text-muted">
          Trusted farms producing natural honey
        </p>
      </div>

      <div className="container">
        <div className="row g-4">

          {farms.map((farm) => (
            <div className="col-md-4" key={farm.id}>

              <div className="card shadow-sm border-0 rounded-4 h-100">

               
                <div
                  className="bg-success bg-opacity-25 d-flex align-items-center justify-content-center"
                  style={{ height: "160px", fontSize: "50px" }}
                >
                  🌾
                </div>

                <div className="card-body text-center d-flex flex-column">

                  <h5 className="fw-bold">{farm.name}</h5>

                  <p className="text-muted small flex-grow-1">
                    {farm.desc}
                  </p>

                  <Link
                    href={`/farms/${farm.id}`}
                    className="btn btn-success text-white w-100 rounded-pill"
                  >
                    View Farm
                  </Link>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Page;