import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import wineImage from "../../assets/winesvg.svg"; // use your wine image
import settingsSvg from "../../assets/settings-svgrepo-com.svg";
import {fetchWines, type Wine,} from "../../Services/Wine/WineServices";
import ButtonCard from "../../Components/ButtonCard";
import Dialog from "../../Components/Dialog";
import CreateWineDialogContent from "../../Components/CreateWineDialogContent";
import EditWineDialogContent from "../../Components/EditWineDialogContent";

export default function Wine() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  async function loadWines() {
    const data = await fetchWines();
    setWines(data);
  }

  useEffect(() => {
    loadWines();
  }, []);

  function toggleDialog() {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Vine</h2>

        <button
          onClick={() => {
            setDialogContent(
              <CreateWineDialogContent
                onClose={toggleDialog}
                onCreated={loadWines}
              />
            );
            toggleDialog();
          }}
          className="ml-auto bg-green-600! text-white px-4 py-2 rounded-lg"
        >
          + Tilføj vin
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {wines.map((wine) => (
          <div key={wine.WineId} className="relative group">
            <ButtonCard
              image={wineImage}
              title={wine.WineName}
              description={`Årgang ${wine.VintageYear}`}
              onClick={() => navigate(`/wine/${wine.WineId}`)}
            />

            {/* Settings icon */}
            <button
              onClick={() => {
                setDialogContent(
                  <EditWineDialogContent
                    wineId={wine.WineId}
                    onClose={toggleDialog}
                    onUpdated={loadWines}
                    onDeleted={loadWines}
                  />
                );
                toggleDialog();
              }}
              className="absolute top-2 right-2 w-6 h-6 opacity-0 p-0! group-hover:opacity-100 transition"
            >
              <img
                src={settingsSvg}
                alt="Edit wine"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </>
  );
}
