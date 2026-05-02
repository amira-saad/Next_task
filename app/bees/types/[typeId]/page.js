import Link from "next/link";

export default async function Page({ params }) {
  const { typeId } = await params;

  const beeData = {
    queen: {
      name: "Queen Bee",
      icon: "👑",
      desc: "The queen bee is the only fertile female in the hive. Her main job is laying eggs and keeping the colony united.",
      role: "Leader & egg layer",
    },

    worker: {
      name: "Worker Bee",
      icon: "🐝",
      desc: "Worker bees gather nectar, make honey, clean the hive, protect the colony, and feed larvae.",
      role: "Honey production & hive care",
    },

    drone: {
      name: "Drone Bee",
      icon: "🚁",
      desc: "Drone bees are male bees. Their main role is mating with a queen bee from another colony.",
      role: "Reproduction",
    },
  };

  const bee = beeData[typeId];

  if (!bee) {
    return (
      <div className="container text-center py-5">
        <h1 className="text-danger">Bee type not found </h1>

        <Link href="/bees/types" className="btn btn-warning mt-3 text-white">
          Back to Types
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        <div className="card shadow-sm border-0 rounded-4 p-5 text-center">

          <div style={{ fontSize: "70px" }}>
            {bee.icon}
          </div>

          <h1 className="fw-bold text-warning mt-3">
            {bee.name}
          </h1>

          <p className="lead text-muted mt-3">
            {bee.desc}
          </p>

          <h5 className="mt-4">
            Main Role: <span className="text-success">{bee.role}</span>
          </h5>

          <Link
            href="/bees/types"
            className="btn btn-warning text-white px-4 rounded-pill mt-4"
          >
            ← Back to Bee Types
          </Link>

        </div>

      </div>

    </div>
  );
}