import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchWines, type Wine,} from "../../Services/Wine/WineServices";
import ButtonCard from "../../Components/ButtonCard";
import Dialog from "../../Components/Dialog";
import CreateWineDialogContent from "../../Components/CreateWineDialogContent";
import wineImage from "../../assets/winesvg.svg"; // use your wine image

import addsvg from "../../assets/add-create-new-plus-svgrepo-com.svg";

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
      <div>
        <h2 className="text-2xl font-semibold mb-10!">Vine</h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        <ButtonCard
          image={addsvg}
          title="Opret ny vin"
          onClick={() => {
            setDialogContent(
              <CreateWineDialogContent
                onClose={toggleDialog}
                onCreated={loadWines}
              />
            );
            toggleDialog();
          }}              
        />
        {wines.map((wine) => (
          <div key={wine.WineId} className="relative group">
            <ButtonCard
              image={wineImage}
              title={wine.WineName}
              description={`Årgang ${wine.VintageYear}`}
              onClick={() => navigate(`/wine/${wine.WineId}`)}
            />

            {/* Settings icon */}
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
