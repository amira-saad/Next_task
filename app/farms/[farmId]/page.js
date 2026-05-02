export default async function Page({ params }) {
  const { farmId } = await params;

  async function getFarm() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FARMS_APIURL}/${farmId}`,
      { cache: "no-store" }
    );

    return res.json();
  }

  const farm = await getFarm();

  return (
    <div className="container text-center py-5">

      <h1 className="text-success mb-4">
        🌾 Farm Details
      </h1>

      <div className="card shadow-sm p-4">

        <div style={{ fontSize: "60px" }}>🌾</div>

        <h2 className="mt-3">{farm.name}</h2>

        <p className="text-muted">{farm.desc}</p>

        <h5>Location: {farm.location}</h5>

      </div>

    </div>
  );
}