import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { fetchWineById, type WineDetail } from "../../Services/Wine/WineServices";
import Dialog from "../../Components/Dialog";
import EditWineDialogContent from "../../Components/EditWineDialogContent";
import settingsSvg from "../../assets/settings-svgrepo-com.svg";



export default function WineElementPage() {
  const { wineId } = useParams<{ wineId: string }>();
  const [wineDetails, setWineDetails] = useState<WineDetail[] | null>(null);

  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

    async function loadWine() {
      if (!wineId) return; // don't do anything if no id
      try {
        const data = await fetchWineById(Number(wineId));
        setWineDetails(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch wine details");
      }
    }

    useEffect(() => {
      loadWine();
    }, [wineId]);

  function toggleDialog() {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  if (!wineId) return <div className="text-red-600">Wine ID not provided</div>;
  if (error) return <div className="flex flex-col gap-10">
          <h3>{error}</h3>
          <button className="p-3! text-xl" onClick={() => navigate("/wine")}>
            Gå tilbage
          </button>
        </div>
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
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">{wineName} ({vintageYear})</h1>
        <button
              onClick={() => {
                setDialogContent(
                  <EditWineDialogContent
                    wineId={Number(wineId)}
                    onClose={toggleDialog}
                    onUpdated={loadWine}
                    onDeleted={loadWine}
                  />
                );
                toggleDialog();
              }}
              className="p-0! mt-2 w-10 h-10"
            >
              <img
                src={settingsSvg}
                alt="Edit wine"
              />
            </button>
      
      </div>

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
                  <td className="border px-2 py-1">{j.PressedDate.split(" ")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {/* Dialog */}
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </div>
  );
}
