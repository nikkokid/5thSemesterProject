import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import grapeImage from "../../assets/grapesvg.svg";
import settingsSvg from "../../assets/settings-svgrepo-com.svg";
import EditGrapeDialogContent from "../../components/EditGrapeDialogContent";
import { fetchGrapes, type Grape } from "../../Services/Grape/GrapeServices";
import ButtonCard from "../../components/ButtonCard";
import Dialog from "../../components/Dialog";
import AddGrapeDialogContent from "../../components/AddGrapeDialogContent";

export default function Grape() {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  async function loadGrapes() {
    const data = await fetchGrapes();
    setGrapes(data);
  }

  useEffect(() => {
    loadGrapes();
  }, []);

  function toggleDialog() {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

  return (
    <>
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Druesorter</h2>

        <button
          onClick={() => {
            setDialogContent(
              <AddGrapeDialogContent
                onClose={toggleDialog}
                onAdded={loadGrapes}
              />
            );
            toggleDialog();
          }}
          className="ml-auto bg-green-600! text-white px-4 py-2 rounded-lg"
        >
          + Tilføj druesort
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {grapes.map((grape) => (
          <div key={grape.GrapeId} className="relative group">
  <ButtonCard
    image={grapeImage}
    title={grape.GrapeName}
    description="Klik for detaljer"
    onClick={() => navigate(`/grape/${grape.GrapeId}`)}
  />

  {/* Settings icon */}
  <button
    onClick={() => {
      setDialogContent(
        <EditGrapeDialogContent
          grape={grape}
          onClose={toggleDialog}
          onUpdated={loadGrapes}
        />
      );
      toggleDialog();
    }}
    className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition"
>
  <img src={settingsSvg} alt="Edit grape" className="w-full h-full object-contain"/>
</button>
</div>

        ))}
      </div>

      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </>
  );
}
