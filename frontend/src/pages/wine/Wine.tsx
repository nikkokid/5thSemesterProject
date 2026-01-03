import { useEffect, useRef, useState } from "react";
import WineImage from "../../assets/winesvg.svg";
import { useNavigate } from "react-router-dom";
import { fetchWines, type Wine } from "../../Services/Wine/WineServices";
import ButtonCard from "../../components/ButtonCard";
import Dialog from "../../components/Dialog";
import CreateWineDialogContent from "../../components/CreateWineDialogContent"; 

export default function WinePage() {
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
    <div className="p-4">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Vine</h2>

        {/* 1️⃣ Create Wine button */}
        <button
          onClick={() => {
            setDialogContent(
              <CreateWineDialogContent
                onClose={toggleDialog}
                onCreated={(newWineId: number) => navigate(`/wine/${newWineId}`)}
              />
            );
            toggleDialog();
          }}
          className="ml-auto bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Opret vin
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {wines.map((wine) => (
          <ButtonCard
            key={wine.WineId}
            image={WineImage}
            title={wine.WineName}
            description={`Årgang: ${wine.VintageYear}`}
            onClick={() => navigate(`/wine/${wine.WineId}`)}
          />
        ))}
      </div>

      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </div>
  );
}
