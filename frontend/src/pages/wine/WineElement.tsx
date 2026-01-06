import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWineById, type WineDetail } from "../../Services/Wine/WineServices";

export default function WineElementPage() {
  const { wineId } = useParams<{ wineId: string }>();
  const [wineDetails, setWineDetails] = useState<WineDetail[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWine() {
      if (!wineId) return; // don't do anything if no id
      try {
        const data = await fetchWineById(Number(wineId));
        setWineDetails(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch wine details");
      }
    }
    loadWine();
  }, [wineId]);

  if (!wineId) return <div className="text-red-600">Wine ID not provided</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!wineDetails) return <div>Loading wine details...</div>;
  if (wineDetails.length === 0) return <div>No details found for this wine.</div>;

  const wineName = wineDetails[0].WineName;
  const vintageYear = wineDetails[0].VintageYear;

  // Group by grape
  const grapesMap: Record<number, WineDetail[]> = {};
  wineDetails.forEach((d) => {
    if (!grapesMap[d.GrapeId]) grapesMap[d.GrapeId] = [];
    grapesMap[d.GrapeId].push(d);
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{wineName} ({vintageYear})</h1>

      {Object.entries(grapesMap).map(([grapeId, juices]) => (
        <div key={grapeId} className="mb-4 border p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Drue: {juices[0].GrapeName}</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Juice ID</th>
                <th className="border px-2 py-1 text-left">Volume (L)</th>
                <th className="border px-2 py-1 text-left">Procent (%)</th>
                <th className="border px-2 py-1 text-left">Pressedato</th>
              </tr>
            </thead>
            <tbody>
              {juices.map((j) => (
                <tr key={j.JuiceId}>
                  <td className="border px-2 py-1">{j.JuiceId}</td>
                  <td className="border px-2 py-1">{j.JuiceVolume}</td>
                  <td className="border px-2 py-1">{j.Percentage}</td>
                  <td className="border px-2 py-1">{j.PressedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
