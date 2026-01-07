import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {fetchGrapeById, type Grape} from "../../Services/Grape/GrapeServices"
import grapeImage from "../../assets/grapesvg.svg"
import ButtonCard from "../../Components/ButtonCard";
import Dialog from "../../Components/Dialog";
import EditGrapeDialogContent from "../../Components/EditGrapeDialogContent";
import settingssvg from "../../assets/settings-svgrepo-com.svg"

export default function GrapeElement() {
    const { grapeId } = useParams<{ grapeId: string }>();
    const [grape, setGrape] = useState<Grape | null>(null);
    const navigate = useNavigate();
    const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    async function loadGrape() {
      if (grapeId) {
        const data = await fetchGrapeById(Number(grapeId));
        setGrape(data);
      }
    }

    useEffect(() => { 
        loadGrape();
    }, [grapeId]);
    if (!grape) {
        return <div className="flex flex-col gap-10">
          <h3>Druesort kunne ikke findes...</h3>
          <button className="p-3! text-xl" onClick={() => navigate("/grape")}>
            Gå tilbage
          </button>
        </div>;
    }

    function toggleDialog() {
    if (!dialogRef.current) return;

    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }

    return (
    <>
      <div className="flex justify-between gap-6">
        {/* Header */}
        <h2 className="text-center text-2xl font-semibold mb-6">
          {grape.GrapeName}
        </h2>
        <button
          className="mb-2 p-0! h-8 mt-1"
          onClick={() => {
            setDialogContent(
              <EditGrapeDialogContent
                grape={grape}
                onClose={toggleDialog}
                onUpdated={loadGrape}
              />
            );
          toggleDialog();
          }}
          
        >
          <img src={settingssvg} alt="Edit grape" className="w-6 h-6"/>
        </button>
      </div>

      {/* Button Card */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-25 p-2">
        <ButtonCard
          image={grapeImage}
          title="Planter"
          description="Se antal planter"
          onClick={() => navigate(`/grape/${grape.GrapeId}/grape-row`)}
        />

        <ButtonCard
          image={grapeImage}
          title="Høst"
          description="Se høstdata"
          onClick={() => navigate(`/grape/${grape.GrapeId}/harvest`)}
        />

        <ButtonCard
          image={grapeImage}
          title="Most"
          description="Se most"
          onClick={() => navigate(`/grape/${grape.GrapeId}/juice`, {state: { grapeName: grape.GrapeName}})}
        />
      </div>
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
        {dialogContent}
      </Dialog>
    </>
  );
}