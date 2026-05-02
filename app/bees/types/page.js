import Link from "next/link";

export default function Page() {
  const beeTypes = [
    {
      id: "queen",
      name: "Queen Bee",
      icon: "👑",
      desc: "The leader of the hive responsible for laying eggs.",
    },
    {
      id: "worker",
      name: "Worker Bee",
      icon: "🐝",
      desc: "Female bees that gather nectar and protect the hive.",
    },
    {
      id: "drone",
      name: "Drone Bee",
      icon: "🚁",
      desc: "Male bees whose main role is mating with the queen.",
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-5">

    
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold text-warning">
          🐝 Bee Types
        </h1>

        <p className="text-muted">
          Discover the important roles inside a bee colony.
        </p>
      </div>

    
      <div className="container">
        <div className="row g-4">

          {beeTypes.map((bee) => (
            <div className="col-md-4" key={bee.id}>

              <div className="card shadow-sm border-0 rounded-4 h-100 text-center p-4">

                <div style={{ fontSize: "55px" }}>
                  {bee.icon}
                </div>

                <h4 className="fw-bold mt-3">
                  {bee.name}
                </h4>

                <p className="text-muted flex-grow-1">
                  {bee.desc}
                </p>

                <Link
                  href={`/bees/types/${bee.id}`}
                  className="btn btn-warning text-white rounded-pill mt-3"
                >
                  Learn More
                </Link>

              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}