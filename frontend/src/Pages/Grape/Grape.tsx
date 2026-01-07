import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGrapes, type Grape } from "../../Services/Grape/GrapeServices";
import ButtonCard from "../../Components/ButtonCard";
import Dialog from "../../Components/Dialog";
import AddGrapeDialogContent from "../../Components/AddGrapeDialogContent";
import grapeImage from "../../assets/grapesvg.svg";
import addsvg from "../../assets/add-create-new-plus-svgrepo-com.svg";

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
      <h2 className="text-2xl font-semibold">Druesorter</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2">
        <ButtonCard
          image={addsvg}
          title="Opret ny druesort"
          onClick={() => {
            setDialogContent(
              <AddGrapeDialogContent
                onClose={toggleDialog}
                onAdded={loadGrapes}
              />
            );
            toggleDialog();
          }}              
        />
        {grapes.map((grape) => (
          <div key={grape.GrapeId}>
            <ButtonCard
              image={grapeImage}
              title={grape.GrapeName}
              description="Klik for detaljer"
              onClick={() => navigate(`/grape/${grape.GrapeId}`)}
            />

          </div>

        ))}
      </div>

      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </>
  );
}
